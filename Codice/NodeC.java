package Codice;

//NodeC.java
public class NodeC {
    private Carta carta;
    private NodeC next;

    //Da implementare: il giocatore viene incluso nei nodi per determinare a chi appartiene una carta.
    //                 Quando la carta è nel mazzo o scartata l'appartenenza è null.

    public NodeC(Carta card, NodeC next) {
        this.carta = card;
        this.next = next;
    }

    public Carta getCard() {
        return this.carta;
    }

    public NodeC getNext() {
        return this.next;
    }

    public void setCard(Carta card) {
        this.carta = card;
    }

    public void setNext(NodeC next) {
        this.next = next;
    }
}


