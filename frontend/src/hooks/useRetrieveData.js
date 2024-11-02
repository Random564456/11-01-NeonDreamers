
function useRetriveData(setLoadingData, setData, houseType) {
    const cachedPredictions = localStorage.getItem("predictions");
    if (cachedPredictions) {
      // Load data from cache if available
      setData(JSON.parse(cachedPredictions));
      setLoadingData(false);
    } else {
      // Fetch data from the backend if not in cache
      setLoadingData(true);
      fetch(`http://127.0.0.1:8000/regression-data/${houseType}`)
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
};

export default useRetriveData
