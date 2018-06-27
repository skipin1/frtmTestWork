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
                    console.error('Error', err);
                });
        };
        var setCars = function(data) {
            return $http.post('data.json', data)
                .then(function(response) {
                    $localStorage.cars = response && response.length ? response : [];
                })
                .catch(function(err) {
                    console.error('Error', err);
                });
        };
        return {
            getCars: getCars,
            setCars: setCars
        };

    });