"use strict";

angular.module('EVmiRNA')
	.controller('SampleController',SampleController);

function SampleController($http,$scope,$window,$routeParams,$mdDialog,$interval,EVmiRNAService){
	console.log("SampleController loaded");
	var base_url = EVmiRNAService.getAPIBaseUrl();

    var dlsource = "/static/EVmiRNA/image/expr/"+$routeParams.source+".exp";
	$scope.filesource = dlsource;
	$scope.filename = $routeParams.source+"_expression.txt";
	
    console.log(dlsource);
    $scope.img1 = {
        'Blood':'blood.png',
        'B-lymphoblastoid cell':'bcell.png',
        'Breast adenocarcinoma':'breastcancer.png',
        'Breast milk':'breastmilk.png',
        'Breast':'breast.png',
        'Chronic lymphocytic leukemia cell':'Chroniclymphocyticleukemiacell.png',
        'Chronic lymphocytic leukemia':'Chroniclymphocyticleukemiacell.png',
        'Chronic myelocytic leukemia':'cml.png',
        'Colon carcinoma':'coloncancer.png',
        'Colon':'colon.png',
        'Fibroblast':'fibroblast.png',
        'Human epithelial cell':'noimg.png',
        'Human mammary epithelial cell':'noimg.png',
        'Human mast cell':'humanmastcell.png',
        'Kidney':'kidney.png',
        'Leukemia':'luekemia.png',
        'Lymph':'Lymph.png',
        'Lymphoma':'lymphoma.png',
        'Mesenchymal stem cell':'msc.png',
        'Oral cancer':'oralcancer.png',
        'Pancreatic cancer':'pancreaticcancer.png',
        'Prostate cancer':'prostatecancer.png',
        'Saliva':'noimg.png',
        'Seminal fluid':'semen.png',
        'Squamous cell carcinoma':'squamouscellcarcinoma.png',
        'Tongue':'tongue.png',
        'Urine':'urine.png',
        };

    $scope.heatmap = {
        'Blood_Exo':"Blood_Exo.png",
        'Blood_MV':"Blood_MV.png",
        'B-lymphoblastoid cell lines_Exo':"B-lymphoblastoid cell lines_Exo.png",
        'Breast milk_Exo':"Breast milk_Exo.png",
        'Breast_Exo':"breast_Exo.png",
        'Chronic lymphocytic leukemia cell_Exo':"cll_exo.png",
        'Colon_Exo':"colon_exo.png",
        'Human mammary epithelial cell_Exo':"human.mammary.epithellial.cell.exo.png",
        'Human mast cell_Exo':"human.mast.cell.exo.png",
        'Kidney_Exo':"kidney.exo.png",
        'Lymph_Exo':"lymph.exo.png",
        'Mesenchymal Stem Cells_Exo':"msc.exo.png",
        'Mesenchymal Stem Cells_MV':"msc.mv.png",
        'Seminal fluid_Exo':"seminal.fluid.exo.png",
        'Tongue_Exo':"tongue.exo.png",
        'Urine_MV':"urine.mv.png",
    };

if($.inArray($routeParams.source, Object.keys($scope.heatmap)) < 0){
    $scope.hpshow = 0;
}else{
    $scope.hpshow = 1;
}

    $scope.source_d = $routeParams.source;

    if($routeParams.type == "exo"){
        $scope.type1 = "Exosomes";
    }
    if($routeParams.type == "mv"){
        $scope.type1 = "Microvesicles";
    }

	if($routeParams.sample == "source"){
		$scope.one =1;
		getSourceexp();
	}
	else if($routeParams.sample == "cancer"){
		$scope.three = 1;
		getCancerexp();
	}
	function sortExpression (a,b){
		return b.expression-a.expression;
	}

   function fenge(d){
      var result = [];
      for(var i=0,len=d.length;i<len;i+=5){
         result.push(d.slice(i,i+5));
      }
      return result
    }
    
    // sort
    $scope.sortType     = 'cancer'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
 
    $scope.sortType2     = 'expression'; // set the default sort type
    $scope.sortReverse2  = true;  // set the default sort order
    
    
	function getSourceexp(){
		$http({
			url:base_url+"/api/sourceexp",
			method:"GET",
			params:{source:$routeParams.source,type:$routeParams.type,sra:$routeParams.sra}
		}).then(
			function(response){
				console.log(response);
				$scope.sourceexplist = response.data.sourceexp_list;
				$scope.sourcesralist = response.data.source_sra_list;
				if(response.data.sralength < 8){
				    $scope.sraheight = "100%"
				}else{
				    $scope.sraheight = "400";
				};
                
                var sracancer = [];
                for(var i=0;i<$scope.sourcesralist.length;i++){
                    sracancer.push($scope.sourcesralist[i].cancer)
                }
                
                var sracancercounts = {};
                for (var i = 0; i < sracancer.length; i++) {
                    sracancercounts[sracancer[i]] = 1 + (sracancercounts[sracancer[i]] || 0);
                    }
                var scc_key = [];
                var scc_val = [];
                for(var key in sracancercounts){
                    scc_key.push(key);
                    scc_val.push(sracancercounts[key]);
                }
                
                $scope.scc_key = scc_key;
                $scope.scc_val = scc_val;

                
				var length = response.data.records_num;
				$scope.source = $routeParams.sra;
				var interestlist = [];
                var bb = $scope.sourceexplist.sort(sortExpression)
                for(var i = 0; i<1114; i++){
                    if(bb[i].expression>0){
                        var aa = {"mirna":bb[i].mirna, "expression" : Number(bb[i].expression.toFixed(2))};
                        interestlist.push(aa);
                    }
				}
				$scope.interestlist = interestlist;
		});
    }

    // sra exp click

    $scope.sraexp = function(ev){
        $mdDialog.show(
            {
                controller: SraController,
                locals:{ev:ev},
                templateUrl: '/static/EVmiRNA/pages/sra.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                $scope.status = 'You cancelled the dialog.';
                });
    };

// topmir pic 
    
    $scope.topmirna = function(tm){
        $mdDialog.show(
            {
                controller: TopmirnaController,
                locals:{tm:tm},
                templateUrl: '/static/EVmiRNA/pages/topmirna.html',
                parent: angular.element(document.body),
                targetEvent: tm,
                clickOutsideToClose:true,
                // fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                $scope.status = 'You cancelled the dialog.';
                });
    }


	function getCancerexp(){
		$http({
			url:base_url+"/api/cancerexp",
			method:"GET",
			params:{cancer:$routeParams.cancer,type:$routeParams.type,sra:$routeParams.sra}
		}).then(
			function(response){
				console.log(response);
				$scope.cancerlist = response.data.cancerexp_list;
				$scope.cancersralist = response.data.cancer_sra_list;
				var length = response.data.records_num;
				$scope.cancer = $routeParams.sra;
				$scope.interestlistds = otherlist;
			});
	}

}
