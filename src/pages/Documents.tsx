import Box from "../components/Box";
import FetchingTitleComp from "../components/FetchingTitleComp";
import UploadPdf from "../components/UploadPdf";

export default function Documents() {
  return (
    <div>
      This is the page of documents
      <UploadPdf />
      <Box />
      <FetchingTitleComp />
    </div>
  );
}
