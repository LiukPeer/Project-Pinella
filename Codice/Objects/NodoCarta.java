package Codice.Objects;

public class NodoCarta{
    private int valore;
    private String seme;
    private NodoCarta next;
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

    public void removeNext(){
        if (next!=null){
            setNext(this.next.getNext());
        }
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
    public static String toString(NodoCarta nodoCarta){
        String output="";
        int val=nodoCarta.getValore();
        if (val==1){
            output+="Asso";
        }
        else if (val==2){
            output+="Due";
        }
        else if (val==3){
            output+="Tre";
        }
        else if (val==4){
            output+="Quattro";
        }
        else if (val==5){
            output+="Cinque";
        }
        else if (val==6){
            output+="Sei";
        }
        else if (val==7&&!nodoCarta.getSeme().equalsIgnoreCase("denari")){
            output+="Sette";
        }
        else if (val==7&&nodoCarta.getSeme().equalsIgnoreCase("denari")){
            output+="Settebello";
        }
        else if (val==8){
            output+="Otto";
        }
        else if (val==9){
            output+="Nove";
        }
        else if (val==10){
            output+="Dieci";
        }
        else if (val==11){
            output+="Fante";
        }
        else if (val==12){
            output+="Regina";
        }
        else if (val==13){
            output+="Re";
        }
        if(val!=0)
            output+=" di ";
        if (!(val==7)||!nodoCarta.getSeme().equalsIgnoreCase("denari")){
            output+=nodoCarta.getSeme();
        }
        return output;
    }
}


