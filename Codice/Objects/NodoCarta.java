package Codice.Objects;

//NodoCarta.java
public class NodoCarta {
    private int valore;
    private String seme;
    private NodoCarta next;

    //Da implementare: il giocatore viene incluso nei nodi per determinare a chi appartiene una carta.
    //                 Quando la carta è nel mazzo o scartata l'appartenenza è null.

    public NodoCarta(int value, String sign, NodoCarta next) {
        this.valore = value;
        this.seme = sign;
        this.next = next;
    }

    public int getValore() {
        return this.valore;
    }

    public String getSeme() {
        return this.seme;
    }

    public void setValore(int valore) {
        this.valore = valore;
    }

    public void setSeme(String seme) {
        this.seme = seme;
    }

    public NodoCarta getNext() {
        return this.next;
    }

    public void setNext(NodoCarta next) {
        this.next = next;
    }

    public static int length(NodoCarta node){
        if (node==null){
            return 0;
        }
        else {
            return 1 + length(node.getNext());
        }
    }
}


