angular.module('views')
    .controller('NoteViewPage', [
        '$scope',
        'NoteGroup',
        NoteViewPage
    ]);

function NoteViewPage($scope, NoteGroup){
    $scope.noteList = new NoteGroup();

    $scope.listViewerColumns = [
        {
            html: function(d){
                return d.name;
            },
        },
    ];

}
