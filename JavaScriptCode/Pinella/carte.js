class carte{

    #numero 
    #seme
    #contenitore

    static #nomi = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

    src

    constructor(numero , seme , contenitore){
        this.numero = numero
        this.seme = seme
        this.contenitore = contenitore
        this.src = nomi[numero -1] + "_of_" + seme
    }


    getSeme(){
        return seme
    }

    getNumero(){
        return numero
    }

    getContenitore(){
        return contenitore
    }

    sposta(contenitore){
        this.contenitore = contenitore
    }
    
}