import { useSearchParams } from "react-router-dom";
import Dashboard from "../components/Dashboard/dashboard";
import "./home.css";
import CreateForm from "../components/Forms/createForm";

const Home = () => {
  const [searchParams] = useSearchParams();

  const view = searchParams.get("view");
  console.log(view);
  return (
    <div class="flex h-screen">
      {/* <!-- Left Sidebar --> */}
      <div class="w-64 bg-blue-300 p-4 sticky">
        <h2 class="text-lg font-bold">Operations</h2>
        <ul>
          <li class="p-2 hover:bg-white cursor-pointer">Create Form</li>
          <li class="p-2 hover:bg-white cursor-pointer">Forms Created</li>
          <li class="p-2 hover:bg-white cursor-pointer">Draft</li>
        </ul>
      </div>

      {/* <!-- Right Content Area --> */}
      <div class="flex-grow bg-gray-100 p-4  overflow-y-auto">
        <h1 class="text-xl font-bold">Quizathon</h1>
        {/* <p>This section takes the remaining space.</p> */}
        {view === "create" ? <CreateForm /> : <Dashboard />}
      </div>
    </div>
  );
};

export default Home;
