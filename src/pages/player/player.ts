import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Media } from '../../interfaces/media';
import { MediaProvider } from '../../providers/media/media';
import { UserInfo } from '../../interfaces/user';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  media: Media;
  likes = 0;
  likeButton: HTMLElement;
  mediaDescribtion = '';
  userLiked = false;
  user: UserInfo = { username: 'unkown' };

  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 200,
    warmth: 50,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider) {
    this.media = this.navParams.get('media');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
    this.getLikes();
    this.getUser();
    this.getDescribtion();
    this.likeButton = document.getElementById('likeButton');
  }

  getLikes() {
    this.mediaProvider.getFavouriteById(this.media.file_id).subscribe(
      (favoriteList) => {
        this.likes = favoriteList.length;
        const currentUser = JSON.parse(localStorage.getItem('userData'));
        this.userLiked = favoriteList.filter(fav => fav.user_id === currentUser.user_id).length > 0;
        if (this.userLiked) this.likeButton.style.fill = '#ef3232';
      }
    );
  }

  getUser() {
    this.mediaProvider.getUser(this.media.user_id).subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  likeMedia() {
    if (this.userLiked) {
      this.mediaProvider.deleteFavourite(this.media.file_id).subscribe(
        (message) => {
          this.likeButton.style.fill = '#ffffff';
          this.likes -= 1;
          this.userLiked = false;
        }
      );
    } else {
      this.mediaProvider.createFavourite(this.media.file_id).subscribe(
        (message) => {
          this.likeButton.style.fill = '#ef3232';
          this.likes += 1;
          this.userLiked = true;
        }
      );
    }
  }

  getDescribtion() {

    const filterRegx = new RegExp('\\[f\\](.*?)\\[\\/f\\]');
    const descREgx = new RegExp('\\[d\\](.*?)\\[\\/d\\]');

    try {
      this.filters = JSON.parse(filterRegx.exec(this.media.description)[1]);
      this.mediaDescribtion = descREgx.exec(this.media.description)[1];
    } catch (e) {
      try {
        const desc = JSON.parse(this.media.description);
        this.filters = desc['filters'] || this.filters;
        this.mediaDescribtion = desc['description'] || '';
      } catch (e) {
        this.mediaDescribtion = this.media.description;
      }
    }
  }

}
