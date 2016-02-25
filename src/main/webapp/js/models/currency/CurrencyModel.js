define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var CurrencyModel = Backbone.Model.extend({
        id: "",
        url : '/currency-api/rates/all',

        initialize: function (options) {

        },

        parse: function(data){
            data.ids = Object.getOwnPropertyNames(data.rates);
            return data;
        }
    });

    return CurrencyModel;
});
