import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Informe o Saldo de crédito(R$): ");
        double valorCredito = scanner.nextDouble();

        System.out.println("Informe o saldo de débito(R$): ");
        double valorDebito = scanner.nextDouble();

        SituacaoFinanceira situacaoFinanceira = new SituacaoFinanceira(valorCredito, valorDebito);
        double saldoFinal = situacaoFinanceira.calcularSaldo();
        System.out.printf("Seu saldo atual é de: R$%.2f", saldoFinal);

        scanner.close();
    }
}