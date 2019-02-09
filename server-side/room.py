from flask import Blueprint, request, jsonify
from flask.views import MethodView
from database import create_room, get_room, create_user, create_question

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

        user = request.json

        if user is None:  # request body couldn't be parsed as JSON
            return jsonify({'msg': "Invalid data was sent for user registration."})

        user_instance = register_user(identifier, user)

        if user_instance == {}:
            return jsonify({'title': 'Bad request', 'msg': 'Invalid user data.'}), 400

        return jsonify(user_instance.to_json()), 201


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

        # TODO check if user is allowed to post more questions
        questions_left = create_question(identifier, question)

        return jsonify({"questions_left": questions_left})

    def _handle_receiver(self, identifier):

        # TODO start timer

        pass

    def _handle_response(self, identifier):

        # TODO round ends choose another user

        pass


rooms_blueprint.add_url_rule('/<string:identifier>/<string:info>', view_func=RoomsInstanceAPI.as_view('api_rooms_active_instance'))
