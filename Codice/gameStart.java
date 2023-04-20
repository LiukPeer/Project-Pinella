package Codice;

import Codice.Objects.DynamicStack;
import Codice.Objects.Giocatore;

import java.util.ArrayList;
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
        ArrayList<Giocatore> players = new ArrayList<>();
        for (int ind=0; ind<numGiocatori; ind++){
            System.out.println("Inserire nome del giocatore "+(ind+1));
            Scanner nameSelect = new Scanner(System.in);
            String nome=nameSelect.nextLine();
            players.add(new Giocatore(nome, null, null, null));
        }
        if (coppie){
            players.get(0).setAlleati(players.get(2));
            players.get(1).setAlleati(players.get(3));
            players.get(2).setAlleati(players.get(0));
            players.get(3).setAlleati(players.get(1));
        }
    }
}
