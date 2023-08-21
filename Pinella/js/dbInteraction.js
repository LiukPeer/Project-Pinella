let mazzoScarto = [];

//inizializza il database
firebase.initializeApp(JSON.parse(sessionStorage.getItem("dbConfig")));

const gameId = sessionStorage.getItem("sessionId");
const gameRef = firebase.database().ref("games/" + gameId);

const allPlayersRef = firebase.database().ref("games/" + gameId + "/players");

const mazzoRef = firebase.database().ref('games/' + gameId + "/mazzo");
const scartoRef = firebase.database().ref('games/' + gameId + "/scarto");


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
                initDb(regole);
            }
            // quando i dati vengono caricati sul db viene aggiornato il client
            updateClientAux()

        // se non trova un collegamento
        }else{
            alert("Ti sei disconnesso dalla partita")
            window.location = "Users.html"
        }
    }).catch((error) => {
        console.error(error);
    });
}

// setta il database IMPORTANTE CHIAMARE SOLO UNA VOLTA
function initDb(gioco){
    // crea il mazzo
    let mazzo = new deck(gioco.maxVal, gioco.jolly, gioco.nMazzi, gioco.boolPinella).getMazzo(); 

    // distribuisce le carte
    allPlayersRef.once("value").then((snapshot) => {
        let players = snapshot.val();

        for (let i = 0; i < gioco.nCarte; i++) {
            Object.keys(players).forEach((key) => {
                //deve aggiungere una carta a ciascun giocatore
                let tmpManoRef = firebase.database().ref("games/" + gameId + "/players/" + players[key].id + "/mano");
                pushCard(tmpManoRef , mazzo.pop());
            });
        }

        if(gioco.siScarta){
            // scarta la prima carta del mazzo
            pushCard(scartoRef , mazzo.pop())
        }else{
            disableScarto()
        }
    }).then(() => {
        // inserisce il mazzo all'interno del database
        mazzo.forEach(carta => {
            pushCard(mazzoRef , carta);
        })
    }).then(() => {
        // imposta il turno a 0
        gameRef.update({
            turno: 0,
            updated: true
        })
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
    insieme.push(newCard(carta))
}

function newCard(carta){
    if(carta.isJoker){
        return new joker(carta.src , carta.isREALLYJoker , carta.id)
    }else{
        return new carte(carta.numero , carta.seme , carta.id)
    }
}

// preleva tutte le informazioni dal database
function updateClientAux(){
    gameRef.on("value" , (snapshot) => {
        if(snapshot.val().updated){
            updateClient()
        }
    })
}
function updateClient(){
    //aggiorna lo scarto
    scartoRef.once("value").then((snapshot) => {
        if(snapshot.exists()){
            mazzoScarto = [];
            let m = snapshot.val();
            Object.keys(m).forEach(carta => {
                getCard(mazzoScarto , m[carta]);
            });
            setScarto();
        }
    });

    // aggiorna la mano
    manoRef.once("value").then((snapshot) => {
        if(snapshot.exists()){
            player.mano = [];
            let m = snapshot.val();
            Object.keys(m).forEach(carta => {
                getCard(player.mano , m[carta]);
            });
            displayMano()
        }
    });

}

// salva tutte le informazioni sul database
function updateDb(){
    //salva lo scarto 
    scartoRef.remove().then(() => {
        mazzoScarto.forEach(e => {
            pushCard(scartoRef , e)
        })
    }).then(() => {
        //salva la mano attuale
        manoRef.remove().then(() => {
            player.mano.forEach(e => {
                pushCard(manoRef , e)
            })
        }).then(() => {
            gameRef.update({
                updated: true
            })
        })
    })
}

/**
 * Funzione che fa terminare il turno. NON USARE se non sai cosa stai facendo
 * @returns una promise che viene completata al termine dell'esecuzione della funzione
 */
function next(){
    return gameRef.update({
        updated: false
    }).then(() => {
        gameRef.once("value").then((snapshot)=>{
            gameRef.update({
                turno: snapshot.val().turno + 1
            })
        }).then(() => {
            updateDb()
        })
    })

}