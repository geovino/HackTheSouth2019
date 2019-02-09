import uuid
import random


DATABASE = {
    "rooms": {}
}


class Database:

    @staticmethod
    def generate_uid():
        return str(uuid.uuid4())
        # return '1'

    @staticmethod
    def create_room(number_of_players):

        id_ = ''
        while id_ == '' or id_ in DATABASE['rooms']:
            id_ = str(Database.generate_uid())

        room_value = {
            "players": {},
            "questions": [],
            "total_players": number_of_players,
            "current_players": 0,
            "questions_required": 3,
            "current_asker": -1,
        }

        DATABASE['rooms'][id_] = room_value

        return id_

    @staticmethod
    def get_room(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        return DATABASE['rooms'][room_id]

    @staticmethod
    def create_player(room_id, name):
        if room_id not in DATABASE['rooms']:
            return None, -1
        if name in DATABASE['rooms'][room_id]['players']:
            return None, -1

        id_ = Database.generate_uid()
        player_value = {
            "name": name,
            "questions_count": 0
        }

        DATABASE['rooms'][room_id]['players'][id_] = player_value

        DATABASE['rooms'][room_id]['current_players'] += 1

        return id_, DATABASE['rooms'][room_id]['total_players'] - DATABASE['rooms'][room_id]['current_players']

    @staticmethod
    def get_players(room_id):
        if room_id not in DATABASE['rooms']:
            return {}

        return DATABASE['rooms'][room_id]['players']

    @staticmethod
    def player_enters_question(room_id, player_id, question):
        player_id = str(player_id)
        if room_id not in DATABASE['rooms']:
            return -1
        if str(player_id) not in DATABASE['rooms'][room_id]['players']:
            return -1
        if DATABASE['rooms'][room_id]['players'][player_id]['questions_count'] >= DATABASE['rooms'][room_id]['questions_required']:
            return -1

        DATABASE['rooms'][room_id]['questions'].append(question)

        DATABASE['rooms'][room_id]['players'][player_id]['questions_count'] += 1

        return DATABASE['rooms'][room_id]['questions_required'] - DATABASE['rooms'][room_id]['players'][player_id]['questions_count']

    @staticmethod
    def questions_ready(room_id):
        return len(DATABASE["rooms"][room_id]["questions"]) == DATABASE["rooms"][room_id]["total_players"] * DATABASE["rooms"][room_id]["questions_required"]

    @staticmethod
    def set_current_asker(room_id):
        random_index = random.randint(1, DATABASE["rooms"][room_id]["total_players"]+1)
        asker = DATABASE["rooms"][room_id]["players"].items()[random_index][1]["name"]
        DATABASE["rooms"][room_id]["current_asker"] = asker
        return asker

    @staticmethod
    def get_current_asker(room_id):
        return DATABASE["rooms"][room_id]["current_asker"]

    @staticmethod
    def get_next_asker(room_id):
        pass

    @staticmethod
    def get_question(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        count = len(DATABASE['rooms'][room_id]['questions'])
        if count == 0:
            return None

        rnd_id = random.randrange(0, count)

        question = DATABASE['rooms'][room_id]['questions'][rnd_id]
        DATABASE['rooms'][room_id]['questions'].pop(rnd_id)

        return question
