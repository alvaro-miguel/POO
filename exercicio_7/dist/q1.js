"use strict";
// 1. As classes Carro, Veiculo e CarroEletrico são bem semelhantes. Reescreva as
// classes usando herança para que os atributos duplicados não sejam mais
// necessários.
class Veiculo {
    constructor(placa, ano) {
        this._placa = placa;
        this._ano = ano;
    }
}
class Carro extends Veiculo {
    constructor(placa, ano, modelo) {
        super(placa, ano);
        this._modelo = modelo;
    }
}
class CarroEletrico extends Carro {
    constructor(placa, ano, modelo, autonomiaBateria) {
        super(placa, ano, modelo);
        this._autonomiaBateria = autonomiaBateria;
    }
}
