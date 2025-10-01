
const nomes = ["Alavaro", "Marcos", "Bruno", "Carlos", "Rodrigo"];
let tamanho: number = nomes.length;
let numeroSorteado: number = Math.random() * tamanho;
numeroSorteado = Math.floor(numeroSorteado);
console.log(nomes[numeroSorteado]);