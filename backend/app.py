from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})


with open('posts.json') as post_file:
    posts = json.load(post_file)[::-1]

@app.route('/api/posts', methods=['GET'])
def get_posts():
    start_index = int(request.args.get('startIndex', 0))
    batch_size = int(request.args.get('batchSize', 10))

    batch = posts[start_index:start_index + batch_size]
    return jsonify(batch)

if __name__ == '__main__':
    app.run(debug=True)
