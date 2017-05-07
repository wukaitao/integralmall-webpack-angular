module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '地址管理';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	form.loading.show = true;
	//设置默认地址
	$scope.setDefaultAddress = function(one){
		if(one.isDefault=='01') return;
		var oldAddressId = '00';
		$scope.renderData.forEach(function(item){
			item.isDefault=='01' && (oldAddressId=item.addressId);
		});
		var param = {
			oldAddressId: ''+oldAddressId,
			newAddressId: ''+one.addressId
		};
		var promise = baseDataService.originalHttp(updateDefaultAddress,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.forEach(function(item){
					if(item.addressId==one.addressId){
						item.isDefault = '01';
					}else{
						item.isDefault = '00';
					};
				});
			};
		});
	};
	//编辑地址
	$scope.toAddressEditPath = function(one){
		form.addressDetail = JSON.parse(JSON.stringify(one));
		$location.path('addressEdit/'+one.addressId);
	};
	//删除地址
	$scope.deleteAddress = function(one,index){
		if(one.isDefault=='01'){
			$scope.showAlert('不可删除默认地址');
			return;
		};
		$scope.showConfirm('确认删除该项？',function(){
			var param  = {
				addressId: ''+one.addressId
			};
			var promise = baseDataService.originalHttp(delAddress,param);
			promise.then(function(data){
				if(data.respCode=='00'){
					$scope.showToast('删除成功',function(){
						$scope.renderData.splice(index,1);
					});
				};
			});
		},null,'是','否');
	};
	//添加地址
	$scope.toAddressAddPath = function(){
		form.addressDetail = {
			receiverName: '',
			mobile: '',
			provinceCode: '',
			cityCode: '',
			countyCode: '',
			provinceName: '',
			cityName: '',
			countyName: '',
			detail: ''
		};
		$location.path('addressAdd');
	};
	//获取地址列表
	var _getAddressList = function(){
		var param = {
			type: '0'
		};
		var promise = baseDataService.originalHttp(queryAddressList,param,{
			complete: function(){
				form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				//匹配地址的省市区名称和编码
				data.respData.forEach(function(item){
					for(var i=0;i<chinaData.length;i++){
						var one = chinaData[i];
						if(item.provinceCode==one.code){
							item.provinceName = one.name;
							for(var j=0;j<one.cities.length;j++){
								var subOne = one.cities[j];
								if(item.cityCode==subOne.code){
									item.cityName = subOne.name;
									for(var k=0;k<subOne.districts.length;k++){
										var littleOne = subOne.districts[k];
										if(item.countyCode==littleOne.code){
											item.countyName = littleOne.name;
											break;
										};
									};
									break;
								};
							};
							break;
						};
					};
				});
				$scope.renderData = data.respData;
			};
		});
	};
	_getAddressList();
}];
