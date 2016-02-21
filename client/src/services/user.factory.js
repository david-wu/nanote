angular.module('services')
    .factory('User', [
        UserFactory,
    ]);

function UserFactory(){

    function User(){
        this.selections = [];
        this.selection;
    }

    return User;
}