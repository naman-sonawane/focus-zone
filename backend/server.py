print("server.py is running")

from flask import Flask, jsonify, request
from flask_cors import CORS

flaskApp = Flask(__name__)
CORS(flaskApp)

focused = ''
blocked = []

@flaskApp.route("/status", methods=['GET', 'POST'])
def checkStatus():
    global focused

    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response

    if request.method == 'GET':
        return {'stat':focused}
    
    if request.method == 'POST':
        req = request.json
        print(req)
        focused = req['status']
        return jsonify({'msg': 'Status recieved.'})
    
@flaskApp.route("/blocked", methods=['POST', 'GET'])
def checkBlocked():
    global blocked

    if request.method == 'POST':
        req = request.json
        print(req)
        blocked = req['blocked']
        return jsonify({'msg': 'Blocked websites recieved.'})

    if request.method == 'GET':
        return jsonify({'blocked':blocked})

if __name__ == "__main__":
    flaskApp.run(debug=True, port=2244)