package Codice;

public class Mazzo {
    private DynamicStack deck;

    public Mazzo(String gioco) {
        int numeroCarte;
        int numeroMazzi;
        if (gioco.equalsIgnoreCase("pinella") || gioco.equalsIgnoreCase("machiavelli") || gioco.equalsIgnoreCase("scala")) {
            numeroCarte = 54;
            numeroMazzi = 2;
            deck = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Picche", "Cuori", "Fiori", "Quadri"}, gioco);
        } else if (gioco.equalsIgnoreCase("scopa") || gioco.equalsIgnoreCase("briscola") ||gioco.equalsIgnoreCase("scopone")) {
            numeroCarte = 40;
            numeroMazzi = 1;
            deck = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Spade", "Bastoni", "Denari", "Coppe"}, gioco);
            System.out.println("Non ancora sviluppato");
        } else {
            System.out.println("Tale gioco non esiste o non è stato implementato");
        }
    }

    DynamicStack creaMazzo(int nCarte, int nMazzi, String[] semi, String gioco) {
        int valore = 1;
        DynamicStack mc = new DynamicStack();
        for (int n=nMazzi; n>0;n--){  //creo n volte le carte di un mazzo
            for (int segno=0; segno<semi.length;segno++){  //creo le carte per ogni valore di ogni seme
                while (valore<=(nCarte / semi.length)){
                    if (!gioco.equalsIgnoreCase("pinella") || (valore != 2) || (!semi[segno].equalsIgnoreCase("Cuori") && !semi[segno].equalsIgnoreCase("Quadri"))) {
                        mc.push(new Carta(valore, semi[segno]));   //aggiugno le carte in cima alla lista dinamica
                    }
                    valore++;
                }
                valore=1;
            }
        }
        int numeroJolly=(nCarte*nMazzi)-NodeC.length(mc.topNode());
        if (gioco.equalsIgnoreCase("pinella")){
            numeroJolly=numeroJolly-2*nMazzi;  //compenso la rimozione dei due rossi
        }
        while (numeroJolly>0){
            mc.push(new Carta(0,"Jolly"));
            numeroJolly--;
        }
        return mc;
    }
}
