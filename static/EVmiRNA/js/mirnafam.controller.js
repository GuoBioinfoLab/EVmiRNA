"use strict";

angular.module('EVmiRNA')
        .controller('MirnafamController',MirnafamController);

function MirnafamController($scope,$http,$window,$routeParams,EVmiRNAService){
        console.log("MirnafamController loaded");
        var base_url = EVmiRNAService.getAPIBaseUrl();
	var query_mirnafam = $routeParams.mirnafam;
	$scope.mirnafam = query_mirnafam;
	$http({
		url:base_url+"/api/mirna_list",
		method:"GET",
		params:{family:query_mirnafam}
	}).then(
		function(response){
			console.log(response);
			$scope.mirnafamMember = response.data.mirna_basic_list;
		}
	);
}
