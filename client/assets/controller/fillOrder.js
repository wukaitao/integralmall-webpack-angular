module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '填写订单';
	//form.leftBtnClick = function(){
	//};
	//页面初始化配置
	$scope.totalCount = 0;
	$scope.action = 'MB';
	$scope.actionImageCode = form.shoppingCart.fromType=='lottery'?'12':'11';
	$scope.type = '1';
	$scope.showPayDetail = false;
	$scope.totalScore = form.shoppingCart.totalScore;
	$scope.orderInfo = [];
	$scope.verificationCode = '';
	$scope.verificationCodeImage = '';
	$scope.errorMessageVerificationCode = '';
	$scope.isErrorCallbackVerificationCode = false;
	//获取验证码图片
	$scope.getVerificationCodeImage = function(){
		$scope.verificationCodeImage = '';
		$timeout(function(){
			$scope.verificationCodeImage = 'https://login.sina.com.cn/cgi/pin.php?r='+new Date().getTime()+'&lang=zh&type=hollow&?action='+$scope.actionImageCode;
		},100);
	};
	var _changePageStatus = function(){
		$scope.totalScore = 0;
		$scope.renderData.selectedList.forEach(function(item){
			$scope.totalScore = $scope.totalScore + (item.activityType=='01'||item.activityType=='02'?item.activityScore:item.defaultScore) * item.amount;
		});
	};
	//增加商品数量
	$scope.addCount = function(one){
		one.amount = parseInt(one.amount) + 1;
		_changePageStatus();
	};
	//减少商品数量
	$scope.delCount = function(one){
		if(parseInt(one.amount)==1) return;
		one.amount = parseInt(one.amount) - 1;
		_changePageStatus();
	};
	//跳转到地址管理页面
	$scope.toAddressManagerPath = function(){
		$location.path('addressManagement');
	};
	//关闭付款确认弹窗
	$scope.hidePayDetail = function(){
		$scope.showPayDetail = false;
	};
	//删除空格
	var _delBlank = function(str){
		var blankReg = /\s+/g;
		return str.replace(blankReg,'');
	};
	$scope.checkVerificationCode = function(){
		$scope.isErrorCallbackVerificationCode = false;
		var verificationCodehReg = new RegExp('^[0-9A-Za-z]{4}$');
		$scope.verificationCode = _delBlank($scope.verificationCode);
		if(!$scope.verificationCode){
			$scope.errorMessageVerificationCode = '请填写验证码';
			return false;
		}else if(!verificationCodehReg.test($scope.verificationCode)){
			$scope.errorMessageVerificationCode = '4位英文或数字';
			return false;
		};
		return true;
	};
	//显示付款详情
	$scope.showPayDetailFn = function(){
		$scope.showPayDetail = !$scope.showPayDetail;
		if($scope.showPayDetail) $scope.getVerificationCodeImage();
	};
	//确认领取/付款
	$scope.pay = function(){
		if(!$scope.renderData.addressInfo){
			$scope.showAlert('请填写收货地址');
			return;
		};
		var checkFlag = $scope.checkVerificationCode();
		if(!checkFlag) return;
		if(form.shoppingCart.fromType=='lottery'){
			//抽奖领取
			var param = {
				rewardId: ''+form.shoppingCart.rewardId,
				addressId: ''+$scope.renderData.addressInfo.id,
				action: $scope.action,
				imageCode: $scope.verificationCode
			};
			var promise = baseDataService.originalHttp(getDraw,param,{isDisabledRepeatedly:true});
			promise.then(function(data){
				if(data.respCode=='00'){
					$scope.showToast('领取成功',function(){
						$location.path('integralOrder');
					});
				}else if(['03','04'].indexOf(data.respCode)!=-1){
					//操作频繁/领取受限
					$scope.showAlert(data.respDesc);
				};
			});
		}else{
			//兑换付款
			var productList = [];
			$scope.renderData.selectedList.forEach(function(item){
				productList.push({
					num: ''+item.amount,
					productCode: item.productCode
				});
			});
			var param = {
				from: form.shoppingCart.fromType=='exchange'?'01':form.shoppingCart.fromType=='shoppingCart'?'02':'',
				addressId: ''+$scope.renderData.addressInfo.id,
				productList: productList,
				action: $scope.action,
				imageCode: $scope.verificationCode
			};
			var promise = baseDataService.originalHttp(confirmExchange,param,{isDisabledRepeatedly:true});
			promise.then(function(data){
				if(data.respCode=='00'){
					$scope.showConfirm('付款成功.',function(){
						$location.path('integralOrder');
					},function(){
						$location.path('exchangeCenter');
					},'查看订单','再逛逛');
				}else if(['03','04','05','06','07','08'].indexOf(data.respCode)!=-1){
					//积分不足/验证码错误
					$scope.showAlert(data.respDesc);
				};
			});
		};
	};
	//获取订单信息
	var _getOrderDetail = function(){
		$scope.renderData = form.shoppingCart;
		$scope.totalCount = 0;
		$scope.renderData.selectedList.forEach(function(item){
			$scope.totalCount = $scope.totalCount + parseInt(item.amount);
		});
		if($scope.totalCount==1){
			$scope.orderInfo = $scope.renderData.selectedList[0].productName;
		}else{
			$scope.orderInfo = $scope.renderData.selectedList[0].productName+'等'+$scope.totalCount+'件商品';
		};
	};
	_getOrderDetail();
	//获取默认收货地址
	var _getAddressList = function(){
		var param = {
			type: $scope.type
		};
		var promise = baseDataService.originalHttp(queryAddressList,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				//匹配地址的省市区名称和编码
				$scope.renderData.addressInfo=data.respData.filter(function(item){
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
					return item.isDefault == '01';
				})[0];
			};
		});
	};
	_getAddressList();
}];
