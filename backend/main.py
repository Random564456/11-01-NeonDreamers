from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from AI import train_model
from typing import List, Dict, Any

from pydantic import BaseModel

# MODEL FOR TAKING IN DATA
class PredictionResponse(BaseModel):
    predictions: List[Dict[str, float]]
    metrics: List[Dict[str, Any]]  # Change this line if you want to keep metrics as a dict


# CREATE A FILE WITH A FUNCTION THAT RE-TEACHES THE AI MODEL EVERYTIME THERE IS AN UPDATE TO THE DATABASE


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



# NEED AN END POINT THAT RETRIEVES DATA FOR THE FRONT END

@app.get("/regression-data", response_model=PredictionResponse)
async def get_regression_data(limit: int = Query(25000, ge=1)):
    data = train_model(limit)
    return data

@app.get("/")
async def root():
    # RETRIEVE DATA FOR PREDICTIONS
    return {"Hello": "World"}

# NEED AN END POINT THAT TAKES IN DATA AND ADDS IT TO THE DATASET (POST REQUEST)

@app.post("/uploadData")
async def uploadData():
    return

