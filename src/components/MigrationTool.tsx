/**
 * VIEW LAYER: MigrationTool
 * Gestisce lo stato dell'interfaccia (loading, errori, log) e scatena l'azione.
 */
import { useState } from "react";
import { getContainer, upsertItem } from "../utils/cosmoDBConfiguration";
import { transformToNewSchema } from "../utils/transformToNewSchema";

export default function MigrationTool() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [progress, setProgress] = useState("");

  const handleMigration = async () => {
    setIsMigrating(true);
    setProgress("Connessione a Cosmos DB...");

    try {
      const container = await getContainer();
      // 1. FETCH (Model): Prendiamo tutti i record esistenti
      const { resources: docs } = await container.items.readAll().fetchAll();
      setProgress(`Analisi di ${docs.length} documenti...`);

      for (const doc of docs) {
        // 2. TRANSFORM (Controller): Verifichiamo e trasformiamo il dato
        if (!doc.document) {
          // Se non ha la struttura nuova...
          const updatedDoc = transformToNewSchema(doc);

          // 3. SYNC (Model): Salviamo il dato trasformato nel database
          await upsertItem(updatedDoc);
          console.log(`Migrato documento ID: ${doc.id}`);
        }
      }
      setProgress("✅ Database sincronizzato correttamente!");
    } catch (error) {
      console.error("Errore durante la migrazione:", error);
      setProgress("❌ Errore critico. Controlla la console.");
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="p-6 border-2 border-indigo-600 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-xl font-bold text-indigo-800 mb-2">
        DB Management Tool
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Trasforma i record legacy dal formato "Flat" al formato "Nested" (MVC
        logic).
      </p>

      <button
        onClick={handleMigration}
        disabled={isMigrating}
        className={`px-4 py-2 rounded font-semibold text-black transition-all 
          ${isMigrating ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 shadow-md"}`}
      >
        {isMigrating ? "Esecuzione..." : "Avvia Sincronizzazione Schema"}
      </button>

      {progress && (
        <div className="mt-4 p-2 bg-gray-100 border rounded text-xs font-mono">
          {progress}
        </div>
      )}
    </div>
  );
}
