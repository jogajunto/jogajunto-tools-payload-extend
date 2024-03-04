import { Payload } from 'payload';

// Define the function imagesForConvertNodeToMarkdown to retrieve and organize media information
// from a document structure, specifically targeting images related to the uploadCollectionName collection.
const imagesForConvertNodeToMarkdown = async (
  doc: any, // The document from which to extract media information. The exact type can vary depending on your document structure.
  payload: Payload // An instance of Payload CMS to access its API methods, such as findByID.
): Promise<Record<string, any>> => {
  // The function returns a promise that resolves to an object mapping media IDs to their corresponding documents.

  const uploadCollectionName = process.env.PAYLOAD_EXTEND_COLLECTION_UPLOADS;

  // Initialize an empty object to store information about found images.
  let images: Record<string, any> = {};

  // Iterate over the children of the root node of the provided document.
  // It assumes 'doc.content.root.children' contains nodes representing parts of the document, including media references.
  for (let child of doc.content.root.children) {
    // Checks if the current child node is related to the uploadCollectionName collection,
    // indicating that the node represents an image or other type of media.
    if (child.relationTo && child.relationTo === uploadCollectionName) {
      // Checks if the media node has a valid ID in 'value.id'.
      // This indicates that the image has been uploaded and has a reference in the uploadCollectionName collection.
      if (child.value.id) {
        // Uses the Payload CMS instance to find the corresponding media document by its ID.
        // This retrieves complete media document details, such as URLs, alt text, etc.
        const uploadDoc = await payload.findByID({
          id: child.value.id,
          collection: uploadCollectionName,
        });

        // Stores the retrieved media document in the 'images' object, using the image ID as the key.
        // This allows for quick access to media information by ID later on.
        images[child.value.id] = uploadDoc;
      }
    }
  }

  // Returns the 'images' object, containing information about all images found in the document.
  return images;
};

export default imagesForConvertNodeToMarkdown;
