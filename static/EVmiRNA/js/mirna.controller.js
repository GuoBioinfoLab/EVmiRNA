'use strict';

angular.module('EVmiRNA')
	.controller('MirnaController',MirnaController);

function MirnaController($http,$sce,$scope,$location,$anchorScroll,$routeParams,EVmiRNAService){

	console.log($routeParams.miRNA);

	var base_url = EVmiRNAService.getAPIBaseUrl();
	var query_mirna =  $routeParams.miRNA;
	$scope.error = 0;
	$scope.query_miRNA = query_mirna;
    function removeClasshtml(){
        $("#bainfo").css({"backgroundColor":"","color":"darkred"});
        $("#exp").css({"backgroundColor":"","color":"darkred"});
        $("#tar").css({"backgroundColor":"","color":"darkred"});
        $("#pub").css({"backgroundColor":"","color":"darkred"});
        $("#dru").css({"backgroundColor":"","color":"darkred"});
        $("#fun").css({"backgroundColor":"","color":"darkred"});
        $("#pat").css({"backgroundColor":"","color":"darkred"});
    }
    
	$scope.gotoAnchor = function(x){
      var newHash = 'anchor' + x;
			var id = $location.hash();
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
				$anchorScroll();
				$location.hash(id);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
      switch(x){
          case 1: 
          removeClasshtml();
          $("#bainfo").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 2:
          removeClasshtml();
          $("#exp").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 3:
          removeClasshtml();
          $("#tar").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 4:
          removeClasshtml();
          $("#pat").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 5:
          removeClasshtml();
          $("#fun").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 6:
          removeClasshtml();
          $("#dru").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          case 7:
          removeClasshtml();
          $("#pub").css({"backgroundColor":"#0088cc","color":"GhostWhite"});
          break;
          
      }
    };

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
    
    // target
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
        
    $scope.all_mirtarget = function(){
		var condition = {};
		$http({
			url: base_url+'/api/mirna_list_target',
			method: 'GET',
			params: {mirna:query_mirna}
		}).then(
			function(response){
			console.log(response);
			$scope.mirna_target_list_all = response.data.mir_list_target_list;
            $scope.tarinfo =1;
			}
		)};
        
    $scope.sortType1 = 'target_symbol'; 
    $scope.sortReverse1 = false;
     // up target  
        
        
        
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

				if(tcgaexp.length == 0){
					$scope.tcgainfo = 0;
				}else{
					$scope.tcgainfo = 1;
				};
                

				var datapoints = [
					{label:"ACC case",y:Number(Number(tcgaexp[0].ACC_case).toFixed(2))},
					{label:"ACC normal",y:Number(Number(tcgaexp[0].ACC_normal).toFixed(2))},
					{label:"BLCA case",y:Number(Number(tcgaexp[0].BLCA_case).toFixed(2))},
					{label:"BLCA normal",y:Number(Number(tcgaexp[0].BLCA_normal).toFixed(2))},
					{label:"BRCA case",y:Number(Number(tcgaexp[0].BRCA_case).toFixed(2))},
					{label:"BRCA normal",y:Number(Number(tcgaexp[0].BRCA_normal).toFixed(2))},
					{label:"CESC case",y:Number(Number(tcgaexp[0].CESC_case).toFixed(2))},
					{label:"CESC normal",y:Number(Number(tcgaexp[0].CESC_normal).toFixed(2))},
					{label:"CHOL case",y:Number(Number(tcgaexp[0].CHOL_case).toFixed(2))},
					{label:"CHOL normal",y:Number(Number(tcgaexp[0].CHOL_normal).toFixed(2))},
					{label:"COAD case",y:Number(Number(tcgaexp[0].COAD_case).toFixed(2))},
					{label:"COAD normal",y:Number(Number(tcgaexp[0].COAD_normal).toFixed(2))},
					{label:"DLBC case",y:Number(Number(tcgaexp[0].DLBC_case).toFixed(2))},
					{label:"DLBC normal", y:Number(Number(tcgaexp[0].DLBC_normal).toFixed(2))},
					{label:"ESCA case", y:Number(Number(tcgaexp[0].ESCA_case).toFixed(2))},
					{label:"ESCA normal", y:Number(Number(tcgaexp[0].ESCA_normal).toFixed(2))},
					{label:"FPPP case", y:Number(Number(tcgaexp[0].FPPP_case).toFixed(2))},
					{label:"FPPP normal", y:Number(Number(tcgaexp[0].FPPP_normal).toFixed(2))},
					{label:"GBM case", y:Number(Number(tcgaexp[0].GBM_case).toFixed(2))},
					{label:"GBM normal", y:Number(Number(tcgaexp[0].GBM_normal).toFixed(2))},
					{label:"HNSC case", y:Number(Number(tcgaexp[0].HNSC_case).toFixed(2))},
					{label:"HNSC normal", y:Number(Number(tcgaexp[0].HNSC_normal).toFixed(2))},
					{label:"KICH case", y:Number(Number(tcgaexp[0].KICH_case).toFixed(2))},
					{label:"KICH normal",y:Number(Number(tcgaexp[0].KICH_normal).toFixed(2))},
					{label:"KIRC case", y:Number(Number(tcgaexp[0].KIRC_case).toFixed(2))},
					{label:"KIRC normal", y:Number(Number(tcgaexp[0].KIRC_normal).toFixed(2))},
					{label:"KIRP case", y:Number(Number(tcgaexp[0].KIRP_case).toFixed(2))},
					{label:"KIRP normal", y:Number(Number(tcgaexp[0].KIRP_normal).toFixed(2))},
					{label:"LAML case", y:Number(Number(tcgaexp[0].LAML_case).toFixed(2))},
					{label:"LAML normal", y:Number(Number(tcgaexp[0].LAML_normal).toFixed(2))},
					{label:"LGG case", y:Number(Number(tcgaexp[0].LGG_case).toFixed(2))},
					{label:"LGG normal", y:Number(Number(tcgaexp[0].LGG_normal).toFixed(2))},
					{label:"LIHC case", y:Number(Number(tcgaexp[0].LIHC_case).toFixed(2))},
					{label:"LIHC normal", y:Number(Number(tcgaexp[0].LIHC_normal).toFixed(2))},
					{label:"LUAD case", y:Number(Number(tcgaexp[0].LUAD_case).toFixed(2))},
					{label:"LUAD normal", y:Number(Number(tcgaexp[0].LUAD_normal).toFixed(2))},
					{label:"LUSC case", y:Number(Number(tcgaexp[0].LUSC_case).toFixed(2))},
					{label:"LUSC normal", y:Number(Number(tcgaexp[0].LUSC_normal).toFixed(2))},
					{label:"MESO case", y:Number(Number(tcgaexp[0].MESO_case).toFixed(2))},
					{label:"MESO normal", y:Number(Number(tcgaexp[0].MESO_normal).toFixed(2))},
					{label:"OV case", y:Number(Number(tcgaexp[0].OV_case).toFixed(2))},
					{label:"OV normal", y:Number(Number(tcgaexp[0].OV_normal).toFixed(2))},
					{label:"PAAD case", y:Number(Number(tcgaexp[0].PAAD_case).toFixed(2))},
					{label:"PAAD normal", y:Number(Number(tcgaexp[0].PAAD_normal).toFixed(2))},
					{label:"PCPG case", y:Number(Number(tcgaexp[0].PCPG_case).toFixed(2))},
					{label:"PCPG normal", y:Number(Number(tcgaexp[0].PCPG_normal).toFixed(2))},
					{label:"PRAD case", y:Number(Number(tcgaexp[0].PRAD_case).toFixed(2))},
					{label:"PRAD normal", y:Number(Number(tcgaexp[0].PRAD_normal).toFixed(2))},
					{label:"READ case", y:Number(Number(tcgaexp[0].READ_case).toFixed(2))},
					{label:"READ normal", y:Number(Number(tcgaexp[0].READ_normal).toFixed(2))},
					{label:"SARC case", y:Number(Number(tcgaexp[0].SARC_case).toFixed(2))},
					{label:"SARC normal", y:Number(Number(tcgaexp[0].SARC_normal).toFixed(2))},
					{label:"SKCM case", y:Number(Number(tcgaexp[0].SKCM_case).toFixed(2))},
					{label:"SKCM normal", y:Number(Number(tcgaexp[0].SKCM_normal).toFixed(2))},
					{label:"STAD case", y:Number(Number(tcgaexp[0].STAD_case).toFixed(2))},
					{label:"STAD normal",y:Number(Number(tcgaexp[0].STAD_normal).toFixed(2))},
					{label:"TGCT case",y:Number(Number(tcgaexp[0].TGCT_case).toFixed(2))},
					{label:"TGCT normal",y:Number(Number(tcgaexp[0].TGCT_normal).toFixed(2))},
					{label:"THCA case",y:Number(Number(tcgaexp[0].THCA_case).toFixed(2))},
					{label:"THCA normal",y:Number(Number(tcgaexp[0].THCA_normal).toFixed(2))},
					{label:"THYM case",y:Number(Number(tcgaexp[0].THYM_case).toFixed(2))},
					{label:"THYM normal",y:Number(Number(tcgaexp[0].THYM_normal).toFixed(2))},
					{label:"UCEC case",y:Number(Number(tcgaexp[0].UCEC_case).toFixed(2))},
					{label:"UCEC normal",y:Number(Number(tcgaexp[0].UCEC_normal).toFixed(2))},
					{label:"UCS case",y:Number(Number(tcgaexp[0].UCS_case).toFixed(2))},
					{label:"UCS normal",y:Number(Number(tcgaexp[0].UCS_normal).toFixed(2))},
					{label:"UVM case",y:Number(Number(tcgaexp[0].UVM_case).toFixed(2))},
					{label:"UVM normal",y:Number(Number(tcgaexp[0].UVM_normal).toFixed(2))}
				];
                
				var chart = new CanvasJS.Chart("tcgadataContainer",{
					// animationEnabled: true,
					// exportEnabled: true,
					// theme: "light1",
					backgroundColor: "#FFFFFF",
					width: 900,
					title:{	},
					// title:{	text:query_mirna+" expression in TCGA Samples",fontSize:20,fontWeight:"bold",fontFamily: "Arial"},
					axisX:{
						interval:1,
						labelFontSize:10,
						labelAngle:-45
					},
					axisY:{
							// interlacedColor:"rgba(1,77,101,.2)",
							// gridColor:"rgba(1,77,101,.1)",
							title:"Expression RPM"
					},
					data:[{
						// type: "column",
						// color:"#014D65",
						dataPoints:datapoints
					}],
				});
				chart.render();
			}
		)
	}

    // var a = "0.1234";
  
    // alert(a.toFixed(2)));
    
