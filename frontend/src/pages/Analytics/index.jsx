import React, { useEffect, useState } from "react";
import Form from "../../components/Form";

const Analytics = () => {

    const [data, setData] = useState()
    useEffect(() => {
        fetch("http://127.0.0.1:8000/")
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error("Error:", error));
        
    }, [])

    console.log(data)

  return (
    <div className="bg-black">
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
          class="m-5 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          href="#"
          onClick={() => {}}
        >
          Submit
        </a>
      </div>
      <div>
        {/* ADD A FORM TO ADD DATA TO THE CSV FILE -- NEEDS VALIDATION */}
        {/* ADD SCATTERPLOT THAT SHOWS HOUSES WITH -- THE SPECIFIC ATTRIBUTES SUBMITTED IN FORM */}
        {/* SHOW A HEAT MAP WITH THE UPDATED INPUTS */}
        </div>
    </div>
  );
};

export default Analytics;
