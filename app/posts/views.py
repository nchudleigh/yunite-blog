from __future__ import absolute_import, print_function

from flask import request, jsonify, send_file
from app import db
from flask.ext.login import current_user, login_required
from . import posts
from .models import Post
from datetime import datetime
import json


@posts.route('/', methods=['GET'])
def index():
    return json_util.dumps({
    'status': 200,
    'error': None,
    'result': {
      'message': 'Hello World'
      }
    }), 200


@posts.route('/manage/create_post', methods=['POST'])
@login_required
def create_post():

    data = json.loads(request.data)
    print(data)
    
    #data checking
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

    #valid data add to db
    post = Post(title=data['title'],body=data['body'],author=current_user)
    db.session.add(post)
    db.session.commit()
    
    
    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'message':'Post Successful!'
            }
        }),200

