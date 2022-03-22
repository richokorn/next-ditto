exports.up = async (sql) => {
  await sql`
  CREATE TABLE sessions (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		token varchar(90) UNIQUE NOT NULL,
    expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	);
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sessions
  `;
};
