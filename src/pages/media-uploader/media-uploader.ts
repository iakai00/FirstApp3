import { Component, ViewChild } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Chooser } from '@ionic-native/chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the MediaUploaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-media-uploader',
  templateUrl: 'media-uploader.html',
})
export class MediaUploaderPage {
  @ViewChild('uploadForm') myForm: any;
  fileData = '';
  file: File;
  type = '';
  title = '';
  description = '';
  myBlob;
  myImage: any;

  filters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    warmth: 100,
  };
  private camera: any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
    public chooser: Chooser,
    ) {
  }

  ionViewDidLoad() {
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
      console.log(reader.result);
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
    // show spinner
    this.loading.present().catch();

    const fd = new FormData();
    fd.append('title', this.title);
    fd.append('description', description + filters);
    fd.append('file', this.file);
    this.mediaProvider.upload(fd).subscribe(resp => {

      // setTimeout 2 secs
      setTimeout(() => {
          // hide spinner
          this.loading.dismiss().catch();
          this.navCtrl.pop().catch();
        },
        2000,
      );
    });
  }

  reset() {
    this.myForm.reset();
    this.fileData = null;
  }

  uploadData() {
    this.chooser.getFile('image/*, video/*, audio/*').then(file => {
      console.log(file ? file.name : 'canceled');
      this.myBlob = new Blob([file.data], { type: file.mediaType });
    }).catch((error: any) => console.error(error));
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.myImage = 'data:image/jpeg;base64,' + imageData;
      },
      err => {
        console.log(err);
      }
    );
  }
}
