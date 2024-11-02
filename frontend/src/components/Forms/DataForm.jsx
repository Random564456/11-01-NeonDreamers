import React, { useState } from "react";





// Rooms              0
// Price           5092
// Distance           1
// Bedroom2        3082
// Bathroom        3088
// Car             3572
// Landsize        5804
// BuildingArea    7278
// Longtitude      2964
// Regionname         2
// dtype: int64








const Analytics = () => {
  const [formData, setFormData] = useState({
    Rooms: "",
    Price: "",
    Distance: "",
    Bedroom2: "",
    Bathroom: "",
    Car: "",
    Landsize: "",
    BuildingArea: "",
    Longtitude: "",
    Regionname: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit form data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/uploadData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data uploaded:", data);
        // Reset form if needed
        setFormData({
          Rooms: "",
          Distance: "",
          Bedrooms: "",
          Bathrooms: "",
          Cars: "",
          Landsize: "",
          BuildingArea: "",
          Longitude: "",
          Regionname: "",
        });
      })
      .catch((error) => console.error("Error uploading data:", error));
  };

  console.log(formData)

  return (
    <div className="bg-white p-5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">{field}</label>
            <input
              type={field === "Rooms" || field === "Distance" || field === "Bedrooms" || field === "Bathrooms" || field === "Cars" || field === "Landsize" || field === "Longitude" ? "number" : "text"}
              name={field}
              id={field}
              value={formData[field]}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="submit"
          className="col-span-full mt-4 rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring"
        >
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default Analytics;
