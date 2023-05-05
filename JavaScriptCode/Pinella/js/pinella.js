
let mazzo = [];
let giocatori =[]

const nCarte = 13
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]

function distribuisci(){
    for(let i = 0; i < nCarte; i++){
        for(let j = 0 ; j < giocatori.length ; j++){
            giocatori[j].mano.push(mazzo.pop())
        }
    }
}

function setupMazzo(){
    mazzo = new deck(13 , semi ,true, 2, true).getMazzo()
}

function pescaMazzo(){
    let carta = mazzo.pop();
    
    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
    let mano = document.querySelector(".giocatore");
    mano.appendChild(myImage);

    console.log(mazzo.length)
}

function scarto(){

}

function pescaScarto() {

}
