from flask import Flask, jsonify, request, Response
from flask_cors import CORS

import time

app = Flask(__name__)
CORS(app)

posts_list = [{
    "author": "A Aaronson",
    "postBody": "Lorem Ipsum",
    "id": 1
},
    {
    "author": "B Bartholemew",
    "postBody": "Lorem Ipsum",
    "id": 2
}
]


@app.route('/')
def index():
    return jsonify({'data': [1, 2, 3]})


@app.route('/posts', methods=["GET", "POST"])
def posts():
    if request.method == 'GET':
        print("Get request received")
        time.sleep(5)
        return jsonify(posts_list)
    if request.method == "POST":
        print("Post request received")
        posts_list.append(request.get_json())
        return Response(status=201)
    breakpoint()


if __name__ == '__main__':
    app.run(debug=True)
