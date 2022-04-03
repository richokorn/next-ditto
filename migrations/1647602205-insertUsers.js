const users = [
  {
    // id: 1,
    username: 'Test',
    password_hash:
      '$2b$12$9QnT3gwG6NNy0I85aoJ0A.rW05LuGaV.fv21p2sUAORAhZiiQEGce',
  },
  {
    // id: 2,
    username: 'test',
    password_hash:
      '$2b$12$fPYqd2SrAadS8zeG7EYG2OQaF8gp800oCecnofyt0wvI9Ut6oiVV2',
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
			password_hash = ${user.password_hash}
    `;
  }
};
