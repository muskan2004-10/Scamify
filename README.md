# Scamify – AI-Powered Phishing URL Detection

**Scamify** is a machine learning-based phishing URL detection system designed to identify potentially malicious websites by analyzing URL characteristics and predicting whether a URL is **Phishing** or **Legitimate**.

The project combines machine learning with a web-based interface to make phishing detection more accessible and help users recognize potentially unsafe links before interacting with them.

## Table of Contents

- [Overview]
- [Problem Statement]
- [Key Features]
- [How It Works]
- [Tech Stack]
- [Machine Learning Approach]
- [Model Performance]
- [Project Architecture]
- [Installation and Setup]
- [API Integration]
- [Limitations]
- [Future Improvements]
- [Contributors]

## Overview

Phishing attacks often use deceptive URLs to trick users into sharing sensitive information, including passwords, banking credentials, and personal data.

Scamify addresses this problem using machine learning techniques to analyze URL-based features and classify suspicious links.

The application consists of:
- A React.js frontend for user interaction.
- A Python Flask backend for processing URL submissions.
- A machine learning model for phishing URL classification.

## Problem Statement

Traditional approaches to identifying phishing websites often depend on manually checking URLs, maintaining blacklists, or relying on users to recognize suspicious links.

These approaches may fail to identify newly generated or previously unseen phishing URLs.

Scamify explores a machine learning-based approach that evaluates URL characteristics and identifies patterns associated with phishing websites.

## Key Features

- **URL Classification:** Predicts whether a submitted URL is phishing or legitimate.
- **Machine Learning-Based Detection:** Uses trained classification models to identify suspicious URL patterns.
- **URL Feature Extraction:** Analyzes characteristics such as URL length, special characters, domain information, and HTTPS presence.
- **Interactive Web Interface:** Allows users to submit URLs through a React-based application.
- **Backend Integration:** Connects the frontend to the trained ML model through a Flask API.
- **Data Preprocessing:** Handles dataset cleaning, feature engineering, and class balancing.

## How It Works

The application follows a simple URL detection pipeline:

1. **URL Input:** The user submits a URL through the web interface.
2. **Feature Extraction:** The backend extracts relevant characteristics from the submitted URL.
3. **Preprocessing:** Extracted features are transformed into the format expected by the trained model.
4. **Model Prediction:** The machine learning model analyzes the extracted features.
5. **Classification:** The system returns a prediction indicating whether the URL is phishing or legitimate.
6. **Result Display:** The frontend displays the prediction to the user.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, Material UI |
| Backend | Python, Flask |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas, NumPy |
| ML Techniques | Random Forest, Gradient Boosting, SMOTE |
| Model Persistence | Joblib |
| API Communication | REST API |

## Machine Learning Approach

The machine learning component focuses on identifying patterns in URLs that may indicate phishing activity.

### 1. Dataset Preparation

- Worked with a phishing URL dataset containing approximately 11,000 initial records.
- Expanded the dataset to approximately 90,000 records.
- Performed data preprocessing and cleaning.
- Addressed class imbalance to improve model training.

### 2. Feature Engineering

Extracted URL-related characteristics, including:

- URL length
- Number of dots and hyphens
- Special character patterns
- Path length
- Presence of HTTPS
- Domain-related characteristics
- Suspicious URL patterns

These features help the model distinguish between legitimate and potentially malicious URLs.

### 3. Model Training

Experimented with classification techniques including:

- Random Forest
- Gradient Boosting

SMOTE (Synthetic Minority Over-sampling Technique) was used to address class imbalance during model training.

### 4. Model Evaluation

Evaluated model performance using:

- Accuracy
- Precision
- Recall
- F1-score

The model was evaluated using a held-out test dataset to assess its classification performance.

## Model Performance

The Gradient Boosting model achieved the following reported evaluation results:

| Metric | Score |
|---|---:|
| Accuracy | 97.4% |
| Precision | 96.6% |
| Recall | 98.9% |
| F1-Score | 97.7% |

These results represent performance on the project's evaluation dataset and should not be interpreted as a guarantee of real-world phishing detection accuracy.

## Project Architecture

```text
                  USER
                    |
                    v
             React Frontend
                    |
                    v
              Flask Backend
                    |
                    v
             URL Feature Extraction
                    |
                    v
               Preprocessing
                    |
                    v
          Trained ML Classification Model
                    |
                    v
             Prediction Result
                    |
                    v
             React Frontend
                    |
                    v
            User Sees Result
```

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Python 3.9+
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/muskan2004-10/Scamify.git

cd Scamify
```

### 2. Set Up the Frontend

Install the frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The frontend should be accessible at:

```text
http://localhost:3000
```

### 3. Set Up the Backend

Navigate to the backend directory containing the Flask application.

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask application using its entry-point file:

```bash
python app.py
```

*Note: Update the backend directory, requirements file, and entry-point filename to match the actual repository structure.*

## API Integration

The Flask backend exposes an endpoint for URL prediction.

**Endpoint:**

```http
POST /api/predict
```

**Request Body:**

```json
{
  "url": "https://example.com"
}
```

The backend processes the submitted URL, extracts the required features, and passes them to the trained classification model.

The prediction is then returned to the frontend for display.

## Limitations

- The system primarily relies on URL-based features rather than a complete analysis of website content.
- Model performance depends on the quality and representativeness of the training dataset.
- Newly emerging phishing techniques may not always be detected.
- A legitimate-looking URL is not necessarily safe, and a suspicious-looking URL is not necessarily malicious.
- The project is an educational prototype and should not replace dedicated security tools or browser-level protection.

## Future Improvements

- Integrate real-time threat intelligence and phishing URL databases.
- Explore additional features using domain reputation and website metadata.
- Experiment with advanced machine learning and deep learning approaches.
- Improve model generalization using more diverse datasets.
- Enhance prediction explanations to help users understand suspicious URL characteristics.
- Deploy the application for broader accessibility.

## Contributors

Developed as a collaborative academic project by a team of students.

Contributions included dataset preparation, feature engineering, machine learning model development, model evaluation, backend integration, and frontend development.

---

**Disclaimer:** Scamify is an academic machine learning project developed for educational and research purposes. Predictions should not be treated as definitive security assessments.
