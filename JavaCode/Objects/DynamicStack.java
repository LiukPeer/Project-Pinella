package JavaCode.Objects;

//DynamickStack.java
public class DynamicStack {
    protected NodoCarta top;
    int size;

    //ultimo nodo aggiunto alla pila, "null" se non ce ne sono
//COSTRUTTORE di una pila P = {} vuota
    public DynamicStack() {
        top = null;
        size=0;
    }

    public NodoCarta getTop() {
        return top;
    }

    public DynamicStack(NodoCarta nodo){
        this.top=new NodoCarta(nodo.getValore(), nodo.getSeme(), top);
        size= NodoCarta.length(nodo);
    }

    public NodoCarta pescaCarta(int indiceCarta){
        NodoCarta result;
        NodoCarta temp2=top;
        int conta=1;
        NodoCarta temp = top;
        while (conta<indiceCarta && temp.getNext()!=null){
            temp=temp.getNext();
            if (conta!=indiceCarta-1)
                temp2=temp2.getNext();
            conta++;
        }
        if (indiceCarta==1){
            result=specialPop(temp);
            this.top=null;
        }
        else {
            result=specialPop(temp);
            temp2.removeNext();
        }
        size=NodoCarta.length(getTop());
        return result;
    }

    //test se la pila e' vuota
    public boolean empty() {
        return top == null;
    }

    //aggiungo una carta in cima alla pila
    public void push(int value, String sign) {
        top = new NodoCarta(value, sign, top);
        size++;
    }
    public void push(NodoCarta nodoCarta) {
        if (top!=null){
            top = new NodoCarta(nodoCarta.getValore(),nodoCarta.getSeme(), top);
        }
        else{
            top = new NodoCarta(nodoCarta.getValore(),nodoCarta.getSeme(), null);
        }
        size++;
    }

    //tolgo il nodo in cima alla pila
    public NodoCarta popGet() {
        assert !empty();
        NodoCarta temp = new NodoCarta(top.getValore(),top.getSeme(),null);
        top = top.getNext();
        size--;
        return temp;
    }

    public void popVoid() {
        assert !empty();
        top = top.getNext(); //elimino l'ultimo nodo con contenuto x
        size--;
    }

    public NodoCarta popReturn() {
        assert !empty();
        NodoCarta temp = top;
        top = top.getNext();
        size--;
        return temp;
    }

    public NodoCarta specialPop(NodoCarta nodo){
        assert !empty();
        return nodo;
    }

    //restituisco il contenuto del nodo in cima alla pila senza
//toglierlo
    public int getTopValue() {
        assert !empty();
        return top.getValore();
    }

    public String getTopSign() {
        assert !empty();
        return top.getSeme();
    }
    public NodoCarta getTopNode() {
        assert !empty();
        return top;
    }
    public String toString() {
        NodoCarta temp = top; //partiamo dal nodo in cima alla pila
        String s = ""; //accumuliamo gli elementi in s
        while (temp != null) { //ci fermiamo quando temp arriva al nodo null
            s = s + " || " + temp + "\n"; //aggiungiamo l’elemento in cima
            temp = temp.getNext(); //avanziamo al nodo successivo
        }
        return s;
    }
    public int getSize(){
        return size;
    }
}
