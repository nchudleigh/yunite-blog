from __future__ import absolute_import, print_function
from flask.ext.migrate import Migrate, MigrateCommand

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager


# Create app and set db
app = Flask(__name__, static_folder='static/dev', static_url_path='')
app.config['SQLALCHEMY_DATABASE_URI']='postgresql+psycopg2://admin:database@192.168.1.169:5432/blog'
app.config['SEND_FILE_MAX_AGE_DEFAULT']=0
db = SQLAlchemy(app)
login_manager=LoginManager()
login_manager.init_app(app)

# Import blueprints from app
from app.posts import posts
from app.users import users

# Register all blueprints to the main app
app.register_blueprint(posts)
app.register_blueprint(users)

# Import main views from app
from app import views

#Set login bootback
login_manager.login_view ='login'
