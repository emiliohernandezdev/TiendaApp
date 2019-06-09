import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, AlertController } from 'ionic-angular';
import { Bill } from '../../models/Bill';
import { Client } from '../../models/Client';
import * as firebase from 'firebase';
import { firebaseToArray } from '../products/products';
/**
 * Generated class for the AddBillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-bill',
  templateUrl: 'add-bill.html',
})
export class AddBillPage {
  bill:Bill = new Bill('', '');
  client: Client = new Client('', '', '', '', '');
  products = [];
  stockedProducts = [];
  units = parseFloat(this.navParams.get("cant"))
  productRef:any = firebase.database().ref('products/');
  clientRef = firebase.database().ref('clients/');
  purchasesRef = firebase.database().ref('purchases/');
  product = this.navParams.get("product");
  snapChatcher :any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private view: ViewController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.products.push(this.navParams.get("product"))
    this.productRef.on('value', resp => {
      this.stockedProducts = [];
      this.stockedProducts = firebaseToArray(resp);
    })
  }

  Add(){
    if(this.units < this.product.stock){
      this.units += 1;
    }else{
      let toast = this.toastCtrl.create({
        message: 'No puedes pasar el límite de unidades disponibles',
        duration: 2500
      })
      toast.present();
    }
    
  }

  Remove(){
    if(this.units > 1){
      this.units -= 1;
    }
  }

  Dismiss(){
    let alert = this.alertCtrl.create({
      title: '¿Deseas salir?',
      subTitle: 'No se guardará la compra y tendrás que volver a facturar',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
        {
          text: 'Sí, salir',
          handler: () => {
            this.view.dismiss();
          }
        }
      ]
    })
    alert.present()
  }

  Save(){  
        let purchase = {
          name: this.client.name,
          surname: this.client.surname,
          email: firebase.auth().currentUser.email,
          products: []
        };
        let p = this.purchasesRef.push()
        p.set(purchase)
        .then((snap) => {
          this.snapChatcher = p.key
          let newVal = parseFloat(this.product.stock) - this.units;
          this.productRef = firebase.database().ref('products/' + this.product.key).update({
            stock: newVal
          })
          let product = {
            key: this.product.key,
            name: this.product.name,
            units: this.units
          }
          let toast = this.toastCtrl.create({
            message: 'Compra realizada con éxito.',
            duration: 2500
          });
          toast.present()
          .then(() => {
            this.purchasesRef = firebase.database().ref('purchases/' + this.snapChatcher + '/products/')
            let pur = this.purchasesRef.push()
            pur.set(product)
            .then(() =>{
              this.view.dismiss()
            })
            .catch((err) => {
              let toast = this.toastCtrl.create({
                message: 'Error al agregar los productos a la compra ' +err,
                duration: 2500
              });
              toast.present()
            })
          })



        })
        .catch((err) => {
          let toast = this.toastCtrl.create({
            message: 'Error al finalizar la compra.',
            duration: 2500
          });
          toast.present()
        })

  }

  AddProducts(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Agregar producto(s)');
    alert.setSubTitle('Agrega más mercadería a una factura')


    for(let i=0; i<this.stockedProducts.length; i++){
      alert.addInput({
        type: 'radio',
        label: this.stockedProducts[i].name,
        value: this.stockedProducts[i],
        checked: null
      });
    }



    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Aceptar',
      handler: data => {
        console.log(data)
      }
    });
    alert.present();
  }

}
