import { Cliente } from "./cliente.js";

export class Conta {
    id : number;
    numero : string;
    cliente : Cliente;
    dataAbertura : Date;
    saldo : number;

    constructor(id:number, numero:string, cliente:Cliente, dataAbertura:Date, saldoInicial:number){
        this.id = id;
        this.numero = numero;
        this.cliente = cliente;
        this.dataAbertura = dataAbertura;
        this.saldo = saldoInicial;
    }


    depositar(valor:number):void {
        this.saldo += valor;
    }


    sacar(valor:number):void {
        this.saldo -= valor;
    }


    transferir(contaDestino: Conta, valor:number):void{
        this.sacar(valor);
        contaDestino.depositar(valor);
    }


    consultarSaldo():number{
        return this.saldo;
    }
}
