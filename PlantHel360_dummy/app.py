from flask import Flask, request, render_template, jsonify
import torch
from torch import nn
from torchvision import models, transforms
from PIL import Image
import os
import json

app = Flask(__name__)

# Automatically generate plant and disease class names based on folder structure
def get_class_names(dataset_directory):
    plant_classes = sorted(os.listdir(dataset_directory))  # Get top-level folder names (Potato, Tomato)
    disease_classes = []

    # Generate disease classes by iterating through each plant class folder
    for plant_class in plant_classes:
        plant_path = os.path.join(dataset_directory, plant_class)
        if os.path.isdir(plant_path):
            diseases = sorted(os.listdir(plant_path))  # Get subfolders (diseases)
            disease_classes.extend([f"{disease}" for disease in diseases])

    return plant_classes, disease_classes

# Define the model
class MultiOutputModel(nn.Module):
    def __init__(self, num_plants=10, num_diseases=5):  # Adjust sizes as per dataset
        super(MultiOutputModel, self).__init__()
        self.base_model = models.resnet18(pretrained=True)  # Use pretrained weights
        self.base_model.fc = nn.Linear(self.base_model.fc.in_features, 512)
        self.plant_fc = nn.Linear(512, num_plants)  
        self.disease_fc = nn.Linear(512, num_diseases)  

    def forward(self, x):
        features = self.base_model(x)
        plant_output = self.plant_fc(features)
        disease_output = self.disease_fc(features)
        return plant_output, disease_output

# Load the model
num_plants = 2  # Number of plant classes (e.g., Potato, Tomato)
num_diseases = 6  # Number of disease classes
model = MultiOutputModel(num_plants, num_diseases)

# Load model weights
model_path = 'plant_disease_model.pth'
if os.path.exists(model_path):
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
else:
    print(f"ERROR: Model file '{model_path}' not found!")

# Define transformations for input image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Automatically detect plant and disease classes based on the folder structure
dataset_directory = "dataset"  # Replace with your actual dataset path
if os.path.exists(dataset_directory):
    plant_classes, disease_classes = get_class_names(dataset_directory)
else:
    print(f"ERROR: Dataset folder '{dataset_directory}' not found!")
    plant_classes, disease_classes = [], []

# Path to the folder containing JSON data
json_data_folder = "json_data"

# Create an "uploads" folder if it doesn't exist
os.makedirs("uploads", exist_ok=True)

# Function to load image and predict
def predict_image(image_path):
    image = Image.open(image_path)
    image = transform(image).unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        plant_output, disease_output = model(image)

    # Process the outputs
    plant_prediction_index = torch.argmax(plant_output, dim=1)
    disease_prediction_index = torch.argmax(disease_output, dim=1)

    # Map indices to class names
    if plant_classes and disease_classes:
        plant_prediction = plant_classes[plant_prediction_index.item()]
        disease_prediction = disease_classes[disease_prediction_index.item()]
    else:
        return None, None  # Error case if classes are missing

    return plant_prediction, disease_prediction

# Function to fetch and process JSON data
def fetch_json_data(plant, disease, severity, acreage):
    severity = severity.lower()  # Normalize severity to lowercase

    # Construct the path to the JSON file
    json_file_path = os.path.join(json_data_folder, disease, f"{severity}.json")
    print(f"DEBUG: Searching for JSON file at: {os.path.abspath(json_file_path)}")

    if not os.path.exists(json_file_path):
        print(f"DEBUG: JSON file not found: {os.path.abspath(json_file_path)}")
        return None, f"No data found for {plant} with {disease} and severity {severity}."

    # Load the JSON data
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    # Scale the fertilizer composition based on acreage
    scaled_fertilizer = {key: value * acreage for key, value in data["fertilizer_composition"].items()}
    data["fertilizer_composition"] = scaled_fertilizer
    data["acre"] = int(acreage) 

    print(f"DEBUG: Successfully loaded JSON file from: {json_file_path}")
    return data, None

@app.route('/')
def index():
    return render_template('index.html')  # Ensure 'index.html' exists in the templates folder

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return render_template("results.html", error="No image file provided.")

        image_file = request.files['image']
        if image_file.filename == '':
            return render_template("results.html", error="No image selected.")

        severity = request.form.get('severity', 'low')  
        acreage = request.form.get('acreage', '1')  

        try:
            acreage = float(acreage)
        except ValueError:
            return render_template("results.html", error="Invalid acreage value.")

        # Save the uploaded image in 'static/uploads'
        upload_folder = os.path.join("static", "uploads")
        os.makedirs(upload_folder, exist_ok=True)
        image_path = os.path.join(upload_folder, image_file.filename)
        image_file.save(image_path)

        # Get predictions
        plant_prediction, disease_prediction = predict_image(image_path)

        if plant_prediction is None or disease_prediction is None:
            return render_template("results.html", error="Model prediction failed.")

        # Fetch fertilizer recommendations
        recommendations, error = fetch_json_data(plant_prediction, disease_prediction, severity, acreage)

        if error:
            return render_template("results.html", error=error)

        return render_template(
            "results.html",
            image_path=f"/static/uploads/{image_file.filename}",  # Correct path for displaying in HTML
            plant_prediction=plant_prediction,
            disease_prediction=disease_prediction,
            recommendations=recommendations
        )

    except Exception as e:
        return render_template("results.html", error=str(e))


if __name__ == '__main__':
    app.run(debug=True)
