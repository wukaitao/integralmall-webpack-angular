module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '兑换详情';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
    form.loading.show = true;
	$scope.action = 'MB';
	$scope.showDetail = true;
	var productCode = $routeParams.productCode;
	//增加商品数量
	$scope.addCount = function(){
		$scope.renderData.amount = $scope.renderData.amount + 1;
	};
	//减少商品数量
	$scope.delCount = function(){
		if($scope.renderData.amount==1) return;
		$scope.renderData.amount = $scope.renderData.amount - 1;
	};
	//添加收藏
	$scope.addFavorite = function(){
		if($scope.renderData.statusCode!='03'){
			$scope.showAlert('该商品已下架，不可收藏');
			return;
		};
		var param = {
			productCode: [productCode].join(';')
		};
		var promise = baseDataService.originalHttp(addCollect,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.collectStatus = '01';
			};
		});
	};
	//删除收藏
	$scope.delFavorite = function(){
		var param = {
			productCodes: [productCode].join(';')
		};
		var promise = baseDataService.originalHttp(delCollect,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.collectStatus = '00';
			};
		});
	};
	//加入购物车
	$scope.addToShoppingCart = function(){
		if($scope.renderData.statusCode!='03'){
			$scope.showAlert('该商品已下架，不可添加至购物车');
			return;
		};
		var param = {
			productCode: productCode,
			amount: ''+$scope.renderData.amount
		};
		var promise = baseDataService.originalHttp(addCart,param,{isDisabledRepeatedly: true});
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.cartAmount = parseInt($scope.renderData.cartAmount) + $scope.renderData.amount;
			};
		});
	};
	//立即兑换
	$scope.toFillOrderPath = function(){
		if($scope.renderData.statusCode!='03'){
			$scope.showAlert('该商品已下架，不可兑换');
			return;
		};
		var scoreValue = $scope.renderData.activityType=='01'||$scope.renderData.activityType=='02'?
						 $scope.renderData.activityScore:$scope.renderData.defaultScore;
		form.shoppingCart = {
			fromType: 'exchange',
			totalScore: scoreValue*$scope.renderData.amount,
			selectedList: [
	       		{
	    			productCode: $scope.renderData.productCode,
	    			productName: $scope.renderData.productName,
	    			defaultScore: $scope.renderData.defaultScore,
	    			activityScore: $scope.renderData.activityScore,
	    			imageUrl: $scope.renderData.imageUrlList[0].imageUrl,
	    			amount: $scope.renderData.amount,
	    			activityType: $scope.renderData.activityType
	    		}
	        ]
		};
		$location.path('fillOrder');
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
				$scope.renderData.amount = 1;
			};
		});
	};
	_getShopDetail();
}];
