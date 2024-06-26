import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from '../../models/vaga';
import { VagasService } from '../../services/vagas.service';
import { AlertService } from '../../services/alert.service';
import { AutentificacaoService } from '../../services/autentificacao.service';

@Component({
  selector: 'app-vagas-form',
  templateUrl: './vagas-form.component.html',
  styleUrls: ['./vagas-form.component.css']
})
export class VagasFormComponent implements OnInit {
  @Input()
    vaga!: Vaga;
  titulo: string = 'Cadastro de Vaga';
  public formModel!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vagaService: VagasService,
    private messageService: MessageService,
    private router: Router, 
    private route: ActivatedRoute,
    private alertService: AlertService,
    private autentificacaoService: AutentificacaoService
  ) { }

  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.verificarVaga(id);
    this.buscar(id);
      
  }

  buscar(id: any): void {
    if(id != null) {
      this.vagaService.getVagasById(id).subscribe((vaga: Vaga) => {
            if(!vaga) {
              this.alertService.erro(`Vaga id: ${id} não encontrado`); 
              return;
            }
            this.formModel = this.fb.group({
            id: vaga.id,
            titulo: vaga.titulo,
            descricao: vaga.descricao,
            requisito: vaga.requisito,
          });
      });
    }
  }

  verificarVaga(id: any): void {
    if (id != null) {
      this.titulo = 'Editar vaga';
    } else {
      this.titulo = 'Cadastro de vaga';
    }
  }
  
  private createForm() {
    this.formModel = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      requisito: ['', Validators.required],
      adm: ['']
    });

  }

  salvar() {
    const usuarioId = this.autentificacaoService.getUsuarioId();
    this.formModel.value.adm = usuarioId;
    if (this.formModel.valid) {
      if(this.formModel.value.id == null) {
        this.vagaService.createVagas(this.formModel.value).subscribe(
          (data: any) => {
            this.alertService.sucesso('Vaga criada com sucesso!')
            this.router.navigate(['/vagas']);
          },
          (error) => {
            this.alertService.erro(error.error)
          },
          () => {}
        )
      } else {
        this.vagaService.updateVagas(this.formModel.get('id')?.value, this.formModel.value).subscribe(
          (data: any) => {
            this.alertService.sucesso('Vaga editada com sucesso!')
            this.router.navigate(['/vagas']);
          },
          (error) => {
            this.alertService.erro(error.error)
          },
          () => {}
        )
      }
    } else {
      this.alertService.aviso('Preencha todos os campos obrigatórios');
    }

    
  }

}
