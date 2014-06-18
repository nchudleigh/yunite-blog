from __future__ import absolute_import, print_function

import json
from flask import request, jsonify, render_template
from app import db, login_manager
from flask.ext.login import login_user, logout_user
from . import users
from .models import User
from datetime import datetime


@login_manager.user_loader
def load_user(user_email):
    return User.query.filter_by(email=user_email).first()


@users.route('/manage/login', methods=['POST'])
def login():

    data = json.loads(request.data)
    
    if data.get('email') is None:
        return jsonify({
            'status': 400,
            'error': 'No email was provided',
            'result': {
                'message': 'No email was provided.'
            }
        }),400
    

    if data.get('pass') is None:
        return jsonify({
            'status': 400,
            'error': 'No password was provided',
            'result': {
                'message': 'No password was provided.'
            }
        }),400
    

    user = load_user(data['email'])

    if user == None:
        return jsonify({
            'status': 400,
            'error': 'No user matched the provided email',
            'result': {
                'message': 'No user matched the provided email'
            }
            }),400

    if user._check_password(data['pass']):
        login_user(user, remember=True)
        return jsonify({
            'status':200,
            'error':None,
            'result': {
                'message':'Logged in Successfully'
                }
            }),200

@users.route('/logout')
@login_required
def logout():
    
    logout_user()
    
    return jsonify({
            'status':200,
            'error':None,
            'result': {
                'message':'Logged out successfully'
                }
            }),200
