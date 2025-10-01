
function exibir(...args: string[]): void{
    args.forEach((valor) => {
        console.log(valor);
    });
}

exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");

//o operador ... antes de um parâmetro indica que ele é um restparameter
//ou seja, é possível passar N argumentos, e todos serão armazenados em um array