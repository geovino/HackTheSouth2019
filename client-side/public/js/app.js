(function($) {
    'use strict';

    const state = {
      name: null,
      questions: []
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
        });

        router.add('/waiting_room', () => {
          let html = waitingRoom({
            users: [
              {
                name: "Person1",
                displayStatus: "ready"
              },
              {
                name: "Person2",
                displayStatus: "still thinking"
              },
              {
                name: "Person3",
                displayStatus: "ready"
              },
            ]
          });
          el.html(html);
        });

        router.add('/asking_question', () => {
          let html = askingQuestion({
            question: "Ask someone ~this"
          });
          el.html(html);
        });


        router.add('/enter_name', () => {
          let html = enterName();
          el.html(html);

          $('.nameButton').on('click', function(event) {
            let $realnameElem = $('.realname');
            if ($realnameElem.length == 1 && $realnameElem[0].value) {
              state.name = $realnameElem[0].value;
              sender.createUser('ca9e11de-8648-4e22-a330-def94e4bad8f', state.name);
            }
          });
          
        });

        router.add('/choose_receiver', () => {
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
          $('.userButton').each(function() {
            $(this).on('click', function(event) {
              let $elem = $(this);
              let receiver = null;
              if ($elem.length == 1 && $elem[0].textContent) {
                receiver = $elem[0].textContent;
              }

              console.log(receiver);
              // At that time a receiver is known, so redirect
              return receiver; // name of the receiver
            });
          });
        });

        router.add('/enter_questions', () => {
          let html = enterQuestion({
            questions: [1, 2, 3]
          });
          el.html(html);

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
            router.navigateTo('/waiting_room');
            return input; // name of the receiver
          });
        });

        router.add('/receiving_question', () => {
          let html = receivingQuestion();
          el.html(html);
        });

        router.add('/see_asker', () => {
          let html = seeAsker({
            asker: 'Ivacheto'
          });
          el.html(html);
        });

        router.add('/spectating', () => {
          let html = spectating();
          el.html(html);
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
          const path = href.substr(href.lastIndexOf('/'));
          router.navigateTo(path);
        });
        // console.log('nice');

        function onJoinRoom() {
          router.navigateTo('/enter_questions');
        }

        function onQuestionEntered() {

        }

        function onReady() {
          router.navigateTo('/waiting_room');
        }
    });

})(jQuery);
