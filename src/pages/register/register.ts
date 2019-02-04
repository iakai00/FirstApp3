import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage} from '../home/home';
import {
  CheckUserResponse,
  RegisterResponse,
  User,
} from '../../interfaces/user';
import { MenuPage } from '../menu/menu';
import { AlertController} from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // @ts-ignore
  user: User = { username: null };
  userCreated = false;
  registerDetails ={ email: '', username: '', password: '' };
  formIsValid = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['OK']
    });
     alert.present().catch();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  register() {
    this.mediaProvider.register(this.user).subscribe(
      (response: RegisterResponse) => {
        this.mediaProvider.loggedIn = true;
        this.navCtrl.push(MenuPage);
        console.log(response);

      },
    );

  }
  checkUser() {
    this.mediaProvider.checkUser(this.user.username).subscribe(
      (response: CheckUserResponse) => {
        const usernameAvailable = document.getElementById('username');
        if (!response.available) {
          usernameAvailable.style.color = 'red';
          usernameAvailable.innerHTML = this.user.username + ' is not available';
        } else {
          usernameAvailable.style.color = 'green';
          usernameAvailable.innerHTML = this.user.username + ' is available';
        }
      }
    );
  }

  confirmPassword() {
    if (this.user.password !== undefined) {
      if (this.user.password !== this.user.confirmPassword) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        password.style.color = 'red';
        confirmPassword.style.color = 'red';
        password.innerHTML = 'Password does not match!!';
        confirmPassword.innerHTML = 'Password does not match!!';
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    } else {
      const password = document.getElementById('password');
      password.style.color = 'red';
      password.innerHTML = 'Please input password.';
      document.getElementById('password').focus();
      this.formIsValid = false;
    }
  }
}


