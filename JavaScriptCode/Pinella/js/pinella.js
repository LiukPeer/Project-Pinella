
let mazzoPinella = [];

function setupMazzo(){
    mazzoPinella = new deck().getMazzo()
}

function pesca(){
    if(mazzoPinella.length > 0){
        let carta = mazzoPinella.pop();
        const myImage = new Image(50, 75);
        myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
        const grid = document.querySelector(".mazzoPinella");
        grid.appendChild(myImage);
    }
}
