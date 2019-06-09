import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { ProductsPage } from '../products/products';
import { PopoverController } from 'ionic-angular';
import { ReadmePage } from '../readme/readme';
import { LoginPage } from '../login/login';
import { ListBillsPage } from '../list-bills/list-bills';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  apps = [
    {id:'ap',name: 'Agregar producto', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRrMCjYqgeGSSMlgI_ql6Zk8s_k7S3oEIFt2TTI2pPYtLaV_Y', description: 'Inserta productos al stock'},
    {id: 'lp', name: 'Listar productos', image:'https://images.vexels.com/media/users/3/151869/isolated/preview/767ca771755f4675d4063c03e17c8595-icono-de-lista-de-verificaci--n-m--dica-by-vexels.png', description: 'Mira tus productos'},
    {id: 'lb', name: 'Ver ventas', image:'https://png.pngtree.com/png-vector/20190403/ourlarge/pngtree-vector-invoice-vector-icon-png-image_908802.jpg', description: 'Echar un vistazo a las ventas'},
    {id: 'lo', name: 'Cerrar sesión', image: 'https://image.flaticon.com/icons/png/512/277/277210.png', description: 'Salir de tu cuenta'}
  ]
  constructor(public navCtrl: NavController, private popOver: PopoverController,
    private alertCtrl: AlertController) {

  }

  LaunchApp(app){
    switch(app.id){
      case 'ap':
      this.navCtrl.push(AddProductPage)
      break;

      case 'lp':
      this.navCtrl.push(ProductsPage)
      break;

      case 'lb':
      this.navCtrl.push(ListBillsPage)
      break;

      case 'lo':
      let alert = this.alertCtrl.create({
        title: '¿Deseas cerrar sesión?',
        subTitle: 'Tendrás que volver que acceder',
        buttons: [
          {
            text: 'No, cancelar'
          },
          {
            text: 'Sí, salir',
            handler: () => {
              localStorage.removeItem('user');
              this.navCtrl.setRoot(LoginPage);
            }
          }
        ]
      })
      alert.present()
      
      break;
    }
  }

  Readme(){
    const popover = this.popOver.create(ReadmePage);
    popover.present()
  }

}
