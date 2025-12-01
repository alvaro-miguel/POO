"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
var operacao_js_1 = require("./operacao.js");
var Conta = /** @class */ (function () {
    function Conta(id, numero, cliente, dataAbertura, saldoInicial, limiteInicial, idConstrutorAtual) {
        this.operacoes = [];
        this.id = id;
        this.numero = numero;
        this.cliente = cliente;
        this.dataAbertura = dataAbertura;
        this.saldo = saldoInicial;
        this.limite = limiteInicial;
        this.idOperacaoAtual = idConstrutorAtual;
    }
    Conta.prototype.depositar = function (valor) {
        var mensagem = new operacao_js_1.Operacao(0, this, '', 0, '' + this, new Date());
        if (valor > 0) {
            this.saldo += valor;
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "CRÉDITO";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Depósito na conta " + this.id;
        }
        else {
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "FALHA";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Depósito não autorizado: limite de saldo excedido";
        }
        this.operacoes.unshift(mensagem);
        return mensagem;
    };
    Conta.prototype.sacar = function (valor) {
        var mensagem = new operacao_js_1.Operacao(0, this, '', 0, '' + this, new Date());
        if (this.saldo - valor >= -(this.limite)) {
            this.saldo -= valor;
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "DÉBITO";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Saque na conta " + this.id;
        }
        else {
            mensagem.set_id = this.idOperacaoAtual;
            mensagem.set_tipo = "FALHA";
            mensagem.set_valor = valor;
            mensagem.set_descricao = "Saque não autorizado: limite de saldo excedido";
        }
        this.operacoes.unshift(mensagem);
        return mensagem;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        var mensagens = [];
        var mensagem_destinatario = new operacao_js_1.Operacao(0, contaDestino, '', 0, '' + contaDestino, new Date());
        var mensagem_remetente = this.sacar(valor);
        if (mensagem_remetente.get_tipo == "DÉBITO") {
            mensagem_remetente.set_tipo += "para" + contaDestino.id;
            mensagem_destinatario.set_id = contaDestino.idOperacaoAtual;
            mensagem_destinatario.set_tipo = "CRÉDITO";
            mensagem_destinatario.set_valor = valor;
            mensagem_destinatario.set_descricao = "transferencia recebida da conta" + this.id;
            contaDestino.depositar(valor);
            mensagens.push(mensagem_destinatario, mensagem_remetente);
            return mensagens;
        }
        else {
            mensagens.push(mensagem_remetente);
            return mensagens;
        }
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    return Conta;
}());
exports.Conta = Conta;
