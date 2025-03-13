from flask import Flask, request, render_template, jsonify
import torch
from torch import nn
from torchvision import models, transforms
from PIL import Image
import os
import json

app = Flask(__name__)

# Data transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)), 
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Define model class
class MultiOutputModel(nn.Module):
    def __init__(self, num_plants, num_diseases):
        super(MultiOutputModel, self).__init__()
        self.base_model = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)
        for param in self.base_model.parameters():
            param.requires_grad = False
        self.base_model.fc = nn.Linear(self.base_model.fc.in_features, 512)
        self.plant_fc = nn.Linear(512, num_plants)
        self.disease_fc = nn.Linear(512, num_diseases)

    def forward(self, x):
        features = self.base_model(x)
        plant_output = self.plant_fc(features)
        disease_output = self.disease_fc(features)
        return plant_output, disease_output

# Load class names from dataset directory
def get_class_names(dataset_directory):
    if not os.path.exists(dataset_directory):
        print(f"ERROR: Dataset folder '{dataset_directory}' not found!")
        return [], []
    plant_classes = sorted(os.listdir(dataset_directory))
    disease_classes = sorted(set(d for p in plant_classes for d in os.listdir(os.path.join(dataset_directory, p)) if os.path.isdir(os.path.join(dataset_directory, p, d))))
    return plant_classes, disease_classes

dataset_directory = "dataset"
plant_classes, disease_classes = get_class_names(dataset_directory)
num_plants, num_diseases = len(plant_classes), len(disease_classes)

# Load model
model = MultiOutputModel(num_plants, num_diseases)
model_path = 'plant_disease_model.pth'
if os.path.exists(model_path):
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
else:
    print(f"ERROR: Model file '{model_path}' not found!")

# Function to predict image
def predict_image(image_path):
    image = transform(Image.open(image_path)).unsqueeze(0)
    with torch.no_grad():
        plant_output, disease_output = model(image)
    plant_idx, disease_idx = torch.argmax(plant_output).item(), torch.argmax(disease_output).item()
    return plant_classes[plant_idx] if plant_classes else None, disease_classes[disease_idx] if disease_classes else None

# Fetch JSON data
json_data_folder = "json_data"
def fetch_json_data(disease, severity, acreage):
    severity = severity.lower()
    json_file_path = os.path.join(json_data_folder, disease, f"{severity}.json")
    if not os.path.exists(json_file_path):
        return None, f"No data found for {disease} at severity {severity}."
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    data["fertilizer_composition"] = {key: value * acreage for key, value in data.get("fertilizer_composition", {}).items()}
    data["acre"] = int(acreage)
    return data, None

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return render_template("results.html", error="No image file provided.")
    image_file = request.files['image']
    if image_file.filename == '':
        return render_template("results.html", error="No image selected.")
    severity, acreage = request.form.get('severity', 'low'), request.form.get('acreage', '1')
    try:
        acreage = float(acreage)
    except ValueError:
        return render_template("results.html", error="Invalid acreage value.")
    upload_folder = os.path.join("static", "uploads")
    os.makedirs(upload_folder, exist_ok=True)
    image_path = os.path.join(upload_folder, image_file.filename)
    image_file.save(image_path)
    plant_prediction, disease_prediction = predict_image(image_path)
    if not plant_prediction or not disease_prediction:
        return render_template("results.html", error="Model prediction failed.")
    recommendations, error = fetch_json_data(disease_prediction, severity, acreage)
    if error:
        return render_template("results.html", error=error)
    return render_template("results.html", image_path=f"/static/uploads/{image_file.filename}", plant_prediction=plant_prediction, disease_prediction=disease_prediction, recommendations=recommendations)

if __name__ == '__main__':
    app.run(debug=True)
