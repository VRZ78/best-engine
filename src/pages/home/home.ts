import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {APIService} from "../../shared/service/APIService.service";
import {Order} from "../../shared/models/order.model";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import  {UserService } from '../../shared/service/user.service';
import {User} from "../../shared/models/user/user.model";
import {CreateAccountPage} from "../create-account/create-account";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[FileTransfer]
})
export class HomePage implements OnInit{

  orders : Order[];
  files : FileList;
  toSend : any[];
  currentUser : User;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, private APIService : APIService,private userService :UserService) {
      this.currentUser = this.userService.user;
  }



  ngOnInit(): void {

    this.APIService.getOrders(this.userService.user.id).then((orders:[Order]) => {
      this.orders = orders;
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Impossible de charger les commandes',
        duration: 3000
      });
      toast.present();
    });
  }

  orderDetails(order){
    this.navCtrl.push('OrderDetailsPage',{order:order});
  }

  onFileSelected($event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> $event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    let reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(files[0]);
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.toSend = JSON.parse(binaryString)
    this.APIService.createOrder(this.userService.user.id, this.toSend).then((order:Order) => {
      this.orders.push(order);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Impossible de créer la commande',
        duration: 3000
      });
      toast.present();
    });
  }

  createAccount = function () {
    this.navCtrl.push(CreateAccountPage);
  }

}
