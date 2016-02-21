angular.module('views')
    .directive('main', [
        Main
    ]);

function Main(){
    return {
        scope: {},
        templateUrl: 'views/main.tpl.html',
        link: linkFunc,
    };
}

function linkFunc(scope, element, attrs){
}
