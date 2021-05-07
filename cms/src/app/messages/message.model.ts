/**
 * Message
 * The model of a message containing:
 * Id - The id of the Message
 * Subject - The subject of the Message
 * MsgText - The text of the Message
 * Sender - The sender of the Message
 */
export class Message {
  constructor(
    public id: number,
    public subject: string,
    public msgText: string,
    public sender: string
  ){}

}
