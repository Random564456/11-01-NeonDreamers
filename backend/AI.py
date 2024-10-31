from sklearn.impute import KNNImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np
import pandas as pd

def clean_dataset():
    merged_data = pd.read_csv("./datasets/MergedDataset.csv")
    df_H = merged_data[merged_data['Type'] == 'h']
    data = df_H.drop(
        ["Date", "Lattitude", "Type", "Suburb", "KeyID", "Address", "Method", "SellerG", "Postcode", "CouncilArea",
         "YearBuilt", "Propertycount", "Regionname"], axis=1)
    data.drop_duplicates(inplace=True)

    similarFeatures = ['Landsize', 'Bedroom2', 'Rooms', 'BuildingArea']
    imputer = KNNImputer(n_neighbors=5)
    dataSubset = data[similarFeatures]
    dataImputed = imputer.fit_transform(dataSubset)
    dataImputed = pd.DataFrame(dataImputed, columns=similarFeatures)
    data['BuildingArea'] = data['BuildingArea'].fillna(dataImputed['BuildingArea'])

    similarFeatures = ['Landsize', 'Bedroom2', 'Rooms', 'BuildingArea']
    imputer = KNNImputer(n_neighbors=5)
    dataSubset = data[similarFeatures]
    dataImputed = imputer.fit_transform(dataSubset)
    dataImputed = pd.DataFrame(dataImputed, columns=similarFeatures)
    data['Landsize'] = data['Landsize'].fillna(dataImputed['Landsize'])

    cleaned_data = data.dropna()

    return cleaned_data

def train_model(limit):
    data = clean_dataset()

    Q1 = data['Price'].quantile(0.5)
    Q3 = data['Price'].quantile(0.75)
    IQR = Q3 - Q1
    data = data[(data['Price'] >= (Q1 - 1.5 * IQR)) & (data['Price'] <= (Q3 + 1.5 * IQR))]

    X = data.drop(['Price'], axis=1)
    Y = data['Price']

    # Split data into train and test sets
    from sklearn.model_selection import train_test_split
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Train Linear Regression model
    model = LinearRegression()
    model.fit(X_train, Y_train)

    # Generate predictions
    predictions = model.predict(X_test)

    # Calculate evaluation metrics
    r2 = r2_score(Y_test, predictions)
    mae = mean_absolute_error(Y_test, predictions)
    mse = mean_squared_error(Y_test, predictions)
    rmse = np.sqrt(mse)

    # Prepare output data for front-end visualization
    prediction_data = {
        "predictions": [{"x": float(x), "y": float(y)} for x, y in zip(X_test['Rooms'], predictions)],
        "metrics": [
            {"metric": "r2", "value": round(r2, 2)},
            {"metric": "mae", "value": round(mae, 2)},
            {"metric": "mse", "value": round(mse, 2)},
            {"metric": "rmse", "value": round(rmse, 2)},
        ]
    }

    # Limit the number of predictions returned
    limited_predictions = prediction_data["predictions"][:limit]

    return {
        "predictions": limited_predictions,
        "metrics": prediction_data["metrics"]
    }
