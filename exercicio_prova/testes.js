"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conta_1 = require("./conta");
var cliente_1 = require("./cliente");
var banco_1 = require("./banco");
var TestesBancoLimite = /** @class */ (function () {
    function TestesBancoLimite() {
        this._pontosObtidos = 0;
        this._pontosTotais = 0;
    }
    // ---------------- Utilitários internos ----------------
    TestesBancoLimite.prototype.assert = function (condicao, mensagem) {
        if (!condicao) {
            throw new Error(mensagem);
        }
    };
    TestesBancoLimite.prototype.rodarTeste = function (nome, pontos, fn) {
        this._pontosTotais = this._pontosTotais + pontos;
        try {
            fn();
            this._pontosObtidos = this._pontosObtidos + pontos;
            console.log("✅ [OK] " + nome + " (+" + pontos + " pts)");
        }
        catch (e) {
            console.log("❌ [FALHOU] " + nome + " (0/" + pontos + " pts)");
            console.log("   Motivo: " + (e && e.message ? e.message : e));
        }
    };
    TestesBancoLimite.prototype.iniciarBanco = function () {
        this._banco = new banco_1.Banco();
    };
    TestesBancoLimite.prototype.criarClienteNoBanco = function (nome, cpf) {
        var cliente = new cliente_1.Cliente(nome, cpf, new Date(1990, 0, 1));
        this._banco.inserirCliente(cliente);
        return cliente;
    };
    TestesBancoLimite.prototype.criarContaNoBanco = function (numero, saldo, limite) {
        var conta = new conta_1.Conta(numero, saldo, limite);
        this._banco.inserirConta(conta);
        return conta;
    };
    // ---------------- Teste 1 (1,0 ponto): Depósito ----------------
    TestesBancoLimite.prototype.teste1Deposito = function () {
        var _this = this;
        this.rodarTeste("Teste 1: Depósito registra saldo e operação corretamente", 1.0, function () {
            var conta = new conta_1.Conta("001", 0, 0);
            var op = conta.depositar(200);
            _this.assert(conta.saldo == 200, "Saldo após depósito deveria ser 200.");
            var ops = conta.operacoes;
            _this.assert(ops.length == 1, "Deveria existir 1 operação registrada.");
            var opRegistro = ops[0];
            _this.assert(opRegistro.tipo == "CRÉDITO", "Operação deveria ser do tipo CRÉDITO.");
            _this.assert(opRegistro.valor == 200, "Valor da operação deveria ser 200.");
            _this.assert(opRegistro.conta == conta, "Operação deve estar ligada à conta correta.");
            _this.assert(opRegistro == op, "Operação retornada pelo método deve ser a mesma registrada.");
        });
    };
    // -------- Teste 2 (1,5 ponto): Saques, limite e falha --------
    TestesBancoLimite.prototype.teste2SaqueComLimite = function () {
        var _this = this;
        this.rodarTeste("Teste 2: Saques respeitam limite e registram falha", 1.5, function () {
            var conta = new conta_1.Conta("002", 100, 100); // saldo 100, limite 100
            var op1 = conta.sacar(50); // saldo 50
            var op2 = conta.sacar(100); // saldo -50
            var op3 = conta.sacar(100); // tentativa inválida → falha
            _this.assert(conta.saldo == -50, "Saldo final deveria ser -50.");
            var ops = conta.operacoes;
            _this.assert(ops.length == 3, "Devem existir 3 operações registradas (incluindo falha).");
            var maisRecente = ops[0];
            var segunda = ops[1];
            var terceira = ops[2];
            _this.assert(maisRecente.tipo == "FALHA", "A operação mais recente deveria ser uma FALHA.");
            _this.assert(segunda.tipo == "DÉBITO", "A segunda operação deveria ser DÉBITO.");
            _this.assert(terceira.tipo == "DÉBITO", "A terceira operação deveria ser DÉBITO.");
            var valores = ops.map(function (o) { return o.valor; }).sort(function (a, b) { return a - b; });
            _this.assert(valores[0] == 50 && valores[1] == 100 && valores[2] == 100, "Os valores das operações deveriam ser 50, 100, 100.");
        });
    };
    // ---- Teste 3 (2,0 pontos): Transferência com sucesso e falha ----
    TestesBancoLimite.prototype.teste3TransferenciaComLimite = function () {
        var _this = this;
        this.rodarTeste("Teste 3: Transferências respeitam limite e retornam operações corretas", 2.0, function () {
            var origem = new conta_1.Conta("100", 100, 200);
            var destino = new conta_1.Conta("200", 50, 0);
            var ops1 = origem.transferir(destino, 250);
            _this.assert(ops1.length == 2, "Transferência válida deve gerar 2 operações.");
            _this.assert(origem.saldo == -150, "Saldo da conta origem deveria ser -150.");
            _this.assert(destino.saldo == 300, "Saldo da conta destino deveria ser 300.");
            var ops2 = origem.transferir(destino, 100);
            _this.assert(ops2.length == 1, "Transferência recusada deve gerar apenas 1 operação.");
            var opFalha = ops2[0];
            _this.assert(opFalha.tipo == "FALHA", "Tipo da operação deve ser FALHA.");
            _this.assert(origem.saldo == -150, "Saldo da origem não deve mudar após falha.");
            _this.assert(destino.saldo == 300, "Saldo do destino não deve mudar após falha.");
            var opsOrigem = origem.operacoes;
            var qtdFalhas = opsOrigem.filter(function (o) { return o.tipo == "FALHA"; }).length;
            _this.assert(qtdFalhas == 1, "Deveria haver exatamente 1 operação de falha na origem.");
            var opsDestino = destino.operacoes;
            var qtdCreditosDestino = opsDestino.filter(function (o) { return o.tipo == "CRÉDITO"; }).length;
            _this.assert(qtdCreditosDestino == 1, "Destino deveria ter exatamente 1 crédito válido.");
        });
    };
    // -- Teste 4 (2,5 pontos): Operações via Banco x registro geral --
    TestesBancoLimite.prototype.teste4BancoRegistroGeral = function () {
        var _this = this;
        this.rodarTeste("Teste 4: Banco registra corretamente operações no extrato geral", 2.5, function () {
            _this.iniciarBanco();
            var banco = _this._banco;
            var cliente = _this.criarClienteNoBanco("Ana", "11111111111");
            var conta1 = _this.criarContaNoBanco("301", 100, 100);
            var conta2 = _this.criarContaNoBanco("302", 0, 0);
            banco.associarContaCliente("301", cliente.cpf);
            banco.associarContaCliente("302", cliente.cpf);
            banco.depositar("301", 50); // saldo 150
            banco.sacar("301", 100); // saldo 50
            banco.transferir("301", "302", 200); // deve falhar (limite estourado)
            var extratoConta1 = banco.consultarExtratoConta("301");
            var extratoGeral = banco.consultarExtratoGeral();
            _this.assert(extratoConta1.length == 3, "Conta 301 deveria ter 3 operações (depósito, saque e falha de transferência).");
            var qtdFalhasConta1 = extratoConta1.filter(function (o) { return o.tipo == "FALHA"; }).length;
            _this.assert(qtdFalhasConta1 == 1, "Conta 301 deveria ter 1 operação de falha.");
            _this.assert(conta1.saldo == 50, "Saldo final da conta 301 deveria ser 50.");
            _this.assert(extratoGeral.length >= extratoConta1.length, "Extrato geral deve ter pelo menos as operações da conta 301.");
            var idsConta1 = extratoConta1.map(function (o) { return o.id; }).sort(function (a, b) { return a - b; });
            var idsGeral = extratoGeral.map(function (o) { return o.id; }).sort(function (a, b) { return a - b; });
            for (var i = 0; i < idsConta1.length; i++) {
                _this.assert(idsGeral.indexOf(idsConta1[i]) != -1, "Operação da conta 301 não encontrada no extrato geral do banco.");
            }
        });
    };
    // ---- Teste 5 (3,0 pontos): Cliente com 3 contas, tudo via Banco ----
    TestesBancoLimite.prototype.teste5ClienteTresContas = function () {
        var _this = this;
        this.rodarTeste("Teste 5: Operações via Banco para cliente com 3 contas e consistência de extratos", 3.0, function () {
            _this.iniciarBanco();
            var banco = _this._banco;
            var cliente = _this.criarClienteNoBanco("Bruno", "22222222222");
            var c1 = _this.criarContaNoBanco("401", 200, 100);
            var c2 = _this.criarContaNoBanco("402", 0, 50);
            var c3 = _this.criarContaNoBanco("403", 50, 0);
            banco.associarContaCliente("401", cliente.cpf);
            banco.associarContaCliente("402", cliente.cpf);
            banco.associarContaCliente("403", cliente.cpf);
            banco.depositar("401", 100); // 200 + 100 = 300
            banco.sacar("401", 150); // 300 - 150 = 150
            banco.sacar("402", 30); // 0 - 30 = -30 (ok, limite 50)
            banco.sacar("402", 50); // -30 - 50 = -80 (passa limite) → falha
            banco.transferir("403", "401", 50); // 403: 50 - 50 = 0; 401: 150 + 50 = 200
            _this.assert(c1.saldo == 200, "Saldo final da conta 401 deveria ser 200.");
            _this.assert(c2.saldo == -30, "Saldo final da conta 402 deveria ser -30.");
            _this.assert(c3.saldo == 0, "Saldo final da conta 403 deveria ser 0.");
            var extratoCliente = banco.consultarExtratoCliente(cliente.cpf);
            var extratoGeral = banco.consultarExtratoGeral();
            var extrato401 = banco.consultarExtratoConta("401");
            var extrato402 = banco.consultarExtratoConta("402");
            var extrato403 = banco.consultarExtratoConta("403");
            var uniaoContas = []
                .concat(extrato401)
                .concat(extrato402)
                .concat(extrato403);
            var idsCliente = extratoCliente.map(function (o) { return o.id; }).sort(function (a, b) { return a - b; });
            var idsUniao = uniaoContas.map(function (o) { return o.id; }).sort(function (a, b) { return a - b; });
            _this.assert(idsCliente.length == idsUniao.length, "Quantidade de operações no extrato do cliente difere da soma das 3 contas.");
            for (var i = 0; i < idsCliente.length; i++) {
                _this.assert(idsCliente[i] == idsUniao[i], "Conjunto de operações do extrato do cliente não corresponde às operações das 3 contas.");
            }
            var idsGeral = extratoGeral.map(function (o) { return o.id; });
            for (var i = 0; i < idsCliente.length; i++) {
                _this.assert(idsGeral.indexOf(idsCliente[i]) != -1, "Operação do extrato do cliente não encontrada no extrato geral do banco.");
            }
        });
    };
    // ---------------- Método público principal ----------------
    TestesBancoLimite.prototype.executar = function () {
        console.log("=======================================");
        console.log("   TESTES BANCO COM LIMITE E EXTRATOS  ");
        console.log("=======================================");
        // Deixe todos descomentados na final versão da prova:
        //this.teste1Deposito();
        //this.teste2SaqueComLimite();
        //this.teste3TransferenciaComLimite();
        //this.teste4BancoRegistroGeral();
        //this.teste5ClienteTresContas();
        console.log("=======================================");
        console.log("Pontos obtidos: " +
            this._pontosObtidos +
            " / " +
            this._pontosTotais);
        var nota = (this._pontosObtidos / this._pontosTotais) * 10;
        console.log("Nota final (0 a 10): " + nota.toFixed(1));
        console.log("=======================================");
    };
    return TestesBancoLimite;
}());
// Execução direta do teste
var suite = new TestesBancoLimite();
suite.executar();
