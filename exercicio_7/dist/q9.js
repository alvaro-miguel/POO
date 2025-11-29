"use strict";
// 9. Crie uma classe chamada Folha de pagamento que no construtor receba um array
// de Pessoa e inicialize um atributo do mesmo tipo. Crie um método chamado
// calcularPagamentos() que retorna um valor que represente o total de salários dos
// elementos do array. Note que você deve considerar o salário apenas de
// funcionários e professores.
Object.defineProperty(exports, "__esModule", { value: true });
const q6_1 = require("./q6");
const q7_1 = require("./q7");
const q8_1 = require("./q8");
class FolhaDePagamento extends q6_1.Pessoa {
    constructor(pessoas) {
        super("", "");
        this._pessoas = pessoas;
    }
    calcularPagamentos() {
        let totalSalarios = 0;
        for (let pessoa of this._pessoas) {
            if (pessoa instanceof q7_1.Funcionario || pessoa instanceof q8_1.Professor) {
                totalSalarios += pessoa.salario;
            }
        }
        return totalSalarios;
    }
}
let pessoas = [
    new q7_1.Funcionario("Álvaro", "Miguel", "2025111TADS0012", 3500),
    new q8_1.Professor("Isaac", "Santos", "2025111TADS0013", 5600, "Mestre"),
];
let folhaDePagamento = new FolhaDePagamento(pessoas);
console.log(folhaDePagamento.calcularPagamentos());
