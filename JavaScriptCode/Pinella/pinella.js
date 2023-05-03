
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]
//const valori = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

var mazzo = []

function setupMazzo(numeroMazzi){
    for (let nDeck=0; nDeck<numeroMazzi;nDeck++){
        for(j = 0 ; j < semi.length ; j++){
            for(i = 1 ; i <= 13 ; i++){
                mazzo.push(new carte(i , semi[j]))
            }
        }
    }
    shuffleMazzo()
}

function shuffleMazzo() {
    for (var i = mazzo.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = temp;
    }
}

function pesca(){
    if(mazzo.length > 0){
        let carta = mazzo.pop();
        const myImage = new Image(100, 200);
        myImage.src = "../immagini/playingCards/PNG-cards-1.3/"+carta.src+".png";
        const grid = document.querySelector(".mazzo");
        grid.appendChild(myImage);
    }
}
