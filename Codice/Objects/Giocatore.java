package Codice.Objects;

public class Giocatore {
    protected String nomeGiocatore;
    protected DynamicStack manoGiocatore;
    protected NodoDiNodi carteTavolo;
    protected int punteggio;

    public Giocatore(String nome, DynamicStack mano, NodoDiNodi carteT){
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

    public void setCarteTavolo(NodoDiNodi carteTavolo) {
        this.carteTavolo = carteTavolo;
    }

    public NodoDiNodi getCarteTavolo() {
        return carteTavolo;
    }

    public int getPunteggio() {
        return punteggio;
    }

    public void aggiungiCarteProprie(NodoCarta top){
        NodoDiNodi a = new NodoDiNodi(top, null);
        a.setNext(carteTavolo);
        carteTavolo=a;
    }

    public void addManoGiocatore(NodoCarta nodo) {
        manoGiocatore.push(nodo);
    }
}
