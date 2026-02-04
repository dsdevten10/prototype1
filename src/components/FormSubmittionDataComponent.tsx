import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FormData } from "../types/types";

export default function FormSubmissionDataComponent() {
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
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    section: "document" | "file"
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
    alert("Form inviato! Controlla la console.");
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

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600  font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Submit Metadata
        </button>
      </div>
    </form>
  );
}
