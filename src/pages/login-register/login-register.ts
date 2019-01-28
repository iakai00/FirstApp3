import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { LoginResponse, RegisterResponse, User } from '../../interfaces/user';
import { HomePage } from '../home/home';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {
  // @ts-ignore
  user: User = { username: null };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.user_id.toString());
        this.navCtrl.push(MenuPage);
      },
      error => {
        console.log(error);
      });
  }
  checkUsers() {
    this.mediaProvider.checkUsers(this.user);

  }

  registerTo() {

        this.navCtrl.push(RegisterPage);
      };
}
