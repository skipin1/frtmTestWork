'use strict';

angular.module('testApp')
    .controller('FinishCtrl', function($rootScope) {
        $rootScope.step = 2;
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });