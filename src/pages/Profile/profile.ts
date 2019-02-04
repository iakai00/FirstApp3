import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
// @ts-ignore
import { User } from '../../interface/user';
import { LoginRegisterPage } from '../login-register/login-register';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = { username: null , avatar: null };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad profilePage.');
    this.showUserInfo();
  }

  showUserInfo() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    for (const k in userData) this.user[k] = userData[k];
    console.log('show user ifno', this.user);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.setRoot(LoginRegisterPage).catch(e => console.log(e));
  }

}
