import App from 'app/app.js';
import 'app/controller'; // running controllers
import HomeTemplateUrl from 'app/view/home.html';

/**
 * App routing
 *
 * You can leave it here in the config section or take it out
 * into separate file
 *
 */
function config($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  // routes
  $routeProvider
    .when('/', {
      templateUrl: HomeTemplateUrl,
      controller: 'MainController',
      controllerAs: 'main'
    })
    // .when('/contact', {
    //   templateUrl: 'views/contact.html',
    //   controller: 'MainController',
    //   controllerAs: 'main'
    // })
    // .when('/setup', {
    //   templateUrl: 'views/setup.html',
    //   controller: 'MainController',
    //   controllerAs: 'main'
    // })
    .otherwise({
      redirectTo: '/'
    });

  // $httpProvider.interceptors.push('authInterceptor');
}
// safe dependency injection
// this prevents minification issues
config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

App.config(config);
