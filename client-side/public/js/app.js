(function($) {
    'use strict';

    const state = {
      name: null,
      userId: null,
      questions: [],
      questionCount: 0,
      gameStarted: false, // VERY IMPORTANT WHEN RECEIVING asker_chosen EVENT
      players: [],
      asker: {},
      roomid: null,
      receiver: {},
      gameOver: false,
    };

    window.addEventListener('load', () => {
        const el = $('#app');

        // console.log(templates['asking_question.handlebars'] === undefined);
        // console.log(templates['choose_receiver.handlebars'] === undefined);
        // console.log(templates['enter_questions.handlebars'] === undefined);
        // console.log(templates['receiving_question.handlebars'] === undefined);
        // console.log(templates['see_asker.handlebars'] === undefined);
        // console.log(templates['spectating.handlebars'] === undefined);
        // console.log(templates['waiting_room.handlebars'] === undefined);


        // Compile Handlebar Templates
        const askingQuestion = Handlebars.compile(templates['asking_question.handlebars']);
        const chooseReceiver = Handlebars.compile(templates['choose_receiver.handlebars']);
        const enterQuestion = Handlebars.compile(templates['enter_questions.handlebars']);
        const receivingQuestion = Handlebars.compile(templates['receiving_question.handlebars']);
        const seeAsker = Handlebars.compile(templates['see_asker.handlebars']);
        const spectating = Handlebars.compile(templates['spectating.handlebars']);
        const waitingRoom = Handlebars.compile(templates['waiting_room.handlebars']);
        const enterName = Handlebars.compile(templates['enter_name.handlebars']);
        const roomCreated = Handlebars.compile(templates['room_created.handlebars']);
        const lobby = Handlebars.compile(templates['lobby.handlebars']);

        const html = lobby();
        el.html(html);

        const router = new Router({
          mode: 'history'
          // page404: (path) => {
          //   const html = errorTemplate({
          //     color: 'yellow',
          //     title: 'Error 404 - Page NOT Found!',
          //     message: `The path '/${path}' does not exist on this site`,
          //   });
          //   el.html(html);
          // },
        });

        router.add('/', () => {
          let html = lobby();
          el.html(html);

          $("#create-room").on("click", function(event) {
            $.ajax({
                type: "post",
                contentType: "application/json",
                url: "http://3.8.68.131:8080/rooms/",
                data: JSON.stringify({ 'number_of_players': 2 }),
                dataType: "json",
                crossDomain: true,
                success: function(data) {
                  $("#link-present").removeClass("hidden");
                  $("#create-room").addClass("hidden");
                  $("#link-display").text(data["identifier"]);
                  $("#link-display").attr("href", "/" + data["identifier"] + "/enter_name");
                }
              })
          });

          $("#join-room").on("click", function(event) {
            var room_id = $("#code-input").val();
            console.log(room_id);
            router.navigateTo(room_id + "/enter_name");
          });
        });


        var playerDisplayTemplate = Handlebars.compile('<div class="player-display col-12">{{player_name}} is <span class="highlight">{{displayStatus}}</span>.</div><br>')

        router.add('/{roomid}/waiting_room', (roomid) => {
          let html = waitingRoom({
            players: state.players,
            players_count: state.players.length
          });
          el.html(html);
        });


        router.add('{roomid}/room_created', (roomid) => {
          let html = roomCreated({
            theurl: "https://www.w3schools.com/css/css_form.asp"
          });
          el.html(html);
        });

        router.add('{roomid}/asking_question', (roomid) => {
          let html = askingQuestion({
            question: "Ask someone ~this"
          });
          el.html(html);

          receiver.onGeneratedQuestion((question, potentialReceivers) => {
              state.asker.question = question;
              state.asker.potentialReceivers = potentialReceivers;
          });

          // click button for satisfy or wait for time limit
          sender.notifyResponse(roomid);

          receiver.onTimeLimitExceeded(username, (role) => {
            if (state.gameStarted) {
                state.asker = {
                  asker: null,
                  receiver: null,
                  question: null,
                  potentialReceivers: []
                }
            }
          });

          receiver.onAskerChosen(state.name, (asker) => {
              if (state.name === asker) {
                  state.asker.asker = state.name;
                  router.navigateTo('/' + roomid + '/choose_receiver');
              } else {
                  state.asker.asker = asker;
                  router.navigateTo('/' + roomid + '/see_asker');
              }
          });

          receiver.onGameOver(() => {
            router.navigateTo('/game_over');
          });
        });

        router.add('{roomid}/enter_name', (roomid) => {
          let html = enterName();
          el.html(html);

          state.roomid = roomid;

          $('.nameButton').on('click', function(event) {
            let $realnameElem = $('.realname');
            if ($realnameElem.length == 1 && $realnameElem[0].value) {
              state.name = $realnameElem[0].value;
              sender.createUser(roomid, state.name);
            }
          });

        });

        router.add('{roomid}/choose_receiver', (roomid) => {
          // Get names
          let html = chooseReceiver({
            people: [
              {
                name: "Niki the smart guy"
              },
              {
                name: "Ivo (The BOSS) Mladenov"
              },
              {
                name: "Timmy"
              }
            ]
          });
          el.html(html);
          $('.userButton').each(function(roomid) {
            $(this).on('click', function(event) {
              let $elem = $(this);
              let receiver = null;
              if ($elem.length == 1 && $elem[0].textContent) {
                receiver = $elem[0].textContent;
              }

              sender.chooseReceiver(roomid, receiver);
              state.asker.receiver = receiver;
              // At that time a receiver is known, so redirect
              router.navigateTo('/' + roomid + '/asking_question');
              return receiver; // name of the receiver
            });
          });
        });

        router.add('{roomid}/enter_questions', (roomid) => {
          let html = enterQuestion({
            questions: [1, 2, 3]
          });
          el.html(html);

          $('.questionButton').on('click', function(event) {

            let $questionText = $('#questionArea').val();
            if ($questionText.length !== 0) {
              state.questions.push($questionText);

              //set the number of answered questions in template -- does not work
              $('#questionsDone').text(state.questions.length + "/" + state.questionCount);
              console.log(state); 

            }

            if (state.questionCount - state.questions.length === 0) {
              router.navigateTo('/' + roomid + '/waiting_room');
            }

            sender.createQuestion(roomid, state.userId, $questionText);

            //clear the text area
            $('#questionArea').val('');
          });

          // let html = enterQuestion({
            //change this to the three questions


            // questions: [1, 2, 3]
          // });
          // el.html(html);

          let input = {
            name: state.player,
            questions: []
          };

          $('.readyButton').on('click', function() {
            let $questionsElem = $('.userQuestion');

            $questionsElem.each(function(index) {
              input.questions[index] = $(this)[0].value;
            });

            console.log(input);

            state.player = input.name;
            console.log(state);
            // At that time a receiver is known, so redirect
            router.navigateTo('/' + roomid + '/waiting_room');
            return input; // name of the receiver
          });
        });

        router.add('{roomid}/receiving_question', (roomid) => {
          let html = receivingQuestion();
          el.html(html);

          receiver.onAskerChosen(state.name, (asker) => {
            if (state.name === asker) {
                state.asker.asker = state.name;
                router.navigateTo('/' + roomid + '/choose_receiver');
            } else {
                state.asker.asker = asker;
                router.navigateTo('/' + roomid + '/see_asker');
            }
          });

          receiver.onGameOver(() => {
            router.navigateTo('/game_over');
          });
        });

        router.add('{roomid}/see_asker', (roomid) => {
          let html = seeAsker({
            asker: state.asker.asker
          });
          el.html(html);

          receiver.onReceiverChosen((receiver) => {
            if (state.name === receiver) {
              state.asker.receiver = state.name
              router.navigateTo('/' + roomid + '/asking_question');
            } else if (state.name !== state.asker.asker) {
              state.asker.receiver = receiver;
              router.navigateTo('/' + roomid + '/spectating');
            }
          });

        });

        router.add('{roomid}/spectating', (roomid) => {
          let html = spectating();
          el.html(html);

          receiver.onAskerChosen(state.name, (asker) => {
            if (state.name === asker) {
                state.asker.asker = state.name;
                router.navigateTo('/' + roomid + '/choose_receiver');
            } else {
                state.asker.asker = asker;
                router.navigateTo('/' + roomid + '/see_asker');
            }
          });

          receiver.onGameOver(() => {
            router.navigateTo('/game_over');
          });
        });

        receiver.onUserCreated((userId, numQuestions) => {
          console.log('event received for user created');
          state.questionCount = numQuestions;
          state.userId = userId;
          router.navigateTo('/' + state.roomid + '/enter_questions');
        });

        receiver.onPlayersCountChanged((msg) => {
          state.players = msg;
          console.log(msg);
          if ($("#player-listing") !== undefined) {
            $("#player-listing").empty();
            
            msg.forEach((player) => {
              console.log(player);
              player.displayStatus = player.questions_count === 3 ? "ready" : "still thinking";
              $("#player-listing").append(playerDisplayTemplate({
                player_name: player.player_name,
                displayStatus: player.displayStatus
              }));
            });
          }
        });

        receiver.onAskerChosen(state.name, (asker) => {
          state.gameStarted = true;
            if (state.userId === asker) {
                state.asker.asker = state.userId;
                router.navigateTo('/' + state.roomid + '/choose_receiver');
            } else {
                state.asker.asker = asker;
                router.navigateTo('/' + state.roomid + '/see_asker');
            }
        });


        // Navigate app to current url
        router.navigateTo(window.location.pathname);

         // Highlight Active Menu on Refresh/Page Reload
        const link = $(`a[href$='${window.location.pathname}']`);
        link.addClass('active');

        $('a').on('click', (event) => {
          // Block browser page load
          event.preventDefault();

          // Highlight Active Menu on Click
          const target = $(event.target);
          $('.item').removeClass('active');
          target.addClass('active');

          // Navigate to clicked url
          const href = target.attr('href');
          const path = href.substr(href.indexOf('/'));
          router.navigateTo(path);
        });
        // console.log('nice');

        function onJoinRoom() {
          router.navigateTo('/enter_questions');
        }

        function deleteAskerData() {
          state.asker = {
            question: null,
            potentialReceivers: []
          };
        }

        function onQuestionEntered() {
          console.log("asdfas");

          // let html = enterQuestion();
          // el.html(html);

          // $('.questionButton').on('click', function(event) {
          //   console.log(event);
          //   let $questionText = $('.questionArea');
          //   console.log($questionText);
            // if ($realnameElem.length == 1 && $realnameElem[0].value) {
            //   state.name = $realnameElem[0].value;
            // }
            // console.log(state);
          // });
        }

        function onReady() {
          router.navigateTo('/waiting_room');
        }
    });

})(jQuery);
