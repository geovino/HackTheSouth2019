from threading import Timer
from json import loads
from flask import Blueprint, request, jsonify
from flask.views import MethodView
from flask_socketio import Namespace, emit, broadcast
from database import Database


rooms_blueprint = Blueprint('rooms', __name__, url_prefix='/rooms')


class RoomsAPI(MethodView):

    def post(self):

        room = request.json

        if room is None:  # request body couldn't be parsed as JSON
            return jsonify({'title': 'Bad request', 'msg': 'Invalid input data for room creation.'}), 400

        room_identifier = Database.create_room(room)

        return jsonify({"identifier": room_identifier}), 201


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

        user_uuid, players_left = Database.create_player(user["room_id"], user["username"])

        emit("user_created", {"user_key": user_uuid}, json=True)
        broadcast.emit("players_count_changed", {"players_left": players_left}, json=True)

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
            broadcast.emit("asker_chosen", {"asker": Database.set_current_asker(room_id)}, json=True)
            genereated_question = Database.get_question(room_id)
            broadcast.emit("generated_question", {"question": genereated_question}, json=True)

    def on_choose_receiver(self, data):

        try:
            player = loads(data)
        except ValueError:
            emit("error", "Invalid input data when choosing a receiver")
            return

        room_id = player["room_id"]

        broadcast.emit("receiver_chosen", {"receiver": player["receiver"]}, json=True)

        Timer(30, self._timeout_callback, args=[Database.get_current_asker(room_id), player["receiver"], room_id]).start()

    def on_notify_response(self, data):

        try:
            response = loads(data)
        except ValueError:
            emit("error", "Invalid input data when notifying for satisfying answer.")
            return

        room_id = response["room_id"]
        next_asker = Database.get_next_asker(room_id)
        broadcast.emit("asker_chosen", {"asker": Database.set_current_asker(room_id)}, json=True)
        genereated_question = Database.get_question(room_id)

        if genereated_question is None:
            broadcast.emit("game_over", "")
        else:
            broadcast.emit("generated_question", {"question": genereated_question}, json=True)

    def _timeout_callback(self, asker, receiver, room_id):
        if asker == Database.get_current_asker(room_id):
            broadcast.emit("time_limit_exceeded", {"asker": asker, "receiver": receiver}, json=True)
