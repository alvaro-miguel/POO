// 6. Crie uma classe Pessoa com:

// a. Atributos privados _nome (tipo string) e _sobrenome (tipo string). Cada um
// desses atributos deve ter métodos para lê-los (getters).

// b. Um método get chamado nomeCompleto que não possui parâmetros de
// entrada e que retorna a concatenação do atributo nome com o atributo
// sobrenome.

// c. Um construtor que recebe como parâmetros o nome e o sobrenome da
// pessoa e inicializa respectivamente os atributos nome e sobrenome.

class Pessoa {
  private _nome: string;
  private _sobrenome: string;

  constructor(nome: string, sobrenome: string) {
    this._nome = nome;
    this._sobrenome = sobrenome;
  }

  get nome(): string {
    return this._nome;
  }

  get sobrenome(): string {
    return this._sobrenome;
  }

  get nomeCompleto(): string {
    return `${this._nome} ${this._sobrenome}`;
  }
}

let pessoa1: Pessoa = new Pessoa("Francisco", "Cássio");
console.log(pessoa1.nomeCompleto);

export { Pessoa };