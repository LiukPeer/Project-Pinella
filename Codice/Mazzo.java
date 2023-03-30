package Codice;

public class Mazzo {
    private int numeroCarte;
    private int numeroMazzi;
    private DynamicStack deck;

    public Mazzo (String gioco){
        if (gioco.equalsIgnoreCase("pinella")||gioco.equalsIgnoreCase("machiavelli")||gioco.equalsIgnoreCase("scala")){
            numeroCarte=54;
            numeroMazzi=2;
            deck = creaMazzo(numeroCarte,numeroMazzi,new String[]{"Picche","Cuori","Fiori","Quadri","Jolly"},13);
        }
        else if (gioco.equalsIgnoreCase("scopa")||gioco.equalsIgnoreCase("briscola")){
            numeroCarte=40;
            numeroMazzi=1;
            deck = creaMazzo(numeroCarte,numeroMazzi,new String[]{"Spade","Bastoni","Denari","Coppe"},10);
            System.out.println("Non ancora sviluppato");
        }
        else{
            System.out.println("Tale gioco non esiste o non è stato implementato");
        }
    }

    DynamicStack creaMazzo(int nCarte, int nMazzi, String[] semi, int valoreMassimo){
        while
    }


}
