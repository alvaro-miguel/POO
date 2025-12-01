import promptSync from "prompt-sync"; 
import { Banco } from "./banco.js"; 
import { Conta } from "./conta.js";
import { Cliente } from "./cliente.js"; 

const input = promptSync({ sigint: true });

export class App {
    private banco: Banco;

    constructor() {
        this.banco = new Banco();
    }

    private obterDadosCliente(): Cliente {
        console.log("\n--- Dados do Cliente ---");
        const id = Number(input('ID do Cliente: '));
        const nome = input('Nome Completo: ');
        const cpf = input('CPF: ');
        const dataNascimento = new Date(input('Data de Nascimento (AAAA-MM-DD): '));
        
        return new Cliente(id, nome, cpf, dataNascimento, []);
    }

    private obterDadosConta(cliente: Cliente): Conta {
        console.log("\n--- Dados da Conta ---");
        const id = Number(input('ID da Conta: '));
        const numero = input('Número da Conta: ');
        const saldoInicial = Number(input('Saldo Inicial: '));
        const limite = Number(input('Limite da conta: '));
        const idOperacaoInicial = 0;
        
        return new Conta(id, numero, cliente, new Date(), saldoInicial, limite, idOperacaoInicial);
    }
    
    private inserirConta(): void {
        console.log("\n--- INSERIR CONTA ---");
        
        const clienteTemporario = new Cliente(0, "Temp", "000.000.000-00", new Date(), []);
        
        const conta = this.obterDadosConta(clienteTemporario);

        this.banco.inserirConta(conta);
        console.log("Conta cadastrada, mas sem titularidade. Use a opção 22 para associar.");
    }
    
    private inserirCliente(): void {
        const novoCliente = this.obterDadosCliente();
        this.banco.inserirCliente(novoCliente);
        console.log(`Cliente ${novoCliente.nome} inserido.`);
    }

    private consultar(): void {
        console.log("\n--- CONSULTAR ---");
        const tipo = input('Consultar (C-Conta / L-Cliente): ').toUpperCase();

        if (tipo === 'C') {
            const numero = input('Número da Conta: ');
            const conta = this.banco.consultarPorNumero(numero);
            if (conta) {
                console.log(`Conta encontrada: ID ${conta.id}, Saldo R$ ${conta.saldo.toFixed(2)}, Titular: ${conta.cliente.nome}`);
            } else {
                console.log("Conta não encontrada.");
            }
        } else if (tipo === 'L') {
            const cpf = input('CPF do Cliente: ');
            const cliente = this.banco.consultarCliente(cpf);
            if (cliente) {
                console.log(`Cliente encontrado: Nome: ${cliente.nome}, Contas: ${cliente.contas.length}`);
            } else {
                console.log("Cliente não encontrada.");
            }
        }
    }
    
    private sacar(): void {
        console.log("\n--- SACAR ---");
        const numero = input('Número da Conta: ');
        const valor = Number(input('Valor do Saque: '));
        const conta = this.banco.consultarPorNumero(numero);
        
        if (conta) {
            conta.sacar(valor);
            console.log(`Saque de R$ ${valor.toFixed(2)} realizado. Novo saldo: R$ ${conta.saldo.toFixed(2)}`);
        } else {
            console.log("Conta não encontrada.");
        }
    }


    public menu(): void {
        let opcao: string = '';
        
        this.carregarDados();

        do {
            console.log('\n=====================================');
            console.log('         SISTEMA BANCÁRIO POO');
            console.log('=====================================');
            console.log('\nCONTAS (01-10):');
            console.log(' 01 - Inserir Conta | 02 - Consultar Conta/Cliente | 03 - Sacar');
            console.log(' 04 - Depositar     | 05 - Excluir Conta             | 06 - Transferir');
            console.log(' 07 - Totalizações  | 08 - Ordem Bancária');

            console.log('\nCLIENTES (20-30):');
            console.log(' 20 - Inserir Cliente | 22 - Associar Conta/Cliente');
            
            console.log('\n0 - Sair\n');
            
            opcao = input("Opção: ");
            
            if (opcao === null || opcao === undefined) {
                opcao = '0'; 
            }

            switch (opcao) {
                case "01":
                    this.inserirConta();
                    break;
                case "02":
                    this.consultar();
                    break;
                case "03":
                    this.sacar();
                    break;
                case "07":
                    this.totalizacoes();
                    break;
                case "08":
                    this.testeOrdemBancaria(); 
                    break;
                case "20":
                    this.inserirCliente();
                    break;
                case "22":
                    this.associarContaCliente();
                    break;
                case "0":
                    break;
                default:
                    console.log("Opção inválida!");
            }
            if (opcao !== "0") {
                input("Operação finalizada. Digite <enter>");
            }
        } while (opcao !== "0");
        console.log("Aplicação encerrada");
    }

    private carregarDados(): void {
        // Clientes de teste
        const c1 = new Cliente(100, "Carlos Silva", "333.333.333-33", new Date(1990, 0, 1), []);
        const c2 = new Cliente(101, "Diana Reis", "444.444.444-44", new Date(1985, 5, 15), []);
        
        this.banco.inserirCliente(c1);
        this.banco.inserirCliente(c2);

        const limitePadrao = 1000;
        const idOperacional = 0;

        const conta1 = new Conta(1, "0001", c1, new Date(), 1000.00, limitePadrao, idOperacional);
        const conta2 = new Conta(2, "0002", c2, new Date(), 500.00, limitePadrao, idOperacional);
        const conta3 = new Conta(3, "0003", c1, new Date(), 300.00, limitePadrao, idOperacional);

        this.banco.inserirConta(conta1);
        this.banco.inserirConta(conta2);
        this.banco.inserirConta(conta3);

        this.banco.associarContaCliente(conta1.numero, c1.cpf);
        this.banco.associarContaCliente(conta2.numero, c2.cpf);
        this.banco.associarContaCliente(conta3.numero, c1.cpf);
    }
    
    private totalizacoes(): void {
        console.log("\n--- TOTALIZAÇÕES ---");
        const total = this.banco.carregarSaldogeral();
        const media = this.banco.carregarMediasaldo();
        const quantidade = this.banco.carregarContas();

        console.log(`Total de Contas: ${quantidade}`);
        console.log(`Saldo Total no Banco: R$ ${total.toFixed(2)}`);
        console.log(`Média de Saldo por Conta: R$ ${media.toFixed(2)}`);
    }

    private associarContaCliente(): void {
        console.log("\n--- ASSOCIAR CONTA A CLIENTE ---");
        const numeroConta = input('Número da Conta para associar: ');
        const cpfCliente = input('CPF do Titular: ');
        
        this.banco.associarContaCliente(numeroConta, cpfCliente);
    }

    private testeOrdemBancaria(): void {
        console.log("\n--- ORDEM DE TRANSFERÊNCIA MÚLTIPLA ---");
        const numOrigem = input('Conta de Origem: ');
        const valorTotal = Number(input('Valor TOTAL a ser distribuído: '));
        
        const clienteDestino = this.banco.consultarCliente("444.444.444-44");
        
        if (clienteDestino && clienteDestino.contas.length > 0) {
            this.banco.transferirArrayContas(numOrigem, clienteDestino.contas, valorTotal);
        } else {
            console.log("Cliente destino não encontrado ou sem contas.");
        }
    }
}

const app = new App();
app.menu();
