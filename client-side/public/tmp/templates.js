var templates = {};

templates["asking_question.handlebars"] = "<h1>{{asker}} is asking a question</h1>\n" +
   "\n" +
   "<div>\n" +
   "    <div class=\"col-2\"></div>\n" +
   "        <div class=\"col-8\">\n" +
   "            <i class= \"fa fa-question-circle fa-10x\" style=\"font-size: 20em;\"></i>\n" +
   "        </div>\n" +
   "    <div class=\"col-2\"></div>\n" +
   "</div>\n" +
   "\n" +
   "\n" +
   "";

templates["choose_receiver.handlebars"] = "<h1>Choose Receiver</h1>\n" +
   "";

templates["enter_questions.handlebars"] = "<div class=\"container\">\n" +
   " <div class=\"row\">\n" +
   "   <div class=\"col-sm\">\n" +
   "     One of three columns\n" +
   "   </div>\n" +
   "   <div class=\"col-sm\">\n" +
   "     One of three columns\n" +
   "   </div>\n" +
   "   <div class=\"col-sm\">\n" +
   "     One of three columns\n" +
   "   </div>\n" +
   " </div>\n" +
   "</div>\n" +
   "<div class=\"container-fluid\">\n" +
   "    <form>\n" +
   "        <div class=\"row\">\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "            <div class=\"col-8\">\n" +
   "                <div class=\"form-group\">\n" +
   "                    <label for=\"realname\">Name</label>\n" +
   "                    <input type=\"text\" class=\"form-control\" id=\"realname\" placeholder=\"Write your name here\">\n" +
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
   "                        <label for=\"question{{this}}\">Question {{this}}</label>\n" +
   "                        <textarea class=\"form-control\" id=\"question{{this}}\" placeholder=\"Write your first question here\"></textarea>\n" +
   "                    </div>\n" +
   "                {{/each}}\n" +
   "            </div>\n" +
   "            <div class=\"col-2\">\n" +
   "            </div>\n" +
   "        </div>\n" +
   "        <div class=\"row\">\n" +
   "            <button type=\"button\" class=\"btn btn-primary btn-sm\">I'm ready</button>\n" +
   "        </div>\n" +
   "    </form>\n" +
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

templates["receiving_question.handlebars"] = "<h1>Receiving Question</h1>\n" +
   "";

templates["see_asker.handlebars"] = "<h1>See Asker</h1>\n" +
   "";

templates["spectating.handlebars"] = "<h1>Spectating</h1>\n" +
   "";

templates["waiting_room.handlebars"] = "<h1>Waiting room</h1>\n" +
   "\n" +
   "<table>\n" +
   "    <tr>\n" +
   "        <th><label>User Name</label></th>\n" +
   "        <th><label>User Status</label></th>\n" +
   "    </tr>\n" +
   "    {{#each users}}\n" +
   "        <tr>\n" +
   "            <td><label>{{this.name}}</label></td>\n" +
   "            <td><label>{{this.status}}</label></td>\n" +
   "        </tr>\n" +
   "    {{/each}}\n" +
   "</table>\n" +
   "\n" +
   "\n" +
   " ";
