GIT 
## SIAMO NEL BRANCH 3 feture3-experiments 
perfetto ora ho pullato e posso finalmente lavorare su questo 


## done
BRANCH 2 CREAZIONE DEL DATABASE SU AZURE 
git clone to my other github account 

## to do next ?? 



-----------------------------------------------------------------------------------------------

# interessante 
- div all itnerno di jsx puo essere scritto anche solo con <div className="classecss"/>

## ERRORS SOLVED 
## cose importanti da sapere 
## TO DO IN THE future 
- in questo computer voglio creare uno snipped rfc che mi permette di creare in automatico un components react 
-----------------------------------------------------------------------------------------------------------------------------


## START

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

## prototype n2  ==================================================================================================================
DA QUA VOGLIO REALMENTE METTERE MANO ALL APP PERO PRIMA DEVO COMPLETARE QUELLO RICHIESTO DA PIOTR
evoluzione in base a quello che vuole Piotr

adesso quello che voglio fare semplicemente e pushare dal mio local direttamente a origin remote della repository creata dall altro mio github account 

alla fine ho creato un nuovo git branch feature3-experiments 
- so from now I am working on it here 


## =============================================================================================================================
monday 2 Feb 
a. creo un file json  Master hardcoded , title come collante , array files 
b. Modifico il controller backend apiClient.ts , in verita ho modificato il (Box.ts)
>> il componente mostra i dati generali solo una volta e si concentra sull ultimo caricato 

c. creare una logica di upload 
che mi permette una volta fatto l upload di caricare il pdf direttamente nel blob storage 
voglio ricreare perfettamente 
se avviene upload in base al titolo e lo stesso voglio fareun update nel file esistente 


1. react router dom : mi permette di creare delle routes ogni pagina relativa ad un particolare address url path 
2. npm install lucide-react: icons took from a library 
## error solved cors 
3. blobcontainerimage: allowed methods not only GET but also POST etc

## =====================================================================================
## created git branch feature4-upload-pdf
- importante e lo url del blob storage 
## obbiettivo 

sto lavorando nel branch nuovo , ovviamente quello che voglio creare lo creo in base all 
EPIC 
features 
User stories 
Task 

ho creare una struttura su note che mi permette di lavorare in maniera piu veloce e autonoma da domani in poi perche essenzialmente quello che stavo facendo era ogni giorno perdere tempo in questa maniera , e non me lo posso assolutamente permettere , prima di chiedere ferie voglio assolutmanet riuscire a 
1. CREARE LA REQUIREMENT CHE MI HA CHIESTO PIOTR 
2. CREARE L APP 
3. Creiamo il form >> prima i tipi poi il form che tipo di dato e perche? 
- types.ts , useState<FormData> ("") vuoto per tutti i campi , handleChange , e.preventDefault() , dinamicamente gli input Object.keys(formData.document), Tailwind , JSX in sezioni , testing in console 
## As Dev I want to... connect form to the database cosmoDB sending and storing all the metadata 

SICUREZZA INVIO DATI 
a. usiamo serverless function .env non vogliamo una fuga di dati 
b. aggiungiamo su Form Submission un aggiunta di optional validatio 

## as dev I want to ... send pdf to blob storage ... creating url ... receiving back the url .... 
... then pass the url to the form ... send metada + pdf url into the cosmoDB to create the file 
a. moved the uploadPDF.tsx from home to Submission father data page
b. passo tramite props da uploadpdf salta al padre SubmissionData page che contiener component UploadPdf e SubmissionForm , e passo tramite props pdf e name a submissionFormDatacomponetn 

## ERROR SOLVED 
- non mi permetteva di creare item >> soluzione perche i SAS token erano scaduti >> ho riaggiornato i SAS del blob storage per dare la possibilita di accedere nuovamente al blob storage dall esterno 


## da dire a piotr ==========================
- credo che sia fondamentale avere l accesso al cosmoDB , questo perche quasi tutti gli errori e le soluzioni che ho trovato sono state determinate dalla soluzione direttamete dal lato serverless di azure 

Hai separato le responsabilità: un componente carica, il genitore coordina, e il form salva. Il risultato è un database coerente dove ogni documento ha il suo link associato.

## =====================================================================================================================

