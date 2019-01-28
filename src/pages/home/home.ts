import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/pic';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //template: `<p>added on {{ time_created | date }}</p>`

})
export class HomePage {

  mediaArray: Observable<Media[]>;

  constructor(
    private mediaProvider: MediaProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.getAllFiles();
  }

  getAllFiles() {
    this.mediaArray = this.mediaProvider.getAllMedia();
  }

  /*getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((result: Media[]) => {
        console.log(result);
        result.forEach((pic: Media) => {
          console.log(pic);

          this.mediaProvider.getSingleMedia(pic.file_id).
            subscribe((file: Media) => {
              console.log(file);

              this.mediaArray.push(file);
            });
        });
      }, (err) => {
        console.log(err);
      },
    );
  }*/

}
