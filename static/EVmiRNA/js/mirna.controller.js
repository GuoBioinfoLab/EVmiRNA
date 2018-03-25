'use strict';

angular.module('EVmiRNA')
	.controller('MirnaController',MirnaController);

function MirnaController($http,$scope,$routeParams,EVmiRNAService){
	console.log($routeParams.miRNA);
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var query_mirna =  $routeParams.miRNA;
	$scope.query_miRNA = query_mirna;
	$scope.fetch_miRNA = function(){
		$http({
			url: base_url+'/api/mirna_list',
			method:'GET',
			params: {mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_basic_list = response.data.mirna_basic_list;
			}
		)};
	$scope.fetch_mirTarget = function(){
		$http({
			url: base_url+'/api/mirna_target',
			method: 'GET',
			params: {mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_target_list = response.data.mir_target_list;
			}
		)};
	$scope.fetch_pathway = function(){
		$http({
			url: base_url+'/api/mirna_pathway',
			method:'GET',
			params:{mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_pathway_list = response.data.mir_pathway_list;
			}
		)};
	$scope.fetch_pubmed = function(){
		$http({
			url: base_url+'/api/mirna_pubmed',
			method:'GET',
			params:{mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_pubmed_list = response.data.mir_pubmed_list;
			}
		)};
	$scope.fetch_pubmed();
	$scope.fetch_pathway();
	$scope.fetch_miRNA();
	$scope.fetch_mirTarget();
	$scope.set_style =  function(){
		$("#sequence").html($("#sequence").slice(0,1)+"<span style='color:red;'>"+$("#sequence").slice(1,7)+"</span>"+$("#sequence").slice(7));
	};
	$scope.set_style();
		
}
