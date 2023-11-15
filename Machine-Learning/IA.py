from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
from joblib import load, dump
import pandas as pd
import numpy as np

# https://flask.palletsprojects.com/en/3.0.x/quickstart/#routing

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/IA', methods=['POST'])
def IA():
    
    if request.is_json:
        dados = request.json
        
    gender = dados['gender']
    age = dados['age']
    sleepDuration = dados['sleepDuration']
    physical = dados['physical']
    stressLevel = dados['stressLevel']
    bmi = dados['bmi']
    bloodPressure = dados['bloodPressure']
    heart = dados['heart']
    steps = dados['steps']
    sleepDisorder = dados['sleepDisorder']
    
    dataset = pd.read_csv("./Dataset/Sleep_health_and_lifestyle_dataset.csv")
    
    dataset[['PressaoSistolica', 'PressaoDiastolica']] = dataset['Blood Pressure'].str.split("/", expand=True)
    
    dataset['PressaoSistolica'] = pd.to_numeric(dataset['PressaoSistolica'])
    dataset['PressaoDiastolica'] = pd.to_numeric(dataset['PressaoDiastolica'])
    
    dataset['Gender'] = dataset['Gender'].replace({'Male': 1, 'Female': 0})
    dataset['BMI Category'] = dataset['BMI Category'].replace({'Normal': 0, 'Overweight': 1, 'Normal Weight': 2, 'Obese': 3})
    dataset['Sleep Disorder'] = dataset['Sleep Disorder'].replace({'None': 0, 'Sleep Apnea': 1, 'Insomnia': 2})
    dataset['Pressao Media'] = dataset.apply(lambda row: (2 * row['PressaoDiastolica'] + row['PressaoSistolica']) / 3, axis=1)
    
    data = dataset[['Gender', 'Age', 'Sleep Duration', 'Physical Activity Level', 'Stress Level', 'BMI Category', 'Pressao Media', 'Heart Rate', 'Daily Steps', 'Sleep Disorder']]
    target = dataset['Quality of Sleep']
    
    X = pd.DataFrame(data)
    Y = pd.DataFrame(target)
    
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=120)
    
    model = DecisionTreeClassifier(max_depth=12, min_samples_split=10)
    model.fit(X_train, Y_train)
    
    Y_pred = model.predict(X_test)
    accuracy = accuracy_score(Y_test, Y_pred)
    
    new_data = [[gender, age, sleepDuration, physical, stressLevel, bmi, bloodPressure, heart, steps, sleepDisorder]]
    predictions = model.predict(new_data)
    
    predictions_list = predictions.tolist()
    
    response = jsonify({'result': {'person': dados, 'accuracy': accuracy, 'predictions': predictions_list}})
    
    return response

    # print(accuracy)
    # plot_tree(model)
    # confusion_matrix(Y_test, Y_pred)

@app.route('/hello')
def hello():
    return 'hello aaa'

if __name__ == '__main__':
    app.run(host='localhost', port=3030, debug=True)