import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    standalone: false
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private loginService: LoginService,
      private notificationService: NotificationService
      ) {
      // Crea un FormGroup con i controlli 'username' e 'password'
      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
    ngOnInit(): void {

    }
  
    // Metodo per gestire la sottomissione del modulo
    onSubmit(): void {
      if (this.loginForm.valid) {
        // Qui puoi aggiungere la logica per inviare i dati del login
        if(this.loginForm.get('username')?.value == 'admin' && this.loginForm.get('password')?.value == 'admin'){
          this.loginService.login();
          this.router.navigateByUrl('dashboard')
        }
        else{
          this.notificationService.error('Errore nel login', 'Credenziali errate')
        }
      } else {
        console.log('Form is not valid');
      }
    }
}