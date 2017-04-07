module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '我的中奖记录';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreLotteryList');
	};
	//页面初始化配置
	$scope.isNoData = false;
	$scope.currentPage = '1';
	$scope.pageSize = '10';
	//跳转到领取页面
	$scope.toFillOrderPath = function(one){
		//$location.path('fillOrder/' + one.rewardId);
		console.log('这里是否应该跳转到到填写订单页');
		var param = {
			rewardId: one.rewardId,
			addressId: '01'
		};
		if(getRewardJSON.respCode=='00'){
			console.log('领取成功.');
			one.status = '1';
		};
	};
	//获取我的中奖记录列表
	var _getMyRewardList = function(){
		var param  = {
			currentPage: $scope.currentPage,
			pageSize: $scope.pageSize
		};
		queryMyRewardListJSON.forEach(function(item){
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData = queryMyRewardListJSON;
	};
	_getMyRewardList();
	//上拉刷新下拉加载更多
	/*
    var refreshingHintDom = '<div style="text-align: center;padding: 0 15px 15px;"><img style="width: 40%;" src="images/jog/img-loading.png"></div>';
    var loadingHintDom = '<div style="text-align: center;padding: 15px;"><img style="width: 40%;" src="images/jog/img-loading.png"></div>';
    var noDataHintDom = '<div class="dropload-down-nodata" style="text-align: center;padding: 15px;display: none;">暂时没有数据</div>';
    $('.joggers-top-list').dropload({
        scrollArea: window,
        autoLoad: true,
        domUp: {
            domClass: 'dropload-up',
            domRefresh: refreshingHintDom,
            domUpdate: refreshingHintDom,
            domLoad: refreshingHintDom
        },
        domDown: {
            domClass: 'dropload-down',
            domRefresh: loadingHintDom,
            domLoad: loadingHintDom,
            domNoData: noDataHintDom
        },
        loadUpFn: function (me) {
        	flag = false;
        	$scope.rankData = {};
        	$scope.dataList = [];
			$scope.pageNo = 1;
			$scope.isNoData = false;
			me.unlock();
			me.noData(false);
			_getMemberRankFn(function(){
				//锁定
				if($scope.isNoData){
					me.lock('down');
					me.noData();
				};
				me.direction = 'down';//修复插件BUG
				//ng-repeat遍历完后重置
				$timeout(function(){
					me.resetload();
				},50);
			});
        },
        loadDownFn: function (me) {
        	$scope.droploader = me;
        	_getMemberRankFn(function(){
				//锁定
				if($scope.isNoData){
					me.lock('down');
					me.noData();
				};
				//ng-repeat遍历完后重置
				$timeout(function(){
					me.resetload();
				},50);
			});
        }
    });
    */
}];
