import { Component, OnInit } from '@angular/core';
import { SignIn, SignUp } from '../interface/auth.interface';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})

export class AuthPage implements OnInit {
  authType: boolean = false;
  signInCredentials: SignIn = { dni: '', password: '' };
  signUpCredentials: SignUp = { dni: '', firstName: '', lastName: '', password: '' };

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) { }

  refreshFields() {
    this.signInCredentials = { dni: '', password: '' };
    this.signUpCredentials = { dni: '', firstName: '', lastName: '', password: '' };
  };

  async createToast(message: string) {
    return await this.toastController.create({ message, duration: 3000 });
  }

  async ngOnInit() {
    const authRes = await this.authService.automaticSign();
    if (authRes) {
      const toastMessage = await this.createToast('Bienvenido devuelta!');
      toastMessage.present();
      this.router.navigate(['/dashboard']);
    };
  }

  changeRegisterType() {
    this.authType = !this.authType;
  }

  async sendForm() {
    if (!this.authType) {
      const authRes = await this.authService.authenticateUser(this.signInCredentials);
      const toastMessage = await this.createToast(authRes ? 'Bienvenido.' : 'Campos invalidos.');
      if (authRes) {
        this.router.navigate(['/dashboard']);
        this.refreshFields();
      }
      return toastMessage.present();
    } else {
      const res = this.authService.registerUser(this.signUpCredentials);
      const toastMessage = await this.createToast(res ? 'Registro exitoso' : 'Campos invalidos.');
      if (res) this.refreshFields();
      return toastMessage.present();
    }
  }

}
