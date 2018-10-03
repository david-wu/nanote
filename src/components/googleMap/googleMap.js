angular.module('components')
    .directive('googleMap', [
        '$timeout',
        'Geolocation',
        GoogleMap
    ]);

function GoogleMap($timeout, Geolocation){
    return {
        scope: {
            addresses: '=?'
        },
        templateUrl: 'components/googleMap/googleMap.tpl.html',
        link: linkFunc.bind(null, $timeout, Geolocation),
    };
}

function linkFunc($timeout, Geolocation, scope, element, attrs){

    var maxZoom = 12;
    var markers = [];
    var options = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 8,
    }
    var map = new google.maps.Map(element[0], options);

    // workaround for google map center bug
    $timeout(function(){
        map.setCenter(new google.maps.LatLng(37.3, -121.9));
    },1000);

    scope.$watchCollection('addresses.children', function(){
        clearMarkers();

        _.each(scope.addresses.children, function(address){
            var marker = new google.maps.Marker({
                position: address.geometry.location,
                map: map,
            });
            markers.push(marker);
        });

        setBounds();
    });

    function setBounds(){
        if(!markers.length){return;}
        var bounds = new google.maps.LatLngBounds();
        _.each(markers, function(marker){
            bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
        if (map.getZoom() > maxZoom){
            map.setZoom(maxZoom);
        }
    }

    function clearMarkers(){
        _.each(markers, function(marker){
            marker.setMap(null);
        })
        markers.length = 0;
    }

    Geolocation.getCurrentPosition()
        .then(function(position){
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(latlng);
        });

}