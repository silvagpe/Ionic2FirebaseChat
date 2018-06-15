import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { User } from '../../models/user.model';
import { UserService } from './../../providers/user.service';
import { SignupPage } from './../signup/signup';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users : Observable<User[]>;

  constructor(
    public navCtrl: NavController,
    public usersService : UserService) {

  }

  onChatCreate(user : User) : void{
    console.log(user);

  }

  ionViewDidLoad(){

    this.users = this.usersService.users;


  }

  onSignup():void{
    this.navCtrl.push(SignupPage)
  }

}
