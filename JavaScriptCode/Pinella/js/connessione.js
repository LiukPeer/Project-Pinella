// Import the functions you need from the SDKs you need

//per qualche motivo questo imprt da dei problemi
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
const app = firebase.initializeApp(firebaseConfig)
const allGamesRef = firebase.database().ref("games")
var gameId
var gameRef

//questa parte dovrà essere distribuita tra le varie classi
var playerId
var playerRef

var turno

// salva il gameId negli appunti
function copia(){
  document.getElementById("idStanza").select();
  document.execCommand("copy");
}

function createGame(){
  if(gameRef == undefined){
    let name = document.getElementById("nomeHost").value;
    // controlla se hai inserito il nome
    if(name == ""){
      return
    }
    gameRef = allGamesRef.push();
    // genera il campo turno
    gameRef.update({
      turno : 0
    })
    gameId = gameRef.key;
    document.getElementById("idStanza").value = gameId;
    allowDisconnection();
    newPlayer(name);
  }
}
function joinGame() {
  if(gameRef == undefined){
    let id = document.getElementById("gameId").value
    let name = document.getElementById("nomeConn").value;
  
    if(id == "" || name ==""){
      return
    }
    
    gameId = id
    gameRef = allGamesRef.child(gameId)
    allowDisconnection();
    newPlayer(name);
  }
}

//crea un nuovo nodo giocatore nel db
function newPlayer(name){
  playerRef = firebase.database().ref('games/' + gameId + "/players").push();
  playerRef.set({
    name: name
      //bisognerà inserire tutte le informmazioni del caso
  });
  playerId = playerRef.key;
}

//questa funzione serve per garantire la disconnessione dal database
// una volta che il giocatocatore si diconnette
function allowDisconnection(){
  if(gameRef != undefined){
    gameRef.onDisconnect().remove();
  }
}

// disconnette direttamente
function disconnect(){
  if(playerRef != undefined){
    playerRef.remove();
    resetId();
  }
}

function resetId(){
  document.getElementById("gameId").value = "";
  document.getElementById("idStanza").value = "";
  gameId = undefined;
  gameRef = undefined;
}


/*
(function () {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      //You're logged in!
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();
      playerNameInput.value = name;

      playerRef.set({
        id: playerId,
        name
      });

      //Remove me from Firebase when I diconnect
      playerRef.onDisconnect().remove();

      //Begin the game now that we are signed in
      initGame();
    } else {
      //You're logged out.
    }
  });
  firebase.auth().signInAnonymously().catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode, errorMessage);
  });

});
*/