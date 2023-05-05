
let mazzo = [];
let giocatori =[]

const nCarte = 13
const semi = ["clubs" , "diamonds" , "hearts" , "spades"]

function caricaGiocatori(){
    giocatori.push(new giocatore(1 , "prova"))
}


function distribuisci(){
    for(let i = 0; i < nCarte; i++){
        for(let j = 0 ; j < giocatori.length ; j++){
            pescaMazzo(giocatori[j]);
        }
    }
}

function setupMazzo(){
    mazzo = new deck(13 , semi ,true, 2, true).getMazzo()
}

function pescaMazzo(giocatore){
    let carta = mazzo.pop();
    giocatore.mano.push(carta);

    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
    myImage.id = "image" + giocatore.mano.length; 

    document.querySelector(".giocatore").appendChild(myImage);
    
    myImage.addEventListener("dragstart" ,   function drag(ev) {
        ev.dataTransfer.setData("image", ev.target.id);
      });
}
// Questa parte gestisce lo carto
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function scarto(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("image");
    document.querySelector(".scarto").appendChild(document.getElementById(data));
  }

function pescaScarto() {

}


