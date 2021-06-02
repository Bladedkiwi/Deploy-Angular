import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageList: Message[] = [];
  selectedMessageEvent = new EventEmitter<Message>();
  updateMessageListEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messageList = MOCKMESSAGES;
  }

  getMessageList(): Message[] {
    return this.messageList.slice();
  }

  getMessageById(id: string): Message {
    return this.messageList.find(message => (message.id === id ? document : null));
  }

  addMessageToList(message): void {
    this.messageList.push(message);
    this.updateMessageListEvent.emit(this.messageList.slice());
  }

}
