angular.module('services')
    .factory('NoteGroup', [
        'List',
        'Note',
        NoteGroupFactory
    ]);

function NoteGroupFactory(List, Note){

    function NoteGroup(){
        List.call(this);

        this.syncFrom();
    }

    NoteGroup.prototype = Object.create(List.prototype);
    NoteGroup.prototype.constructor = List.constructor;

    NoteGroup.prototype.create = function(options){
        return this.add(new Note(options));
    }

    NoteGroup.prototype.syncFrom = function(){
        var that = this;

        var storageObj = JSON.parse(localStorage.getItem('notes'));
        _.each(storageObj.children, function(child){
            that.create(child);
        });
    };

    NoteGroup.prototype.syncTo = function(){
        localStorage.setItem('notes', this.stringify());
    };

    NoteGroup.prototype.stringify = function(){
        var childStrings = _.map(this.children, function(child){
            return child.stringable();
        });

        return JSON.stringify({
            children: childStrings,
        });
    };

    return NoteGroup;
}
