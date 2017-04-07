module.exports = ['$scope', '$location', '$routeParams', 'form', 'baseDataService', 'createDialog', function($scope, $location, $routeParams, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '填写订单';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	//页面初始化配置
	$scope.type = '1';
	$scope.showPayDetail = false;
	$scope.totalScore = form.shoppingCart.totalScore;
	$scope.verificationCode = '';
	$scope.verificationCodeImage = '';
	//获取验证码图片
	$scope.getVerificationCodeImage = function(){
		$scope.verificationCodeImage = '';
	};
	$scope.getVerificationCodeImage();
	var _changePageStatus = function(){
		$scope.totalScore = 0;
		$scope.renderData.selectedList.forEach(function(item){
			$scope.totalScore = $scope.totalScore + item.scoreValue * item.num;
		});
	};
	//增加商品数量
	$scope.addCount = function(one){
		one.num = parseInt(one.num) + 1;
		_changePageStatus();
	};
	//减少商品数量
	$scope.delCount = function(one){
		if(parseInt(one.num)==1) return;
		one.num = parseInt(one.num) - 1;
		_changePageStatus();
	};
	//跳转到地址管理页面
	$scope.toAddressManagerPath = function(){
		$location.path('addressManager');
	};
	//关闭付款确认弹窗
	$scope.hidePayDetail = function(){
		$scope.showPayDetail = false;
	};
	//校验
	var _checkForm = function(){
		if($scope.verificationCode==''){
			console.log('验证码不能为空');
			return false;
		};
		return true;
	};
	//确认付款
	$scope.pay = function(){
		if(!_checkForm()) return;
		var productList = [];
		$scope.renderData.selectedList.forEach(function(item){
			productList.push({
				num: item.num,
				productCode: item.productCode
			});
		});
		var param = {
			productList: productList
		};
		if(confirmExchangeJSON.respCode=='00'){
			createDialog({
				id: 'pay',
				template: '兑换成功.',
				success: {
					label: '查看订单',
					fn: function(){
						$location.path('scoreOrder');
					}
				},
				cancel: {
					label: '再逛逛',
					fn: function(){
						$location.path('groupsExchange');
					}
				}
			});
		};
	};
	//获取订单信息
	$scope.renderData = form.shoppingCart;
	//获取默认收货地址
	var _getAddressList = function(){
		var param = {
			type: $scope.type
		};
		$scope.renderData.addressInfo = queryAddressListJSON.filter(function(item){
			//匹配地址的省市区名称和编码
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
			return item.isDefault == '1';
		})[0];
	};
	_getAddressList();
}];
