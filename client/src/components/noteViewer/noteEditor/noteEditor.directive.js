angular.module('components')
    .directive('noteEditor', [
        NoteEditor
    ]);

function NoteEditor(){
    return {
        scope: {
            note: '=',
        },
        templateUrl: 'components/noteViewer/noteEditor/noteEditor.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){

    var editor = ace.edit(element[0]);
    editor.setTheme('ace/theme/monokai');
    if(scope.note){
        editor.setValue(scope.note.content);
    }

    var editSession = editor.getSession();
    editSession.on('change', function(){
        scope.note.content = editor.getValue();
    });

    scope.$watch('note', function(currNote, prevNote){
        if(prevNote === currNote){return;}

        var editorContent = editor.getValue();
        if(editorContent !== prevNote.content){
            prevNote.content = editorContent;
            prevNote.lastModified = Date.now();
        }
    })

}
