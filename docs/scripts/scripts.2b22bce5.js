"use strict";angular.module("testApp",["ngRoute","ngSanitize","ngStorage"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/start.html",controller:"StartCtrl",controllerAs:"start"}).when("/step2",{templateUrl:"views/finish.html",controller:"FinishCtrl",controllerAs:"finish"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]).run(["$rootScope",function(a){a.step=1}]),angular.module("testApp").directive("card",function(){return{restrict:"E",templateUrl:"views/partials/card.html",scope:{number:"=",selectedcars:"=",styleClass:"=",selectcar:"&","goto":"&"}}}),angular.module("testApp").factory("carsService",["$http","$localStorage",function(a,b){var c=function(){return a.get("data.json").then(function(a){return b.cars=a.data&&a.data.length>0?a.data:[],a.data})["catch"](function(a){throw new Error("Cant get cars from server! Response code is "+a.status+", message "+a.data)})},d=function(c){return a.post("data.json",c).then(function(a){a&&(b.selectedCars=[])})["catch"](function(a){throw new Error("Cant send cars to server! Response code is "+a.status+", message "+a.data)})};return{getCars:c,sendCars:d}}]),angular.module("testApp").controller("StartCtrl",["$scope","$rootScope","$localStorage","$location","carsService","$log",function(a,b,c,d,e,f){b.step=1,!c.cars||0===c.cars.length&&!c.selectedCars?e.getCars().then(function(b){f.log("Recive data",b),a.cars=b}):a.cars=c.cars,c.selectedCars&&0!==c.selectedCars.length?a.selectedCars=c.selectedCars:a.selectedCars=[],a.selectCar=function(b){var d=a.selectedCars.indexOf(b);-1===d?(a.cars.splice(a.cars.indexOf(b),1),a.selectedCars.push(b)):(a.selectedCars.splice(d,1),a.cars.push(b)),c.cars=a.cars,c.selectedCars=a.selectedCars},a.goTo=function(){c.selectedCars=a.selectedCars,d.path("step2"),f.log("goTo function work")}}]),angular.module("testApp").controller("FinishCtrl",["$rootScope","$scope","$localStorage","$location","carsService","$window","$log",function(a,b,c,d,e,f,g){a.step=2,c.selectedCars||0!==c.selectedCars.length||d.path("/"),b.selectedCars=c.selectedCars,b.sendData=function(){e.sendCars(b.selectedCars).then(function(a){g.log("SendCars response",a)})["catch"](function(a){f.alert(a)})}}]),angular.module("testApp").run(["$templateCache",function(a){a.put("views/finish.html",'<div class="finish"> <div class="finish__title"> <h2>Selected list</h2> </div> <div class="finish__table"> <table class="table table-hover"> <thead> <tr> <th class="text-center">Title</th> <th class="text-center">Description</th> <th class="text-center">Price</th> <th>Popularity</th> </tr> </thead> <tbody> <tr ng-repeat="car in selectedCars | orderBy: \'title\' track by car.id" ng-class-even="\'even\'"> <td class="col-xs-2 title">{{car.title}}</td> <td class="col-xs-6">{{car.description}}</td> <td class="col-xs-2 text-center">{{car.price | currency}}</td> <td class="col-xs-2 rating"> <div class="row"> <div class="col-xs-12"> <span ng-repeat="rating in [1,2,3,4,5]" class="star" ng-class="{\'fill\': rating<=car.popularity}"></span> </div> </div> </td> </tr> </tbody> </table> </div> <div class="finish__button"> <button type="button" class="btn btn-block btn-success" ng-click="sendData()">Send</button> </div> </div>'),a.put("views/partials/card.html",'<div class="card col-xs-12 col-sm-4"> <div class="card__wrapper"> <div class="card__title">List {{number}}</div> <div class="card__description">Далеко-далеко за словесными горами в стране.</div> <div class="card__result"> <button ng-repeat="car in selectedcars | orderBy: \'title\' track by car.id" ng-click="selectcar({car: car})" class="btn btn-sm btn-success item" type="button">{{car.title}}</button> </div> <button class="card__button btn col-xs-8" ng-class="styleClass" ng-click="goto()" ng-disabled="selectedcars.length === 0">Go to step 2</button> <div class="clearfix"></div> </div> </div>'),a.put("views/start.html",'<div class="page" ng-cloak> <div class="page__title">1. Step 1</div> <div class="page__list row"> <card number="1" selectedcars="selectedCars" selectcar="selectCar(car)" goto="goTo()" style-class="\'orange\'"></card> <card number="2" selectedcars="selectedCars" selectcar="selectCar(car)" goto="goTo()" style-class="\'skyblue\'"></card> <card number="3" selectedcars="selectedCars" selectcar="selectCar(car)" goto="goTo()" style-class="\'green\'"></card> </div> <div class="page__table"> <table class="table table-hover"> <thead> <tr> <th>Title</th> <th class="text-center">Description</th> <th class="text-center">Price</th> <th>Popularity</th> </tr> </thead> <tbody> <tr ng-show="cars.length === 0"> <td colspan="4" class="text-center">Car list is empty</td> </tr> <tr ng-repeat="car in cars | orderBy: \'title\' track by car.id" ng-class-even="\'even\'"> <td class="col-xs-2 col-md-2 col-lg-2 title">{{car.title}}</td> <td class="col-xs-4 col-md-5 col-lg-6">{{car.description}}</td> <td class="col-xs-2 col-md-2 col-lg- 2 text-center">{{car.price | currency}}</td> <td class="col-xs-4 col-md-3 col-lg-2 rating rating_with-padding"> <div class="row"> <div class="col-xs-7"> <span ng-repeat="rating in [1,2,3,4,5]" class="star" ng-class="{\'fill\': rating<=car.popularity}"></span> </div> <div class="col-xs-5"> <button class="btn select" ng-click="selectCar(car)">Select</button> </div> </div> </td> </tr> </tbody> </table> </div> </div>')}]);