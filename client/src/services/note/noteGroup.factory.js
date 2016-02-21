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

        var that = this;
        setInterval(function(){
            that.syncTo()
        }, 1000);
    }

    NoteGroup.prototype = Object.create(List.prototype);
    NoteGroup.prototype.constructor = List.constructor;

    NoteGroup.prototype.create = function(options){
        return this.add(new Note(options));
    }

    NoteGroup.prototype.syncFrom = function(){
        var str = localStorage.getItem('notes');
        var obj = JSON.parse(str);

        var that = this;
        _.each(obj.children, function(child){
            that.create(child);
        })

        console.log(this.children[0]);

    };

    NoteGroup.prototype.syncTo = function(){
        // this.syncToStorage('notes');

        // var str = JSON.stringify(this.children);
        // console.log(this.stringify())

        localStorage.setItem('notes', this.stringify());

    };

    NoteGroup.prototype.stringify = function(){
        var childStrings = _.map(this.children, function(child){
            return child.stringable();
        });

        return JSON.stringify({
            children: childStrings
        });
    }

    return NoteGroup;
}
