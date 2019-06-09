import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ActionSheetController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { UpdateProductPage } from '../update-product/update-product';
import { AddBillPage } from '../add-bill/add-bill';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  ref = firebase.database().ref('products/');
  products = [];
  filter:string = "";
  loaded: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController,
    private popOver: PopoverController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loaded = false;
    let loader = this.loadingCtrl.create({
      content: 'Cargando productos...'
    });
    loader.present()
    this.ref.on('value', resp => {
      this.products = [];
      this.products = firebaseToArray(resp);
      loader.dismiss()
      this.loaded = true;
    });
  }

  ShowOptions(product){
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opciones para: '+product.name,
      buttons: [
        {
          text: 'Agregar unidades',
          role: 'destructive',
          icon: 'add',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '¿Cuántas unidades vas a agregar?',
              inputs: [
                {
                  name: 'units',
                  type: 'number',
                  placeholder: 'Unidades a agregar'
                }
              ],
              buttons: [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Aceptar',
                  handler: (data)  => {
                    let units = parseFloat(data.units);
                    firebase.database().ref('products/'+product.key).update({stock: product.stock + units})
                    .then(() => {
                      let toast = this.toastCtrl.create({
                        message: 'Unidades de producto agregadas',
                        closeButtonText: 'Cerrar',
                        showCloseButton: true,
                        duration: 2500
                      });
                      toast.present();
                    })
                    .catch((err) => {
                      let toast = this.toastCtrl.create({
                        message: 'Error al agregar las unidades: ' +err,
                        closeButtonText: 'Cerrar',
                        showCloseButton: true,
                        duration: 2500
                      });
                      toast.present();
                    })
                  }
                }
              ]
            })
            alert.present()
          }
        },
        {
          text: 'Vender este producto',
          role: 'destructive',
          icon: 'cash',
          handler: () => {
            let alert = this.alertCtrl.create({
              title: '¿Cuántas unidades vas a vender?',
              inputs: [
                {
                  name: 'units',
                  type: 'number',
                  placeholder: 'Unidades a vender'
                }
              ],
              buttons: [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Vender',
                  handler: (data)  => {
                    if(data.units > product.stock){
                      let toast = this.toastCtrl.create({
                        message: 'No hay demasiadas unidades disponibles',
                        duration: 2500
                      })
                      toast.present()
                    }else if(data.units < 1 || data.units === '' || data.units === null || data.units === undefined){
                      let toast = this.toastCtrl.create({
                        message: 'Debes ingresar un número mayor a 0',
                        duration: 2500
                      })
                      toast.present()
                    }else{
                      let p =this.popOver.create(AddBillPage, {
                        product: product,
                        cant: data.units
                      })
                      p.present()
                    }

                  }
                }
              ]
            })
            alert.present()
          }
        },
        {
          text: 'Editar producto',
          icon: 'create',
          handler: () => {
            this.navCtrl.push(UpdateProductPage, {
              product: product
            });
          }
        },
        {
          text: 'Eliminar',
          icon: 'trash',
          handler: () => {
            const confirm = this.alertCtrl.create({
              title: 'Confirmar acción',
              message: '¿Realmente deseas eliminar el producto?',
              buttons: [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Sí, eliminar',
                  handler: () => {
                    let loading = this.loadingCtrl.create({
                      content: 'Eliminando...'
                    })
                    firebase.database().ref('products/'+product.key).remove()
                    .then(() => {
                      loading.dismiss()
                      let toast = this.toastCtrl.create({
                        message: 'Producto eliminado con éxito',
                        duration: 2500
                      })
                      toast.present()
                      let photoRef = firebase.storage().ref('Products/' + product.name + '.jpg');
                      photoRef.delete()

                    })
                    
                  }
                }
              ]
            });
            confirm.present();
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  Details(product){
    const pop = this.popOver.create(ProductDetailsPage, {
      product
    })
    pop.present();

  }

  onInput($ev:any){
    this.ionViewDidLoad()

    const val = $ev.target.value;

    if(val && val.trim() != ''){
      this.products = this.products.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
  }

  onCancel($event){
    this.ionViewDidLoad()
  }

}

export const firebaseToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
