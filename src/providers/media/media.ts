import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../../interfaces/pic';
import {
  CheckUserResponse,
  LoginResponse,
  RegisterResponse,
  User,
} from '../../interfaces/user';
import { Avatar } from '../../interfaces/media';

/*
  Generated class for the MediaProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  mediaApi = ' http://media.mw.metropolia.fi/wbma/';

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';


  loggedIn = false;

  user: User = null;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Media[]>(this.mediaApi + 'media');
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaApi + 'media/' + id);
  }

  getAvatar() {
    return this.http.get<Avatar[]>(this.mediaApi + 'tags/profile');
  }

  getFilesByTag(tag){
    return this.http.get<Media[]>(this.mediaApi + 'tags/' + tag);
  }
  getUserName(username){
    return this.http.get<Media>(this.mediaApi + 'media/' + username);
  }
  getEmail(email){
    return this.http.get<Media>(this.mediaApi + 'media/' + email);
  }

  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'login', user,
      httpOptions);
  }

  register(userData: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<RegisterResponse>(this.mediaApi + 'users',
      userData, httpOptions);
  }

  upload(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'media', data,
      httpOptions);
  }

  checkUsers(username) {
    return this.http.get(this.mediaApi + 'users/username/' + username);
  }

  profile(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<User>(this.mediaApi + 'profile', user,
      httpOptions);
  }

  checkUser(username) {
    return this.http.get<CheckUserResponse>(this.mediaApi + 'users/username/' + username);
  }

}
