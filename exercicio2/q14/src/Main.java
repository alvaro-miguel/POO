public class Main {
    public static void main(String[] args) {
        Numero numero = new Numero(0);

        System.out.println("Valor inicial: " + numero.getValor());

        numero.setValor(3);

        System.out.println("Novo valor: " + numero.getValor());

        if (numero.ehPar()) {
            System.out.println("O número " + numero.getValor() + " é par.");
        } else {
            System.out.println("O número " + numero.getValor() + " é ímpar");
        }
    }
}
