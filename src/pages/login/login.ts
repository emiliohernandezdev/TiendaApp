import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string = "";
  password: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  DoLogin(){
    if(this.email === "" || this.password === ""){
      let toast = this.toastCtrl.create({
        message: 'No puedes dejar campos vacíos',
        duration: 2500,
        closeButtonText: 'Cerrar',
        showCloseButton: true
      })
      toast.present()
    }else{
      let loader = this.loadingCtrl.create({
        content: 'Procesando...'
      })
      loader.present()
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        loader.dismiss()
        localStorage.setItem('user', user.email)
        this.navCtrl.setRoot(HomePage)
      })
      .catch((err) => {
        const alert = this.alertCtrl.create({
          title: 'Error al iniciar sesión',
          subTitle: 'Contraseña incorrecta, o el usuario no existe',
          buttons: ['Cerrar']
        });
        alert.present();
      })
    }
  }

  RecoverPassword(){
    const prompt = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      message: "Ingresa el correo electrónico con el que has registrado tu cuenta, para enviarte un correo para restaurar tu contraseña",
      inputs: [
        {
          name: 'email',
          placeholder: 'Correo electrónico',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: data => {
            firebase.auth().sendPasswordResetEmail(data.email)
            .then(() => {
              let toast = this.toastCtrl.create({
                message: 'Correo electrónico enviado a ' + data.email,
                duration: 2500
              })
              toast.present()
            })
            .catch((err) => {
              if(err.code==="auth/network-request-failed"){
                let toast = this.toastCtrl.create({
                  message: 'Correo no enviado, no hay conexión a internet',
                  duration: 2500
                })
                toast.present()
              }else if(err.code === "auth/too-many-requests"){
                let toast = this.toastCtrl.create({
                  message: 'Demasiados intentos de recuperar la contraseña. Intenta más tarde, o dentro de 24 horas',
                  duration: 2500
                })
                toast.present()
              }else if(err.code === "auth/user-not-found"){
                let toast = this.toastCtrl.create({
                  message: 'El correo electrónico ingresado no está asociado a ninguna cuenta',
                  duration: 2500
                })
                toast.present()
              }else{
                let toast = this.toastCtrl.create({
                  message: 'Ocurrió un error desconocido',
                  duration: 2500
                })
                toast.present()
              }
            })
          }
        }
      ]
    });
    prompt.present();
  }


}
