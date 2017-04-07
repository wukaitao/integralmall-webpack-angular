module.exports = ['$scope', 'form', 'baseDataService', function($scope, form, baseDataService) {
	form.topBar.showTopBar = false;
	//初始页面配置
	angular.element('input').focus();
}];
