"use strict";

angular.module('EVmiRNA')
    .controller('mirAnnoController', mirAnnoController);

function mirAnnoController($scope,$http,EVmiRNAService) {
    console.log("mirAnnoController loaded");

   $scope.get_list = function () {
        var sc = '';
        sc = $scope.sc;
        $http({
           url:  '/api/miRNA_annotation',
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
