module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '订单详情';
	//form.leftBtnClick = function(){
	//};
	//页面初始设置
	form.loading.show = true;
	$scope.requestCompleteCount = 0;
	$scope.platform = 'MB';
	$scope.renderData = {};
	var orderCode = $routeParams.orderCode;
	//查看物流
	$scope.toLogisticsPath = function(code){
		$location.path('logistics/' + code);
	};
	//取消订单
	$scope.cancelOrder = function(code){
		$scope.showConfirm('请确认是否取消该订单?',function(){
			var param = {
				orderCode: code
			};
			var promise = baseDataService.originalHttp(cancelOrder,param);
			promise.then(function(data){
				if(data.respCode=='00'){
					$scope.showToast('取消订单成功.',function(){
						$location.path('integralOrder');
					});
				};
			});
		});
	};
	//获取订单详情
	var _getOrderDetail = function(){
		var param = {
			orderCode: orderCode,
			platform: $scope.platform
		};
		var promise = baseDataService.originalHttp(queryOrderDetail,param,{
			complete: function(){
				$scope.requestCompleteCount = $scope.requestCompleteCount+1;
				if($scope.requestCompleteCount==2) form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.imageUrl = getImage(data.respData.imageUrl);
				$scope.renderData.detail = data.respData;
			};
		});
	};
	_getOrderDetail();
	//获取物流信息
	var _getLogistics = function(){
		var param = {
			orderCode: orderCode
		};
		var promise = baseDataService.originalHttp(queryLogistics,param,{
			complete: function(){
				$scope.requestCompleteCount = $scope.requestCompleteCount+1;
				if($scope.requestCompleteCount==2) form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.logistics = data.respData;
			};
		});
	};
	$timeout(function(){
		_getLogistics();
	},200);
}];
