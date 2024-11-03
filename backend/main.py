import io
from uu import Error

from fastapi import FastAPI, Query, UploadFile, File, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from AI import train_model, clean_dataset
from typing import List, Dict, Any, Literal
import pandas as pd

from pydantic import BaseModel

# MODEL FOR TAKING IN DATA
class PredictionResponse(BaseModel):
    predictions: List[Dict[str, float]]
    metrics: List[Dict[str, Any]]  # Change this line if you want to keep metrics as a dict

class PredictionRequest(BaseModel):
    house_type: Literal["h", "u", "t"]
    comparison: Literal["Rooms", "Distance", "Bathroom", "Landsize", "BuildingArea"]

# Using uvicorn for application auto refresh
# Add CORS middleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend running on port 3000
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allow all headers
)

merged_data = pd.read_csv("./datasets/MergedDataset.csv")

# NEED AN END POINT THAT RETRIEVES DATA FOR THE FRONT END

@app.get("/connection")
async def connection():
    return {
        "connection": "connection established"
    }

@app.post("/regression-data", response_model=PredictionResponse)
async def get_regression_data(request: PredictionRequest):
    # Use the fields in `request` to process and train the model
    data = train_model(merged_data, request.house_type, request.comparison)
    return data
