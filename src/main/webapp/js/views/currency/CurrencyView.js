define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/currency/currencyTemplate.hbs' ,
    'models/currency/CurrencyModel' ,
    //dirty hack for handlebars loading wait
    'handlebars',
    'select2'
], function($, _, Backbone, currencyTemplate, CurrencyModel){

    var CurrencyView = Backbone.View.extend({

        template : Handlebars.compile(currencyTemplate),
        events : {
            'change .trigger' : 'calculate',
            'keyup #from-val' : 'calculate'
        },

        initialize : function (options) {
            _.bindAll(this, 'render', 'renderDetails', 'calculate', 'updateData'); // fixes loss of context for 'this' within methods
            this.model = new CurrencyModel();
        },

        render: function(){
            this.model.fetch({success : this.renderDetails});
        },

        renderDetails : function() {
            this.$el.append(this.template(this.model.toJSON()));

            var select2Config = {
                width: '20%',
                placeholder: 'Currency...',
                formatSelection: function(object) {
                    return object.text;
                },
                formatResult: function(object) {
                    return "<b>" + object.text + "</b>";
                },
                matcher: function(term, text) {
                    if (term == "") return true;
                    return text.toLowerCase().indexOf(term.toLowerCase()) !== -1
                }
            };

            this.$el.find('#from-curr').select2(select2Config);
            this.$el.find('#to-curr').select2(select2Config);

            this.interval = setInterval(this.updateData, 60000);
            return this;
        },

        calculate : function(){
            var fromCurrency = $("#from-curr").val();
            var fromAmt = $("#from-val").val();
            var toCurrency = $("#to-curr").val();
            var toAmt = (fromAmt / this.model.get("rates")[fromCurrency]) * this.model.get("rates")[toCurrency];
            var rate = toAmt/fromAmt;

            if (!isNaN(toAmt)){
                $("#to-val").val(toAmt);
            }
            if (!isNaN(rate)){
                $("#rate").text("1 / " + rate);
            }
        },

        updateData : function(){
            this.model.fetch({success : this.calculate()})
        }
    });

    return CurrencyView;
});