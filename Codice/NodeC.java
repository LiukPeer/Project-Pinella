package Codice;

//NodeC.java
public class NodeC {
  private Carta carta;
  private NodeC next;
  public NodeC(Carta card, NodeC next){
    this.carta=card;
    this.next=next;
  }
  public Carta getCard(){
    return carta;}
  public NodeC getNext(){
    return next;}
  public void setCard(Carta card){
    this.carta=card;}
  public void setNext(NodeC next){
    this.next=next;
  }
}


