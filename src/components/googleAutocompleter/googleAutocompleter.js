angular.module('components')
    .directive('googleAutocompleter', [
        '$timeout',
        GoogleAutocompleter
    ]);

function GoogleAutocompleter($timeout){
    return {
        scope: {
            form: '=',
        },
        templateUrl: 'components/googleAutocompleter/googleAutocompleter.tpl.html',
        link: linkFunc.bind(null, $timeout),
    };
}

function linkFunc($timeout, scope, element, attrs){

    var context = element.find('input.autocomplete');

    scope.$watch('form.focus', function(val){
        if(val){
            context.focus();
        }else{
            context.blur();
        }
    });

    $('body').on('click', setFocus);
    scope.$on('$destroy', function(){
        $('body').off('click', setFocus);
    });
    function setFocus(e) {
        scope.form.focus = $(e.target).closest(element).length;
        $timeout(_.noop);
    }


    var autocomplete = initAutocomplete(context[0]);
    geolocate(autocomplete);

    function initAutocomplete(context, handler){
        var ac = new google.maps.places.Autocomplete(context, {types:['geocode']});
        ac.addListener('place_changed', function(){
            changeHandler(ac.getPlace())
        });
        return ac;
    }

    function changeHandler(place){
        scope.form.handler(place);
        context.val('');
        scope.form.focus = true;
        $timeout(_.noop);
    };

    function geolocate(autocomplete){
        if(!navigator.geolocation){return;}
        navigator.geolocation.getCurrentPosition(function(position) {
            var currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: currentPosition,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    };

}