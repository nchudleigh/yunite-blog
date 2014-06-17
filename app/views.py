from __future__ import absolute_import, print_function

from flask import render_template, send_file
from . import app


@app.route('/')
@app.route('/index')
def index():
    return send_file('templates/index.html')