// mv source pic
	$scope.draw_exp_mv_source = function(){
		$scope.mirnamvSourcebar = function(){
			$http({
				url:base_url+'/api/exp_mv_source',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
      		console.log(response);
					$scope.exp_mv_source = response.data.exp_mv_source_list;
					var chart = new CanvasJS.Chart("barContainer", {
						// animationEnabled: true,
						width:900,
						// exportEnabled: true,
						// theme: "light1",
						backgroundColor: "#FFFFFF",
						axisX:{
							interval:1,
							labelFontSize:15,
							labelAngle:-30
						},
						title:{},
						// title:{text:$scope.exp_source[0].mirna+" in Extracellular vesicles from Sources",fontSize:20,fontWeight:"bold",fontFamily: "Arial"},
						axisY:{
							// interlacedColor:"rgba(1,77,101,.2)",
							// gridColor:"rgba(1,77,101,.1)",
							title:"Expression RPM"
						},
						data: [{
							// type: "column",
							// color:"#014D65",
							dataPoints:[
							{label:"Blood",y:Number($scope.exp_mv_source[0].Blood.toFixed(2))},
							{label:"Breast",y:Number($scope.exp_mv_source[0].Breast.toFixed(2))},
							{label:"Colon",y:Number($scope.exp_mv_source[0].Colon.toFixed(2))},
							{label:"Fibroblast",y:Number($scope.exp_mv_source[0].Fibroblasts.toFixed(2))},
							{label:"Mesenchymal stem cell",y:Number($scope.exp_mv_source[0].Mesenchymal_Stem_Cells.toFixed(2))},
							{label:"Urine",y:Number($scope.exp_mv_source[0].Urine.toFixed(2))},
							]
						}]
					});
//					alert(chart.)
					chart.render();
				})
		};
		$scope.mirnamvSourcebar();
	};


