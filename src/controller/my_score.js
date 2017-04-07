module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '我的积分';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	form.leftBtnClick = function(){
		$location.path('scoreMarket');
	};
}];
