import Pagination from "../../components/Pagination";
import React, { useEffect, useRef, useState } from "react";
import useRetriveData from "../../hooks/useRetrieveData";
import useRenderChart from "../../hooks/useRenderChart";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [houseType, setHouseType] = useState("u"); // Default house type
  const [loadingData, setLoadingData] = useState(true); // Track data loading state
  const svgRef = useRef();

  // Fetch data from the FastAPI backend, specifiyling what kind of house
  useEffect(() => {
    useRetriveData(setLoadingData, setData, houseType);
  }, []);

  // D3 chart rendering
  useEffect(() => {
   useRenderChart(loadingData, data, svgRef);
  }, [data.length]);

  const handleTrainModel = (e) => {
    e.preventDefault()
    setData([]);
    localStorage.removeItem("predictions");
    localStorage.removeItem("metrics");
    fetch(`http://127.0.0.1:8000/regression-data${houseType}`)
      .then((response) => response.json())
      .then((result) => {
        console.log("Model training complete:", result);
      })
      .catch((error) => {
        console.error("Error training model:", error);
      });
  };

  return (
    <div className="flex  flex-col bg-white w-screen h-screen">
      <div>
        <a
          className="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={() => {}}
        >
          Enter Data
        </a>
      </div>
      <div className="text-white">SHOW AMOUNT OF ENTRIES</div>
      <div>
        <a
          className="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={handleTrainModel}
        >
          Train Model
        </a>
      </div>
      <div className="flex flex-col justify-center items-center gap-[20px] mb-[200px]">
        <Pagination />
      <input className="border-2 rounded-md" type="text" placeholder=""/>
        <div className="h-auto">
          <h2>Regression Results</h2>
          {!loadingData && <svg ref={svgRef} width={500} height={300}></svg>}
          {/* Display loading messages */}
          {loadingData && <p>Training Model and Loading Data...</p>}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
