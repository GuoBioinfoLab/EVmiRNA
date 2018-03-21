'use strict';

andgular.module('EVmiRNA')
	.controller('MirnaController',MirnaController);

function MirnaController($http,$scope,$routeParams,EVmiRNAService){
	console.log($routeParams.miRNA);
	var base_url = EVmiRNAService.getAPIBaseUrl();
	$scope.query_miRNA = $routeParams.miRNA;
	$scope.fetch_miRNA = function(){
		$scope.query_miRNA = $routeParams.miRNA;
		$http({
			url: base_url+'/api/mirna_list',
			method:'GET',
			params: {miRNA_id:$routeParams.miRNA}
		}).then(
			function(response){
			$scope.mirna_list = response.data.mirna_list;
			}
		);
	$scope.fetch_miRNA();
}
