var cardnames = [
    "A Picche", "2 Picche", "3 Picche", "4 Picche", "5 Picche", "6 Picche", "7 Picche", "8 Picche", "9 Picche", "10 Picche", "J Picche", "Q Picche", "K Picche",
    "A Cuori", "2 Cuori", "3 Cuori", "4 Cuori", "5 Cuori", "6 Cuori", "7 Cuori", "8 Cuori", "9 Cuori", "10 Cuori", "J Cuori", "Q Cuori", "K Cuori",
    "A Quadri", "2 Quadri", "3 Quadri", "4 Quadri", "5 Quadri", "6 Quadri", "7 Quadri", "8 Quadri", "9 Quadri", "10 Quadri", "J Quadri", "Q Quadri", "K Quadri",
    "A Fiori", "2 Fiori", "3 Fiori", "4 Fiori", "5 Fiori", "6 Fiori", "7 Fiori", "8 Fiori", "9 Fiori", "10 Fiori", "J Fiori", "Q Fiori", "K Fiori",
];




function pesca(){
    var carta = new carte(1,"clubs",5)
    console.log(carta.src)
    const myImage = new Image(100, 200);
    myImage.src = "../immagini/playingCards/PNG-cards-1.3/"+carta.src+".png";
    var newcard = '<img src="../immagini/playingCards/PNG-cards-1.3/'+carta.src+'.png">';
    const grid = document.querySelector(".griglia");
   grid.appendChild(myImage);
}