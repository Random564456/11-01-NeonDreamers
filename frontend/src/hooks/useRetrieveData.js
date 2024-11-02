import { useEffect, useRef } from 'react';

function useRetrieveData(setLoadingData, setData, houseType, prediction) {
    const previousHouseType = useRef(houseType);
    const previousPrediction = useRef(prediction);

    useEffect(() => {
        // Check if houseType has changed
        if (previousHouseType.current !== houseType || previousPrediction.current !== prediction) {
            // Clear local storage when houseType changes
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
                body: JSON.stringify({house_type: houseType, comparison: prediction}),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("predictions", JSON.stringify(data.predictions));
                    setData(data.predictions);
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