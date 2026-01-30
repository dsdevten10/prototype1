import { useEffect, useState } from "react";
import { fetchDocumentByTitle } from "../api/apiClient";

// ✅ Interfaccia essenziale - solo campi che usi
interface DocumentData {
  title: string;
  description: string;
  version: string;
  author: string;
  status: string;
  document_type: string;
}

export default function FetchingTitleComp() {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTitle = async () => {
      try {
        setLoading(true);

        // search by title not by id
        const items = await fetchDocumentByTitle("Title1");

       // console.log("Dati dal DB:", items);
        setData(items); // items e un array
      } catch (error) {
        console.error("Errore fetch:", error);
        setError("Errore nel caricamento");
      } finally {
        setLoading(false);
      }
    };

    getTitle();
  }, []);

  // ✅ RENDERING SEMPLICISSIMO
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Documenti per Title</h1>

      {loading && <p>Caricamento...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {/*  Mostra messaggio se array vuoto */}
      {!loading && data.length === 0 && (
        <p className="text-gray-500">Nessun documento trovato</p>
      )}

      <div className="space-y-4">
        {data.map((doc, index) => (
          <div
            key={`${doc.title}-${index}`} //key sicura 
            className="border p-4 rounded shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-600">
              {doc.title}
            </h2>
            <h3 className="text-lg text-gray-700 mt-2">{doc.description}</h3>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Version:</strong> {doc.version}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Author:</strong> {doc.author}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Status:</strong> {doc.status}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Type:</strong> {doc.document_type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
