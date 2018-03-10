"use strict";

angular.module('EVmiRNA')
    .controller('BrowseController', BrowseController);

function BrowseController($scope,$http,EVmiRNAService) {
    console.log("BrowseController loaded");

   $scope.get_list = function () {
        var sc = '';
        sc = $scope.sc;
        $http({
           url:  '/api/browse',
            method: 'GET',
            params: {sc:sc}
        }).then(
           function (response) {
            console.log(response);
            $scope.browse = response.data;
             }
        )
     };
    $scope.get_list();
}
