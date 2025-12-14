export class Batalha {
    constructor() {
        this.personagens = [];
        this.acoes = [];
    }
    adicionarPersonagem(p) {
        if (this.personagens.some(pers => pers.nome === p.nome || pers.id === p.id)) { //verifica se este personagem já existe
            throw new Error("Já existe um personagem com este Nome ou ID.");
        }
        this.personagens.push(p);
    }
    consultarPersonagem(id) {
        return this.personagens.find(p => p.id === id);
    }
    listarPersonagens() {
        return this.personagens;
    }
    listarAcoes() {
        return this.acoes;
    }
    turno(atacanteId, defensorId) {
        const atacante = this.consultarPersonagem(atacanteId);
        const defensor = this.consultarPersonagem(defensorId);
        //validações
        if (!atacante || !defensor) {
            throw new Error("Atacante ou Defensor não encontrados.");
        }
        if (atacanteId === defensorId) {
            throw new Error("Personagem não pode atacar a si mesmo.");
        }
        if (!atacante.estaVivo) {
            throw new Error("Personagem está morto.");
        }
        if (!defensor.estaVivo) {
            throw new Error("Personagem está morto");
        }
        const acoesDoTurno = atacante.atacar(defensor);
        // Registro
        acoesDoTurno.forEach(acao => {
            atacante.registrarAcao(acao);
            this.acoes.push(acao);
        });
        return acoesDoTurno;
    }
    verificarVencedor() {
        const vivos = this.personagens.filter(p => p.estaVivo);
        if (vivos.length === 1) {
            return vivos[0];
        }
        return null;
    }
}
