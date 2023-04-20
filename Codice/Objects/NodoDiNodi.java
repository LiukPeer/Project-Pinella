package Codice.Objects;

public class NodoDiNodi {
    private NodoCarta elemento;
    private NodoDiNodi next;

    public NodoDiNodi(){
        this.elemento=null;
        this.next=null;
    }

    public NodoDiNodi(NodoCarta elem,NodoDiNodi pros){
        this.elemento=elem;
        this.next=pros;
    }

    public void push(NodoCarta nodoCarta){
        
    }

    public void setElemento(NodoCarta elemento) {
        this.elemento = elemento;
    }

    public void setNext(NodoDiNodi next) {
        this.next = next;
    }

    public NodoDiNodi getNext() {
        return next;
    }

    public NodoCarta getElemento() {
        return elemento;
    }
}
