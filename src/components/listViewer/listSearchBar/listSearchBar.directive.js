angular.module('components')
    .directive('listSearchBar', [
        ListSearchBar
    ]);

function ListSearchBar(){
    return {
        scope: {
            list: '=',
            action: '=',
        },
        templateUrl: 'components/listViewer/listSearchBar/listSearchBar.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){

    scope.keyHandler = function(e){
        if(e.keyCode===13){
            if(scope.action==='create'){
                scope.list.create({name: scope.input});
                scope.input = '';
                e.preventDefault();
            }
        }
    };

    scope.input = '';
    scope.$watch('input', function(){
        scope.list.sortBy(scope.input);
        scope.list.selectFirst();
    });



    // Selects the inputEl when escape key is pressed
    $('body').on('keydown', changeSelection);
    scope.$on('$destroy', function(){
        $('body').off('keydown', changeSelection);
    });
    function changeSelection(e){
        if(e.keyCode===27){
            var inputEl = element.find('input')
            if(!inputEl.is(':focus')){
                inputEl.focus();
                e.preventDefault();
            }
        }
    }

}