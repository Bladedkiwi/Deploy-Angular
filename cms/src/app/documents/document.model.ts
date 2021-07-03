/**
 * Document
 * The model for a Document containing:
 * Id - The Document Id
 * Name - The name of the Document
 * Description - A brief description of the Document
 * Url - The URL of where the file is located
 * Children - A list of Document objects that are related to the current Document
 */
export class Document {


  constructor(
    public id: string,
    public name: string,
    public description: string,
    public url: string,
    public children: Document[]) {
  }
}
