angular.module('services')
    .factory('Note', [
        '$http',
        '$location',
        NoteFactory
    ]);

function NoteFactory($http, $location){

    function Note(options){
        _.extend(this, options);
        _.defaults(this, {
            content: '',
            access: 'private',
        });
    }

    Note.prototype.baseUrl = function(){
        return '/api/Note';
    };

    Note.prototype.stringable = function(){
        var clone = _.clone(this);
        delete clone.parent;
        delete clone.children;
        return clone;
    };

    // Note.prototype.save = function(query){
    //     var options = {
    //         method: 'POST',
    //         url: this.baseUrl(),
    //         data: JSON.stringify(this),
    //     };
    //     return $http(options)
    //         .then(function(res){
    //             console.log(res)
    //         });
    // };

    return Note;
}

