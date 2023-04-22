package Codice.Comportamenti;

import Codice.gameStart;
import Codice.Objects.*;

import java.util.Scanner;

public class turniGioco {
    public static void turnoPinella(gameStart partita){
        int ix=0;
        boolean vittoria = false;
        while(vittoria){
            System.out.println("Pesca carta:\n[0]Dal mazzo\n[1]Dalle carte scartate");
            Scanner playerInput = new Scanner(System.in);
            int sceltaPesca=playerInput.nextInt();
            if (sceltaPesca==0){
                gameStart.aggiungiCartaMazzoMano(partita,ix,gameStart.getNumeroCartaCasuale(partita));
            }
            else if (sceltaPesca==1) {
                System.out.println("Inserire in numero della carta da cui prendere (1..n):");
                int cartaScarto=playerInput.nextInt();
                NodoCarta scartoMano=partita.getCarteScartate().pescaCarta(cartaScarto);
                prendiCarteScartateMano(partita,scartoMano,ix);
            }
            System.out.println("Giocare delle carte?:\n[0]Si\n[1]No");
            int sceltaGioco=playerInput.nextInt();
            if (sceltaGioco==0){
                System.out.println("Gioco carta");
            }
            vittoria=NodoCarta.length(partita.getPlayers().get(ix).getManoGiocatore().getTop())==0;
            ix++;
            if (ix>=partita.getPlayers().size())
                ix=0;
        }
    }
    private static void prendiCarteScartateMano(gameStart partita, NodoCarta primaCarta, int index){
        int length= NodoCarta.length(primaCarta);
        int conta=0;
        NodoCarta temp=primaCarta;
        while (conta<length){
            partita.getPlayers().get(index).addManoGiocatore(temp);
            temp=temp.getNext();
            conta++;
        }
    }

    public static void turnoBriscola(){

    }

    public static void turnoScopa(){

    }
}
