const documents = [
  {
    // id: 1,
    content: 'Test Document 1: This is a test document',
    owner_id: 1,
  },
  {
    // id: 2,
    content: 'Test Document 2: This is a test document',
    owner_id: 2,
  },
  {
    // id: 3,
    content: 'Test Document 3: This is a test document',
    owner_id: 2,
  },
  {
    // id: 4,
    content: 'Test Document 4: This is a test document',
    owner_id: 3,
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO documents ${sql(documents, 'content', 'owner_id')}
    RETURNING content, owner_id;
      `;
};

exports.down = async (sql) => {
  for (const document of documents) {
    await sql`
      DELETE FROM
        documents
      WHERE
			content = ${document.content} AND
			owner_id = ${document.owner_id}
      RETURNING content, owner_id;
    `;
  }
};
