angular.module('views')
    .controller('ProfileViewer', [
        '$scope',
        '$timeout',
        'AddressGroup',
        ProfileViewer
    ]);

function ProfileViewer($scope, $timeout, AddressGroup){

    $scope.addressGroup = new AddressGroup();

    $scope.autocompleterForm = {
        handler: function(addressJson){
            $scope.addressGroup.create(addressJson);
        },
        focus: true,
    };

    $scope.$watch('addressGroup.children.length', function(length){
        if(length <= 0){
            $scope.autocompleterForm.focus = true;
            $timeout(_.noop);
        }
    });

    $scope.columns = [
        {
            html: function(d){
                return d.htmlString();
            },
        }
    ];

}
