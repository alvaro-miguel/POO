// 9. Crie uma classe chamada Folha de pagamento que no construtor receba um array
// de Pessoa e inicialize um atributo do mesmo tipo. Crie um método chamado
// calcularPagamentos() que retorna um valor que represente o total de salários dos
// elementos do array. Note que você deve considerar o salário apenas de
// funcionários e professores.

import { Pessoa } from "./q6";
import { Funcionario } from "./q7";
import { Professor } from "./q8";

class FolhaDePagamento extends Pessoa {
  private _pessoas: Pessoa[];

  constructor(pessoas: Pessoa[]) {
    super("", "");
    this._pessoas = pessoas;
  }

  public calcularPagamentos(): number {
    let totalSalarios: number = 0;

    for (let pessoa of this._pessoas) {
      if (pessoa instanceof Funcionario || pessoa instanceof Professor) {
        totalSalarios += pessoa.salario;
      }
    }
    return totalSalarios;
  }
}

let pessoas: Pessoa[] = [
  new Funcionario("Álvaro", "Miguel", "2025111TADS0012", 3500),
  new Professor("Isaac", "Santos", "2025111TADS0013", 5600, "Mestre"),
];

let folhaDePagamento: FolhaDePagamento = new FolhaDePagamento(pessoas);
console.log(folhaDePagamento.calcularPagamentos());