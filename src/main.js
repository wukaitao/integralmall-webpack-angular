var angular = require('angular');
require('angular-route');

require('./style/test.css');
require('./style/groupsA_exchange.css');
require('./style/groupsA_exchange_item.css');
require('./style/groupsA_problems.css');
require('./style/groupsA_To_earn_points.css');
require('./style/addressEdit.css');
require('./style/addressManager.css');
require('./style/my_collection.css');
require('./style/my_lottery_list.css');
require('./style/my_score.css');
require('./style/orderEdit.css');
require('./style/score_detail.css');
require('./style/score_ecard.css');
require('./style/score_lottery_detail.css');
require('./style/score_market.css');
require('./style/score_order.css');
require('./style/score_rule.css');
require('./style/shoppingCart.css');
require('./style/my_winner_record.css');
require('./style/search.css');
require('./style/logistics.css');
require('./style/fill_order.css');
require('./style/order_details.css');
require('./style/common.css');
require('./js/common.js');
require('./js/refreshFS.js');
require('./js/dropload.js');

require('./js/mobiscroll/css/mobiscroll.frame.css');
require('./js/mobiscroll/css/mobiscroll.frame.ios.css');
require('./js/mobiscroll/css/mobiscroll.scroller.css');
require('./js/mobiscroll/css/mobiscroll.scroller.android.css');
require('./js/mobiscroll/css/mobiscroll.scroller.ios.css');
require('./js/mobiscroll/css/mobiscroll.frame.css');
require('./js/mobiscroll/mobiscroll.core.js');
require('./js/mobiscroll/mobiscroll.frame.js');
require('./js/mobiscroll/mobiscroll.scroller.js');
require('./js/mobiscroll/mobiscroll.util.datetime.js');
require('./js/mobiscroll/mobiscroll.datetimebase.js');
require('./js/mobiscroll/mobiscroll.datetime.js');
require('./js/mobiscroll/mobiscroll.select.js');
require('./js/mobiscroll/mobiscroll.listbase.js');
require('./js/mobiscroll/mobiscroll.treelist.js');
require('./js/mobiscroll/mobiscroll.frame.ios.js');
require('./js/mobiscroll/i18n/mobiscroll.i18n.zh.js');


//模拟请求数据
initPageDataJSON = require('./json/initPageData.json').respData;
queryScoreStatisticsMonthJSON = require('./json/queryScoreStatisticsMonth.json').respData;
queryScoreMonthDetailJSON = require('./json/queryScoreMonthDetail.json').respData;
queryComboxJSON = require('./json/queryCombox.json').respData;
unnodeJSON = require('./json/unnode.json');
queryOrderListJSON = require('./json/queryOrderList.json').respData;
queryOrderDetailJSON = require('./json/queryOrderDetail.json').respData;
confirmReceiptJSON = require('./json/confirmReceipt.json');
cancelOrderJSON = require('./json/cancelOrder.json');
queryLogisticsJSON = require('./json/queryLogistics.json').respData;
queryScoreChannelStatusJSON = require('./json/queryScoreChannelStatus.json').respData;
queryFavoriteListJSON = require('./json/queryFavoriteList.json').respData;
addFavoriteJSON = require('./json/addFavorite.json');
delFavoriteJSON = require('./json/delFavorite.json');
queryCartListJSON = require('./json/queryCartList.json').respData;
addCartJSON = require('./json/addCart.json');
delCartJSON = require('./json/delCart.json');
confirmExchangeJSON = require('./json/confirmExchange.json');
queryLotteryListJSON = require('./json/queryLotteryList.json').respData;
doLotteryJSON = require('./json/doLottery.json').respData;
queryRewardListJSON = require('./json/queryRewardList.json').respData;
queryMyRewardListJSON = require('./json/queryMyRewardList.json').respData;
getRewardJSON = require('./json/getReward.json');
queryShopListJSON = require('./json/queryShopList.json').respData;
queryShopInfoJSON = require('./json/queryShopInfo.json').respData;
queryAddressListJSON = require('./json/queryAddressList.json').respData;
updateDefaultAddressJSON = require('./json/updateDefaultAddress.json');
addAddressJSON = require('./json/addAddress.json');
delAddressJSON = require('./json/delAddress.json');
//图片url通过require方式加载
getImage = function(imageUrl){
	if(imageUrl.indexOf('../')!=-1){
		if(imageUrl.indexOf('.jpg')!=-1){
			var path = imageUrl.slice(3,imageUrl.indexOf('.jpg'));
			return require('./'+path+'.jpg');
		}else if(imageUrl.indexOf('.png')!=-1){
			var path = imageUrl.slice(3,imageUrl.indexOf('.png'));
			return require('./'+path+'.png');
		}else if(imageUrl.indexOf('.gif')!=-1){
			var path = imageUrl.slice(3,imageUrl.indexOf('.gif'));
			return require('./'+path+'.gif');
		};
	}else{
		return imageUrl;
	};
};

