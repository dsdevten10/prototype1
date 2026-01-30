import { useEffect, useState } from "react";
import { fetchDocumentByTitle } from "../api/apiClient";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// typescript definiamo il tipo di dati molto importante 
interface DocumentData {
  id: string; 
  title: string;
  description: string;
  version: string; 
  pdf_url: string;
  blob_url?: string; 
}
export default function Box() {
  // MODEL:------ stato che tiene i dati 
  const [docs, setDocs] = useState<DocumentData[]>([]); // stato per salvare i documenti
// stati per la gestione del pdf 
  const [numPages, setNumPages] = useState<{ [id: string]: number }>({}); // salva numPages per ogni documento
  const [currentPage, setCurrentPage] = useState<{ [id: string]: number }>({});

  // callback quando il pdf è caricato
function onDocumentLoadSuccess(docId: string, { numPages }: { numPages: number }) {
    setNumPages((prev) => ({ ...prev, [docId]: numPages }));
    setCurrentPage((prev) => ({ ...prev, [docId]: 1 })); 
  }

  //CONTROLLER: la logica che gira quando monti il componente 
  useEffect(() => {
    const loadDocs = async () => {
      try {
        // uso fetchDocumentByTitle anziche scaricare tutto 
        const rawItems = await fetchDocumentByTitle("Title1"); // fetch dal DB ----------------

        console.log("Items trovati:", rawItems);
        // Logica di ordinamento 
if (rawItems.length > 0) {
// A. Ordiniamo (V3 > V2 > V1) usando numeric: true
const sortedItems = rawItems.sort((a: any, b: any) =>
b.version.localeCompare(a.version, undefined, { numeric: true })
);

// B. Selezioniamo il vincitore (il primo della lista)

const latestVersion = sortedItems[0];          
console.log("Visualizzo la versione:", latestVersion.version);
       // C. Aggiorniamo lo stato con UN SOLO elemento
setDocs([latestVersion]);
} else {
  setDocs([]); // Nessun dato trovato
}
} catch (error) {
  console.error("Errore fetch documenti:", error);
  }
  };
loadDocs();
}, []);

  // navigazione tra le pagine del pdf ----- rimangono uguali 
  const goNext = (docId: string) => {
    setCurrentPage((prev) => {
      const nextPage = prev[docId] + 1;
      return {
        ...prev,
        [docId]: nextPage <= (numPages[docId] || 1) ? nextPage : prev[docId],
      };
    });
  };

  const goPrev = (docId: string) => {
    setCurrentPage((prev) => {
      const prevPage = prev[docId] - 1;
      return {
        ...prev,
        [docId]: prevPage >= 1 ? prevPage : prev[docId],
      };
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Documenti dal DB</h2>
      {docs.length === 0 ? (
        <p>Caricamento dati...</p>
      ) : (
        docs.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-400 p-3 my-3 rounded shadow-sm"
          >
            <h3 className="font-semibold">{doc.title}</h3>
            <p className="text-sm text-gray-600">{doc.description}</p>
            {doc.blob_url && (
              <img
                src={doc.blob_url}
                alt={doc.title}
                className="w-48 h-48 object-cover my-3"
              />
            )}

            {/* PDF carousel */}
            {doc.pdf_url ? (
              <>
                <Document
                  file={doc.pdf_url}
                  onLoadSuccess={(info) => onDocumentLoadSuccess(doc.id, info)}
                >
                  <Page
                    pageNumber={currentPage[doc.id] || 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>

                {/* Navigation buttons */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => goPrev(doc.id)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    disabled={(currentPage[doc.id] || 1) <= 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => goNext(doc.id)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    disabled={(currentPage[doc.id] || 1) >= (numPages[doc.id] || 1)}
                  >
                    Next
                  </button>
                </div>

                {/* Page info */}
                {numPages[doc.id] && (
                  <p className="text-sm mt-2">
                    Page {currentPage[doc.id]} of {numPages[doc.id]}
                  </p>
                )}
              </>
            ) : (
              <p className="text-red-500">Nessun PDF disponibile</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
