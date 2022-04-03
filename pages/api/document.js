// API CRUD Functions for individual documents

import Cookies from 'js-cookie';
import {
  createDocument,
  getUserIdByValidSessionToken,
  updateDocumentById,
} from '../../util/database';

export default async function handler(request, response) {
  // CREATE
  if (request.method === 'POST') {
    const { title, content } = request.body;
    const userId = await getUserIdByValidSessionToken(request.cookies.sessionToken);
    const document = await createDocument(userId, title, content);
    response.status(201).json(document);
  }

}