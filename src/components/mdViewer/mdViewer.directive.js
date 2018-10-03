angular.module('components')
    .directive('mdViewer', [
        '$timeout',
        'mdItCheckbox',
        MdViewer
    ]);

function MdViewer($timeout, mdItCheckbox){
    return {
        scope: {
            note: '=?',
        },
        templateUrl: 'components/mdViewer/mdViewer.tpl.html',
        link: linkFunc.bind(null, $timeout, mdItCheckbox),
    };
}

function linkFunc($timeout, mdItCheckbox, scope, element, attrs){

    var mdi = new markdownit({
        breaks: true
    });

    mdi.use(mdItCheckbox);

    var container = element;
    scope.$watch('note.content', function(content){
        if(!content){return;}
        container.html(mdi.render(content));
    })
}
