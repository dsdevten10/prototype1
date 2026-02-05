import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FormData } from "../types/types";
import { createItem } from "../utils/cosmoDBConfiguration";

// importo la funzione che mi permette il passaggio del dato
// URL della creazione del blob storage del dato ricevuto dal server

interface PropsUrlandNameFromFatherSubmissionPage {
  pdfUrlFromAzure?: string; // prop opzionale che arriva dalla pagina
  pdfNameFromAzure?: string;
}

export default function FormSubmissionDataComponent({
  pdfUrlFromAzure,
  pdfNameFromAzure,
}: PropsUrlandNameFromFatherSubmissionPage) {
  const [formData, setFormData] = useState<FormData>({
    document: {
      title: "",
      project_name: "",
      project_code: "",
      contract_name: "",
      contract_no: "",
      discipline: "",
      document_type: "",
      level: "",
      role: "",
      sub_role: "",
      suitability: "",
    },
    file: {
      document_id: "",
      version: "",
      status: "",
      author: "",
      //url?: string; // futuro // << qua una volta ricevuto lo url dal upload di pdf che successivamente ricevo lo url creato riesco a crearlo automaticamente? filling automaticamente attenzione perche potrebbe essere
      // un problema di sicurezza in questo caso. non sarebbe meglio un altro modo?
      // Fatto cio ho creato anche il file json direttamente con lo url del pdf associato. E corretto questo flusso di dati?
      //file_name?: string; // futuro
      //file_type?: string; // futuro
    },
  });

  // aggiungiamo optional Validation

  // vogliamo una validazione al form quindi se il formadata non ha un title rendimi mi devi rendere un title obbligatorio
  // un altra validazione del form se non c e id rendimi ID obbligatorio !!

  const validateForm = () => {
    if (!formData.document.title) return "Titolo documento obbligatorio";
    if (!formData.file.document_id) return "Document ID obbligatorio";

    return null;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    section: "document" | "file",
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    // CONTROLLO DI SICUREZZA:
    // Se non abbiamo l'URL, l'utente forse ha dimenticato di fare l'upload
    if (!pdfUrlFromAzure) {
      alert("Attenzione: Carica il PDF prima di inviare i metadati!");
      return;
    }

    try {
      // costruisci l'item come da step 2
      // aggiunta futura logica per URL file se UploadPDF aggiorna stato
      const item = {
        id: crypto.randomUUID(),
        document: formData.document,
        file: {
          ...formData.file,
          // ✅ USIAMO LE PROPS CHE ARRIVANO DALLA PAGINA PADRE ============================================
          url: pdfUrlFromAzure,
          file_name: pdfNameFromAzure,
          created_on: new Date().toISOString(),
          modified_on: new Date().toISOString(),
        },
      };

      const result = await createItem(item as any); // funzione chiave che permette di creare l item
      console.log("Item creato con successo nel database:", result);
      alert("Metadata e link al PDF salvati con successo!");
    } catch (err) {
      console.error(err);
      alert("Errore durante la creazione dell'item!");
    }
  };

  const documentFields = Object.keys(formData.document);
  const fileFields = Object.keys(formData.file);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Document Metadata
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentFields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData.document[field as keyof typeof formData.document]}
              onChange={(e) => handleChange(e, "document")}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mt-6">
        File Metadata
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fileFields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {field.replace("_", " ").toUpperCase()}
            </label>
            <input
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formData.file[field as keyof typeof formData.file]}
              onChange={(e) => handleChange(e, "file")}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>
      {/* Feedback per l'utente */}
      {pdfUrlFromAzure && (
        <div className="text-sm text-green-600 font-medium text-right mb-2">
          ✓ File pronto: {pdfNameFromAzure}
        </div>
      )}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Submit Metadata
        </button>
      </div>
    </form>
  );
}
