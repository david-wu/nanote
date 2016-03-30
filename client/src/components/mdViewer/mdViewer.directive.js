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

    var mdi = new markdownit({
        breaks: true
    });

    var container = element;
    scope.$watch('note.content', function(content){
        if(!content){return;}
        container.html(mdi.render(content));
    })
}
