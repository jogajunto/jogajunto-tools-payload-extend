// Import required modules and types
import { CollectionName, FormatterCollection } from '../types';
import { Payload } from 'payload';
import { Document } from 'payload/types';

// Import utilities for rich text processing and YAML serialization
import {
  defaultEditorConfig,
  defaultEditorFeatures,
  getEnabledNodes,
  sanitizeEditorConfig,
} from '@payloadcms/richtext-lexical';

import yaml from 'js-yaml';

// Import functions for headless text editor and Markdown conversion
import { createHeadlessEditor } from '@lexical/headless';
import { $convertToMarkdownString } from '@lexical/markdown';

/**
 * Transforms a Payload CMS document into a Markdown formatted string with YAML front matter.
 *
 * @param doc Document - The Payload CMS document to be formatted. This object should contain all
 * the necessary data that needs to be formatted into Markdown and YAML.
 *
 * @param collectionName CollectionName - Specifies the collection to which the document belongs.
 * This information is used to determine the appropriate formatting rules and data transformation
 * logic based on the collection's schema and custom requirements.
 *
 * @param payload Payload - An instance of the Payload class, providing access to the entire Payload
 * CMS API. This parameter allows the function to perform additional operations or data fetches
 * from the CMS if necessary for the formatting process.
 *
 * @param formatters Record<CollectionName, FormatterCollection> - A mapping of collection names to
 * their respective data formatting functions. Each collection can have a custom formatting logic
 * defined in its FormatterCollection. This parameter enables the function to dynamically apply
 * the correct formatting rules based on the document's collection.
 *
 * @returns A promise that resolves to a string. The string contains the document's data formatted
 * as YAML front matter followed by the Markdown representation of the document's content.
 *
 * The function internally uses a headless editor to convert document content into Markdown and
 * serializes other document data into YAML format. It combines these two formats into a single
 * string, which can be used as file content for static site generators or other purposes that
 * require content in Markdown format with YAML front matter.
 */
const formatMarkdownV2 = async (
  doc: Document, // The Payload CMS document to format
  collectionName: CollectionName, // The name of the collection this document belongs to
  payload: Payload, // The Payload instance for accessing CMS functionalities
  formatters: Record<CollectionName, FormatterCollection> // A record mapping collection names to their data formatter functions
) => {
  // Retrieve the appropriate formatter for the given collection name
  const dataFormatter = formatters[collectionName];
  if (!dataFormatter) {
    // Throw an error if no formatter is found for the collection
    throw new Error(`Formatter for collection "${collectionName}" not found.`);
  }

  // Format the document data using the provided formatter
  const data = await dataFormatter(doc, payload);

  // Initialize content string for Markdown formatting
  let content = '\n';

  // Configure the editor with default settings, which can be customized as needed
  const yourEditorConfig = defaultEditorConfig;

  // Optionally, customize the editor features by adding or modifying the default features
  yourEditorConfig.features = [
    ...defaultEditorFeatures,
    // Add custom features here
  ];

  // Sanitize the editor configuration to ensure it is safe and valid
  const yourSanitizedEditorConfig = sanitizeEditorConfig(yourEditorConfig);

  // Check if the 'content' field is present in the document
  if (doc.content) {
    // Initialize the headless editor with sanitized configuration
    const headlessEditor = createHeadlessEditor({
      nodes: getEnabledNodes({
        editorConfig: sanitizeEditorConfig(yourEditorConfig),
      }),
    });

    try {
      // Parse the document's content into editor state, handling both string and object formats
      const editorState =
        typeof doc.content === 'string' ? JSON.parse(doc.content) : doc.content;

      // Set the editor state for conversion
      headlessEditor.setEditorState(
        headlessEditor.parseEditorState(editorState)
      );

      // Convert the editor state to Markdown string
      let markdown = '';
      headlessEditor.getEditorState().read(() => {
        markdown = $convertToMarkdownString(
          yourSanitizedEditorConfig?.features?.markdownTransformers
        );
      });

      // Append the converted Markdown to the content
      content += markdown;
    } catch (e) {
      // Log any errors encountered during parsing or conversion
      console.log(e, 'ERROR parsing editor state');
    }
  }

  // Serialize the formatted data to YAML
  const yamlText = yaml.dump(data);
  // Combine the YAML front matter and Markdown content into the final file content
  const fileContent = `---\n${yamlText}---\n${content}`;

  // Return the formatted file content
  return fileContent;
};

// Export the formatMarkdownV2 function for use in other parts of the project
export default formatMarkdownV2;
