"use strict";
class Hotel {
    constructor(quantInicial) {
        this.quantReservas = quantInicial;
    }
    adicionarReserva() {
        this.quantReservas++;
    }
}
//Teste:
let hotel = new Hotel(2);
console.log(hotel.quantReservas);
