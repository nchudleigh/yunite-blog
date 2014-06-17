#!/usr/bin/python2.7

import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app, db
from flask.ext.script import Manager, Server
from flask.ext.migrate import Migrate, MigrateCommand

app.secret_key="yes, I will be high because I have hella dank nug"
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)



"""Run the server"""
manager.add_command("dev", Server(
    use_debugger = True,
    use_reloader = True,
    host = '127.0.0.1',
    port = 5000
))

manager.add_command("prod", Server(
    use_debugger = False,
    use_reloader = False,
    host = '127.0.0.1',
    port = 5000
))


if __name__ == "__main__":
    manager.run()
