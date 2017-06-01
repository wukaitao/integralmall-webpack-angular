module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	form.topBar.topBarTitle = '积分商城';
	form.leftBtnClick = function(){
		//console.log('返回到原生app首页');
    	window.location.href=origin+'/mb-service/index.xhtml';
	};
	//页面初始化配置
    form.loading.show = true;
	$scope.action = 'MB';
	//广告跳转
	$scope.goBannerPath = function(one){
		if(one.isInside=='00'){
			//外链
			window.location.href = one.linkUrl;
		}else if(one.isInside=='01'){
			//内链
			$location.path(one.linkUrl);
		};
	};
	//获取首页和我的积分页面初始化数据
	var _getAdvertisementList = function(){
		var param = {
			action: $scope.action
		};
		var promise = baseDataService.originalHttp(queryAdvertisementList,param,{
			complete: function(){
			    form.loading.show = false;
			}
		});
		promise.then(function(data){
			if(data.respCode=='00'){
				data.respData.bannerList.forEach(function(item){
					item.imageUrl = getImage(item.imageUrl);
				});
				$scope.renderData = {
					//总积分
					totalScore: data.respData.totalScore,
					//幻灯片广告
					bannerListA001: data.respData.bannerList.filter(function(item){return item.advertType=='A001'}),
					//积分抽奖广告
					bannerListA002: data.respData.bannerList.filter(function(item){return item.advertType=='A002'}),
					//热门推荐广告
					bannerListA003: data.respData.bannerList.filter(function(item){return item.advertType=='A003'}),
					//天天赚积分广告
					bannerListA004: data.respData.bannerList.filter(function(item){return item.advertType=='A004'}),
					//猜你喜欢广告
					bannerListA005: data.respData.bannerList.filter(function(item){return item.advertType=='A005'}),
					//特惠专区广告
					bannerListA006: data.respData.bannerList.filter(function(item){return item.advertType=='A006'})
				};
			};
		});
	};
	_getAdvertisementList();
}];
