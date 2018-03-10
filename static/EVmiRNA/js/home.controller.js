"use strict";

angular.module('EVmiRNA')
    .controller('HomeController', HomeController);

function HomeController($scope,$http,EVmiRNAService) {
    console.log("HomeController loaded");

    $scope.get_list = function () {
        var sc = '';
         sc = $scope.sc;
         $http({
             url:  '/api/test',
             method: 'GET',
             params: {sc:sc}
         }).then(
            function (response) {
            console.log(response);
            $scope.sc_list = response.data;
             }
        )
     };
    $scope.get_list();
}
