from __future__ import absolute_import, print_function
from . import app
from flask import render_template, send_file
from flask.ext.login import login_required

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/manage')
@login_required
def manage():
    return render_template('manage.html')

@app.route('/login')
def login():
    return render_template('login.html')
