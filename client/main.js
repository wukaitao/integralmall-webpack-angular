const angular = require('angular');
window.Base64 = require('js-base64').Base64;
require('angular-route');
require('angular-resource');

require('./assets/lib/dropload.js');
require('./assets/lib/common.js');
require('./assets/css/font.css');
require('./assets/css/main.scss');

require('./assets/lib/mobiscroll/css/mobiscroll.frame.css');
require('./assets/lib/mobiscroll/css/mobiscroll.frame.ios.css');
require('./assets/lib/mobiscroll/css/mobiscroll.scroller.css');
require('./assets/lib/mobiscroll/css/mobiscroll.scroller.android.css');
require('./assets/lib/mobiscroll/css/mobiscroll.scroller.ios.css');
require('./assets/lib/mobiscroll/css/mobiscroll.frame.css');
require('./assets/lib/mobiscroll/mobiscroll.core.js');
require('./assets/lib/mobiscroll/mobiscroll.frame.js');
require('./assets/lib/mobiscroll/mobiscroll.scroller.js');
require('./assets/lib/mobiscroll/mobiscroll.util.datetime.js');
require('./assets/lib/mobiscroll/mobiscroll.datetimebase.js');
require('./assets/lib/mobiscroll/mobiscroll.datetime.js');
require('./assets/lib/mobiscroll/mobiscroll.select.js');
require('./assets/lib/mobiscroll/mobiscroll.listbase.js');
require('./assets/lib/mobiscroll/mobiscroll.treelist.js');
require('./assets/lib/mobiscroll/mobiscroll.frame.ios.js');
require('./assets/lib/mobiscroll/i18n/mobiscroll.i18n.zh.js');

//图片url通过require方式加载
window.getImage = function(imageUrl){
	if(imageUrl.indexOf('../')!=-1){
		//前端路径
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
	}else if(imageUrl.indexOf('http')!=-1){
		//网络路径
		return imageUrl;
	}else{
		//服务器路径
		return '/pc-web/upload/'+imageUrl;
	};
};

