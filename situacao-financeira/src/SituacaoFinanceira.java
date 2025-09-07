public class SituacaoFinanceira {
    double valorCreditos;
    double valorDebitos;

    public SituacaoFinanceira(double valorCreditos, double valorDebitos){
        this.valorCreditos = valorCreditos;
        this.valorDebitos = valorDebitos;
    }

    public double getValorCreditos() {
        return valorCreditos;
    }

    public void setValorCreditos(double valorCreditos) {
        this.valorCreditos = valorCreditos;
    }

    public double getValorDebitos() {
        return valorDebitos;
    }

    public void setValorDebitos(double valorDebitos) {
        this.valorDebitos = valorDebitos;
    }

    public  double calcularSaldo(){
        return (valorCreditos - valorDebitos);
    }

}
