from datetime import datetime
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80))
    body = db.Column(db.Text)
    pub_date = db.Column(db.DateTime)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = db.relationship('User',backref=db.backref('posts',lazy='dynamic'))

    def __init__(self, title, body, user, pub_date=None):
        self.title=title
        self.body=body
        if pub_date is None:
            pub_date = datetime.utcnow()
        self.pub_date = pub_date
        self.user = user

    def __repr__(self):
        return '<Post %r>' % self.title


