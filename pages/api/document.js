// API CRUD Functions for individual documents

import Cookies from 'js-cookie';
import {
  createDocument,
  deleteDocumentById,
  getUserIdByValidSessionToken,
  updateDocumentById,
} from '../../util/database';

export default async function handler(request, response) {
  // CREATE
  if (request.method === 'POST') {
    const userId = await getUserIdByValidSessionToken(
      request.cookies.sessionToken,
    );
    const userIdClean = userId[0].id;
    // console.log('// TESTING index.js (clean) userId: ', userIdClean);
    const documentTitle = request.body.documentTitle;

    const document = await createDocument(documentTitle, userIdClean);
    response.status(201).json(document);
  }

  // UPDATE
  if (request.method === 'PUT') {
    const userId = await getUserIdByValidSessionToken(
      request.cookies.sessionToken || Cookies.get('sessionToken'),
    );

    const userIdClean = userId[0].id;
    const documentId = request.body.documentId;
    const documentTitle = request.body.documentTitle;
    const documentContent = request.body.documentContent;

    const document = await updateDocumentById(
      userIdClean,
      documentId,
      documentTitle,
      documentContent,
    );
    response.status(200).json(document);
  }

  // DELETE
  if (request.method === 'DELETE') {
    const { documentId } = request.body;
    const userId = await getUserIdByValidSessionToken(
      request.cookies.sessionToken || Cookies.get('sessionToken'),
    );
    const userIdClean = userId[0].id;
    const document = await deleteDocumentById(documentId, userIdClean);
    response.status(200).json(document);
  }
}
