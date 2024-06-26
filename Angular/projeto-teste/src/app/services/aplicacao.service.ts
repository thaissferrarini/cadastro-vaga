import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Aplicacao } from '../models/aplicacao';

@Injectable({
  providedIn: 'root'
})
export class AplicacaoService {
  private apiUrl = `${environment.apiUrl}/aplicacao`;

  constructor(private http: HttpClient) {}

  inscricaoVaga(aplicacao: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aplicacao);
  }
  
  getAplicacoesCandidato(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  usuariosAplicacao(idVaga: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vaga/${idVaga}`);
  }
  
  atualizaStatus(atualiza: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/status`, atualiza);
  }

}