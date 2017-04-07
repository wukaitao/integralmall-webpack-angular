module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '积分E卡';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
	//页面初始配置
	$scope.cardNumber = '';
	$scope.verificationCode = '';
	$scope.verificationCodeImage = '';
	//获取验证码图片
	$scope.getVerificationCodeImage = function(){
		$scope.verificationCodeImage = '';
	};
	$scope.getVerificationCodeImage();
	//校验
	var _checkForm = function(){
		if($scope.cardNumber==''){
			console.log('卡号不能为空');
			return false;
		}else if($scope.verificationCode==''){
			console.log('验证码不能为空');
			return false;
		};
		return true;
	};
	//兑换
	$scope.exchange = function(){
		if(!_checkForm()) return;
		var param = {
			cardNumber: $scope.cardNumber,
			verificationCode: $scope.verificationCode
		};
		if(unnodeJSON.respCode=='00'){
			console.log('兑换成功.');
			$location.path('scoreMarket');
		};
	};
}];