// mv cancer pic
	$scope.draw_exp_mv_cancer = function(){
		$scope.mirnamvcancerbar = function(){
			$http({
				url:base_url +'/api/exp_mv_cancer',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
					console.log(response);
					$scope.exp_mv_cancer = response.data.exp_mv_cancer_list;
					var chart = new CanvasJS.Chart("barContainer", {
            // animationEnabled: true,
            // exportEnabled: true,
						width:900,
            // theme: "light1", // "light1", "light2", "dark1", "dark2"
						backgroundColor: "#FFFFFF",
            axisX:{
							interval:1,
							labelFontSize:15,
							labelAngle:-30
						},
						title:{},
						// title:{text:$scope.exp_cancer[0].mirna+" expression in Extracellular Vesicles from Cancers",fontSize:20,fontWeight:"bold",fontFamily: "Arial"	},
						axisY:{
							title:"Expression RPM",
							// gridColor:"rgba(1,77,101,.1)",
							// interlacedColor:"rgba(1,77,101,.2)"
						},
            data: [{
                type: "column",
							// color:"#014D65",
                dataPoints:[
								{label:"Breast adenocarcinoma",  y:Number($scope.exp_mv_cancer[0].Breast_adenocarcinoma.toFixed(2))},
								{label:"Colon carcinoma",y:Number($scope.exp_mv_cancer[0].Colon_carcinoma.toFixed(2))},
								{label:"Chronic myelocytic leukemia",y:Number($scope.exp_mv_cancer[0].chronic_myelocytic_leukemia.toFixed(2))},
								{label:"Pancreatic cancer",y:Number($scope.exp_mv_cancer[0].Pancreatic_Cancer.toFixed(2))},
								{label:"Prostate cancer",y:Number($scope.exp_mv_cancer[0].Prostate_Cancer.toFixed(2))},
								// {label:"Healthy control",y:Number($scope.exp_mv_cancer[0].Healthy_Control.toFixed(2))},
	                        ]
	                    }]
	             	});
                chart.render();
	            })
		};
		$scope.mirnamvcancerbar();
	};


