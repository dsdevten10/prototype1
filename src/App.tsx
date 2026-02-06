import "./App.css";

import "./components/NewLoadingSpinner/loading.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import SubmissionDataPage from "./pages/SubmissionDataPage";
import NewMigrationPage from "./pages/NewMigrationPage"; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Documents" element={<Documents/>}/>
        <Route path="/SubmissionData" element={<SubmissionDataPage/>}/>
        <Route path="/NewMigrationPage" element={<NewMigrationPage/>}/>
      </Routes>
    </>
  );
}

export default App;
