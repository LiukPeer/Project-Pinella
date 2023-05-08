class giocatore{
    #id
    #nome

    mano = []
    constructor(id,nome){
        this.id = id;
        this.nome = nome;
    }
    getId(){
        return this.#id
    }

    getNome(){
        return this.#nome
    }
    getMano() {
        return this.mano
    }

    rimuoviCarta(cardId){
        for(let i = 0 ; i < this.mano.length ; i++){
            if(this.mano[i].id == cardId){
                this.mano.splice(i , 1);
            }
        }
    }
}