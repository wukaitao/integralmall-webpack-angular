module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '积分明细';
	//form.leftBtnClick = function(){
	//};
	//页面初始化配置
	form.loading.show = true;
	//展示月份积分明细
	$scope.showMonthDetail = function(one){
		one.show = !one.show;
		if(!one.monthDetailList){
			var param = {
				scoreMonth: one.month
			};
			var promise = baseDataService.originalHttp(queryScoreMonthDetail,param);
			promise.then(function(data){
				if(data.respCode=='00'){
					one.monthDetailList = data.respData;
				};
			});
		}; 
	};
	//获取积分明细月份数据
	var _getScoreStatisticsMonth = function(){
		var promise = baseDataService.originalHttp(queryScoreStatisticsMonth,null,{
			complete: function(){
				form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.scoreMonthList = [];
				data.respData.scoreMonth.forEach(function(item){
					data.respData.scoreMonthList.push({
						show: false,
						month: item.month
					});
				});
				$scope.renderData = data.respData;
				//默认显示首月积分明细
				$scope.showMonthDetail($scope.renderData.scoreMonthList[0]);
			};
		});
	};
	_getScoreStatisticsMonth();
}];
