# Project-Pinella
![7b6b3636ffb810078b85a9ec0d3625a1](https://user-images.githubusercontent.com/129169764/229159876-e2135bfb-e803-4438-ae75-4d238b9dd81f.jpg)
## Pinella

### Numero di giocatori: 
Da 2 a 4 giocatori
- Si chiede a inizio partita quanti giocatori sono. Se sono 2 o 3 si gioca individualmente, se 4 invece si creano 2 squadre da 2 giocatori
### Mazzo di gioco:
Abbiamo 4 semi diversi (Cuori, fiori, picche, quadri), ogni seme ha 12 carte diverse (A,3,4,5,6,7,8,9,10,J,Q,K), in più abbiamo due jolly e due 2 neri (ci sono solo i due di fiori e di picche). Si gioca con due mazzetti (`numeroMazzi`=2). Ci sono quindi in tutto 52*2= 104 carte.
- E' stato creato un generatore imlicito `DynamiStack(String gioco)` per fare dei mazzi generici che poi possiamo usare per altri giochi oltre a pinella. Se il gioco selezionato è `'pinella'` non vengono creati i 2 di cuori e picche.
### Distribuzione carte a inizio partita (turno 1): 
1. Ad ogni giocatore si danno 13 carte casuali prese dal mazzo;
   - Si usa il metodo Math.random per prendere le carte dal mazzo. Quando una carta viene scelta la si rimuove con DynamicStack.pop(int n) per ottenere la carta in posizione n ed eliminarla dal mazzo.
2. Si mette una carta nello spazio delle carte scartate;
   - `CarteScartate` sarà un DynamicStack da cui si portanno aggiungere e prendere un range di elementi.
### Regole:
* Ad ogni inizio turno ogni G deve pescare una carta o dal mazzo o dalle carte scartate 
* Se si pesca da `CarteScartate` si possono prendere un numero  di carte appartenente al range[1:CarteScartate.length-1], si è obbligati a mettere nel proprio campo a terra la carta pescata più in basso, le altre carte vanno tenute in mano o giocate (essendo DynamicStack l’ordine delle carte in `CarteScartate` parte dalla prima carta scartata all’ultima carta scartata (top);

* Ad ogni fine turno ogni G deve scartare una carta (andrà inserita a `CarteScartate`). Si consiglia di non scartare carte che servono agli avversari, quindi che non  attacchino alle scale presenti in campo degli avversari. 
Oppure bisogna evitare di scartare carte che potrebbero aiutare il giocatore stesso a fare una lunga o comunque più scale(più punti), bisogna cercare di sabotare gli avversari il più possibile con le carte che si hanno a disposizione.

### Possibili combinazioni delle scale:
+ Devono essere di minimo 3 carte;
  - `if (lunghezza<3)
        return false`
+ Ogni scala ha un proprio seme, non si possono combinare semi diversi;
  - `if (!Carta.getSeme().equals(AltraCarta.getSeme())
        return false`
+ l'ordine da seguire nelle scale è : A->3->4->5->6->7->8->9->10->J->Q->K->A (tra A e il 3 non c’è il 2);
+ Le pinelle e i jolly vengono usati per formare le scale come sostituti di una carta mancate;
  - `if (NodeC.getNext().getCard().getValore()==(NodeC.getCard().getValore()+1||2||0))
        return true`
+ le pinelle possono essere sostituite con la reale carta, ma a differenza dei jolly possono essere poi spostate solo lungo la scala in cui erano state inserite inizialmente;
* Ogni giocatore può prendere il jolly di chiunque altro, solo se ha la carte che lo sostituirebbe;
  - `if (NodeC.getNext().getCard().getValore()-1==(Carta.getValore()))
     ...
        return true`

* in ogni scala si possono solo aggiungere carte (oltre ai jolly eventualmente spostati);
### Condizioni di vittoria
* fare una scala di minimo 6 carte di fila(“lunga”) senza jolly e pinelle in mezzo;
* Terminare le carte in mano

la partita termina anche quando il mazzo ha zero carte. 
In quel caso a fine partita si contano i punti in base alle scale

### Punti finali partita:
Il giocatore che vince prende di bonus 100 punti al quale poi verranno sommati gli altri punti ;
Ogni carta della lunga ha il doppio punteggio del valore della carta in sè;
Punteggio carte: A=15, 3/4/5/6=5, 7/8/9/10/J/Q/K=10, JR/JB=25, 2f/2p=20.
se si fa un scala con tutte le carte possibili da A ad A dopo il K, senza jolly e pinelle in mezzo(“lunghissima”) si vince tutta la partitona, si fanno 1500 punti;
i giocatori che perdono devono contare anche il punteggio delle carte che hanno in mano e sottrarlo dal punteggio ottenuto dalle carte presenti nel proprio campo.

### Insieme delle partite;
il partitone finisce quando uno dei giocatori raggiunge un punteggio >=1500 punti. Il giocatore che raggiunge questo punteggio è definito il vincitore.

se ci sono 2 o 3 giocatori ognuno giocherà individualmente e avrà le proprie scale;

se ci sono 4 giocatori avremo due squadre (Squadra1 e  Squadra2) separate ciascuna con  due giocatori, le due squadre devono essere diverse  (combinazioni possibili di squadre 6); ci saranno due campi di gioco, uno per ciascuna squadra  (campoS1 e campoS2) e poi un mazzo e un CarteScartatePescate.

