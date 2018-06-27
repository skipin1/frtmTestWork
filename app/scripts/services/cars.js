'use strict';

angular.module('testApp')
    .factory('carsService', function($http, $localStorage) {
        var getCars = function() {
            return $http.get('data.json')
                .then(function(response) {
                    $localStorage.cars = response.data && response.data.length > 0 ? response.data : [];
                    return response.data;
                })
                .catch(function(err) {
                    throw new Error('Cant get cars from server! Response code is ' + err.status + ', message ' + err.data);
                });
        };
        var sendCars = function(data) {
            return $http.post('data.json', data)
                .then(function(response) {
                    if (response) {
                        $localStorage.selectedCars = [];
                    }
                })
                .catch(function(err) {
                    throw new Error('Cant send cars to server! Response code is ' + err.status + ', message ' + err.data);
                });
        };
        return {
            getCars: getCars,
            sendCars: sendCars
        };
    });