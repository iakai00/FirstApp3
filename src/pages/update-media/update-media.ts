import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/media';

/**
 * Generated class for the UpdateMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-media',
  templateUrl: 'update-media.html',
})
export class UpdateMediaPage {

  file: Media;
  title = '';
  description = '';
  fileData;

  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 200,
    warmth: 50,
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController) {
    this.file = this.navParams.get('media');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMediaPage');
    this.getMediaData();
    this.showMedia();
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Updating file ...',
  });

  showMedia() {
    if (this.file.mime_type.includes('video')) {
      this.fileData = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.file.mime_type.includes('audio')) {
      this.fileData = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      this.fileData = 'http://media.mw.metropolia.fi/wbma/uploads/' + this.file.filename;
    }
  }

  getMediaData() {

    this.title = this.file.title;

    const filterRegx = new RegExp('\\[f\\](.*?)\\[\\/f\\]');
    const descREgx = new RegExp('\\[d\\](.*?)\\[\\/d\\]');

    try {
      this.filters = JSON.parse(filterRegx.exec(this.file.description)[1]);
      this.description = descREgx.exec(this.file.description)[1];
    } catch (e) {
      try {
        const desc = JSON.parse(this.file.description);
        this.filters = desc['filters'] || this.filters;
        this.description = desc['description'] || '';
      } catch (e) {
        this.description = this.file.description;
      }
    }
  }

  updateMedia() {

    const description = `[d]${this.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;

    this.loading.present().catch(e => console.log(e));

    const data = new Object();
    data['title'] = this.title;
    data['description'] = description + filters;

    this.mediaProvider.updateSingleMedia(JSON.stringify(data), this.file.file_id).subscribe(
      (response) => {
        console.log(response);
        setTimeout(() => {
            this.loading.dismiss().catch(e => console.log(e));
            this.navCtrl.pop().catch(e => console.log(e));
          },
          2000,
        );
      }
    );
  }

}
