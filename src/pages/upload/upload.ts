import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { UploadResponse } from '../../interfaces/media';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera/ngx';
import {CameraOptions} from '@ionic-native/camera/ngx';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
  providers: [[Camera]]

})
export class UploadPage {

  @ViewChild('uploadForm') uploadForm: any;

  file: any;
  title = '';
  description = '';

  fileData;
  type = '';

  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 200,
    warmth: 50,
  };

  fileChosen = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              public chooser: Chooser,
              public camera: Camera) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your file is uploading...',
  });

  handleChange($event) {
    this.file = $event.target.files[0];
    this.showPreview();
  }

  showPreview() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      this.fileData = reader.result;
    };

    if (this.file.type.includes('video')) {
      this.fileData = 'http://via.placeholder.com/500X200/000?text=Video';
    } else if (this.file.type.includes('audio')) {
      this.fileData = 'http://via.placeholder.com/500X200/000?text=Audio';
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  upload() {

    const description = `[d]${this.description}[/d]`;
    const filters = `[f]${JSON.stringify(this.filters)}[/f]`;

    this.loading.present().catch(e => console.log(e));

    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', description + filters);
    fd.append('file', this.file);

    this.mediaProvider.uploadMedia(fd).subscribe(
      (response: UploadResponse) => {
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

  reset() {
    this.uploadForm.reset();
    this.fileData = null;
    this.file = null;
  }

  chooseFile() {
    this.chooser.getFile('image/*, video/*, audio/*').then(file => {
      this.file = new Blob([file.data], { type: file.mediaType });
      this.fileData = file.uri;
      this.fileChosen = true;
    }).catch(e => console.error(e));
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        const byteString = atob(imageData);
        const dataArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          dataArray[i] = byteString.charCodeAt(i);
        }
        this.file = new Blob([dataArray], { type: 'image/jpeg' });
        this.fileData = 'data:image/jpeg;base64,' + imageData;
        this.fileChosen = true;
      },
      err => {
        console.log(err);
      }
    );
  }
}
