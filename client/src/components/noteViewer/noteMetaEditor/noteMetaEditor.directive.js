angular.module('components')
    .directive('noteMetaEditor', [
        NoteMetaEditor
    ]);

function NoteMetaEditor(){
    return {
        scope: {
            note: '=',
        },
        templateUrl: 'components/noteViewer/noteMetaEditor/noteMetaEditor.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){
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
}
