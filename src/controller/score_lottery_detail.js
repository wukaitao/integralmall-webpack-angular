module.exports = ['$scope', '$location', '$routeParams', 'form', 'baseDataService', 'createDialog', function($scope, $location, $routeParams, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '积分抽奖';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreLotteryList');
	};
	//页面初始化配置
	$scope.showDetail = true;
	var productCode = $routeParams.productCode;
	var action = 'MB';
	//立即抽奖
	$scope.showLottery = function(){
		console.log('这里显示抽奖Flash...');
		var param = {
			productCode: productCode
		};
		if(doLotteryJSON=='0'){
			//未中奖
			createDialog({
				id: 'doLottery',
				template: '太可惜啦!你与200亿元大奖失之交臂.',
				success: {
					label: '确定',
					fn: function(){
						console.log('success');
					}
				},
				cancel: {
					label: '取消',
					fn: function(){
						console.log('cancel');
					}
				}
			});
		}else if(doLotteryJSON=='1'){
			//中奖
			createDialog({
				id: 'doLottery',
				template: '恭喜你!中奖了!',
				success: {
					label: '确定',
					fn: function(){
						console.log('success');
						$location.path('myWinnerRecord');
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
	};
	//获取商品详情
	var _getShopDetail = function(){
		var param = {
			productCode: productCode,
			action: action
		};
		queryShopInfoJSON.imageUrl.forEach(function(item){
			item.url = getImage(item.url);
		});
		$scope.renderData = queryShopInfoJSON;
	};
	_getShopDetail();
}];
