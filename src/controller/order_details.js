module.exports = ['$scope', '$location', '$routeParams', 'form', 'baseDataService', 'createDialog', function($scope, $location, $routeParams, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '订单详情';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreOrder');
	};
	//页面初始化设置
	var orderCode = $routeParams.orderCode;
	//查看物流
	$scope.toLogisticsPath = function(code){
		$location.path('logistics/' + code);
	};
	//取消订单
	$scope.cancelOrder = function(code){
		createDialog({
			id: 'cancelOrder',
			template: '请确认是否取消该订单?',
			success: {
				label: '确认',
				fn: function(){
					var param = {
						orderCode: code
					};
					if(cancelOrderJSON.respCode=='00'){
						console.log('取消订单成功.');
						$location.path('scoreOrder');
					};
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
	//获取订单详情
	var _getOrderDetail = function(){
		var param = {
			orderCode: orderCode
		};
		queryOrderDetailJSON.imageUrl = getImage(queryOrderDetailJSON.imageUrl);
		$scope.renderData = queryOrderDetailJSON;
	};
	_getOrderDetail();
}];
