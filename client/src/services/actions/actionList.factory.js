angular.module('services')
    .factory('ActionList', [
        'List',
        '$location',
        ActionListFactory
    ]);


function ActionListFactory(List){
    function ActionList(){

    }

    ActionList.prototype = Object.create(List.prototype);
    ActionList.prototype.constructor = List.constructor;

    return ActionList;
}

