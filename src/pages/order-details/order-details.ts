import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {APIService} from "../../shared/service/APIService.service";
import {User} from "../../shared/models/user/user.model";

/**
 * Generated class for the OrderDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html',
})
export class OrderDetailsPage {
	order :any;
	products:any[];
	currentUser : User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private APIService : APIService, private toastCtrl : ToastController) {
    this.order=this.navParams.get('order');
    this.currentUser = this.APIService.currentUser
  	console.log('order : '+this.navParams.get('order'));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
  }

  changeOrderStatus(status) {
    console.log(this.order)
    this.APIService.changeOrderStatus(this.order._id, status).then(() => {
      this.order.status = status;
      this.navCtrl.pop()
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Impossible to change status',
        duration: 3000
      });
      toast.present();
    })
  }

}
