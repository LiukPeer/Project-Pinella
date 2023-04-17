package Codice.Objects;

//DynamickStack.java
public class DynamicStack {
    private NodoCarta top;
    int size;

    //ultimo nodo aggiunto alla pila, "null" se non ce ne sono
//COSTRUTTORE di una pila P = {} vuota
    public DynamicStack() {
        top = null;
        size=0;
    }

    public DynamicStack(NodoCarta nodo){
        top=nodo;
        size= NodoCarta.length(nodo);
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

    //tolgo il nodo in cima alla pila
    public void pop() {
        assert !empty();
        top = top.getNext(); //elimino l'ultimo nodo con contenuto x
        size--;
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

    /* STAMPA. Per scorrere una pila usiamo una variabile di tipo NodoCarta
    che parte da top e procede lungo la pila fino a arrivare al nodo
    null. Usiamo di nuovo una conversione NodoCarta-->String. */
    public String toString() {
        NodoCarta temp = top; //partiamo dal nodo in cima alla pila
        String s = ""; //accumuliamo gli elementi in s
        while (temp != null) { //ci fermiamo quando temp arriva al nodo null
            s = s + " || " + temp + "\n"; //aggiungiamo l’elemento in cima
            temp = temp.getNext(); //avanziamo al nodo successivo
        }
        return s;
    }
    public int size(){
        return size;
    }

    public DynamicStack(String gioco) {
        size=0;
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

    NodoCarta creaMazzo(int nCarte, int nMazzi, String[] semi, String gioco) {
        NodoCarta mc=null;
        int valore = 1;
        for (int n=nMazzi; n>0;n--){  //creo n volte le carte di un mazzo
            for (String s : semi) {  //creo le carte per ogni valore di ogni seme
                while (valore <= (nCarte / semi.length)) {
                    if (!gioco.equalsIgnoreCase("pinella") || (valore != 2) || (!s.equalsIgnoreCase("Cuori") && !s.equalsIgnoreCase("Quadri"))) {
                        mc = new NodoCarta(valore, s, mc);   //aggiugno le carte in cima alla lista dinamica
                        size++;
                    }
                    valore++;
                }
                valore = 1;
            }
        }

        int numeroJolly=(nCarte*nMazzi)- NodoCarta.length(mc);
        if (gioco.equalsIgnoreCase("pinella")){
            numeroJolly=numeroJolly-2*nMazzi;  //compenso la rimozione dei due rossi per pinella
        }
        while (numeroJolly>0){
            mc= new NodoCarta(0,"Jolly",mc);
            size++;
            numeroJolly--;
        }
        return mc;
    }
}
