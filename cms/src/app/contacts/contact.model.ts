export class Contact {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group: Contact[]) {
  }
}
