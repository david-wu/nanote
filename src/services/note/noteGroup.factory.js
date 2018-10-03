angular.module('services')
    .factory('NoteGroup', [
        'List',
        'Note',
        'TagGroup',
        NoteGroupFactory
    ]);

function NoteGroupFactory(List, Note, TagGroup){

    function NoteGroup(){
        List.call(this);
    }

    NoteGroup.prototype = Object.create(List.prototype);
    NoteGroup.prototype.constructor = List.constructor;

    // Return a tagGroup
    NoteGroup.prototype.getTags = function(){
        var tags = _.map(this.children, function(note){
            return note.tags;
        });

        return new TagGroup(tags);
    }

    NoteGroup.prototype.create = function(options){
        return this.add(new Note(options));
    };

    NoteGroup.prototype.syncFrom = function(){
        var that = this;
        var storageJso = JSON.parse(localStorage.getItem('notes'));
        this.parse(storageJso);
    };

    NoteGroup.prototype.syncTo = function(){
        localStorage.setItem('notes', this.stringify());
    };

    NoteGroup.prototype.parse = function(jso){
        var that = this;
        if(!jso){return;}
        _.each(jso.children, function(child){
            that.create(child);
        });
    };

    NoteGroup.prototype.stringify = function(){
        var childStrings = _.map(this.children, function(child){
            return child.stringable();
        });

        return JSON.stringify({
            children: childStrings,
        });
    };

    NoteGroup.prototype.addDefaultNote = function(){
        if(this.children.length){return;}

        this.create({
            name: 'intro',
            content: 'Welcome to nanote!\nPress Esc to select the NoteListViewer!\nPress enter to select NoteViewer!\nTab and shift+tab to select actions while in NoteListViewer\n⌘+j and ⌘+k or arrow keys to scroll between notes\nCreate searchable #tags in your note content!\n',
        });
    };

    return NoteGroup;
}

