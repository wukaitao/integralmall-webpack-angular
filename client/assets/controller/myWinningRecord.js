module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '我的中奖记录';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	$scope.action = 'MB';
	$scope.isNoData = false;
	$scope.renderData = [];
	$scope.droploader = {};
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	//跳转到领取页面
	$scope.toFillOrderPath = function(one){
		if(one.statusCode=='02') return;
		form.shoppingCart = {
			fromType: 'lottery',
			rewardId: one.id,
			totalScore: '',
			selectedList: [
	       		{
	    			productCode: one.productCode,
	    			productName: one.productName,
	    			defaultScore: '',
	    			activityScore: '',
	    			imageUrl: one.imageUrl,
	    			amount: '1',
	    			activityType: '01'
	    		}
	        ]
		};
		$location.path('fillOrder');
	};
	//获取我的中奖记录列表
	var _getMyWinningRecordList = function(callback){
		var callback = callback || function(){};
		var param = {
			action: $scope.action,
			currentPage: ''+$scope.currentPage++,
			pageSize: ''+$scope.pageSize
		};
		var promise = baseDataService.originalHttp(queryMyWinningRecordList,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				//暂无返回数据
				if((!data.respData.rewardList||!data.respData.rewardList.length) && $scope.currentPage==2){
					$timeout(function(){
						$('.dropload-down-nodata').show();
					},100);
				}else $('.dropload-down-nodata').hide();
				//所有加载完成
				if(!data.respData.rewardList || data.respData.rewardList.length<$scope.pageSize) $scope.isNoData=true;
				data.respData.rewardList.forEach(function(item){
					item.imageUrl = getImage(item.imageUrl);
				});
				//合并返回数据到已有数据
				if(!!data.respData.rewardList&&!!data.respData.rewardList.length){
					$scope.renderData = $scope.renderData.concat(data.respData.rewardList);
				};
				//回调函数
				callback.call(this);
			};
		});
	};
	//上拉刷新下拉加载更多
	droploadList({
		scope: $scope,
		timeout: $timeout,
		scroller: '.dropload-list',
		loadFn: _getMyWinningRecordList,
		beforeLoadUpFn: function(){
        	$scope.renderData = [];
        	$scope.currentPage = 1;
			$scope.isNoData = false;
		},
		beforeLoadDownFn: function(){
			//切换请求后重置插件
        	$scope.droploader = this;
		}
	});
}];
