import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {APIService} from "../../shared/service/APIService.service";
import {Order} from "../../shared/models/order.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  orders : [Order];

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, private APIService : APIService) {

  }

  ngOnInit(): void {

    this.APIService.getOrders("").then((orders) => {
      this.orders = orders
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Utilisateur inconnu',
        duration: 3000
      });
      toast.present();
    });
  }

}
