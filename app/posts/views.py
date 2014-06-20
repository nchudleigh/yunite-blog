from __future__ import absolute_import, print_function

from flask import request, jsonify, send_file
from app import db
from flask.ext.login import current_user, login_required
from . import posts
from .models import Post, PostSerializer
from datetime import datetime
import json

@posts.route('/api/posts/all')
def all_posts():

    all_posts = Post.query.order_by('-pub_date')
    posts = PostSerializer(all_posts, many=True).json

    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'data':posts,
            'message':'Success returning all posts! whats gucci!'
            }
        }),200

@posts.route('/manage/my_posts')
@login_required
def my_posts():

    my_posts = posts.query.filter_by(author=current_user)
    posts = PostSerializer(my_posts, many=True).json
    
    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'data':posts,
            'message':'Success returning your posts!'
            }
        }),200

@posts.route('/manage/create_post', methods=['POST'])
@login_required
def create_post():

    print (request.data)
    data = json.loads(request.data)
    
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



@posts.route('/manage/delete_post/<int:post_id>', methods=['POST'])
@login_required
def delete_post():

    post_id=request.args.get('post_id')

    try:
        post=Post.query.get(id=post_id, author=current_user)
        db.session.delete(post)
        db.session.commit()

    except:
        return jsonify({
            'status': 400,
            'error': 'No post found',
            'result': {
                'message': 'No post found.'
            }
        }), 400

    return jsonify({
        'status': 200,
        'error': None,
        'result':{
            'message':'Post deleted!'
            }
        }),200



@posts.route('/manage/edit_post/<int:post_id>', methods=['POST'])
@login_required
def edit_post():
    
    data=json_loads(request.data)
    post_id=request.args.get('post_id')
    title=data.get('title')
    body=data.get('body')
    
    try:
        post=Post.query.get(id=post_id, author=current_user)
    except:
        return jsonify({
            'status': 400,
            'error': 'No post found',
            'result': {
                'message': 'No post found.'
            }
        }), 400

    post.body=body

    return jsonify({
            'status': 200,
            'error': None,
            'result':{
                'message':'Post edited!'
                }
            }),200