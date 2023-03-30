package Codice;

//DynamickStack.java
public class DynamicStack {
private NodeC top;
//ultimo nodo aggiunto alla pila, "null" se non ce ne sono
//COSTRUTTORE di una pila P = {} vuota
public DynamicStack(){
  top = null;
}
//test se la pila e' vuota
public boolean empty(){
  return top==null;}
//aggiungo un nodo in cima alla pila con un nuovo elemento x
public void push(Carta x) {
  top = new NodeC(x, top);
}
//tolgo il nodo in cima alla pila e restituisco il suo contenuto
public int pop(){
  assert !empty();
  int x = top.getElem();
  top = top.getNext(); //elimino l'ultimo nodo con contenuto x
  return x;
}
  //restituisco il contenuto del nodo in cima alla pila senza
//toglierlo
public Carta top(){
  assert !empty();
  Carta x = top.getElem();
  return x;
}
/* STAMPA. Per scorrere una pila usiamo una variabile di tipo NodeC
che parte da top e procede lungo la pila fino a arrivare al nodo
null. Usiamo di nuovo una conversione NodeC-->String. */
public String toString(){
  NodeC temp = top; //partiamo dal nodo in cima alla pila
  String s = ""; //accumuliamo gli elementi in s
  while (temp != null){ //ci fermiamo quando temp arriva al nodo null
    s=s+" || "+temp.getElem()+"\n"; //aggiungiamo l’elemento in cima
    temp=temp.getNext(); //avanziamo al nodo successivo
  }
  return s;
}
  /* NOTA: dobbiamo salvare top in temp. Se avessimo usato top al posto di
temp, scrivendo top=top.getNext(), avremmo cancellato l’indirizzo della
cima della pila, e quindi perso l’accesso alla pila dopo l’esecuzione del
metodo. */
//COSTRUTTORE di una pila P = {1,...,n}, pila vuota se n<=0.
//Aggiunge i nodi nell’ordine da n fino a 1. 1 sta nel top.
public DynamicStack(int n){
  top = null; int i = n;
  while (i>=1) //aggiungo il nodo che contiene i
{top = new NodeC(i,top);--i;}
}
}
