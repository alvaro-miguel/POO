"use strict";
const nomes = ["Alavaro", "Marcos", "Bruno", "Carlos", "Rodrigo"];
let tamanho = nomes.length;
let numeroSorteado = Math.random() * tamanho;
numeroSorteado = Math.floor(numeroSorteado);
console.log(nomes[numeroSorteado]);
