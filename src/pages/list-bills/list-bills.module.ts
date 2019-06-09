import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListBillsPage } from './list-bills';

@NgModule({
  declarations: [
    ListBillsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListBillsPage),
  ],
})
export class ListBillsPageModule {}
