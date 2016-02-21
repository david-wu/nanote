angular.module('views')
    .controller('NoteViewPage', [
        '$scope',
        'User',
        'NoteGroup',
        NoteViewPage
    ]);

function NoteViewPage($scope, User, NoteGroup){
    $scope.user = new User();
    $scope.noteGroup = new NoteGroup();

    $scope.groupViewerColumns = [
        {
            html: function(d){
                return d.name;
            },
        },
    ];

}
