from __future__ import absolute_import, print_function

from bson import json_util, objectid
from flask import request, jsonify, send_file
from . import foo
from app import db


@foo.route('/', methods=['GET'])
def index():
    return json_util.dumps({
    'status': 200,
    'error': None,
    'result': {
      'message': 'Hello World'
      }
    }), 200

