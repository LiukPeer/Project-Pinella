package Codice;

public class Carta {
    private int valore;
    private String seme;

    /* Le carte hanno come valore da 1 a 13, tranne il jolly che vale 0
       oppure carte da 1 a 12, tranne jolly e pinella
     */
    public Carta(int value, String sign) {
        valore = value;
        seme = sign;
    }

    public int getValore() {
        return valore;
    }

    public String getSeme() {
        return seme;
    }

    public void setValore(int valore) {
        this.valore = valore;
    }

    public void setSeme(String seme) {
        this.seme = seme;
    }
}
