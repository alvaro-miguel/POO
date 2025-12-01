"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var Banco = /** @class */ (function () {
    function Banco() {
        this.clientes = [];
        this.contas = [];
    }
    Banco.prototype.inserirConta = function (conta) {
        for (var i = 0; i < this.contas.length; i++) {
            if (conta.id == this.contas[i].id || conta.numero == this.contas[i].numero) {
                console.log("Conta já existente");
                return;
            }
        }
        this.contas.push(conta);
    };
    Banco.prototype.consultarPorNumero = function (numero) {
        return this.contas.find(function (c) { return c.numero == numero; });
    };
    Banco.prototype.alterar = function (conta) {
        var contaProcurada;
        contaProcurada = this.consultarPorNumero(conta.numero);
        if (contaProcurada) {
            contaProcurada.cliente = conta.cliente;
            contaProcurada.dataAbertura = conta.dataAbertura;
            contaProcurada.saldo = conta.saldo;
        }
    };
    Banco.prototype.excluirConta = function (numero) {
        var indice = this.contas.findIndex(function (c) { return c.numero === numero; });
        if (indice >= 0) {
            this.contas.splice(indice, 1);
        }
    };
    Banco.prototype.depositar = function (numero, valor) {
        var conta;
        conta = this.consultarPorNumero(numero);
        if (conta) {
            conta.depositar(valor);
        }
    };
    Banco.prototype.inserirCliente = function (cliente) {
        for (var i = 0; i < this.clientes.length; i++) {
            if (cliente.id == this.clientes[i].id || cliente.cpf == this.clientes[i].cpf) {
                console.log("Cliente já existente");
                return;
            }
        }
        this.clientes.push(cliente);
    };
    Banco.prototype.consultarCliente = function (cpf) {
        return this.clientes.find(function (c) { return c.cpf == cpf; });
    };
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var conta;
        var cliente;
        conta = this.consultarPorNumero(numeroConta);
        cliente = this.consultarCliente(cpfCliente);
        if (!conta || !cliente) {
            console.log("Cliente ou conta inexistentes");
            return;
        }
        var contaAssociada = cliente.contas.some(function (c) { return c.numero == numeroConta; });
        if (contaAssociada) {
            console.log("O cliente já está associado a esta conta");
            return;
        }
        conta.cliente = cliente;
        cliente.contas.push(conta);
    };
    Banco.prototype.listarContasCliente = function (cpf) {
        var cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.log("Cliente inexistente");
            return [];
        }
        return cliente.contas;
    };
    Banco.prototype.totalizarSaldoCliente = function (cpf) {
        var cliente = this.consultarCliente(cpf);
        var saldoCliente = 0;
        if (!cliente) {
            console.log("Cliente inexistente");
            return saldoCliente;
        }
        var contasCliente = cliente.contas;
        for (var i = 0; i < contasCliente.length; i++) {
            saldoCliente += contasCliente[i].saldo;
        }
        return saldoCliente;
    };
    Banco.prototype.transferirArrayContas = function (numcontaOrigem, contasDestino, valorTotal) {
        var contaOrigem = this.consultarPorNumero(numcontaOrigem);
        var valorporConta = valorTotal / contasDestino.length;
        if (!contaOrigem || contasDestino.length == 0) {
            console.log("Conta de origem ou contas destino não encontradas");
            return;
        }
        for (var i = 0; i < contasDestino.length; i++) {
            contaOrigem.transferir(contasDestino[i], valorporConta);
        }
    };
    Banco.prototype.carregarContas = function () {
        return this.contas.length;
    };
    Banco.prototype.carregarSaldogeral = function () {
        var saldoTotal = 0;
        for (var i = 0; i < this.contas.length; i++) {
            saldoTotal += this.contas[i].saldo;
        }
        return saldoTotal;
    };
    Banco.prototype.carregarMediasaldo = function () {
        var numContas = this.carregarContas();
        var saldoBanco = this.carregarSaldogeral();
        if (numContas === 0) {
            console.log("Não há contas");
            return 0;
        }
        return (saldoBanco / numContas);
    };
    Banco.prototype.mudarTitularidade = function (numeroConta, cpfCliente) {
        var contaTitular = this.consultarPorNumero(numeroConta);
        var novoCLiente = this.consultarCliente(cpfCliente);
        if (!contaTitular || !novoCLiente) {
            console.log("cliente ou conta inexistentes");
            return;
        }
        var clienteAntigo = contaTitular.cliente;
        clienteAntigo.removerConta(numeroConta);
        contaTitular.cliente = novoCLiente;
        novoCLiente.contas.push(contaTitular);
    };
    Banco.prototype.excluirCliente = function (cpf) {
        var indice = this.clientes.findIndex(function (c) { return c.cpf === cpf; });
        if (indice >= 0) {
            this.clientes.splice(indice, 1);
        }
    };
    return Banco;
}());
exports.Banco = Banco;
