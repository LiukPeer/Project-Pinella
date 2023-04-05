package Codice;

import java.util.Scanner;

public class gameStart {
    public static void main(String[] args) {
        Scanner gameSelect = new Scanner(System.in);

        System.out.println("Benvenuto! Seleziona il gioco");
        String game = gameSelect.nextLine();
        DynamicStack mazzoGioco = new DynamicStack(game);

        System.out.println("Selezionare numero di giocatori");
        int numGiocatori = gameSelect.nextInt();
        assert numGiocatori >0 : "I giocatori non possono essere 0";
        String[] giocatori = new String[numGiocatori];
        for (int ix=1; ix<= numGiocatori; ix++){
            System.out.println("Inserire nome del giocatore "+ix);
            gameSelect = new Scanner(System.in);
            giocatori[ix-1]=gameSelect.nextLine();
        }

        if (game.equalsIgnoreCase("pinella")){
            strutturaGioco.pinellaGame(giocatori, mazzoGioco);
        }
    }
}
