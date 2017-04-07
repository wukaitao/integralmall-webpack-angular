module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '积分明细';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('myScore');
	};
	//模拟渲染数据
	$scope.renderData = queryScoreStatisticsMonthJSON;
	//展示月份积分明细
	$scope.showMonthDetail = function(one){
		one.show = !one.show;
		if(!one.monthDetailList){
			one.monthDetailList = queryScoreMonthDetailJSON.monthDetailList;
		}; 
	};
}];
