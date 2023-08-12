class giocatore {
    id
    nome

    mano = []

    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    initialize(data){
        this.id = data.id;
        this.nome = data.nome;
        return this
    }

    /**
     * Rimuove una carta dalla mano del giocatore:
     * @param {*} cardId è l'id della carta da rimuovere
     * @returns la carta selezionata
     */
    rimuoviCarta(cardId) {
        let tmp;
        for (let i = 0; i < this.mano.length; i++) {
            if (this.mano[i].id == cardId) {
                tmp = this.mano[i];
                this.mano.splice(i, 1);
            }
        }
        return tmp;
    }
}