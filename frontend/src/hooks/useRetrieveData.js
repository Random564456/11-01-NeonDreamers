import { useEffect, useRef } from 'react';

function useRetrieveData(setLoadingData, setData, houseType, prediction) {
    const previousHouseType = useRef(houseType);
    const previousPrediction = useRef(prediction);

    useEffect(() => {
        // Check if houseType or prediction has changed
        if (previousHouseType.current !== houseType || previousPrediction.current !== prediction) {
            // Clear local storage when houseType or prediction changes
            localStorage.removeItem("predictions");
            previousHouseType.current = houseType;
            previousPrediction.current = prediction;
        }

        const cachedPredictions = localStorage.getItem("predictions");
        if (cachedPredictions) {
            // Load data from cache if available
            setData(JSON.parse(cachedPredictions));
            setLoadingData(false);
        } else {
            // Fetch data from the backend if not in cache
            setLoadingData(true);
            fetch(`http://127.0.0.1:8000/regression-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ house_type: houseType, comparison: prediction }),
            })
                .then(async (response) => {
                    if (!response.ok) {
                        // Log any non-200 responses
                        const errorText = await response.text();
                        console.error("Fetch error response:", errorText);
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                    // Check for empty response
                    const text = await response.text();
                    console.log("Raw response text:", text); // Log raw response

                    if (!text) {
                        console.error("Empty response received from server.");
                        throw new Error("Empty response from server");
                    }

                    return JSON.parse(text); // Parse as JSON if not empty
                })
                .then((data) => {
                    console.log("Backend response:", data); // Log the parsed JSON response

                    // Check if 'predictions' exists in the response
                    if (data && data.predictions) {
                        localStorage.setItem("predictions", JSON.stringify(data.predictions));
                        setData(data.predictions);
                    } else {
                        console.error("No 'predictions' key in response data:", data);
                        setData([]); // Set to empty array if predictions is undefined
                    }
                    setLoadingData(false); // Data loading is complete
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setLoadingData(false); // Ensure loading state is set to false on error
                });
        }
    }, [houseType, prediction]);
}

export default useRetrieveData;
