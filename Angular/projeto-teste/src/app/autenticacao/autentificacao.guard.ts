import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao.service';

@Injectable({
  providedIn: 'root'
})
export class AutentificacaoGuard implements CanActivate {

  constructor(private autentificacaoService: AutentificacaoService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.autentificacaoService.isAuthenticated()) {
      return true;
    } else {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}