package Codice;

import Codice.Objects.DynamicStack;
import Codice.Objects.Giocatore;

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
        assert numGiocatori >1 : "I giocatori non possono essere 1 o meno";
        boolean coppie=(numGiocatori==4);
        if (coppie){
            System.out.println("Si giocherà a squadre\nI giocatori 1 e 3 e i giocatori 2 e 4 saranno assieme");
        }
        String[] players= new String[numGiocatori];
        for (int playerOfArray=0; playerOfArray< players.length; playerOfArray++){
            System.out.println("Inserire nome del giocatore "+(playerOfArray+1));
            Scanner nameSelect = new Scanner(System.in);
            players[playerOfArray]=nameSelect.nextLine();
        }
        if (numGiocatori==2){
            Giocatore gioc1 = new Giocatore(players[0], null, null, null);
            Giocatore gioc2 = new Giocatore(players[1], null, null, null);
        }
        else if (numGiocatori==3) {
            Giocatore gioc1 = new Giocatore(players[0], null, null, null);
            Giocatore gioc2 = new Giocatore(players[1], null, null, null);
            Giocatore gioc3 = new Giocatore(players[2], null, null, null);
        }
        else if (numGiocatori==4) {
            Giocatore gioc1 = new Giocatore(players[0], null, null, null);
            Giocatore gioc2 = new Giocatore(players[1], null, null, null);
            Giocatore gioc3 = new Giocatore(players[2], null, null, null);
            Giocatore gioc4 = new Giocatore(players[3], null, null, null);

            gioc1.setAlleati(gioc3);
            gioc2.setAlleati(gioc4);
            gioc3.setAlleati(gioc1);
            gioc4.setAlleati(gioc2);
        }
    }
}
