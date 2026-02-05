import { Upload } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";

interface UploadPdfProps {
  onUploadSuccess?: (url: string, fileName: string) => void;
}

export default function UploadPdf({ onUploadSuccess }: UploadPdfProps) {
  // stato per il file selezionato
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false); // stato per disabilitare bottone durante upload

  // Cambio del file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload su Azure Blob Storage
  const handleUpload = async () => {
    if (!file) {
      alert("Seleziona prima un PDF");
      return;
    }

    setUploading(true); // inizio upload

    try {
      // Costruisco URL completo: container + file name + SAS token
      const blobURL = `${import.meta.env.VITE_BLOB_URL}/${file.name}?${import.meta.env.VITE_SAS_TOKEN}`;

      const response = await fetch(blobURL, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
        body: file,
      });

      // RICEZIONE DELLO URL DAL FILE BLOB Creato ?? ===============================================
      // Come passo il dato url direttamente al component formSubmission? 
      // >> passo il dato al component Submission? 
      if (response.ok) {
        alert("Upload completato con successo!");
        setFile(null); // reset file dopo upload

        // ✅ chiama callback con URL e fileName
        if (onUploadSuccess) {
          const uploadedUrl = `${import.meta.env.VITE_BLOB_URL}/${file.name}`;
          onUploadSuccess(uploadedUrl, file.name);
        }
      } else {
        const errorText = await response.text();
        console.error("Errore upload Blob:", errorText);
        alert("Errore durante l'upload del PDF");
      }
    } catch (error) {
      console.error("Errore upload:", error);
      alert("Errore durante l'upload del PDF");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 rounded-xl p-4">
      <p className="font-bold text-lg mb-3">Document Register</p>

      {/* Input file */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-3"
      />

      {/* Button upload */}
      <button
        className={`text-red bg-blue-600 px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50`}
        onClick={handleUpload}
        disabled={uploading} // disabilita durante upload
      >
        <Upload className="w-5 h-5" />
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {/* Mostra file selezionato */}
      {file && (
        <p className="mt-2 text-sm text-gray-500">
          File selezionato: {file.name}
        </p>
      )}
    </div>
  );
}
