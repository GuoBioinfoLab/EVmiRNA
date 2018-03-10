from flask import render_template

from EVmiRNA import app


@app.route("/")
def index():
    print 1
    return render_template("index.html")
