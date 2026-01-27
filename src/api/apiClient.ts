// FUNZIONI FETCHE GENERICHE DAL SERVER AZURE

import { getContainer } from "../utils/cosmoDBConfiguration";

// fetch tutti gli items dentro il DB dentro il container
// in questo caso items by ID

// 1 FETCHING ALL DOCUMENTS 
export const fetchDocuments = async () => {
  const container = await getContainer();
  const { resources: items } = await container.items.readAll().fetchAll();
 // console.log(items);
  return items;
};

//esempio fetcho solo un item per ID
export const fetchDocumentById = async (id: string) => {
  const container = await getContainer();
  const { resource } = await container.item(id).read();
  return resource;
};

// fetcho tramite title e non tramite ID
// utilizzo query con parametri per avere piu sicurezza e non rischiare delle sql injections
export const fetchDocumentByTitle = async (title: string) => {
  const container = await getContainer();

  const querySpec = {
    query: "SELECT * FROM c WHERE c.title = @title",
    parameters: [
      {
        name: "@title",
        value: title,
      },
    ],
  };
  //eseguiamo la query
  const { resources } = await container.items
    .query(querySpec)
    .fetchAll();

//  console.log("Documenti trovati per title", items);

  // return array di risultati , potrebbe essere vuoto , ma ovviamente non lo sara
  console.log('cosa rende qua ', resources)
  return resources;
};


// fetcho i dati dal database in ordine v3 , v2 , v1 
//container.items.query(querySpec) 

// la query voglio che ci sia un filtro in base items.version

//Items.filterbyversion.sort((n1, n2)=| n1 -n2); 