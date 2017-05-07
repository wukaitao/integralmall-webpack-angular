module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '购物车';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
	form.fromPath = 'shoppingCart';
	form.shoppingCart = form.shoppingCart || {};
	$scope.action = 'MB';
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.shoppingCartType = 'choose';
	$scope.isChosenAll = form.shoppingCart.isChosenAll || false;
	$scope.totalScore = form.shoppingCart.totalScore || 0;
	$scope.selectedCount = form.shoppingCart.selectedCount || 0;
	$scope.chooseList = [];
	var _changePageStatus = function(){
		$scope.isChosenAll = true;
		if($scope.shoppingCartType == 'choose'){
			//选择状态
			$scope.totalScore = 0;
			$scope.renderData.forEach(function(item){
				if(item.statusCode=='03'){
					//未下架
					var scoreValue = item.activityType=='01'||item.activityType=='02'?item.activityScore:item.defaultScore;
					item.isChosen && ($scope.totalScore = $scope.totalScore + parseInt(scoreValue)*parseInt(item.amount));
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
		$scope.totalScore = 0;
		$scope.selectedCount = 0;
		if(type=='choose'){
			$scope.isChosenAll = true;
			$scope.renderData.forEach(function(item){
				item.isChosen = true;
			});
			_changePageStatus();
		}else{
			$scope.isChosenAll = false;
			$scope.renderData.forEach(function(item){
				item.isChosen = false;
			});
		};
	};
	//切换商品选中状态
	$scope.changeChosen = function(one){
		one.isChosen = !one.isChosen;
		_changePageStatus();
	};
	//切换全选状态
	$scope.changeChosenAll = function(){
		if(!$scope.isChosenAll){
			//保存全选前选中列表
			$scope.chooseList = [];
			$scope.renderData.forEach(function(item){
				item.isChosen && ($scope.chooseList.push(item.productCode));
				item.isChosen = true;
			});
		}else{
			//复原全选前选中列表
			$scope.renderData.forEach(function(item){
				if($scope.chooseList.indexOf(item.productCode)!=-1){
					item.isChosen = true;
				}else{
					item.isChosen = false;
				};
			});
		};
		_changePageStatus();
	};
	//增加商品数量
	$scope.addCount = function(one){
		one.amount = parseInt(one.amount) + 1;
		_changePageStatus();
	};
	//减少商品数量
	$scope.delCount = function(one){
		if(parseInt(one.amount)==1) return;
		one.amount = parseInt(one.amount) - 1;
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
			$scope.showAlert('请选择要删除的商品');
		}else{
			$scope.showConfirm('确定删除所选商品?',function(){
            	var param = {
        			productCodes: productCodes.join(';')
            	};
        		var promise = baseDataService.originalHttp(delCart,param);
        		promise.then(function(data){
        			if(data.respCode=='00'){
    					$scope.showToast('删除成功',function(){
    						$scope.selectedCount = 0;
    						$scope.renderData = $scope.renderData.filter(function(item){
    							return productCodes.indexOf(item.productCode)==-1;
    						});
    					});
        			};
        		});
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
			$scope.showAlert('请选择要兑换的商品.');
		}else{
			var selectedList =  $scope.renderData.filter(function(item){
				return item.statusCode=='03'&&item.isChosen;
			});
			form.shoppingCart = {
				fromType: 'shoppingCart',
				totalScore: $scope.totalScore,
				selectedList: selectedList
			};
			form.queryCartListJSON = $scope.renderData;
			$location.path('fillOrder');
		};
	};
	//获取购物车列表
	var _getCartList = function(){
		var param = {
			action: $scope.action,
			currentPage: ''+$scope.currentPage++,
			pageSize: ''+$scope.pageSize
		};
		var promise = baseDataService.originalHttp(queryCartList,param,{isDisabledRepeatedly: true});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.forEach(function(item){
					item.statusCode=='03' && (item.isChosen=true);
					item.imageUrl = getImage(item.imageUrl);
				});
				$scope.renderData = data.respData;
				_changePageStatus();
			};
		});
	};
	_getCartList();
	//此页面如要分页加载,则在编辑状态禁止加载分页
}];
