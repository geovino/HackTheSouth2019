import uuid, random


DATABASE = {
    "rooms":{}
}

class Database:

    @staticmethod
    def generate_uid():
        return str(uuid.uuid4())
        # return '1'

    @staticmethod
    def create_room(number_of_players):

        id = ''
        while id == '' or id in DATABASE['rooms']:
            id = str(Database.generate_uid())

        room_value = {
            "players":{},
            "questions":[],
            "total_players":number_of_players,
            "current_players":0,
            "questions_required":3,
            "current_asker":-1,
        }

        DATABASE['rooms'][id] = room_value

        return {id: room_value}

    def get_room(room_id):
        if room_id not in DATABASE['rooms']:
            return {}

        return DATABASE['rooms'][room_id]

    def create_player(room_id, name):
        if room_id not in DATABASE['rooms']:
            return {}, -1
        if name in DATABASE['rooms'][room_id]['players']:
            return {}, -1

        id = Database.generate_uid()
        player_value = {
            "name": name,
            "questions_count": 0
        }

        DATABASE['rooms'][room_id]['players'][id] = player_value

        DATABASE['rooms'][room_id]['current_players'] += 1

        return {id:DATABASE['rooms'][room_id]['players'][id]}, DATABASE['rooms'][room_id]['total_players'] - DATABASE['rooms'][room_id]['current_players']


    def get_players(room_id):
        if room_id not in DATABASE['rooms']:
            return {}

        return DATABASE['rooms'][room_id]['players']

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

    def get_question(room_id):
        if room_id not in DATABASE['rooms']:
            return -1

        count = len(DATABASE['rooms'][room_id]['questions'])
        rnd_id = random.randrange(0,count)

        print (count)
        print (rnd_id)
        print (DATABASE['rooms'][room_id]['questions'])

        question = DATABASE['rooms'][room_id]['questions'][rnd_id]
        DATABASE['rooms'][room_id]['questions'].pop(rnd_id)

        return question


    def get():
        return DATABASE


# print(Database.create_room(4))
# print(Database.create_player('1','a'))
# print(Database.player_enters_question('1','1','a'))
# print(Database.player_enters_question('1','1','b'))
# print(Database.player_enters_question('1','1','c'))
# print(Database.get_question('1'))
# print(Database.get())


# -----------------------------------------------------------------
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
