const users = [
  {
    // id: 1,
    username: 'rico',
    password_hash: 'rico',
  },
  {
    // id: 2,
    username: 'test',
    password_hash: 'test',
  },
  {
    // id: 3,
    username: 'karl',
    password_hash: 'karl',
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO users ${sql(users, 'username', 'password_hash')}
  `;
};

exports.down = async (sql) => {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
			username = ${user.username} AND
			password_test = ${user.password_test} AND
			document_ids = ${user.document_ids}
    `;
  }
};
