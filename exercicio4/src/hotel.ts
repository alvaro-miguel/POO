class Hotel {
    quantReservas : number;

    constructor(quantInicial : number){
        this.quantReservas = quantInicial;
    }

    adicionarReserva(): void {
        this.quantReservas++;
    }
}

//Teste:
let hotel = new Hotel(2);
console.log(hotel.quantReservas);