import  { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      This is the Home page
      <h1 className="border-2 border-solid rounded-sm mb-10">Home</h1>
      <Link to="/Documents">
        <h1 className="border-2 border-solid rounded-md mb-10">Go to Documents page</h1>
      </Link>

     <Link to='/SubmissionData'>
      <h1 className="border-2 rounded-sm mb-10 text-red-600">Sumission Data Page</h1>
      </Link>
     <Link to='/NewMigrationPage'>
      <h1 className="border-2 rounded-sm mb-10 text-green-600">New Migration Page</h1>
      </Link>
    </div>
  );
}
