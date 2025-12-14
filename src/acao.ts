import { Personagem } from "./personagem.js";

export class Acao {
    constructor(
        public id: number,
        public origem: Personagem,
        public alvo: Personagem,
        public descricao: string,
        public valorDano: number,
        public dataHora: Date = new Date()
    ) {}


    public toJSON() { //evita erro de ciclo ao salvar o JSON (Personagem -> Acao -> Personagem)
        return {
            id: this.id,
            origem: this.origem.nome, //salva apenas o nome/ID
            alvo: this.alvo.nome,
            descricao: this.descricao,
            valorDano: this.valorDano,
            dataHora: this.dataHora
        };
    }
}