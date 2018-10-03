angular.module('services')
    .factory('ContextManager', [
        ContextManagerFactory
    ]);


function ContextManagerFactory(){

    function ContextManager(){
    }

    ContextManager.prototype.set = function(element){
        this.current = element;
    };

    return new ContextManager();
}

