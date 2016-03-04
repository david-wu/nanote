angular.module('services')
    .factory('KeyHandler', [
        KeyHandlerFactory
    ]);


function KeyHandlerFactory(){

    function KeyHandler(){
        this.handlers = [];

        this.applyListeners();
    }

    KeyHandler.prototype.applyListeners = function(){
        var that = this;
        $('body').on('keydown', function(e){
            if(e.metaKey){
                switch(e.keyCode){
                    case 74:
                        return that.trigger('commandJ', e);
                    case 75:
                        return that.trigger('commandK', e);
                }
            }


            if(e.shiftKey){
                switch(e.keyCode){
                    case 9:
                        return that.trigger('shiftTab', e);
                }
            }

            switch(e.keyCode){
                case 9:
                    return that.trigger('tab', e);
                case 37:
                    return that.trigger('left', e);
                case 38:
                    return that.trigger('up', e);
                case 39:
                    return that.trigger('right', e);
                case 40:
                    return that.trigger('down', e);
            }
        });
    }


    KeyHandler.prototype.trigger = function(eventName, event){
        for(var i=this.handlers.length-1; i>=0; i--){
            var handler = this.handlers[i][eventName];
            if(handler && !handler(event)){
                return;
            }
        }
    };

    return new KeyHandler();
}

