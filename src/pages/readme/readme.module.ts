import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadmePage } from './readme';

@NgModule({
  declarations: [
    ReadmePage,
  ],
  imports: [
    IonicPageModule.forChild(ReadmePage),
  ],
})
export class ReadmePageModule {}
