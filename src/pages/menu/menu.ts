import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../Profile/profile';
import { MediaProvider } from '../../providers/media/media';
import { RegisterPage } from '../register/register';
import { User } from '../../interfaces/user';
import { MediaUploaderPage } from '../media-uploader/media-uploader';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homepage = HomePage;
  loginRegister = LoginRegisterPage;
  register = RegisterPage;
  profile = ProfilePage;
  upload = MediaUploaderPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.checkIfUserLoggedIn();
  }

  checkIfUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.mediaProvider.loggedIn = false;
      this.navCtrl.push(LoginRegisterPage).catch(e => console.log(e));
    } else {
      this.mediaProvider.loggedIn = true;
    }
  }
}
