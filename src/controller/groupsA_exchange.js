module.exports = ['$scope', '$location', 'form', 'baseDataService', 'createDialog', function($scope, $location, form, baseDataService, createDialog) {
	form.topBar.topBarTitle = '兑换中心';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
	//初始页面配置
	form.searchKey = form.searchKey||'';
	form.category = form.category||'';
	form.sortType = form.sortType||'0';
	form.interval = form.interval||'0';
	$scope.currentPage = '1';
	$scope.pageSize = '20';
	form.categoryName = '分类';
	$scope.renderData = {};
	//购物车/收货地址/我的收藏菜单显示状态
	$scope.showMoreMenu = false;
	//筛选
	$scope.showClassification = false;
	$scope.showIntegralSpan = false;
	//显示分类
	$scope.showClassificationFn = function(){
		$scope.showIntegralSpan = false;
		$scope.showClassification = !$scope.showClassification;
		if($scope.showClassification&&!$scope.renderData.classifical){
			//显示分类
			queryComboxJSON.dataList.forEach(function(item){
				item.imageUrl = getImage(item.imageUrl);
			});
			$scope.renderData.classifical = queryComboxJSON.dataList;
		};
	};
	//显示积分跨度
	$scope.showIntegralSpanFn = function(){
		$scope.showClassification = false;
		$scope.showIntegralSpan = !$scope.showIntegralSpan;
	};
	$scope.renderData.integralSpan = [
        {
        	key: '1',
        	value: '0~10000分'
        },
        {
        	key: '2',
        	value: '10000~15000分'
        },
        {
        	key: '3',
        	value: '15000~30000分'
        },
        {
        	key: '4',
        	value: '30000分以上'
        }
    ];
	//筛选请求商品列表
	$scope.getList = function(fromType,one){
		if(fromType=='classifical'){
			form.category = one.dataValue;
			form.categoryName = one.dataText;
		}else if(fromType=='integralSpan'){
			form.interval = one.key;
		}else if(fromType=='exchangeAmount'){
			form.sortType = form.sortType=='1'?'2':'1';
		}else if(fromType=='integral'){
			form.sortType = form.sortType=='3'?'4':'3';
		};
		$scope.showClassification = false;
		$scope.showIntegralSpan = false;
		_getShopList();
	};
	//瀑布流实现商品列表分页加载
	//此处为待开发代码
	//默认商品列表
	var _getShopList = function(){
		var param = {
			searchKey: form.searchKey,
			category: form.category,
			sortType: form.sortType,
			interval: form.interval,
			currentPage: $scope.currentPage,
			pageSize: $scope.pageSize
		};
		queryShopListJSON.forEach(function(item){
			item.imageUrl = getImage(item.imageUrl);
		});
		$scope.renderData.shopList = queryShopListJSON;
		/*
		var promise = baseDataService.originalHttp('../json/queryShopList.json',param,{method: 'get'});
		promise.then(function(data){
			console.log(data);
		},function(err){
			console.log(err);
		});
		*/
	};
	_getShopList();
}];
