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

        this.addDefaultNote();
    }

    NoteGroup.prototype = Object.create(List.prototype);
    NoteGroup.prototype.constructor = List.constructor;

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
        for(var i=0; i < this.children.length; i++){
            if(this.children[i].name==='intro'){return;}
        }
        this.create({
            name: 'intro',
            content: 'Welcome to nanote!\nPress Esc to select the NoteListViewer!\nPress enter to select NoteViewer!\nCreate searchable #tags in your note.content!\n ⌘+j and ⌘+k or arrow keys to scroll between notes\n tab and shift+tab to select actions\n'
        });
    };

    return NoteGroup;
}

