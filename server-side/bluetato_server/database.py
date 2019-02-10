import uuid
import random


DATABASE = {
    "rooms": {}
}


class Database:

    @staticmethod
    def generate_uid():
        return str(uuid.uuid4())
        #return '1'

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
            "questions_required": 3,
            "current_asker": None,
            "last_receiver": None
        }

        DATABASE['rooms'][id_] = room_value
        print("room created")
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

        DATABASE['rooms'].pop(room_id)

        return 0

    # ------------------ ROOM END ----------------------

    # ------------------ PLAYER ----------------------
    @staticmethod
    def create_player(room_id, name, session_id):
        if room_id not in DATABASE['rooms']:
            print("room id not in database ", room_id)
            return None, -1

        if len(DATABASE['rooms'][room_id]['players']) >= DATABASE['rooms'][room_id]['total_players']:
            print("more players than required")
            return None, -1

        for pl in DATABASE['rooms'][room_id]['players']:
            if DATABASE['rooms'][room_id]['players'][pl]['name'] == name:
                return None, -1

        id_ = Database.generate_uid()
        player_value = {
            "name": name,
            "questions_count": 0,
            "session_id": session_id
        }

        DATABASE['rooms'][room_id]['players'][id_] = player_value

        players = Database.get_updated_players(room_id)
        return id_, players

    @staticmethod
    def get_updated_players(room_id):
        players = [{"questions_count": player["questions_count"], "player_name": player["name"]} for player in DATABASE["rooms"][room_id]["players"].values()]
        return players

    @staticmethod
    def delete_player(room_id, name):
        if room_id not in DATABASE['rooms']:
            return None

        for pl in DATABASE['rooms'][room_id]['players']:
            if DATABASE['rooms'][room_id]['players'][pl]['name'] == name:
                DATABASE['rooms'][room_id]['last_receiver'] = pl

                DATABASE['rooms'][room_id]['players'].pop(pl)

                Database.set_askers_order(room_id)

                return 0

        return None

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
            print("room id is not recognised", room_id)
            return -1
        if player_id not in DATABASE['rooms'][room_id]['players']:
            print("player_id not found ", player_id)
            return -1
        if DATABASE['rooms'][room_id]['players'][player_id]['questions_count'] >= DATABASE['rooms'][room_id]['questions_required']:
            return -1

        DATABASE['rooms'][room_id]['questions'].append(question)

        DATABASE['rooms'][room_id]['players'][player_id]['questions_count'] += 1

        return DATABASE['rooms'][room_id]['questions_required'] - DATABASE['rooms'][room_id]['players'][player_id]['questions_count']

    @staticmethod
    def get_players(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        return DATABASE['rooms'][room_id]['players']

    # ------------------ PLAYER END ----------------------

    # ------------------ ASKER ----------------------
    @staticmethod
    def set_askers_order(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        players = list(DATABASE["rooms"][room_id]["players"].keys())

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
    def set_last_receiver(room_id, name):
        if room_id not in DATABASE['rooms']:
            return None

        for pl in DATABASE['rooms'][room_id]['players']:
            if DATABASE['rooms'][room_id]['players'][pl] == name:
                DATABASE['rooms'][room_id]['last_receiver'] = pl
                return 0

        return None

    @staticmethod
    def get_potential_receivers(room_id):
        if room_id not in DATABASE['rooms']:
            return None

        players = DATABASE["rooms"][room_id]["players"].keys()

        last_receiver = DATABASE["rooms"][room_id]["last_receiver"]
        asker = Database.get_current_asker(room_id)

        if last_receiver in players:
            players.remove(last_receiver)
        else:
            print("RECEIVER shit")
            return None, "SHIT - serious logic error"

        if asker in players:
            players.remove(asker)
        else:
            print("ASKER shit")
            return None, "SHIT - serious logic error"

        return 0

    # ------------------ QUESTIONS END ----------------------

    # ------------------ QUESTIONS ----------------------
    @staticmethod
    def questions_ready(room_id):
        print("questions ready ?")
        print(room_id) 
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


    # ------------------ TESTING ----------------------
    def get():
        return DATABASE


    def get_rooms_ids():
        return list(DATABASE['rooms'].keys())

    # ------------------ TESTING END ----------------------

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
