module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '积分抽奖';
	//form.leftBtnClick = function(){
	//};
	//页面初始配置
    form.loading.show = true;
	$scope.isNoData = false;
	$scope.renderData = [];
	$scope.droploader = {};
	$scope.action = 'MB';
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.showWinningRecord = false;
	$scope.myTotalCount = 0;
	//展示往期中奖
	$scope.showWinningRecordList = function(){
		$scope.showWinningRecord = true;
		//查询中奖用户列表
		if(!$scope.renderDataReward){
			var promise = baseDataService.originalHttp(queryWinningRecordList);
			promise.then(function(data){
				console.log(data);
				if(data.respCode=='00'){
					$scope.renderDataReward = data.respData;
					$timeout(function(){
						_scrollText();
					});
				};
			});
		};
	};
	//名单滚动
	var _scrollText = function(){
		var speed = 50;
		var recordList = document.getElementById('recordList');
		var recordListOne = document.getElementById('recordListOne');
		var recordListTwo = document.getElementById('recordListTwo');
		recordListTwo.innerHTML = recordListOne.innerHTML;
		function Marquee(){
			if(recordListTwo.offsetTop - recordList.scrollTop <= 0){
				recordList.scrollTop -= recordListOne.offsetHeight;
			}else{
				recordList.scrollTop++;
			};
		};
		var MyMar = setInterval(Marquee,speed);
		recordList.onmouseover = function(){clearInterval(MyMar)};
		recordList.onmouseout = function(){MyMar = setInterval(Marquee,speed)};
	};
	//跳转到积分抽奖商品详情页
	$scope.toScoreLotteryDetail = function(one){
		$location.path('integralDrawDetail/' + one.productCode);
	};
	//跳转到我的中奖记录页面
	$scope.toMyWinnerRecordPath = function(){
		$location.path('myWinningRecord');
	};
	//获取我的中奖记录总数
	var _getMyWinningRecordList = function(){
		var param = {
			action: $scope.action,
			currentPage: '1',
			pageSize: '10'
		};
		var promise = baseDataService.originalHttp(queryMyWinningRecordList,param,{
			complete: function(){
				form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.myTotalCount = data.respData.totalCount;
			};
		});
	};
	$timeout(function(){
		_getMyWinningRecordList();
	},200);
	//获取抽奖列表
	var _getDrawList = function(callback){
		var callback = callback || function(){};
		var param = {
			action: $scope.action,
			currentPage: ''+$scope.currentPage,
			pageSize: ''+$scope.pageSize++
		};
		var promise = baseDataService.originalHttp(queryDrawList,param);
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
					$scope.renderData = $scope.renderData.concat(data.respData);
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
		loadFn: _getDrawList,
		beforeLoadUpFn: function(){
        	$scope.renderData = [];
        	$scope.currentPage = 1;
			$scope.isNoData = false;
		},
		beforeLoadDownFn: function(){
			//切换请求后重置插件
        	$scope.droploader = this;
        }
	});
}];
