
function soma(x: number, y?: any): number {
    return x+y;
}

//a)
console.log(soma(1,2));
//b)
console.log(soma(1, "2"));
//c
console.log(soma(1));