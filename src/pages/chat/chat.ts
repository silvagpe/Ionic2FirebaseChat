import { AuthService } from '../../providers/auth.service';
import { AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from './../../models/user.model';
import { Message } from '../../models/message.model';

import { MessageService } from '../../providers/message.service';
import { UserService } from './../../providers/user.service';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: AngularFireList<Message>;
  pageTitle : string;
  sender: User;
  recipient : User;


  constructor(
    public authService : AuthService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService : UserService) {
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




      });

  }


  sendMessage(newMessage: string): void {


  }

}
