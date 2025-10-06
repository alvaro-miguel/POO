class Radio {
    volume : number;

    constructor (volume  : number) {
        this.volume = volume;
    }
}

//aplicação da classe
let r : Radio = new Radio(10);
r.volume = 10;