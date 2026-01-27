import "./App.css";
import Box from "./components/Box";
import FetchingTitleComp from "./components/FetchingTitleComp";

function App() {
  return (
    <>
    <Box/>
      <h1 className="text-3xl font-bold underline text-red-50">Vite + React</h1>
      <FetchingTitleComp/>
    </>
  );
}

export default App;
