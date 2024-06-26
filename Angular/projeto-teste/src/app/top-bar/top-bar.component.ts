import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { WebSocketService } from '../services/WebSocketService';
import { Router } from '@angular/router';
import { AutentificacaoService } from '../services/autentificacao.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  title = 'projeto-angular-gridster2';
  items: MenuItem[] | undefined;
  notificacoes = []
  usuario: string;
  tipoUsuario: string;


  constructor(
    private webSocketService: WebSocketService,
    private router: Router,
    private autentificacaoService: AutentificacaoService
  ) { }
  l

  ngOnInit() {
    this.usuario = this.autentificacaoService.getNomeUsuario();
    this.tipoUsuario = this.autentificacaoService.getTipoUsuario();
    if (this.tipoUsuario == "ADMIN") {
      this.receberNotificacoesAdmin();
      this.criarTopBarAdmin();
    } else {
      this.receberNotificacoesUsuario();
      this.criarTopBarUsuario();
    }

  }


  criarTopBarUsuario() {
    this.items = [
      {
        label: 'Vagas',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/vagas']);
        }
      },
      {
        label: 'Inscrições',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/inscricoes']);
        }
      },
      {
        label: this.usuario,
        icon: 'pi pi-user',
        items: [
          {
            label: 'Sair',
            icon: 'pi pi-undo',
            command: () => {
              this.autentificacaoService.logout()
            }
          },

          {
            separator: true
          },
        ]
      },
    ];
  }

  criarTopBarAdmin() {
    this.items = [
      {
        label: 'Vagas',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/vagas']);
        }
      },
      {
        label: this.usuario,
        icon: 'pi pi-user',
        items: [
          {
            label: 'Sair',
            icon: 'pi pi-undo',
            command: () => {
              this.autentificacaoService.logout()
            }
          },
          {
            separator: true
          },
        ]
      },
    ];
  }

  receberNotificacoesAdmin() {
    this.webSocketService.getMessages('/topic/applications').subscribe((message) => {
      this.notificacoes.push(JSON.parse(message));
    });
  }

  receberNotificacoesUsuario() {
    this.webSocketService.getMessages('/topic/approvals').subscribe((message) => {
      const usuarioId = Number(this.autentificacaoService.getUsuarioId());
        const menssagem = JSON.parse(message);
      if (usuarioId == menssagem['usuario']) {
        this.notificacoes.push(JSON.parse(message));
      }
    });
  }

}