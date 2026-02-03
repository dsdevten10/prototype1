import { Upload } from "lucide-react";
import { useState } from "react";
import type { ChangeEvent } from "react";

export default function UploadPdf() {
  // stato per il file selezionato
  const [file, setFile] = useState<File | null>(null);

  // funzione chiamata al cambio dell input file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // funzione per fare l upload su Azure Blob
  const handleUpload = async () => {
    if (!file) {
      alert("Selezione prima il pdf");
      return;
    }

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

      if (response.ok) {
        alert("Upload completato con successo!");
        setFile(null); // reset file dopo upload
      } else {
        const errorText = await response.text();
        console.error(errorText);
        alert("Errore durante l upload");
      }
    } catch (error) {
      console.error(error);
      alert("Errore durante l upload");
    }
  };

  return (
    <div className="border-2 rounded-xl p-4">
      {/* Upload PDF component */}

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
        className="text-blue-600 px-4 py-2 rounded-lg hover:bg-cyan-600 inline-flex items-center"
        onClick={handleUpload}
      >
        <Upload className="ml-2 w-5 h-5" />
        Upload PDF
      </button>
            {file && <p className="mt-2 text-sm text-gray-500">File selezionato: {file.name}</p>}

    </div>
  );
}
