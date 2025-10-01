
class Pessoa {
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() : string {
        return `Meu nome é ${this.nome} e tenho ${this.idade} anos`;
    }
}

const pessoa1 = new Pessoa("Ely", 46);
console.log("Teste 1: ", pessoa1.apresentar());