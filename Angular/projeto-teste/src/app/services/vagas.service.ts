import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl = `${environment.apiUrl}/vagas`;

  constructor(private http: HttpClient) {}

  createVagas(vaga: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vaga);
  }

  getVagas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getVagasStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vaga/${status}`);
  }

  getVagasById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateVagas(id: number, vaga: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, vaga);
  }

  deleteVagas(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  inscricaoVaga(aplicacaoDTO: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aplicacaoDTO);
  }

}