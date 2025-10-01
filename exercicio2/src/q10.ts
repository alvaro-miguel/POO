
class Autenticacao {
    senha: string;
    usuario: string;

    constructor(senha: string, usuario: string) {
        this.senha = senha;
        this.usuario = usuario;
    }

    validar(): string {
        if(this.usuario === "admin" && this.senha === "1234"){
            return "verdadeiro";
        } else {
            return "falso";
        }
    }
}

//EXEMPLO:
const autenticar = new Autenticacao("1234", "admin");
console.log(autenticar.validar());

const autenticar2 = new Autenticacao("0000", "usuario");
console.log(autenticar2.validar())