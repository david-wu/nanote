angular.module('services')
    .factory('TagGroup', [
        'List',
        'Tag',
        TagGroupFactory
    ]);

function TagGroupFactory(List, Tag){

    function TagGroup(tags){
        List.call(this);

        var that = this;
        _.each(_.flatten(tags), function(tag){
            that.create({
                content: tag,
                name: tag,
            });
        });
    }

    TagGroup.prototype = Object.create(List.prototype);
    TagGroup.prototype.constructor = List.constructor;

    TagGroup.prototype.create = function(options){
        return this.add(new Tag(options));
    };

    return TagGroup;
}

