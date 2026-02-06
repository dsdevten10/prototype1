// CONTROLLER =================================================
// PRENDO IL DATO E LO TRASFORMO

//app mapper mi permette di mappare gli item del DB
// se c e lo rendo

// oldItem > e l item preso dal DB
// rendo per l id che deve essere associato all oggetto preso dal database

// creo la struttura d interesse

// import la funzione del MODEL che mi permette di interagire con il database
//
export const transformToNewSchema = (oldItem: any) => {
  // 1. Controllo di Identità: Se il dato ha già il campo 'document',
  // significa che è già stato migrato. Lo restituiamo subito per evitare loop.
  if (oldItem.document && oldItem.file) {
    return oldItem;
  }

  // 2. Logica di Mappatura: Prendiamo i campi "piatti" e li nidifichiamo.
  // Usiamo l'operatore || per fornire dei fallback (valori di default)
  // così l'app non esplode se un campo è null nel vecchio DB.

  return {
    // L'ID deve rimanere IDENTICO. È la chiave primaria che permette l'UPSERT.
    id: oldItem.id, // .... "qua lo cambiero con title quando ci sara da fare il title"

    document: {
      title: oldItem.title || "untitles",
      project_name: oldItem.project_name || "N/A",
      project_code: oldItem.project_code || "",
      contract_name: oldItem.contract_name || "",
      contract_no: String(oldItem.contract_no || ""),
      discipline: oldItem.discipline || "",
      document_type: oldItem.document_type || "",
      level: String(oldItem.level || ""),
      role: oldItem.role || "",
      sub_role: oldItem.sub_role || "",
      suitability: oldItem.suitability || "",
    },
    file: {
      document_id: oldItem.id,
      version: oldItem.version || "P01",
      status: oldItem.status || "Shared",
      author: oldItem.author || oldItem.created_by || "Unknown",
      url: oldItem.url || "",
      file_name: oldItem.file_name || "",
      created_on: oldItem.created_on || new Date().toISOString(),
      modified_on: new Date().toISOString(),
    },
  };
};
