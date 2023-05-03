class giocatore{
    #id
    #nome

    mano = [] 
    constructor(id,nome){
        this.id = id;
        this.nome = nome;
    }
    getId(){
        return this.id
    }

    getNome(){
        return this.nome
    }
}