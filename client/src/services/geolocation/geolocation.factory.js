angular.module('services')
    .factory('Geolocation', [
        '$q',
        GeolocationFactory,
    ]);

function GeolocationFactory($q){

    function Geolocation(){}

    Geolocation.prototype.getCurrentPosition = function(){
        var deferred = $q.defer();
        navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
        return deferred.promise;
    }

    return new Geolocation();
}