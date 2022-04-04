// - Goals for successfully saving and loading documents securely:
// Saving a document requires registration and being logged in.
// Being logged in requires having a cookie with a valid token.
// Validated tokens stored on "sessions" table correspond with a user_id that matches an id from "users" table
// So we can validate users. Good.

// - getDocumentsByUserId
// This should retrieve all documents with a matching user_id from "documents" table.
// A div is mapped to a useEffect that displays a list of documents and their titles,
// keyed by id from "documents" table, that match the user_id given by validating the token.

// - getDocumentById
// A user can click on one of their documents that show up in the sidebar (when logged in)
// This should insert document_content from "documents" into the editor field so the user can edit it

// A user wants to save their document. This may be a new document that does not exist yet.
// How can we check if a document does or doesn't exist?

// - updateDocumentById
// If the document already exists, they have ideally loaded it first into the editor
// This means we can store the document id into local storage/cookie.
// To save it, we first validate their session token to get their user_id.
// We then cross reference that the "documents" table entry they are referencing with their user_id cookie = user_id
// Then we update the document_title and document_content fields in "documents"

// - createDocument
// If the document does not exist yet, we can do the same as above, except they will not have a cookie
// We can still validate their user_id from the sessinToken, where we will call the createDocument function
// We pass in the user_id as the user_id for the document, and the content and title fields from the editor
// We then return a local storage/cookie documentId as it is the current document being edited.
// Might have issues if there are multiple windows open of the same instance, who knows.

// - deleteDocumentById
// similar to updateDocumentById, except its a nice little red trashcan button on the mapped list of getDocumentsByUserId
// Clicking it will give us the document id, the session token is validated, document user_id and validated user_id is matched
// The documentId is matched to user_id, and then the delete function is called and document id passed in as parameter
