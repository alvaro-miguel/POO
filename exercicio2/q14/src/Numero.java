
public class Numero {
    int valor;

    public Numero(int valor) {
        this.valor = valor;
    }

    public int  getValor(){return valor; }
    public void setValor(int  valor){this.valor = valor; }

    public boolean ehPar() {
        boolean flag;

        if (valor%2 == 0){
            flag = true;
        } else {
            flag = false;
        }

        return flag;
    }

    public boolean ehImpar() {
        boolean flag;

        if (valor%2 != 0){
            flag = true;
        } else {
            flag = false;
        }

        return flag;

    }
}