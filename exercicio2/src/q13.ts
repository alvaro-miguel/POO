
class tradutorEmojis {
    dicionario: {[palavra: string]: string} = {
        "amor": "❤",
        "futebol": "⚽",
        "cachorro": "🐕",
    };

    traduzir(frase: string): string {
        return frase.split(" ").map(palavra => this.dicionario[palavra] || palavra).join(" ");

    }
}

const tradutor = new tradutorEmojis();
const frase = "O amor do brasileiro é o futebol";
console.log(tradutor.traduzir(frase));