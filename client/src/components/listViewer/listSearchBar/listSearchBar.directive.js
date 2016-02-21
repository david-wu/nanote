angular.module('components')
    .directive('listSearchBar', [
        ListSearchBar
    ]);

function ListSearchBar(){
    return {
        scope: {
            list: '=',
        },
        templateUrl: 'components/listViewer/listSearchBar/listSearchBar.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){

    scope.keyHandler = function(e){
        if(e.keyCode === 13 && !scope.list.selection){
            scope.list.create({name: scope.form});
            scope.form = '';
            e.preventDefault();
        }
    };


    scope.$watch('form', function(){
        scope.list.sortBy(scope.form);
        scope.list.selectFirst();
    })

}