var app = angular.module('app',['ngRoute']);

var configFn = ['$routeProvider', function($routeProvider) {
  $routeProvider.
  //兑换中心
  when('/groupsExchange',{
    template: require('./template/groupsA_exchange.html'),
    controller: require('./controller/groupsA_exchange.js')
  }).
  when('/groupsExchangeItem/:productCode',{
    template: require('./template/groupsA_exchange_item.html'),
    controller: require('./controller/groupsA_exchange_item.js')
  }).
  when('/groupsProblems',{
    template: require('./template/groupsA_problems.html'),
    controller: require('./controller/groupsA_problems.js')
  }).
  when('/groupsToEarnPoints',{
    template: require('./template/groupsA_To_earn_points.html'),
    controller: require('./controller/groupsA_To_earn_points.js')
  }).
  //编辑地址页面
  when('/addressEdit/:addressId',{
    template: require('./template/addressEdit.html'),
    controller: require('./controller/addressEdit.js')
  }).
  //添加地址页面
  when('/addressAdd',{
    template: require('./template/addressEdit.html'),
    controller: require('./controller/addressEdit.js')
  }).
  //地址管理
  when('/addressManager',{
    template: require('./template/addressManager.html'),
    controller: require('./controller/addressManager.js')
  }).
  //收藏夹
  when('/myCollection',{
    template: require('./template/my_collection.html'),
    controller: require('./controller/my_collection.js')
  }).
  when('/myScore',{
    template: require('./template/my_score.html'),
    controller: require('./controller/my_score.js')
  }).
  when('/orderEdit',{
    template: require('./template/orderEdit.html'),
    controller: require('./controller/orderEdit.js')
  }).
  when('/scoreDetail',{
    template: require('./template/score_detail.html'),
    controller: require('./controller/score_detail.js')
  }).
  //积分E卡
  when('/scoreEcard',{
    template: require('./template/score_ecard.html'),
    controller: require('./controller/score_ecard.js')
  }).
  //积分抽奖商品详情页
  when('/scoreLotteryDetail/:productCode',{
    template: require('./template/score_lottery_detail.html'),
    controller: require('./controller/score_lottery_detail.js')
  }).
  //积分抽奖
  when('/scoreLotteryList',{
    template: require('./template/score_lottery_list.html'),
    controller: require('./controller/score_lottery_list.js')
  }).
  //积分商城
  when('/scoreMarket',{
    template: require('./template/score_market.html'),
    controller: require('./controller/score_market.js')
  }).
  //积分订单
  when('/scoreOrder',{
    template: require('./template/score_order.html'),
    controller: require('./controller/score_order.js')
  }).
  when('/scoreRule',{
    template: require('./template/score_rule.html'),
    controller: require('./controller/score_rule.js')
  }).
  //购物车
  when('/shoppingCart',{
    template: require('./template/shoppingCart.html'),
    controller: require('./controller/shoppingCart.js')
  }).
  //我的中奖记录
  when('/myWinnerRecord',{
    template: require('./template/my_winner_record.html'),
    controller: require('./controller/my_winner_record.js')
  }).
  when('/search',{
    template: require('./template/search.html'),
    controller: require('./controller/search.js')
  }).
  //物流信息
  when('/logistics/:orderCode',{
    template: require('./template/logistics.html'),
    controller: require('./controller/logistics.js')
  }).
  //填写订单页面
  when('/fillOrder',{
    template: require('./template/fill_order.html'),
    controller: require('./controller/fill_order.js')
  }).
  //订单详情页面
  when('/orderDetails/:orderCode',{
    template: require('./template/order_details.html'),
    controller: require('./controller/order_details.js')
  }).
  otherwise({
    redirectTo: '/scoreMarket'
  });
}];

