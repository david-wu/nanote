angular.module('components')
    .directive('radioButtons', [
        RadioButtons
    ]);

function RadioButtons(){
    return {
        scope: {
            buttons: '=',
            form: '='
        },
        templateUrl: 'components/radioButtons/radioButtons.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){
    scope.setActiveButton = function(button){
        scope.form = button.value;
    };
}
