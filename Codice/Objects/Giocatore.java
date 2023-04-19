package Codice.Objects;

public class Giocatore {
    protected String nomeGiocatore;
    protected Giocatore alleati;
    protected DynamicStack manoGiocatore;
    protected NodoDiNodi carteTavolo;
    protected int punteggio;

    public Giocatore(String nome, Giocatore ally, DynamicStack mano, NodoDiNodi carteT){
        nomeGiocatore=nome;
        alleati=ally;
        manoGiocatore=mano;
        carteTavolo=carteT;
        punteggio=0;
    }
    public Giocatore(){
        nomeGiocatore=null;
        alleati=null;
        manoGiocatore=null;
        carteTavolo=null;
        punteggio=0;
    }

    public void setAlleati(Giocatore alleati) {
        this.alleati = alleati;
    }

    public int getPunteggio() {
        return punteggio;
    }

    public void aggiungiCarteProprie(NodoCarta top){
        NodoDiNodi a = new NodoDiNodi(top, null);
        a.setNext(carteTavolo);
        carteTavolo=a;
    }
}
