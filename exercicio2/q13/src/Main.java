import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Informe o nome do produto: ");
        String nome = sc.next();

        System.out.print("Informe o preco do produto: ");
        double preco = sc.nextDouble();

        Produto produto = new Produto(nome, preco);

        System.out.print("Informe a porcentagem de desconto(%): ");
        double percentual = sc.nextDouble();
        
        produto.aplicarDesconto(percentual);
        System.out.println();
        produto.emitirOrcamento(percentual);

        sc.close();
    }
}
