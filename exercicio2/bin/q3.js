"use strict";
function formatarArray(numeros) {
    let resultado = "";
    numeros.forEach((numero, index) => {
        resultado += numero;
        if (index < numeros.length - 1) {
            resultado += "-";
        }
    });
    return resultado;
}
const numeros = [1, 2, 3, 4, 5];
console.log(formatarArray(numeros));
