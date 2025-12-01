"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operacao = void 0;
var Operacao = /** @class */ (function () {
    function Operacao(id, conta, tipo, valor, descricao, dataHora) {
        this.id = id;
        this.conta = conta;
        this.tipo = tipo;
        this.valor = valor;
        this.descricao = descricao;
        this.dataHora = dataHora;
    }
    Object.defineProperty(Operacao.prototype, "get_id", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_id", {
        set: function (id) {
            this.id = id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "get_conta", {
        get: function () {
            return this.conta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_conta", {
        set: function (conta) {
            this.conta = conta;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "get_tipo", {
        get: function () {
            return this.tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_tipo", {
        set: function (tipo) {
            this.tipo = tipo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "get_valor", {
        get: function () {
            return this.valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_valor", {
        set: function (valor) {
            this.valor = valor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "get_descricao", {
        get: function () {
            return this.descricao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_descricao", {
        set: function (texto) {
            this.descricao = texto;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "get_dataHora", {
        get: function () {
            return this.dataHora;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operacao.prototype, "set_dataHora", {
        set: function (dataHora) {
            this.dataHora = new Date();
        },
        enumerable: false,
        configurable: true
    });
    return Operacao;
}());
exports.Operacao = Operacao;
