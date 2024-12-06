import { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../constants/constants";

const Dashboard = () => {
  const [allForms, setAllForms] = useState([]);
  const navigate = useNavigate();

  const addValueToURL = () => {
    navigate("?view=create"); // Appends '?view=create' to the current URL
  };

  const getAllForms = async () => {
    try {
      const { data } = await axios.get(`${url}/api/quiz/getAllForms`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAllForms(data);
    } catch (error) {
      alert("failure in fetching all forms");
    }
  };

  useEffect(() => {
    getAllForms();
  }, []);

  return (
    // <>
    //   <div className="head-pills p-4 shadow-lg fs-4 d-flex flex-start">
    //     <span className="ms-2 text-black fw-bold">Blackoffer pvt ltd.</span>
    //   </div>

    //   <div className="d-flex justify-content-between bg-light mt-2 mb-2 p-3 flex-grow-1 fs-4">
    //     <div class="dropdown">
    //       <a
    //         class="btn btn-secondary dropdown-toggle"
    //         href=""
    //         role="button"
    //         id="dropdownMenuLink"
    //         data-bs-toggle="dropdown"
    //         aria-expanded="false"
    //       >
    //         Insights
    //       </a>

    //       <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //         <li>
    //           <a class="dropdown-item" href="#">
    //             Action
    //           </a>
    //         </li>
    //         <li>
    //           <a class="dropdown-item" href="#">
    //             Another action
    //           </a>
    //         </li>
    //         <li>
    //           <a class="dropdown-item" href="#">
    //             Something else here
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     <div className="filters d-flex justify-content-between gap-2">
    //       Filters :
    //       <div class="dropdown">
    //         <a
    //           class="btn btn-secondary dropdown-toggle"
    //           href=""
    //           role="button"
    //           id="dropdownMenuLink"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Topic
    //         </a>

    //         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div class="dropdown">
    //         <a
    //           class="btn btn-secondary dropdown-toggle"
    //           href=""
    //           role="button"
    //           id="dropdownMenuLink"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Sector
    //         </a>

    //         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div class="dropdown">
    //         <a
    //           class="btn btn-secondary dropdown-toggle"
    //           href=""
    //           role="button"
    //           id="dropdownMenuLink"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Region
    //         </a>

    //         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div class="dropdown">
    //         <a
    //           class="btn btn-secondary dropdown-toggle"
    //           href=""
    //           role="button"
    //           id="dropdownMenuLink"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           Country
    //         </a>

    //         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div class="dropdown">
    //         <a
    //           class="btn btn-secondary dropdown-toggle"
    //           href=""
    //           role="button"
    //           id="dropdownMenuLink"
    //           data-bs-toggle="dropdown"
    //           aria-expanded="false"
    //         >
    //           End Year
    //         </a>

    //         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Another action
    //             </a>
    //           </li>
    //           <li>
    //             <a class="dropdown-item" href="#">
    //               Something else here
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col">
    //       <div className="box shadow-lg"></div>
    //     </div>
    //     <div className="col">
    //       <div className="box shadow-lg"></div>
    //     </div>
    //   </div>

    //   <div className="row">
    //     <div className="col">
    //       <div className="box shadow-lg"></div>
    //     </div>
    //     <div className="col">
    //       <div className="box shadow-lg"></div>
    //     </div>
    //   </div>
    // </>

    <>
      <div className="p-4 shadow-lg text-lg flex items-center">
        <span className="ml-2 text-black">
          <b>Home</b> &#8594;{" "}
          <span className="cursor-pointer" onClick={addValueToURL}>
            Forms
          </span>
        </span>
      </div>

      <div className="flex justify-between bg-gray-100 mt-2 mb-2 p-3 text-lg">
        {/* Insights Dropdown */}
        <div className="relative">
          <button
            className="btn bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
            id="insightsDropdown"
          >
            Insights
          </button>
          <ul className="absolute bg-white shadow-lg mt-2 rounded-md hidden">
            <li>
              <a className="block px-4 py-2 hover:bg-gray-200" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-gray-200" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 hover:bg-gray-200" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <div>Quiz Created</div>
          <div className="text-white border rounded-lg" onClick={addValueToURL}>
            <button className="p-0.5 bg-blue-400 mr-0.5">Create a Quiz</button>
            <button className="p-0.5 bg-blue-400">+</button>
          </div>
        </div>
      </div>

      {/* Boxes */}
      <div className="w-full">
        <table
          border="2"
          className="table-auto w-full border border-white bg-blue-300"
        >
          <thead>
            <tr>
              <th className="w-16 border border-white p-2">Sr No</th>
              <th className="w-64 border border-white p-2">Quiz Name</th>
              <th className="w-64 border border-white p-2">Created At</th>
              <th className="border border-white p-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {allForms?.map((form, index) => (
              <tr>
                <td className="border border-white p-2">{index + 1}</td>
                <td className="border border-white p-2">{form?.title}</td>
                <td className="border border-white p-2">2024-12-04</td>
                <td className="border border-white p-2">
                  <a
                    href={form?.link}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {form?.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
