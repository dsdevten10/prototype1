import { useState, useEffect } from "react";
import { fetchingJSONOldFormat } from "../api/apiClient";

// interfaccia types

interface JsonDataTypesFromDB {
  author: string;
  contract_name: string;
  contract_no: number;
  created_by: string;
  created_on: string;
  discipline: string;
  discipline_code: string;
  document_type: string;
  file_name: string;
  file_type: string;
  file_size: string;
  id: string;
  level: number;
  modified_by: string;
  modified_on: string;
  name: string;
  page_count: string;
  related_documents: string;
  role: string;
  status: string;
  sub_role: string;
  suitability: string;
  title: string;
  uploaded_by: string;
  uploaded_on: string;
  url: string;
  version: string;
}

export default function GetJsons() {
  const [data, setData] = useState<JsonDataTypesFromDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchingJSONOldFormat();
        console.log("dati ricevuti da cosmoDb", response);
        setData(response);
      } catch (err) {
        console.error("Errore nel fetch:", err);
        setError("Impossibile caricare i dati.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-8 border-4 border-indigo-500">
      <h2 className="text-xl font-bold mb-4">Dati da CosmoDB</h2>
      {loading && <p>Caricamento in corso...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Visualizzazione base dei dati */}
      {!loading && !error && (
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Controlla la console del browser per vedere l'oggetto completo.
      </p>
    </div>
  );
}
