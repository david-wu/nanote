angular.module('components')
    .directive('addressEditor', [
        AddressEditor
    ]);

function AddressEditor(){
    return {
        scope: {
            address: '=?',
        },
        templateUrl: 'components/addressEditor/addressEditor.tpl.html',
        link: linkFunc.bind(null),
    };
}

function linkFunc(scope, element, attrs){
    scope.typeButtons = [
        {
            text: 'Business',
            value: 'business',
        },
        {
            text: 'Mailing',
            value: 'mailing',
        },
        {
            text: 'Other',
            value: 'other',
        },
    ];

    scope.delete = function(){
        return scope.address.delete()
            .then(function(){
                scope.address.selectClosest();
                scope.address.unlink();
            });
    };

    scope.close = function(){
        scope.address.unselect();
    };

    scope.clip = function(){
        scope.address.clip();
    };

    scope.mediumButtonClass = {
        medium: true,
    };


    // scope.address.data changes when selecting different addresses and triggers the sync
    // prevAddress hack skips sync when selecting different addresses
    var prevAddress;
    scope.$watchCollection('address.data', function(curr, prev){
        if(prevAddress!==scope.address){
            prevAddress = scope.address;
            return;
        }
        scope.address.debouncedSync();
    });

}
