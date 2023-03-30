package Codice;

//NodeC.java
public class NodeC {
    private Carta carta;
    private NodeC next;

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

    static int length(NodeC node) {
        if (node == null) {
            return 0;
        }
        return 1 + length(node.getNext());
    }
}


