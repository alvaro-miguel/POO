"use strict";
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    apresentar() {
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos`;
    }
}
const pessoa1 = new Pessoa("Ely", 46);
console.log("Teste 1: ", pessoa1.apresentar());
//# sourceMappingURL=q12Pessoa.js.map