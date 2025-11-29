// 2. Crie uma classe Calculadora com:

// a. Dois tributos privados chamados representando dois operandos;
class Calculadora {
  private _num1: number;
  private _num2: number;

  // b. Crie um construtor que inicializa os atributos;
  constructor(num1: number, num2: number) {
    this._num1 = num1;
    this._num2 = num2;
  }

  // c. Crie um método que retorna a soma dos dois atributos;
  public somar(): number {
    return this._num1 + this._num2;
  }

  get num1(): number {
    return this._num1;
  }

  get num2(): number {
    return this._num2;
  }
}

// d. Teste a classe.

let calculo1: Calculadora = new Calculadora(1, 5);
console.log(calculo1.somar());

export { Calculadora };