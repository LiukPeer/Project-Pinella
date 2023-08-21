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

// numero massimo di giocatori nella stanza
var numberOfPlayers = 2

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
            maxNumberOfPlayers: numberOfPlayers,
            playersConnected: 0
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

        // controlla che esista la stanza
        allGamesRef.once("value").then((snapshot) => {
            let flag = false
            if(snapshot.exists()){
                Object.keys(snapshot.val()).forEach((i) => {
                    flag = flag || i == id
                })
            }
            if(!flag){
                alert("Non esiste una stanza con questo id")
                gameRef = undefined
            }else{
                newPlayer(name , false)
            }
        })
    }
}

//crea un nuovo nodo giocatore nel db
function newPlayer(nome , isHost) {
    // controllo se posso connettermi
    gameRef.once("value").then((snapshot) => {
        let connected = snapshot.val().playersConnected
        if(connected >= snapshot.val().maxNumberOfPlayers){
            alert("Impossibile connettersi, la stanza è già piena")
            return
        }

        allowDisconnection();
        playerRef = firebase.database().ref('games/' + gameId + "/players").push();
        playerRef.set({
            id: playerRef.key,
            nome: nome,
            isHost: isHost,
            mano:{}
            //bisognerà inserire tutte le informazioni del caso
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

        document.querySelectorAll(".inizio").forEach(i => i.style.visibility = "visible")

        connected ++
        gameRef.update({
            playersConnected: connected
        })
        
        //inizia la partita automaticamente quando tutti i giocatori sono connessi
        gameRef.on("value" , (snapshot)=>{
            if(snapshot.val().maxNumberOfPlayers == snapshot.val().playersConnected){
                disableDisconnection();
                window.location = "Home.html"
            }
        })
    })
}

//questa funzione serve per garantire la disconnessione dal database
// una volta che il giocatore si disconnette

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