const documents = [
  {
    document_title: 'Doc1-Owner1-Raw-String',
    document_content: 'Raw Text String',
    owner_id: 1,
  },
  {
    document_title: 'Doc2-Owner1-Object-String',
    document_content: '[{"type":"paragraph","children":[{"text":"This is text inside of an object that Slate can read"}]}]',
    owner_id: 1,
  },
  {
    document_title: 'Doc3-Owner2-Object-String',
    document_content: '[{"type":"paragraph","children":[{"text":"This is the third document"}]}]',
    owner_id: 2,
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO documents ${sql(
      documents,
      'document_title',
      'document_content',
      'owner_id',
    )}
    RETURNING document_title, document_content, owner_id;
      `;
};

exports.down = async (sql) => {
  for (const document of documents) {
    await sql`
      DELETE FROM
        documents
      WHERE
      document_title = ${document.document_title} AND
			document_content = ${document.document_content} AND
			owner_id = ${document.owner_id}
      RETURNING document_title, document_content, owner_id;
    `;
  }
};
