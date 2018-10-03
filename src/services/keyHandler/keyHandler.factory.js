angular.module('services')
    .factory('KeyHandler', [
        KeyHandlerFactory
    ]);


function KeyHandlerFactory(){

    function KeyHandler(){
        this.handlers = [];
        this.applyHandlers();
    }

    KeyHandler.prototype.applyHandlers = function(){
        $('body').on('keydown', this.keyEventHandler.bind(this));
    };

    KeyHandler.prototype.keyEventHandler = function(e){
        if(e.metaKey){
            switch(e.keyCode){
                case 74:
                    return this.trigger('commandJ', e);
                case 75:
                    return this.trigger('commandK', e);
            }
        }

        if(e.shiftKey){
            switch(e.keyCode){
                case 9:
                    return this.trigger('shiftTab', e);
            }
        }

        switch(e.keyCode){
            case 9:
                return this.trigger('tab', e);
            case 37:
                return this.trigger('left', e);
            case 38:
                return this.trigger('up', e);
            case 39:
                return this.trigger('right', e);
            case 40:
                return this.trigger('down', e);
        }
    };

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

