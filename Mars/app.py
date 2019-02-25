from flask import Flask, render_template, redirect, request
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/craigslist_app"
mongo = PyMongo(app)


@app.route("/")
def index():
    mars_all = mongo.db.mars_all.find_one()
    return render_template("index.html", mars_all=mars_all)

@app.route("/scrape")
def scraper():
    mars_all = mongo.db.mars_all
    mars_data = scrape_mars.scrape()
    mars_all.update({}, mars_data, upsert=True)
    return redirect("/", code=302)

@app.route('/shutdown')
def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    return 'Shutting down Flask server...'

if __name__ == "__main__":
    app.run(debug=True)