
let mazzoPinella = [];
let giocatori =[]

const nCarte = 13

function distribuisci(){
    for(let i = 0; i < nCarte * giocatori.length; i++){
        giocatori[i].mano.push(mazzoPinella.pop())
        i = ++i % giocatori.length
    }

}

function setupMazzo(){
    mazzoPinella = new deck(13,["clubs" , "diamonds" , "hearts" , "spades"],true, 2, true).getMazzo()
}

function pescaMazzo(){
    
    let carta = mazzoPinella.pop();
   
    const myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
    const grid = document.querySelector(".scarto");
    grid.appendChild(myImage);


    const scarto = document.querySelector(".mazzoPinella");
    scarto.appendChild(myImage);

    console.log(mazzoPinella.length)
}

function pescaScarto() {

}
