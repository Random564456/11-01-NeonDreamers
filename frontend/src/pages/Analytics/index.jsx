import Form from "../../components/Form";
import Pagination from "../../components/Pagination";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Analytics = () => {

  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
      // Fetch data from the FastAPI backend
      fetch("http://127.0.0.1:8000/regression-data")
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error("Error fetching data:", error));
  }, []);

  console.log(data);
  
  useEffect(() => {
      if (data.length > 0) {
          const svg = d3.select(svgRef.current);
          svg.selectAll("*").remove(); // Clear previous contents

          // Set dimensions and margins
          const width = 500;
          const height = 300;
          const margin = { top: 20, right: 30, bottom: 40, left: 50 };

          // Define scales
          const xScale = d3.scaleLinear()
              .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
              .range([margin.left, width - margin.right]);

          const yScale = d3.scaleLinear()
              .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
              .range([height - margin.bottom, margin.top]);

          // Define axes
          svg.append("g")
              .attr("transform", `translate(0,${height - margin.bottom})`)
              .call(d3.axisBottom(xScale));

          svg.append("g")
              .attr("transform", `translate(${margin.left},0)`)
              .call(d3.axisLeft(yScale));

          // Plot data points
          svg.selectAll("circle")
              .data(data)
              .enter()
              .append("circle")
              .attr("cx", d => xScale(d.x))
              .attr("cy", d => yScale(d.y))
              .attr("r", 3)
              .style("fill", "steelblue");
      }
  }, [data]);


  return (
    <div className="bg-white h-screen">
        {/* Form for adding or removing entries from csv file. It also acts as a filter for creating graphs */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3 p-5">  
        <Form FormName={"Rooms"} type={"number"} />
        <Form FormName={"Distance"} type={"number"} />
        <Form FormName={"Bedrooms"} type={"number"} />
        <Form FormName={"Bathrooms"} type={"number"} />
        <Form FormName={"Cars"} type={"number"} />
        <Form FormName={"Landsize"} type={"number"} />
        <Form FormName={"BuildingArea"} type={"string"} />
        <Form FormName={"Longtitude"} type={"number"} />
        <Form FormName={"Regionname"} type={"string"} />
        <Form FormName={"Type"} type={"string"} />
      </div>
      <div>
        <a
          className="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={() => {}}
        >
          Enter Data
        </a>
      </div>
      <div className="text-white">
        SHOW AMOUNT OF ENTRIES
      </div>
      <div>
        <a
          className="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={() => {}}
        >
          Train Model
        </a>
      </div>
      <div>
        <Pagination/>
        {/* ADD A FORM TO ADD DATA TO THE CSV FILE -- NEEDS VALIDATION */}
        {/* ADD SCATTERPLOT THAT SHOWS HOUSES WITH -- THE SPECIFIC ATTRIBUTES SUBMITTED IN FORM */}
        {/* SHOW A HEAT MAP WITH THE UPDATED INPUTS */}
        <div>
            <h2>Regression Results</h2>
            <svg ref={svgRef} width={500} height={300}></svg>
        </div>
        </div>
    </div>
  );
};

export default Analytics;
