"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, dataNascimento, contas) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = contas;
    }
    Cliente.prototype.removerConta = function (numeroConta) {
        var indice = this.contas.findIndex(function (c) { return c.numero === numeroConta; });
        this.contas.splice(indice, 1);
    };
    return Cliente;
}());
exports.Cliente = Cliente;
