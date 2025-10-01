
class Sorteio {
    nomes: string[] = [];

    adicionar(nome:string){
        this.nomes.push(nome);
    }

    sortear(): string {
        if (this.nomes.length === 0){
            return "Nenhum nome foi adicionado";
        }

        const indice = Math.floor(Math.random() * this.nomes.length);
        return this.nomes[indice];

    }

}

const meuSorteio = new Sorteio();

meuSorteio.adicionar("alvaro");
meuSorteio.adicionar("bruno");
meuSorteio.adicionar("joao");
meuSorteio.adicionar("marcos");

console.log("Nome sorteado: ", meuSorteio.sortear())