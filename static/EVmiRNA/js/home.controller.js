"use strict";

angular.module('EVmiRNA')
    .controller('HomeController', HomeController);

function HomeController($scope,$http,$routeParams,EVmiRNAService) {
    console.log("HomeController loaded");
    var sampleNo = $routeParams.sample;
    $scope.get_list = function () {
         $http({
             url:  '/api/samplerun',
             method: 'GET',
	     params:{sample:sampleNo}
         }).then(
            function (response) {
            console.log(response);
            $scope.runlist = response.data.sample_run_list;
             }
        )
     };
    $scope.get_list();
}
