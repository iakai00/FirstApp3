import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Media } from '../../interfaces/media';
import { MediaProvider } from '../../providers/media/media';
import { User } from '../../interfaces/user';
import { PlayerPage } from '../player/player';
import { UpdateMediaPage } from '../update-media/update-media';

/**
 * Generated class for the MyFilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-files',
  templateUrl: 'my-files.html',
})
export class MyFilesPage {

  userMediaArray: Observable<Media[]>;
  user: User = { };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilesPage');
    this.getUserFiles();
  }

  getUserFiles() {
    if (this.user.user_id === undefined) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      for (const k in userData) this.user[k] = userData[k];
    }
    this.userMediaArray = this.mediaProvider.getUserFiles(this.user.user_id);
  }

  playMedia(media: Media) {
    this.navCtrl.push(PlayerPage, { 'media': media }).catch(e => console.log(e));
  }

  updateMedia(media: Media) {
    this.navCtrl.push(UpdateMediaPage, { 'media': media }).catch(e => console.log(e));
  }

  confirmDelete(media: Media) {
    const alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Are you sure you want delete this file?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteMedia(media);
          }
        }
      ]
    });
    alert.present().catch(e => console.log(e));
  }


  deleteMedia(media: Media) {
    console.log(media);
    this.mediaProvider.deleteSingleMedia(media.file_id).subscribe(
      (response) => {
        console.log(response);
        this.getUserFiles();
      }
    );
  }

}
