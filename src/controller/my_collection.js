module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '收藏夹';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('groupsExchange');
	};
	//页面初始配置
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
			createDialog({
		        id: 'notChosenSome',
		        template: '请选择要删除的商品.',
		        success: {
		            label: '确定',
		            fn: function(){
		            	console.log('success');
		            }
		        }
		    });
		}else{
			createDialog({
		        id: 'deleteProduct',
		        template: '确定删除所选商品?',
		        success: {
		            label: '确定',
		            fn: function(){
		            	var param = {
	            			productCodes: productCodes.join(';')
		            	};
		            	if(delFavoriteJSON.respCode=='00'){
		            		//console.log('删除成功.');
		            		$scope.isChosenAll = false;
		            		$scope.selectedCount = 0;
		            		$scope.renderData = $scope.renderData.filter(function(item){
		            			return productCodes.indexOf(item.productCode)==-1;
		            		});
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
	};
	//获取收藏夹列表
	var _getFavoriteList = function(){
		queryFavoriteListJSON.forEach(function(item){
			item.isChosen = false;
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData = form.queryFavoriteListJSON || queryFavoriteListJSON;
	};
	_getFavoriteList();
}];
