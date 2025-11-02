import { Conta } from "./conta.js";

export class Cliente {
    id : number;
    nome : string;
    cpf : string;
    dataNascimento:Date;
    contas:Conta[];

    constructor(id:number, nome:string, cpf:string, dataNascimento:Date, contas:Conta[]){
        this.id =id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = contas;
    }


    removerConta(numeroConta:string):void{
        const indice = this.contas.findIndex(c => c.numero === numeroConta);
        this.contas.splice(indice, 1);
    }

}