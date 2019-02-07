import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage} from '../home/home';
import {
  CheckUserResponse, LoginResponse,
  RegisterResponse,
  User,
} from '../../interfaces/user';
import { MenuPage } from '../menu/menu';
import { AlertController} from 'ionic-angular';
import { LoginRegisterPage } from '../login-register/login-register';
import { Avatar } from '../../interfaces/media';

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

  /*register() {
    this.mediaProvider.register(this.user).subscribe(
      (data: RegisterResponse) => {
        this.login();
        this.form.reset();
      }, error => {
        console.log(error);
        this.showAlert(error.error.message);
      },
    );*/

  register() {
    this.mediaProvider.register(this.user).subscribe(
      (response: RegisterResponse) => {
        this.login();
        //this.mediaProvider.loggedIn = true;
        //this.navCtrl.push(MenuPage);
        console.log(response);

      },
    );

  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('token', response.token);
        this.mediaProvider.getAvatar().subscribe(
          (avatars: Avatar[]) => {
            const myAvatar = avatars.filter((avatar: Avatar) => avatar.user_id === response.user.user_id);
            console.log('myavatar', myAvatar);
            if (myAvatar.length > 0) {
              response.user['avatar'] = myAvatar[0].filename;
            }
            localStorage.setItem('userData', JSON.stringify(response.user));
            //this.navCtrl.pop().catch(e => console.log(e));
            this.navCtrl.push(MenuPage);
          }
        )
      },
      error => {
        console.log(error);
      });
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


