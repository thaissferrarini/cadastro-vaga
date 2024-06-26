import { Usuario } from "./usuario";
import { Vaga } from "./vaga";

export class Aplicacao {
    id?: number;
    vaga: Vaga;
    usuario: Usuario;
    status: string;

    constructor(vaga: Vaga, usuario: Usuario, status: string, id?: number) {
        this.vaga = vaga;
        this.usuario = usuario;
        this.status = status;
        if (id) this.id = id;
    }
}