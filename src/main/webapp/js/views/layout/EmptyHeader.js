define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/layout/emptyTemplate.html' ,
    'bootstrap',
    //dirty hack for handlebars loading wait
    'handlebars'
], function ($, _, Backbone, emptyTemplate) {

    var NavigationHeader = Backbone.View.extend({

        template: Handlebars.compile(emptyTemplate),
        toggleState : false,

        initialize: function () {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        },

        authorized: function () {
            return true;
        },

        render: function () {
            //compile handlebars template
            this.$el.html(this.template());
            return this;
        }

    });
    return NavigationHeader;

})
;