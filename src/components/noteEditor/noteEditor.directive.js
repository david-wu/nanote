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
        templateUrl: 'components/noteEditor/noteEditor.tpl.html',
        link: linkFunc.bind(null, $timeout),
    };
}

function linkFunc($timeout, scope, element, attrs){

    var editor = ace.edit(element[0]);
    editor.$blockScrolling = Infinity;

    editor.setOptions({
        theme: 'ace/theme/monokai',
        maxLines: Infinity,
        showGutter: false,
        showPrintMargin: false,
    });

    if(scope.note){
        editor.setValue(scope.note.content);
        editor.clearSelection();
    }

    var editSession = editor.getSession();
    editSession.on('change', function(){
        if(scope.note){
            scope.note.setContent(editor.getValue());
        }
        $timeout(_.noop);
    });

    scope.$watch('note', function(currNote, prevNote){
        if(prevNote === currNote){return;}

        if(currNote){
            editor.setValue(currNote.content);
            editor.clearSelection();
        }
    });


    // Selects the textEl when enter key is pressed
    $('body').on('keydown', changeSelection);
    scope.$on('$destroy', function(){
        $('body').off('keydown', changeSelection);
    });
    function changeSelection(e){
        if(e.keyCode===13){
            var textEl = element.find('textarea')
            if(!textEl.is(':focus')){
                textEl.focus();
                e.preventDefault();
            }
        }
    }


}
