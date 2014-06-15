from __future__ import absolute_import, print_function

from flask import request, jsonify, send_file
from . import foo
from app import db
from app.models import 


@foo.route('/', methods=['GET'])
def index():
    return json_util.dumps({
    'status': 200,
    'error': None,
    'result': {
      'message': 'Hello World'
      }
    }), 200


@foo.route('/post', methods=["POST"])
def create_post():

    data = json_util.loads(request.data)

    if not data.get('title'): 
        return jsonify({
            'status': 400,
            'error': 'No title was provided',
            'result': {
                'message': 'No title was provided.'
            }
        }), 400
    

    if not data.get('body'): 
        return jsonify({
            'status': 400,
            'error': 'No body was provided',
            'result': {
                'message': 'No body was provided.'
            }
        }), 400
   


    

    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'message':'Post Successful'
            }
        }),200
