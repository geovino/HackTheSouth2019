from flask import Flask
from room import rooms_blueprint

app_instance = Flask(__name__)
app_instance.register_blueprint(rooms_blueprint)
