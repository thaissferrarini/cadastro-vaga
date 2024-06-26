import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutentificacaoService {
  private apiUrl = `${environment.apiUrl}/autentificacao`;
  loginDados: LoginResponse;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const loginRequest = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        map((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('tipoUsuario', response.usuario.tipoUsuario);
          localStorage.setItem('usuario', response.usuario.username);
          localStorage.setItem('usuarioId', response.usuario.id);

          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsuarioId(): string {
    const usuarioId = localStorage.getItem('usuarioId');
    if (usuarioId) {
      return usuarioId; 
    }
    return '';
  }

  getTipoUsuario(): string {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (tipoUsuario) {
      return tipoUsuario; 
    }
    return '';
  }

  public getNomeUsuario(): any {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    if (nomeUsuario) {
      return nomeUsuario; 
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}