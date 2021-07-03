import {EventEmitter, Injectable} from '@angular/core';
import {Message} from './message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {ContactService} from "../contacts/contact.service";


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageList: Message[] = [];
  // selectedMessageEvent$ = new Subject<Message>();
  updateMessageListEvent$ = new Subject<Message[]>();
  messageListMaxId: number;
  private msgEndpoint = 'http://localhost:3000/messages';
  private jsonHeader = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient, private contactService: ContactService) {
    // this.messageList = MOCKMESSAGES;
    this.contactService.retrieveContactList();
    httpClient.get<Message[]>(this.msgEndpoint).subscribe(
      (messageListDB: Message[]) => {
        this.messageList = messageListDB;
        this.messageListMaxId = this.getMessageMaxId();
        // this.messageList.sort((a, b) => {
        //   if (a.id < b.id) {
        //     return -1;
        //   } else if (a.id > b.id) {
        //     return 1;
        //   } else {
        //     return 0;
        //   }
        // });
        this.sortMessageList();
        // this.updateMessageListEvent$.next(this.messageList.slice());
      },
      error => {
        console.log(error.message);
      });
  }

  // storeMessageList(): void {
  //   const msgArray = JSON.stringify(this.messageList);
  //   const httpHeaderJson = new HttpHeaders('application/json');
  //   this.httpClient.put(this.msgEndpoint, msgArray, {headers: httpHeaderJson}).subscribe(
  //     (data: Message[]) => {
  //       this.updateMessageListEvent$.next(data);
  //     }, error => {
  //       console.log(error.message);
  //     }
  //   );
  // }

  /**
   * SortMessageList
   * Orders the list of documents by their id
   *
   */
  sortMessageList(): void {
    this.messageList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      else if ( a.id > b.id) {
        return 1;
      }
      else {
        return 0;
      }
    });
    this.updateMessageListEvent$.next(this.messageList.slice());

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
    // Checks if newMessage is null/undefined before assigning a new Id
    if (newMessage) {
      newMessage.id = String((this.getMessageMaxId() + 1));
      this.messageList.push(newMessage);

      // Add Document to the server
      this.httpClient.post<Message>(this.msgEndpoint, newMessage, {headers: this.jsonHeader}).subscribe(
        (message) => {
          console.log(message);
          this.messageList.push(message);
          this.sortMessageList();
          // this.updateDocumentListEvent$.next(this.documentList.slice());
        }
      );

      // this.storeMessageList();
    } else {
      return;
    }

  }
}
