import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku.js';

setPostgresDefaultsOnHeroku();
// Read the environment variables from the .env
// file, which will then be available for all
// following code
config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// CRUD - users Typescript Definitions
export type UserId = {
  id: number;
};

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

// // CRUD - CREATE for single user
export async function createUser(username: string, password_hash: string) {
  const [user] = await sql<User[]>`
  INSERT INTO
    users (username, password_hash)
  VALUES
    (${username}, ${password_hash})
  RETURNING *
  `;
  return camelcaseKeys(user);
}

// // CRUD - READ ALL users - ONLY FOR TESTING; REMOVE LATER
export async function getUsers() {
  const users = await sql<User[]>`
    SELECT * FROM users;
  `;
  return users.map((user) => camelcaseKeys(user));
}
// // CRUD - READ for single user
export async function getUserByUsername(username: string) {
  const [user] = await sql`
  SELECT * FROM
    users
  WHERE
    username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getUserIdByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const userId = await sql<[UserId | undefined]>`
    SELECT
      users.id
    FROM
      users, sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return userId && camelcaseKeys(userId);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      password_hash
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

// // CRUD - UPDATE for single user - ONLY FOR TESTING; REMOVE MAYBE (for eventual change password)
export async function updateUserByUsername(
  username: string,
  password_hash: string,
) {
  const [animal] = await sql<[User | undefined]>`
    UPDATE
      users
    SET
      password_hash = ${password_hash}
    WHERE
      username = ${username}
    RETURNING *
  `;
  return animal && camelcaseKeys(animal);
}

// // CRUD - DELETE for users
export async function deleteUser(username: string) {
  const [user] = await sql`
  DELETE FROM users WHERE username = ${username}
  RETURNING *
  `;
  return user && camelcaseKeys(user);
}

// CRUD - documents TypeScript Definitions

export type DocumentWithId = {
  id: number;
  documentTitle: string | null;
  documentContent: string | null;
  userId: number | null;
};

export type DocumentWithoutId = {
  documentTitle: string | null;
  documentContent: string | null;
  userId: number | null;
};

export type DocumentNew = {
  documentTitle: string | null;
  userId: number;
};

// // CRUD - CREATE for documents
export async function createDocument(
  documentTitle: string | null,
  userId: number,
) {
  // console.log('// TESTING database.ts createDocument(user_id):', userId);
  const [document] = await sql<DocumentNew[]>`
  INSERT INTO
    documents (document_title, user_id)
  VALUES
    (${documentTitle}, ${userId})
  RETURNING *
  `;
  return camelcaseKeys(document);
}

// // CRUD - READ ALL documents by UserId
export async function getDocumentsByUserId(userId: number) {
  // console.log('// TESTING database.js getDocumentsByUserId(id) - id: ', id);
  const documents = await sql<DocumentWithId[]>`
    SELECT * FROM
      documents
    WHERE
      user_id = ${userId}
  `;
  // console.log('// TESTING database.js documents: ', documents);

  return documents.map((document) => camelcaseKeys(document));
}

// CRUD - READ for single document

export async function getDocumentById(id: number, userId: number) {
  if (!id || !userId) {
    return undefined;
  }
  const [document] = await sql`
  SELECT * FROM
    documents
  WHERE
    id = ${id} AND
    user_id = ${userId}
  `;
  return document && camelcaseKeys(document);
}

// // CRUD - UPDATE for single document
export async function updateDocumentById(
  userId: number,
  documentId: number,
  documentTitle: string,
  documentContent: string,
) {
  const [document] = await sql<[DocumentWithId | undefined]>`
    UPDATE
      documents
    SET
      document_title = ${documentTitle},
      document_content = ${documentContent}
    WHERE
      id = ${documentId} AND
      user_id = ${userId}
    RETURNING *
  `;
  return document && camelcaseKeys(document);
}

// // CRUD - DELETE for single document
export async function deleteDocumentById(id: number, userId: number) {
  const [document] = await sql<[DocumentWithId | undefined]>`
    DELETE FROM
      documents
    WHERE
      id = ${id} AND
      user_id = ${userId}
    RETURNING *
  `;
  return document && camelcaseKeys(document);
}

// Session Token
type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token
  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}
