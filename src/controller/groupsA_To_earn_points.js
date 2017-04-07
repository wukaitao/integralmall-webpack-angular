module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '赚积分';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
	//模拟渲染数据
	var staticData = [
	    {
	    	code: 'ZCDL',
	    	name: '注册登陆',
	    	imageUrl: require('../img/1black.png'),
	    	count: '500积分',
	    	isComplete: queryScoreChannelStatusJSON.registerLogin
	    },
	    {
	    	code: 'BDDD',
	    	name: '绑定订单',
	    	imageUrl: require('../img/2.png'),
	    	count: '100积分',
	    	isComplete: queryScoreChannelStatusJSON.bindPolicy
	    },
	    {
	    	code: 'XBDD_01',
	    	name: '续保订单',
	    	imageUrl: require('../img/3.png'),
	    	count: '300积分',
	    	isComplete: queryScoreChannelStatusJSON.renewPolicy
	    },
	    {
	    	code: 'MRQD',
	    	name: '每日签到',
	    	imageUrl: require('../img/4.png'),
	    	count: '累积获奖',
	    	isComplete: queryScoreChannelStatusJSON.signature
	    },
	    {
	    	code: 'XBDD_02',
	    	name: '续保订单',
	    	imageUrl: require('../img/5.png'),
	    	count: '转盘抽大奖',
	    	isComplete: queryScoreChannelStatusJSON.scoreDraw
	    }
	];
	$scope.renderData = staticData;
	//绑定订单
	$scope.clickFn = function(code){
		if(code=='BDDD'){
			createDialog({
				id: 'bindOrder',
				template: '首次绑定个险送<span>XX</span>积分<br/>立即绑定?',
				success: {
					label: '是',
					fn: function(){
						console.log('success');
					}
				},
				cancel: {
					label: '否',
					fn: function(){
						console.log('cancel');
					}
				}
			});
		};
	};
}];
