from threading import Timer
from flask import Blueprint, request, jsonify
from flask.views import MethodView
from database import create_room, get_room, create_player, create_question, get_current_player


rooms_blueprint = Blueprint('rooms', __name__, url_prefix='/rooms')


class RoomsAPI(MethodView):

    def post(self):

        room = request.json

        if room is None:  # request body couldn't be parsed as JSON
            return jsonify({'title': 'Bad request', 'msg': 'Invalid data was sent for room creation.'}), 400

        room_instance = create_room(room)

        return jsonify(room_instance.to_json()), 201


rooms_blueprint.add_url_rule('/', view_func=RoomsAPI.as_view('api_rooms'))


class RoomsInstanceAPI(MethodView):

    def get(self, identifier):

        room_instance = get_room(identifier)

        return jsonify(room_instance.to_json())

    def post(self, identifier):

        player = request.json

        if player is None:  # request body couldn't be parsed as JSON
            return jsonify({'msg': "Invalid data was sent for player registration."})

        player_instance, players_left = create_player(identifier, player)

        if player_instance == {}:
            return jsonify({'title': 'Bad request', 'msg': 'Invalid player data.'}), 400

        response = player_instance.to_json()
        response["players_left"] = players_left
        return jsonify(response), 201


rooms_blueprint.add_url_rule('/<string:identifier>', view_func=RoomsInstanceAPI.as_view('api_rooms_instance'))


class RoomsActiveInstanceAPI(MethodView):

    def post(self, identifier, info):

        data = request.json
        if data is None:  # request body couldn't be parsed as JSON
            return jsonify({'title': 'Bad request', 'msg': 'Invalid data was sent for active room.'}), 400

        if info not in {"question", "receiver", "response"}:
            return jsonify({'title': 'Not found', 'msg': 'URL not found'})

        dispatch_method = "_handle_{0}".format(info)

        return getattr(self, dispatch_method)(identifier, data)

    def _handle_question(self, identifier, question):

        # TODO check if player is allowed to post more questions
        questions_left = create_question(identifier, question)

        return jsonify({"questions_left": questions_left})

    def _handle_receiver(self, identifier):

        # TODO start timer

        current_asker = get_current_asker()

        Timer(30, self._timeout_callback, args=[current_asker]).start()

    def _handle_response(self, identifier):

        # TODO round ends choose another player

        pass

    def _timeout_callback(self, asker):

        if get_current_asker() != asker:
            return

        # TODO notify all players for timeout


rooms_blueprint.add_url_rule('/<string:identifier>/<string:info>', view_func=RoomsInstanceAPI.as_view('api_rooms_active_instance'))
