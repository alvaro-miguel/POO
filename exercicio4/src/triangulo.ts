class Triangulo {
    ladoA : number;
    ladoB : number;
    ladoC : number;

    constructor(ladoA : number, ladoB : number, ladoC : number){
        this.ladoA = ladoA;
        this.ladoB = ladoB;
        this.ladoC = ladoC;
    }

    ehTriangulo() : boolean {
        const condicaoA = Math.abs(this.ladoB - this.ladoC) < this.ladoA && this.ladoA < (this.ladoB+this.ladoC);
        const condicaoB = Math.abs(this.ladoA - this.ladoC) < this.ladoB && this.ladoB < (this.ladoA+this.ladoC);
        const condicaoC = Math.abs(this.ladoA - this.ladoB) < this.ladoC && this.ladoC < (this.ladoA+this.ladoB);
        return condicaoA && condicaoB && condicaoC;
    }


    ehEquilatero() : boolean {
        if (!this.ehTriangulo()){return false;}
        return this.ladoA == this.ladoB && this.ladoA == this.ladoC;
    }


    ehIsoceles() : boolean{
        if (!this.ehTriangulo()){return false;}
        const doisIguais : boolean = this.ladoA == this.ladoB || this.ladoA == this.ladoC || this.ladoB == this.ladoC;
        return doisIguais && !this.ehEquilatero();
    }


    ehEScaleno() : boolean{
        if (!this.ehTriangulo()){return false;}
        return this.ladoA != this.ladoB && this.ladoA != this.ladoC && this.ladoB != this.ladoC;
    }
}

//aplicação do código

let triangulo1 = new Triangulo(12, 12, 10);
if (triangulo1.ehEquilatero()){console.log("É equilatero");}

let triangulo2 = new Triangulo(12, 12, 12);
if (triangulo2.ehEScaleno()){console.log("É escaleno");}

let triangulo3 = new Triangulo(12, 13, 14);
if (triangulo3.ehIsoceles()){console.log("É isoceles");}