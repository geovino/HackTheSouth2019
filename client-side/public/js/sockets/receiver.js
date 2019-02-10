let receiver = {};

receiver.onAskerChosen = function(username, callback) {
    return socket.on('asker_chosen', function(msg) {
        return callback(username === msg.asker); // get asker template if true
    });

};

receiver.onGeneratedQuestion = function(callback) {
    return socket.on('receiver_chosen', function(msg) {
        return callback(msg.question, msg.potential_receivers);
    });
};

receiver.onQuestionCreated = function(callback) {
    return socket.on('question_created', function(msg) {
        return callback(msg.questions_left);
    });
};

receiver.onReceiverChosen = function(username, callback) {
    return socket.on('receiver_chosen', function(msg) {
        return callback(username === msg.receiver);
    });
};

receiver.onTimeLimitExceeded = function(username, callback) {
    return socket.on('time_limit_exceeded', function(msg) {
        
        if (username === msg.asker) {
            return callback({
                ASKER: true
            });
        } else if (username === msg.receiver) {
            return callback({
                RECEIVER: true
            });
        } else {
            return callback({
                SPECTATOR: true
            });
        }
    });
};

receiver.onUserCreated = function(callback) {
    return socket.on('user_created', function(msg) {
        return callback(msg.user_key, 3);
    });
};

receiver.players_count_changed = function(callback) {
    return socket.on('players_count_changed', function(msg) {
        return callback(msg.players_left);
    });
};

receiver.onGameOver = function(callback) {
    return socket.on('game_over', function(msg) {
        return callback();
    });
};