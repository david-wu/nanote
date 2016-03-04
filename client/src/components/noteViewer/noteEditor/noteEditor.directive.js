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

// Initialize editor with custom theme and modules
var fullEditor = new Quill(element.find('.full-editor')[0], {
  modules: {
    'authorship': { authorId: 'galadriel', enabled: true },
    'multi-cursor': true,
    'toolbar': { container: '#toolbar' },
    'link-tooltip': true
  },
  theme: 'snow'
});

// Add basic editor's author
var authorship = fullEditor.getModule('authorship');
authorship.addAuthor('gandalf', 'rgba(255,153,51,0.4)');

// Add a cursor to represent basic editor's cursor
var cursorManager = fullEditor.getModule('multi-cursor');
cursorManager.setCursor('gandalf', fullEditor.getLength()-1, 'Gandalf', 'rgba(255,153,51,0.9)');

// Sync basic editor's cursor location
// basicEditor.on('selection-change', function(range) {
//   if (range) {
//     cursorManager.moveCursor('gandalf', range.end);
//   }
// });

// // Update basic editor's content with ours
// fullEditor.on('text-change', function(delta, source) {
//   if (source === 'user') {
//     basicEditor.updateContents(delta);
//   }
// });

// // basicEditor needs authorship module to accept changes from fullEditor's authorship module
// basicEditor.addModule('authorship', {
//   authorId: 'gandalf',
//   color: 'rgba(255,153,51,0.4)'
// });

// // Update our content with basic editor's
// basicEditor.on('text-change', function(delta, source) {
//   if (source === 'user') {
//     fullEditor.updateContents(delta);
//   }
// });






    // var editor = ace.edit(element[0]);
    // editor.$blockScrolling = Infinity;
    // editor.setTheme('ace/theme/monokai');
    // if(scope.note){
    //     editor.setValue(scope.note.content);
    //         editor.clearSelection();

    // }

    // var editSession = editor.getSession();
    // editSession.on('change', function(){
    //     if(scope.note){
    //         scope.note.setContent(editor.getValue());
    //     }
    // });

    // scope.$watch('note', function(currNote, prevNote){
    //     if(prevNote === currNote){return;}

    //     if(currNote){
    //         editor.setValue(currNote.content);
    //         editor.clearSelection();
    //     }
    // });


    // // Selects the textEl when enter key is pressed
    // $('body').on('keydown', changeSelection);
    // scope.$on('$destroy', function(){
    //     $('body').off('keydown', changeSelection);
    // });
    // function changeSelection(e){
    //     if(e.keyCode===13){
    //         var textEl = element.find('textarea')
    //         if(!textEl.is(':focus')){
    //             textEl.focus();
    //             e.preventDefault();
    //         }
    //     }
    // }


}
