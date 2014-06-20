from app.users.models import User
from time import time
from app import db
from marshmallow import Serializer, fields
from app.users.models import UserSerializer

class Post(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    body = db.Column(db.Text)
    pub_date = db.Column(db.BigInteger)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User',backref=db.backref('posts',lazy='dynamic'))

    def __init__(self, title, body, author, pub_date=None):
        self.title=title
        self.body=body
        if pub_date is None:
            pub_date = time()*1000
        self.pub_date = pub_date
        self.author = author

    def __repr__(self):
        return '<Post %r>' % self.title

class PostSerializer(Serializer):
    id=fields.Integer()
    title=fields.String()
    body=fields.String()
    pub_date=fields.Integer()
    author=fields.Nested(UserSerializer)