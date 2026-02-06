// non mescolare i tipi con la logica
//
// devo creare anche url >> come puoi vedere url l avevo gia creato quindi riesco a tipizzarlo in questo file 
// MODEL 
// non e la connessione al database ma la definizione dei dati che andiamo a ricevere 

export interface DocumentMetadata {
  title: string;
  project_name: string;
  project_code: string;
  contract_name: string;
  contract_no: string;
  discipline: string;
  document_type: string;
  level: string;
  role: string;
  sub_role: string;
  suitability: string;
}

export interface FileMetadata {
  document_id: string;
  version: string;
  status: string;
  author: string;
  url?: string; // futuro
  file_name?: string; // futuro
  file_type?: string; // futuro
}

export interface FormData {
  document: DocumentMetadata;
  file: FileMetadata;
}
