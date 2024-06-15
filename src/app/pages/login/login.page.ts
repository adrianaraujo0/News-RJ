import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string = '';
  public password: string = '';
  public emailError: string = '';
  public passwordError: string = '';
  public showPassword: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  async login() {
    this.clearErrors();
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      const user = userCredential.user;
      if (user) {
        const displayName = user.displayName || this.email;
        localStorage.setItem('userName', displayName);
      }
      console.log('Login bem-sucedido:', user);
      this.router.navigate(['../tabs']);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  handleError(error: any) {
    console.log('Erro de login:', error.code);
    switch (error.code) {
      case 'auth/invalid-email':
        this.emailError = 'Email inválido.';
        break;
      default:
        this.emailError = 'Oops! Parece que algo deu errado. Verifique seu email ou senha e tente novamente';
    }
  }

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.email = '';
    this.password = '';
  }

}
