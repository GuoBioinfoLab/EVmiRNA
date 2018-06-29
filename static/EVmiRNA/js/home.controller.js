"use strict";

angular.module('EVmiRNA')
    .controller('HomeController', HomeController);

function HomeController($scope,$http,$window,$routeParams,EVmiRNAService) {
    console.log("HomeController loaded");
    var sampleNo = $routeParams.sample;
    var base_url=EVmiRNAService.getAPIBaseUrl();
       var flag = 0;

    $scope.check = function (query_item){
            if(/[@#\$%\^&\*]+/g.test(query_item)){
                  alert("Invalid input");
                  flag=1;
                  history.back();
            }
          };

	$scope.filter_id = function(){
		$scope.check($scope.query_miRNA);
		var query_param =  ""+$scope.query_miRNA;
		$http({
			url:base_url+"/api/exp_mv_cancer",
			params:{mirna:query_param},
			method:"GET",
		}).then(
			function(response){
				var temp = response.data.exp_mv_cancer_list;
				console.log("temp");
				console.log(temp.length);
				console.log(response);
				if(temp.length != 0){
					if(flag == 0){
              $window.open(base_url+"#!/miRNA_info?miRNA="+$scope.query_miRNA,"_self");
					}
				}
				else{
					$window.open(base_url+"#!/search","_self");
				}
			})
	};

//    $.get("/api/mirnalist",function(content){
//  		var mirnalist = content;
  		var dd = new Array("miR-99b-5p","miR-99b-3p","miR-99a-5p","miR-99a-3p","miR-98-5p","miR-98-3p","miR-96-5p","miR-96-3p","miR-9-5p","miR-95-3p","miR-944","miR-943","miR-942-5p","miR-942-3p","miR-941","miR-940","miR-9-3p","miR-939-5p","miR-937-3p","miR-93-5p","miR-935","miR-934","miR-93-3p","miR-92b-5p","miR-92b-3p","miR-92a-3p","miR-92a-2-5p","miR-92a-1-5p","miR-892c-5p","miR-892c-3p","miR-892b","miR-892a","miR-891b","miR-891a-5p","miR-890","miR-889-3p","miR-888-5p","miR-887-5p","miR-887-3p","miR-885-5p","miR-885-3p","miR-877-5p","miR-877-3p","miR-876-5p","miR-876-3p","miR-874-5p","miR-874-3p","miR-873-5p","miR-873-3p","miR-8485","miR-8086","miR-8069","miR-7977","miR-7976","miR-7975","miR-7974","miR-7851-3p","miR-7850-5p","miR-7847-3p","miR-7846-3p","miR-7843-3p","miR-7706","miR-7705","miR-7704","miR-769-5p","miR-769-3p","miR-767-5p","miR-766-5p","miR-766-3p","miR-765","miR-7641","miR-762","miR-760","miR-7-5p","miR-758-5p","miR-758-3p","miR-744-5p","miR-744-3p","miR-718","miR-7-1-3p","miR-7111-3p","miR-7110-5p","miR-7110-3p","miR-7108-5p","miR-7108-3p","miR-7107-5p","miR-708-5p","miR-708-3p","miR-6883-5p","miR-6877-5p","miR-6875-5p","miR-6873-3p","miR-6870-5p","miR-6869-5p","miR-6867-5p","miR-6866-5p","miR-6859-5p","miR-6858-5p","miR-6858-3p","miR-6850-5p","miR-6847-5p","miR-6843-3p","miR-6842-3p","miR-6839-5p","miR-6839-3p","miR-6836-5p","miR-6826-5p","miR-6822-5p","miR-6821-5p","miR-6816-5p","miR-6807-3p","miR-6806-5p","miR-6806-3p","miR-6790-3p","miR-6789-5p","miR-6785-5p","miR-6777-5p","miR-6777-3p","miR-6773-5p","miR-6769b-5p","miR-6765-3p","miR-6764-5p","miR-676-3p","miR-6763-5p","miR-675-5p","miR-675-3p","miR-6753-5p","miR-6753-3p","miR-6752-3p","miR-6750-5p","miR-6750-3p","miR-6747-5p","miR-6746-5p","miR-6743-3p","miR-6740-5p","miR-6734-5p","miR-6729-5p","miR-6724-5p","miR-6723-5p","miR-6718-5p","miR-6716-3p","miR-671-5p","miR-671-3p","miR-668-3p","miR-665","miR-664b-5p","miR-664b-3p","miR-664a-5p","miR-664a-3p","miR-663b","miR-663a","miR-660-5p","miR-660-3p","miR-659-5p","miR-658","miR-656-5p","miR-656-3p","miR-655-3p","miR-654-5p","miR-654-3p","miR-652-5p","miR-652-3p","miR-6516-5p","miR-6516-3p","miR-651-5p","miR-6515-5p","miR-6513-3p","miR-6511b-5p","miR-6511b-3p","miR-6511a-5p","miR-6511a-3p","miR-6510-3p","miR-6509-5p","miR-6501-3p","miR-6500-3p","miR-646","miR-643","miR-642a-5p","miR-642a-3p","miR-641","miR-638","miR-636","miR-629-5p","miR-629-3p","miR-628-5p","miR-628-3p","miR-627-5p","miR-627-3p","miR-625-5p","miR-625-3p","miR-624-5p","miR-619-5p","miR-618","miR-616-5p","miR-615-5p","miR-615-3p","miR-6131","miR-6126","miR-6125","miR-6124","miR-6090","miR-6089","miR-6087","miR-6078","miR-6075","miR-6073","miR-607","miR-601","miR-598-3p","miR-597-3p","miR-595","miR-592","miR-590-5p","miR-590-3p","miR-589-5p","miR-589-3p","miR-585-3p","miR-584-5p","miR-582-5p","miR-582-3p","miR-579-3p","miR-577","miR-576-5p","miR-576-3p","miR-574-5p","miR-574-3p","miR-5701","miR-5699-5p","miR-5699-3p","miR-5684","miR-5680","miR-566","miR-564","miR-561-5p","miR-5588-5p","miR-5585-3p","miR-5581-3p","miR-558","miR-5571-5p","miR-557","miR-552-5p","miR-552-3p","miR-551b-5p","miR-551b-3p","miR-551a","miR-550a-5p","miR-550a-3p","miR-550a-3-5p","miR-549a","miR-548z","miR-548w","miR-548u","miR-548t-5p","miR-548s","miR-548q","miR-548p","miR-548o-5p","miR-548o-3p","miR-548n","miR-548l","miR-548k","miR-548j-5p","miR-548j-3p","miR-548i","miR-548h-5p","miR-548g-5p","miR-548f-3p","miR-548e-5p","miR-548e-3p","miR-548d-5p","miR-548c-5p","miR-548b-3p","miR-548az-5p","miR-548ay-5p","miR-548ar-5p","miR-548ar-3p","miR-548aq-3p","miR-548am-5p","miR-548ah-5p","miR-548ah-3p","miR-545-5p","miR-545-3p","miR-543","miR-542-3p","miR-541-5p","miR-541-3p","miR-539-5p","miR-539-3p","miR-532-5p","miR-532-3p","miR-526b-5p","miR-525-5p","miR-524-5p","miR-524-3p","miR-522-3p","miR-521","miR-520g-3p","miR-520f-3p","miR-520d-5p","miR-520d-3p","miR-520c-3p","miR-520a-5p","miR-520a-3p","miR-519d-5p","miR-519d-3p","miR-519c-3p","miR-519b-3p","miR-519a-5p","miR-519a-3p","miR-5196-5p","miR-5196-3p","miR-5195-3p","miR-518e-3p","miR-518c-3p","miR-518b","miR-518a-5p","miR-5187-5p","miR-517c-3p","miR-517b-3p","miR-516b-5p","miR-516a-5p","miR-515-5p","miR-515-3p","miR-514a-5p","miR-514a-3p","miR-513c-5p","miR-513a-5p","miR-512-3p","miR-511-5p","miR-511-3p","miR-510-5p","miR-510-3p","miR-5100","miR-5096","miR-509-5p","miR-5095","miR-5094","miR-509-3p","miR-509-3-5p","miR-5088-3p","miR-508-3p","miR-506-3p","miR-505-5p","miR-505-3p","miR-504-5p","miR-503-5p","miR-503-3p","miR-502-3p","miR-501-5p","miR-501-3p","miR-5010-5p","miR-5010-3p","miR-500b-3p","miR-500a-5p","miR-500a-3p","miR-5006-5p","miR-5004-3p","miR-5002-5p","miR-5001-3p","miR-499a-5p","miR-499a-3p","miR-498","miR-497-5p","miR-496","miR-495-3p","miR-494-3p","miR-493-5p","miR-493-3p","miR-491-5p","miR-491-3p","miR-490-5p","miR-490-3p","miR-488-3p","miR-487b-5p","miR-487b-3p","miR-487a-5p","miR-487a-3p","miR-486-5p","miR-486-3p","miR-485-5p","miR-485-3p","miR-484","miR-483-5p","miR-483-3p","miR-4804-5p","miR-4802-5p","miR-4802-3p","miR-4800-5p","miR-4800-3p","miR-4792","miR-4791","miR-4789-5p","miR-4787-5p","miR-4787-3p","miR-4785","miR-4784","miR-4775","miR-4767","miR-4755-3p","miR-4750-5p","miR-4746-5p","miR-4745-5p","miR-4741","miR-4740-3p","miR-4739","miR-4732-5p","miR-4732-3p","miR-4728-3p","miR-4725-3p","miR-4716-3p","miR-4709-5p","miR-4707-5p","miR-4707-3p","miR-4690-3p","miR-4684-3p","miR-4677-3p","miR-4674","miR-4669","miR-4667-5p","miR-4666a-3p","miR-4665-5p","miR-4664-5p","miR-4664-3p","miR-4662b","miR-4661-5p","miR-4659a-3p","miR-4658","miR-4654","miR-4653-3p","miR-4652-5p","miR-4651","miR-4647","miR-4645-3p","miR-4644","miR-455-5p","miR-455-3p","miR-454-5p","miR-454-3p","miR-4532","miR-4531","miR-4527","miR-452-5p","miR-452-3p","miR-4521","miR-451a","miR-4518","miR-4517","miR-4516","miR-4513","miR-4511","miR-4510","miR-450b-5p","miR-450a-5p","miR-450a-1-3p","miR-4508","miR-4507","miR-4504","miR-4500","miR-449c-5p","miR-449a","miR-4497","miR-4492","miR-4488","miR-4485-3p","miR-4482-3p","miR-4479","miR-4478","miR-4474-3p","miR-4473","miR-4472","miR-4470","miR-4467","miR-4466","miR-4463","miR-4461","miR-4459","miR-4454","miR-4451","miR-4449","miR-4448","miR-4446-3p","miR-4444","miR-4443","miR-4436b-5p","miR-4435","miR-4433b-5p","miR-4433b-3p","miR-4429","miR-4428","miR-4424","miR-4423-3p","miR-4421","miR-4419b","miR-4419a","miR-433-5p","miR-433-3p","miR-4330","miR-4326","miR-432-5p","miR-432-3p","miR-431-5p","miR-431-3p","miR-4313","miR-4306","miR-4305","miR-4301","miR-429","miR-4286","miR-4284","miR-4283","miR-4278","miR-4273","miR-4270","miR-4259","miR-4258","miR-425-5p","miR-4254","miR-425-3p","miR-424-5p","miR-424-3p","miR-423-5p","miR-423-3p","miR-422a","miR-421","miR-412-5p","miR-412-3p","miR-411-5p","miR-411-3p","miR-410-5p","miR-410-3p","miR-409-5p","miR-409-3p","miR-3976","miR-3960","miR-3944-3p","miR-3940-5p","miR-3940-3p","miR-3938","miR-3934-5p","miR-3929","miR-3928-3p","miR-3916","miR-3913-5p","miR-3912-3p","miR-3911","miR-3909","miR-3907","miR-384","miR-383-5p","miR-382-5p","miR-382-3p","miR-381-5p","miR-381-3p","miR-380-5p","miR-380-3p","miR-379-5p","miR-379-3p","miR-378h","miR-378g","miR-378f","miR-378e","miR-378d","miR-378c","miR-378b","miR-378a-5p","miR-378a-3p","miR-377-5p","miR-377-3p","miR-376c-5p","miR-376c-3p","miR-376b-5p","miR-376b-3p","miR-376a-5p","miR-376a-3p","miR-375","miR-374c-5p","miR-374b-5p","miR-374b-3p","miR-374a-5p","miR-374a-3p","miR-373-3p","miR-372-3p","miR-371a-5p","miR-371a-3p","miR-370-5p","miR-370-3p","miR-369-5p","miR-369-3p","miR-3691-5p","miR-3690","miR-3688-3p","miR-3687","miR-3681-5p","miR-3679-5p","miR-3678-5p","miR-3677-3p","miR-3675-5p","miR-3665","miR-3664-3p","miR-3663-3p","miR-3662","miR-3661","miR-3660","miR-365b-5p","miR-365b-3p","miR-365a-5p","miR-365a-3p","miR-3657","miR-3656","miR-3653-5p","miR-3653-3p","miR-3651","miR-3648","miR-363-5p","miR-363-3p","miR-362-5p","miR-362-3p","miR-3622a-5p","miR-3617-5p","miR-361-5p","miR-3615","miR-3614-5p","miR-361-3p","miR-3613-5p","miR-3609","miR-3607-3p","miR-3605-5p","miR-3605-3p","miR-3591-5p","miR-34c-5p","miR-34c-3p","miR-34b-5p","miR-34b-3p","miR-34a-5p","miR-34a-3p","miR-346","miR-345-5p","miR-345-3p","miR-342-5p","miR-342-3p","miR-340-5p","miR-340-3p","miR-33b-5p","miR-33b-3p","miR-33a-5p","miR-33a-3p","miR-339-5p","miR-339-3p","miR-338-5p","miR-338-3p","miR-337-5p","miR-337-3p","miR-335-5p","miR-335-3p","miR-331-5p","miR-331-3p","miR-330-5p","miR-330-3p","miR-329-5p","miR-329-3p","miR-328-5p","miR-328-3p","miR-326","miR-32-5p","miR-324-5p","miR-324-3p","miR-32-3p","miR-323b-3p","miR-323a-5p","miR-323a-3p","miR-320e","miR-320d","miR-320c","miR-320b","miR-320a","miR-3202","miR-3200-3p","miR-3199","miR-3196","miR-3195","miR-3194-5p","miR-3190-3p","miR-3188","miR-3187-3p","miR-3182","miR-3180-5p","miR-3180-3p","miR-3180","miR-3179","miR-3178","miR-3177-3p","miR-3176","miR-3175","miR-3174","miR-3173-3p","miR-3168","miR-3167","miR-3162-3p","miR-3160-3p","miR-31-5p","miR-3158-3p","miR-3156-3p","miR-3155a","miR-3154","miR-3152-5p","miR-3150b-3p","miR-3149","miR-3147","miR-3144-3p","miR-3143","miR-3142","miR-3141","miR-31-3p","miR-3138","miR-3136-5p","miR-3133","miR-3132","miR-3131","miR-3130-3p","miR-3129-5p","miR-3129-3p","miR-3127-5p","miR-3126-5p","miR-3125","miR-3123","miR-3122","miR-3121-3p","miR-3120-3p","miR-3117-3p","miR-3116","miR-30e-5p","miR-30e-3p","miR-30d-5p","miR-30d-3p","miR-30c-5p","miR-30c-2-3p","miR-30c-1-3p","miR-30b-5p","miR-30b-3p","miR-30a-5p","miR-30a-3p","miR-3074-5p","miR-3074-3p","miR-3065-5p","miR-3065-3p","miR-3064-5p","miR-302a-5p","miR-301b-3p","miR-301a-5p","miR-301a-3p","miR-29c-5p","miR-29c-3p","miR-29b-3p","miR-29b-2-5p","miR-29b-1-5p","miR-29a-5p","miR-29a-3p","miR-299-5p","miR-299-3p","miR-296-5p","miR-296-3p","miR-2861","miR-28-5p","miR-28-3p","miR-27b-5p","miR-27b-3p","miR-27a-5p","miR-27a-3p","miR-26b-5p","miR-26b-3p","miR-26a-5p","miR-26a-2-3p","miR-26a-1-3p","miR-2682-5p","miR-25-5p","miR-25-3p","miR-2467-5p","miR-24-3p","miR-24-2-5p","miR-24-1-5p","miR-23c","miR-23b-5p","miR-23b-3p","miR-23a-5p","miR-23a-3p","miR-2355-5p","miR-2355-3p","miR-2277-5p","miR-2277-3p","miR-2276-3p","miR-22-5p","miR-224-5p","miR-224-3p","miR-22-3p","miR-223-5p","miR-223-3p","miR-222-5p","miR-222-3p","miR-221-5p","miR-221-3p","miR-219b-5p","miR-219a-5p","miR-219a-2-3p","miR-219a-1-3p","miR-218-5p","miR-218-2-3p","miR-218-1-3p","miR-217","miR-216b-5p","miR-216b-3p","miR-216a-5p","miR-21-5p","miR-215-5p","miR-215-3p","miR-214-5p","miR-214-3p","miR-21-3p","miR-212-5p","miR-212-3p","miR-2116-3p","miR-211-5p","miR-2115-5p","miR-2115-3p","miR-2113","miR-2110","miR-210-5p","miR-210-3p","miR-20b-5p","miR-20b-3p","miR-20a-5p","miR-20a-3p","miR-208b-3p","miR-206","miR-205-5p","miR-205-3p","miR-204-5p","miR-204-3p","miR-203b-3p","miR-203a-5p","miR-203a-3p","miR-202-5p","miR-202-3p","miR-200c-5p","miR-200c-3p","miR-200b-5p","miR-200b-3p","miR-200a-5p","miR-200a-3p","miR-19b-3p","miR-19b-2-5p","miR-19b-1-5p","miR-19a-5p","miR-19a-3p","miR-199b-5p","miR-199b-3p","miR-199a-5p","miR-199a-3p","miR-197-5p","miR-197-3p","miR-1972","miR-196b-5p","miR-196a-5p","miR-196a-3p","miR-195-5p","miR-195-3p","miR-194-5p","miR-194-3p","miR-193b-5p","miR-193b-3p","miR-193a-5p","miR-193a-3p","miR-192-5p","miR-192-3p","miR-191-5p","miR-1915-3p","miR-191-3p","miR-1912","miR-1911-5p","miR-1911-3p","miR-1910-5p","miR-1910-3p","miR-190b","miR-190a-5p","miR-190a-3p","miR-1908-5p","miR-1908-3p","miR-18b-5p","miR-18a-5p","miR-18a-3p","miR-188-5p","miR-188-3p","miR-187-5p","miR-187-3p","miR-186-5p","miR-186-3p","miR-185-5p","miR-185-3p","miR-184","miR-183-5p","miR-183-3p","miR-1827","miR-182-5p","miR-182-3p","miR-181d-5p","miR-181d-3p","miR-181c-5p","miR-181c-3p","miR-181b-5p","miR-181b-3p","miR-181b-2-3p","miR-181a-5p","miR-181a-3p","miR-181a-2-3p","miR-17-5p","miR-17-3p","miR-16-5p","miR-16-2-3p","miR-16-1-3p","miR-15b-5p","miR-15b-3p","miR-15a-5p","miR-15a-3p","miR-155-5p","miR-155-3p","miR-154-5p","miR-154-3p","miR-1538","miR-153-3p","miR-152-5p","miR-152-3p","miR-151b","miR-151a-5p","miR-151a-3p","miR-150-5p","miR-150-3p","miR-149-5p","miR-149-3p","miR-148b-5p","miR-148b-3p","miR-148a-5p","miR-148a-3p","miR-147b","miR-146b-5p","miR-146b-3p","miR-146a-5p","miR-146a-3p","miR-1468-5p","miR-145-5p","miR-145-3p","miR-144-5p","miR-144-3p","miR-143-5p","miR-143-3p","miR-142-5p","miR-142-3p","miR-141-5p","miR-141-3p","miR-140-5p","miR-140-3p","miR-1-3p","miR-139-5p","miR-139-3p","miR-138-5p","miR-138-2-3p","miR-138-1-3p","miR-137","miR-136-5p","miR-136-3p","miR-135b-5p","miR-135b-3p","miR-135a-5p","miR-135a-3p","miR-134-5p","miR-1343-5p","miR-1343-3p","miR-133b","miR-133a-5p","miR-133a-3p","miR-132-5p","miR-132-3p","miR-1323","miR-130b-5p","miR-130b-3p","miR-130a-5p","miR-130a-3p","miR-1307-5p","miR-1307-3p","miR-1306-5p","miR-1306-3p","miR-1304-5p","miR-1304-3p","miR-1303","miR-1301-3p","miR-1299","miR-1298-5p","miR-1298-3p","miR-1296-5p","miR-1296-3p","miR-129-5p","miR-1295a","miR-1294","miR-1293","miR-1292-5p","miR-129-2-3p","miR-129-1-3p","miR-1291","miR-1290","miR-1289","miR-1287-5p","miR-1287-3p","miR-1286","miR-1285-5p","miR-1285-3p","miR-1284","miR-128-3p","miR-1283","miR-128-2-5p","miR-128-1-5p","miR-1278","miR-1277-5p","miR-1277-3p","miR-1276","miR-127-5p","miR-1275","miR-127-3p","miR-1273h-5p","miR-1273h-3p","miR-1273g-5p","miR-1273g-3p","miR-1273f","miR-1273e","miR-1273d","miR-1273c","miR-1273a","miR-1272","miR-1271-5p","miR-1271-3p","miR-1270","miR-1269b","miR-1268b","miR-1268a","miR-1266-5p","miR-126-5p","miR-1264","miR-126-3p","miR-1262","miR-1261","miR-1260b","miR-1260a","miR-125b-5p","miR-125b-2-3p","miR-125b-1-3p","miR-125a-5p","miR-125a-3p","miR-1255a","miR-1254","miR-1251-5p","miR-1248","miR-1247-5p","miR-1247-3p","miR-1246","miR-124-5p","miR-1244","miR-124-3p","miR-1243","miR-1237-5p","miR-1236-5p","miR-1228-5p","miR-1227-5p","miR-1226-5p","miR-1226-3p","miR-122-5p","miR-1224-5p","miR-1224-3p","miR-1197","miR-1185-5p","miR-1185-2-3p","miR-1185-1-3p","miR-1180-3p","miR-10b-5p","miR-10b-3p","miR-10a-5p","miR-10a-3p","miR-107","miR-106b-5p","miR-106b-3p","miR-106a-5p","miR-106a-3p","miR-105-5p","miR-105-3p","miR-103a-3p","miR-103a-2-5p","miR-101-5p","miR-101-3p","miR-100-5p","miR-100-3p","let-7i-5p","let-7i-3p","let-7g-5p","let-7g-3p","let-7f-5p","let-7f-2-3p","let-7f-1-3p","let-7e-5p","let-7e-3p","let-7d-5p","let-7d-3p","let-7c-5p","let-7c-3p","let-7b-5p","let-7b-3p","let-7a-5p","let-7a-3p");
        
  		$(function(){
  			$("#mirnaid").autocomplete({
  				source:dd
  			},
  			{
  				minLength:5
  			});
  		});
        
        $scope.navdd = dd;
        
//  	});

  //   $scope.get_list = function () {
  //        $http({
  //            url:  '/api/samplerun',
  //            method: 'GET',
	//      params:{sample:sampleNo}
  //        }).then(
  //           function (response) {
  //           console.log(response);
  //           $scope.runlist = response.data.sample_run_list;
  //            }
  //       )
  //    };
  //   $scope.get_list();
  //   $scope.update_page = function(test,page,size,total){
  //               var condition = {};
  //               condition["page"] = page;
  //               $http({
  //                       url: base_url+'/api/rnaratio',
  //                       method: 'GET',
  //                       params: condition
  //               }).then(
  //
  //                       function(response){
  //                       console.log(response);
  //                       var temp = response.data.sample_RNA_ratio_list;
  //                       if(temp.length == 0){
  //                               $scope.error=1;
  //                       }
  //                       $scope.sample_RNA_ratio_list = response.data.sample_RNA_ratio_list;
  //                       $scope.records_number = response.data.records_num;
  //                       }
  //               )
  //   };
  //
  //   $scope.fetch_sampleratio = function(){
  //               $http({
  //                       url:base_url+'/api/rnaratio',
  //                       method:'GET'
  //               }).then(
  //                       function(response){
  //                               console.log(response);
  //                               $scope.sample_RNA_ratio_list = response.data.sample_RNA_ratio_list;
  //                               $scope.records_number = response.data.records_num;
  //                       });
  //
  //       };
	// $scope.fetch_sampleratio();

}
