import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageList: Message[] = [];
  selectedMessageEvent = new Subject<Message>();
  updateMessageListEvent = new Subject<Message[]>();
  messageListMaxId: number;

  constructor(private httpClient: HttpClient) {
    // this.messageList = MOCKMESSAGES;
    httpClient.get<Message[]>('https://wdd430-cms-hy-default-rtdb.firebaseio.com/messages.json').subscribe(
      (messageListDB: Message[]) => {
        this.messageList = messageListDB;
        this.messageListMaxId = this.getMessageMaxId();
        console.log('Hello Get Request');
        this.messageList.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        });
        this.updateMessageListEvent.next(this.messageList.slice());
      },
      error => {
        console.log(error.message);
      });
  }

  storeMessageList(): void {
    const msgArray = JSON.stringify(this.messageList);
    const httpHeaderJson = new HttpHeaders('application/json');
    this.httpClient.put('https://wdd430-cms-hy-default-rtdb.firebaseio.com/messages.json', msgArray, {headers: httpHeaderJson}).subscribe(
      (response) => {

        if (typeof response === 'string') {
          this.updateMessageListEvent.next(JSON.parse(response));
        }
      }, error => {
        console.log(error.message);
      }
    );
  }

  /**
   * getMaxId
   * Retrieves the max Id number from a given list.
   * Id must be a string, and included an item of the array
   * @return maxId The number of the highest id in the list.
   */
  getMessageMaxId(): number {
    let maxId = 0;

    const chkMax = (id: number) => {
      if (id > maxId) {
        maxId = id;
      }
    };

    this.messageList.forEach((item) => {
      chkMax(parseFloat(item.id));
    });
    return maxId;
  }

  getMessageList(): Message[] {
    return this.messageList.slice();
  }

  getMessageById(id: string): Message {
    return this.messageList.find(message => (message.id === id ? message : null));
  }

  addMessageToList(newMessage: Message): void {
    // Checks if newDocument is null/undefined before assigning a new Id
    if (!((null ?? newMessage.id) || (undefined ?? newMessage.id))) {
      newMessage.id = String((this.getMessageMaxId() + 1));
      this.messageList.push(newMessage);
      this.messageList.push(newMessage);

      // this.updateMessageListEvent.emit(this.messageList.slice());
      this.storeMessageList();
    } else {
      return;
    }

  }
}
