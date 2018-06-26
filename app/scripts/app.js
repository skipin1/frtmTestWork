'use strict';

/**
 * @ngdoc overview
 * @name testApp
 * @description
 * # testApp
 *
 * Main module of the application.
 */
angular
    .module('testApp', [
        'ngRoute',
        'ngSanitize'
    ])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/start.html',
                controller: 'StartCtrl',
                controllerAs: 'start'
            })
            .when('/step2', {
                templateUrl: 'views/finish.html',
                controller: 'FinishCtrl',
                controllerAs: 'finish'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    })
    .run(function($rootScope) { $rootScope.step = 1; });