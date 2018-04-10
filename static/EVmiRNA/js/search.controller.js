"use strict";

angular.module('EVmiRNA')
	.controller('SearchController',SearchController);

function SearchController($scope,$http,$window,$routeParams,EVmiRNAService){
	console.log("SearchController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var flag = 0;
	var mirnalist = [];
	var mircomplete = [];
	$scope.check = function (query_item) {
        	if(/[@#\$%\^&\*]+/g.test(query_item)){
            		alert("Invalid input");
            		flag=1;
            		history.back();
        }
        };
	$scope.filter_id = function(){
		$scope.check($scope.query_miRNA);
		if(flag == 0){
			window.open(base_url+"#!miRNA_info?miRNA="+$scope.query_miRNA,"_self")
		}
	};
	$http({
		url:base_url+"/api/mirnalist",
		method:"GET"
	}).then(
		function(response){
			console.log(response);
			mirnalist = response.data.mirna_list;
			var l = mirnalist.length;
			for(var x=0; x<l; x++){
				mircomplete.push(String(mirnalist[x].mirna));
			}
			console.log(mircomplete);
			$(function(){
				$("#mirnaid").autocomplete({
					source: mircomplete
				},
				{
					minLength:10
				});
			});
	});
}
