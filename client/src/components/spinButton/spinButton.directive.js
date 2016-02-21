angular.module('components')
    .directive('spinButton', [
        SpinButton
    ]);

function SpinButton(){
    return {
        scope: {
            clickHandler: '=',
            buttonText: '@?',
            class: '=?',
        },
        templateUrl: 'components/spinButton/spinButton.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){
    scope.buttonText = scope.buttonText || 'Submit';
    scope.spinning = false;
    scope.buttonHandler = function(){
        if(scope.spinning){return;}

        var response = scope.clickHandler()
        if(response && response.then){
            scope.spinning = true;
            response
                .then(function(){
                    scope.spinning = false;
                })
                .catch(function(){
                    scope.spinning = false;
                });
        }

    };
}
