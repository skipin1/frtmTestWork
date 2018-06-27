'use strict';

angular.module('testApp')
    .directive('card', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/card.html',
            scope: {
                number: '=',
                selectedcars: '=',
                styleClass: '=',
                selectcar: '&',
                goto: '&'
            },
        };
    });