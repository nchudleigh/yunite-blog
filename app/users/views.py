from __future__ import absolute_import, print_function

import json
from flask import request, jsonify, render_template
from app import db, login_manager
from flask.ext.login import login_user, logout_user, login_required, current_user
from . import users
from .models import User, UserSerializer
from datetime import datetime

admin_pass='l0nGh4rDWh4l3w1LLy'

@users.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = UserSerializer(User.query.get(id=user_id)).json

    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'data':user,
            'message':'Success returning a user'
            }
        }),200

@users.route('/manage/register', methods=['POST'])
def create_user():
    
    data = json.loads(request.data)

    first_name=data.get('first_name')
    last_name=data.get('last_name')
    email=data.get('email')
    wpass=data.get('pass')
    cpass=data.get('cpass')
    code=data.get('code')
    img=data.get('img')

    if None in (first_name,last_name,email,wpass,cpass,code,img):
        return jsonify({
            'status': 400,
            'error': 'A field was empty!',
            'result': {
                'message': 'A field was empty!'
            }
        }),400

    if not code==admin_pass:
        return jsonify({
            'status': 400,
            'error': 'Code was incorrect!',
            'result': {
                'message': 'Code was incorrect!'
            }
        }),400

    if not cpass==wpass:
        return jsonify({
            'status': 400,
            'error': 'Passwords didnt match!',
            'result': {
                'message': 'Passwords didnt match!'
            }
        }),400

    new_user=User(password=wpass,email=email,last_name=last_name,first_name=first_name, img=img)
    db.session.add(new_user)
    db.session.commit()
    user=load_user(email)
    login_user(user, remember=True)

    return jsonify({
        'status':200,
        'error':None,
        'result': {
            'message':'Logged in Successfully'
            }
    }),200

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

@users.route('/manage/logout')
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
