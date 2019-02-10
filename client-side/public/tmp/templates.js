var templates = {};

<<<<<<< HEAD
templates["asking_question.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\">Ask <span class=\"highlight\">Player2</span>: \"<span class=\"highlight question\">Who was your first crush?</span>\"</h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
=======
templates["asking_question.handlebars"] = "<div class=\"jumbotron\">\n" +
   "    <h1 class=\"display-4\">{{question}}</h1>\n" +
   "</div>\n" +
   "\n" +
   "<div class=\"clock\">\n" +
   "   <span class=\"short-hand\"></span>\n" +
   "   <span class=\"long-hand\"></span>\n" +
   "   <span class=\"nut\"></span>\n" +
   "</div>\n" +
   "\n" +
   "<div class=\"text-center\" style=\"margin-top: 10px;\">\n" +
   "    <button type=\"button\" class=\"btn btn-success\">I Accept this answer</button>\n" +
>>>>>>> acbe5b02f0b1550fc7a46d07fa3949e9dcab7e25
   "</div>\n" +
   "";

<<<<<<< HEAD
templates["choose_receiver.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "      <h2 class=\"fancyheading\">Whom will you ask <span class=\"highlight question\">\"Who was your first crush?\"</span>?</h2>\n" +
   "      <ul class=\"player-list\">\n" +
   "          {{#each people}}\n" +
   "              <li class=\"player-button\">{{this.name}}</li>\n" +
   "          {{/each}}\n" +
   "      </ul>\n" +
   "    </div>\n" +
   "  </div>\n" +
   "</div>\n" +
   "";

templates["enter_name.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h1 class=\"fancyheading\">What is your name?</h1>\n" +
   "            <h3 class=\"fancyheading\">The first step to knowing someone is knowing their name.</h3>\n" +
   "\n" +
   "            <input type=\"text\" class=\"question-input realname\" id=\"realname\" placeholder=\"Write your name here\">\n" +
   "        </div>\n" +
   "    </div>\n" +
   "    <button type=\"button\" class=\"fancy\">This is me!</button>\n" +
   "</div>\n" +
   "";

templates["enter_questions.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h1 class=\"fancyheading\">What questions should the others answer?</h1>\n" +
   "            <h3 class=\"fancyheading\">Interesting questions have interesting answers.</h3>\n" +
   "\n" +
   "            <textarea class=\"question-input\" placeholder=\"Write your a question here!\"></textarea>\n" +
=======
templates["choose_receiver.handlebars"] = "<div class=\"list-group\">\n" +
   "    <div class='container'>\n" +
   "        <h1 class='whiteLabels'>Choose Receiver</h1>\n" +
   "        <div class=\"col-2\"></div>\n" +
   "        {{#each people}}\n" +
   "            <button type=\"button\" class=\"list-group-item list-group-item-action userButton\">{{this.name}}</button>\n" +
   "        {{/each}}\n" +
   "        <div class=\"col-2\"></div>\n" +
   "    </div>\n" +
   "</div>";

templates["enter_questions.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <form>\n" +
   "        <div class=\"row\">\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "            <div class=\"col-8\">\n" +
   "                <div class=\"form-group\">\n" +
   "                    <label for=\"realname\" class=\"whiteLabels\">Name</label>\n" +
   "                    <input type=\"text\" class=\"form-control realname\" id=\"realname\" placeholder=\"Write your name here\">\n" +
   "                </div>\n" +
   "            </div>\n" +
   "\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "        </div>\n" +
   "        <div class=\"row\">\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "            <div class=\"col-8\">\n" +
   "                {{#each questions}}\n" +
   "                    <div class=\"form-group\">\n" +
   "                        <label for=\"userQuestion\" class=\"whiteLabels\">Question {{this}}</label>\n" +
   "                        <textarea class=\"form-control userQuestion\" placeholder=\"Write your first question here\"></textarea>\n" +
   "                    </div>\n" +
   "                {{/each}}\n" +
   "            </div>\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "        </div>\n" +
   "        <div class=\"text-center\">\n" +
   "            <button type=\"button\" class=\"btn btn-primary btn-sm readyButton\">I'm ready</button>\n" +
>>>>>>> acbe5b02f0b1550fc7a46d07fa3949e9dcab7e25
   "        </div>\n" +
   "    </div>\n" +
   "    <div class=\"medium-info\"><span class=\"highlight\">2/3</span> questions sent.</div>\n" +
   "    <button type=\"button\" class=\"fancy\">Send question</button>\n" +
   "</div>\n" +
   "";

templates["lobby.handlebars"] = "<header>\n" +
   "    <div class=\"header-content\">\n" +
   "        <div class=\"header-content-inner\">\n" +
   "            <h1 id=\"homeHeading\">Bluetato</h1>\n" +
   "            <hr>\n" +
   "            <p>Create a room and send a link to your friends</p>\n" +
   "            <a href=\"/\" class=\"btn btn-primary btn-xl page-scroll\" style=\"margin-top: 5px\">Create Room</a>\n" +
   "            <a href=\"/\" class=\"btn btn-primary btn-xl page-scroll\" style=\"margin-top: 5px\">Join existing Room</a>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</header>\n" +
   "\n" +
   "<section id=\"contact\">\n" +
   "    <div class=\"container\">\n" +
   "        <div class=\"row\">\n" +
   "            <div class=\"col-lg-8 col-lg-offset-2 text-center\">\n" +
   "                <h2 class=\"section-heading\">Hack the South 2019</h2>\n" +
   "                <hr class=\"primary\">\n" +
   "                <p>project made for Saturday/Sunday</p>\n" +
   "            </div>\n" +
   "        <div class=\"row\">\n" +
   "            <div class=\"col-lg-8 col-lg-offset-2 text-center\">\n" +
   "                <i class=\"fa fa-github fa-4x\"></i>\n" +
   "                <p><a href=\"mailto:your-email@your-domain.com\">https://github.com/HackTheSouth2019</a></p>\n" +
   "            </div>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "</section>\n" +
   "";

templates["receiving_question.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\">It's time for some indiscretion. <br>The ice is breaking. <br><span class=\"highlight question\">Answer the question.</span><br> The timer is shaking.</h2>\n" +
   "\n" +
   "            <img class=\"frost\" src=\"img/icey.png\"/>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

<<<<<<< HEAD
templates["see_asker.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\"><span class=\"highlight question\">Player1</span> is about to ask somebody a question. <i>Brace for a show!</i></h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";
=======
templates["see_asker.handlebars"] = "<div class=\"jumbotron\">\n" +
   "    <h1 class=\"display-4\" >Asker is: {{asker}}</h1>\n" +
   "    <h2 class=\"display-6\">Please wait for his question...</h2>\n" +
   "</div>\n" +
   "\n" +
   "<div>\n" +
   "    <div class=\"col-2\"></div>\n" +
   "        <div class=\"col-8\">\n" +
   "            <i class= \"fa fa-question-circle fa-10x\" style=\"font-size: 20em;\"></i>\n" +
   "        </div>\n" +
   "    <div class=\"col-2\"></div>\n" +
   "</div>";
>>>>>>> acbe5b02f0b1550fc7a46d07fa3949e9dcab7e25

templates["spectating.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\"><span class=\"highlight\">Player1</span> is asking <span class=\"highlight\">Player2</span> a question.\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

templates["waiting_room.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h1 class=\"fancyheading\">It'll only be a moment.</h1>\n" +
   "            <h3 class=\"fancyheading\">The others are thinking up questions.</h3>\n" +
   "\n" +
   "            <ul class=\"player-list\">\n" +
   "            {{#each users}}\n" +
   "                <li class=\"player-display\">{{this.name}} is <span class=\"highlight\">{{this.displayStatus}}</span>.</li>\n" +
   "            {{/each}}\n" +
   "            </ul>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "    <div class=\"medium-info\">\n" +
   "        <span class=\"highlight\">3/5</span> people have joined\n" +
   "    </div>\n" +
   "</div>\n" +
   "\n" +
   "";
