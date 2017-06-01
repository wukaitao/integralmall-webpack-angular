module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '搜索';
	//form.leftBtnClick = function(){
	//};
	//初始页面配置
	$scope.searchHistory = [];
	angular.element('input').focus();
	//获取搜索历史
	var _getSearchHistory = function(){
		var history = localStorage.getItem('searchHistory');
		$scope.searchHistory = history ? JSON.parse(Base64.decode(history)) : [];
	};
	_getSearchHistory();
	//清除搜索历史
	$scope.removeHistory = function(){
		localStorage.removeItem('searchHistory');
		_getSearchHistory();
	};
	//使用搜索历史
	$scope.goListPath = function(one){
		form.searchKey = one.keyword;
		//储存搜索历史
		if(!form.searchKey) return;
		var filterOne = $scope.searchHistory.filter(function(item){
			return item.keyword==form.searchKey;
		});
		if(filterOne.length){
			filterOne[0].count = parseInt(filterOne[0].count) + 1;
			filterOne[0].time = new Date().getTime();
		}else{
			$scope.searchHistory.push({
				keyword: form.searchKey,
				count: 1,
				time: new Date().getTime()
			});
		};
		localStorage.setItem('searchHistory',Base64.encode(JSON.stringify($scope.searchHistory)));
		$location.path('/exchangeCenter');
	};
	//取消
	$scope.cancel = function(){
		form.searchKey = '';
		$location.path('/exchangeCenter');
	};
	//搜索
	$scope.search = function(){
		//储存搜索历史
		if(!form.searchKey) return;
		var filterOne = $scope.searchHistory.filter(function(item){
			return item.keyword==form.searchKey;
		});
		if(filterOne.length){
			filterOne[0].count = parseInt(filterOne[0].count) + 1;
			filterOne[0].time = new Date().getTime();
		}else{
			$scope.searchHistory.push({
				keyword: form.searchKey,
				count: 1,
				time: new Date().getTime()
			});
		};
		localStorage.setItem('searchHistory',Base64.encode(JSON.stringify($scope.searchHistory)));
		$location.path('/exchangeCenter');
	};
}];
