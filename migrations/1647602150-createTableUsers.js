exports.up = async (sql) => {
  console.log('Creating table users...');
  await sql`
	CREATE TABLE users (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		username varchar(60),
		password_hash varchar(60)
    );
	`;
};

exports.down = async (sql) => {
  console.log('Dropping table users...');
  await sql`
    DROP TABLE users;
  `;
};
