// non mescolare i tipi con la logica
//

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
