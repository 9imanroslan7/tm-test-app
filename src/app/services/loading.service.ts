import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(public loadingctrl: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingctrl.create({
      // duration: 5000,
      //showBackdrop: false,
      //translucent: true,
      message: "Please wait..",
      //cssClass:'spinner',
      spinner: "circles",
      //message: '<ion-img src="../assets/load2.gif" class="loader-image" ></ion-img>',

    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingctrl.dismiss().then(() => console.log('dismissed'));
  }
}
