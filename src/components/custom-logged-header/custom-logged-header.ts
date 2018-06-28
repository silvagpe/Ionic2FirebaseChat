import { Component, Input } from '@angular/core';

import { App, AlertController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { BaseComponent } from '../base.componente';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}
