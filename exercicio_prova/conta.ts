import { Cliente } from "./cliente.js";
import { Operacao } from "./operacao.js";

export class Conta {
    id : number;
    numero : string;
    cliente : Cliente;
    dataAbertura : Date;
    saldo : number;
    operacoes: Operacao[] = [];
    limite: number;
    idOperacaoAtual: number;

    constructor(id:number, numero:string, cliente:Cliente, dataAbertura:Date, saldoInicial:number, limiteInicial: number, idConstrutorAtual: number){
        this.id = id;
        this.numero = numero;
        this.cliente = cliente;
        this.dataAbertura = dataAbertura;
        this.saldo = saldoInicial;
        this.limite = limiteInicial;
        this.idOperacaoAtual = idConstrutorAtual;
    }

    get getOperacoes(){
        return this.operacoes;
    }


    depositar(valor:number):Operacao {
        const mensagem = new Operacao(0, this, '', 0, '' + this, new Date());

        if (valor > 0) {
            this.saldo += valor;
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "CRÉDITO";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Depósito na conta " + this.id;
        } else {
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "FALHA";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Depósito não autorizado: limite de saldo excedido";
        }

        this.operacoes.unshift(mensagem);
        return mensagem;
        
    }
    


    sacar(valor:number):Operacao {
        const mensagem = new Operacao(0, this, '', 0, '' + this, new Date());

        if (this.saldo - valor >= -(this.limite)) {
            this.saldo -= valor;
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "DÉBITO";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Saque na conta " + this.id;
        } else {
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "FALHA";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Saque não autorizado: limite de saldo excedido";
        }

        this.operacoes.unshift(mensagem);
        return mensagem;
        
    }


    transferir(contaDestino: Conta, valor:number):Operacao[] {
        const mensagens : Operacao[] = [];
        const mensagem_destinatario = new Operacao(0, contaDestino, '', 0, '' +contaDestino, new Date());
        const mensagem_remetente = this.sacar(valor);

        if(mensagem_remetente.get_tipo == "DÉBITO"){

            mensagem_remetente.set_tipo += "para" + contaDestino.id;

            mensagem_destinatario.set_id = contaDestino.idOperacaoAtual;
            mensagem_destinatario.set_tipo = "CRÉDITO";
            mensagem_destinatario.set_valor = valor;
            mensagem_destinatario.set_descricao = "transferencia recebida da conta" + this.id;
            contaDestino.depositar(valor)

            mensagens.push(mensagem_destinatario, mensagem_remetente);

            return mensagens;
        } else {
            mensagens.push(mensagem_remetente)
            return mensagens;
        }
    }


    consultarSaldo():number{
        return this.saldo;
    }
}
