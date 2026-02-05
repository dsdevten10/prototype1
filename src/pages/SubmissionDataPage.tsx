// src/pages/SubmissionDataPage.tsx
// direttore d orchestra nel mio schema 
import { useState } from "react";
import UploadPdf from "../components/UploadPdf";
import FormSubmissionDataComponent from "../components/FormSubmissionDataComponent";

export default function SubmissionDataPage() {
  // Qui conserviamo l'URL che arriva da Azure
  const [blobInfo, setBlobInfo] = useState<{ url: string; name: string } | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Submission Page</h1>
      
      {/* 1. Riceve i dati dall'upload */}
      <UploadPdf onUploadSuccess={(url, name) => setBlobInfo({ url, name })} />

      <div className="my-8 border-t" />

      {/* 2. Passa l'URL al form */}
      <FormSubmissionDataComponent 
        pdfUrlFromAzure={blobInfo?.url} 
        pdfNameFromAzure={blobInfo?.name} 
      />
    </div>
  );
}

