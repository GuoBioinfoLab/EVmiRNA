'use strict';

angular.module('EVmiRNA')
	.controller('MirnaController',MirnaController);

function MirnaController($http,$sce,$scope,$location,$anchorScroll,$routeParams,EVmiRNAService){
	console.log($routeParams.miRNA);
	var base_url = EVmiRNAService.getAPIBaseUrl();
	var query_mirna =  $routeParams.miRNA;
	$scope.error = 0;
	$scope.query_miRNA = query_mirna;
	$scope.fetch_miRNA = function(){
		$http({
			url: base_url+'/api/mirna_info',
			method:'GET',
			params: {mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_basic_list = response.data.mirna_basic_list;
			}
		);
	};
	$scope.fetch_mirnatarget = function(){
		$http({
			url:base_url+'/api/mirna_target',
			method:'GET',
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.mirna_target_list = response.data.mir_target_list;
				$scope.records_number = response.data.records_num;
				var info = response.data.records_num;
				if(info != 0){
					$scope.tarinfo =1;
				}else{
					$scope.tarinfo = 0;
				}
			});
	};
	$scope.update_page = function(test,page,size,total){
		var condition = {};
		condition["mirna"] = query_mirna;
		condition["page"] = page;
		$http({
			url: base_url+'/api/mirna_target',
			method: 'GET',
			params: condition
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_target_list = response.data.mir_target_list;
			$scope.records_number = response.data.records_num;
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
			var list =  response.data.mir_pathway_list;
			if(list.length == 0){
				$scope.pathinfo = 0;
			}else{
				$scope.pathinfo = 1;
			}
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
			var list = response.data.mir_pubmed_list;
			if(list.length == 0){
                                $scope.pubinfo = 0;
                        }else{
                                $scope.pubinfo = 1;
                        }
			}
		)};
	$scope.tcgaexpression = function(){
		$http({
			url:base_url+"/api/tcgaexpression",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				var tcgaexp = response.data.tcga_expression_list;
				var datapoints = [
					{label:"ACC_case",y:Number(tcgaexp[0].ACC_case)}, 
            		{label:"ACC_normal",y:Number(tcgaexp[0].ACC_normal)}, 
            		{label:"BLCA_case",y:Number(tcgaexp[0].BLCA_case)}, 
            		{label:"BLCA_normal",y:Number(tcgaexp[0].BLCA_normal)}, 
            		{label:"BRCA_case",y:Number(tcgaexp[0].BRCA_case)}, 
            		{label:"BRCA_normal",y:Number(tcgaexp[0].BRCA_normal)}, 
            		{label:"CESC_case",y:Number(tcgaexp[0].CESC_case)},
            		{label:"CESC_normal",y:Number(tcgaexp[0].CESC_normal)}, 
            		{label:"CHOL_case",y:Number(tcgaexp[0].CHOL_case)}, 
            		{label:"CHOL_normal",y:Number(tcgaexp[0].CHOL_normal)}, 
            		{label:"COAD_case",y:Number(tcgaexp[0].COAD_case)}, 
            		{label:"COAD_normal",y:Number(tcgaexp[0].COAD_normal)}, 
            		{label:"DLBC_case",y:Number(tcgaexp[0].DLBC_case)}, 
            		{label:"DLBC_normal", y:Number(tcgaexp[0].DLBC_normal)},
            		{label:"ESCA_case", y:Number(tcgaexp[0].ESCA_case)},
            		{label:"ESCA_normal", y:Number(tcgaexp[0].ESCA_normal)},
            		{label:"FPPP_case", y:Number(tcgaexp[0].FPPP_case)},
            		{label:"FPPP_normal", y:Number(tcgaexp[0].FPPP_normal)},
            		{label:"GBM_case", y:Number(tcgaexp[0].GBM_case)},
            		{label:"GBM_normal", y:Number(tcgaexp[0].GBM_normal)},
            		{label:"HNSC_case", y:Number(tcgaexp[0].HNSC_case)},
            		{label:"HNSC_normal", y:Number(tcgaexp[0].HNSC_normal)},
            		{label:"KICH_case", y:Number(tcgaexp[0].KICH_case)},
            		{label:"KICH_case", y:Number(tcgaexp[0].KICH_case)},
            		{label:"KICH_normal",y:Number(tcgaexp[0].KICH_normal)},
            		{label:"KIRC_case", y:Number(tcgaexp[0].KIRC_case)},
            		{label:"KIRC_normal", y:Number(tcgaexp[0].KIRC_normal)},
            		{label:"KIRP_case", y:Number(tcgaexp[0].KIRP_case)},
            		{label:"KIRP_normal", y:Number(tcgaexp[0].KIRP_normal)},
            		{label:"LAML_case", y:Number(tcgaexp[0].LAML_case)},
            		{label:"LAML_normal", y:Number(tcgaexp[0].LAML_normal)},
            		{label:"LGG_case", y:Number(tcgaexp[0].LGG_case)},
            		{label:"LGG_normal", y:Number(tcgaexp[0].LGG_normal)},
            		{label:"LIHC_case", y:Number(tcgaexp[0].LIHC_case)},
            		{label:"LIHC_normal", y:Number(tcgaexp[0].LIHC_normal)},
            		{label:"LUAD_case", y:Number(tcgaexp[0].LUAD_case)},
            		{label:"LUAD_normal", y:Number(tcgaexp[0].LUAD_normal)},
            		{label:"LUSC_case", y:Number(tcgaexp[0].LUSC_case)},
            		{label:"LUSC_normal", y:Number(tcgaexp[0].LUSC_normal)},
            		{label:"MESO_case", y:Number(tcgaexp[0].MESO_case)},
            		{label:"MESO_normal", y:Number(tcgaexp[0].MESO_normal)},
            		{label:"OV_case", y:Number(tcgaexp[0].OV_case)},
            		{label:"OV_normal", y:Number(tcgaexp[0].OV_normal)},
            		{label:"PAAD_case", y:Number(tcgaexp[0].PAAD_case)},
            		{label:"PAAD_normal", y:Number(tcgaexp[0].PAAD_normal)},
            		{label:"PCPG_case", y:Number(tcgaexp[0].PCPG_case)},
            		{label:"PCPG_normal", y:Number(tcgaexp[0].PCPG_normal)},
            		{label:"PRAD_case", y:Number(tcgaexp[0].PRAD_case)},
            		{label:"PRAD_normal", y:Number(tcgaexp[0].PRAD_normal)},
            		{label:"READ_case", y:Number(tcgaexp[0].READ_case)},
            		{label:"READ_normal", y:Number(tcgaexp[0].READ_normal)},
            		{label:"SARC_case", y:Number(tcgaexp[0].SARC_case)},
            		{label:"SARC_normal", y:Number(tcgaexp[0].SARC_normal)},
            		{label:"SKCM_case", y:Number(tcgaexp[0].SKCM_case)},
            		{label:"SKCM_normal", y:Number(tcgaexp[0].SKCM_normal)},
            		{label:"STAD_case", y:Number(tcgaexp[0].STAD_case)},
            		{label:"STAD_normal",y:Number(tcgaexp[0].STAD_normal)}, 
            		{label:"TGCT_case",y:Number(tcgaexp[0].TGCT_case)}, 
            		{label:"TGCT_normal",y:Number(tcgaexp[0].TGCT_normal)}, 
            		{label:"THCA_case",y:Number(tcgaexp[0].THCA_case)}, 
            		{label:"THCA_normal",y:Number(tcgaexp[0].THCA_normal)}, 
            		{label:"THYM_case",y:Number(tcgaexp[0].THYM_case)}, 
            		{label:"THYM_normal",y:Number(tcgaexp[0].THYM_normal)}, 
            		{label:"UCEC_case",y:Number(tcgaexp[0].UCEC_case)}, 
            		{label:"UCEC_normal",y:Number(tcgaexp[0].UCEC_normal)}, 
            		{label:"UCS_case",y:Number(tcgaexp[0].UCS_case)}, 
            		{label:"UCS_normal",y:Number(tcgaexp[0].UCS_normal)}, 
            		{label:"UVM_case",y:Number(tcgaexp[0].UVM_case)}, 
            		{label:"UVM_normal",y:Number(tcgaexp[0].UVM_normal)}
				];
				var chart = new CanvasJS.Chart("tcgadataContainer",{
					animationEnabled: true,
					exportEnabled: true,
					theme: "light1",
					title:{
						text:query_mirna
					}, 
					axisX:{
						interval:1,
						labelFontSize:10,
						labelAngle:-45
					},
					axisY:{
							interlacedColor:"rgba(1,77,101,.2)",
							gridColor:"rgba(1,77,101,.1)",
							title:"RPKM"
					},
					data:[{
						type: "column", 
						color:"#014D65",
						dataPoints:datapoints
					}]
				});
				chart.render();
			}
		)
	}
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
	$scope.expSourceBox = function(){
		$http({
			url:base_url+"/api/sourceall",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.sourceAllList = response.data.source_all_list;
				var dataPoints = [];
				var outliner = [];
				var l = $scope.sourceAllList.length;
				for (var n = 0;n<l;n++){
					dataPoints.push({
						x:n,
						label:$scope.sourceAllList[n].source,
						y:[
							$scope.sourceAllList[n].min,
							$scope.sourceAllList[n].Q1,
							$scope.sourceAllList[n].Q3,
							$scope.sourceAllList[n].max,
							$scope.sourceAllList[n].Q2
						]
					});
					if($("input[name='outliner']:checked").val() == 1){
						var outlinerL = $scope.sourceAllList[n].outliner.length;
						if(outlinerL >0){
							for(var nn = 0; nn<outlinerL;nn++){
								outliner.push({
									x:n,
									label:$scope.sourceAllList[n].source,
									y:Number($scope.sourceAllList[n].outliner[nn])
							})
							}
					}	
					}
				}
				console.log(outliner);
				var chart = new CanvasJS.Chart("barContainer",{
					animationEnabled:true,
					theme:"light2",
					axisY:{
						title:$scope.sourceAllList[0].miRNA_id+" "+"expression"
					},
					axisX:{
						interval:1
					},
					data:[{
						type:"boxAndWhisker",
						dataPoints: dataPoints
					},
					{
						type:"scatter",
						dataPoints: outliner
					}]
				});
				chart.render();
			}
		);
	};
	$scope.expSourcemvBox = function(){
		$http({
			url:base_url+"/api/sourcemvexp",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.sourcemvAllList = response.data.sourcemv_all_list;
				var dataPoints = [];
				var outliner = [];
				var l = $scope.sourcemvAllList.length;
				for (var n = 0;n<l;n++){
					dataPoints.push({
						x:n,
						label:$scope.sourcemvAllList[n].sourcemv,
						y:[
							$scope.sourcemvAllList[n].min,
							$scope.sourcemvAllList[n].Q1,
							$scope.sourcemvAllList[n].Q3,
							$scope.sourcemvAllList[n].max,
							$scope.sourcemvAllList[n].Q2
						]
					});
					if($("input[name='outliner']:checked").val() == 1){
					var outlinerL = $scope.sourcemvAllList[n].outliner.length;
					if(outlinerL >0){
						for(var nn = 0; nn<outlinerL;nn++){
							outliner.push({
								x:n,
								label:$scope.sourcemvAllList[n].source,
								y:Number($scope.sourcemvAllList[n].outliner[nn])
							})
						}
					}
					}
				}
				var chart = new CanvasJS.Chart("barContainer",{
					animationEnabled:true,
					theme:"light2",
					axisY:{
						title:$scope.sourcemvAllList[0].miRNA_id+" "+"expression"
					},
					axisX:{
						interval:1
					},
					data:[{
						type:"boxAndWhisker",
						dataPoints: dataPoints
					},
					{
						type:"scatter",
						dataPoints: outliner
					}]
				});
				chart.render();
			}
		);
	};
	$scope.expCancerBox = function(){
		$http({
			url:base_url+"/api/deseaseexp",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.deseaseAllList = response.data.desease_all_list;
				var dataPoints = [];
				var outliner = [];
				var l = $scope.deseaseAllList.length;
				for (var n = 0;n<l;n++){
					dataPoints.push({
						x:n,
						label:$scope.deseaseAllList[n].desease,
						y:[
							$scope.deseaseAllList[n].min,
							$scope.deseaseAllList[n].Q1,
							$scope.deseaseAllList[n].Q3,
							$scope.deseaseAllList[n].max,
							$scope.deseaseAllList[n].Q2
						]
					});
					if($("input[name='outliner']:checked").val() == 1){
					var outlinerL = $scope.deseaseAllList[n].outliner.length;
					if(outlinerL >0){
						for(var nn = 0; nn<outlinerL;nn++){
							outliner.push({
								x:n,
								label:$scope.deseaseAllList[n].source,
								y:Number($scope.deseaseAllList[n].outliner[nn])
							})
						}
					}}
				}
				console.log(outliner);
				var chart = new CanvasJS.Chart("barContainer",{
					animationEnabled:true,
					theme:"light2",
					axisY:{
						title:$scope.deseaseAllList[0].miRNA_id+" "+"expression"
					},
					axisX:{
						interval:1
					},
					data:[{
						type:"boxAndWhisker",
						dataPoints: dataPoints
					},
					{
						type:"scatter",
						dataPoints: outliner
					}]
				});
				chart.render();
			}
		);
	};
	$scope.expCelllineBox = function(){
		$http({
			url:base_url+"/api/cell_line_exp",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.celllineAllList = response.data.cellLine_all_list;
				var dataPoints = [];
				var outliner = [];
				var l = $scope.celllineAllList.length;
				for (var n = 0;n<l;n++){
					dataPoints.push({
						x:n,
						label:$scope.celllineAllList[n]["cell line"],
						y:[
							$scope.celllineAllList[n].min,
							$scope.celllineAllList[n].Q1,
							$scope.celllineAllList[n].Q3,
							$scope.celllineAllList[n].max,
							$scope.celllineAllList[n].Q2
						]
					});
					if($("input[name='outliner']:checked").val() == 1)
					var outlinerL = $scope.celllineAllList[n].outliner.length;
					if(outlinerL >0){
						for(var nn = 0; nn<outlinerL;nn++){
							outliner.push({
								x:n,
								label:$scope.celllineAllList[n].source,
								y:Number($scope.celllineAllList[n].outliner[nn])
							})
						}
					}
				}
				console.log(outliner);
				var chart = new CanvasJS.Chart("barContainer",{
					animationEnabled:true,
					theme:"light2",
					axisY:{
						title:$scope.celllineAllList[0].miRNA_id+" "+"expression"
					},
					axisX:{
						interval:1
					},
					data:[{
						type:"boxAndWhisker",
						dataPoints: dataPoints
					},
					{
						type:"scatter",
						dataPoints: outliner
					}]
				});
				chart.render();
			}
		);
	};
	$scope.fetch_mirnafunction =function(){
		$http({
			url:base_url+"/api/mirna_function",
			params:{mirna:query_mirna},
			method:"GET"
		}).then(
			function(response){
				console.log(response);
				$scope.mirna_function_list = response.data.mir_function_list;
				var list = $scope.mirna_function_list;
				if(list.length == 0){
					$scope.funcinfo = 0;
				}else{
					$scope.funcinfo = 1;
				}
			}
		);
	}
	$scope.fetch_molecular_drug = function(){
		$http({
			url:base_url+"/api/moleculardrug",
			method:"GET",
			params:{mirna:query_mirna}
		}).then(
			function(response){
				console.log(response);
				$scope.molecular_drug = response.data.mir_drug_list;
				var list = response.data.mir_drug_list;
				if(list.length == 0){
                                        $scope.druginfo = 0;
                                }else{
                                        $scope.druginfo = 1;
                                }

			}
		)
	}
	$(function (){
    		$("[data-toggle='popover']").popover();
	});
	$scope.draw_exp_source();
	$scope.fetch_pubmed();
	$scope.fetch_pathway();
	$scope.fetch_mirnatarget();
	$scope.fetch_molecular_drug();
	$scope.fetch_mirnafunction();
	$scope.fetch_miRNA();
	$scope.tcgaexpression();
	$scope.set_style =  function(){
		$("#sequence").html($("#sequence").slice(0,1)+"<span style='color:red;'>"+$("#sequence").slice(1,7)+"</span>"+$("#sequence").slice(7));
	};
	$scope.download = function(){
		var condition = {};
		condition["per_page"] = 10000;
		condition["mirna"] = query_mirna;
		name = query_mirna+"_target";
		$scope.JSONToExcelConvertor = function(JSONData, FileName, ShowLabel) {
		var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		var excel = '<table>';
		var row = "<tr>";
		for (var i = 0, l = ShowLabel.length; i < l; i++) {
			row += "<td>" + ShowLabel[i]+ '</td>';
		}
		excel += row + "</tr>";
                var title = ["target_symbol","target_chr","target_start","target_end","p_v"];
		for (var i = 0; i < arrData.length; i++) {
			var row = "<tr>";
			for (var j = 0; j < title.length; j++) {
                                var index = title[j];
				var value = arrData[i][index] === "." ? "" : arrData[i][index];
				row += '<td>' + value + '</td>';
			}
			excel += row + "</tr>";
		}
		excel += "</table>";
		var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
		excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
		excelFile += '; charset=UTF-8">';
		excelFile += "<head>";
		excelFile += "<!--[if gte mso 9]>";
		excelFile += "<xml>";
		excelFile += "<x:ExcelWorkbook>";
		excelFile += "<x:ExcelWorksheets>";
		excelFile += "<x:ExcelWorksheet>";
		excelFile += "<x:Name>";
		excelFile += "{worksheet}";
		excelFile += "</x:Name>";
		excelFile += "<x:WorksheetOptions>";
		excelFile += "<x:DisplayGridlines/>";
		excelFile += "</x:WorksheetOptions>";
		excelFile += "</x:ExcelWorksheet>";
		excelFile += "</x:ExcelWorksheets>";
		excelFile += "</x:ExcelWorkbook>";
		excelFile += "</xml>";
		excelFile += "<![endif]-->";
		excelFile += "</head>";
		excelFile += "<body>";
		excelFile += excel;
		excelFile += "</body>";
		excelFile += "</html>";
		var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
		var link = document.createElement("a");
		link.href = uri;
		link.style = "visibility:hidden";
		link.download = FileName + ".xls";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
        	}
		$http({
			url:base_url+"/api/mirna_target",
			method:"GET",
			params:condition
		}).then(
			function(response){
				var dlfile = response.data.mir_target_list;
				$scope.JSONToExcelConvertor(dlfile,name,["target_symbol","target_chr","target_start","target_end","p_v"]);
			}
		);
	}
	$scope.downloadkegg = function(){
		var condition = {};
		condition["mirna"] = query_mirna;
		name = query_mirna+"_pathway";
		$scope.JSONToExcelConvertor = function(JSONData, FileName, ShowLabel) {
		var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		var excel = '<table>';
		var row = "<tr>";
		for (var i = 0, l = ShowLabel.length; i < l; i++) {
			row += "<td>" + ShowLabel[i]+ '</td>';
		}
		excel += row + "</tr>";
                var title = ["kegg","kegg_dscp","gene","pvalue","possibility"];
		for (var i = 0; i < arrData.length; i++) {
			var row = "<tr>";
			for (var j = 0; j < title.length; j++) {
                                var index = title[j];
				var value = arrData[i][index] === "." ? "" : arrData[i][index];
				row += '<td>' + value + '</td>';
			}
			excel += row + "</tr>";
		}
		excel += "</table>";
		var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
		excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
		excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
		excelFile += '; charset=UTF-8">';
		excelFile += "<head>";
		excelFile += "<!--[if gte mso 9]>";
		excelFile += "<xml>";
		excelFile += "<x:ExcelWorkbook>";
		excelFile += "<x:ExcelWorksheets>";
		excelFile += "<x:ExcelWorksheet>";
		excelFile += "<x:Name>";
		excelFile += "{worksheet}";
		excelFile += "</x:Name>";
		excelFile += "<x:WorksheetOptions>";
		excelFile += "<x:DisplayGridlines/>";
		excelFile += "</x:WorksheetOptions>";
		excelFile += "</x:ExcelWorksheet>";
		excelFile += "</x:ExcelWorksheets>";
		excelFile += "</x:ExcelWorkbook>";
		excelFile += "</xml>";
		excelFile += "<![endif]-->";
		excelFile += "</head>";
		excelFile += "<body>";
		excelFile += excel;
		excelFile += "</body>";
		excelFile += "</html>";
		var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
		var link = document.createElement("a");
		link.href = uri;
		link.style = "visibility:hidden";
		link.download = FileName + ".xls";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
        	}
		$http({
			url:base_url+"/api/mirna_pathway",
			method:"GET",
			params:condition
		}).then(
			function(response){
				var dlfile = response.data.mir_pathway_list;
				$scope.JSONToExcelConvertor(dlfile,name,["kegg","kegg_dscp","gene","pvalue","possibility"]);
			}
		);
	}
	$scope.gotoInformation = function(){
		$location.hash("information");
		$anchorScroll();
	}
	$scope.gotoExpression = function(){
		$location.hash("expression");
		$anchorScroll();
	}
	$scope.gotoTarget = function(){
		$location.hash("target");
                $anchorScroll();
	}
	$scope.gotoPathway = function(){
                $location.hash("pathway");
                $anchorScroll();
        }
	$scope.gotoDrug = function(){
                $location.hash("drug");
                $anchorScroll();
        }
	$scope.gotoPublication = function(){
                $location.hash("publication");
                $anchorScroll();
        }
	$scope.gotoFunction = function(){
                $location.hash("function");
                $anchorScroll();
        }
}
