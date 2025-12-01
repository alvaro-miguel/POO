"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var prompt_sync_1 = require("prompt-sync");
var banco_js_1 = require("./banco.js");
var conta_js_1 = require("./conta.js");
var cliente_js_1 = require("./cliente.js");
var input = (0, prompt_sync_1.default)({ sigint: true });
var App = /** @class */ (function () {
    function App() {
        this.banco = new banco_js_1.Banco();
    }
    App.prototype.obterDadosCliente = function () {
        console.log("\n--- Dados do Cliente ---");
        var id = Number(input('ID do Cliente: '));
        var nome = input('Nome Completo: ');
        var cpf = input('CPF: ');
        var dataNascimento = new Date(input('Data de Nascimento (AAAA-MM-DD): '));
        return new cliente_js_1.Cliente(id, nome, cpf, dataNascimento, []);
    };
    App.prototype.obterDadosConta = function (cliente) {
        console.log("\n--- Dados da Conta ---");
        var id = Number(input('ID da Conta: '));
        var numero = input('Número da Conta: ');
        var saldoInicial = Number(input('Saldo Inicial: '));
        return new conta_js_1.Conta(id, numero, cliente, new Date(), saldoInicial);
    };
    App.prototype.inserirConta = function () {
        console.log("\n--- INSERIR CONTA ---");
        var clienteTemporario = new cliente_js_1.Cliente(0, "Temp", "000.000.000-00", new Date(), []);
        var conta = this.obterDadosConta(clienteTemporario);
        this.banco.inserirConta(conta);
        console.log("Conta cadastrada, mas sem titularidade. Use a opção 22 para associar.");
    };
    App.prototype.inserirCliente = function () {
        var novoCliente = this.obterDadosCliente();
        this.banco.inserirCliente(novoCliente);
        console.log("Cliente ".concat(novoCliente.nome, " inserido."));
    };
    App.prototype.consultar = function () {
        console.log("\n--- CONSULTAR ---");
        var tipo = input('Consultar (C-Conta / L-Cliente): ').toUpperCase();
        if (tipo === 'C') {
            var numero = input('Número da Conta: ');
            var conta = this.banco.consultarPorNumero(numero);
            if (conta) {
                console.log("Conta encontrada: ID ".concat(conta.id, ", Saldo R$ ").concat(conta.saldo.toFixed(2), ", Titular: ").concat(conta.cliente.nome));
            }
            else {
                console.log("Conta não encontrada.");
            }
        }
        else if (tipo === 'L') {
            var cpf = input('CPF do Cliente: ');
            var cliente = this.banco.consultarCliente(cpf);
            if (cliente) {
                console.log("Cliente encontrado: Nome: ".concat(cliente.nome, ", Contas: ").concat(cliente.contas.length));
            }
            else {
                console.log("Cliente não encontrada.");
            }
        }
    };
    App.prototype.sacar = function () {
        console.log("\n--- SACAR ---");
        var numero = input('Número da Conta: ');
        var valor = Number(input('Valor do Saque: '));
        var conta = this.banco.consultarPorNumero(numero);
        if (conta) {
            conta.sacar(valor);
            console.log("Saque de R$ ".concat(valor.toFixed(2), " realizado. Novo saldo: R$ ").concat(conta.saldo.toFixed(2)));
        }
        else {
            console.log("Conta não encontrada.");
        }
    };
    App.prototype.menu = function () {
        var opcao = '';
        this.carregarDados();
        do {
            console.log('\n=====================================');
            console.log('         SISTEMA BANCÁRIO POO');
            console.log('=====================================');
            console.log('\nCONTAS (01-10):');
            console.log(' 01 - Inserir Conta | 02 - Consultar Conta/Cliente | 03 - Sacar');
            console.log(' 04 - Depositar     | 05 - Excluir Conta             | 06 - Transferir');
            console.log(' 07 - Totalizações  | 08 - Ordem Bancária');
            console.log('\nCLIENTES (20-30):');
            console.log(' 20 - Inserir Cliente | 22 - Associar Conta/Cliente');
            console.log('\n0 - Sair\n');
            opcao = input("Opção: ");
            if (opcao === null || opcao === undefined) {
                opcao = '0';
            }
            switch (opcao) {
                case "01":
                    this.inserirConta();
                    break;
                case "02":
                    this.consultar();
                    break;
                case "03":
                    this.sacar();
                    break;
                case "07":
                    this.totalizacoes();
                    break;
                case "08":
                    this.testeOrdemBancaria();
                    break;
                case "20":
                    this.inserirCliente();
                    break;
                case "22":
                    this.associarContaCliente();
                    break;
                case "0":
                    break;
                default:
                    console.log("Opção inválida!");
            }
            if (opcao !== "0") {
                input("Operação finalizada. Digite <enter>");
            }
        } while (opcao !== "0");
        console.log("Aplicação encerrada");
    };
    App.prototype.carregarDados = function () {
        // Clientes de teste
        var c1 = new cliente_js_1.Cliente(100, "Carlos Silva", "333.333.333-33", new Date(1990, 0, 1), []);
        var c2 = new cliente_js_1.Cliente(101, "Diana Reis", "444.444.444-44", new Date(1985, 5, 15), []);
        this.banco.inserirCliente(c1);
        this.banco.inserirCliente(c2);
        var conta1 = new conta_js_1.Conta(1, "0001", c1, new Date(), 1000.00);
        var conta2 = new conta_js_1.Conta(2, "0002", c2, new Date(), 500.00);
        var conta3 = new conta_js_1.Conta(3, "0003", c1, new Date(), 300.00);
        this.banco.inserirConta(conta1);
        this.banco.inserirConta(conta2);
        this.banco.inserirConta(conta3);
        this.banco.associarContaCliente(conta1.numero, c1.cpf);
        this.banco.associarContaCliente(conta2.numero, c2.cpf);
        this.banco.associarContaCliente(conta3.numero, c1.cpf);
    };
    App.prototype.totalizacoes = function () {
        console.log("\n--- TOTALIZAÇÕES ---");
        var total = this.banco.carregarSaldogeral();
        var media = this.banco.carregarMediasaldo();
        var quantidade = this.banco.carregarContas();
        console.log("Total de Contas: ".concat(quantidade));
        console.log("Saldo Total no Banco: R$ ".concat(total.toFixed(2)));
        console.log("M\u00E9dia de Saldo por Conta: R$ ".concat(media.toFixed(2)));
    };
    App.prototype.associarContaCliente = function () {
        console.log("\n--- ASSOCIAR CONTA A CLIENTE ---");
        var numeroConta = input('Número da Conta para associar: ');
        var cpfCliente = input('CPF do Titular: ');
        this.banco.associarContaCliente(numeroConta, cpfCliente);
    };
    App.prototype.testeOrdemBancaria = function () {
        console.log("\n--- ORDEM DE TRANSFERÊNCIA MÚLTIPLA ---");
        var numOrigem = input('Conta de Origem: ');
        var valorTotal = Number(input('Valor TOTAL a ser distribuído: '));
        var clienteDestino = this.banco.consultarCliente("444.444.444-44");
        if (clienteDestino && clienteDestino.contas.length > 0) {
            this.banco.transferirArrayContas(numOrigem, clienteDestino.contas, valorTotal);
        }
        else {
            console.log("Cliente destino não encontrado ou sem contas.");
        }
    };
    return App;
}());
exports.App = App;
var app = new App();
app.menu();
