angular.module('views')
    .controller('NoteViewPage', [
        '$scope',
        'NoteGroup',
        NoteViewPage
    ]);

function NoteViewPage($scope, NoteGroup){

    $scope.noteList = new NoteGroup();
    $scope.noteList.syncFrom();
    if(!$scope.noteList.children.length){
        $scope.noteList.addDefaultNote();
    }

    $scope.listViewerColumns = [
        {
            html: function(d){
                return d.name;
            },
        },
        {
            html: function(d){
                return d.tags && d.tags.join(', ');
            }
        },
    ];
}