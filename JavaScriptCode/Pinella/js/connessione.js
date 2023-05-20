//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0yydIbrnNTnnmGiyszOf6Ti5twzIlCn8",
    authDomain: "multigiocatore-3048c.firebaseapp.com",
    databaseURL: "https://multigiocatore-3048c-default-rtdb.firebaseio.com",
    projectId: "multigiocatore-3048c",
    storageBucket: "multigiocatore-3048c.appspot.com",
    messagingSenderId: "619188906345",
    appId: "1:619188906345:web:24efda487a29aa799375f8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const allGamesRef = firebase.database().ref("games")
var gameId
var gameRef

var playerId
var playerRef

// salva il gameId negli appunti
function copia() {
    document.getElementById("idStanza").select();
    document.execCommand("copy");
}

function createGame() {
    if (gameRef == undefined) {
        let name = document.getElementById("nomeHost").value;
        // controlla se hai inserito il nome
        if (name == "") {
            return
        }
        gameRef = allGamesRef.push();
        // genera il campo turno
        gameRef.update({
            turno: 0
        })
        gameId = gameRef.key;
        document.getElementById("idStanza").value = gameId;
        newPlayer(name , true);
    }
}

function joinGame() {
    if (gameRef == undefined) {
        let id = document.getElementById("gameId").value
        let name = document.getElementById("nomeConn").value;

        if (id == "" || name == "") {
            return
        }

        gameId = id
        gameRef = allGamesRef.child(gameId)
        newPlayer(name , false);
    }
}

//crea un nuovo nodo giocatore nel db
function newPlayer(nome , isHost) {
    allowDisconnection();
    playerRef = firebase.database().ref('games/' + gameId + "/players").push();
    playerRef.set({
        id: playerRef.key,
        nome: nome,
        isHost: isHost,
        mano:{}
        //bisognerà inserire tutte le informmazioni del caso
    });
    playerId = playerRef.key;

    let player = {
        id : playerId,
        nome : nome,
    }

    // salva queste variabili nella memoria della sessione
    sessionStorage.setItem("giocatore" , JSON.stringify(player));
    sessionStorage.setItem("sessionId" , gameId);
    sessionStorage.setItem("dbConfig" , JSON.stringify(firebaseConfig));
}

//questa funzione serve per garantire la disconnessione dal database
// una volta che il giocatocatore si diconnette

function allowDisconnection() {
    if (gameRef != undefined) {
        gameRef.onDisconnect().remove();
    }
}

// questo permette di cambiare pagina senza disconnettersi dal database
function disableDisconnection(){
    if (gameRef != undefined) {
        gameRef.onDisconnect().cancel();
    }
}

// disconnette direttamente
function disconnect() {
    if (playerRef != undefined) {
        playerRef.remove();
        resetId();
    }
}

function resetId() {
    document.getElementById("gameId").value = "";
    document.getElementById("idStanza").value = "";
    gameId = undefined;
    gameRef = undefined;
}