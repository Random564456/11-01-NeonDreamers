import React, { useEffect, useRef, useState } from "react";
import useRetrieveData from "../../hooks/useRetrieveData";
import useRenderChart from "../../hooks/useRenderChart";
import useConnectBackend from "../../hooks/useConnectBackend";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [houseType, setHouseType] = useState(""); // Default house type
  const [loadingData, setLoadingData] = useState(true); // Track data loading state
  const [incorrectValue, setIncorrectValue] = useState(false); // Track incorrect value state
  const [input, setInput] = useState("h"); // Default value
  const [input2, setInput2] = useState("Bathroom"); // Default prediction value
  const [prediction, setPrediction] = useState(""); // Initialize prediction
  const svgRef = useRef();
  const [connectionEstablished, setConnectionEstablished] = useState(false);

  // Fetch data from the FastAPI backend, specifying what kind of house
  useRetrieveData(setLoadingData, setData, houseType, prediction);

  // Establish a connection to the backend
  useConnectBackend(setConnectionEstablished);

  // D3 chart rendering
  useRenderChart(loadingData, data, svgRef, input2, input);

  const cleanValue = (value) => ["h", "u", "t"].includes(value);
  const cleanPrediction = (value) => [
    "Rooms",
    "Distance",
    "Bathroom",
    "Landsize",
    "BuildingArea",
  ].includes(value);

  const handleClick = (e) => {
    e.preventDefault();
    setIncorrectValue(false);

    // Validate house type and prediction
    if (!cleanValue(input) || !cleanPrediction(input2)) {
      setIncorrectValue(true);
      return;
    }

    // Set house type and prediction for data fetching
    setLoadingData(true);
    setHouseType(input);
    setPrediction(input2);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "houseType") {
      setInput(value); // Set "h", "u", or "t"
    } else if (id === "prediction") {
      setInput2(value); // Set selected attribute value
    }
  };

  return (
    <div className="flex flex-col al bg-white w-screen h-screen">
      <div className="flex flex-col justify-center items-center gap-[20px] mb-[200px]">
        <h1 className="my-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
          LINEAR REGRESSION MODEL
        </h1>

        {connectionEstablished ? (
          <>
            <label className="text-black text-sm">Select a house type:</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="houseType"
              onChange={handleChange}
              value={input}
            >
              <option value="">Choose a house type</option>
              <option value="h">House</option>
              <option value="u">Unit</option>
              <option value="t">Townhouse</option>
            </select>

            <label className="text-black text-sm">Select a prediction based on price:</label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="prediction"
              onChange={handleChange}
              value={input2}
            >
              <option value="">Choose an attribute</option>
              <option value="Rooms">Rooms</option>
              <option value="Distance">Distance</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Landsize">Landsize</option>
              <option value="BuildingArea">Building Area</option>
            </select>

            <button onClick={handleClick}>Submit</button>
            {incorrectValue && <p className="text-red-500">Please enter a valid value</p>}

            <div className="h-auto">
              <h2>Regression Results</h2>
              {!loadingData && <svg ref={svgRef} width={700} height={500}></svg>}
              {/* Display loading messages */}
              {loadingData && <p>Training Model and Loading Data...</p>}
            </div>
          </>
        ) : (
          <p className="text-red-500">No connection to server</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
