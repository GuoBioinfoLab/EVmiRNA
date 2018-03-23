'use strict';

angular.module('EVmiRNA')
	.controller('MirnaController',MirnaController);

function MirnaController($http,$scope,$routeParams,EVmiRNAService){
	console.log($routeParams.miRNA);
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var query_mirna =  $routeParams.miRNA;
	$scope.query_miRNA = query_mirna;
	$scope.fetch_miRNA = function(){
		$scope.query_miRNA = $routeParams.miRNA;
		$http({
			url: base_url+'/api/mirna_list',
			method:'GET',
			params: {mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_list = response.data.mirna_basic_list;
			}
		)};
	$scope.fetch_miRNA();
}
