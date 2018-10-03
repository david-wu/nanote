angular.module('components')
    .directive('noteMetaEditor', [
        'KeyHandler',
        NoteMetaEditor
    ]);

function NoteMetaEditor(KeyHandler){
    return {
        scope: {
            note: '=',
        },
        templateUrl: 'components/noteMetaEditor/noteMetaEditor.tpl.html',
        link: linkFunc.bind(null, KeyHandler),
    };
}

function linkFunc(KeyHandler, scope, element, attrs){
    scope.accessButtons = [
        {
            text: 'Private',
            value: 'private',
        },
        {
            text: 'Public',
            value: 'public',
        },
    ];

    scope.delete = function(){
        scope.note.parent.remove(scope.note);
        scope.note.parent.syncTo();
        scope.note = undefined;
    }



    // var keyHandler = {
    //     tab: function(e){
    //         console.log('overloaded!')
    //         e.preventDefault();
    //     },
    //     shiftTab: function(e){
    //         console.log('overloaded!')
    //         e.preventDefault();
    //     },
    // };

    // KeyHandler.handlers.push(keyHandler);
    // scope.$on('$destroy', function(){
    //     _.pull(KeyHandler.handlers, keyHandler);
    // });
}
