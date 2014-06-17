from __future__ import absolute_import, print_function

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

# Create app and set db
app = Flask(__name__, static_folder='static/dev', static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI']='postgresql+psycopg2://admin:database@localhost:5432/blog'
db = SQLAlchemy(app)

# Import blueprints from app
from app.foo import foo

# Register all blueprints to the main app
app.register_blueprint(foo, url_prefix="/api/foo")

# Import main views from app
from app import views

#import models from app
from app import models
