angular.module('services')
    .factory('AddressGroup', [
        'List',
        'Address',
        AddressGroupFactory,
    ]);

function AddressGroupFactory(List, Address){

    function AddressGroup(){
        List.call(this);
    }

    AddressGroup.prototype = Object.create(List.prototype);
    AddressGroup.prototype.constructor = List.constructor;

    AddressGroup.prototype.create = function(options){
        return this.add(new Address(options));
    };

    return AddressGroup;
}