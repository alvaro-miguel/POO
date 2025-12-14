import promptSync from "prompt-sync";
import { Batalha } from "./batalha.js";
import { Guerreiro, Mago, Arqueiro } from "./personagem.js";
import { Persistencia } from "./persistencia.js";
const input = promptSync();
class App {
    constructor() {
        this.batalha = new Batalha();
        this.carregarDadosIniciais();
    }
    // Carrega dados salvos ao iniciar
    carregarDadosIniciais() {
        const dados = Persistencia.carregar();
        if (dados.length > 0) {
            dados.forEach(p => {
                try {
                    this.batalha.adicionarPersonagem(p);
                }
                catch (e) {
                    // Ignora duplicados silenciosamente no carregamento
                }
            });
            console.log(`\n📂 Dados carregados: ${dados.length} personagens recuperados.`);
        }
    }
    // Gera um ID único simples baseado no tempo atual + aleatório
    gerarId() {
        return Math.floor(Date.now() * Math.random()) % 10000;
    }
    // 1. Cadastro de Personagens com validações específicas
    cadastrarPersonagem() {
        console.log("\n--- ⚔️  CRIAR NOVO PERSONAGEM ⚔️  ---");
        const nome = input("Nome do Personagem: ");
        // Validação de nome vazio
        if (!nome.trim()) {
            console.log("❌ Erro: O nome não pode estar vazio.");
            return;
        }
        console.log("\nEscolha a Classe:");
        console.log("1 - 🛡️  Guerreiro (Usa Defesa)");
        console.log("2 - 🔮  Mago (Ignora Defesa, gasta vida)");
        console.log("3 - 🏹  Arqueiro (Chance de ataque múltiplo)");
        const opcao = input("Opção: ");
        let vida, ataque;
        try {
            vida = Number(input("Vida Inicial (padrão 100): "));
            if (vida === 0)
                vida = 100;
            ataque = Number(input("Ataque Base: "));
            const id = this.gerarId();
            let novoPersonagem;
            switch (opcao) {
                case "1":
                    const defesa = Number(input("Defesa: "));
                    novoPersonagem = new Guerreiro(id, nome, vida, ataque, defesa);
                    break;
                case "2":
                    // Mago não pede atributo extra no construtor novo
                    novoPersonagem = new Mago(id, nome, vida, ataque);
                    break;
                case "3":
                    const multiplo = Number(input("Multiplicador de Ataque (ex: 2): "));
                    novoPersonagem = new Arqueiro(id, nome, vida, ataque, multiplo);
                    break;
                default:
                    console.log("❌ Opção de classe inválida.");
                    return;
            }
            this.batalha.adicionarPersonagem(novoPersonagem);
            console.log(`\n✅ ${novoPersonagem.nome} criado com sucesso! (ID: ${id})`);
        }
        catch (error) {
            console.log(`❌ Erro ao criar personagem: ${error.message}`);
        }
    }
    // 2. Listagem Inteligente (Facilita a escolha)
    listarPersonagens(apenasVivos = false) {
        console.log("\n--- 📋 LISTA DE PERSONAGENS ---");
        const lista = this.batalha.listarPersonagens();
        if (lista.length === 0) {
            console.log("Nenhum personagem cadastrado.");
            return;
        }
        const listaFiltrada = apenasVivos ? lista.filter(p => p.estaVivo) : lista;
        if (apenasVivos && listaFiltrada.length === 0) {
            console.log("☠️  Todos os personagens estão mortos.");
            return;
        }
        console.log("ID\t| Nome\t\t| Classe\t| Vida\t| Status");
        console.log("-".repeat(60));
        listaFiltrada.forEach(p => {
            const status = p.estaVivo ? "❤️  Vivo" : "💀 Morto";
            // Formatação simples para alinhar colunas
            console.log(`${p.id}\t| ${p.nome.padEnd(12)}| ${p.tipoClasse.padEnd(10)}| ${p.vida}\t| ${status}`);
        });
        console.log("-".repeat(60));
    }
    // 3. Execução da Batalha (Turno)
    realizarTurno() {
        console.log("\n--- ⚔️  HORA DA BATALHA ⚔️  ---");
        // Lista apenas vivos para facilitar a escolha
        this.listarPersonagens(true);
        const atacantesValidos = this.batalha.listarPersonagens().filter(p => p.estaVivo);
        if (atacantesValidos.length < 2) {
            console.log("⚠️  É necessário ter pelo menos 2 personagens vivos para batalhar.");
            return;
        }
        console.log("\nDigite os IDs dos combatentes:");
        const idAtacante = Number(input("🗡️  ID do Atacante: "));
        const idDefensor = Number(input("🛡️  ID do Defensor: "));
        try {
            const resultado = this.batalha.turno(idAtacante, idDefensor);
            console.log("\n--- 💥 RESULTADO DO TURNO 💥 ---");
            resultado.forEach(acao => {
                console.log(acao.toString());
            });
            this.checarVencedor();
        }
        catch (error) {
            console.log(`❌ Erro na batalha: ${error.message}`);
        }
    }
    checarVencedor() {
        const vencedor = this.batalha.verificarVencedor();
        if (vencedor) {
            console.log(`\n🏆🏆🏆 TEMOS UM VENCEDOR! 🏆🏆🏆`);
            console.log(`O grande campeão é: ${vencedor.nome} (${vencedor.tipoClasse})`);
            console.log("Todos os inimigos foram derrotados.");
        }
    }
    // 4. Linha do Tempo (Log Geral)
    exibirLogBatalha() {
        console.log("\n--- 📜 HISTÓRICO DA BATALHA ---");
        const logs = this.batalha.listarAcoes();
        if (logs.length === 0) {
            console.log("Nenhuma ação registrada ainda.");
        }
        else {
            logs.forEach((acao, index) => {
                console.log(`#${index + 1} - ${acao.toString()}`);
            });
        }
    }
    // Menu Principal
    menu() {
        let opcao = "";
        do {
            console.log("\n==============================");
            console.log("      JOGO DE BATALHA RPG     ");
            console.log("==============================");
            console.log("1. ➕ Cadastrar Personagem");
            console.log("2. 📋 Listar Personagens");
            console.log("3. ⚔️  Atacar (Turno)");
            console.log("4. 📜 Ver Histórico de Ações");
            console.log("0. 💾 Sair e Salvar");
            console.log("==============================");
            opcao = input("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    this.cadastrarPersonagem();
                    break;
                case "2":
                    this.listarPersonagens();
                    break;
                case "3":
                    this.realizarTurno();
                    break;
                case "4":
                    this.exibirLogBatalha();
                    break;
                case "0":
                    Persistencia.salvar(this.batalha.listarPersonagens());
                    console.log("Dados salvos. Até a próxima! 👋");
                    break;
                default:
                    console.log("❌ Opção inválida!");
            }
            if (opcao !== "0") {
                input("\nPressione <ENTER> para continuar...");
                console.clear(); // Limpa a tela para manter organizado
            }
        } while (opcao !== "0");
    }
}
// Inicialização
const app = new App();
app.menu();
