module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '兑换中心';
	//form.leftBtnClick = function(){
	//};
	//初始页面配置
	form.searchKey = form.searchKey||'';
	form.category = form.category||'';
	form.sortType = form.sortType||'00';
	form.interval = form.interval||'00';
	$scope.action = 'MB';
	$scope.actionType = 'PRODUCTCATE';
	$scope.isNoData = false;
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	form.categoryName = '分类';
	$scope.renderData = {};
	$scope.renderData.shopList = [];
	$scope.droploader = {};
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
			var param = {
				actionType: $scope.actionType
			};
			var promise = baseDataService.originalHttp(queryCombox,param,{isDisabledRepeatedly: true});
			promise.then(function(data){
				if(data.respCode=='00'){
					data.respData.forEach(function(item){
						item.imageUrl = getImage(item.imageUrl);
						item.imageSelectedUrl = getImage(item.imageSelectedUrl);
					});
					$scope.renderData.classifical = data.respData;
				};
			});
		};
		if($scope.showClassification||$scope.showIntegralSpan) angular.element('body').css({overflow:'hidden'});
		else angular.element('body').css({overflow:'auto'});
	};
	//显示积分跨度
	$scope.showIntegralSpanFn = function(){
		$scope.showClassification = false;
		$scope.showIntegralSpan = !$scope.showIntegralSpan;
		if($scope.showClassification||$scope.showIntegralSpan) angular.element('body').css({overflow:'hidden'});
		else angular.element('body').css({overflow:'auto'});
	};
	$scope.renderData.integralSpan = [
        {
        	key: '00',
        	value: '不限'
        },
        {
        	key: '01',
        	value: '0~10000分'
        },
        {
        	key: '02',
        	value: '10000~15000分'
        },
        {
        	key: '03',
        	value: '15000~30000分'
        },
        {
        	key: '04',
        	value: '30000分以上'
        }
    ];
	//查询用户积分
	var _getUserScore = function(){
		var promise = baseDataService.originalHttp(queryUserScore);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.renderData.totalScore = data.respData;
			};
		});
	};
	_getUserScore();
	//筛选请求商品列表
	$scope.getList = function(fromType,one){
		if(fromType=='classifical'){
			if(one==''){
				//默认所有
				form.category = '';
				form.categoryName = '分类';
			}else{
				//分类
				form.category = one.dataValue;
				form.categoryName = one.dataText;
			};
		}else if(fromType=='integralSpan'){
			form.interval = one.key;
		}else if(fromType=='exchangeAmount'){
			form.sortType = form.sortType=='01'?'02':'01';
		}else if(fromType=='integral'){
			form.sortType = form.sortType=='03'?'04':'03';
		};
		angular.element('body').css({overflow:'auto'});
		$scope.showClassification = false;
		$scope.showIntegralSpan = false;
		$scope.isNoData = false;
		$scope.currentPage = 1;
		$scope.renderData.shopList = [];
		$scope.droploader.unlock();
		$scope.droploader.noData(false);
		_getExchangeList(function(){
			//锁定
			if($scope.isNoData){
				$scope.droploader.lock('down');
				$scope.droploader.noData();
			};
			//ng-repeat遍历完后重置
			$timeout(function(){
				$scope.droploader.resetload();
			},50);
    	});
	};
	//默认商品列表
	var _getExchangeList = function(callback){
		var callback = callback || function(){};
		var param = {
			action: $scope.action,
			searchKey: form.searchKey,
			category: form.category,
			sortType: form.sortType,
			interval: form.interval,
			currentPage: ''+$scope.currentPage++,
			pageSize: ''+$scope.pageSize
		};
		var promise = baseDataService.originalHttp(queryExchangeList,param,{isDisabledRepeatedly: true});
		promise.then(function(data){
			if(data.respCode=='00'){
				//暂无返回数据
				if((!data.respData||!data.respData.length) && $scope.currentPage==2){
					$timeout(function(){
						$('.dropload-down-nodata').show();
					},100);
				}else $('.dropload-down-nodata').hide();
				//所有加载完成
				if(!data.respData || data.respData.length<$scope.pageSize) $scope.isNoData=true;
				data.respData.forEach(function(item){
					item.imageUrl = getImage(item.imageUrl);
				});
				//合并返回数据到已有数据
				if(!!data.respData&&!!data.respData.length){
					$scope.renderData.shopList = $scope.renderData.shopList.concat(data.respData);
				};
				//回调函数
				callback.call(this);
			};
		});
	};
	//上拉刷新下拉加载更多
	droploadList({
		scope: $scope,
		timeout: $timeout,
		scroller: '.dropload-list',
		loadFn: _getExchangeList,
		beforeLoadUpFn: function(){
        	$scope.renderData.shopList = [];
        	$scope.currentPage = 1;
			$scope.isNoData = false;
		},
		beforeLoadDownFn: function(){
			//切换请求后重置插件
        	$scope.droploader = this;
    	}
	});
}];
