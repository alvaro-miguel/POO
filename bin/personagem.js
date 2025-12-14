import { Acao } from "./acao.js";
export class Personagem {
    constructor(id, nome, vida, ataque, tipoClasse) {
        this._historico = [];
        this._id = id;
        this._nome = nome;
        this.tipoClasse = tipoClasse;
        this._vida = this.validarVida(vida);
        this._ataque = this.validarAtributo(ataque);
    }
    get id() { return this._id; }
    get nome() { return this._nome; }
    get vida() { return this._vida; }
    get ataque() { return this._ataque; }
    get historico() { return this._historico; }
    // Validações
    validarVida(valor) {
        if (valor < 0)
            return 0;
        if (valor > 100)
            return 100;
        return valor;
    }
    validarAtributo(valor) {
        if (valor < 1)
            return 1;
        // Removido teto de 20 para permitir upgrades ou lógica de ataqueMultiplo
        return valor;
    }
    //métodos obrigatórios solicitados na atividade
    get estaVivo() {
        return this._vida > 0;
    }
    registrarAcao(acao) {
        this._historico.push(acao);
    }
    receberDano(valor, ignorarDefesa = false) {
        this._vida -= valor;
        if (this._vida < 0)
            this._vida = 0;
    }
}
//Guerreiro:
export class Guerreiro extends Personagem {
    constructor(id, nome, vida, ataque, defesa) {
        super(id, nome, vida, ataque, "Guerreiro");
        this._defesa = this.validarAtributo(defesa);
    }
    get defesa() { return this._defesa; }
    receberDano(valor, ignorarDefesa = false) {
        if (ignorarDefesa) { //situação em que a defesa é ignorada pelo ataque, logo o guerreiro leva todo o dano
            super.receberDano(valor);
        }
        else {
            const danoLiquido = Math.max(0, valor - this._defesa); //atributo defesa na prática, ao receber um ataque, o valor do mesmo é subtraido pela defesa
            super.receberDano(danoLiquido);
        }
    }
    atacar(alvo) {
        const acoes = [];
        let valorAtaque = this._ataque;
        let desc_atq = "Ataque Físico";
        //+30% de dano se a vida estiver abaixo de 30%
        if (this.vida < (100 * 0.3)) {
            valorAtaque = valorAtaque * 1.3;
            desc_atq += " (Fúria +30%)";
        }
        valorAtaque = Math.floor(valorAtaque); //arredonda para baixo
        alvo.receberDano(valorAtaque);
        const idAcao = Math.floor(Math.random() * 100000);
        const acao = new Acao(idAcao, this, alvo, desc_atq, valorAtaque); //uma instancia da ação é criada para ser registrada
        acoes.push(acao);
        return acoes;
    }
}
//Mago:
export class Mago extends Personagem {
    constructor(id, nome, vida, ataque) {
        super(id, nome, vida, ataque, "Mago");
    }
    atacar(alvo) {
        const acoes = [];
        let valorAtaque = this._ataque;
        let desc_atq = "Magia";
        if (this.vida > 0) {
            super.receberDano(10);
            const idAuto = Math.floor(Math.random() * 100000);
            acoes.push(new Acao(idAuto, this, this, "Custo de Mana (Vida)", 10));
        }
        if (alvo instanceof Arqueiro) { //dano dobrado em aruqieros
            valorAtaque *= 2;
            desc_atq += " (Crítico em Arqueiro 2x)";
        }
        // Regra: Ignora defesa de guerreiros
        // Usamos o segundo parâmetro 'true'
        alvo.receberDano(valorAtaque, true);
        const idAcao = Math.floor(Math.random() * 100000);
        acoes.push(new Acao(idAcao, this, alvo, desc_atq, valorAtaque));
        return acoes;
    }
}
//Arqueiro:
export class Arqueiro extends Personagem {
    constructor(id, nome, vida, ataque, ataqueMultiplo) {
        super(id, nome, vida, ataque, "Arqueiro");
        this._ataqueMultiplo = ataqueMultiplo;
    }
    get ataqueMultiplo() { return this._ataqueMultiplo; }
    atacar(alvo) {
        const acoes = [];
        let valorAtaque = this._ataque;
        let desc_atq = "Disparo";
        // Regra: 50% de chance de ataque múltiplo
        // O valor total do ataque se torna (ataque * ataqueMultiplo)
        if (Math.random() <= 0.5) {
            valorAtaque = this._ataque * this._ataqueMultiplo;
            desc_atq += ` Múltiplo (x${this._ataqueMultiplo})`;
        }
        else {
            desc_atq += " Simples";
        }
        alvo.receberDano(valorAtaque);
        const idAcao = Math.floor(Math.random() * 100000);
        acoes.push(new Acao(idAcao, this, alvo, desc_atq, valorAtaque));
        return acoes;
    }
}
