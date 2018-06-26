'use strict';

angular.module('testApp')
    .controller('StartCtrl', function($rootScope) {
        $rootScope.step = 1;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });