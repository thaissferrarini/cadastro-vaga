export class Usuario {
    id: string;
    username: string;
    tipoUsuario: string;
    nome: string;
    cargoAtual: string;
    competencias:string;

    constructor(username: string, tipoUsuario: string, nome: string, id: string, cargoAtual: string, competencias:string) {
      this.username = username;
      this.tipoUsuario = tipoUsuario;
      this.nome = nome;
      this.cargoAtual = cargoAtual;
      this.competencias = competencias;
      this.id = id;
  }
  }