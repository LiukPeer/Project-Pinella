package Codice;

import Codice.Objects.DynamicStack;
import Codice.Objects.Giocatore;
import Codice.Objects.NodoCarta;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Scanner;

public class gameStart {
    LinkedList<Giocatore> players;
    String giocoSelezionato;
    LinkedList<NodoCarta> mazzoGioco;
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

    public void setPlayers(LinkedList<Giocatore> players) {
        this.players = players;
    }

    public LinkedList<Giocatore> getPlayers() {
        return players;
    }

    public void setMazzoGioco(LinkedList<NodoCarta> mazzoGioco) {
        this.mazzoGioco = mazzoGioco;
    }

    public LinkedList<NodoCarta> getMazzoGioco() {
        return mazzoGioco;
    }

    public DynamicStack getCarteScartate() {
        return carteScartate;
    }

    public static void main(String[] args) {
        gameStart partita = new gameStart();
        Scanner gameSelect = new Scanner(System.in);

        System.out.println("Benvenuto! Seleziona il gioco");
        System.out.println("-Pinella\n-Machiavelli\n-Scopa\n-Briscola");
        partita.setGiocoSelezionato(gameSelect.nextLine());
        creaMazzo(partita);

        System.out.println("Selezionare numero di giocatori");
        int numGiocatori = gameSelect.nextInt();
        assert numGiocatori > 1 && numGiocatori <=4 : "I giocatori non possono essere meno di 1 o più di 4";
        boolean coppie = (numGiocatori == 4);
        boolean giocoASquadre = partita.getGiocoSelezionato().equalsIgnoreCase("pinella")||partita.getGiocoSelezionato().equalsIgnoreCase("briscola");
        if (coppie&&giocoASquadre) {
            System.out.println("Si giocherà a squadre\nI giocatori 1 e 3 e i giocatori 2 e 4 saranno assieme");
        }
        inserisciGiocatoriConNome(partita, numGiocatori);
        creaAreaTavoloGiocatori(partita, coppie, giocoASquadre);
        inizioPartita(partita);
    }

    private static void inserisciGiocatoriConNome(gameStart partita, int numGiocatori) {
        partita.setPlayers(new LinkedList<>());
        for (int ind = 0; ind < numGiocatori; ind++) {
            System.out.println("Inserire nome del giocatore " + (ind + 1));
            Scanner nameSelect = new Scanner(System.in);
            String nome = nameSelect.nextLine();
            partita.getPlayers().add(new Giocatore(nome));
        }
    }

    private static void creaAreaTavoloGiocatori(gameStart partita, boolean coppie, boolean giocoASquadre) {
        if (coppie && giocoASquadre) {
            LinkedList<NodoCarta> CoppiaUno= new LinkedList<>();
            partita.getPlayers().get(0).setCarteTavolo(CoppiaUno);
            partita.getPlayers().get(2).setCarteTavolo(CoppiaUno);
            LinkedList<NodoCarta> CoppiaDue= new LinkedList<>();
            partita.getPlayers().get(1).setCarteTavolo(CoppiaDue);
            partita.getPlayers().get(3).setCarteTavolo(CoppiaDue);
        }
        else {
            LinkedList<NodoCarta> Tavolo= new LinkedList<>();
            for (int index = 0; index< partita.getPlayers().size(); index++){
                partita.getPlayers().get(index).setCarteTavolo(Tavolo);
            }
        }
    }

    public static void inizioPartita(gameStart partita){
        int quanteCarteInMano;
        if (booleanControlloGioco(partita, "pinella")){ //pinella
            quanteCarteInMano=13;
            creaManoTuttiGiocatori(partita,quanteCarteInMano);
            spostaMazzoCarteScartate(partita, getNumeroCartaCasuale(partita));
            System.out.println("Pinella");
        }
        else if (booleanControlloGioco(partita, "machiavelli")){ //machiavelli
            quanteCarteInMano=13;
            creaManoTuttiGiocatori(partita,quanteCarteInMano);
            System.out.println("Machiavelli");
        }
        else if(booleanControlloGioco(partita, "scopa")){ //scopa
            quanteCarteInMano=3;
            creaManoTuttiGiocatori(partita,quanteCarteInMano);
            carteTavoloInizialiScopa(partita);
            System.out.println("Scopa");
        }
        else if(booleanControlloGioco(partita, "briscola")){ //briscola
            quanteCarteInMano=3;
            creaManoTuttiGiocatori(partita,quanteCarteInMano);
            //PRENDERE UNA CARTA CASUALE E SEGNARLA COME SEGNO DELLA BRISCOLA
            System.out.println("Briscola");
        }
    }

