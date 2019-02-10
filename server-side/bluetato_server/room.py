from threading import Timer
from json import loads
from flask import Blueprint, request, jsonify
from flask.views import MethodView
from flask_cors import CORS
from flask_socketio import Namespace, emit
from bluetato_server.database import Database


rooms_blueprint = Blueprint('rooms', __name__, url_prefix='/rooms')
CORS(rooms_blueprint)


class RoomsAPI(MethodView):

    def post(self):
        room = request.json
        if room is None:  # request body couldn't be parsed as JSON
            return jsonify({'title': 'Bad request', 'msg': 'Invalid input data for room creation.'}), 400

        room_identifier = Database.create_room(room["number_of_players"])

        return jsonify({"identifier": room_identifier}), 200

    def get(self):
        '''
        DEBUG ONLY
        '''

        rooms = Database.get_rooms_ids()

        return jsonify({"rooms_ids": rooms}), 201


rooms_blueprint.add_url_rule('/', view_func=RoomsAPI.as_view('api_rooms'))


class RoomsInstanceAPI(MethodView):

    def get(self, identifier):
        room_instance = Database.get_room(identifier)

        if room_instance is None:
            return jsonify({'title': 'Not found', 'msg': 'A room with the given identifier could not be found.'}), 404

        return jsonify({"room_capacity": room_instance["total_players"], "number_of_players": room_instance["current_players"]})


rooms_blueprint.add_url_rule('/<string:identifier>', view_func=RoomsInstanceAPI.as_view('api_rooms_instance'))


class RoomsNamespace(Namespace):

    def on_create_user(self, data):
        try:
            user = loads(data)
        except ValueError:
            emit("error", "Invalid input data when creating a user.")
            return

        user_uuid, players = Database.create_player(user["room_id"], user["username"], request.sid)

        if user_uuid is None:
            emit("error", "Invalid input data when creating a user.")

        emit("user_created", {"user_key": user_uuid}, json=True)
        emit("players_count_changed", players, json=True, broadcast=True)

    def on_create_question(self, data):

        try:
            question = loads(data)
        except ValueError:
            emit("error", "Invalid input data when creating a question.")
            return

        room_id = question["room_id"]

        questions_left = Database.player_enters_question(room_id, question["user_id"], question["question"])
        if questions_left == -1:
            emit("error", "Player has already submitted enough questions.")

        emit("question_created", {"questions_left": questions_left}, json=True)

        if Database.questions_ready(room_id):
            asker = Database.set_askers_order(room_id)
            self.choose_new_question_and_asker(room_id, asker=asker)

    def on_choose_receiver(self, data):

        try:
            player = loads(data)
        except ValueError:
            emit("error", "Invalid input data when choosing a receiver")
            return

        room_id = player["room_id"]
        receiver = player["receiver"]

        if Database.set_last_receiver(room_id, receiver) is None:
            emit("error", "Invalid input data when choosing receiver.")
            return

        emit("receiver_chosen", {"receiver": receiver}, json=True, broadcast=True)

        Timer(30, self._timeout_callback, args=[Database.get_current_asker(room_id), player["receiver"], room_id]).start()

    def on_notify_response(self, data):

        try:
            response = loads(data)
        except ValueError:
            emit("error", "Invalid input data when notifying for satisfying answer.")
            return

        room_id = response["room_id"]
        self.choose_new_question_and_asker(room_id)

    def _timeout_callback(self, asker, receiver, room_id):
        if asker == Database.get_current_asker(room_id):
            emit("time_limit_exceeded", {"asker": asker, "receiver": receiver}, json=True, broadcast=True)
            self.choose_new_question_and_asker(room_id)

    def choose_new_question_and_asker(self, room_id, asker=None):
        if asker is None:
            next_asker = Database.get_next_asker(room_id)
        else:
            next_asker = asker

        emit("asker_chosen", {"asker": next_asker}, json=True, broadcast=True)
        generated_question = Database.get_question(room_id)

        if generated_question is None:
            emit("game_over", "", broadcast=True)
        else:
            potential_receivers = Database.get_potential_receivers(room_id)
            emit("generated_question", {"question": generated_question, "potential_receivers": potential_receivers}, json=True, room=Database.get_session_id(room_id, next_asker))
