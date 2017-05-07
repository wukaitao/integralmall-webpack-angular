module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '积分订单';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	$scope.isNoData = false;
	$scope.renderData = [];
	$scope.droploader = {};
	$scope.action = '00';
	$scope.platform = 'MB';
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	//确认收货
	$scope.confirmReceipt = function(one){
		var param = {
			orderCode: one.orderCode 
		};
		var promise = baseDataService.originalHttp(confirmReceipt,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				one.statusCode = '05';
				one.statusDesc = '已收货';
			};
		});
	};
	//跳转到订单详情
	$scope.toOrderDetailPath = function(one){
		$location.path('orderDetail/' + one.orderCode);
	};
	//切换分类
	$scope.changeType = function(type){
		$scope.action = type;
    	$scope.renderData = [];
        $scope.currentPage = 1;
		$scope.isNoData = false;
		$scope.droploader.unlock();
		$scope.droploader.noData(false);
		_getOrderList(function(){
			//锁定
			if($scope.isNoData){
				$scope.droploader.lock('down');
				$scope.droploader.noData();
			};
			//ng-repeat遍历完后重置
			$timeout(function(){
				$scope.droploader.resetload();
			},50);
    	});
	};
	//获取订单列表
	var _getOrderList = function(callback){
		var callback = callback || function(){};
		var param = {
			platform: $scope.platform,
			action: $scope.action,
			currentPage: ''+$scope.currentPage++,
			pageSize: ''+$scope.pageSize
		};
		var promise = baseDataService.originalHttp(queryOrderList,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				//暂无返回数据
				if((!data.respData||!data.respData.length) && $scope.currentPage==2){
					$timeout(function(){
						$('.dropload-down-nodata').show();
					},100);
				}else $('.dropload-down-nodata').hide();
				//所有加载完成
				if(!data.respData || data.respData.length<$scope.pageSize) $scope.isNoData=true;
				data.respData.forEach(function(item){
					item.imageUrl = getImage(item.imageUrl);
				});
				//合并返回数据到已有数据
				if(!!data.respData&&!!data.respData.length){
					$scope.renderData = $scope.renderData.concat(data.respData);
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
		loadFn: _getOrderList,
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
