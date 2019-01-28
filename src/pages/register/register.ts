import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage} from '../home/home';
import { RegisterResponse, User } from '../../interfaces/user';
import { MenuPage } from '../menu/menu';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /**register(){
    this.mediaProvider.register(this.registerDetails).subscribe(success => {
        console.log(success);
        this.userCreated = true;
      },
      error => {
        console.log(error);
      });
  }**/

  register() {
    this.mediaProvider.register(this.user).subscribe(
      (response: RegisterResponse) => {
        this.mediaProvider.loggedIn = true;
        this.navCtrl.push(MenuPage);
        console.log(response);

      },
    );

  }
}
