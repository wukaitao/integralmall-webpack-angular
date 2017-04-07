module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '积分订单';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
	//页面初始化配置
	$scope.action = '00';
	$scope.currentPage = '1';
	$scope.pageSize = '20';
	//确认收货
	$scope.confirmReceipt = function(one){
		var orderCode = one.orderCode;
		if(confirmReceiptJSON.respCode=='00'){
			console.log('确认收货.');
			one.statusCode = '04';
			one.statusDesc = '已收货';
		};
	};
	//跳转到订单详情
	$scope.toOrderDetailPath = function(one){
		$location.path('orderDetails/' + one.orderCode);
	};
	//切换分类
	$scope.changeType = function(type){
		$scope.currentPage = '1';
		$scope.pageSize = '20';
		$scope.action = type;
		_getOrderList();
	};
	//获取订单列表
	var _getOrderList = function(){
		var param = {
			action: $scope.action,
			currentPage: $scope.currentPage,
			pageSize: $scope.pageSize
		};
		queryOrderListJSON.orderList.forEach(function(item){
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData = queryOrderListJSON.orderList;
	};
	_getOrderList();
	//瀑布流加载分页列表
	//待完善
}];
