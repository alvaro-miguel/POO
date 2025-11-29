import { Pessoa } from "./q6";

// 7. Crie uma subclasse de Pessoa, chamada Funcionario que deve possuir:

// a. Os atributos privados _matricula do tipo string e _salario do tipo number, com seus respectivos métodos para leitura.

// b. O salário de um funcionário jamais poderá ser negativo. Todo funcionário recebe seu salário em duas parcelas, sendo 60% na primeira parcela e 40% na segunda parcela. Assim, escreva os métodos calcularSalarioPrimeiraParcela que retornam o valor da primeira parcela do salário (60%) e calcularSalarioSegundaParcela que retorna o valor da segunda parcela do salário (40%).

class Funcionario extends Pessoa {
  private _matricula: string;
  private _salario: number;

  constructor(
    nome: string,
    sobrenome: string,
    matricula: string,
    salario: number
  ) {
    super(nome, sobrenome);
    this._matricula = matricula;
    this._salario = salario;
  }

  get matricula(): string {
    return this._matricula;
  }

  get salario(): number {
    return this._salario;
  }

  public calcularSalarioPrimeiraParcela(): number {
    return this._salario * 0.6;
  }

  public calcularSalarioSegundaParcela(): number {
    return this._salario * 0.4;
  }
}

let funcionario: Funcionario = new Funcionario(
  "Álvaro",
  "Miguel",
  "2025111TADS0012",
  3500
);
console.log(funcionario.nomeCompleto);
console.log(funcionario.calcularSalarioPrimeiraParcela());
console.log(funcionario.calcularSalarioSegundaParcela());

export { Funcionario };