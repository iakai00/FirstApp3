import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avatar, Favourite, Media, UploadResponse } from '../../interfaces/media';
import { CheckUserResponse, LoginResponse, RegisterResponse, User, UserInfo } from '../../interfaces/user';

/*
  Generated class for the MediaProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
  loggedIn = false;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Media[]>(this.mediaAPI + 'media');
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaAPI + 'media/' + id);
  }

  getAvatar() {
    return this.http.get<Avatar[]>(this.mediaAPI + 'tags/profile');
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'login', user,
      httpOptions);
  }

  register(userData: User) {
    userData.confirmPassword = undefined;
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<RegisterResponse>(this.mediaAPI + 'users',
      userData, httpOptions);
  }

  checkUser(username) {
    return this.http.get<CheckUserResponse>(this.mediaAPI + 'users/username/' + username);
  }

  logout() {
    this.loggedIn = false;
  }

  uploadMedia(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.post<UploadResponse>(this.mediaAPI + 'media', data, httpOptions);
  }

  getFavouriteById(id) {
    return this.http.get<Favourite[]>(this.mediaAPI + 'favourites/file/' + id);
  }

  createFavourite(id) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.post(this.mediaAPI + 'favourites', 'file_id=' + id, httpOptions);
  }

  deleteFavourite(id) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.delete(this.mediaAPI + 'favourites/file/' + id, httpOptions);
  }

  getUser(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.get<UserInfo>(this.mediaAPI + 'users/' + id, httpOptions);
  }

  getUserFiles(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.get<Media[]>(this.mediaAPI + 'media/user/' + id, httpOptions);
  }

  updateSingleMedia(data: any, id) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.put(this.mediaAPI + 'media/' + id, data, httpOptions);
  }

  deleteSingleMedia(id) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.delete(this.mediaAPI + 'media/' + id, httpOptions);
  }
}
