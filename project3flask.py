from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"


@app.route('/static/js/app.js')
def serve_js():
    return app.send_static_file('js/app.js')


@app.route('/data/geography.json')
def serve_json():
    return send_from_directory('data', 'geography.json')

@app.route('/data/filtered_vac.json')
def serve_vac():
    return send_from_directory('data', 'filtered_vac.json')

if __name__ == "__main__":
    app.run(debug=True)
