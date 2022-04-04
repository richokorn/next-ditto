import Cookies from 'js-cookie';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import {
  getDocumentsByUserId,
  getUserByValidSessionToken,
  getUserIdByValidSessionToken,
} from '../util/database';
import { getLocalStorage } from '../util/getLocalStorage';

export default function Home(props) {
  let documentId;
  let documentTitle;
  let documentContent;

  if (typeof window !== 'undefined') {
    documentId = localStorage.getItem('documentId');
    documentTitle = localStorage.getItem('documentTitle');
    documentContent = localStorage.getItem('documentContent');
  }

  const [errors, setErrors] = useState([]);

  // Create a new document for a logged in user.
  async function createDocument() {
    const createDocumentResponse = await fetch('/api/document', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentTitle: 'New Document',
      }),
    });

    const createDocumentResponseBody = await createDocumentResponse.json();
    console.log('createDocumentResponseBody ', createDocumentResponseBody);
    localStorage.setItem('documentId', createDocumentResponseBody.id);
    localStorage.setItem(
      'documentTitle',
      createDocumentResponseBody.documentTitle,
    );

    // Redirect to the new document.
    window.location.reload();
  }

  // Update a document for a logged in user.
  async function updateDocument() {
    const updateDocumentResponse = await fetch('/api/document', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentId: documentId,
        documentTitle: documentTitle,
        documentContent: documentContent,
      }),
    });
    window.location.reload();
  }

  // // Bonus feature: Autosave

  // Abstract the intervals into an object so we can clear them later.
  // const myIntervals = {};

  // Check for a session token, and only run the autosave if we have one.

  // Delete a document for a logged in user.
  async function deleteDocument(documentId) {
    const deleteResponse = await fetch('/api/document', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentId: documentId || localStorage.getItem('documentId'),
      }),
    });
    window.location.reload();
  }

  // // CRUD - Users

  // Create a new user.
  async function registerUser(username, password) {
    // console.log(`// TESTING index.js registerUser(${username}, ${password}); `);
    const registerResponse = await fetch('/api/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const registerResponseBody = await registerResponse.json();
    console.log('registerResponseBody ', registerResponseBody);

    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      console.log(
        'Errors in registerResponseBody: ',
        registerResponseBody.errors,
      );
      return;
    }
    window.location.reload();
  }

  async function loginUser(username, password) {
    // console.log('// TESTING Login Attempt - Username: ', username);
    // console.log('// TESTING Login Attempt - Password: ', password);

    const loginResponse = await fetch('/api/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        username: username,
        password: password,
      },
      // body: JSON.stringify({
      //   username: username,
      //   password: password,
      // }),
    });

    const loginResponseBody = await loginResponse.json();
    // console.log('// TESTING loginResponseBody ', loginResponseBody);

    if ('errors' in loginResponseBody) {
      setErrors(loginResponseBody.errors);
      console.log('Errors in loginResponseBody: ', loginResponseBody.errors);
      return;
    }
    console.log('index.js loginUser() errors: ', errors);
    window.location.reload();
  }

  async function logoutUser() {
    const logoutResponse = await fetch('/api/account', {
      cookies: Cookies.get('sessionToken'),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await localStorage.removeItem('documentId');
    await localStorage.removeItem('documentTitle');
    await localStorage.removeItem('documentContent');
    window.location.reload();
  }
  return (
    <div>
      <Head>
        <title>Ditto</title>
        <meta
          name="description"
          content="WYSIWYG Markdown Editor with Duplication Detection"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout
        username={props.username}
        createDocument={createDocument}
        updateDocument={updateDocument}
        deleteDocument={deleteDocument}
        loginUser={loginUser}
        registerUser={registerUser}
        logoutUser={logoutUser}
        documentListByUserId={props.documentListByUserId}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  // // Get a list of documents for the user by userId
  let documentListByUserId = [];
  const sessionToken = context.req.cookies.sessionToken;
  // console.log('// TESTING index.js sessionToken: ', sessionToken);

  if (!sessionToken) {
    // console.error('// TESTING index.js sessionToken is not valid');

    return {
      props: {
        documentListByUserId: [
          'Currently not logged in.',
          'Documents will only be saved locally.',
        ],
      },
    };
  }
  const usernameWeird = await getUserByValidSessionToken(sessionToken);
  const username = usernameWeird.username;
  const userIdWeird = await getUserIdByValidSessionToken(sessionToken);
  const userId = userIdWeird[0].id;

  // console.log('// TESTING index.js (clean) userId: ', userId);

  if (!Number(userId)) {
    console.error(
      '// TESTING index.js (clean) userId is not valid or undefined',
    );
  }
  documentListByUserId = await getDocumentsByUserId(userId);

  return {
    props: {
      documentListByUserId: documentListByUserId,
      username: username,
    },
    // props: { documentListByUserId: documentListByUserId },
  };
}

// // Here we attempted to use a "cleaner" method by fetching our list of documents using an API endpoint.
// // It does not work because gSSP can only use absolute URLs
//   const res = await fetch('/api/documents', {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   });
//   const documentListByUserId = await res.json();
//   return { props: { documentList: documentListByUserId } };
// }

// // It does mean we can now focus on just having
// // individual CRUD methods for each document by
// // using a single "document" API endpoint.
