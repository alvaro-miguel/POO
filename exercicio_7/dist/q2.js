"use strict";
// 2. Crie uma classe Calculadora com:
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculadora = void 0;
// a. Dois tributos privados chamados representando dois operandos;
class Calculadora {
    // b. Crie um construtor que inicializa os atributos;
    constructor(num1, num2) {
        this._num1 = num1;
        this._num2 = num2;
    }
    // c. Crie um método que retorna a soma dos dois atributos;
    somar() {
        return this._num1 + this._num2;
    }
    get num1() {
        return this._num1;
    }
    get num2() {
        return this._num2;
    }
}
exports.Calculadora = Calculadora;
// d. Teste a classe.
let calculo1 = new Calculadora(1, 5);
console.log(calculo1.somar());
