import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VagasDetailComponent } from './vagas/vagas-detail/vagas-detail.component';
import { VagasListComponent } from './vagas/vagas-list/vagas-list.component';
import { AutentificacaoService } from './services/autentificacao.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { VagasFormComponent } from './vagas/vagas-form/vagas-form.component';
import { MessageService } from 'primeng/api';
import { AlertService } from './services/alert.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSocketService } from './services/WebSocketService';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { TopBarComponent } from './top-bar/top-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { VagasCandidatoComponent } from './vagas/vagas-candidato/vagas-candidato.component';
import { CardModule } from 'primeng/card';
import { LoginComponent } from './autenticacao/login/login.component';

const primeNg = [
  TableModule,
  ButtonModule,
  InputTextModule,
  AccordionModule,
  DialogModule,
  CalendarModule,
  FormsModule,
  ReactiveFormsModule,
  ConfirmDialogModule,
  MessagesModule,
  PaginatorModule,
  ToastModule,
  DropdownModule,
  AccordionModule,
  InputMaskModule,
  MenubarModule,
  AvatarModule,
  BadgeModule,
  OverlayPanelModule,
  CardModule
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VagasDetailComponent,
    VagasListComponent,
    VagasFormComponent,
    TopBarComponent,
    VagasCandidatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    primeNg,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AutentificacaoService, MessageService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }