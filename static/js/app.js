/**
 * Created by mboguslavskiy on 07/02/17.
 */

'use strict';

var app = angular.module('tasks', []);

app.controller('AngularJSCtrl', function ($scope, $http, $timeout) {
    $scope.error = null;
    $scope.timeOut = 0;

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