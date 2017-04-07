module.exports = ['$scope','$location', '$routeParams', 'form', 'baseDataService', 'createDialog', function($scope, $location, $routeParams, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '兑奖中心';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('groupsExchange');
	};
	//页面初始配置
	$scope.showDetail = true;
	var productCode = $routeParams.productCode;
	var action = 'MB';
	//添加收藏
	$scope.addFavorite = function(){
		var param = {
			productCodes: [productCode].join(';')
		};
		if(addFavoriteJSON.respCode=='00'){
			$scope.renderData.favorite = '1';
		};
	};
	//删除收藏
	$scope.delFavorite = function(){
		var param = {
			productCodes: [productCode].join(';')
		};
		if(delFavoriteJSON.respCode=='00'){
			$scope.renderData.favorite = '0';
		};
	};
	//加入购物车
	$scope.addToShoppingCart = function(){
		if($scope.renderData.isInShoppingCart=='1'){
			createDialog({
				id: 'addToShoppingCart',
				template: '该商品已在您的购物车中<br/>是否替换?',
				success: {
					label: '是',
					fn: function(){
						console.log('success');
						console.log('对购物车进行替换工作.');
					}
				},
				cancel: {
					label: '否',
					fn: function(){
						console.log('cancel');
					}
				}
			});
		}else if($scope.renderData.isInShoppingCart=='0'){
			var param = {
				productCode: [productCode].join(';')
			};
			if(addCartJSON.respCode=='00'){
				$scope.renderData.shoppingCartNumber = parseInt($scope.renderData.shoppingCartNumber) + 1;
				$scope.renderData.isInShoppingCart = '1';
			};
		};
	};
	//立即兑换
	$scope.toFillOrderPath = function(){
		form.shoppingCart = {
			totalScore: $scope.renderData.scoreValue*$scope.renderData.number,
			selectedList: [
	       		{
	    			productCode: $scope.renderData.productCode,
	    			productName: $scope.renderData.productName,
	    			scoreValue: $scope.renderData.scoreValue,
	    			imageUrl: $scope.renderData.imageUrl[0].url,
	    			num: $scope.renderData.number,
	    			type: $scope.renderData.type//,
	    			//status: $scope.renderData.status
	    		}
	        ]
		};
		$location.path('fillOrder');
	};
	//获取商品详情
	var _getShopDetail = function(){
		var param = {
			productCode: productCode,
			action: action
		};
		queryShopInfoJSON.imageUrl.forEach(function(item){
			item.url = getImage(item.url);
		});
		$scope.renderData = queryShopInfoJSON;
	};
	_getShopDetail();
}];
