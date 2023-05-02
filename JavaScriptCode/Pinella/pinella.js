function pesca(){
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
    var rNumber = Math.floor(Math.random() * 10) + 1;
    return rNumber
}

