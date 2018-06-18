import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { BaseService } from "./base.service";

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public afAuth: AngularFireAuth,
    public http: HttpClient) {

      super();
      console.log('Hello AuthProvider Provider');
  }


  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }


}
