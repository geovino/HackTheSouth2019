let socket = io();
let sender = {};

sender.createUser = function(roomId, username) {
    const msg = {
        room_id: roomId,
        username: username
    };

    return socket.emit('create_user', JSON.stringify(msg));
};

sender.createQuestion = function(question) {
    const msg = {
        question: question
    };

    return socket.emit('create_question', JSON.stringify(msg));
}

sender.chooseReceiver = function(roomId, username) {
    const msg = {
        room_id: roomId,
        username: username
    };

    return socket.emit('choose_receiver', JSON.stringify(msg));
}

sender.notifyResponse = function(roomId) {
    const msg = {
        room_id: roomId
    };

    return socket.emit('notify_response', JSON.stringify(msg))
}

