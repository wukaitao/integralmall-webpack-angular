module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '抽奖详情';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	form.loading.show = true
	$scope.showDetail = true;
	$scope.showRule = true;
	$scope.showProgressBar = false;
	$scope.action = 'MB';
	var productCode = $routeParams.productCode;
	//立即抽奖
	$scope.showDraw = function(){
		var param = {
			productCode: productCode,
			action: $scope.action
		};
		$scope.showProgressBar = true;
		var promise = baseDataService.originalHttp(doDraw,param,{
			complete: function(){
				$scope.showProgressBar = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				if(data.respData=='00'){
					//未中奖
					$scope.showAlert('很遗憾，您没有中奖');
				}else if(data.respData=='01'){
					//中奖
					$scope.showAlert('恭喜您获得'+$scope.renderData.productName+'，请在我的订单中查看物流信息');
				};
			}else if(['03','04','05','06','07'].indexOf(data.respCode)!=-1){
				//操作频繁/领取受限
				$scope.showAlert(data.respDesc);
			};
		});
	};
	//获取商品详情
	var _getShopDetail = function(){
		var param = {
			productCode: productCode,
			action: $scope.action
		};
		var promise = baseDataService.originalHttp(queryShopDetail,param,{complete:function(){
	        form.loading.show = false;
		}});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.imageUrlList.forEach(function(item){
					item.imageUrl = getImage(item.imageUrl);
				});
				$scope.renderData = data.respData;
			};
		});
	};
	_getShopDetail();
}];
