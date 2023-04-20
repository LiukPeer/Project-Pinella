package Codice;

import Codice.Objects.DynamicStack;
import Codice.Objects.Giocatore;
import Codice.Objects.NodoDiNodi;

import java.util.ArrayList;
import java.util.Scanner;

public class gameStart {
    ArrayList<Giocatore> players;
    String giocoSelezionato;
    DynamicStack mazzoGioco;
    DynamicStack carteScartate;

    gameStart(){
        players=null;
        giocoSelezionato=null;
        carteScartate=new DynamicStack();
    }

    public void setGiocoSelezionato(String giocoSelezionato) {
        this.giocoSelezionato = giocoSelezionato;
    }

    public String getGiocoSelezionato() {
        return giocoSelezionato;
    }

    public void setPlayers(ArrayList<Giocatore> players) {
        this.players = players;
    }

    public ArrayList<Giocatore> getPlayers() {
        return players;
    }

    public void setMazzoGioco(DynamicStack mazzoGioco) {
        this.mazzoGioco = mazzoGioco;
    }

    public DynamicStack getMazzoGioco() {
        return mazzoGioco;
    }

    public static void main(String[] args) {
        gameStart partita = new gameStart();
        Scanner gameSelect = new Scanner(System.in);

        System.out.println("Benvenuto! Seleziona il gioco");
        System.out.println("-Pinella\n-Machiavelli\n-Scopa\n-Briscola");
        partita.setGiocoSelezionato(gameSelect.nextLine());
        partita.setMazzoGioco(new DynamicStack(partita.getGiocoSelezionato()));

        System.out.println("Selezionare numero di giocatori");
        int numGiocatori = gameSelect.nextInt();
        assert numGiocatori > 1 && numGiocatori <=4 : "I giocatori non possono essere meno di 1 o più di 4";
        boolean coppie = (numGiocatori == 4);
        boolean giocoASquadre = partita.getGiocoSelezionato().equalsIgnoreCase("pinella")||partita.getGiocoSelezionato().equalsIgnoreCase("briscola");
        if (coppie&&giocoASquadre) {
            System.out.println("Si giocherà a squadre\nI giocatori 1 e 3 e i giocatori 2 e 4 saranno assieme");
        }
        partita.setPlayers(new ArrayList<>());
        for (int ind = 0; ind < numGiocatori; ind++) {
            System.out.println("Inserire nome del giocatore " + (ind + 1));
            Scanner nameSelect = new Scanner(System.in);
            String nome = nameSelect.nextLine();
            partita.getPlayers().add(new Giocatore(nome));
        }
        if (coppie && giocoASquadre) {
            DynamicStack CoppiaUno= new DynamicStack();
            partita.getPlayers().get(0).setCarteTavolo(CoppiaUno);
            partita.getPlayers().get(2).setCarteTavolo(CoppiaUno);
            DynamicStack CoppiaDue= new DynamicStack();
            partita.getPlayers().get(2).setCarteTavolo(CoppiaDue);
            partita.getPlayers().get(3).setCarteTavolo(CoppiaDue);
        }
        else {
            DynamicStack Tavolo= new DynamicStack();
            for (int index=0; index<partita.getPlayers().size();index++){
                partita.getPlayers().get(index).setCarteTavolo(Tavolo);
            }
        }
        turno(partita);
    }

    public static void turno(gameStart partita){
        if (partita.getGiocoSelezionato().equalsIgnoreCase("pinella")){
            for (int index=0; index<partita.getPlayers().size();index++){
                int nManoRandom=1;
                while (nManoRandom<=13){
                    int numeroCartaCasuale = (int)((Math.random() * partita.getMazzoGioco().getSize())+1);
                    partita.getPlayers().get(index).addManoGiocatore(partita.getMazzoGioco().pescaCarta(numeroCartaCasuale));
                    nManoRandom++;
                }
            }

            System.out.println("Pinella");
        }

        else if (partita.getGiocoSelezionato().equalsIgnoreCase("machiavelli")){
            for (int index=0; index<partita.getPlayers().size();index++){
                int nManoRandom=1;
                while (nManoRandom<=13){
                    int numeroCartaCasuale = (int)((Math.random() * partita.getMazzoGioco().getSize())+1);
                    partita.getPlayers().get(index).addManoGiocatore(partita.getMazzoGioco().pescaCarta(numeroCartaCasuale));
                    nManoRandom++;
                }
            }
            System.out.println("Machiavelli");
        }

        else if(partita.getGiocoSelezionato().equalsIgnoreCase("scopa")){
            for (int index=0; index<partita.getPlayers().size();index++){
                int nManoRandom=1;
                while (nManoRandom<=3){
                    int numeroCartaCasuale = (int)((Math.random() * partita.getMazzoGioco().getSize())+1);
                    partita.getPlayers().get(index).addManoGiocatore(partita.getMazzoGioco().pescaCarta(numeroCartaCasuale));
                    nManoRandom++;
                }
            }
            int numeroCartaCasuale = (int)((Math.random() * partita.getMazzoGioco().getSize())+1);
            partita.getPlayers().get(0).getCarteTavolo().push(partita.getMazzoGioco().pescaCarta(numeroCartaCasuale));
            System.out.println("Scopa");
        }

        else if(partita.getGiocoSelezionato().equalsIgnoreCase("briscola")){
            for (int index=0; index<partita.getPlayers().size();index++){
                int nManoRandom=1;
                while (nManoRandom<=3){
                    int numeroCartaCasuale = (int)((Math.random() * partita.getMazzoGioco().getSize())+1);
                    partita.getPlayers().get(index).addManoGiocatore(partita.getMazzoGioco().pescaCarta(numeroCartaCasuale));
                    nManoRandom++;
                }
            }
            //PRENDERE UNA CARTA CASUALE E SEGNARLA COME SEGNO DELLA BRISCOLA
            System.out.println("Briscola");
        }
    }
}
