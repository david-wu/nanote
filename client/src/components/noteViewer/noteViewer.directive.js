angular.module('components')
    .directive('noteViewer', [
        NoteViewer
    ]);

function NoteViewer(Code, CodeGroup){
    return {
        scope: {
            note:'=',
        },
        templateUrl: 'components/noteViewer/noteViewer.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attr){

}