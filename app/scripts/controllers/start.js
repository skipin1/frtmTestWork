'use strict';

angular.module('testApp')
    .controller('StartCtrl', function($scope, $rootScope, $localStorage, $location, carsService, $log) {
        $rootScope.step = 1;

        // Cars
        if (!$localStorage.cars || $localStorage.cars.length === 0 && !$localStorage.selectedCars) {
            carsService.getCars().then(function(data) {
                $log.log('Recive data', data);
                $scope.cars = data;
            });
        } else {
            $scope.cars = $localStorage.cars;
        }

        // SelectedCars
        if (!$localStorage.selectedCars || $localStorage.selectedCars.length === 0) {
            $scope.selectedCars = [];
        } else {
            $scope.selectedCars = $localStorage.selectedCars;
        }

        $scope.selectCar = function(car) {
            var index = $scope.selectedCars.indexOf(car);
            if (index === -1) {
                $scope.cars.splice($scope.cars.indexOf(car), 1);
                $scope.selectedCars.push(car);
            } else {
                $scope.selectedCars.splice(index, 1);
                $scope.cars.push(car);
            }
            $localStorage.cars = $scope.cars;
            $localStorage.selectedCars = $scope.selectedCars;
        };

        $scope.goTo = function() {
            $localStorage.selectedCars = $scope.selectedCars;
            $location.path('step2');
            $log.log('goTo function work');
        };

    });