// exo source pic
	$scope.draw_exp_exo_source = function(){
		$scope.mirnaexoSourcebar = function(){
			$http({
				url:base_url+'/api/exp_exo_source',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
                    console.log(response);
					$scope.exp_exo_source = response.data.exp_exo_source_list;
					var chart = new CanvasJS.Chart("barContainer", {
						// animationEnabled: true,
						width:900,
						// exportEnabled: true,
						// theme: "light1",
						backgroundColor: "#FFFFFF",
						axisX:{
							interval:1,
							labelFontSize:15,
							labelAngle:-30
						},
						title:{},
						// title:{text:$scope.exp_source[0].mirna+" in Extracellular vesicles from Sources",fontSize:20,fontWeight:"bold",fontFamily: "Arial"},
						axisY:{
							// interlacedColor:"rgba(1,77,101,.2)",
							// gridColor:"rgba(1,77,101,.1)",
							title:"Expression RPM"
						},
						data: [{
							type: "column",
							// color:"#014D65",
							dataPoints:[
							{label:"Blood",y:Number($scope.exp_exo_source[0].Blood.toFixed(2))},
							{label:"Breast",y:Number($scope.exp_exo_source[0].Breast.toFixed(2))},
							{label:"Breast milk",y:Number($scope.exp_exo_source[0].Breast_milk.toFixed(2))},
							{label:"B-lymphoblastoid cell",y:Number($scope.exp_exo_source[0].B_lymphoblastoid_cell.toFixed(2))},
							{label:"Chronic lymphocytic leukemia cell",y:Number($scope.exp_exo_source[0].CLL_cell.toFixed(2))},
							{label:"Colon",y:Number($scope.exp_exo_source[0].Colon.toFixed(2))},
							{label:"Human epithelial cell",y:Number($scope.exp_exo_source[0].Human_epithelial_cell.toFixed(2))},
							{label:"Human mast cell",y:Number($scope.exp_exo_source[0].Human_mast_cell.toFixed(2))},
							{label:"Human mammary epithelial cell",y:Number($scope.exp_exo_source[0].Human_mammary_epithelial_cell.toFixed(2))},
							{label:"Kidney",y:Number($scope.exp_exo_source[0].Kidney.toFixed(2))},
							{label:"Lymph",y:Number($scope.exp_exo_source[0].Lymph.toFixed(2))},
							{label:"Mesenchymal stem cell",y:Number($scope.exp_exo_source[0].Mesenchymal_stem_cell.toFixed(2))},
							{label:"Saliva",y:Number($scope.exp_exo_source[0].Saliva.toFixed(2))},
							{label:"Seminal fluid",y:Number($scope.exp_exo_source[0].Seminal_fluid.toFixed(2))},
							{label:"Tongue",y:Number($scope.exp_exo_source[0].Tongue.toFixed(2))},
							]
						}]
					});
					chart.render();
				})
		};
		$scope.mirnaexoSourcebar();
	};



