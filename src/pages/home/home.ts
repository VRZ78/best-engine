import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {APIService} from "../../shared/service/APIService.service";
import {Order} from "../../shared/models/order.model";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import  {UserService } from '../../shared/service/user.service';
import {User} from "../../shared/models/user/user.model";
import {CreateAccountPage} from "../create-account/create-account";
import {OrderDetailsPage} from "../order-details/order-details";
import {Part} from "../../shared/models/part.model";

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

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, private APIService : APIService,private userService :UserService, private alertCtrl : AlertController) {
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
    this.navCtrl.push(OrderDetailsPage,{order:order});
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

    // Getting certificate
    this.APIService.getCertificatesForOrder(this.toSend).then((parts: Array<Part>) => {
      let messageString = "By clicking place order, you confirm that you have the certificates for each of the following parts :";
      for(let part of parts) {
        messageString = messageString.concat('<br>- ').concat(part.name).concat(" : ");
        for(let i = 0; i < part.certificates.length; i++) {
          messageString = messageString.concat(part.certificates[i]);
          if(i !== part.certificates.length - 1) {
            messageString = messageString.concat(', ');
          }
        }
      }
      let certificateAlert = this.alertCtrl.create({
        title: "Certificats requis",
        message: messageString,
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              certificateAlert.dismiss();
            }
          },
          {
            text: 'Place order',
            handler: (data) => {
              // Place the order
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
          }
        ]
      });
      certificateAlert.present();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Impossible de récupérer les certificats',
        duration: 3000
      });
      toast.present();
    });
  }

  createAccount () {
    this.navCtrl.push(CreateAccountPage);
  }

}
