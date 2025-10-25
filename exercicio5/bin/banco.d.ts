import { Cliente } from "./cliente.js";
import { Conta } from "./conta.js";
export declare class Banco {
    clientes: Cliente[];
    contas: Conta[];
    inserirConta(conta: Conta): void;
    consultarPorNumero(numero: string): Conta | undefined;
    alterar(conta: Conta): void;
    excluir(numero: string): void;
    depositar(numero: string, valor: number): void;
    inserirCliente(cliente: Cliente): void;
    consultarCliente(cpf: string): Cliente | undefined;
    associarContaCliente(numeroConta: string, cpfCliente: string): void;
    listarContasCliente(cpf: string): Conta[];
    totalizarSaldoCliente(cpf: string): number;
}
//# sourceMappingURL=banco.d.ts.map