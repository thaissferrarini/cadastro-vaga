import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VagasService } from '../../services/vagas.service';
import { Vaga } from '../../models/vaga';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AplicacaoService } from '../../services/aplicacao.service';
import { WebSocketService } from '../../services/WebSocketService';
import { AlertService } from '../../services/alert.service';
import { Aplicacao } from '../../models/aplicacao';
import { Usuario } from '../../models/usuario';
import { AutentificacaoService } from '../../services/autentificacao.service';

@Component({
  selector: 'app-vagas-list',
  templateUrl: './vagas-list.component.html',
  styleUrls: ['./vagas-list.component.css']
})
export class VagasListComponent implements OnInit {
  isAdmin: boolean = false;
  vagas: Vaga[] = [];
  vagasFiltradas: Vaga[] = [];
  formPesquisaVagas: FormGroup = this.fb.group({
    filtro: ['']
  });

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private vagasService: VagasService,
    private aplicacaoService: AplicacaoService,
    private autentificacaoService: AutentificacaoService,
    private webSocketService: WebSocketService,
    private alertService: AlertService,
    private router: Router, 
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.autentificacaoService.getTipoUsuario() === 'ADMIN';
    this.cdr.detectChanges();
    this.buscaVagas();
  }

  buscaVagas(){
    if(!this.isAdmin){
      this.vagasService.getVagasStatus("Aberto").subscribe(data => {
        this.vagas = data;
        this.vagasFiltradas = data;
      });
    } else {
      this.vagasService.getVagas().subscribe(data => {
        this.vagas = data;
        this.vagasFiltradas = data;
      });
    }
  }

  filtrar() {
    const termo = this.formPesquisaVagas.get('filtro')?.value.toLowerCase();
    this.vagasFiltradas = this.vagas.filter(vaga => {
      const tituloMatch = vaga.titulo.toLowerCase().includes(termo);
      const descricaoMatch = vaga.descricao.toLowerCase().includes(termo);
      const requisitoMatch = vaga.requisito?.toString()?.toLowerCase()?.includes(termo);

      return tituloMatch || descricaoMatch || requisitoMatch;
    });
  }

  editar(vaga: Vaga) {           
    this.router.navigate(['/vagas/editar'], { queryParams: { id: vaga.id } });
  }

  
  inscricaoVaga(vaga: Vaga): void {
    const usuarioId = this.autentificacaoService.getUsuarioId();
    const usuario = new Usuario('', '', '', usuarioId, '', '');
    const aplicacao = new Aplicacao(vaga, usuario, '');
    const mensagem =  { nome: "vaga para capinar", menssagem: `usuário ${usuario.nome} se candidatou` };
    this.aplicacaoService.inscricaoVaga(aplicacao).subscribe(
      (response) => {
        this.webSocketService.sendMessage('/app/application', JSON.stringify(mensagem));
        this.alertService.sucesso('Aplicação realizada com sucesso!');
        this.buscaVagas();

      },
      (error) => {
        this.alertService.sucesso('Erro ao realizar aplicação')
      }
    );
  }

  


}