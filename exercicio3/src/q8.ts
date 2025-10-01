const vetorExemplo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const vetorDobrado = vetorExemplo.map(numero => numero*2);
const vetorReduzido = vetorExemplo.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(`Vetor original:${vetorExemplo}`);
console.log(`Vetor Dobrado: ${vetorDobrado}`);
console.log(`Vetor Reduzido: ${vetorReduzido}`);