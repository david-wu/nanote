angular.module('components')
    .directive('mdViewer', [
        '$timeout',
        MdViewer
    ]);

function MdViewer($timeout){
    return {
        scope: {
            note: '=?',
        },
        templateUrl: 'components/mdViewer/mdViewer.tpl.html',
        link: linkFunc.bind(null, $timeout),
    };
}

function linkFunc($timeout, scope, element, attrs){

    console.log(scope.note)
    var mdi = new markdownit();
    console.log(mdi.render('asdf'))

    scope.$watch('note.content', function(content){
        element.html(mdi.render(content))
    })
}
