from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import numpy as np
import pandas as pd

def clean_dataset():
    merged_data = pd.read_csv("./datasets/MergedDataset.csv")
    df_H = merged_data[merged_data['Type'] == 'h']
    data = df_H.drop(
        ["Date", "Lattitude", "Type", "Suburb", "KeyID", "Address", "Method", "SellerG", "Postcode", "CouncilArea",
         "YearBuilt", "Propertycount"], axis=1)
    data.drop_duplicates(inplace=True)

    # Impute missing values using KNN imputer
    Missing_Columns = ['Landsize', 'Bedroom2', 'Rooms', 'BuildingArea']
    from sklearn.impute import KNNImputer
    imputer = KNNImputer(n_neighbors=5)
    DataSubset = data[Missing_Columns]
    Data_imputed = imputer.fit_transform(DataSubset)
    Data_imputed = pd.DataFrame(Data_imputed, columns=Missing_Columns)
    data[Missing_Columns] = Data_imputed

    cleaned_data = data.dropna()
    return cleaned_data

def train_model():
    data = clean_dataset()
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
        "predictions": [{"x": x, "y": y} for x, y in zip(X_test['Rooms'], predictions)],
        # Use the relevant feature for x
        "metrics": {
            "r2": round(r2, 2),
            "mae": round(mae, 2),
            "mse": round(mse, 2),
            "rmse": round(rmse, 2),
        }
    }

    return prediction_data

