import { Conta } from "./conta.js";
export class Cliente {
    id;
    nome;
    cpf;
    dataNascimento;
    contas;
    constructor(id, nome, cpf, dataNascimento, contas) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = contas;
    }
}
//# sourceMappingURL=cliente.js.map