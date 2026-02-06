// SET UP CONNESSIONE 
// MODEL IL DATO STRUTTURA DATI E (COMUNICAZIONE CON DATABASE)
// IN QUESTO CASO (ACCESSO AL DATO ) mentre types.ts sara la definizione dei dati 

import { Container, CosmosClient } from "@azure/cosmos";

//import delle variabili .env Vite/React usa importn.meta.env anziche process.env come avviene nel backend quando creo un file server express per esempio 


const endpoint = import.meta.env.VITE_APP_COSMOSDB_URI; 
const key = import.meta.env.VITE_APP_COSMOSDB_KEY; 
const databaseId = import.meta.env.VITE_APP_COSMOSDB_DB; 
const containerId = import.meta.env.VITE_APP_COSMOSDB_DOCUMENTS_CONTAINER; 

// crea il client Cosmos DB 
const client = new CosmosClient({endpoint, key})

//Funzione per recuperare il container 
export const getContainer = async () : Promise<Container> => {
    const {database} = await client.databases.createIfNotExists({id: databaseId}); 
    const {container} = await database.containers.createIfNotExists({id: containerId}); 
    // console.log('stampa container', container)
    return container; 
}

// funzione per creare un ITEM 
// se in futuro cambio il database cambio solo il service 
export const createItem = async (item: FormData & { id: string }) => {
    const container = await getContainer(); 
    const {resource} = await container.items.create(item); 
    return resource; 
}

export default client; 

/**
 * Funzione UPSERT: Il cuore della migrazione.
 * Se l'ID esiste già nel container, sovrascrive l'intero documento.
 * Se l'ID non esiste, lo crea da zero.
 */

export const upsertItem = async (newItem: any) => {
    const container = await getContainer();
    // Eseguiamo l'operazione atomica su Cosmos DB
    const { resource } = await container.items.upsert(newItem);
    return resource;
    };