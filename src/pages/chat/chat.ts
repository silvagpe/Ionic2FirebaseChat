import { AuthService } from '../../providers/auth.service';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { Chat } from '../../models/chat.model';
import { User } from './../../models/user.model';
import { Message } from '../../models/message.model';

import { ChatService } from '../../providers/chat.service';
import { MessageService } from '../../providers/message.service';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;

  pageTitle: string;
  sender: User;
  recipient: User;
  newMessage: string;

  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;


  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {

    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {

        //Retorna o usuário logado
        this.sender = currentUser;

        //Recupera os chars de cada usuário
        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        //Retorna as mensagems do chat
        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        let doSubscription = () => {
          this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
          this.viewMessages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            });
        };

        //Caso não exista mensagens para o conjunto de chaves, tenta consutlar
        //pelo conjunto inverso.
        this.messages
          .valueChanges()
          .first()
          .subscribe((messages: Message[]) => {

            if (messages.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubscription();

            } else {
              doSubscription();
            }

          });


      });

  }


  sendMessage(newMessage: string): void {

    if (newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;
      let message: Message = new Message(this.sender.$key, newMessage, currentTimestamp);

      this.messageService.create(message, this.messages)
        .then(() => {
          this.chat1
            .update({
              lastMessage: newMessage,
              timestamp: currentTimestamp
            });

          this.chat2
            .update({
              lastMessage: newMessage,
              timestamp: currentTimestamp
            });


        });

    }

  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content._scroll) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }


}
