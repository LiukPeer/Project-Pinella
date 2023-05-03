/** La classe mazzo serve a creare i mazzi per ogni tipo di gioco, una volta forniti i parametri.
 * Per il caso di pinella, se booleanPinella è true,
 * non verranno creati i 2 rossi e i 2 neri saranno delle pinelle
 */
class deck{

    mazzo = []
    constructor(maxValore, arraySemi, booleanJoker, numeroMazzi, booleanPinella) {
        for (let nDeck=0; nDeck<numeroMazzi;nDeck++) {
            for (let nSeme = 0; nSeme < arraySemi.length; nSeme++) {
                for (let nValore = 1; nValore <= 13; nValore++) {
                    if(nValore === 2){
                        if (arraySemi[nSeme]==='clubs'&& booleanPinella){
                            this.mazzo.push(new joker("2_of_clubs" , false))
                        }
                        else if (arraySemi[nSeme]==='spades' && booleanPinella){
                            this.mazzo.push(new joker("2_of_spades" , false))
                        }
                        else if (arraySemi[nSeme]==='hearts' || arraySemi[nSeme]==='diamonds'&&!booleanPinella){
                            this.mazzo.push(new carte(nValore, arraySemi[nSeme]))
                        }
                    }
                    else{
                        this.mazzo.push(new carte(nValore, arraySemi[nSeme]))
                    }
                }
            }
            if (booleanJoker===true) {
                this.mazzo.push(new joker("red_joker" , true))
                this.mazzo.push(new joker("black_joker" , true))
            }
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