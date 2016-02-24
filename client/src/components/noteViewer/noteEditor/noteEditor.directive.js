angular.module('components')
    .directive('noteEditor', [
        '$timeout',
        NoteEditor
    ]);

function NoteEditor($timeout){
    return {
        scope: {
            note: '=?',
        },
        templateUrl: 'components/noteViewer/noteEditor/noteEditor.tpl.html',
        link: linkFunc.bind(null, $timeout),
    };
}

function linkFunc($timeout, scope, element, attrs){

    var editor = ace.edit(element[0]);
    editor.setTheme('ace/theme/monokai');
    if(scope.note){
        editor.setValue(scope.note.content);
    }

    var editSession = editor.getSession();
    editSession.on('change', function(){
        if(scope.note){
            scope.note.setContent(editor.getValue());
        }
    });

    scope.$watch('note', function(currNote, prevNote){
        if(prevNote === currNote){return;}

        if(prevNote){
            prevNote.setContent(editor.getValue());
        }

        if(currNote){
            editor.setValue(currNote.content);
        }

    });

}
