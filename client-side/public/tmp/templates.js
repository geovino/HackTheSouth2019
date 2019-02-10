var templates = {};

templates["asking_question.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\">Ask <span class=\"highlight\">{{receiver}}</span>: \"<span class=\"highlight question\">{{thequestion}}</span>\"</h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <div class=\"clock\">\n" +
   "               <span class=\"short-hand\"></span>\n" +
   "               <span class=\"long-hand\"></span>\n" +
   "               <span class=\"nut\"></span>\n" +
   "            </div>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h3 class=\"fancyheading\">Take this opportunity to learn more about <span class=\"highlight\">{{receiver}}</span>.</h3>\n" +
   "            <button type=\"button\" class=\"fancy\" id=\"notify-satisfied\">I'm satisfied!</button>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "\n" +
   "</div>\n" +
   "";

templates["choose_receiver.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "      <h2 class=\"fancyheading\">Whom will you ask \"<span class=\"highlight question\" id=\"askedQuestion\">{{question}}</span>\"?</h2>\n" +
   "      <ul id=\"receiver-choice-list\" class=\"player-list\">\n" +
   "          {{#each people}}\n" +
   "              <li class=\"player-button\">{{this.player_name}}</li>\n" +
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
   "    <button type=\"button\" class=\"fancy nameButton\">This is me!</button>\n" +
   "</div>\n" +
   "";

templates["enter_questions.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h1 class=\"fancyheading\">What questions should the others answer?</h1>\n" +
   "            <h3 class=\"fancyheading\">Interesting questions have interesting answers.</h3>\n" +
   "\n" +
   "            <textarea class=\"question-input\" placeholder=\"Write your a question here!\" id=\"questionArea\"></textarea>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "    <div class=\"medium-info\"><span class=\"highlight\" id=\"questionsDone\">{{this.questions.length}}/{{this.questionCount}}</span>\n" +
   "     questions sent.</div>\n" +
   "    <button type=\"button\" class=\"fancy questionButton\">Send question</button>\n" +
   "</div>\n" +
   "";

templates["lobby.handlebars"] = "<div class=\"container-fluid boatbg\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\" style=\"text-align: center;\">\n" +
   "            <h1 class=\"display-title\"><span style=\"color: #0f42fc;\">Blue</span>tato</h1><br>\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-bottom: 0px;\">We were planning to use bluetooth.</h2><br>\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-top: 0px;\">We compromised and we made the website <span style=\"color: blue;\">blue</span>!</h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "\n" +
   "    <button id=\"create-room\" type=\"button\" class=\"fancy\">Create room</button>\n" +
   "\n" +
   "    <div class=\"row justify-content-lg-center hidden\" id=\"link-present\">\n" +
   "        <div class=\"col-lg-auto\" style=\"text-align: center;\">\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-bottom: 0px;\">Room succesfully created. Here's your code:</h2><br>\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-top: 0px;\"><a href=\"#\" id=\"link-display\">Your code</a></h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\" style=\"text-align: center;\">\n" +
   "            <input id=\"code-input\" type=\"text\" class=\"question-input realname\" placeholder=\"Room code\" style=\"margin-bottom: 4px;\">\n" +
   "            <button id=\"join-room\" type=\"button\" class=\"fancy\" style=\"margin-top: 4px;\">Join room</button>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

templates["receiving_question.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\">It's time for some indiscretion. <br>The ice is breaking. <br><span class=\"highlight question\">Answer the question.</span><br> The timer is shaking.</h2>\n" +
   "\n" +
   "            <img style=\"width: 200px; height: 200px;\" src=\"img/potato.gif\"/>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

templates["room_created.handlebars"] = "<div class=\"container-fluid boatbg\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\" style=\"text-align: center;\">\n" +
   "            <h1 class=\"fancyheading\">Room succesfully created</h1>\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-bottom: 0px;\">Share the following link with your friends:</h2><br>\n" +
   "            <h2 class=\"display-subtitle\" style=\"margin-top: 0px; text-decoration: underline;\"><a href=\"https://www.w3schools.com/css/css_form.asp\">https://www.w3schools.com/css/css_form.asp</a></h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "\n" +
   "    <button id=\"create-room\" type=\"button\" class=\"fancy\">Proceed to room</button>\n" +
   "</div>\n" +
   "";

templates["see_asker.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\"><span class=\"highlight question\">{{asker}}</span> is about to ask somebody a question. <i>Brace for a show!</i></h2>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   "";

templates["spectating.handlebars"] = "<div class=\"container-fluid\">\n" +
   "    <div class=\"row justify-content-lg-center\">\n" +
   "        <div class=\"col-lg-auto\">\n" +
   "            <h2 class=\"fancyheading\" style=\"max-width: 500px; margin: 60px auto 0px auto;\"><span class=\"highlight\">{{asker}}</span> is asking <span class=\"highlight\">{{receiver}}</span> a question.\n" +
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
   "        </div>\n" +
   "    </div>\n" +
   "    <div id=\"player-listing\" class=\"div\" style=\"text-align: center\">\n" +
   "    {{#each players}}\n" +
   "        <div class=\"player-display col-12\">{{this.player_name}} is <span class=\"highlight\">{{this.displayStatus}}</span>.</div><br>\n" +
   "    {{/each}}\n" +
   "    </div>\n" +
   "\n" +
   "    <div class=\"medium-info\">\n" +
   "        <span class=\"highlight\" id=\"joined-players-counter\">{{players_count}}/4</span> people have joined\n" +
   "    </div>\n" +
   "</div>\n" +
   "\n" +
   "";
