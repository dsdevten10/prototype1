// SET UP CONNESSIONE 

import { CosmosClient } from "@azure/cosmos";

//import delle variabili .env Vite/React usa importn.meta.env anziche process.env come avviene nel backend quando creo un file server express per esempio 


const endpoint = import.meta.env.VITE_APP_COSMOSDB_URI; 
const key = import.meta.env.VITE_APP_COSMOSDB_KEY; 
const databaseId = import.meta.env.VITE_APP_COSMOSDB_DB; 
const containerId = import.meta.env.VITE_APP_COSMOSDB_DOCUMENTS_CONTAINER; 

// crea il client Cosmos DB 
const client = new CosmosClient({endpoint, key})

//Funzione per recuperare il container 
export const getContainer = async () => {
    const {database} = await client.databases.createIfNotExists({id: databaseId}); 
    const {container} = await database.containers.createIfNotExists({id: containerId}); 
    // console.log('stampa container', container)
    return container; 
}

export default client; 


// dentro il container troviamo una serie di cose 
// 