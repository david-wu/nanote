angular.module('components')
    .directive('listViewer', [
        '$timeout',
        'Column',
        'KeyHandler',
        ListViewer
    ]);

function ListViewer($timeout, Column, KeyHandler){
    return {
        scope: {
            list: '=',
            columns: '=',
            form: '=?',
        },
        templateUrl: 'components/listViewer/listViewer.tpl.html',
        link: linkFunc.bind(null, $timeout, Column, KeyHandler),
    };
}

function linkFunc($timeout, Column, KeyHandler, scope, element, attrs){

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
    scope.$on('$destroy', function(){
        $('body').off('click', setFocus);
    });

    scope.form = scope.form || {};
    function setFocus(e) {
        scope.form.focus = $(e.target).closest(element).length;
        if(scope.form.focus){
            element.find('list-search-bar input').focus();
        }
        $timeout(_.noop);
    }


    var keyHandler = {
        commandJ: function(e){
            e.preventDefault();
            scope.list.selectBelow();
            $timeout(_.noop);
        },
        down: function(e){
            e.preventDefault();
            scope.list.selectBelow();
            $timeout(_.noop);
        },
        commandK: function(e){
            e.preventDefault();
            scope.list.selectAbove();
            $timeout(_.noop);
        },
        up: function(e){
            e.preventDefault();
            scope.list.selectAbove();
            $timeout(_.noop);
        },
        tab: function(e){
            if(!scope.form.focus){return;}
            e.preventDefault();

            var actions = _.map(scope.list.actions, 'value');
            var index = _.indexOf(actions, scope.list.selectedAction)
            if(++index > actions.length-1){
                index = 0;
            }
            scope.list.selectedAction = scope.list.actions[index].value;
            $timeout(_.noop);
        },
        shiftTab: function(e){
            if(!scope.form.focus){return;}
            e.preventDefault();

            var actions = _.map(scope.list.actions, 'value');
            var index = _.indexOf(actions, scope.list.selectedAction)
            if(--index < 0){
                index = actions.length-1;
            }
            scope.list.selectedAction = scope.list.actions[index].value;
            $timeout(_.noop);
        },
    };

    KeyHandler.handlers.push(keyHandler);
    scope.$on('$destroy', function(){
        _.pull(KeyHandler.handlers, keyHandler);
    });

}