module.exports = ['$scope', '$location', '$routeParams', 'form', 'baseDataService', function($scope, $location, $routeParams, form, baseDataService) {
	form.topBar.topBarTitle = '物流信息';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	//页面初始化配置
	var orderCode = $routeParams.orderCode;
	form.leftBtnClick = function(){
		$location.path('orderDetails/' + orderCode);
	};
	//获取物流信息
	var _getLogistics = function(){
		var param = {
			orderCode: orderCode
		};
		queryLogisticsJSON.imageUrl = getImage(queryLogisticsJSON.imageUrl);
		$scope.renderData = queryLogisticsJSON;
	};
	_getLogistics();
}];
