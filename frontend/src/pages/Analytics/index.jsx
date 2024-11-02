
import React, {useEffect, useRef, useState} from "react";
import useRetrieveData from "../../hooks/useRetrieveData";
import useRenderChart from "../../hooks/useRenderChart";

const Analytics = () => {
    const [data, setData] = useState([]);
    const [houseType, setHouseType] = useState(""); // Default house type
    const [loadingData, setLoadingData] = useState(true); // Track data loading state
    const [incorrectValue, setIncorrectValue] = useState(); // Track incorrect value state
    const [input, setInput] = useState("u")
    const [input2, setInput2] = useState("Rooms")
    const [prediction, setPrediction] = useState("")
    const svgRef = useRef();

    // Fetch data from the FastAPI backend, specifiyling what kind of house
    useRetrieveData(setLoadingData, setData, houseType, prediction);
    // D3 chart rendering
    useRenderChart(loadingData, data, svgRef, input2, input);



    function cleanValue(value) {
        const validValues = ["h", "u", "t"];
        return validValues.includes(value);
    }
    function cleanPrediction(value) {
        const validValues = ["Rooms", "Distance", "Bathroom", "Landsize", "BuildingArea"];
        return validValues.includes(value);
    }

    const handleClick = (e) => {
        e.preventDefault()
        setIncorrectValue(false)
        // Clean value do be Literal "h", "u", "t"
        if (!cleanValue(input)) {
            setIncorrectValue(true)
            return;
        }
        // Clean value do be Literal
        if (!cleanPrediction(input2)) {
            setIncorrectValue(true)
            return;
        }
        setLoadingData(true)
        setHouseType(input)
        setPrediction(input2)
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "houseType") {
            setInput(value); // Directly set "h", "u", or "t" based on selected value
        } else if (id === "prediction") {
            setInput2(value); // Set the selected attribute value
        }
    };

    console.log(houseType)

    return (
        <div className="flex  flex-col bg-white w-screen h-screen">
            <h1>LINEAR REGRESSION MODEL</h1>
            <div className="text-white">SHOW AMOUNT OF ENTRIES</div>
            <div className="flex flex-col justify-center items-center gap-[20px] mb-[200px]">


                <label className="text-black text-sm">Select a house type:</label>
                <select className="select select-bordered w-full max-w-xs" id="houseType" onChange={handleChange}>
                    <option value="">Choose a house type</option>
                    <option value="h">House</option>
                    <option value="u">Unit</option>
                    <option value="t">Townhouse</option>
                </select>

                <label className="text-black text-sm">Predictions based on price:</label>
                <select className="select select-bordered w-full max-w-xs" id="prediction" onChange={handleChange}>
                    <option value="">Choose an attribute</option>
                    <option value="Rooms">Rooms</option>
                    <option value="Distance">Distance</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Landsize">Landsize</option>
                    <option value="BuildingArea">Building Area</option>
                </select>


                <button onClick={handleClick}>Submit</button>
                {incorrectValue && <p>Please enter a valid value</p>}
                <div className="h-auto">
                    <h2>Regression Results</h2>
                    {!loadingData && <svg ref={svgRef} width={1000} height={700}></svg>}
                    {/* Display loading messages */}
                    {loadingData && <p>Training Model and Loading Data...</p>}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
