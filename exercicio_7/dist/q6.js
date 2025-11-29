"use strict";
// 6. Crie uma classe Pessoa com:
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
// a. Atributos privados _nome (tipo string) e _sobrenome (tipo string). Cada um
// desses atributos deve ter métodos para lê-los (getters).
// b. Um método get chamado nomeCompleto que não possui parâmetros de
// entrada e que retorna a concatenação do atributo nome com o atributo
// sobrenome.
// c. Um construtor que recebe como parâmetros o nome e o sobrenome da
// pessoa e inicializa respectivamente os atributos nome e sobrenome.
class Pessoa {
    constructor(nome, sobrenome) {
        this._nome = nome;
        this._sobrenome = sobrenome;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
    get nomeCompleto() {
        return `${this._nome} ${this._sobrenome}`;
    }
}
exports.Pessoa = Pessoa;
let pessoa1 = new Pessoa("Francisco", "Cássio");
console.log(pessoa1.nomeCompleto);
