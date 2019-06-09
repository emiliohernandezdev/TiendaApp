import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Product } from '../../models/Product';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  product: Product = new Product('', '', '', '', '', '');
  ref = firebase.database().ref('products/')
  myPhotosRef:any;
  captureDataUrl:string="";
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
      this.myPhotosRef = firebase.storage().ref('Products/');
  }

  Save(){
    if(this.product.name !== '' || this.product.image !== '' || this.product.originalPrice !== '' || this.product.priceToSell !== '' || this.product.stock !== ''){
      this.upload();
      let newProduct = this.ref.push();
      let data = {
        name: this.product.name,
        description: this.product.description,
        image: this.product.image,
        originalPrice: parseFloat(this.product.originalPrice),
        priceToSell: parseFloat(this.product.priceToSell),
        stock: parseFloat(this.product.stock)
      }
      newProduct.set(data)
      .then(() =>{
        let toast = this.toastCtrl.create({
          message: 'Producto guardado con éxito',
          duration: 2500
        })
        toast.present();
        this.navCtrl.pop()
      })
      .catch((err) => {
        console.log(err)
      })
    }else{
      let toast = this.toastCtrl.create({
        message: 'Debes completar la información obligatoria del producto',
        duration: 2500
      })
      toast.present()
    }

  }

  TakePhoto(){
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 500,
      targetHeight: 500,
      allowEdit: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;    
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Error al tomar la foto',
        duration: 2500
      })
      toast.present()
    })
  }

  upload(){
    this.loading = this.loadingCtrl.create({
      content: 'Subiendo imagen...'
    });
    this.loading.present();
    let ref = firebase.storage().ref('Products/');
    const imageRef = ref.child(this.product.name+'.jpg');
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((s) => {
      this.loading.dismiss();
      this.product.image = s.downloadURL;
      let toast = this.toastCtrl.create({
        message: 'Imagen subida con éxito',
        showCloseButton: true,
        closeButtonText: 'Cerrar',
        duration: 2500
      })
      toast.present();
    })
  }


}
