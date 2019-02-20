import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { User } from '../../interfaces/user';
import { MediaProvider } from '../../providers/media/media';
import { MyFilesPage } from '../my-files/my-files';

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

  user: User = { };

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad profilePage.');
    this.showUserInfo();
  }

  showUserInfo() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    for (const k in userData) this.user[k] = userData[k];
  }

  logout() {
    localStorage.removeItem('token');
    this.mediaProvider.loggedIn = false;
    this.navCtrl.setRoot(MenuPage).catch(e => console.log(e));
  }

  toMyFilesPage() {
    this.navCtrl.push(MyFilesPage).catch(e => console.log(e));
  }

}
