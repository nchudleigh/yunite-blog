from __future__ import absolute_import, print_function

from flask import Blueprint

foo = Blueprint('foo', __name__)

from . import views
