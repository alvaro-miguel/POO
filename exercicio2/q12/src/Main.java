import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("Informe seu nome: ");
        String nome = sc.next();

        System.err.println("Informe sua idade: ");
        int idade = sc.nextInt();

        Pessoa pessoa = new Pessoa(nome, idade);
        pessoa.apresentar();

        sc.close();
    }
}
