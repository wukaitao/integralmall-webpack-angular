module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '积分E卡';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	$scope.action = 'MB';
	$scope.actionImageCode = '9';
	$scope.cardCode = '';
	$scope.imageCode = '';
	$scope.imageCodeImage = '';
	$scope.errorMessageCardCode = '';
	$scope.errorMessageImageCode = '';
	$scope.isErrorCheckCardCode = true;
	$scope.isErrorCheckImageCode = true;
	$scope.initCheckCard = true;
	$scope.initCheckImage = true;
	//获取验证码图片
	$scope.getImageCodeImage = function(){
		$scope.imageCodeImage = '';
		$timeout(function(){
			$scope.imageCodeImage = origin+'/mb-member/validate-code.xhtml?action='+$scope.actionImageCode;
		},100);
	};
	$scope.getImageCodeImage();
	//删除空格
	var _delBlank = function(str){
		var blankReg = /\s+/g;
		return str.replace(blankReg,'');
	};
	//删除特殊字符
	var _delSpeStr = function(str){
		var speReg = new RegExp("[\\s`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_]",'g');
		return str.replace(speReg,'');
	};
	$scope.filterCardCode = function(){
		$scope.isErrorCheckCardCode = false;
		$scope.cardCode = _delBlank($scope.cardCode);
	};
	$scope.filterImageCode = function(){
		$scope.isErrorCheckImageCode = false;
		$scope.imageCode = _delSpeStr($scope.imageCode);
	};
	$scope.checkCardCode = function(){
		var cardCodeReg = new RegExp('^[A-Za-z0-9]{16}$');
		var speReg = new RegExp("[\\s`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_]",'g');
		if(speReg.test($scope.cardCode)){
			$scope.errorMessageCardCode = '包含非法字符';
			!$scope.initCheckCard&&($scope.isErrorCheckCardCode = true);
			return true;
		}else if(!$scope.cardCode || !cardCodeReg.test($scope.cardCode)){
			$scope.errorMessageCardCode = '请输入16位卡号';
			!$scope.initCheckCard&&($scope.isErrorCheckCardCode = true);
			return true;
		};
		$scope.isErrorCheckCardCode = false;
		return false;
	};
	$scope.checkImageCode = function(){
		var imageCodeReg = new RegExp('^[A-Za-z0-9]{4}$');
		var speReg = new RegExp("[\\s`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_]",'g');
		if(speReg.test($scope.imageCode)){
			$scope.errorMessageImageCode = '包含非法字符';
			!$scope.initCheckImage&&($scope.isErrorCheckImageCode = true);
			return true;
		}else if(!$scope.imageCode || !imageCodeReg.test($scope.imageCode)){
			$scope.errorMessageImageCode = '您输入的验证码有误，请重新输入';
			!$scope.initCheckImage&&($scope.isErrorCheckImageCode = true);
			return true;
		};
		$scope.isErrorCheckImageCode = false;
		return false;
	};
	//初始校验
	var _initCheck = function(){
		$scope.checkCardCode();
		$scope.checkImageCode();
	};
	_initCheck();
	//兑换
	$scope.exchange = function(){
		$scope.initCheckCard = false;
		$scope.initCheckImage = false;
		var checkFlag = $scope.checkCardCode() || $scope.checkImageCode();
		if(checkFlag) return;
		var param = {
			cardCode: $scope.cardCode,
			imageCode: $scope.imageCode,
			action: $scope.action
		};
		var promise = baseDataService.originalHttp(doScoreEcard,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				//请求成功
				$scope.showToast('兑换成功，请在“我的积分”',function(){
					$location.path('exchangeCenter');
				});
			}else if(data.respCode=='01'){
				//登录信息已失效，请重新登录
			}else if(data.respCode=='02'){
				//卡号相关验证提示信息
				$scope.isErrorCheckCardCode = true;
				$scope.errorMessageCardCode = data.respDesc;
			}else if(data.respCode=='03'){
				//图形验证码验证提示信息
				$scope.isErrorCheckImageCode = true;
				$scope.errorMessageImageCode = data.respDesc;
			}else if(data.respCode=='04'){
				//您暂未绑定保单，请先绑定
				$scope.showAlert('您暂未绑定保单，请先绑定');
			}else if(data.respCode=='05'){
				//其他提示信息
				$scope.showAlert(data.respDesc);
			};
		});
	};
}];
