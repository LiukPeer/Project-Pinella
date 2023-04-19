package Codice;

import Codice.Objects.DynamicStack;

import java.util.Scanner;

public class gameStart {
    public static void main(String[] args) {
        Scanner gameSelect = new Scanner(System.in);

        System.out.println("Benvenuto! Seleziona il gioco");
        System.out.println("-Pinella\n-Machiavelli\n-Scopa\n-Briscola");
        String game = gameSelect.nextLine();
        DynamicStack mazzoGioco = new DynamicStack(game);

        System.out.println("Selezionare numero di giocatori");
        int numGiocatori = gameSelect.nextInt();
        assert numGiocatori >1 : "I giocatori non possono essere 0";

        String[] giocatori = new String[numGiocatori];
        for (int playerOfArray=1; playerOfArray<= numGiocatori; playerOfArray++){
            System.out.println("Inserire nome del giocatore "+playerOfArray);
            gameSelect = new Scanner(System.in);
            giocatori[playerOfArray-1]=gameSelect.nextLine();
        }

    }
}
