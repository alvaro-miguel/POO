import { Acao } from "./acao.js";

export abstract class Personagem {
    protected _id: number;
    protected _nome: string;
    protected _vida: number;
    protected _ataque: number; 
    protected _historico: Acao[] = [];
    public readonly tipoClasse: string; 

    constructor(id: number, nome: string, vida: number, ataque: number, tipoClasse: string) {
        this._id = id;
        this._nome = nome;
        this.tipoClasse = tipoClasse;
        this._vida = this.validarVida(vida);
        this._ataque = this.validarAtributo(ataque);
    }

    public get id(): number { return this._id; }
    public get nome(): string { return this._nome; }
    public get vida(): number { return this._vida; }
    public get ataque(): number { return this._ataque; }
    public get historico(): Acao[] { return this._historico; }

    // Validações
    private validarVida(valor: number): number {
        if (valor < 0) return 0;
        if (valor > 100) return 100;
        return valor;
    }

    protected validarAtributo(valor: number): number {
        if (valor < 1) return 1;
        // Removido teto de 20 para permitir upgrades ou lógica de ataqueMultiplo
        return valor;
    }

    //métodos obrigatórios solicitados na atividade
    public get estaVivo(): boolean {
        return this._vida > 0;
    }

    public registrarAcao(acao: Acao): void {
        this._historico.push(acao);
    }

    public receberDano(valor: number, ignorarDefesa: boolean = false): void {//parâmetro opcional ignorarDefesa será usado pelo Mago contra Guerreiro
        this._vida -= valor;
        if (this._vida < 0) this._vida = 0;
    }

    public abstract atacar(alvo: Personagem): Acao[];
}

//Guerreiro:
export class Guerreiro extends Personagem {
    private _defesa: number;

    constructor(id: number, nome: string, vida: number, ataque: number, defesa: number) {
        super(id, nome, vida, ataque, "Guerreiro");
        this._defesa = this.validarAtributo(defesa);
    }

    public get defesa(): number { return this._defesa; }

    public receberDano(valor: number, ignorarDefesa: boolean = false): void {
        if (ignorarDefesa) { //situação em que a defesa é ignorada pelo ataque, logo o guerreiro leva todo o dano
            super.receberDano(valor);
        } else {
            const danoLiquido = Math.max(0, valor - this._defesa);//atributo defesa na prática, ao receber um ataque, o valor do mesmo é subtraido pela defesa
            super.receberDano(danoLiquido);
        }
    }

    public atacar(alvo: Personagem): Acao[] {
        const acoes: Acao[] = [];
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
    constructor(id: number, nome: string, vida: number, ataque: number) {
        super(id, nome, vida, ataque, "Mago");
    }

    public atacar(alvo: Personagem): Acao[] {
        const acoes: Acao[] = [];
        let valorAtaque = this._ataque;
        let desc_atq = "Magia";

        if (this.vida > 0) {
            super.receberDano(10);
            const idAuto = Math.floor(Math.random() * 100000);
            acoes.push(new Acao(idAuto, this, this, "Custo de Mana (Vida)", 10));
        }
        
        if (alvo instanceof Arqueiro) {//dano dobrado em aruqieros
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
    private _ataqueMultiplo: number;

    constructor(id: number, nome: string, vida: number, ataque: number, ataqueMultiplo: number) {
        super(id, nome, vida, ataque, "Arqueiro");
        this._ataqueMultiplo = ataqueMultiplo;
    }

    public get ataqueMultiplo(): number { return this._ataqueMultiplo; }

    public atacar(alvo: Personagem): Acao[] {
        const acoes: Acao[] = [];
        let valorAtaque = this._ataque;
        let desc_atq = "Disparo";

        // Regra: 50% de chance de ataque múltiplo
        // O valor total do ataque se torna (ataque * ataqueMultiplo)
        if (Math.random() <= 0.5) {
            valorAtaque = this._ataque * this._ataqueMultiplo;
            desc_atq += ` Múltiplo (x${this._ataqueMultiplo})`;
        } else {
            desc_atq += " Simples";
        }

        alvo.receberDano(valorAtaque);

        const idAcao = Math.floor(Math.random() * 100000);
        acoes.push(new Acao(idAcao, this, alvo, desc_atq, valorAtaque));
        
        return acoes;
    }
}