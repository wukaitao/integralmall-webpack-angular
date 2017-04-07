module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '积分抽奖';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
	//页面初始化配置
	$scope.activityId = '01';
	$scope.currentPage = '1';
	$scope.pageSize = '20';
	$scope.showLottery = false;
	$scope.type = '0';
	//展示往期中奖
	$scope.showLotteryHistory = function(){
		$scope.showLottery = true;
		//查询中奖用户列表
		var param = {
			type: $scope.type
		};
		$scope.renderDataReward = queryRewardListJSON;
	};
	//跳转到积分抽奖商品详情页
	$scope.toScoreLotteryDetail = function(one){
		$location.path('scoreLotteryDetail/' + one.productCode);
	};
	//跳转到我的中奖记录页面
	$scope.toMyWinnerRecordPath = function(){
		$location.path('myWinnerRecord');
	};
	//获取抽奖列表
	var _getLotteryList = function(){
		var param = {
			activityId: $scope.activityId,
			currentPage: $scope.currentPage,
			pageSize: $scope.pageSize
		};
		queryLotteryListJSON.forEach(function(item){
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData = queryLotteryListJSON;
	};
	_getLotteryList();
}];