// exo cancer pic
	$scope.draw_exp_exo_cancer = function(){
		$scope.mirnaexocancerbar = function(){
			$http({
				url:base_url +'/api/exp_exo_cancer',
				method:'GET',
				params:{mirna:query_mirna}
			}).then(
				function(response){
					console.log(response);
					$scope.exp_exo_cancer = response.data.exp_exo_cancer_list;
					var chart = new CanvasJS.Chart("barContainer", {
                    // animationEnabled: true,
                    // exportEnabled: true,
                    width:900,
                    // theme: "lig ht1", // "light1", "light2", "dark1", "dark2"
                    backgroundColor: "#FFFFFF",
                    axisX:{
							interval:1,
							labelFontSize:15,
							labelAngle:-30
						},
						title:{},
						// title:{text:$scope.exp_cancer[0].mirna+" expression in Extracellular Vesicles from Cancers",fontSize:20,fontWeight:"bold",fontFamily: "Arial"	},
						axisY:{
							title:"Expression RPM",
							// gridColor:"rgba(1,77,101,.1)",
							// interlacedColor:"rgba(1,77,101,.2)"
						},
            data: [{
                type: "column",
							// color:"#014D65",
                dataPoints:[
                    {label:"Breast adenocarcinoma",  y:Number($scope.exp_exo_cancer[0].Breast_adenocarcinoma.toFixed(2))},
                    {label:"Colon carcinoma",y:Number($scope.exp_exo_cancer[0].Colon_carcinoma.toFixed(2))},
                    {label:"Chronic lymphocytic leukemia",y:Number($scope.exp_exo_cancer[0].Chronic_lymphocytic_leukemia.toFixed(2))},
                    {label:"Lymphoma",y:Number($scope.exp_exo_cancer[0].Lymphoma.toFixed(2))},
                    {label:"Leukemia",y:Number($scope.exp_exo_cancer[0].Leukemia.toFixed(2))},
                    {label:"Oral cancer",y:Number($scope.exp_exo_cancer[0].Oral_cancer.toFixed(2))},
                    {label:"Prostate cancer",y:Number($scope.exp_exo_cancer[0].Prostate_Cancer.toFixed(2))},
                    {label:"Squamous cell carcinoma",y:Number($scope.exp_exo_cancer[0].Squamous_cell_carcinoma.toFixed(2))},
                    // {label:"Healthy control",y:Number($scope.exp_exo_cancer[0].Healthy_Control.toFixed(2))},
	                        ]
	                    }]
	             	});
                        chart.render();
	            })
		};
		$scope.mirnaexocancerbar();
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



	$(document).ready(function(){
		$scope.draw_exp_mv_source();
		$scope.fetch_pubmed();
		$scope.fetch_pathway();
		$scope.all_mirtarget();
		$scope.fetch_molecular_drug();
		$scope.fetch_mirnafunction();
		$scope.fetch_miRNA();
		$scope.tcgaexpression()
		$scope.gotoAnchor(1);
		});
}
