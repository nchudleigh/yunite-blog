from __future__ import absolute_import, print_function
from datetime import datetime
import functools, uuid, pbkdf2

from app import db

ROLE_USER=0
ROLE_ADMIN=1

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img=db.Column(db.String(255))
    email = db.Column(db.String(120), unique=True)
    role = db.Column(db.SmallInteger, default=ROLE_USER)
    created_at = db.Column(db.DateTime)
    salt = db.Column(db.String(50))
    pass_hash = db.Column(db.String(255))

    def __init__(self, password=None, **kwargs):
        self.email = kwargs['email']
        self.created_at=datetime.now()
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
