module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '赚积分';
	//form.leftBtnClick = function(){
	//};
	//初始化页面配置
	//获取赚积分分类信息
	var _getScoreChannelStatus = function(){
		var promise = baseDataService.originalHttp(queryScoreChannelStatus);
		promise.then(function(data){
			if(data.respCode=='00'){
				var staticData = [
					{
						code: 'ZCDL',
						name: '注册登陆',
						imageUrl: require('../images/design/icon-earnIntegral-register-default.png'),
						imageSelectedUrl: require('../images/design/icon-earnIntegral-register-complete.png'),
						count: '500积分',
						isComplete: data.respData.registerLogin
					},
					{
						code: 'BDDD',
						name: '绑定订单',
						imageUrl: require('../images/design/icon-earnIntegral-binding-default.png'),
						imageSelectedUrl: require('../images/design/icon-earnIntegral-binding-complete.png'),
						count: '100积分',
						isComplete: data.respData.bindPolicy
					},
					{
						code: 'XBDD_01',
						name: '续保订单',
						imageUrl: require('../images/design/icon-earnIntegral-renewal-default.png'),
						imageSelectedUrl: require('../images/design/icon-earnIntegral-renewal-complete.png'),
						count: '300积分',
						isComplete: data.respData.renewPolicy
					},
					{
						code: 'MRQD',
						name: '每日签到',
						imageUrl: require('../images/design/icon-earnIntegral-sign-default.png'),
						imageSelectedUrl: require('../images/design/icon-earnIntegral-sign-complete.png'),
						count: '累积获奖',
						isComplete: data.respData.signature
					},
					{
						code: 'XBDD_02',
						name: '续保订单',
						imageUrl: require('../images/design/icon-earnIntegral-luckDraw-default.png'),
						imageSelectedUrl: require('../images/design/icon-earnIntegral-luckDraw-complete.png'),
						count: '转盘抽大奖',
						isComplete: data.respData.scoreDraw
					}
				];
				$scope.renderData = staticData;
			};
		});
	};
	_getScoreChannelStatus();
	//绑定订单
	$scope.clickFn = function(one){
		if(one.isComplete) return;
		if(one.code=='BDDD'){
			$scope.showConfirm('首次绑定个险送100积分立即绑定？',function(){
			});
		}else if(one.code=='XBDD_01'){
		}else if(one.code=='MRQD'){
		}else if(one.code=='XBDD_02'){
		};
	};
}];
