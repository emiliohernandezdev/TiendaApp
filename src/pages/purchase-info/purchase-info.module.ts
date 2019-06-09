import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseInfoPage } from './purchase-info';

@NgModule({
  declarations: [
    PurchaseInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseInfoPage),
  ],
})
export class PurchaseInfoPageModule {}
