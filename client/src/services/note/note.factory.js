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
            tags: [],
        });
    }

    Note.prototype.stringable = function(){
        var clone = _.clone(this);
        delete clone.parent;
        delete clone.children;
        return clone;
    };

    Note.prototype.setContent = function(content){
        if(this.content === content){return;}
        this.content = content;
        this.lastModified = Date.now();
        this.updateTags();
        this.parent.syncTo();
    }

    Note.prototype.updateTags = function(){
        this.tags = this.content.match(/#(\S+)/gm);
    };

    Note.prototype.delete = function(){
        this.parent.remove(this);
        this.parent.syncTo();
        console.log(this.parent)
    };

    return Note;
}

