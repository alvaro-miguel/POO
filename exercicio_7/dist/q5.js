"use strict";
// 5. Dadas as três classes abaixo:
// class Empregado {
// salario: number = 500;
// calcularSalario(): number {...}
// }
// class Diarista extends Empregado {
// calcularSalario(): number {...}
// }
// class Horista extends Diarista {
// calcularSalario(): number {...}
// }
// Implemente os métodos calcularSalario() de cada classe da seguinte forma:
// a. Empregado: apenas retorna o valor do atributo salário;
// b. Diarista: sobrescreve calcularSalario, chamando o método homônimo de
// Empregado e dividindo o resultado por 30;
// c. Horista: sobrescreve calcularSalario, chamando o método homônimo de
// Diarista e dividindo o resultado por 24.
class Empregado {
    constructor() {
        this.salario = 500;
    }
    calcularSalario() {
        return this.salario;
    }
}
class Diarista extends Empregado {
    calcularSalario() {
        return super.calcularSalario() / 30;
    }
}
class Horista extends Diarista {
    calcularSalario() {
        return super.calcularSalario() / 24;
    }
}
let empregado1 = new Empregado();
console.log(empregado1.calcularSalario());
let diarista1 = new Diarista();
console.log(diarista1.calcularSalario());
let horista1 = new Horista();
console.log(horista1.calcularSalario());
