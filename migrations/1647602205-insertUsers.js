const users = [
  {
    // id: 1,
    username: 'Rico',
    password_hash:
      '$2b$12$wDyZyfznsSkzsvvbTKI/IOSy.sSwo/aji.MBpolwY2sZNCuuGYX2.',
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
