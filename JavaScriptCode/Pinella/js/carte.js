class carte {

    #numero
    #seme

    nomi = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

    id
    src

    /**
     * Crea una nuova carta avente valore e seme indicati
     * @param {*} numero
     * @param {*} seme
     */
    constructor(numero, seme, cardId) {
        this.numero = numero
        this.seme = seme
        this.id = cardId
        this.src = this.nomi[numero - 1] + "_of_" + seme
    }


    getSeme() {
        return this.seme
    }

    getNumero() {
        return this.numero
    }
}

class joker {

    id
    src
    isJoker

    constructor(jollyName, isJoker, cardID) {
        this.src = jollyName
        this.isJoker = isJoker
        this.id = cardID
    }
}