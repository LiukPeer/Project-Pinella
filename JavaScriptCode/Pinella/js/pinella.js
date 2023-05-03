const valoreMax = 13
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]
//const valori = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

let mazzoPinella = [];

function setupMazzo(){
    mazzoPinella= new deck(valoreMax,semi,true,2).getMazzo()
}

function pesca(){
    if(mazzoPinella.length > 0){
        let carta = mazzoPinella.pop();
        const myImage = new Image(50, 75);
        myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
        const grid = document.querySelector(".mazzoPinella");
        grid.appendChild(myImage);
    }
}
