angular.module('components')
    .directive('topBar', [
        '$state',
        TopBar
    ]);

function TopBar($state){
    return {
        scope: {},
        templateUrl: 'components/topBar/topBar.tpl.html',
        link: linkFunc.bind(null, $state),
    };
}

function linkFunc($state, scope, element, attrs){
    scope.$state = $state;
}