    private static boolean booleanControlloGioco(gameStart partita, String giocoDaControllare) {
        return partita.getGiocoSelezionato().equalsIgnoreCase(giocoDaControllare);
    }

    private static void carteTavoloInizialiScopa(gameStart partita) {
        for (int con=0; con<4;con++){
            int index=getNumeroCartaCasuale(partita);
            partita.getPlayers().get(0).getCarteTavolo().add(pescaCartaMazzo(partita, index));
            partita.getMazzoGioco().remove(index);
        }
    }

    private static void creaManoTuttiGiocatori(gameStart partita, int carteInMano) {
        for (int index=0; index<partita.getPlayers().size();index++){
            int nManoRandom=1;
            while (nManoRandom<=carteInMano){
                int posizCartaCasuale=getNumeroCartaCasuale(partita);
                aggiungiCartaPescataMano(partita, index, posizCartaCasuale);
                partita.getMazzoGioco().remove(posizCartaCasuale);
                nManoRandom++;
            }
        }
    }

    private static int getNumeroCartaCasuale(gameStart partita) {
        return (int)((Math.random() * partita.getMazzoGioco().size()));
    }

    private static void aggiungiCartaPescataMano(gameStart partita, int index, int numeroCartaCasuale) {
        partita.getPlayers().get(index).addManoGiocatore(pescaCartaMazzo(partita, numeroCartaCasuale));
    }

    private static NodoCarta pescaCartaMazzo(gameStart partita, int numeroCarta) {
        return partita.getMazzoGioco().get(numeroCarta);
    }

    private static void spostaMazzoCarteScartate(gameStart partita, int numeroCarta){
        partita.getCarteScartate().push(pescaCartaMazzo(partita, numeroCarta));
    }

    private static void creaMazzo(gameStart partita){
        int numeroCarte;
        int numeroMazzi;
        if (booleanControlloGioco(partita,"pinella") || booleanControlloGioco(partita,"machiavelli") || booleanControlloGioco(partita,"scala")) {
            numeroCarte = 54;
            numeroMazzi = 2;
            partita.setMazzoGioco(creaMazzoSupport(partita,numeroCarte, numeroMazzi, new String[]{"Picche", "Cuori", "Fiori", "Quadri"}, partita.getGiocoSelezionato()));
        } else if (booleanControlloGioco(partita,"scopa") || booleanControlloGioco(partita,"briscola") ||booleanControlloGioco(partita,"scopone")) {
            numeroCarte = 40;
            numeroMazzi = 1;
            partita.setMazzoGioco(creaMazzoSupport(partita,numeroCarte, numeroMazzi, new String[]{"Spade", "Bastoni", "Denari", "Coppe"}, partita.getGiocoSelezionato()));
        } else {
            System.out.println("Tale gioco non esiste o non è stato implementato");
        }
    }

    private static LinkedList<NodoCarta> creaMazzoSupport(gameStart partita, int nCarte, int nMazzi, String[] semi, String gioco) {
        LinkedList<NodoCarta> Mazzo= new LinkedList<>();
        int valore = 1;
        for (int n=nMazzi; n>0;n--){  //creo n volte le carte di un mazzo
            for (String s : semi) {  //creo le carte per ogni valore di ogni seme
                while (valore <= (nCarte / semi.length)) {
                    if (!booleanControlloGioco(partita,"pinella") || (valore != 2) || (!s.equalsIgnoreCase("Cuori") && !s.equalsIgnoreCase("Quadri"))) {
                        Mazzo.add(new NodoCarta(valore, s, null)); //aggiugno le carte in cima alla lista dinamica
                    }
                    valore++;
                }
                valore = 1;
            }
        }

        int numeroJolly=(nCarte*nMazzi)- Mazzo.size();
        if (booleanControlloGioco(partita,"pinella")){
            numeroJolly=numeroJolly-2*nMazzi;  //compenso la rimozione dei due rossi per pinella
        }
        while (numeroJolly>0){
            Mazzo.add(new NodoCarta(0,"Jolly",null));
            numeroJolly--;
        }
        return Mazzo;
    }

}
