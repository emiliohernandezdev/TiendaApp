import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PurchaseInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase-info',
  templateUrl: 'purchase-info.html',
})
export class PurchaseInfoPage {
  purchase:any = "";
  products:any = [];
  productArray= []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.purchase = this.navParams.get("purchase");
    this.products = this.navParams.get("products");
    for(var i in this.purchase.products){
      this.productArray.push([i, this.products[i]])
    }
    console.log('Products: ' + this.productArray)
  }

  Hide(){
    this.viewCtrl.dismiss()
  }

}
