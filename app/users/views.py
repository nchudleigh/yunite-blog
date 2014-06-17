from __future__ import absolute_import, print_function

from flask import request, jsonify
from app import db, login_manager
from flask.ext.login import login_user
from . import users
from .models import User
from datetime import datetime


@login_manager.user_loader
def load_user(user_email):
    return User.query.get(email=user_email)

@users.route('/login', methods=['POST'])
def login():
    data = request.data
    if data.get('email') is None:
        return jsonify({
            'status': 400,
            'error': 'No email was provided',
            'result': {
                'message': 'No email was provided.'
            }
        }), 400
    

    if data.get('password') is None:
        return jsonify({
            'status': 400,
            'error': 'No password was provided',
            'result': {
                'message': 'No password was provided.'
            }
        }), 400
    

    user = load_user(data['email'])

    if user == None:
        return jsonify({
            'status': 400,
            'error': 'No user matched the provided email',
            'result': {
                'message': 'No user matched the provided email'
            }
            }),400

    if user._check_password(data['password']):
        login_user(user, remember=True)
        return jsonify({
            'status':200,
            'error':None,
            'result': {
                'message':'Logged in Successfully'
                }
            }),200

