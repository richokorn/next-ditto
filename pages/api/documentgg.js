import Cookies from 'js-cookie';
import {
  updateDocumentById,
  getDocumentById,
  getUserIdByValidSessionToken,
  deleteDocumentById,
} from '../../util/database';

export default async function handler(request, response) {
  // We want to create a new document for a logged in user.
  if (request.method === 'POST') {
    const userId = String(
      getUserIdByValidSessionToken(request.cookies.sessionToken),
    );
    const documentId = Number(request.cookies.documentId);

    console.log('// TESTING PURPOSES /api/decoment.js  userId: ', userId); // TESTING PURPOSES
    console.log(
      '// TESTING PURPOSES /api/decoment.js documentId: ',
      documentId,
    ); // TESTING PURPOSES

    if (!documentId || !userId) {
      response.status(400).json({
        error:
          'userId or documentId either does not exist or have not been provided',
      });
      return;
    }

    if (request.method === 'POST') {
      const documentContent = Cookies.get('documentContent');
      console.log(
        '// TESTING PURPOSES /api/document.js documentContent: ',
        documentContent,
      );

      const documentTitle = Cookies.get('documentTitle');
      console.log(
        '// TESTING PURPOSES /api/document.js documentTitle: ',
        documentTitle,
      );
    } else if (request.method === 'GET') {
      const document = await getDocumentById(documentId, userId);

      // check in database for existing document with passed id or if the owner_id is wrong
      console.log('// TESTING PURPOSES /api/document.js document: ', document);
      if (!document) {
        response.status(404).json({ error: 'document not found' });
        return;
      }
      // if the method is GET return the document with the matched id

      response.status(200).json({ document: document });
      return;
    } else if (request.method === 'PUT') {
      // if the method is PUT update the document and response the updated document

      const updatedDocument = await updateDocumentById(
        request.localStorage.documentId,
        request.localStorage.documentTitle,
        request.localStorage.documentContent,
        userId,
      );

      if (!updatedDocument) {
        response.status(404).json({ error: 'document not found' });
        return;
      }

      response.status(200).json({ document: updatedDocument });
      return;
    } else if (request.method === 'DELETE') {
      // if the method is DELETE delete the document matching the id and response the deleted animal
      const deletedDocument = await deleteDocumentById(documentId, userId);

      if (!deletedDocument) {
        response.status(404).json({ error: 'document not found' });
        return;
      }

      response.status(200).json({ document: deletedDocument });
      return;
    }

    response.status(405).json({ error: 'Method not Allowed' });
  }
}
