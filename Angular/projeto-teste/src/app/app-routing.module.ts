import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VagasListComponent } from './vagas/vagas-list/vagas-list.component';
import { VagasDetailComponent } from './vagas/vagas-detail/vagas-detail.component';
import { VagasFormComponent } from './vagas/vagas-form/vagas-form.component';
import { VagasCandidatoComponent } from './vagas/vagas-candidato/vagas-candidato.component';
import { LoginComponent } from './autenticacao/login/login.component';
import { AutentificacaoGuard } from './autenticacao/autentificacao.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'vagas', component: VagasListComponent, canActivate: [AutentificacaoGuard] },
  { path: 'vagas/create', component: VagasFormComponent, canActivate: [AutentificacaoGuard] },
  { path: 'vagas/:id', component: VagasDetailComponent, canActivate: [AutentificacaoGuard] },
  { path: 'vagas/edit/:id', component: VagasFormComponent, canActivate: [AutentificacaoGuard] },
  { path: 'inscricoes', component: VagasCandidatoComponent, canActivate: [AutentificacaoGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
