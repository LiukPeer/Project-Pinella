var scartato = false
var pescato = false
var siPuòScartare = true

/**
 * Funzione che resetta tutte le mosse fatte dopo aver pescato
 */
function reset(){
    if(confirm("Sei sicuro di voler ritornare nella posizione subito dopo aver pescato?")){
        scartato = false
        updateClient()
    }
}

/**
 * Funzione che fa terminare il turno(non confondere con next())
 */
function fineTurno(){
    if(!pescato){
        alert("Devi pescare una carta dal mazzo o dallo scarto!")
        return
    }
    if(siPuòScartare && !scartato){
        alert("Devi scartare una carta!")
        return
    }
    next().then(() => {
        pescato = false
        scartato = false
    })
}

/**
 * funzione che gestisce la pesca dallo scarto
 * @param {*} id della carta pescata(vengono pescate anche tutte le carte successive)
 * @returns 
 */
function pescaScarto(id) {
    if(pescato){
        alert("Hai già pescato")
        return
    }
    if(!siPuòScartare){
        return
    }
    let flag = false;
    // qui le carte vengono pescate dalla cima dello scarto
    for(let i = mazzoScarto.length-1 ; i >= 0 && !flag; i--){
        flag = flag || mazzoScarto[i].id == id
        document.querySelector(".scarto").removeChild(document.getElementById(mazzoScarto[i].id))
        pesca(mazzoScarto.pop());
    }
    gameRef.update({
        updated: false
    }).then(() => updateDb())
}

/**
 * Funzione che gestisce la pesca dal mazzo(nota che la carta pescata proviene direttamente dal database)
 * @returns 
 */
function pescaMazzo() {
    if(pescato){
        alert("Hai già pescato")
        return
    }
    gameRef.update({
        updated: false
    }).then(() => {
        mazzoRef.once("value").then((snapshot) => {
            pesca(newCard(snapshot.val()[Object.keys(snapshot.val()).pop()]))
            mazzoRef.child(Object.keys(snapshot.val()).pop()).remove().catch(() => {
                console.log("Errore nella rimozione della carta dal mazzo")
            })
        })
    }).then(() => updateDb())
}

/**
 * Funzione generica che gestisce la pesca
 * @param {*} carta di tipo carta o joker
 */
function pesca(carta){
    player.mano.push(carta)
    displayCarta(carta , document.querySelector(".giocatore"))
    pescato = true
}

/**
 * funzione che mostra la mano al giocatore
 */ 
function displayMano(){
    let c = document.querySelector(".giocatore")
    while (c.firstChild){
        c.removeChild(c.firstChild)
    }
    player.mano.forEach(carta => {
        displayCarta(carta , c)
    })
}

/**
 * Funzione che inserisce la singola carta all'interno di un contenitore
 * @param {*} carta di tipo carta o joker
 * @param {*} contenitore div che contiene le carte da inserire
 */
function displayCarta(carta , contenitore){
    let myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/" + carta.src + ".png";
    myImage.id = carta.id;
    contenitore.appendChild(myImage);
    //listener per poter scartare
    myImage.addEventListener("dragstart", drag);
}

/**
 * TODO: Questa funzione disabilita lo scarto
 */
function disableScarto(){
    siPuòScartare = false
}

/** imposta lo scarto come un nuovo array di carte
 * @returns 
 */
function setScarto(){
    if(!siPuòScartare){
        return
    }
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

/**
 * gestisce lo scarto(non chiamare)
 * @param {*} ev evento generato dal trascinare la carta
 * @returns 
 */
function scarto(ev) {
    if(!siPuòScartare || scartato){
        return
    }
    if(!pescato){
        alert("Devi pescare prima!")
        return
    }
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
    scartato = true;
}

/**non toccare
 * @param {*} ev 
 */
function drag(ev) {
    ev.dataTransfer.setData("carta", ev.target.id);
}

/**non toccare
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}