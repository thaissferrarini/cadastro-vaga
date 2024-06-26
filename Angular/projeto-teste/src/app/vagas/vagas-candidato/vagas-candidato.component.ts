import { Component, OnInit } from '@angular/core';
import { AplicacaoService } from '../../services/aplicacao.service';
import { AutentificacaoService } from '../../services/autentificacao.service';

@Component({
  selector: 'app-vagas-candidato',
  templateUrl: './vagas-candidato.component.html',
  styleUrls: ['./vagas-candidato.component.css']
})
export class VagasCandidatoComponent implements OnInit {
  vagas: any[] = [];

  constructor(
    private aplicacaoService: AplicacaoService,
    private autentificacaoService: AutentificacaoService
  ) { }

  ngOnInit(): void {
    this.carregarVagas();
  }

  carregarVagas(): void {
    const idCandidato = this.autentificacaoService.getUsuarioId();
    this.aplicacaoService.getAplicacoesCandidato(idCandidato).subscribe(dados => {
      this.vagas = dados;
    });
  }

  getStatusSeverity(status: string): "success" | "info" | "warning" | "danger" {
    switch (status.toLowerCase()) {
      case 'aprovado':
        return 'success';
      case 'pendente':
        return 'warning';
      case 'rejeitado':
        return 'danger';
      default:
        return 'info';
    }
  }
}