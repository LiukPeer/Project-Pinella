class carte{

    #numero 
    #seme

    nomi = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

    src

    /**
     * Crea una nuova carta avente valore e seme indicati
     * @param {*} numero 
     * @param {*} seme 
     */
    constructor(numero , seme){
        this.numero = numero
        this.seme = seme
        this.src = this.nomi[numero -1] + "_of_" + seme
    }


    getSeme(){
        return this.seme
    }

    getNumero(){
        return this.numero
    }
}

class joker extends carte{
    constructor(num, sign, coloreJolly) {
        super(num, sign);
        this.src= coloreJolly+'_joker'
    }

    setSeme (nuovoSeme){
        this.seme=nuovoSeme
    }
    setNumero (nuovoNumero){
        this.numero=nuovoNumero
    }
}