import { Cliente } from "./cliente.js";
export class Conta {
    id;
    numero;
    cliente;
    dataAbertura;
    saldo;
    constructor(id, numero, cliente, dataAbertura, saldoInicial) {
        this.id = id;
        this.numero = numero;
        this.cliente = cliente;
        this.dataAbertura = dataAbertura;
        this.saldo = saldoInicial;
    }
    depositar(valor) {
        this.saldo += valor;
    }
    sacar(valor) {
        this.saldo -= valor;
    }
    transferir(contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    consultarSaldo() {
        return this.saldo;
    }
}
//# sourceMappingURL=conta.js.map