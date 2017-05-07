module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '收藏夹';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	form.loading.show = true;
	$scope.action = 'MB';
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	form.myCollection = form.myCollection || {};
	$scope.myCollectionType = 'default';
	$scope.isChosenAll = form.myCollection.isChosenAll || false;
	$scope.selectedCount = form.myCollection.selectedCount || 0;
	var _changePageStatus = function(){
		$scope.isChosenAll = true;
		if($scope.myCollectionType == 'edit'){
			//编辑状态
			$scope.selectedCount = 0;
			$scope.renderData.forEach(function(item){
				item.isChosen && ($scope.selectedCount = $scope.selectedCount + 1);
				!item.isChosen && ($scope.isChosenAll = false);
			});
		};
	};
	//切换页面状态
	$scope.changePageStatus = function(type){
		$scope.myCollectionType = type;
		$scope.isChosenAll = false;
		$scope.selectedCount = 0;
		$scope.renderData.forEach(function(item){
			item.isChosen = false;
		});
	};
	//切换商品选中状态
	$scope.changeChosen = function(one){
		one.isChosen = !one.isChosen;
		_changePageStatus();
	};
	//切换全选状态
	$scope.changeChosenAll = function(){
		$scope.isChosenAll = !$scope.isChosenAll;
		$scope.renderData.forEach(function(item){
			item.isChosen = $scope.isChosenAll;
		});
		_changePageStatus();
	};
	//删除收藏夹
	$scope.deleteProduct = function(){
		var hasChosenSome = false;
		var productCodes = [];
		$scope.renderData.forEach(function(item){
			if(item.isChosen){
				hasChosenSome = true;
				productCodes.push(item.productCode);
			};
		});
		if(!hasChosenSome){
			$scope.showAlert('请选择要删除的商品');
		}else{
			$scope.showConfirm('确定删除所选商品?',function(){
            	var param = {
        			productCodes: productCodes.join(';')
            	};
        		var promise = baseDataService.originalHttp(delCollect,param);
        		promise.then(function(data){
        			if(data.respCode=='00'){
        				$scope.showToast('删除成功',function(){
							$scope.renderData = $scope.renderData.filter(function(item){return productCodes.indexOf(item.productCode)==-1});
							$scope.selectedCount = 0;
        				});
        			};
        		});
			});
		};
	};
	//跳转到商品详情
	$scope.toDetailPath = function(one){
		$location.path('exchangeDetail/'+one.productCode);
	};
	//获取收藏夹列表
	var _getCollectList = function(){
		var param = {
			action: $scope.action,
			currentPage: ''+$scope.currentPage,
			pageSize: ''+$scope.pageSize
		};
		var promise = baseDataService.originalHttp(queryCollectList,param,{
			complete: function(){
				form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.forEach(function(item){
					item.isChosen = false;
					item.imageUrl = getImage(item.imageUrl);
				});
				$scope.renderData = data.respData;
			};
		});
	};
	_getCollectList();
}];
