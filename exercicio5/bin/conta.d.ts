import { Cliente } from "./cliente.js";
export declare class Conta {
    id: number;
    numero: string;
    cliente: Cliente;
    dataAbertura: Date;
    saldo: number;
    constructor(id: number, numero: string, cliente: Cliente, dataAbertura: Date, saldoInicial: number);
    depositar(valor: number): void;
    sacar(valor: number): void;
    transferir(contaDestino: Conta, valor: number): void;
    consultarSaldo(): number;
}
//# sourceMappingURL=conta.d.ts.map