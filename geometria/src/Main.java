import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner((System.in));

        System.out.printf("=====CIRCULO=====\n");
        System.out.printf("Digite o valor do raio: ");
        double raio = sc.nextDouble();

        Circulo circulo = new Circulo(raio);
        System.out.printf("Raio: %.2f\n", circulo.getRaio());
        System.out.printf("Área: %.2f\n", circulo.calcularArea());
        System.out.printf("Perímetro: %.2f\n", circulo.calcularPerimetro());

        System.out.printf("=====REETANGULO=====\n");
        System.out.printf("Digite o valor do lado1: ");
        double lado1 = sc.nextDouble();
        System.out.printf("Digite o valor do lado2: ");
        double lado2 = sc.nextDouble();

        Retangulo retangulo = new Retangulo(lado1, lado2);
        System.out.printf("Área: %.2f\n", retangulo.calcularArea());
        System.out.printf("Períemtro: %.2f\n", retangulo.calcularPerimetro());

        sc.close();
    }
}