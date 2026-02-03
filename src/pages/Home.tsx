import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      This is the Home page
      <h1 className="border-2 border-solid rounded-sm mb-10">Home</h1>
      <Link to="/Documents">
        <h1 className="border-2 border-solid rounded-md">Go to Documents page</h1>
      </Link>
    </div>
  );
}
