module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '购物车';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('groupsExchange');
	};
	//页面初始配置
	form.fromPath = 'shoppingCart';
	form.shoppingCart = form.shoppingCart || {};
	$scope.shoppingCartType = 'choose';
	$scope.isChosenAll = form.shoppingCart.isChosenAll || false;
	$scope.totalScore = form.shoppingCart.totalScore || 0;
	$scope.selectedCount = form.shoppingCart.selectedCount || 0;
	var _changePageStatus = function(){
		$scope.isChosenAll = true;
		if($scope.shoppingCartType == 'choose'){
			//选择状态
			$scope.totalScore = 0;
			$scope.renderData.forEach(function(item){
				if(item.status!='1'){
					//未下架
					item.isChosen && ($scope.totalScore = $scope.totalScore + parseInt(item.scoreValue)*parseInt(item.num));
					!item.isChosen && ($scope.isChosenAll = false);
				};
			});
		}else if($scope.shoppingCartType == 'edit'){
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
		$scope.shoppingCartType = type;
		$scope.isChosenAll = false;
		$scope.totalScore = 0;
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
	//增加商品数量
	$scope.addCount = function(one){
		one.num = parseInt(one.num) + 1;
		_changePageStatus();
	};
	//减少商品数量
	$scope.delCount = function(one){
		if(parseInt(one.num)==1) return;
		one.num = parseInt(one.num) - 1;
		_changePageStatus();
	};
	//删除购物车
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
		            	if(delCartJSON.respCode=='00'){
		            		console.log('删除成功.');
		            		_getCartList();
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
	//去结算
	$scope.toPayPath = function(){
		var hasChosenSome = false;
		$scope.renderData.forEach(function(item){
			item.isChosen && (hasChosenSome = true);
		});
		if(!hasChosenSome){
			createDialog({
		        id: 'notChosenSome',
		        template: '请选择要兑换的商品.',
		        success: {
		            label: '确定',
		            fn: function(){
		            	console.log('success');
		            }
		        }
		    });
		}else{
			var selectedList =  $scope.renderData.filter(function(item){
				return item.isChosen;
			});
			form.shoppingCart = {
				isChosenAll: $scope.isChosenAll,
				totalScore: $scope.totalScore,
				selectedCount: $scope.selectedCount,
				selectedList: selectedList
			};
			form.queryCartListJSON = $scope.renderData;
			$location.path('fillOrder');
		};
	};
	//获取购物车列表
	var _getCartList = function(){
		queryCartListJSON.forEach(function(item){
			item.isChosen = false;
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData = form.queryCartListJSON || queryCartListJSON;
	};
	_getCartList();
}];
