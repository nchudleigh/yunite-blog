from __future__ import absolute_import, print_function

from flask import Blueprint

posts = Blueprint('posts', __name__)

from . import views
from . import models
