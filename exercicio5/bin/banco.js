import { Cliente } from "./cliente.js";
import { Conta } from "./conta.js";
export class Banco {
    clientes = [];
    contas = [];
    inserirConta(conta) {
        for (let i = 0; i < this.contas.length; i++) {
            if (conta.id == this.contas[i].id || conta.numero == this.contas[i].numero) {
                console.log("Conta já existente");
                return;
            }
        }
        this.contas.push(conta);
    }
    consultarPorNumero(numero) {
        return this.contas.find(c => c.numero == numero);
    }
    alterar(conta) {
        let contaProcurada;
        contaProcurada = this.consultarPorNumero(conta.numero);
        if (contaProcurada) {
            contaProcurada.cliente = conta.cliente;
            contaProcurada.dataAbertura = conta.dataAbertura;
            contaProcurada.saldo = conta.saldo;
        }
    }
    excluir(numero) {
        let indice = this.contas.findIndex(c => c.numero == numero);
        if (indice >= 0) {
            this.contas.splice(indice, 1);
        }
    }
    depositar(numero, valor) {
        let conta;
        conta = this.consultarPorNumero(numero);
        if (conta) {
            conta.depositar(valor);
        }
    }
    inserirCliente(cliente) {
        for (let i = 0; i < this.clientes.length; i++) {
            if (cliente.id == this.clientes[i].id || cliente.cpf == this.clientes[i].cpf) {
                console.log("Cliente já existente");
                return;
            }
        }
        this.clientes.push(cliente);
    }
    consultarCliente(cpf) {
        return this.clientes.find(c => c.cpf == cpf);
    }
    associarContaCliente(numeroConta, cpfCliente) {
        let conta;
        let cliente;
        conta = this.consultarPorNumero(numeroConta);
        cliente = this.consultarCliente(cpfCliente);
        if (!conta || !cliente) {
            console.log("Cliente ou conta inexistentes");
            return;
        }
        let contaAssociada = cliente.contas.some(c => c.numero == numeroConta);
        if (contaAssociada) {
            console.log("O cliente já está associado a esta conta");
            return;
        }
        conta.cliente = cliente;
        cliente.contas.push(conta);
    }
    listarContasCliente(cpf) {
        let cliente = this.consultarCliente(cpf);
        if (!cliente) {
            console.log("Cliente inexistente");
            return [];
        }
        return cliente.contas;
    }
    totalizarSaldoCliente(cpf) {
        const cliente = this.consultarCliente(cpf);
        let saldoCliente = 0;
        if (!cliente) {
            console.log("Cliente inexistente");
            return saldoCliente;
        }
        let contasCliente = cliente.contas;
        for (let i = 0; i < contasCliente.length; i++) {
            saldoCliente += contasCliente[i].saldo;
        }
        return saldoCliente;
    }
}
//# sourceMappingURL=banco.js.map