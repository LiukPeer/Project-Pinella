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
                this.mazzo.push(new joker(0, null, 'red'))
                this.mazzo.push(new joker(0, null, 'black'))
            }
        }
        this.shuffleMazzo()
    }

    shuffleMazzo() {
        for (let i = this.mazzo.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.mazzo[i];
            this.mazzo[i] = this.mazzo[j];
            this.mazzo[j] = temp;
        }
    }
}