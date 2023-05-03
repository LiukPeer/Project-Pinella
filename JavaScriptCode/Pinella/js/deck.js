const numeroMazzi = 2
const valoreMax = 13
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]
//const valori = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

class deck{

    mazzo = []

    constructor() {
        for (let nDeck = 0; nDeck < numeroMazzi; nDeck++) {
            for (let nSeme = 0; nSeme < semi.length; nSeme++) {
                for (let nValore = 1; nValore <= valoreMax; nValore++) {
                    if(nValore == 2){
                        continue
                    }
                    this.mazzo.push(new carte(nValore, semi[nSeme]))
                }
            }

            // i 2 vengono considerati come jolly
            this.mazzo.push(new joker("2_of_clubs" , false))
            this.mazzo.push(new joker("2_of_spades" , false))
            this.mazzo.push(new joker("red_joker" , true))
            this.mazzo.push(new joker("black_joker" , true))
        }
        this.shuffleMazzo()
    }

    shuffleMazzo() {
        for (let count = this.mazzo.length - 1; count > 0; count--) {
            let random = Math.floor(Math.random() * (count + 1));
            let temp = this.mazzo[count];
            this.mazzo[count] = this.mazzo[random];
            this.mazzo[random] = temp;
        }
    }

    getMazzo(){
        return this.mazzo
    }
}