// 1. As classes Carro, Veiculo e CarroEletrico são bem semelhantes. Reescreva as
// classes usando herança para que os atributos duplicados não sejam mais
// necessários.

class Veiculo {
  private _placa: string;
  private _ano: number;

  constructor(placa: string, ano: number) {
    this._placa = placa;
    this._ano = ano;
  }
}

class Carro extends Veiculo {
  private _modelo: string;

  constructor(placa: string, ano: number, modelo: string) {
    super(placa, ano);
    this._modelo = modelo;
  }
}

class CarroEletrico extends Carro {
  private _autonomiaBateria: number;

  constructor(
    placa: string,
    ano: number,
    modelo: string,
    autonomiaBateria: number
  ) {
    super(placa, ano, modelo);
    this._autonomiaBateria = autonomiaBateria;
  }
}