const app = angular.module('indexApp',[require('angular-sanitize'),'ngRoute','ngResource']);
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	//积分商城
	when('/integralMall',{
		template: require('./assets/template/integralMall.html'),
		controller: require('./assets/controller/integralMall.js')
	}).
	//我的积分
	when('/myIntegral',{
		template: require('./assets/template/myIntegral.html'),
		controller: require('./assets/controller/myIntegral.js')
	}).
	//积分明细
	when('/integralDetail',{
		template: require('./assets/template/integralDetail.html'),
		controller: require('./assets/controller/integralDetail.js')
	}).
	//积分规则
	when('/integralRule',{
		template: require('./assets/template/integralRule.html'),
		controller: require('./assets/controller/integralRule.js')
	}).
	//赚积分
	when('/earnIntegral',{
		template: require('./assets/template/earnIntegral.html'),
		controller: require('./assets/controller/earnIntegral.js')
	}).
	//兑换中心
	when('/exchangeCenter',{
		template: require('./assets/template/exchangeCenter.html'),
		controller: require('./assets/controller/exchangeCenter.js')
	}).
	//兑换详情
	when('/exchangeDetail/:productCode',{
		template: require('./assets/template/exchangeDetail.html'),
		controller: require('./assets/controller/exchangeDetail.js')
	}).
	//填写订单
	when('/fillOrder',{
		template: require('./assets/template/fillOrder.html'),
		controller: require('./assets/controller/fillOrder.js')
	}).
	//搜索
	when('/search',{
		template: require('./assets/template/search.html'),
		controller: require('./assets/controller/search.js')
	}).
	//购物车
	when('/shoppingCart',{
		template: require('./assets/template/shoppingCart.html'),
		controller: require('./assets/controller/shoppingCart.js')
	}).
	//地址管理
	when('/addressManagement',{
		template: require('./assets/template/addressManagement.html'),
		controller: require('./assets/controller/addressManagement.js')
	}).
	//地址编辑
	when('/addressEdit/:addressId',{
		template: require('./assets/template/addressEdit.html'),
		controller: require('./assets/controller/addressEdit.js')
	}).
	//地址添加
	when('/addressAdd',{
		template: require('./assets/template/addressEdit.html'),
		controller: require('./assets/controller/addressEdit.js')
	}).
	//收藏夹
	when('/myCollection',{
		template: require('./assets/template/myCollection.html'),
		controller: require('./assets/controller/myCollection.js')
	}).
	//积分E卡
	when('/integralEcard',{
		template: require('./assets/template/integralEcard.html'),
		controller: require('./assets/controller/integralEcard.js')
	}).
	//积分订单
	when('/integralOrder',{
		template: require('./assets/template/integralOrder.html'),
		controller: require('./assets/controller/integralOrder.js')
	}).
	//订单详情
	when('/orderDetail/:orderCode',{
		template: require('./assets/template/orderDetail.html'),
		controller: require('./assets/controller/orderDetail.js')
	}).
	//物流信息
	when('/logistics/:orderCode',{
		template: require('./assets/template/logistics.html'),
		controller: require('./assets/controller/logistics.js')
	}).
	//积分抽奖
	when('/integralDraw',{
		template: require('./assets/template/integralDraw.html'),
		controller: require('./assets/controller/integralDraw.js')
	}).
	//抽奖详情
	when('/integralDrawDetail/:productCode',{
		template: require('./assets/template/integralDrawDetail.html'),
		controller: require('./assets/controller/integralDrawDetail.js')
	}).
	//我的中奖记录
	when('/myWinningRecord',{
		template: require('./assets/template/myWinningRecord.html'),
		controller: require('./assets/controller/myWinningRecord.js')
	}).
	//常见问题
	when('/problem',{
		template: require('./assets/template/problem.html'),
		controller: require('./assets/controller/problem.js')
	}).
	//默认路由指向
	when('/',{
		template: require('./assets/template/integralMall.html'),
		controller: require('./assets/controller/integralMall.js')
	});
}]);
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
				'showLeftBtn': true,
				'leftBtnType': 'icon icon-keyboard_arrow_left',
				'leftBtnTitle': '',
				'showRightBtn': true,
				'rightBtnType': 'icon icon-home-outline',
				'rightBtnTitle': ''
            };
	        $rootScope.form.leftBtnClick = function(){
		    	window.location.href=window.history.back();
		    };
	        $rootScope.form.rightBtnClick = function(){
		    	$location.path('integralMall');
		    };
	    });
	    //toast提示弹窗
		$rootScope.showToast = function(message, callback, timeout){
			var callback = callback || function(){};
			if(message && message.length){
				var timeout = timeout || 2000;
				var htmlTemp = '<div class="modal" id="toastPopup">' +
							       '<div class="modal-dialog">' +
							           '<div class="modal-content">' +
							               '<div class="modal-body text-center" style="word-wrap: break-word;">' + message + '</div>' +
							           '</div>' +
							       '</div>' +
							   '</div>';
				$(htmlTemp).appendTo('body').fadeIn('fast',function(){
					$timeout(function(){
						$('#toastPopup').fadeOut('slow').remove();
						callback.call(this);
					},timeout);
				});
			};
		};
	    //警告弹窗
		$rootScope.showAlert = function(message, successFn){
			var footerTemplate = '<div class="btn" ng-click="$modelSuccess();">{{$modelSuccessLabel}}</div>';
			createDialog({
				id: 'alertPopup',
				template: '<div class="text-center">' + message + '</div>',
				controller: null,
				headerShow: false,
				footerTemplate: footerTemplate,
				footerShow: true,
				success: {
					label: '确定',
					fn: function(){
						if(successFn) successFn();
					}
				}
			});
		};
	    //确认弹窗
		$rootScope.showConfirm = function(message, successFn, cancelFn, successLabel, cancelLabel){
			createDialog({
				id: 'confirmPopup',
				template: '<div class="text-center">' + message + '</div>',
				controller: null,
				headerShow: false,
				footerShow: true,
				success: {
					label: successLabel||'确定',
					fn: function(){
						if(successFn) successFn();
					}
				},
				cancel: {
					label: cancelLabel||'取消',
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
	    	'showTopBar': false,
	        'topBarTitle': '',
	        'showLeftBtn': false,
	        'leftBtnType': '',
	        'leftBtnTitle': '',
	        'showRightBtn': false,
	        'rightBtnType': '',
	        'rightBtnTitle': ''
	    },
	    isRequesting: false,
	    loading: {
	    	show: false,
	    	message: '加载中...'
	    },
	    leftBtnClick: function(){
	    	window.location.href=window.history.back();
	    },
	    rightBtnClick: function(){
	    	$location.path('integralMall');
	    },
	    goPath: function(path){
			$location.path(path);
	    }
	};
}]);
//http请求
app.factory('baseDataService', ['$rootScope', '$http', '$q', 'form', 'createDialog', function($rootScope, $http, $q, form, createDialog){
	//调试接口写入cookie
	setCookie('UID','1071913');
	var service = {};
	service.originalHttp = function(url, param, config){
		var url = url ? (isStaticInterface?staticPath+url+'.json':apiPath+url) : '';
		var param = param ? {
			param: Base64.encode(JSON.stringify(param))
		} : null;
		var config = config && typeof config == 'object' ? config : {};
		var isDisabledRepeatedly = config.isDisabledRepeatedly || false;
		var method = config.method || (isStaticInterface?'get':'post');
		var timeout = config.timeout || 60000;
		var dataType = config.dataType || 'json';
		var async = config.async==undefined ? true : config.async;
		var cache = config.cache==undefined ? true : config.cache;
		var beforeSend = config.beforeSend || function(){};
		var complete = config.complete || function(){};
		var contentType = config.contentType || 'application/x-www-form-urlencoded';
		if(isDisabledRepeatedly){
			if(form.isRequesting) return;
			form.isRequesting = true;
		};
		var defer = $q.defer();
		var promise = defer.promise;
		var option = {
				type: method,
				data: param,
				url: url,
				timeout: timeout,
				dataType: dataType,
				async: async,
				cache: cache,
				contentType: contentType,
				beforeSend: beforeSend,
				complete: complete,
				success: function(data){
					if(data.respCode=='00'){
						//请求成功
					}else if(data.respCode=='01'){
						//登录信息已失效，请重新登录
						var path = window.location.href;
						createDialog({
							id: 'noLogin',
							template: '登录信息已失效，请重新登录',
							success: {
								label: '登录',
								fn: function(){
									window.location.href = origin+'/mb-member/login.xhtml?callback='+path;
								}
							},
							cancel: {
								label: '取消',
								fn: function(){
								}
							}
						});
					}else if(data.respCode=='02'){
						//传输参数问题(包含参数非空、参数格式)
						$rootScope.showAlert('传输参数问题(包含参数非空、参数格式)');
					}else if(data.respCode=='99'){
						//系统异常
						$rootScope.showAlert('系统异常');
					};
					isDisabledRepeatedly && (form.isRequesting=false);
					defer.resolve(data);
				},
				error: function(err){
					$rootScope.showAlert('网络错误.');
					isDisabledRepeatedly && (form.isRequesting=false);
					defer.reject(err);
				}
			};
		$.ajax(option);
		return promise;
	};
	service.http = function(url, param, config){
		form.loading.message = config.message || form.loading.message;
		form.loading.show = true;
		form.loading.isHttp = true;
		var promise = this.originalHttp(url, param, config);
		promise.then(function(data){
			form.loading.show = false;
			form.loading.isHttp = false;
		},function(error){
			form.loading.show = false;
			form.loading.isHttp = false;
		});
		return promise;
	};
	return service;
}]);
//弹窗
app.factory('createDialog',['$compile','$rootScope','$controller','$timeout',function($compile,$rootScope,$controller,$timeout){
	var defaultOptions = {
		id: null,
		template: null,
		templateUrl: null,
		title: 'Default Title',
		success: {label: 'Ok',fn: null},
		cancel: {label: 'Cancel',fn: null},
		controller: null,
		headerShow: true,
		footerTemplate: null,
		footerShow: false,
		modelClass: 'modal',
		modelCss: null
	};
	var $body = angular.element(document.body);
	var hideScroll = function(flag){
		var flag = flag || false;
		if(flag){
			angular.element('html,body,[ng-view]').addClass('hide-scroll');
		}else{
			angular.element('html,body,[ng-view]').removeClass('hide-scroll');
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
				if(angular.isString(options.template)) return '<div class="modal-body">' + options.template + '</div>'; 
				else return '<div class="modal-body">' + options.template.html() + '</div>'; 
			}
			else return '<div class="modal-body" ng-include="\'' + options.templateUrl + '\'"></div>';
		})();
		var idHtml = options.id ? 'id="' + options.id + '"' : '';
		var headerHtml = options.headerShow ? 
						'<div class="modal-header">' +
							'<a class="close" ng-click="$modelCancel();"></a>' +
							'<h2>{{$title}}</h2>' +
						'</div>' : '';
		var defaultFooter = '<button type="button" class="btn cancel" ng-click="$modelCancel();">{{$modelCancelLabel}}</button>' +
							'<button type="button" class="btn success btn-primary" ng-click="$modelSuccess();">{{$modelSuccessLabel}}</button>';
		var footerTemplate = options.footerShow ? '<div class="modal-footer">' + (options.footerTemplate || defaultFooter) + '</div>' : '';
		var modelTemplate = '<div class="' + options.modelClass + '" ' + idHtml + ' style="display: table;">' +
								'<div class="modal-dialog">' +
									'<div class="modal-content">' +
										headerHtml +
										bodyHtml +
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
//格式化数字
app.filter('formatCount',function(){
	return function(number){
		var number = ''+number;
		if(number.indexOf('.')!=-1){
			//有小数点
			var integer = number.split('.')[0];
			var decimal = number.split('.')[1];
			if(integer.length>3){
				var remainder=integer.length%3;
				var count = parseInt(integer.length/3);
				var list = [];
				if(remainder!=0){
					list.push(integer.substr(0,remainder));
					integer = integer.substr(remainder);
				};
				for(var i=0;i<count;i++){
					list.push(integer.substr(0,3));
					integer = integer.substr(3);
				};
				integer = list.join(',');
			};
			return integer + '.' + decimal;
		}else{
			//无小数点
			if(number.length>3){
				var remainder=number.length%3;
				var count = parseInt(number.length/3);
				var list = [];
				if(remainder!=0){
					list.push(number.substr(0,remainder));
					number = number.substr(remainder);
				};
				for(var i=0;i<count;i++){
					list.push(number.substr(0,3));
					number = number.substr(3);
				};
				number = list.join(',');
			};
			return number;
		};
	};
});
//转场效果
app.directive('sidebox',function(){
	return {
		restrict: 'EA',
		scope: {
			title: '@'
		},
		transclude: true,
		template: '<div class="sidebox">\
			<div class="header">{{title}}</div>\
			<div class="content" ng-transclude>\
			</div>\
		</div>'
	};
});
angular.element(document).ready(function(){
	angular.bootstrap(window.document,['indexApp']);
});