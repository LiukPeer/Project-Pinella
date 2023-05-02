
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]
//const valori = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

var mazzo = []

function setupMazzo(){
    for(j = 0 ; j < semi.length ; j++){
        for(i = 1 ; i <= 13 ; i++){
            mazzo.push(new carte(i , semi[j]))
        }
    }
}

function pesca(){
    if(mazzo.length > 0){
        let carta = mazzo.pop();
        const myImage = new Image(100, 200);
        myImage.src = "../immagini/playingCards/PNG-cards-1.3/"+carta.src+".png";
        const grid = document.querySelector(".griglia");
        grid.appendChild(myImage);
    }
}
