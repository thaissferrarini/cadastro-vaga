import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/login';
import { AlertService } from '../../services/alert.service';
import { AutentificacaoService } from '../../services/autentificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private autentificacaoService: AutentificacaoService, 
    private router: Router,
    private alertService: AlertService
  ) {}

  login() {
    this.autentificacaoService.login(this.username, this.password).subscribe({
      next: (response: LoginResponse) => {
        this.router.navigate(['/vagas']);
      },
      error: (error) => {
        this.alertService.erro('Falha ao tentar fazer login')
      }
    });
  }
}