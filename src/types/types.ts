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
}

export interface FormData {
  document: DocumentMetadata;
  file: FileMetadata;
}
