import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the UpdateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-product',
  templateUrl: 'update-product.html',
})
export class UpdateProductPage {
  product:any="";
  offer:boolean = false;
  offerPrice:string = "";
  captureDataUrl:string = "";
  loading:any = "";
  ref = firebase.database().ref('products/')
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private view: ViewController, private camera: Camera,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.product = this.navParams.get("product")
  }


  Update(){
      let updatedProduct = {
        name: this.product.name,
        description: this.product.description,
        image: this.product.image,
        originalPrice: parseFloat(this.product.originalPrice),
        priceToSell: parseFloat(this.product.priceToSell),
        stock: parseFloat(this.product.stock)
      }
      firebase.database().ref('products/' + this.product.key).remove()
      let prod = this.ref.push()
      prod.set(updatedProduct)
      .then(() => {
        let toast = this.toastCtrl.create({
          message: 'Producto actualizado con éxito',
          duration: 2500
        })
        toast.present();
        this.navCtrl.pop();
      })
      .catch((err) => {
        console.log(err)
      })
    
 
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
      this.loading = this.loadingCtrl.create({
        content: 'Subiendo imagen...',
      })
      this.loading.present();
      this.upload();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Error al subir la imagen: ' + err,
        duration: 2500
      })
      toast.present()
    })
  }

  upload(){
    let ref = firebase.storage().ref('Products/');
    const imageRef = ref.child(this.product.name+'.jpg');
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
    .then((s) => {
      this.loading.dismiss();
      this.product.image = s.downloadURL;
      let toast = this.toastCtrl.create({
        message: 'Imagen cambiada con éxito',
        showCloseButton: true,
        closeButtonText: 'Cerrar',
        duration: 2500
      })
      toast.present();
    })
  }

}
