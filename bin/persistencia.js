import fs from 'fs';
import { Guerreiro, Mago, Arqueiro } from './personagem.js';
const CAMINHO_ARQUIVO = './personagens.json';
export class Persistencia {
    static salvar(personagens) {
        try {
            // O método toJSON nas classes Acao ajuda, mas aqui salvamos Personagens.
            // O stringify vai pegar os atributos privados se acessados via getter ou se o JS permitir.
            // A estrutura salva dependerá de como o JSON.stringify serializa os objetos.
            const dados = JSON.stringify(personagens, null, 2);
            fs.writeFileSync(CAMINHO_ARQUIVO, dados, 'utf-8');
            console.log("Dados salvos com sucesso!");
        }
        catch (error) {
            console.error("Erro ao salvar dados:", error);
        }
    }
    static carregar() {
        if (!fs.existsSync(CAMINHO_ARQUIVO)) {
            return [];
        }
        try {
            const dados = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8');
            const objetos = JSON.parse(dados);
            const personagens = [];
            for (const obj of objetos) {
                let p;
                // NOTA: Ao carregar do JSON, atributos privados (_id) podem vir sem o underscore 
                // ou com ele, dependendo de como foi salvo. Ajuste conforme o arquivo gerado.
                // Assumindo que JSON.stringify salvou "_id", "_nome", etc.
                switch (obj.tipoClasse) {
                    case "Guerreiro":
                        // Guerreiro precisa de defesa (obj._defesa)
                        p = new Guerreiro(obj._id, obj._nome, obj._vida, obj._ataque, obj._defesa);
                        break;
                    case "Mago":
                        // Mago NÃO tem defesa no construtor
                        p = new Mago(obj._id, obj._nome, obj._vida, obj._ataque);
                        break;
                    case "Arqueiro":
                        // Arqueiro tem ataqueMultiplo (obj._ataqueMultiplo)
                        p = new Arqueiro(obj._id, obj._nome, obj._vida, obj._ataque, obj._ataqueMultiplo);
                        break;
                    default:
                        continue;
                }
                // Se precisar restaurar o histórico, teria que ser feito aqui,
                // mas para simplificar, carregamos sem histórico ou implementamos lógica extra.
                personagens.push(p);
            }
            return personagens;
        }
        catch (error) {
            console.error("Erro ao carregar dados:", error);
            return [];
        }
    }
}
