module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '物流信息';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	var orderCode = $routeParams.orderCode;
	//获取物流信息
	var _getLogistics = function(){
		var param = {
			orderCode: orderCode
		};
		var promise = baseDataService.originalHttp(queryLogistics,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData = data.respData;
			};
		});
	};
	_getLogistics();
}];
