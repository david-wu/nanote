angular.module('services')
    .factory('List', [
        ListFactory,
    ]);

function ListFactory(){

    function List(){
        this.children = [];
        this.filteredChildren = [];

        this.selectedAction = 'open';
    }

    List.prototype.actions = [
        {
            displayName: 'Open',
            value: 'open',
        },
        {
            displayName: 'Create',
            value: 'create',
        },
        {
            displayName: 'Meta',
            value: 'meta',
        },
    ];

    List.prototype.add = function(obj){
        obj.parent = this;
        this.children.push(obj);
        return obj;
    };

    List.prototype.remove = function(obj){
        _.pull(this.children, obj);
        return obj;
    };


    List.prototype.sortBy = function(query){
        if(!query || !query.length || !this.children.length){
            this.filteredChildren = this.children;
            return;
        }

        var fuse = new Fuse(this.children.slice(), {
            caseSensitive: false,
            includeScore: false,
            shouldSort: true,
            threshold: 1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            keys: ['name', 'tags'],
        });

        this.filteredChildren = fuse.search(query) || this.children;
        return this.filteredChildren;
    };

    List.prototype.selectFirst = function(){
        this.selection = this.filteredChildren[0];
    }

    List.prototype.setSelection = function(selection){
        this.selection = selection;
    };

    List.prototype.toggleSelection = function(selection){
        if(!_.isUndefined(selection) && selection===this.selection){
            this.selection = undefined;
        }else{
            this.selection = selection;
        }
    };

    List.prototype.selectAbove = function(){
        var index = _.indexOf(this.filteredChildren, this.selection);
        if(--index < 0){
            index = this.filteredChildren.length-1;
        }
        this.selection = this.filteredChildren[index];
    };

    List.prototype.selectBelow = function(){
        var index = _.indexOf(this.filteredChildren, this.selection);
        if(++index > this.filteredChildren.length-1){
            index = 0;
        }
        this.selection = this.filteredChildren[index];
    };


    return List;
}
