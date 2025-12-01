import { Cliente } from "./cliente.js";
import { Conta } from "./conta.js";
import { Operacao } from "./operacao.js";

export class Banco{
    private clientes:Cliente[] = [];
    private contas:Conta[] = [];
    private operacoes: Operacao[] = [];
    private idClienteAtual : number = 0;
    private idContaAtual: number = 0;


    sacar(numeroConta:string, valor:number): void{
        const contaSacar = this.consultarPorNumero(numeroConta);
        
        this.operacoes.push(contaSacar.sacar(valor));
    }

    depositar(numeroConta:string, valor:number): void{
        const contaDepositar = this.consultarPorNumero(numeroConta);
        this.operacoes.push(contaDepositar.depositar(valor));
    }

    transferir(numeroContaRemetente: string, numeroContaDestino:string, valor:number): void{
        const contaOrigem = this.consultarPorNumero(numeroContaRemetente);
        const contaDestino = this.consultarPorNumero(numeroContaDestino);

        const mensagemSaque = contaOrigem.sacar(valor);
        mensagemSaque.set_tipo += "para" + contaDestino.id;
        const mensagemDeposito = contaDestino.depositar(valor);
        mensagemDeposito.set_descricao = "transferencia recebida da conta" + contaOrigem.id

        this.operacoes.unshift(mensagemSaque,mensagemDeposito);
    }
    

    inserirConta(conta:Conta) : void{
        
        for(let i=0; i<this.contas.length; i++){

            if(conta.id == this.contas[i]!.id || conta.numero == this.contas[i]!.numero){
                console.log("Conta já existente");
                return;
            }

        }
        this.contas.push(conta);
    }


    consultarPorNumero(numero:string):Conta {
        const encontrada = this.contas.find(c => c.numero == numero);
        if(!encontrada){
            throw new Error('Não foi encontrada')
        } else {
        return encontrada;
        }
    }


    alterar(conta: Conta) : void {
        let contaProcurada!:Conta;
        contaProcurada = this.consultarPorNumero(conta.numero);

        if(contaProcurada){
            contaProcurada.cliente = conta.cliente;
            contaProcurada.saldo = conta.saldo;
        }
    }


    excluirConta(numero:string){
        let indice = this.contas.findIndex( c=> c.numero === numero);

        if(indice >= 0){
            this.contas.splice(indice, 1);
        }
    }


    inserirCliente(cliente:Cliente) : void{
        
        for(let i = 0; i < this.clientes.length; i++){

            if(cliente.id == this.clientes[i]!.id || cliente.cpf == this.clientes[i]!.cpf){
                console.log("Cliente já existente");
                return;
            }
        }

        this.clientes.push(cliente);
    }


    consultarCliente(cpf:string):Cliente {
        const encontrado = this.clientes.find(c => c.cpf == cpf);
        if (!encontrado){
            throw new Error ('Não foi encontrado');
        } else {
            return encontrado;
        }
         
    }


    associarContaCliente(numeroConta:string, cpfCliente:string){
        let conta!:Conta;
        let cliente!: Cliente;

        conta = this.consultarPorNumero(numeroConta);
        cliente = this.consultarCliente(cpfCliente);

        if(!conta || !cliente){
            console.log("Cliente ou conta inexistentes");
            return;
        }

        let contaAssociada = cliente.contas.some(c => c.numero == numeroConta)
        if(contaAssociada){
            console.log("O cliente já está associado a esta conta");
            return;
        }

        conta.cliente = cliente;
        cliente.contas.push(conta);
    }


    listarContasCliente(cpf:string):Conta[]{
        let cliente: Cliente = this.consultarCliente(cpf);

        if(!cliente){
            console.log("Cliente inexistente");
            return[];
        }

        return cliente.contas;
    }


    totalizarSaldoCliente(cpf:string):number{
        const cliente = this.consultarCliente(cpf);
        let saldoCliente = 0;

        if(!cliente){
            console.log("Cliente inexistente");
            return saldoCliente;
        }

        let contasCliente:Conta[] = cliente.contas;

        for(let i = 0; i<contasCliente.length; i++){
            saldoCliente += contasCliente[i]!.saldo;
        }

        return saldoCliente
    }


    transferirArrayContas(numcontaOrigem:string, contasDestino: Conta[], valorTotal: number):void{
        const contaOrigem = this.consultarPorNumero(numcontaOrigem);
        const valorporConta = valorTotal/contasDestino.length;

        if (!contaOrigem || contasDestino.length == 0){
            console.log("Conta de origem ou contas destino não encontradas");
            return;
        }

        for(let i = 0; i < contasDestino.length; i++){
            contaOrigem.transferir(contasDestino[i]!, valorporConta);
        }
           
    }


    carregarContas(): number {
        return this.contas.length;

    }


    carregarSaldogeral():number{
        let saldoTotal = 0;

        for(let i = 0; i < this.contas.length; i++){
            saldoTotal += this.contas[i]!.saldo;
        }

        return saldoTotal;
    }


    carregarMediasaldo(): number{
        const numContas = this.carregarContas();
        const saldoBanco = this.carregarSaldogeral();

        if(numContas === 0){
            console.log("Não há contas");
            return 0;
        }

        return (saldoBanco/numContas);   
    }


    mudarTitularidade(numeroConta: string, cpfCliente: string):void{
        const contaTitular = this.consultarPorNumero(numeroConta);
        const novoCLiente = this.consultarCliente(cpfCliente);

        if (!contaTitular || !novoCLiente){
            console.log("cliente ou conta inexistentes");
            return;
        }

        const clienteAntigo = contaTitular.cliente;
        clienteAntigo.removerConta(numeroConta);        

        contaTitular.cliente = novoCLiente;
        novoCLiente.contas.push(contaTitular);

    }


    excluirCliente(cpf:string): void{
        let indice = this.clientes.findIndex( c=> c.cpf === cpf);

        if(indice >= 0){
            this.clientes.splice(indice, 1);
        }
    }

    consultarExtratoConta(numeroConta: string): Operacao[] {
        const contaEncontrada  = this.consultarPorNumero(numeroConta);
        return contaEncontrada.getOperacoes;
    }

    consultarExtratoCliente(cpf:string): Operacao[]{
        const clienteEncontrado = this.consultarCliente(cpf);

        return clienteEncontrado.extrairOperacoesContas();
    }

    consultarExtratoGeral() : Operacao[] {
        return this.operacoes;
    }
}