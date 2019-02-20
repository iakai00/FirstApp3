import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/media';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  mediaArray: Observable<Media[]>;

  constructor(
    private mediaProvider: MediaProvider, public navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();
  }

}
