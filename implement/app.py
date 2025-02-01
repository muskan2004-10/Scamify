from flask import Flask, jsonify, request, send_from_directory
import os

app = Flask(__name__, static_folder='../frontend/build')

@app.route('/api/predict', methods=['GET','POST'])
def predict():
    if request.method == 'GET':
        return jsonify({"message": "Use POST with JSON data to get predictions."})
    
    if request.method == 'POST':
        # Attempt to parse JSON data from the request
        try:
            data = request.get_json()
            # Process the data (this is just an example)
            if data:
                return jsonify({"message": "Prediction received!", "data": data})
            else:
                return jsonify({"error": "No JSON data provided"}), 400
        except Exception as e:
            return jsonify({"error": f"Invalid JSON: {str(e)}"}), 400

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
