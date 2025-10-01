import java.text.NumberFormat;
import java.util.Locale;

public class Produto {
    String nome;
    double preco;

    public Produto(String nome, double preco){
        this.nome = nome;
        this.preco = preco;
    }

    public String getNome(){return nome; }

    public void setNome(String nome){this.nome = nome; }

    public double getPreco(){return preco; }

    public void setPreco(double preco){this.preco = preco; }

    public double aplicarDesconto(double percentual){
        double valorDesconto = (preco/100)*percentual;
        double precoDescontado = preco - valorDesconto;
        return precoDescontado;
    }

    public void emitirOrcamento(double percentual) {
        double precoDescontado = aplicarDesconto(percentual);
        NumberFormat formatoMoeda = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        System.out.printf(
            "Produto: %s, Preco: %s, Desconto: %.2f%%, Novo preco: %s%n",
            nome, formatoMoeda.format(preco), percentual, formatoMoeda.format(precoDescontado)
        );
    }

}