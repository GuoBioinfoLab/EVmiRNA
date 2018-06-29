from flask import Flask
from flask_restful import Api

app = Flask(__name__)

api = Api(app)

#app.debug = True
#app.config.from_object('EVmiRNA.settings')
app.config.from_pyfile('settings.py')

app.url_map.strict_slashes = False


import EVmiRNA.core
import EVmiRNA.controllers
import EVmiRNA.ajax

