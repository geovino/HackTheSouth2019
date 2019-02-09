var templates = {};

templates["asking_question.handlebars"] = "<h1>Asking Question</h1>";

templates["choose_receiver.handlebars"] = "<h1>Choose Receiver</h1>\n" +
   "<div class=\"list-group\">\n" +
   "    {{#each people}}\n" +
   "        <button type=\"button\" class=\"list-group-item list-group-item-action userButton\">{{this.name}}</button>\n" +
   "    {{/each}}\n" +
   "</div>";

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
   "\n" +
   "\n" +
   "{{!-- <div class=\"limiter\">\n" +
   "    <div>\n" +
   "        <div class=\"container-table100\">\n" +
   "            <div class=\"wrap-table100\">\n" +
   "                    <div class=\"table\">\n" +
   "\n" +
   "                        <div class=\"row header\">\n" +
   "                            <div class=\"cell\">\n" +
   "                                Full Name\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\">\n" +
   "                                Questions\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Vincent Williamson\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Joseph Smith\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Not Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Justin Black\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Sean Guzman\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Keith Carter\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Austin Medina\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Vincent Williamson\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Questions\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                        <div class=\"row\">\n" +
   "                            <div class=\"cell\" data-title=\"Full Name\">\n" +
   "                                Joseph Smith\n" +
   "                            </div>\n" +
   "                            <div class=\"cell\" data-title=\"Location\">\n" +
   "                                Ready\n" +
   "                            </div>\n" +
   "                        </div>\n" +
   "\n" +
   "                    </div>\n" +
   "            </div>\n" +
   "        </div>\n" +
   "    </div>\n" +
   "</div>\n" +
   " --}}\n" +
   "";
