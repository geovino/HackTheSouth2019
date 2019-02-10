from flask import Flask
from flask_socketio import SocketIO
from bluetato_server.room import RoomsNamespace, rooms_blueprint


app_instance = Flask(__name__)
app_instance.register_blueprint(rooms_blueprint)
app_instance.config['CORS_HEADER'] = 'Content-Type'

socketio = SocketIO(app_instance, async_handlers=True)
socketio.on_namespace(RoomsNamespace('/'))
