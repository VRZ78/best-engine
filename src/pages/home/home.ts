import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {APIService} from "../../shared/service/APIService.service";
import {Order} from "../../shared/models/order.model";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import  {UserService } from '../../shared/service/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[FileTransfer]
})
export class HomePage implements OnInit{

  orders : Order[];

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, private APIService : APIService,private userService :UserService,private transfer: FileTransfer) {

  }

  fileTransfer: FileTransferObject = this.transfer.create();

  //fileTransfer.upload(..).then(..).catch(..);
  // full example
upload() {
  /*let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     headers: {}
     .....
  }*/

  /*this.fileTransfer.upload('<file path>', '<api endpoint>')
   .then((data) => {
     // success
   }, (err) => {
     // error
   })*/
}
  ngOnInit(): void {

    this.APIService.getOrders(this.userService.user.id).then((orders:[Order]) => {
      this.orders = orders;
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Utilisateur inconnu',
        duration: 3000
      });
      toast.present();
    });
  }
  orderDetails(){
    this.navCtrl.push('OrderDetailsPage');
  }

}
