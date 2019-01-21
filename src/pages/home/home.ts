import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { Pic } from '../../../../firstApp-httpClient-B/src/interfaces/pic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  mediaApi: string = ' http://media.mw.metropolia.fi/wbma/';
  mediaArray: Media [] = [];
  configUrl = 'https://media.mw.metropolia.fi/wbma';

  constructor
  (
    private http: HttpClient,
    public navCtrl: NavController
  )
  {}

  getData() {
    return this.http.get<Pic[]>(this.configUrl + '/media');
  }

  ngOnInit() {
    this.getImagesFromServer();
  }


  getImagesFromServer() {
    this.http.get<Media[]>(this.mediaApi + 'media').subscribe(
      (result: Media[]) => {
        this.mediaArray = result;
      },
      (error) => {
        console.log(error);
      },
    );

  }
}
