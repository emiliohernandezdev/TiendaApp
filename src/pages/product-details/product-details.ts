import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  data:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get("product");
  }

  Hide(){
    this.view.dismiss()
  }

}
