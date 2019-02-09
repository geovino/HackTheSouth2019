(function($) {
    'use strict';

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
                status: "Ready" 
              },
              {
                name: "Person2",
                status: "Not Ready" 
              },
              {
                name: "Person3",
                status: "Ready" 
              },
            ]
          });
          el.html(html);
        });

        router.add('/asking_question', () => {
          let html = askingQuestion();
          el.html(html);
        });

        router.add('/choose_receiver', () => {
          let html = chooseReceiver();
          el.html(html);
        });

        router.add('/enter_questions', () => {
          let html = enterQuestion({
            questions: [1, 2, 3]
          });
          el.html(html);
        });

        router.add('/receiving_question', () => {
          let html = receivingQuestion();
          el.html(html);
        });

        router.add('/see_asker', () => {
          let html = seeAsker();
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
