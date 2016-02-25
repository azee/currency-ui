define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/navigationTemplate.html' ,
    'bootstrap',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, navigationTemplate) {

    var NavigationHeader = Backbone.View.extend({

        template: Handlebars.compile(navigationTemplate),
        toggleState: false,

        initialize: function (options) {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.menus = [
                {
                    title: "Main Page",
                    url: "#/"
                }
            ];

            //initialize active menu based on options passed from router
            for (var i = 0; i < this.menus.length; i++) {
                if (this.menus[i].title == options.activeTitle) {
                    this.menus[i].active = true;
                }
            }

            if (options.pageTitle != null && options.pageTitle != "undefinde"){
                this.pageTitle = options.pageTitle;
            }
        },

        authorized: function () {
            return true;
        },

        render: function () {
            if (this.authorized()) {
                this.userMenus = [
                    {
                        title: "View Profile",
                        url: "#/user/profile"
                    },
                    {
                        title: "Exit",
                        url: '/somLogoutUrl'
                    }
                ];
            } else {
                this.userMenus = [
                    {
                        title: "Login",
                        url: '/someLoginUrl'
                    }
                ];
            }
            var user = {name: "FakeUser"};

            //compile handlebars template
            this.$el.html(this.template({
                "menus": this.menus,
                "userMenus": this.userMenus,
                "user": user
            }));

            return this;
        }

    });
    return NavigationHeader;

})
;