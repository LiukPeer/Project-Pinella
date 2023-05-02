<<<<<<< HEAD
function draw(){
    var carta = new carte(randomNumber(),randomElement(),5);
    const myImage = new Image(50, 75);
    myImage.src = "../immagini/playingCards/PNG-cards-1.3/"+carta.src+".png";
    const grid = document.querySelector(".Mazzo");
    grid.appendChild(myImage);
}
function randomElement(){
    const seed= ["clubs","diamonds","hearts","spades"]
    var randomsElement = Math.floor(Math.random()*seed.length)
    var index = seed[randomsElement]
    return index
}
function randomNumber(){
    var rNumber = Math.floor(Math.random() * 13) + 1;
    return rNumber
=======

const semi = ["clubs" , "diamonds" , "hearts" , "spades"]
//const valori = ["ace" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "jack" , "queen" , "king"]

var mazzo = []

function setupMazzo(){
    for(j = 0 ; j < semi.length ; j++){
        for(i = 1 ; i <= 13 ; i++){
            mazzo.push(new carte(i , semi[j]))
        }
    }
    shuffleMazzo()
>>>>>>> 14d8447529bf600e5603dca4474d9caf149d81e3
}

function shuffleMazzo() {
    for (var i = mazzo.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = mazzo[i];
        mazzo[i] = mazzo[j];
        mazzo[j] = temp;
    }
}

function pesca(){
    if(mazzo.length > 0){
        let carta = mazzo.pop();
        const myImage = new Image(100, 200);
        myImage.src = "../immagini/playingCards/PNG-cards-1.3/"+carta.src+".png";
        const grid = document.querySelector(".mazzo");
        grid.appendChild(myImage);
    }
}
