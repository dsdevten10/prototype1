GIT 
## SIAMO NEL BRANCH 2 
BRANCH 2 CREAZIONE DEL DATABASE SU AZURE 


-------------------


## 1 preparazione ambiente 
# 1.1 creazione progetto typescript react tailwind 
npm create vite@latest prototype1 -- --template react-ts

# 1.2 install tailwind 
npm install tailwindcss@tailwind/vite 

>>

@import "tailwindcss" (importo direttamente nel file css e poi testo)

# 1.3 configurazione tailwind 
dentro vite.config.ts 

    tailwindcss(), 

---------

# 2 CREAZIONE COSMODB 
- uso ten10 perche  subscription e gratuita 

# partition key /title -- 
sto partizionando i dati in base al /title 
anziche usare id perche Piotr vuole il title come punto di riferimento essenziale 


# 3 creazione blob storage e caricamento dell immagine 
- creazioen Storage Account 
- Creazione container 
- upload file all interno del container 
- recupero url direttametne dall immagine 
- Creazione del file json per Cosmo DB 

Tabella non popolata perche non e stata configurata la funzione per OCR
File possono essere letti direttamente dal frontend tramite il blob URL



# 4 rendering del file JSON to react APP -----------
- molto importnate prendere le chiavi di accesso Keys 
- creare un file .env che mi permette di salvare tutti i dati che mi fanno fare la connessione al database 

- installo i pacchetti azure > che mi permettono di creare una connessione tra il mio fronend e il server azure dove si trova il mio database 

# cosmoDBConfiguration 
- prendo le variabili .env che mi permettono di creare l indirizzo endpoint
- creare la chiave di accesso al database 
- creo l oggetto che vera inviato tramite il mezzo al server azure 
- questo oggetto accede al database chiamato x
- esporto 

## pacchetto che mi ha permesso di fare il rendering del pdf in react 
- pagina github che spiega il tutto 
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";



## next?? >> 5. requirements piotr + lessons for the students + Jira + Math + 
- remember for the next feature to change branch 
- need to learn github 


## 5 - 6  rendering + title come chiave primaria 
## REQUIREMENT changed search title anziche Id 
- usato query SQL 
- non avrebbe senso cambiare ID in azure perche dovresti cambiare tutti i documenti , rischi errori 
- perche ho usato la forma piu complessa con parametri? per non rischiare sql injections


## 6 
- creato 3 file JSON diversi all interno del container , file v1 , v2, v3 tutti con id differenti ma title1 identico 
## error importante che ho risolto 
## UNIQUE KEY = NO add /title >> lascia libera 
- non mi permetteva di creare un new item , new foglio JSON all interno del container perche avevo settato il container con UNIQUE KEY  title 
- ogni oggetto doveva avere un title unico , ma poi che tutti avevano lo stesso title1 non mi permetteva di aggiungere 


## fetching the last version only 
1. molto importante la soluzione all errore che non mi permetteva di creare altri JSON all interno dello stesso contenitore UNIQUE KEY vuota 
2. frontend logic - react controller api fetching the full project 
3. .sort() ho creato una logica che mi ha permesso di metter i file nella versione corretta. 
# conclusion: filtered data by title and by version >> rendering only the last pdf uploaded 
- MCV model controller view , dove il model sarebbe il contenirore delle variabili 

## ERRORS SOLVED -----------------------------
## A. Fix CORS PDF
- PDF blocked by CORS, PNG worked. - Blob container didn’t allow cross-origin access.
>>>Solution: make PDF public and set CORS.
- CORS settings: Allowed Origins http://localhost:5173, Methods GET, Headers *, Exposed Headers *, Max Age 3600.


## COSE IMPORTANTI DA SAPERE 
id non si puo eliminare e obbligatoria 


-----------------------------------------------

prototype n2 
evoluzione in base a quello che vuole Piotr

adesso quello che voglio fare semplicemente e pushare dal mio local direttamente a origin remote della repository creata dall altro mio github account 

