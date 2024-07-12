import { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import BarChart from "../../Visvualization/BarChart";

const Dashboard = () => {
  const [record, setRecord] = useState([]);
  const val = [10, 20, 30, 40, 50, 60, 70];
  const getRecord = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/dashboard/getAllRecords?lim=10"
    );
    setRecord(data?.data);
  };
  useEffect(() => {
    getRecord();
  }, []);
  console.log(record);
  return (
    <>
      <div className="head-pills p-4 shadow-lg fs-4 d-flex flex-start">
        <span className="ms-2 text-black fw-bold">Blackoffer pvt ltd.</span>
      </div>

      <div className="row">
        <div className="col">
          <div className="box shadow-lg">
            <BarChart data={val} />
          </div>
        </div>
        <div className="col">
          <div className="box shadow-lg"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
