package Codice.Objects;

public class Giocatore {
    protected String nomeGiocatore;
    protected DynamicStack manoGiocatore;
    protected DynamicStack carteTavolo;
    protected int punteggio;

    public Giocatore(String nome, DynamicStack mano, DynamicStack carteT){
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

    public void setCarteTavolo(DynamicStack carteTavolo) {
        this.carteTavolo = carteTavolo;
    }
    public DynamicStack getCarteTavolo() {
        return carteTavolo;
    }
    public int getPunteggio() {
        return punteggio;
    }

    public void addManoGiocatore(NodoCarta nodo) {
        manoGiocatore.push(nodo);
    }
}