app.config(configFn);
//路由切换
app.run([
	'$rootScope', '$location', 'form', 'createDialog', '$timeout', '$route',
	function($rootScope, $location, form, createDialog, $timeout, $route){
		//路由改变时加载loading界面
	    $rootScope.$on('$routeChangeStart', function(event, next, current) {
	        $rootScope.form = form;
	        $rootScope.form.loading.show = true;
	    });
	    //路由切换错误
	    $rootScope.$on('$routeChangeError', function(event, next, current){
	        $rootScope.form.loading.show = false;
	    });
		//加载完成时初始化数据和隐藏loading界面
	    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
	        $rootScope.form = form;
	        $rootScope.form.loading.show = false;
	        $rootScope.form.topBar = {
				'showTopBar': true,
				'topBarTitle': '',
				'showLeftBtn': false,
				'leftBtnType': '',
				'leftBtnTitle': '',
				'showRightBtn': false,
				'rightBtnType': '',
				'rightBtnTitle': ''
            };
	        $rootScope.form.leftBtnClick = function(){
		    	window.location.history=window.history.back();
		    };
	    });
	    //确认弹窗
		$rootScope.showConfirm = function(msg, successFn, cancelFn){
			createDialog({
				id: 'confirmPopup',
				title: '',
				template: '<div class="text-center">' + msg + '</div>',
				controller: null,
				footerShow: true,
				success: {
					label: '确定',
					fn: function(){
						if(successFn) successFn();
					}
				},
				cancel: {
					label: '取消',
					fn: function(){
						if(cancelFn) cancelFn();
					}
				}
			});
		};
	}
]);
//路由传参
app.factory('form',['$location',function($location){
	return {
	    topBar: {
	        'showTopBar': true,
	        'topBarTitle': '',
	        'showLeftBtn': false,
	        'leftBtnType': '',
	        'leftBtnTitle': '',
	        'showRightBtn': false,
	        'rightBtnType': '',
	        'rightBtnTitle': ''
	    },
	    loading: {
	    	show: false,
	    	message: '加载中...'
	    },
	    leftBtnClick: function(){
	    	window.location.history=window.history.back();
	    },
	    rightBtnClick: function(){
	    },
	    goPath: function(path){
			$location.path(path);
	    }
	};
}]);
//弹窗
app.factory('createDialog',['$compile','$rootScope','$controller','$timeout',function($compile,$rootScope,$controller,$timeout){
	var defaultOptions = {
		id: null,
		template: null,
		templateUrl: null,
		success: {label: '确认',fn: null},
		cancel: {label: '取消',fn: null},
		controller: null,
		footerTemplate: null,
		modelClass: 'popup_msg',
		modelCss: null
	};
	var $body = angular.element(document.querySelector('body'));
	var hideScroll = function(flag){
		var flag = flag || false;
		if(flag){
			angular.element(document.querySelector('html,body,[ng-view]')).addClass('hide-scroll');
		}else{
			angular.element(document.querySelector('html,body,[ng-view]')).removeClass('hide-scroll');
		};
	};
	
	return function(templateUrl,options,passedInLocals){
		if(angular.isObject(templateUrl)){
			passedInLocals = options;
			options = templateUrl;
		}
		else options.templateUrl = templateUrl;
		
		options = angular.extend({},defaultOptions,options);
		
		var bodyHtml = (function(){
			if(options.template){
				if(angular.isString(options.template)) return '<div class="msg">' + options.template + '</div>'; 
				else return '<div class="msg">' + options.template.html() + '</div>'; 
			}
			else return '<div class="modal-body" ng-include="\'' + options.templateUrl + '\'"></div>';
		})();
		var idHtml = options.id ? 'id="' + options.id + '"' : '';
		var defaultFooter = '<div class="left_btn" ng-click="$modelCancel();">{{$modelCancelLabel}}</div>' +
							'<div class="right_btn blue" ng-click="$modelSuccess();">{{$modelSuccessLabel}}</div>';
		var footerTemplate = options.footerTemplate || defaultFooter;
		var modelTemplate = '<div class="' + options.modelClass + '" ' + idHtml + ' style="display: block;">' +
								'<div class="popup_main">' +
										bodyHtml +
										'<div class="line"></div>' +
										'<div class="vline"></div>' +
										footerTemplate +
									'</div>' +
								'</div>' +
							'</div>';
		var modelElement = angular.element(modelTemplate);
		if(options.modelCss && angular.isObject(options.modelCss)){
			for(var key in options.modelCss){
				modelTemplate.css(key,options.modelCss[key]);
			};
		};
		
		var handleEscPressed = function(event){
			event.keyCode == 27 && scope.$modalCancel();
		};
		var closeFn = function(){
			$body.unbind('keydown',handleEscPressed);
			modelElement.remove();
			hideScroll(false);
		};
		$body.bind('keydown',handleEscPressed);
		
		var ctrl,
			locals,
			scope = options.scope || $rootScope.$new();
		scope.$title =  options.title;
		scope.$modelCancel = function(){
			var callback = options.cancel.fn || closeFn;
			callback.call(this);
			closeFn();
			hideScroll(false);
		};
		scope.$modelSuccess = function(){
			var callback = options.success.fn || closeFn;
			var flag = callback.call(this) == undefined || callback.call(this);
			if(flag){
				closeFn();
				hideScroll(false);
			};
		};
		scope.$modelCancelLabel = options.cancel.label;
		scope.$modelSuccessLabel = options.success.label;
		
		if(options.controller){
			locals = angular.extend({$scope: scope},passedInLocals);
			ctrl = $controller(options.controller,locals);
			modelElement.contents().data('$ngControllerController',ctrl);
		};
		
		$compile(modelElement)(scope);
		
		$timeout(function(){
			$body.append(modelElement);
			modelElement.addClass('in');
		});
		hideScroll(true);
	};
}]);
//http请求
app.factory('baseDataService', ['$http', '$q', 'form', function($http, $q, form){
	var service = {};
	service.originalHttp = function(url, param, config){
		var url = url || '';
		var param = param || null;
		var config = config && typeof config == 'object' ? config : {};
		var method = config.method || 'post';
		var timeout = config.timeout || 60000;
		//var dataType = config.dataType || 'json';
		//var async = config.async==undefined ? true : config.async;
		var cache = config.cache==undefined ? true : config.cache;
		//var beforeSend = config.beforeSend || function(){};
		//var complete = config.complete || function(){};
		var contentType = config.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
		var headers = config.headers || {'Content-Type': contentType};
		var transformRequest = config.headers || function(data){return $.param(data);};
		var option = {method: method,url: url,timeout: timeout,cache: cache,headers: headers};
		var options = method.toLowerCase() == 'post' ? Object.assign({},option,{data: param,transformRequest: transformRequest}) : Object.assign({},option,{params: param});
		var defer = $q.defer();
		var promise = defer.promise;
		$http(options).then(function(data){
			defer.resolve(data);
		},function(err){
			defer.reject(err);
		});
		return promise;
	};
	service.http = function(url, param, config){
		form.loading.message = config.message || form.loading.message;
		form.loading.show = true;
		var promise = this.originalHttp(url, param, config);
		promise.then(function(data){
			form.loading.show = false;
		},function(error){
			form.loading.show = false;
		});
		return promise;
	};
	return service;
}]);
