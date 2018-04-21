"use strict";

angular.module('EVmiRNA')
	.controller('SampleController',SampleController);

function SampleController($http,$scope,$window,$routeParams,EVmiRNAService){
	console.log("SampleController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();
	if($routeParams.sample == "source"){
		$scope.one =1;
		getSourceexp();
	}
	else if ($routeParams.sample == "cell_line"){
		$scope.two = 1;
		getCelllineexp();
	}
	else if($routeParams.sample == "desease"){
		$scope.three = 1;
		getDeseaseexp();
	}
	function getSourceexp(){
		$http({
			url:base_url+"/api/sourceexp",
			method:"GET",
			params:{source:$routeParams.source}
		}).then(
			function(response){
				console.log(response);
				$scope.sourceexplist = response.data.sourceexp_list;
				var length = response.data.records_num;
				$scope.source = $routeParams.source;
				var dataPoints = [];
				var sum = 0;
				var others = 0;
				var otherlist = [];
				for(var i=0;i<length;i++){
					sum = sum +$scope.sourceexplist[i].expression;
				}
				for(var n=0;n<length;n++){
					if($scope.sourceexplist[n].expression/sum > 0.01){	
						dataPoints.push({
							y:$scope.sourceexplist[n].expression/sum,
							label:$scope.sourceexplist[n]["mirna"]
						});
						otherlist.push($scope.sourceexplist[n]["mirna"]);
					}else{
						others = others+$scope.sourceexplist[n].expression;
					}
				}
				dataPoints.push({
					y:others/sum,
					label:"others"
				});
				$scope.interestlist = otherlist;
				var chart = new CanvasJS.Chart("sourceContainer",{
					theme:"light2",
					exportEnabled:true,
					title:{
						text:"mirna expression of"+" "+$scope.source
					},
					data:[{
						type:"pie",
						startAngle:"25",
						toolTipContent:"<b>{label}</b>:{y}%",
						showInLegend:"true",
						legendText:"{label}",
						indexLabelFontSize:16,
						indexLabel:"{label} - {y}%",
						dataPoints:dataPoints
					}]
				});
				chart.render();
			}
		);
	}
	function getCelllineexp(){
		$http({
			url:base_url+"/api/cellinexp",
			method:"GET",
			params:{cell_line:$routeParams.cellline}
		}).then(
			function(response){
				console.log(response);
				$scope.celllinelist = response.data.celllineexp_list;
				var length = response.data.records_num;
				$scope.cellline = $routeParams.cellline;
				var dataPoints = [];
				var sum = 0;
				var others = 0;
				var otherlist = [];
				for(var i=0;i<length;i++){
					sum = sum +$scope.celllinelist[i].expression;
				}
				for(var n=0;n<length;n++){
					if($scope.celllinelist[n].expression/sum > 0.01){	
						dataPoints.push({
							y:$scope.celllinelist[n].expression/sum,
							label:$scope.celllinelist[n]["mirna"]
						});
						otherlist.push($scope.celllinelist[n]["mirna"]);
					}else{
						others = others+$scope.celllinelist[n].expression;
					}
				}
				dataPoints.push({
					y:others/sum,
					label:"others"
				});
				$scope.interestlistcl = otherlist;
				var chart = new CanvasJS.Chart("celllineContainer",{
					theme:"light2",
					exportEnabled:true,
					title:{
						text:"mirna expression of"+" "+$scope.cellline
					},
					data:[{
						type:"pie",
						startAngle:"25",
						toolTipContent:"<b>{label}</b>:{y}%",
						showInLegend:"true",
						legendText:"{label}",
						indexLabelFontSize:16,
						indexLabel:"{label} - {y}%",
						dataPoints:dataPoints
					}]
				});
				chart.render();
			}
		);
	}
	function getDeseaseexp(){
		$http({
			url:base_url+"/api/cancerexp",
			method:"GET",
			params:{desease:$routeParams.desease}
		}).then(
			function(response){
				console.log(response);
				$scope.deseaselist = response.data.cancerexp_list;
				var length = response.data.records_num;
				$scope.desease = $routeParams.desease;
				var dataPoints = [];
				var sum = 0;
				var others = 0;
				var otherlist = [];
				for(var i=0;i<length;i++){
					sum = sum +$scope.deseaselist[i].expression;
				}
				for(var n=0;n<length;n++){
					if($scope.deseaselist[n].expression/sum > 0.01){	
						dataPoints.push({
							y:$scope.deseaselist[n].expression/sum,
							label:$scope.deseaselist[n]["mirna"]
						});
						otherlist.push($scope.deseaselist[n]["mirna"]);
					}else{
						others = others+$scope.deseaselist[n].expression;
					}
				}
				dataPoints.push({
					y:others/sum,
					label:"others"
				});
				$scope.interestlistds = otherlist;
				var chart = new CanvasJS.Chart("deseaseContainer",{
					theme:"light2",
					exportEnabled:true,
					title:{
						text:"mirna expression of"+" "+$scope.desease
					},
					data:[{
						type:"pie",
						startAngle:"25",
						toolTipContent:"<b>{label}</b>:{y}%",
						showInLegend:"true",
						legendText:"{label}",
						indexLabelFontSize:16,
						indexLabel:"{label} - {y}%",
						dataPoints:dataPoints
					}]
				});
				chart.render();
			}
		);
	}
}
