import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VagasService } from '../../services/vagas.service';
import { AplicacaoService } from '../../services/aplicacao.service';
import { Aplicacao } from '../../models/aplicacao';
import { WebSocketService } from '../../services/WebSocketService';
import { AlertService } from '../../services/alert.service';
import { AutentificacaoService } from '../../services/autentificacao.service';
import { Usuario } from '../../models/usuario';
import { Vaga } from '../../models/vaga';

@Component({
  selector: 'app-vagas-detail',
  templateUrl: './vagas-detail.component.html',
  styleUrls: ['./vagas-detail.component.css']
})
export class VagasDetailComponent implements OnInit {
  vagas: any = {};
  isAdmin: boolean = false;
  candidatos: Aplicacao[]=[];
  status: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private vagasService: VagasService,
    private aplicacaoService: AplicacaoService,
    private autentificacaoService: AutentificacaoService,
    private router: Router,
    private webSocketService: WebSocketService,
    private alertService: AlertService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.vagasService.getVagasById(Number(id)).subscribe(data => {
      this.vagas = data;
    });
    this.isAdmin = this.autentificacaoService.getTipoUsuario() === 'ADMIN';
    this.usuariosAplicacao();
  }

  inscricaoVaga(vaga: Vaga): void {
    const usuarioId = this.autentificacaoService.getUsuarioId();
    const usuario = new Usuario('', '', '', usuarioId, '', '');
    const aplicacao = new Aplicacao(vaga, usuario, '');
    const mensagem =  { nome: vaga.titulo, menssagem: `usuário ${usuario.nome} se candidatou` };
    this.aplicacaoService.inscricaoVaga(aplicacao).subscribe(
      (response) => {
        this.webSocketService.sendMessage('/app/application', JSON.stringify(mensagem));
        this.alertService.sucesso('Aplicação realizada com sucesso!');

      },
      (error) => {
        this.alertService.sucesso('Erro ao realizar aplicação')
      }
    );
  }

  usuariosAplicacao() {
    const id = this.route.snapshot.paramMap.get('id');
    this.aplicacaoService.usuariosAplicacao(id).subscribe(
      (response) => {
        this.candidatos = response;
      },
      (error) => {
        console.error('Erro ao realizar aplicação', error);
      }
    );
  }

  aprovarCandidato(atualiza: Aplicacao){
    atualiza.status = 'Aprovado';
    this.aplicacaoService.atualizaStatus(atualiza).subscribe(
      (response) => {
        this.avisarCanditatoAprovado(atualiza.usuario.id, atualiza.vaga.titulo)
        
        this.candidatos = response;

        this.alertService.sucesso('Aprovação feita com sucesso!')
      },
      (error) => {
        this.alertService.erro('Erro ao tentar aprovar candidato')
      }
    );
  }


   avisarCanditatoAprovado(userId: string, vaga): void {
    const approvalMessage = { usuario: userId, nome: vaga, menssagem: 'Você foi aprovado para a vaga!' };
    this.webSocketService.sendMessage('/app/approval', JSON.stringify(approvalMessage));
  }

   avisarCanditatoReprovado(userId: string, vaga): void {
    const approvalMessage = { usuario: userId, nome: vaga, menssagem: 'Você foi reprovado para a vaga!' };
    this.webSocketService.sendMessage('/app/approval', JSON.stringify(approvalMessage));
  }

  reprovarCandidato(atualiza: Aplicacao){
    atualiza.status = 'Reprovado';
    this.aplicacaoService.atualizaStatus(atualiza).subscribe(
      (response) => {
        this.avisarCanditatoReprovado(atualiza.usuario.id, atualiza.vaga.titulo)
        this.candidatos = response;
        this.usuariosAplicacao();
        this.alertService.sucesso('reprovação realizada com sucesso!')
      },
      (error) => {
        this.alertService.erro('Erro ao realizar aplicação')
      }
    );
  }

  deleteVagas() {
    const id = this.route.snapshot.paramMap.get('id');
    this.vagasService.deleteVagas(Number(id)).subscribe(() => {
      this.router.navigate(['/vagas']);
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