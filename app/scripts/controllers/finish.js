'use strict';

angular.module('testApp')
    .controller('FinishCtrl', function($rootScope, $scope, $localStorage, $location, carsService, $window) {
        $rootScope.step = 2;
        if (!$localStorage.selectedCars || $localStorage.selectedCars.length === 0) {
            $location.path('/');
        }
        $scope.selectedCars = $localStorage.selectedCars;
        $scope.sendData = function() {
            carsService.sendCars($scope.selectedCars)
                .then(function() {
                    $window.alert('Send success');
                    $location.path('/');
                })
                .catch(function(err) {
                    $window.alert(err);
                });
        };
    });