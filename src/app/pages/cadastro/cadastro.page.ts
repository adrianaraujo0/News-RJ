import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public email: string = '';
  public password: string = '';
  public confirmsenha: string = '';
  public emailError: string = '';
  public passwordError: string = '';
  public confirmSenhaError: string = '';
  public showPassword: boolean = false;
  public showConfirmSenha: boolean = false;
  
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  async signup() {
    this.clearErrors();
    try {
      if (this.password === this.confirmsenha){
        const user = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
        this.router.navigate(['/login']);
      }
      else{
        this.confirmSenhaError = 'As senhas devem ser iguais.';
      }
      
    } catch (error: any) {
      this.handleError(error);
    }
    
  }

  handleError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.emailError = 'Email já está em uso.';
        break;
      case 'auth/invalid-email':
        this.emailError = 'Email inválido.';
        break;
      case 'auth/weak-password':
        this.passwordError = 'Senha fraca. A senha deve ter pelo menos 6 caracteres.';
        break;
      default:
        this.emailError = 'Ocorreu um erro. Tente novamente.';
    }
  }

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
    this.confirmSenhaError = ''
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmSenhaVisibility() {
    this.showConfirmSenha = !this.showConfirmSenha;
  }


  ngOnInit() {
  }

  ionViewWillLeave() {
    this.email = '';
    this.password = '';
    this.confirmsenha = '';
  }

}
