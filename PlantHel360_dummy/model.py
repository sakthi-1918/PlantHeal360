import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiOutputModel(nn.Module):
    def __init__(self):
        super(MultiOutputModel, self).__init__()
        
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.global_pool = nn.AdaptiveAvgPool2d((1, 1))  # Global average pooling
        self.fc2 = nn.Linear(128, 2)  # For plant output
        self.fc3 = nn.Linear(128, 2)  # For disease output

    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = F.relu(self.conv2(x))
        x = self.global_pool(x)  # Apply global pooling
        x = torch.flatten(x, 1)  # Flatten the output to pass to the fully connected layers
        
        plant_output = self.fc2(x)  # Output for plant classification
        disease_output = self.fc3(x)  # Output for disease classification

        return plant_output, disease_output
