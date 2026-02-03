import { useEffect, useState } from "react";
import { fetchDocumentByTitle } from "../api/apiClient";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// --- STEP 1: Nuove Interfacce per la struttura nidificata ---
interface FileDetails {
  document_id: string;
  version: string;
  status: string;
  author: string;
  url: string;
  file_name: string;
  file_type: string;
  file_size: string;
  uploaded_on: string;
}

interface MasterDocument {
  id: string;
  title: string;
  project_name: string;
  project_code: string;
  discipline: string;
  document_type: string;
  files: FileDetails[]; // Array nidificato
}

export default function Box() {
  // Stato aggiornato con il tipo MasterDocument
  const [docs, setDocs] = useState<MasterDocument[]>([]);
  const [numPages, setNumPages] = useState<{ [id: string]: number }>({});
  const [currentPage, setCurrentPage] = useState<{ [id: string]: number }>({});

  function onDocumentLoadSuccess(docId: string, { numPages }: { numPages: number }) {
    setNumPages((prev) => ({ ...prev, [docId]: numPages }));
    setCurrentPage((prev) => ({ ...prev, [docId]: 1 }));
  }

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const rawItems = await fetchDocumentByTitle("Title1");
        console.log("Items trovati:", rawItems);

        if (rawItems && rawItems.length > 0) {
          // Tipizziamo rawItems come array di MasterDocument per sicurezza
          const masterDocs: MasterDocument[] = rawItems;
          
          masterDocs.forEach(doc => {
            if (doc.files && doc.files.length > 0) {
              // Ordinamento corretto (V3 > V2 > V1)
              doc.files.sort((a, b) => 
                b.version.localeCompare(a.version, undefined, { numeric: true })
              );
            }
          });

          setDocs(masterDocs);
        } else {
          setDocs([]);
        }
      } catch (error) {
        console.error("Errore fetch documenti:", error);
      }
    };
    loadDocs();
  }, []);

  // --- Navigazione PDF (Logica basata sull'ID del file corrente) ---
  const goNext = (fileId: string) => {
    setCurrentPage((prev) => ({
      ...prev,
      [fileId]: (prev[fileId] || 1) < (numPages[fileId] || 1) ? (prev[fileId] || 1) + 1 : prev[fileId]
    }));
  };

  const goPrev = (fileId: string) => {
    setCurrentPage((prev) => ({
      ...prev,
      [fileId]: (prev[fileId] || 1) > 1 ? (prev[fileId] || 1) - 1 : prev[fileId]
    }));
  };

  return (
    <div className="p-4">
      {docs.length === 0 ? (
        <p>Caricamento dati...</p>
      ) : (
        docs.map((master) => (
          <div key={master.id} className="border p-4 shadow-lg mb-8 rounded-lg bg-white">
            
            {/* DOCUMENT DETAILS */}
            <div className="bg-blue-50 p-4 mb-4 rounded border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-blue-900">{master.title}</h2>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-700">
                <p><strong>Project:</strong> {master.project_name} ({master.project_code})</p>
                <p><strong>Type:</strong> {master.document_type}</p>
                <p><strong>Discipline:</strong> {master.discipline}</p>
              </div>
            </div>

            {/* FILE DETAILS & PDF (Mostriamo il primo dell'array dopo il sort) */}
            {master.files && master.files.length > 0 ? (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-lg text-green-700">
                    Versione Corrente: {master.files[0].version}
                  </h4>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {master.files[0].status}
                  </span>
                </div>
                
                <p className="text-sm mb-4 italic text-gray-600">
                  Caricato da {master.files[0].author} il {master.files[0].uploaded_on}
                </p>

                {/* Carosello PDF per la versione corrente */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded">
                  <Document 
                    file={master.files[0].url} 
                    onLoadSuccess={(info) => onDocumentLoadSuccess(master.files[0].document_id, info)}
                  >
                    <Page 
                      pageNumber={currentPage[master.files[0].document_id] || 1} 
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={400}
                    />
                  </Document>

                  <div className="flex gap-4 mt-4">
                    <button 
                      onClick={() => goPrev(master.files[0].document_id)}
                      className="bg-white border px-4 py-1 rounded hover:bg-gray-50 shadow-sm"
                    >
                      Indietro
                    </button>
                    <span className="self-center font-medium">
                      Pagina {currentPage[master.files[0].document_id] || 1} di {numPages[master.files[0].document_id] || '?'}
                    </span>
                    <button 
                      onClick={() => goNext(master.files[0].document_id)}
                      className="bg-white border px-4 py-1 rounded hover:bg-gray-50 shadow-sm"
                    >
                      Avanti
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Nessun file associato a questo documento.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}