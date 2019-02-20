import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MediaProvider } from '../providers/media/media';
import { MenuPage } from '../pages/menu/menu';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { ProfilePage } from '../pages/Profile/profile';
import { RegisterPage } from '../pages/register/register';
import { PipesModule } from '../pipes/pipes.module';
import { MediaUploaderPage } from '../pages/media-uploader/media-uploader';
import { Chooser } from '@ionic-native/chooser';
import { Camera } from '@ionic-native/camera/ngx';
import { UpdateMediaPage } from '../pages/update-media/update-media';
import { MyFilesPage } from '../pages/my-files/my-files';
import { PlayerPage } from '../pages/player/player';
import { UploadPage } from '../pages/upload/upload';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    MediaUploaderPage,
    UploadPage,
    PlayerPage,
    MyFilesPage,
    UpdateMediaPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    HomePage,
    MenuPage,
    LoginRegisterPage,
    ProfilePage,
    MediaUploaderPage,
    UploadPage,
    PlayerPage,
    MyFilesPage,
    UpdateMediaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    Chooser,
  ],
})
export class AppModule {
}
