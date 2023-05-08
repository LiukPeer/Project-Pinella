// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
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
const gamesRef = firebase.database().ref("games")


//var gameId = createGame("prova")
//var currentGame = gamesRef.child(gameId)
//games sarà il nodo presente nel database

//
//currentGame.onDisconnect().remove();



function createGame(){
  let player1 = document.getElementById("nome").value;
  let newGameRef = gamesRef.push();
  newGameRef.set({
    nome: player1
    //bisognerà inserire tutte le informmazioni dei mazzi
  });
  document.getElementById("idStanza").value = newGameRef.key;
  return newGameRef.key;
}

function joinGame(gameId, player2) {
  let newGameRef = gamesRef.child(gameId);
  newGameRef.update({
    player2: player2
  });
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