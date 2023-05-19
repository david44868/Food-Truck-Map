from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://food-truck-map-five.vercel.app/"}})

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/food_trucks', methods = ['GET','POST'])
def food_trucks():
    response = requests.get('https://data.sfgov.org/resource/rqzj-sfat.json').json()
    trucks = []
    for truck in response:
        if 'location' in truck:
            location = truck['location']
        if 'applicant' in truck:
            applicant = truck['applicant']
        if 'fooditems' in truck:
            food_items = truck['fooditems']
        else:
            food_items = "N/A"
        if 'address' in truck:
            address = truck['address']
        if 'status' in truck:
            status = truck['status']
        column = {
            "location": location,
            "applicant": applicant,
            "food_items": food_items,
            "address": address,
            "status": status
        }
        trucks.append(column)
    return jsonify(trucks)

if __name__ == '__main__':
    app.run(debug=True)