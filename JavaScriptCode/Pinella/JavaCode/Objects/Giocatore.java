package JavaCode.Objects;

import java.util.LinkedList;

public class Giocatore {
    protected String nomeGiocatore;
    protected DynamicStack manoGiocatore;
    protected LinkedList carteTavolo;
    protected int punteggio;

    public Giocatore(String nome, DynamicStack mano, LinkedList carteT){
        nomeGiocatore=nome;
        manoGiocatore=mano;
        carteTavolo=carteT;
        punteggio=0;
    }
    public Giocatore(String nome){
        nomeGiocatore=nome;
        manoGiocatore=new DynamicStack();
        carteTavolo=null;
        punteggio=0;
    }
    public Giocatore(){
        nomeGiocatore=null;
        manoGiocatore=null;
        carteTavolo=null;
        punteggio=0;
    }

    public void setCarteTavolo(LinkedList carteTavolo) {
        this.carteTavolo = carteTavolo;
    }
    public LinkedList getCarteTavolo() {
        return carteTavolo;
    }
    public int getPunteggio() {
        return punteggio;
    }

    public DynamicStack getManoGiocatore() {
        return manoGiocatore;
    }

    public String getNomeGiocatore() {
        return nomeGiocatore;
    }

    public void addManoGiocatore(NodoCarta nodo) {
        manoGiocatore.push(nodo);
    }
}
