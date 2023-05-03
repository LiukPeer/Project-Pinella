
let mazzoPinella = [];
let giocatori =[]

const nCarte = 13

function distribuisci(){
    let i = 0
    for(let i = 0; i < nCarte * giocatori.length; i++){
        giocatori[i].mano.push(mazzoPinella.pop())
        i = ++i % giocatori.length
    }

}

function setupMazzo(){
    mazzoPinella = new deck().getMazzo()
}

function pesca(){
    
    let carta = mazzoPinella.pop();
   
    const myImage = new Image(50, 75);
    myImage.src = "../immagini/PNG-cards-1.3/"+carta.src+".png";
    if(mazzoPinella.length < 13){
        const grid = document.querySelector(".scarto");
        grid.appendChild(myImage);
        
    }else{
        const scarto = document.querySelector(".mazzoPinella");
        scarto.appendChild(myImage);
    }
    console.log(mazzoPinella.length)
}
