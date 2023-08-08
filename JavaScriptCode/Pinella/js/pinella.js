let mazzo = [];
let mazzoScarto = [];

//turno andrà modificato dinamicamente
let turno = 0

const nCarte = 13
const semi = ["clubs", "diamonds", "hearts", "spades"]


//inizializza il database
firebase.initializeApp(JSON.parse(sessionStorage.getItem("dbConfig")));

const gameId = sessionStorage.getItem("sessionId");
const gameRef = firebase.database().ref("games/" + gameId);

const allPlayersRef = firebase.database().ref("games/" + gameId + "/players");

const deckRef = firebase.database().ref('games/' + gameId + "/deck");
const scartoRef = firebase.database().ref('games/' + gameId + "/discard");


var manoRef;

var player;
var playerId;
var playerRef;

// rimuove la sessione nel caso in cui qualcuno si disconnetta
function allowDisconnection() {
    if (gameRef != undefined) {
        gameRef.onDisconnect().remove();
    }
}

// chiude la sessione quando un giocatore si disconnette
allPlayersRef.on("child_removed", (snapshot) => {
    if(snapshot.val().id != playerId){
        alert("Il giocatore " + snapshot.val().nome + " si è disconnesso");
    }
    window.location = "Users.html"
  })

function setup(){
    // genera il giocatore a partire dal cookie
    player = (new giocatore()).initialize(JSON.parse(sessionStorage.getItem("giocatore")));
    playerId = player.id;
    playerRef = firebase.database().ref('games/' + gameId + "/players/" + playerId);
    manoRef = firebase.database().ref("games/" + gameId + "/players/" + playerId + "/mano");

    playerRef.once("value").then((snapshot)=>{
        if(snapshot.exists()){
            // se il player è l'host inizializza la partita
            if(snapshot.val().isHost){
                initDb();
            }
            // quando i dati vengono caricati sul db viene aggiornato il client
            updateClientAux()

        // se non trova un collegamento
        }else{
            console.log("no data available")
        }
    }).catch((error) => {
        console.error(error);
    });
}

// setta il database IMPORTANTE CHIAMARE SOLO UNA VOLTA
function initDb(){
    // crea il mazzo
    mazzo = new deck(13, semi, true, 2, true).getMazzo(); 

    // distribuisce le carte
    allPlayersRef.once("value").then((snapshot) => {
        let players = snapshot.val();

        for (let i = 0; i < nCarte; i++) {
            Object.keys(players).forEach((key) => {
                //deve aggiungere una carta a ciascun giocatore
                let tmpManoRef = firebase.database().ref("games/" + gameId + "/players/" + players[key].id + "/mano");
                pushCard(tmpManoRef , mazzo.pop());
            });
        }
    });

    // scarta la prima carta del mazzo
    pushCard(scartoRef , mazzo.pop())
    //setScarto([mazzo.pop()]);

    // inerisce il mazzo all'interno del database
    mazzo.forEach(carta => {
        pushCard(deckRef , carta);
    });

    // imposta il turno a 0
    gameRef.update({
        turno: 0,
        started: true
    })
}

// inserisce la carta all'interno del riferimento
function pushCard(ref , carta){
    if(carta instanceof joker){
        ref.push().set({
            id : carta.id,
            isJoker : true,
            isREALLYJoker : carta.isJoker,
            src : carta.src
        })
    }else if(carta instanceof carte){
        ref.push().set({
            id : carta.id,
            isJoker : false,
            numero : carta.numero,
            seme : carta.seme
        })
    }else{
        console.error("invalid argument!")
    }
}

// preleva una carta dal database e la inserisce nell'insieme
function getCard(insieme , carta){
    if(carta.isJoker){
        insieme.push(new joker(carta.src , carta.isREALLYJoker , carta.id));
    }else{
        insieme.push(new carte(carta.numero , carta.seme , carta.id));
    }
}

// preleva tutte le informazioni dal database
function updateClientAux(){
    gameRef.once("value").then((snapshot) => {
        if(snapshot.val().started){
            updateClient()
        }else{
            setTimeout(updateClientAux , 500)
        }
    })
}
function updateClient(){
    // aggiorna il mazzo
    deckRef.once("value").then((snapshot) => {
        mazzo = [];
        let m = snapshot.val();
        Object.keys(m).forEach(carta => {
            getCard(mazzo , m[carta]);
        });
    });

    //aggiorna lo scarto
    scartoRef.once("value").then((snapshot) => {
        mazzoScarto = [];
        let m = snapshot.val();
        Object.keys(m).forEach(carta => {
            getCard(mazzoScarto , m[carta]);
        });
        setScarto();
    });

    // aggiorna la mano
    manoRef.once("value").then((snapshot) => {
        player.mano = [];
        let m = snapshot.val();
        Object.keys(m).forEach(carta => {
            getCard(player.mano , m[carta]);
        });
        displayMano()
    });

}

// salva tutte le informazioni sul database
function updateDb(){
    
}


// mostra la mano per la prima volta al giocatore
function displayMano(){
    let c = document.querySelector(".giocatore");

    player.mano.forEach(carta => {
        let myImage = new Image(50, 75);
        myImage.src = "../immagini/PNG-cards-1.3/" + carta.src + ".png";
        myImage.id = carta.id;
        c.appendChild(myImage);
        //listener per poter scartare
        myImage.addEventListener("dragstart", drag);
    })
}

// imposta lo scarto come un nuovo array di carte
function setScarto(){
    let scarto = document.querySelector(".scarto");
    while (scarto.firstChild){
        scarto.removeChild(scarto.firstChild);
    }
    for(i = 0 ; i < mazzoScarto.length ; i++){
        let carta = new Image(50, 75);
        carta.src = "../immagini/PNG-cards-1.3/" + mazzoScarto[i].src + ".png";
        carta.id = mazzoScarto[i].id;
        scarto.appendChild(carta);
        carta.addEventListener("click" , ev =>{
            pescaScarto(ev.srcElement.id);
        })
    }
}

function pesca(carta){
    player.mano.push(carta);

    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/" + carta.src + ".png";
    myImage.id = carta.id;
    document.querySelector(".giocatore").appendChild(myImage);
    //listener per poter scartare
    myImage.addEventListener("dragstart", drag);
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
    //rimuove lo swap delle carte nello scarto
    carta.removeEventListener("dragstart" , drag , false);
    //listener per poter pescare
    carta.addEventListener("click" , ev =>{
        pescaScarto(ev.srcElement.id);
    })
    mazzoScarto.push(player.rimuoviCarta(data));
}

function drag(ev) {
    ev.dataTransfer.setData("carta", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}