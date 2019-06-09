import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { NativeStorage } from '@ionic-native/native-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDs-UekALheW6tHX9zIOKSlC7N6vdT0NL0",
  authDomain: "storeappemiliohernandez.firebaseapp.com",
  databaseURL: "https://storeappemiliohernandez.firebaseio.com",
  projectId: "storeappemiliohernandez",
  storageBucket: "storeappemiliohernandez.appspot.com",
  messagingSenderId: "403195387808",
  appId: "1:403195387808:web:093a24bcfd7c5fcf"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "";
  userInfo:any="";
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private nativeStorage: NativeStorage, private app: App, private network: Network) {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.log('No hay red!');
      })
      disconnectSubscription.unsubscribe();
      if(localStorage.getItem('user') === null || localStorage.getItem('user') === undefined || localStorage.getItem('user') === ""){
        this.rootPage = LoginPage
      }else{
        this.rootPage = HomePage
      }
    platform.ready().then(() => {
      firebase.initializeApp(firebaseConfig);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

