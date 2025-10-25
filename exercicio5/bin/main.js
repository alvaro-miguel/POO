import { Cliente } from "./cliente.js";
import { Conta } from "./conta.js";
import { Banco } from "./banco.js";
function Main() {
    console.log("Simulação de sistema bancário");
    //criação do banco
    let Banco_teste = new Banco();
    //criacao de clientes
    let clienteA = new Cliente(11, "Fulano", "111", new Date(2000, 10, 10), []);
    let clienteB = new Cliente(12, "Ciclano", "222", new Date(2000, 12, 12), []);
    // a princípio, a lista de contas de cada usuário começa vazia
    //criacao de contas
    let conta1 = new Conta(1111, "123", clienteA, new Date(2016, 12, 12), 20000);
    let conta2 = new Conta(1122, "144", clienteB, new Date(2018, 10, 8), 10000);
    let conta3 = new Conta(1144, "177", clienteB, new Date(2019, 8, 6), 15000);
    //insercao de dados no Banco_teste
    console.log("Inserindo dados no Banco");
    Banco_teste.inserirCliente(clienteA);
    Banco_teste.inserirCliente(clienteB);
    Banco_teste.inserirConta(conta1);
    Banco_teste.inserirConta(conta2);
    //associando clientes e contas
    Banco_teste.associarContaCliente(conta1.numero, clienteA.cpf);
    Banco_teste.associarContaCliente(conta2.numero, clienteB.cpf);
    Banco_teste.associarContaCliente(conta3.numero, clienteA.cpf);
    //Testes
    Banco_teste.depositar(conta1.numero, 100);
    conta3.sacar(150);
    let saldoCliente1 = Banco_teste.totalizarSaldoCliente(clienteA.cpf);
    let saldoCliente2 = Banco_teste.totalizarSaldoCliente(clienteB.cpf);
    console.log("Saldo dos clientes");
    console.log(`Saldo de ${clienteA.nome}: R$ ${saldoCliente1}`);
    console.log(`Saldo de ${clienteB.nome}: R$ ${saldoCliente2}`);
}
Main();
//# sourceMappingURL=main.js.map