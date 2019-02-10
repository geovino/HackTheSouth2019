let socket = io();
let receiver = {};

receiver.askerChosen = function(username, callback) {

    return socket.on('asker_chosen', function(stringifiedJSON) {
        msg = JSON.parse(stringifiedJSON);
        if (username === msg.asker) {
            return callback(true);
        } else {
            return callback(false);
        }
    });
};

receiver.generatedQuestion = function() {
    return socket.on('receiver_chosen', function(stringifiedJSON) {
        msg = JSON.parse(stringifiedJSON);
        
        return;
    })
}

