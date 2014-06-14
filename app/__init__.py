from __future__ import absolute_import, print_function

from pymongo import Connection
from flask import Flask, render_template, g, request


# Create app
app = Flask(__name__, static_folder='static/dev', static_url_path='')

# Connect to then select database
db_conn = Connection(host="mongodb://localhost")
db = db_conn['boilerplate_database']

# Import blueprints from app
from app.foo import foo

# Register all blueprints to the main app
app.register_blueprint(foo, url_prefix="/api/foo")

# Import main views from app
from app import views
