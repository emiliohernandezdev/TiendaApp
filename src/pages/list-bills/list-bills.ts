import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import * as firebase from 'firebase';
import { firebaseToArray } from '../products/products';
import { ThrowStmt } from '@angular/compiler';
import { PurchaseInfoPage } from '../purchase-info/purchase-info';
/**
 * Generated class for the ListBillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-bills',
  templateUrl: 'list-bills.html',
})
export class ListBillsPage  implements OnInit{
  loaded:boolean = false;
  sells = [];
  valores = [];
  filter:string = "";
  contador: number = 0;
  ref = firebase.database().ref('purchases/');
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private popOver: PopoverController) {
    this.ref.on('value', resp => {
      this.sells = [];
      this.sells = firebaseToArray(resp);
    })

  }

  ngOnInit(){

  }

  ionViewDidLoad() {
    this.loaded = false;
    let loader = this.loadingCtrl.create({
      content: 'Cargando ventas...'
    });
    loader.present()
    this.ref.on('value', resp => {
      this.sells = [];
      this.sells = firebaseToArray(resp);
      loader.dismiss()
      this.loaded = true;
    });
  }

  onInput($ev:any){
    this.ionViewDidLoad()

    const val = $ev.target.value;

    if(val && val.trim() != ''){
      this.sells = this.sells.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
  }

  onCancel($event){
    this.ionViewDidLoad()
  }

  ViewPurchase(purchase:any){
    let p = this.popOver.create(PurchaseInfoPage, {purchase: purchase, products: purchase.products})
    p.present()
  }

}
