let socket = io();
let sender = {};

sender.createUser = function(roomId, username) {
    const msg = {
        room_id: roomId,
        username: username
    };

    return socket.emit('create_user', msg);
};

sender.createQuestion = function(question) {
    const msg = {
        question: question
    };

    return socket.emit('create_question', msg);
}

sender.chooseReceiver = function(roomId, username) {
    const msg = {
        room_id: roomId,
        username: username
    };

    return socket.emit('choose_receiver', msg);
}

sender.notifyResponse = function(roomId) {
    const msg = {
        room_id: roomId
    };

    return socket.emit('notify_response', msg)
}

