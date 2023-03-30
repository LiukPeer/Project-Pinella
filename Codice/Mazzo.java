package Codice;

public class Mazzo {
    private DynamicStack deck;

    public Mazzo(String gioco) {
        int numeroCarte;
        int numeroMazzi;
        if (gioco.equalsIgnoreCase("pinella") || gioco.equalsIgnoreCase("machiavelli") || gioco.equalsIgnoreCase("scala")) {
            numeroCarte = 54;
            numeroMazzi = 2;
            deck = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Picche", "Cuori", "Fiori", "Quadri"}, 13);
        } else if (gioco.equalsIgnoreCase("scopa") || gioco.equalsIgnoreCase("briscola")) {
            numeroCarte = 40;
            numeroMazzi = 1;
            deck = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Spade", "Bastoni", "Denari", "Coppe"}, 10);
            System.out.println("Non ancora sviluppato");
        } else {
            System.out.println("Tale gioco non esiste o non è stato implementato");
        }
    }

    DynamicStack creaMazzo(int nCarte, int nMazzi, String[] semi, int valoreMassimo) {
        int valore = 1;
        DynamicStack mc = new DynamicStack();
        for (int segno=0; segno<semi.length;segno++){
            while (valore<=(nCarte / semi.length)){
                mc.push(new Carta(valore, semi[segno]));
                valore++;
            }
        }
        int numeroJolly=nCarte-NodeC.length(mc.top());
        while (numeroJolly>0){
            mc.push(new Carta(0,"Jolly"));
            numeroJolly--;
        }
        return mc;
    }
}
