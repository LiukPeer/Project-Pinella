package Codice;

public class Carta {
    private int valore;
    private String seme;

    public Carta(int value, String sign){
        valore=value;
        seme=sign;
    }

    public int getValore(){
        return valore;
    }
    public String getSeme(){
        return seme;
    }

    public void setValore(int valore) {
        this.valore = valore;
    }

    public void setSeme(String seme) {
        this.seme = seme;
    }
}
