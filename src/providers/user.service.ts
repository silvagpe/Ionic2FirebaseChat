import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { BaseService } from './base.service';

import { User } from '../models/user.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';


@Injectable()
export class UserService extends BaseService {

  users : Observable<User[]>;

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient) {
    super();

    this.users = this.db.list<User>(`/users`).valueChanges();

    console.log(this.users);

  }


  create(user: User, uuid: string): Promise<void> {
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }
}
