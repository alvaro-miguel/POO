// 3. Crie uma classe chamada CalculadoraCientifica que herda da classe Calculadora
// do exercício passado e:

// a. Implemente um método chamado exponenciar que retorne o primeiro
// operando elevado ao segundo;

import { Calculadora } from "./q2";

class CalculadoraCientifica extends Calculadora {
  constructor(num1: number, num2: number) {
    super(num1, num2);
  }

  public exponenciar(): number {
    return Math.pow(this.num1, this.num2);
  }
}

// b. Teste a classe;

let calculo2: CalculadoraCientifica = new CalculadoraCientifica(2, 3);
console.log(calculo2.exponenciar());

// c. Foi necessária alguma modificação em Calculadora para o acesso aos atributos?
// Sim. pois será necessários criar os métodos de leitura (gets)