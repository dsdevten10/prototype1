import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);


// React browser router , permette al browser di navigare all interno dell app nelle varie pagine components e dire 
// ehy guarda che al relativo path corrisponde questa pagina , all interno di questa pagina viene montato un determinato component 
