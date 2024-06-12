import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public email: string = '';
  public password: string = '';
  public confirmsenha: string = '';
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async signup() {
    try {
      if (this.password === this.confirmsenha){
        const user = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
        this.router.navigate(['/login']);
      }
      else{
        this.showAlert('Senhas Diferentes', 'As senha deve ser a mesma')
      }
      
    } catch (error: any) {
      this.showAlert('Erro', error.message);
    }
    
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  

  ngOnInit() {
  }

}
