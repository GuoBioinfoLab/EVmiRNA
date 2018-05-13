"use strict";

angular.module('EVmiRNA')
	.controller('SearchController',SearchController);

function SearchController($scope,$http,$window,$routeParams,EVmiRNAService){
	console.log("SearchController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var flag = 0;
	var mirnalist = [];
	var mircomplete = [];
	$scope.check = function (query_item){
        	if(/[@#\$%\^&\*]+/g.test(query_item)){
            		alert("Invalid input");
            		flag=1;
            		history.back();
        	}
        };
	$scope.filter_id = function(){
		$scope.check($scope.query_miRNA);
<<<<<<< HEAD
		if(flag == 0){
			var tempbit = $scope.query_miRNA.search(/hsa-miR/i);
			if (tempbit != 0){
				var query_item = $scope.query_miRNA.replace(/hsa-miR/i,"miR");
				window.open(base_url+"#!miRNA_info?miRNA="+"hsa-"+query_item,"_self");
			}
			else{
			window.open(base_url+"#!miRNA_info?miRNA="+$scope.query_miRNA,"_self");
			}
		}
=======
		var query_param =  "hsa-"+$scope.query_miRNA;
		$http({
			url:base_url+"/api/exp_source",
			params:{mirna:query_param},
			method:"GET"
		}).then(
			function(response){
				var temp = response.data.exp_source_list;
				console.log("temp");
				console.log(temp.length);
				console.log(response);
				if(temp.length != 0){
					if(flag == 0){
                                		window.open(base_url+"#!miRNA_info?miRNA=hsa-"+$scope.query_miRNA,"_self");
					}
				}
				else{
					window.open(base_url+"search","_self");
				}
			})
>>>>>>> 2e98444ca32f22aa6ca55ca9c22d0ee6472ca3eb
	};
	$scope.filter_fam = function(){
		window.open(base_url+"#!family?mirnafam="+$scope.query_fam,"_self");
	};
	$scope.filter_source = function(){
		window.open(base_url+"#!sample?sample=source&source="+$scope.query_source,"_self");
	};
	$scope.filter_cell_line = function(){
		window.open(base_url+"#!sample?sample=cell_line&cellline="+$scope.query_cellline,"_self");
	}
	$scope.filter_desease = function(){
		window.open(base_url+"#!sample?sample=desease&desease="+$scope.query_desease,"_self");
	}
	$.get("/api/mirnalist",function(content){
		var mirnalist = content;
		$(function(){
			$("#mirnaid").autocomplete({
				source: mirnalist
			},
			{
				minLength:6
			});
		});
	});
}
