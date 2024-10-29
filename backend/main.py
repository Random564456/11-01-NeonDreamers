from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from AI import train_model
from typing import List, Dict

from pydantic import BaseModel

# MODEL FOR TAKING IN DATA
class HousingData(BaseModel):
    rooms: int
    distance: int
    bedrooms: int
    bathrooms: int
    cars: int
    landSize: int
    buildingArea: float
    longitude: float
    regionName: str
    type: str
    price: int

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

@app.get("/regression-data", response_model=Dict[str, List[Dict[str, float]]])
async def get_regression_data():
    data = train_model()
    return data

@app.get("/")
async def root():
    # RETRIEVE DATA FOR PREDICTIONS
    return {"Hello": "World"}

# NEED AN END POINT THAT TAKES IN DATA AND ADDS IT TO THE DATASET (POST REQUEST)

@app.post("/uploadData")
async def uploadData():
    return

