module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '地址管理';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('groupsExchange');
	};
	//设置默认地址
	$scope.setDefaultAddress = function(one){
		if(one.isDefault=='1') return;
		var oldAddressId = '0';
		$scope.renderData.forEach(function(item){
			item.isDefault=='1' && (oldAddressId=item.addressId);
		});
		var param = {
			oldAddressId: oldAddressId,
			newAddressId: one.addressId
		};
		if(updateDefaultAddressJSON.respCode=='00'){
			$scope.renderData.forEach(function(item){
				if(item.addressId==one.addressId){
					item.isDefault = '1';
				}else{
					item.isDefault = '0';
				};
			});
		};
	};
	//编辑地址
	$scope.toAddressEditPath = function(one){
		form.addressDetail = one;
		$location.path('addressEdit/'+one.addressId);
	};
	//删除地址
	$scope.deleteAddress = function(one,index){
		createDialog({
			id: 'deleteAddress',
			template: '确定删除该地址吗?',
			success: {
				label: '确定',
				fn: function(){
					var param  = {
						addressId: one.addressId
					};
					if(delAddressJSON.respCode=='00'){
						$scope.renderData.splice(index,1);
						console.log('删除成功.');
					};
				}
			},
			cancel: {
				label: '取消',
				fn: function(){
					console.log('cancel');
				}
			}
		});
	};
	//添加地址
	$scope.toAddressAddPath = function(){
		form.addressDetail = {
			receiveName: '',
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
		//匹配地址的省市区名称和编码
		queryAddressListJSON.forEach(function(item){
			for(one of chinaData){
				if(item.provinceCode==one.code){
					item.provinceName = one.name;
					for(subOne of one.cities){
						if(item.cityCode==subOne.code){
							item.cityName = subOne.name;
							for(littleOne of subOne.districts){
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
		$scope.renderData = queryAddressListJSON;
	};
	_getAddressList();
}];
