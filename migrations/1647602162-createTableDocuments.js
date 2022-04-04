exports.up = async (sql) => {
  console.log('Creating table documents...');
  await sql`
	CREATE TABLE documents (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    document_title text,
		document_content text,
		user_id integer REFERENCES users (id)
    );
  `;
};

exports.down = async (sql) => {
  console.log('Dropping table users...');
  await sql`
		DROP TABLE documents;
  `;
};
