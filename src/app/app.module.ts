import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AddProductPage } from '../pages/add-product/add-product';
import { ProductsPage } from '../pages/products/products';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ReadmePage } from '../pages/readme/readme';
import { UpdateProductPage } from '../pages/update-product/update-product';
import { ListBillsPage } from '../pages/list-bills/list-bills';
import { AddBillPage } from '../pages/add-bill/add-bill';
import { PurchaseInfoPage } from '../pages/purchase-info/purchase-info';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AddProductPage,
    ProductsPage,
    ProductDetailsPage,
    ReadmePage,
    UpdateProductPage,
    ListBillsPage,
    AddBillPage,
    PurchaseInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Volver'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AddProductPage,
    ProductsPage,
    ProductDetailsPage,
    ReadmePage,
    UpdateProductPage,
    ListBillsPage,
    AddBillPage,
    PurchaseInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Camera,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
