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
	$scope.draw_exp_source = function(){
		$scope.mirnaSourcebar = function(){
			$http({
				url:base_url+'/api/exp_source',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
		            		console.log(response);
					$scope.exp_source = response.data.exp_source_list;
					var chart = new CanvasJS.Chart("barContainer", {
						animationEnabled: true,
						width:600,
						exportEnabled: true,
						theme: "light1", 
						axisX:{
							interval:1,
							labelFontSize:10,
							labelAngle:-45
						},
						axisY:{
							interlacedColor:"rgba(1,77,101,.2)",
							gridColor:"rgba(1,77,101,.1)",
							title:$scope.exp_source[0].mirna+" "+"expression"
						},
						data: [{
							type: "column", 
							color:"#014D65",
							dataPoints:[
							{label:"Breast",y:$scope.exp_source[0].Breast},
							{label:"Tongue",y:$scope.exp_source[0].Tongue},
							{label:"Kidney",y:$scope.exp_source[0].Kidney},
							{label:"Saliva",y:$scope.exp_source[0].Saliva},
							{label:"Lymph",y:$scope.exp_source[0].Lymph},
							{label:"Blood",y:$scope.exp_source[0].Blood},
							{label:"Urine",y:$scope.exp_source[0].Urine},
							{label:"Colon",y:$scope.exp_source[0].Colon},
							{label:"Seminal fluid",y:$scope.exp_source[0].Seminal_fluid},
                                                        {label:"Human mast cells",y:$scope.exp_source[0].Human_mast_cells},
                                                        {label:"CLL cell line",y:$scope.exp_source[0].CLL_cell_line},
                                                        {label:"Breast milk",y:$scope.exp_source[0].Breast_milk},
                                                        {label:"Fibroblasts",y:$scope.exp_source[0].Fibroblasts},
							{label:"Human epithelial cells",y:$scope.exp_source[0].Human_epithelial_cells},
                                                        {label:"Mesenchymal Stem Cells",y:$scope.exp_source[0].Mesenchymal_Stem_Cells},
							{label:"Human Mammary Epithelial Cells",y:$scope.exp_source[0].Human_Mammary_Epithelial_Cells},
                                                        {label:"B-lymphoblastoid cell lines",y:$scope.exp_source[0].Blymphoblastoid_cell_lines},
							]
						}]
					});
					chart.render();
				})
		};
		$scope.mirnaSourcebar();
	};
	$scope.draw_exp_cancer = function(){
		$scope.mirnacancerbar = function(){
			$http({
				url:base_url +'api/exp_cancer',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
					console.log(response);
					$scope.exp_cancer = response.data.exp_cancer_list;
					var chart = new CanvasJS.Chart("barContainer", {
	                    animationEnabled: true,
	                    exportEnabled: true,
			    width:600,
	                    theme: "light1", // "light1", "light2", "dark1", "dark2"
	                    axisX:{
							interval:1,
							labelFontSize:11,
							labelAngle:-45
						},
						axisY:{
							title:$scope.exp_cancer[0].mirna+" "+"expression",
							gridColor:"rgba(1,77,101,.1)",
							interlacedColor:"rgba(1,77,101,.2)"
						},
	                    data: [{
	                        type: "column",
							color:"#014D65",
	                        dataPoints:[
								{label:"Colon carcinoma",y:$scope.exp_cancer[0].Colon_carcinoma},
								{label:"Prostate Cancer",y:$scope.exp_cancer[0].Prostate_Cancer},
								{label:"Oral cancer",y:$scope.exp_cancer[0].Oral_cancer},
								{label:"Lymphoma",y:$scope.exp_cancer[0].Lymphoma},
				    				{label:"Chronic lymphocytic leukemi", y: $scope.exp_cancer[0].Chronic_lymphocytic_leukemi},
                                                                {label:"chronic_myelocytic_leukemia",y:$scope.exp_cancer[0].chronic_myelocytic_leukemia},
                                    				{label:"Squamous cell carcinoma",y:$scope.exp_cancer[0].Squamous_cell_carcinoma},
                                                                {label:"Breast adenocarcinoma",  y:$scope.exp_cancer[0].Breast_adenocarcinoma},
                                                		{label:"Pancreatic Cancer",y:$scope.exp_cancer[0].Pancreatic_Cancer},
                                                                {label:"Mast cell leukemia",y:$scope.exp_cancer[0].Mast_cell_leukemia},
								{label:"Healthy_Control",y:$scope.exp_cancer[0].Healthy_Control}
	                        ]
	                    }]
	             	});
	            chart.render();
	            }
	        )
		};
		$scope.mirnacancerbar();
	};
	$scope.draw_celline = function(){
		$scope.celllinebar = function(){
			$http({
				url:base_url+"/api/exp_cellline",
				method:'GET',
				params:{mirna:query_mirna}
				}).then(
					function(response){
					console.log(response);
					$scope.exp_celline = response.data.exp_cellline_list;
					var chart = new CanvasJS.Chart("barContainer", {
				    	animationEnabled: true,
				    	exportEnabled: true,
				    	theme: "light1", 
					width:600,
				        axisX:{
							interval:1,
							labelFontSize:10,
							labelAngle:-45
						},
						axisY:{
							interlacedColor:"rgba(1,77,101,.2)",
							gridColor:"rgba(1,77,101,.1)",
							title:$scope.exp_celline[0].mirna+" "+"expression"
						},
				       	data: [{
				            type: "column",
					    	color:"#014D65",
				            dataPoints:[
				{label:"Blood",y:$scope.exp_celline[0].Blood},
				{label:"HMC1",y:$scope.exp_celline[0].HMC1},
				{label:"Saliva",y:$scope.exp_celline[0].Saliva},
				{label:"Fibroblasts",y:$scope.exp_celline[0].Fibroblasts},
				{label:"Seminal fluid",y:$scope.exp_celline[0].Seminal_fluid},
				{label:"DLD-1",y:$scope.exp_celline[0].DLD1},
				{label:"SCC9",  y:$scope.exp_celline[0].SCC9},
                                {label:"MDAMB231", y: $scope.exp_celline[0].MDAMB231},
                                {label:"Bjab",y:$scope.exp_celline[0].Bjab},
                                {label:"MCF7",y:$scope.exp_celline[0].MCF7},
                                {label:"LIM1863",y:$scope.exp_celline[0].LIM1863},
                                {label:"MCF10A",y:$scope.exp_celline[0].MCF10A},
                                {label:"TY1",y:$scope.exp_celline[0].TY1},
                                {label:"K562",y:$scope.exp_celline[0].K562},
                                {label:"BJAB",y:$scope.exp_celline[0].BJAB},
								{label:"DKO-1",y:$scope.exp_celline[0].DKO-1},
								{label:"DKs-8",y:$scope.exp_celline[0].DKs8},
								{label:"HEK293T",y:$scope.exp_celline[0].HEK293T},
								{label:"HMEC",y:$scope.exp_celline[0].HMEC},
								{label:"Urine",y:$scope.exp_celline[0].Urine},
								{lable:"CLL cell line",y:$scope.exp_celline[0].CLL_cell_line},
								{label:"Cal-27",y:$scope.exp_celline[0].Cal27},
								{label:"BCBL-1",y:$scope.exp_celline[0].BCBL1},
								{label:"Breast milk",y:$scope.exp_celline[0].Breast_milk},
								{label:"LCL",y:$scope.exp_celline[0].LCL},
								{label:"Mutu-1",y:$scope.exp_celline[0].Mutu1},
				{label:"Umbilical cord Mesenchymal Stem Cells",y:$scope.exp_celline[0].Umbilical_cord_Mesenchymal_Stem_Cells},
                                {label:"Adipose Mesenchymal Stem Cells",y:$scope.exp_celline[0].Adipose_Mesenchymal_Stem_Cells},
                                {label:"Fetus Mesenchymal Stem Cells",y:$scope.exp_celline[0].Fetus_Mesenchymal_Stem_Cells},
                                {label:"Adult Mesenchymal Stem Cells",y:$scope.exp_celline[0].Adult_Mesenchymal_Stem_Cells},
                                {label:"Blymphoblastoid cell lines",y:$scope.exp_celline[0].Blymphoblastoid_cell_lines}
				            ]
				        }]
				    });
				chart.render();
				}
			 )
		};
		$scope.celllinebar();
	};
	$scope.draw_source_mv = function(){
		function sourcemvbar(){
			$http({
			url:base_url+'/api/exp_source_mv',
			method:'GET',
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.exp_source_mv = response.data.exp_source_mv_list;
				 var chart = new CanvasJS.Chart("barContainer", {
                    animationEnabled: true,
		    width:600,
                    exportEnabled: true,
                    theme: "light1", 
					axisX:{
						interval:1,
						labelFontSize:11,
						labelAngle:-45
					},
					axisY:{
						title:$scope.exp_source_mv[0].mirna+" "+"expression",
						gridColor:"rgba(1,77,101,.1)",
						interlacedColor:"rgba(1,77,101,.2)"
					},
                    data: [{
                        type: "column",
						color:"#014D65",
                        dataPoints:[
							{label:"Urine MV",y:$scope.exp_source_mv[0].Urine_MV},
                            {label:"Blood MV",y:$scope.exp_source_mv[0].Blood_MV},
							{label:"Blood Exo",y:$scope.exp_source_mv[0].Blood_Exo},
							{label:"Tongue Exo",y:$scope.exp_source_mv[0].Tongue_Exo},
							{label:"Colon MV",y:$scope.exp_source_mv[0].Colon_MV},
                            {label:"Colon Exo",y:$scope.exp_source_mv[0].Colon_Exo},
                            {label:"Breast MV",  y:$scope.exp_source_mv[0].Breast_MV},
							{label:"Kidney Exo",y:$scope.exp_source_mv[0].Kidney_Exo},
                            {label:"Breast Exo",y:$scope.exp_source_mv[0].Breast_Exo},
							{label:"Saliva Exo",y:$scope.exp_source_mv[0].Saliva_Exo},
							{label:"Breast milk Exo",y:$scope.exp_source_mv[0].Breast_milk_Exo},
                            {label:"Lymph Exo",y:$scope.exp_source_mv[0].Lymph_Exo},
							{label:"Fibroblasts MV",y:$scope.exp_source_mv[0].Fibroblasts_MV},
							{label:"CLL cell line Exo",y:$scope.exp_source_mv[0].CLL_cell_line_Exo},
                            {label:"Seminal fluid Exo",y:$scope.exp_source_mv[0].Seminal_fluid_Exo},
                            {label:"Human mast cells Exo",y:$scope.exp_source_mv[0].Human_mast_cells_Exo},
                          	{label:"Human epithelial cells Exo",y:$scope.exp_source_mv[0].Human_epithelial_cells_Exo},
                            {label:"Mesenchymal Stem Cells MV",y:$scope.exp_source_mv[0].Mesenchymal_Stem_Cells_MV},
							{label:"Mesenchymal Stem Cells Exo",y:$scope.exp_source_mv[0].Mesenchymal_Stem_Cells_Exo},
                          	{label:"Human Mammary Epithelial Cells Exo", y: $scope.exp_source_mv[0].Human_Mammary_Epithelial_Cells_Exo},
                           	{label:"Blymphoblastoid cell lines Exo",y:$scope.exp_source_mv[0].Blymphoblastoid_cell_lines_Exo},
                            ]
                    }]
                });
                chart.render();
                }
            )
		}
		sourcemvbar();
	};
	$scope.fetch_pubmed();
	$scope.fetch_pathway();
	$scope.fetch_miRNA();
	$scope.fetch_mirTarget();
	$scope.set_style =  function(){
		$("#sequence").html($("#sequence").slice(0,1)+"<span style='color:red;'>"+$("#sequence").slice(1,7)+"</span>"+$("#sequence").slice(7));
	};
}
