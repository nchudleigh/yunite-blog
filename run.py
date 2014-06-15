#!/usr/bin/python2.7

import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app
from flask.ext.script import Manager

manager = Manager(app)

if __name__ == "__main__":
    manager.run()
