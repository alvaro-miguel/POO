import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=====RETANGULO=====");
        System.out.print("\nDigite o valor do lado1 do retangulo: ");
        double lado1 = scanner.nextDouble();

        System.out.print("\nDigite o valor do lado2 do retangulo: ");
        double lado2 = scanner.nextDouble();

        Retangulo retangulo = new Retangulo(lado1, lado2);

        double areaRetangulo = retangulo.calcularArea();
        System.out.printf("Area do retangulo: %.2f\n", areaRetangulo);

        double perimetroRetangulo = retangulo.calcularPerimetro();
        System.out.printf("Perimetro do retangulo: %.2f\n", perimetroRetangulo);

        System.out.println("\n=====Circulo=====");

        System.out.print("\nDigite o valor do raio: ");
        double raio = scanner.nextDouble();

        Circulo circulo = new Circulo(raio);

        double areaCirculo = circulo.calcularArea();
        System.out.printf("Area do circulo: %.2f\n", areaCirculo);

        double perimetroCirculo = circulo.calcularPerimetro();
        System.out.printf("Perimetro circulo: %.2f\n", perimetroCirculo);

        scanner.close();
    }
}