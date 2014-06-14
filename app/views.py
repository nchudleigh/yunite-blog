from __future__ import absolute_import, print_function

from flask import render_template
from . import app


@app.route('/')
@app.route('/index')
def index():
    return send_file('index.html')