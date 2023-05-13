let mazzo = [];
let giocatori = [];
let mazzoScarto = []

//turno andrà modificato dinamicamente
let turno = 0

const nCarte = 13
const semi = ["clubs", "diamonds", "hearts", "spades"]


//inizializza il database
firebase.initializeApp(JSON.parse(sessionStorage.getItem("dbConfig")));

const gameId = sessionStorage.getItem("sessionId");
const gameRef = firebase.database().ref("games/" + gameId)

var playerId;
var playerRef;

// rimuove la sessione nel caso in cui qualcuno si disconnetta
function allowDisconnection() {
    if (gameRef != undefined) {
        gameRef.onDisconnect().remove();
    }
}

function setup(){
    // genera il giocatore a partire dal cookie
    sessionId = sessionStorage.getItem("sessionId");
    let player = new giocatore();
    player = player.initialize(JSON.parse(sessionStorage.getItem("giocatore")));
    giocatori.push(player);
    playerId = player.id;
    playerRef = gameRef.child(playerId);

    // crea il mazzo
    mazzo = new deck(13, semi, true, 2, true).getMazzo()

    // distribuisce
    for (let i = 0; i < nCarte; i++) {
        for (let j = 0; j < giocatori.length; j++) {
            pescaMazzo(giocatori[j]);
        }
    }
}

function pesca(carta){
    giocatori[turno].mano.push(carta);

    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/" + carta.src + ".png";
    myImage.id = carta.id;
    document.querySelector(".giocatore").appendChild(myImage);
    //listener per poter scartare
    myImage.addEventListener("dragstart", drag);
}
function drag(ev) {
    ev.dataTransfer.setData("carta", ev.target.id);
}

function pescaMazzo() {
    pesca(mazzo.pop())
}

// Questa parte gestisce lo scarto
function pescaScarto(id) {
    let flag = false;
    // qui le carte vengono pescate dalla cima dello scarto
    for(let i = mazzoScarto.length-1 ; i >= 0 && !flag; i--){
        flag = flag || mazzoScarto[i].id == id
        document.querySelector(".scarto").removeChild(document.getElementById(mazzoScarto[i].id))
        pesca(mazzoScarto.pop());
    }
}

function scarto(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("carta");
    let carta = document.getElementById(data);
    //nel caso in cui la carta sia null esce
    if(carta == null){
        return;
    }
    document.querySelector(".scarto").appendChild(carta);
    //rimuove lo swap delle carte nello carto
    carta.removeEventListener("dragstart" , drag , false);
    //listener per poter pescare
    carta.addEventListener("click" , ev =>{
        pescaScarto(ev.srcElement.id);
    })
    mazzoScarto.push(giocatori[turno].rimuoviCarta(data));
}

function allowDrop(ev) {
    ev.preventDefault();
}
