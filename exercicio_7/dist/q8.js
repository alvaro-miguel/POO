"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const q7_1 = require("./q7");
// 8. Uma subclasse de Funcionario, chamada Professor tendo:
// a. Um atributo _titulacao (string) com seu método de leitura;
// b. Todo professor recebe seu salário em uma única parcela. Assim, deve-se
// sobrescrever os métodos calcularSalarioPrimeiraParcela e
// calcularSalarioSegundaParcela. O método calcularSalarioPrimeiraParcela
// da classe Professor deve retornar o valor integral do salário do professor e
// o método calcularSalarioSegundaParcela do professor deve retornar o valor
// zero.
class Professor extends q7_1.Funcionario {
    constructor(nome, sobrenome, matricula, salario, titulacao) {
        super(nome, sobrenome, matricula, salario);
        this._titulacao = titulacao;
    }
    get titulacao() {
        return this._titulacao;
    }
    calcularSalarioPrimeiraParcela() {
        return this.salario;
    }
    calcularSalarioSegundaParcela() {
        return 0;
    }
}
exports.Professor = Professor;
let professor = new Professor("Isaac", "Santos", "2025111TADS0013", 5600, "Mestre");
console.log(professor.nomeCompleto);
console.log(professor.calcularSalarioPrimeiraParcela());
console.log(professor.calcularSalarioSegundaParcela());
