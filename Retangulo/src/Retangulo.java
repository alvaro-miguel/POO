public class Retangulo {

    private double lado1;
    private double lado2;

    public Retangulo (double lado1, double lado2){
        this.lado1 = lado1;
        this.lado2 = lado2;
    }

    public double calcularArea(){
        return lado1*lado2;
    }

    public double calcularPerimetro(){
        double somaLados = lado1 + lado2;
        return somaLados*2;
    }

    public double getLado1(){
        return lado1;
    }

    public void setLado1(double lado1){
        this.lado1 = lado1;
    }

    public double getLado2(){
        return lado2;
    }

    public void setLado2(double lado2){
        this.lado2 = lado2;
    }

}
