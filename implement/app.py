from flask import Flask, jsonify, request, send_from_directory
import os

app = Flask(__name__, static_folder='../frontend/build')

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Process the data and make predictions
    result = {'prediction': 'example_result'}
    return jsonify(result)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
