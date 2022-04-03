import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSerializedRegisterSessionTokenCookie,
  deleteCookie,
} from '../../util/cookies';
import {
  createSession,
  createUser,
  getUserByUsername,
  getUserWithPasswordHashByUsername,
  getValidSessionByToken,
  User,
} from '../../util/database';
import { serialize } from 'cookie';

type AccountRequestBody = {
  username: string;
  password: string;
};

type AccountNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: AccountRequestBody;
};

export type AccountResponseBody =
  | { errors: { message: string }[] }
  | { user: Pick<User, 'id'> }
  | { success: { message: string } };

export default async function handler(
  request: AccountNextApiRequest,
  response: NextApiResponse<AccountResponseBody>,
) {
  if (request.method === 'POST') {
    // checks if both a username and a password has been passed
    if (
      typeof request.body.username !== 'string' ||
      !request.body.username ||
      typeof request.body.password !== 'string' ||
      !request.body.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or Password not provided',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // checks if the username is already taken
    if (await getUserByUsername(request.body.username)) {
      response.status(409).json({
        errors: [
          {
            message: 'Username already taken',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const passwordHash = await bcrypt.hash(request.body.password, 12);
    const user = await createUser(request.body.username, passwordHash);

    // 1. Create a unique token
    const token = crypto.randomBytes(64).toString('base64');

    // 2. Create the session
    const session = await createSession(token, user.id);

    console.log(
      '// TESTING PURPOSES account.ts POST (Register) createSession() session: ',
      session,
    );

    // 3. Serialize the cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // 4. Add the cookie to the header response
    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({ user: user });
    return;
  }

  // read / GET (Login a new user when clicking "Login")
  else if (request.method === 'GET') {
    if (
      typeof request.headers.username !== 'string' ||
      !request.headers.username ||
      typeof request.headers.password !== 'string' ||
      !request.headers.password
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or Password not provided',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const userWithPasswordHash = await getUserWithPasswordHashByUsername(
      request.headers.username,
    );

    if (!userWithPasswordHash) {
      response.status(401).json({
        errors: [
          {
            message: 'Incorrect Username or Password',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const passwordMatches = await bcrypt.compare(
      request.headers.password,
      userWithPasswordHash.passwordHash,
    );

    if (!passwordMatches) {
      response.status(401).json({
        errors: [
          {
            message: 'Incorrect Username or Password',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // 1. Create a unique token
    const sessionToken = crypto.randomBytes(64).toString('base64');

    // 2. Create the session
    const session = await createSession(sessionToken, userWithPasswordHash.id);

    console.log(
      '// TESTING PURPOSES account.ts GET (Login) createSession() session: ',
      session,
    );

    // 3. Serialize the cookie
    const serializedCookie = await createSerializedRegisterSessionTokenCookie(
      session.token,
    );

    // 4. Add the cookie to the header response
    response
      .status(201)
      .setHeader('Set-Cookie', serializedCookie)
      .json({
        user: {
          id: userWithPasswordHash.id,
        },
      });
    return;
  }

  // delete / DELETE (Logout a user when clicking "Logout")
  else if (request.method === 'DELETE') {
    const session = await getValidSessionByToken(request.cookies.sessionToken);
    if (!session) {
      response.status(401).json({
        errors: [
          {
            message: 'No valid session found, cannot logout',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    response
      .status(200)
      .setHeader('Set-Cookie', [
        serialize('sessionToken', '', {
          maxAge: -1,
          path: '/',
        }),
      ])
      .json({
        success: {
          message: 'Logout successful',
        },
        user: {
          id: session.userId,
        },
      });

    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try POST instead',
      },
    ],
  });
}
