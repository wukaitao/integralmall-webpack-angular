module.exports = ['$scope', '$location', 'form', 'baseDataService', function($scope, $location, form, baseDataService) {
	form.topBar.topBarTitle = '积分商城';
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	//返回
	$scope.form.leftBtnClick = function(){
		console.log('返回到原生app首页');
	};
}];
