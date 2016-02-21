angular.module('views', [])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/noteViewPage');

        $stateProvider
            .state('profileViewer', {
                url: '/profileViewer',
                controller: 'ProfileViewer',
                templateUrl: 'views/profileViewer/profileViewer.tpl.html',
            });

        $stateProvider
            .state('noteViewPage', {
                url: '/noteViewPage',
                controller: 'NoteViewPage',
                templateUrl: 'views/noteViewPage/noteViewPage.tpl.html',
            });

    });