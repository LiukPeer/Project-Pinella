
let mazzo = [];
let giocatori =[]
let mazzoScarto=[]

//turno andrà modificato dinamicamente
let turno = 0

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

function pescaMazzo(){
    let carta = mazzo.pop();
    giocatori[turno].mano.push(carta);

    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
    myImage.id = carta.id; 

    document.querySelector(".giocatore").appendChild(myImage);
    
    myImage.addEventListener("dragstart" ,   function drag(ev) {
        ev.dataTransfer.setData("carta", ev.target.id);
      });
}
// Questa parte gestisce lo carto
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function scarto(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("carta");
    document.querySelector(".scarto").appendChild(document.getElementById(data));
    mazzoScarto.push(data)
    giocatori[turno].rimuoviCarta(data)
  }

function pescaScarto() {

}


