class deck{
    mazzo = []

    constructor(maxValore, arraySemi, booleanJoker, numeroMazzi) {
        for (let nDeck=0; nDeck<numeroMazzi;nDeck++) {
            for (let nSeme = 0; nSeme < arraySemi.length; nSeme++) {
                for (let nValore = 1; nValore <= 13; nValore++) {
                    this.mazzo.push(new carte(nValore, arraySemi[nSeme]))
                }
            }
            if (booleanJoker===true) {
                this.mazzo.push(new joker(0, '', 'red'))
                this.mazzo.push(new joker(0, '', 'black'))
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