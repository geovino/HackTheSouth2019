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

    # ------------------ ROOM ----------------------
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
            "current_asker": None,
        }

        DATABASE['rooms'][id_] = room_value

        return id_

    @staticmethod
    def get_room(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        return DATABASE['rooms'][room_id]

    @staticmethod
    def delete_room(room_id):
        if room_id not in DATABASE['rooms']:
            return -1

        del DATABASE['rooms'][room_id];

        return 0

    # ------------------ ROOM END ----------------------

    # ------------------ PLAYER ----------------------
    @staticmethod
    def create_player(room_id, name, session_id):
        if room_id not in DATABASE['rooms']:
            return None, -1

        for pl in DATABASE['rooms'][room_id]['players']:
            if pl['name'] == name:
                return None, -1

        id_ = Database.generate_uid()
        player_value = {
            "name": name,
            "questions_count": 0,
            "session_id": session_id
        }

        DATABASE['rooms'][room_id]['players'][id_] = player_value

        DATABASE['rooms'][room_id]['current_players'] += 1

        return id_, DATABASE['rooms'][room_id]['total_players'] - DATABASE['rooms'][room_id]['current_players']

    @staticmethod
    def get_players(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        return DATABASE['rooms'][room_id]['players']

    @staticmethod
    def get_session_id(room_id, player_id):
        if room_id not in DATABASE['rooms']:
            return None
        if player_id not in DATABASE['rooms'][room_id]['players']:
            return None

        return DATABASE['rooms'][room_id]['players'][player_id]['session_id']

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

    # ------------------ PLAYER END ----------------------

    # ------------------ ASKER ----------------------
    @staticmethod
    def set_askers_order(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        players = DATABASE["rooms"][room_id]["players"].keys()

        random.shuffle(players)

        DATABASE["rooms"][room_id]['asker_queue'] = players

        return Database.get_current_asker(room_id)

    @staticmethod
    def get_current_asker(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        return DATABASE["rooms"][room_id]["asker_queue"][0]

    @staticmethod
    def get_next_asker(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        queue = DATABASE["rooms"][room_id]["asker_queue"]
        first = queue[0]
        for i in range(1, len(queue)):
            queue[i-1] = queue[i]
        queue[-1] = first

        return Database.get_current_asker(room_id)

    # ------------------ ASKER END ----------------------

    # ------------------ QUESTIONS ----------------------
    @staticmethod
    def questions_ready(room_id):
        return len(DATABASE["rooms"][room_id]["questions"]) == DATABASE["rooms"][room_id]["total_players"] * DATABASE["rooms"][room_id]["questions_required"]

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

    # ------------------ QUESTIONS END ----------------------


    def get():
        return DATABASE


print(Database.create_room(4))
print(Database.create_player('1','a','a1'))
print(Database.player_enters_question('1','1','a'))
print(Database.player_enters_question('1','1','b'))
print(Database.player_enters_question('1','1','c'))
print(Database.get_session_id('1','1'))
print(Database.get_question('1'))
print(Database.get())


    # @staticmethod
    # def get_fields(room_number, fields):
        # client = pymongo.MongoClient(
        #     config.MONGODB_CONFIG['URL'])

        # db = client.pymongo_test
        # fields_obj = {}

        # for x in fields:
        #     fields_obj[x] = 1

        # result = db.rooms.find({'_id': room_number}, fields_obj)



        # return result