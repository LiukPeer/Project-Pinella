# Project-Pinella
## Pinella

### Numero di giocatori: 
Da 2 a 4 giocatori
### Mazzo di gioco:
Abbiamo 4 semi diversi (Cuori, fiori, picche, quadri), ogni seme ha 12 carte diverse (A,3,4,5,6,7,8,9,10,J,Q,K), in più abbiamo due jolly e due 2 neri (ci sono solo i due di fiori e di picche). Si gioca con due mazzetti (`numeroMazzi`=2). Ci sono quindi in tutto 52*2= 104 carte.
### Distribuzione carte a inizio partita (turno 1): 
1. Ad ogni giocatore si danno 13 carte casuali prese dal mazzo;
2. Si mette una carta nello spazio carte scartate;
### Regole:
* Ad ogni inizio turno ogni G deve pescare una carta o dal mazzo o dalle carte scartate 
* Se si pesca da `CarteScartate` si possono prendere un numero  di carte appartenente al range[1:CarteScartate.length-1], si è obbligati a mettere nel proprio campo a terra(“campoGn°”) la prima carta pescata da questo mazzo,le altre carte posizionate dopo questa possono essere tenute in mano (l’ordine delle carte in CarteScartatePescare parte dalla prima carta scartata all’ultima carta scartata );

* Ad ogni fine turno ogni G deve scartare una carta (andrà inserita a CarteScartate).Lo scarto della carta deve avvenire con un senso logico scelto dal determinato giocatore,si consiglia di non scartare carte che servono agli avversari,quindi che non  attacchino alle scale presenti in campo  degli avversari oppure bisogna evitare di scartare carte che potrebbero aiutare il giocatore stesso a fare una lunga o comunque più scale(più punti), bisogna cercare di sabotare gli avversari il più possibile con le carte che si hanno a disposizione.

ogni volta che viene presa una carta dal mazzo, questa carta scompare dal mazzo e va in mano ad un giocatore oppure a “CarteScartatePescare”.

### Possibili combinazioni delle scale:
+ Devono avere minimo 3 carte ciascuna;
+ Ogni scala ha un proprio seme, semi di diverso tipo non si possono combinare;
+ le scale si fanno nel seguente ordine : A->3->4->5->6->7->8->9->10->J->Q->K->A (tra A e il 3 non c’è il 2);
+ I 2 di Picche e Fiori si chiamano pinelle e hanno lo stesso ruolo dei jolly, l’unica differenza è che le pinelle non possono essere prese dagli avversari mentre i jolly si.
+ Le pinelle e i jolly vengono usati per formare le scale come sostituti di una carta mancate;
* Ogni giocatore può prendere il jolly di chiunque altro, solo se ha la carte reale che lo sostituirebbe;
* in ogni scala si possono aggiungere solo nuove carte(oltre ai jolly eventualmente spostati);
+ le pinelle possono essere sostituite con la reale carta, ma a differenza dei jolly possono essere poi spostate solo lungo la scala in cui erano state inserite inizialmente;
### Condizioni di vittoria
* fare una scala di minimo 6 carte di fila(“lunga”) senza jolly e pinelle in mezzo;
* Terminare le carte in mano

la partita termina anche quando il mazzo ha zero carte. 
In quel caso a fine partita si contano i punti in base alle scale

punti finali partita:
il giocatore che vince prende di partenza (bonus)100 punti al quale poi verranno sommati gli altri punti ;
ogni carta della lunga ha il doppio punteggio del valore della carta in sè;
punteggio carte: A=15, 3/4/5/6=5, 7/8/9/10/J/Q/K=10, JR/JB=25, 2f/2p=20.
se si fa un scala con tutte le carte possibili da A ad A dopo il k, senza jolly e pinelle in mezzo(“lunghissima”) si vince tutta la partitona, si fanno 1500 punti;
i giocatori che perdono devono contare anche il punteggio delle carte che hanno in mano e sottrarlo dal punteggio ottenuto dalle carte presenti nel proprio campo.
partitona:
insieme delle partite;
il partitone finisce quando uno dei giocatori raggiunge un punteggio >=1500 punti. Il giocatore che raggiunge questo punteggio è definito il vincitore.
n. giocatori:
se ci sono 2 giocatori avremo G1 che gioca contro G2 e viceversa, un campoG1 e un campoG2 cioè campo di gioco del giocatore rispettivamente 1 e 2 , un mazzo e un CarteScartatePescate;
se ci sono 3 giocatori avremo G1, G2 e G3, ognuno giocherà contro ciascuno degli altri, ci saranno campoG1,campoG2, campoG3, un mazzo e un CarteScartatePescate;
se ci sono 4 giocatori avremo due squadre (Squadra1 e  Squadra2) separate ciascuna con  due giocatori,le due squadre devono essere diverse  (combinazioni possibili di squadre 6); ci saranno due campi di gioco,uno per ciascuna squadra  (campoS1 e campoS2) e poi un mazzo e un CarteScartatePescate.

