package Codice;

//DynamickStack.java
public class DynamicStack {
    private NodeC top;
    int size;

    //ultimo nodo aggiunto alla pila, "null" se non ce ne sono
//COSTRUTTORE di una pila P = {} vuota
    public DynamicStack() {
        top = null;
        size=0;
    }

    //test se la pila e' vuota
    public boolean empty() {
        return top == null;
    }

    //aggiungo un nodo in cima alla pila con un nuovo elemento x
    public void push(Carta x) {
        top = new NodeC(x, top);
        size++;
    }

    //tolgo il nodo in cima alla pila e restituisco il suo contenuto
    public Carta pop() {
        assert !empty();
        Carta x = top.getCard();
        top = top.getNext(); //elimino l'ultimo nodo con contenuto x
        size--;
        return x;
    }

    //restituisco il contenuto del nodo in cima alla pila senza
//toglierlo
    public Carta top() {
        assert !empty();
        return top.getCard();
    }
    public NodeC topNode() {
        assert !empty();
        return top;
    }

    /* STAMPA. Per scorrere una pila usiamo una variabile di tipo NodeC
    che parte da top e procede lungo la pila fino a arrivare al nodo
    null. Usiamo di nuovo una conversione NodeC-->String. */
    public String toString() {
        NodeC temp = top; //partiamo dal nodo in cima alla pila
        String s = ""; //accumuliamo gli elementi in s
        while (temp != null) { //ci fermiamo quando temp arriva al nodo null
            s = s + " || " + temp.getCard() + "\n"; //aggiungiamo l’elemento in cima
            temp = temp.getNext(); //avanziamo al nodo successivo
        }
        return s;
    }

    /* NOTA: dobbiamo salvare top in temp. Se avessimo usato top al posto di
  temp, scrivendo top=top.getNext(), avremmo cancellato l’indirizzo della
  cima della pila, e quindi perso l’accesso alla pila dopo l’esecuzione del
  metodo. */
//COSTRUTTORE di una pila P = {1,...,n}, pila vuota se n<=0.
//Aggiunge i nodi nell’ordine da n fino a 1. 1 sta nel top.
    public DynamicStack(Carta n) {
        top = null;
        int i = n.getValore();
        while (i >= 1) //aggiungo il nodo che contiene i
        {
            top = new NodeC(new Carta(i, n.getSeme()), top);
            --i;
        }
    }

    public int size(){
        return size;
    }

    public DynamicStack(String gioco) {
        int numeroCarte;
        int numeroMazzi;
        if (gioco.equalsIgnoreCase("pinella") || gioco.equalsIgnoreCase("machiavelli") || gioco.equalsIgnoreCase("scala")) {
            numeroCarte = 54;
            numeroMazzi = 2;
            top = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Picche", "Cuori", "Fiori", "Quadri"}, gioco);
        } else if (gioco.equalsIgnoreCase("scopa") || gioco.equalsIgnoreCase("briscola") ||gioco.equalsIgnoreCase("scopone")) {
            numeroCarte = 40;
            numeroMazzi = 1;
            top = creaMazzo(numeroCarte, numeroMazzi, new String[]{"Spade", "Bastoni", "Denari", "Coppe"}, gioco);
        } else {
            System.out.println("Tale gioco non esiste o non è stato implementato");
        }
    }

    NodeC creaMazzo(int nCarte, int nMazzi, String[] semi, String gioco) {
        NodeC mc=null;
        int valore = 1;
        for (int n=nMazzi; n>0;n--){  //creo n volte le carte di un mazzo
            for (int segno=0; segno<semi.length;segno++){  //creo le carte per ogni valore di ogni seme
                while (valore<=(nCarte / semi.length)){
                    if (!gioco.equalsIgnoreCase("pinella") || (valore != 2) || (!semi[segno].equalsIgnoreCase("Cuori") && !semi[segno].equalsIgnoreCase("Quadri"))) {
                        mc= new NodeC(new Carta(valore, semi[segno]),mc);   //aggiugno le carte in cima alla lista dinamica
                    }
                    valore++;
                }
                valore=1;
            }
        }

        int numeroJolly=(nCarte*nMazzi)- NodeC.length(mc);
        if (gioco.equalsIgnoreCase("pinella")){
            numeroJolly=numeroJolly-2*nMazzi;  //compenso la rimozione dei due rossi per pinella
        }
        while (numeroJolly>0){
            mc= new NodeC(new Carta(0,"Jolly"),mc);
            numeroJolly--;
        }

        size= NodeC.length(mc);
        return mc;
    }
}
