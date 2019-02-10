
from bluetato_server.database import Database

room_id = '1'
print("CREATE ", Database.create_room(3))

user_id = 'id1'
session_id = 's1'
name = 'A'
print("+-> ",Database.create_player(room_id,name,session_id,user_id))
print("Adding questions")
print(Database.player_enters_question(room_id,user_id,'Qa'))
print(Database.player_enters_question(room_id,user_id,'Qb'))
print(Database.player_enters_question(room_id,user_id,'Qc'))
print("Ending questions")
print("SessionId ", Database.get_session_id(room_id,'1'))


user_id = 'id2'
session_id = 's2'
name = 'B'
print("+-> ",Database.create_player(room_id,name,session_id,user_id))
print("Adding questions")
print(Database.player_enters_question(room_id,user_id,'Qd'))
print(Database.player_enters_question(room_id,user_id,'Qe'))
print(Database.player_enters_question(room_id,user_id,'Qf'))
print("Ending questions")


user_id = 'id3'
session_id = 's3'
name = 'C'
print("+-> ",Database.create_player(room_id,name,session_id,user_id))

user_id = 'id4'
session_id = 's4'
name = 'D'
print("+-> ",Database.create_player(room_id,name,session_id,user_id))

print ("Setting askers order")
print (Database.set_askers_order(room_id))
print ("Current asker - " + Database.get_current_asker(room_id))
print ("Current asker - " + Database.get_current_asker(room_id))

print ("Next asker set - " + Database.get_next_asker(room_id))
print ("Current asker - " + Database.get_current_asker(room_id))
print ("Next asker set - " + Database.get_next_asker(room_id))
print ("Next asker set - " + Database.get_next_asker(room_id))
print ("Next asker set - " + Database.get_next_asker(room_id))


print ("Set last receiver", Database.set_last_receiver(room_id,'B'))
print ("Poten receiv", Database.get_potential_receivers(room_id))

print ("Set last receiver", Database.set_last_receiver(room_id,'X'))
print ("Set last receiver", Database.set_last_receiver(-1,'B'))
print ("Poten receiv", Database.get_potential_receivers(-1))


print ("PL: ",Database.get_players(room_id))
print ("Del player", Database.delete_player(room_id, 'A'))
print(Database.get())

print ("Room Ids: ", Database.get_room_ids())
print("Del room", Database.delete_room(room_id))
print(Database.get())
