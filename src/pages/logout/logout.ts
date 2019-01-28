import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginRegisterPage } from '../login-register/login-register';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logout() {
    this.navCtrl.setRoot(LoginRegisterPage);
  }

}
