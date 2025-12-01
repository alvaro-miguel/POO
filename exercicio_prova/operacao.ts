import { Conta } from "./conta.js";

export class Operacao {
    id: number;
    conta: Conta;
    tipo: string;
    valor: number;
    descricao: string;
    dataHora: Date;

    constructor(id: number, conta: Conta, tipo: string, valor: number, descricao: string, dataHora: Date){
        this.id = id;
        this.conta = conta;
        this.tipo = tipo;
        this.valor = valor;
        this.descricao = descricao;
        this.dataHora = dataHora;
    }

    get get_id(){
        return this.id;
    }
    set set_id(id: number){
        this.id = id;
    }

    get get_conta(){
        return this.conta;
    }
    set set_conta(conta: Conta){
        this.conta = conta;
    }

    get get_tipo(){
        return this.tipo;
    }
    set set_tipo(tipo: string){
        this.tipo = tipo;
    }

    get get_valor(){
        return this.valor;
    }
    set set_valor(valor: number){
        this.valor = valor;
    }

    get get_descricao(){
        return this.descricao;
    }
    set set_descricao(texto: string){
        this.descricao = texto;
    }

    get get_dataHora(){
        return this.dataHora;
    }
    set set_dataHora(dataHora: Date){
        this.dataHora = new Date();
    }
}