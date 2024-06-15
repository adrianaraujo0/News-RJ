import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

register();

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userName: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async logoff() {
    try {
      await this.afAuth.signOut();
      console.log('Usuario deslogado:');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Não foi possível deslogar. Tente novamente mais tarde.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'Visitante';
  }

}
