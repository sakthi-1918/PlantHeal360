import torch

model_path = "plant_disease_model1.pth"
try:
    model_weights = torch.load(model_path, map_location=torch.device('cpu'))
    print("Model file loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
