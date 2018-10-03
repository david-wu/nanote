angular.module('services')
    .factory('Tag', [
        TagFactory
    ]);

function TagFactory(){

    function Tag(options){
        _.extend(this, options);
        _.defaults(this, {
        });
    }


    return Tag;
}

