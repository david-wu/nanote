angular.module('gulp.templateCache', []);

angular.module('app', [
    'gulp.templateCache',
    'ngSanitize',
    'ui.router',
    'components',
    'services',
    'views',
]);
