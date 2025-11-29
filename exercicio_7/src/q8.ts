import { Funcionario } from "./q7";

// 8. Uma subclasse de Funcionario, chamada Professor tendo:

// a. Um atributo _titulacao (string) com seu método de leitura;

// b. Todo professor recebe seu salário em uma única parcela. Assim, deve-se
// sobrescrever os métodos calcularSalarioPrimeiraParcela e
// calcularSalarioSegundaParcela. O método calcularSalarioPrimeiraParcela
// da classe Professor deve retornar o valor integral do salário do professor e
// o método calcularSalarioSegundaParcela do professor deve retornar o valor
// zero.

class Professor extends Funcionario {
  private _titulacao: string;

  constructor(
    nome: string,
    sobrenome: string,
    matricula: string,
    salario: number,
    titulacao: string
  ) {
    super(nome, sobrenome, matricula, salario);
    this._titulacao = titulacao;
  }
  get titulacao(): string {
    return this._titulacao;
  }

  public calcularSalarioPrimeiraParcela(): number {
    return this.salario;
  }

  public calcularSalarioSegundaParcela(): number {
    return 0;
  }
}

let professor: Professor = new Professor(
  "Isaac",
  "Santos",
  "2025111TADS0013",
  5600,
  "Mestre"
);
console.log(professor.nomeCompleto);
console.log(professor.calcularSalarioPrimeiraParcela());
console.log(professor.calcularSalarioSegundaParcela());

export { Professor };