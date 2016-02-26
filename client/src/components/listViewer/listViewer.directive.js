angular.module('components')
    .directive('listViewer', [
        '$timeout',
        'Column',
        ListViewer
    ]);

function ListViewer($timeout, Column){
    return {
        scope: {
            list: '=',
            columns: '=',
            form: '=?',
        },
        templateUrl: 'components/listViewer/listViewer.tpl.html',
        link: linkFunc.bind(null, $timeout, Column),
    };
}

function linkFunc($timeout, Column, scope, element, attrs){

    scope.$watchCollection('columns', function(column){
        scope.viewerColumns = _.map(scope.columns, function(column){
            return new Column(column);
        });
    });


    scope.$watch(function(){
        var inputBarEl = element.find('list-search-bar input');
        return inputBarEl.is(':focus')
    }, function(focused){
        scope.form.focus = focused;
        $timeout(_.noop);
    });


    $('body').on('click', setFocus);
    $('body').on('keydown', changeSelection);
    scope.$on('$destroy', function(){
        $('body').off('click', setFocus);
        $('body').off('keydown', changeSelection);
    });


$('body').on('keydown', globalSelector)
function globalSelector(e){
    if(e.keyCode===75 && e.metaKey){
        scope.list.selectAbove();
        $timeout(_.noop);
        e.preventDefault();
    }else if(e.keyCode===74 && e.metaKey){
        scope.list.selectBelow();
        e.preventDefault();
        $timeout(_.noop);

    }
}

    scope.form = scope.form || {};
    function setFocus(e) {
        scope.form.focus = $(e.target).closest(element).length;
        if(scope.form.focus){
            element.find('list-search-bar input').focus();
        }
        $timeout(_.noop);
    }

    // todo: make input field always selected, then listen for that element only
    function changeSelection(e){
        if(!scope.form.focus){return;}


        if(e.keyCode===38){
            scope.list.selectAbove();
            e.preventDefault();
        }else if(e.keyCode===40){
            scope.list.selectBelow();
            e.preventDefault();

        // Tab and shift+tab
        }else if(e.keyCode===9){
            var actions = _.map(scope.list.actions, 'value');
            var index = _.indexOf(actions, scope.list.selectedAction)

            if(e.shiftKey){
                if(--index < 0){
                    index = actions.length-1;
                }
            }else{
                if(++index > actions.length-1){
                    index = 0;
                }
            }
            scope.list.selectedAction = scope.list.actions[index].value;
            e.preventDefault();
            $timeout(_.noop);
        }else{
            return;
        }

        $timeout(_.noop);
    }

}