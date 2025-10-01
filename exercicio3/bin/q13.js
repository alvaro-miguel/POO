"use strict";
class tradutorEmojis {
    constructor() {
        this.dicionario = {
            "amor": "❤",
            "futebol": "⚽",
            "cachorro": "🐕",
        };
    }
    traduzir(frase) {
        return frase.split(" ").map(palavra => this.dicionario[palavra] || palavra).join(" ");
    }
}
const tradutor = new tradutorEmojis();
const frase = "O amor do brasileiro é o futebol";
console.log(tradutor.traduzir(frase));
