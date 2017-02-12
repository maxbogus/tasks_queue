'use strict';

var app = angular.module('tasks', []);

app.controller('AngularJSCtrl', function ($scope, $http, $timeout) {
    $scope.error = null;
    $scope.timeOut = 0;
    $scope.sortDesc = false;

    $scope.propertyName = 'age';
    $scope.reverse = true;

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.intervalFunction = function () {
        $timeout(function () {
            $http(
                {
                    method: 'GET',
                    url: 'tasks/json'
                })
                .then(function (response) {
                    console.log('success');
                    console.log(response.data);
                    $scope.data = response.data.Tasks;
                    $scope.timeOut = 10000;
                }, function (response) {
                    $scope.error = "Error occurred. Status: " + response.status + ". More info in console log.";
                    console.log(response.data);
                    $scope.timeOut = 20000;
                });
            $scope.intervalFunction();
        }, $scope.timeOut)
    };

    // Kick off the interval
    $scope.intervalFunction();

});

app.controller('TaskController', function ($scope, $http) {
    $scope.master = {};

    $scope.update = function (task) {
        $scope.master = angular.copy(task);
        console.log(JSON.stringify($scope.master));
        $http(
            {
                method: 'POST',
                url: 'tasks',
                headers: "application/json",
                data: JSON.stringify($scope.master)
            })
            .then(function (response) {
                console.log('success');
                console.log(response.data);
                $scope.task = {
                    title: null,
                    description: null,
                    priority: null
                };
            }, function (response) {
                $scope.error = "Error occurred. Status: " + response.status + ". More info in console log.";
                console.log(response.data);
            });
    };

    $scope.reset = function () {
        $scope.task = angular.copy($scope.master);
    };

    $scope.reset();
});