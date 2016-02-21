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
    _.defaults(scope, {
        form: {},
    });

    scope.$watchCollection('columns', function(column){
        scope.viewerColumns = _.map(scope.columns, function(column){
            return new Column(column);
        });
    });

    scope.toggleSelection = function(selection){
        scope.list.toggleSelection(selection);
    }

    $('body').on('click', setFocus);
    $('body').on('keydown', changeSelection);
    scope.$on('$destroy', function(){
        $('body').off('click', setFocus);
        $('body').off('keydown', changeSelection);
    });

    function setFocus(e) {
        scope.form.focus = $(e.target).closest(element).length;
        $timeout(_.noop);
    }

    function changeSelection(e){
        if(!scope.form.focus){return;}

        if(e.keyCode===38){
            scope.list.selectAbove();
        }else if(e.keyCode===40){
            scope.list.selectBelow();
        }else if(e.keyCode===27){
            scope.list.setSelection(undefined);
        }else{
            return;
        }

        $timeout(_.noop);
    }


}