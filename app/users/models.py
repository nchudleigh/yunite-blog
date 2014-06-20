from __future__ import absolute_import, print_function
from time import time
import functools, uuid, pbkdf2
from marshmallow import Serializer, fields

from app import db

ROLE_USER=0
ROLE_ADMIN=1

default_img = '/static/dev/assets/avatars/default.jpg'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img=db.Column(db.String(255))
    email = db.Column(db.String(120), unique=True)
    first_name = db.Column(db.String(30))
    last_name = db.Column(db.String(30))
    role = db.Column(db.SmallInteger, default=ROLE_USER)
    created_at = db.Column(db.BigInteger)
    salt = db.Column(db.String(50))
    pass_hash = db.Column(db.String(255))

    def __init__(self, password=None, **kwargs):

        self.first_name = kwargs['first_name']
        self.last_name = kwargs['last_name']
        self.email = kwargs['email']
        self.img = kwargs['img']
        self.created_at=time()
        
        if self.img is None:
            self.img=default_img

        if password is not None:
            kwargs['salt'] = uuid.uuid4().__str__().replace('-','')
            kwargs['pass_hash'] = pbkdf2.crypt(password, kwargs['salt'],1000)

        super(User,self).__init__(**kwargs)    


    def __unicode__(self):
        return self.email

    def __repr__(self):
        return '<User %r>' % self.email

    def is_authenticated(self):
        return True

    def is_anonymous(self):
        return False

    def is_active(self):
        return True

    def get_id(self):
        return unicode(self.email)

    def _check_password(self, password):
        hash_check = pbkdf2.crypt(password, self.salt, 1000)
        if hash_check ==self.pass_hash:
            valid=True
        else:
            valid=False

        return valid

    def validate_user(self,password):
        p=self.check_password(password=password)
        if p:
            return True;
        else:
            return False;

    meta = {
            'allow_inheritance': True,
            'indexes': ['-created_at'],
            'ordering': ['-created_at']
            }


class UserSerializer(Serializer):
    id=fields.Integer()
    img=fields.String()
    email=fields.String()
    first_name=fields.String()
    last_name=fields.String()