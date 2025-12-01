import { Conta } from "./conta.js";
import { Operacao } from "./operacao.js";

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

    extrairOperacoesContas(): Operacao[]{
        const operacoes : Operacao[] = [];
        
        for (const conta of this.contas) {
            operacoes.push(...conta.operacoes)
        }

        return operacoes;
    }


    removerConta(numeroConta:string):void{
        const indice = this.contas.findIndex(c => c.numero === numeroConta);
        this.contas.splice(indice, 1);
    }

}