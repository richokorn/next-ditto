// Originally as /api/document.js

import {
  getUserIdByValidSessionToken,
  getDocumentsByUserId,
} from '../../util/database';

export default async function handler(req, res) {
  let documentListByUserId = [];

  // We want to get a list of documents for the user

  // Check sessionToken validity/existence, throw error if not the case, proceed if valid.
  if (!req.cookies.sessionToken) {
    res.status(400).json({ error: 'sessionToken not provided' });
    return;
  }

  // Get userId from sessionToken, which we should now have.
  let userId = getUserIdByValidSessionToken(req.cookies.sessionToken);
  // console.log('// TESTING /api/document.js userId (might be unclean): ',userId,);

  // UserId is sometimes not a pure number, ie. is within an object array, so we need to convert it to a number.
  if (!Number(userId)) {
    userId = userId[0].id;
    // console.log('// TESTING /api/document.js (should now be clean) userId: ', userId);
  }

  // Now we can get the documents for the user.
  documentListByUserId = await getDocumentsByUserId(userId);
  // console.log('// TESTING index.js documentList: ', documentListByUserId);

  // If the user has no documents, return an empty array.
  if (documentListByUserId.length === 0) {
    res.status(200).json({ documentList: [] });
    return;
  }

  // If the user has documents, return them.
  res.status(200).json({ documentList: documentListByUserId });
  // res.body = documentListByUserId;
  res.json({ documentList: documentListByUserId });
  return;
}
