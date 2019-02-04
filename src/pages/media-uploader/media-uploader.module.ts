import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MediaUploaderPage } from './media-uploader';

@NgModule({
  declarations: [
    MediaUploaderPage,
  ],
  imports: [
    IonicPageModule.forChild(MediaUploaderPage),
  ],
})
export class MediaUploaderPageModule {}
