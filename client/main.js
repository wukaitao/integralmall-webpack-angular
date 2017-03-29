var app = angular.module('indexApp',['ngRoute','ngResource','ngAnimate','hmTouchEvents']);
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/healthyManage',{
		templateUrl: 'template/healthyManage.html',
		controller: healthyManageCtrl
	}).when('/',{
		templateUrl: 'template/home.html',
		controller: homeCtrl
	}).when('/healthyTrouble',{
		templateUrl: 'template/healthyTrouble.html',
		controller: healthyTroubleCtrl
	}).when('/healthyTroubleType',{
		templateUrl: 'template/healthyTroubleType.html',
		controller: healthyTroubleTypeCtrl
	}).when('/healthyTroubleArtcle',{
		templateUrl: 'template/healthyTroubleArtcle.html',
		controller: healthyTroubleArtcleCtrl
	}).when('/healthyTask',{
		templateUrl: 'template/healthyTask.html',
		controller: healthyTaskCtrl
	}).when('/healthyAssessment',{
		templateUrl: 'template/healthyAssessment.html',
		controller: healthyAssessmentCtrl
	}).when('/healthyAssessmentBak',{
		templateUrl: 'template/healthyAssessment_bak.html',
		controller: healthyAssessmentCtrlBak
	}).when('/myHealthy',{
		templateUrl: 'template/myHealthy.html',
		controller: myHealthyCtrl
	}).when('/myCommunity',{
		templateUrl: 'template/myCommunity.html',
		controller: myCommunityCtrl
	}).when('/createJogGroup',{
		templateUrl: 'template/jog/createJogGroup.html',
		controller: createJogGroupCtrl
	}).when('/joggersTop/:groupId',{
		templateUrl: 'template/jog/joggersTop.html',
		controller: joggersTopCtrl
	}).when('/jogGroup',{
		templateUrl: 'template/jog/jogGroup.html',
		controller: jogGroupCtrl
	}).when('/jogGroupDetail/:groupId',{
		templateUrl: 'template/jog/jogGroupDetail.html',
		controller: jogGroupDetailCtrl
	}).when('/jogGroupMember/:groupId',{
		templateUrl: 'template/jog/jogGroupMember.html',
		controller: jogGroupMemberCtrl
	}).when('/jogGroupTop',{
		templateUrl: 'template/jog/jogGroupTop.html',
		controller: jogGroupTopCtrl
	}).when('/joinJogGroup',{
		templateUrl: 'template/jog/joinJogGroup.html',
		controller: joinJogGroupCtrl
	}).when('/moreJogGroup',{
		templateUrl: 'template/jog/moreJogGroup.html',
		controller: moreJogGroupCtrl
	}).when('/searchJogGroup',{
		templateUrl: 'template/jog/searchJogGroup.html',
		controller: searchJogGroupCtrl
	}).when('/selectLeader',{
		templateUrl: 'template/jog/selectLeader.html',
		controller: selectLeaderCtrl
	}).when('/friendApplyMessage',{
		templateUrl: 'template/jog/message/friendApplyMessage.html',
		controller: friendApplyMessageCtrl
	}).when('/groupPkMessage',{
		templateUrl: 'template/jog/message/groupPkMessage.html',
		controller: groupPkMessageCtrl
	}).when('/jogGroupMessage',{
		templateUrl: 'template/jog/message/jogGroupMessage.html',
		controller: jogGroupMessageCtrl
	}).when('/messagePortal',{
		templateUrl: 'template/jog/message/messagePortal.html',
		controller: messagePortalCtrl
	});
}]);
app.run(['$rootScope', 'form', '$timeout', 'createDialog', function($rootScope, form, $timeout, createDialog){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		$rootScope.form = form;
		$rootScope.form.showLoading = true;
	});
	$rootScope.$on('$routeChangeError', function(event, next, current){
		console.log('routeChangeError');
	});
	$rootScope.$on('$routeChangeSuccess', function(event, next, current){
		$rootScope.form = form;
		$rootScope.form.topBarTitle='';
		$rootScope.form.showLoading = false;
		$rootScope.form.tipsTitle = '';
		$rootScope.form.showTips = false;
		$rootScope.form.isShowTipsFirst = true;
		//my test start
		//console.log(window.top.getData());
		//my test end
	});
	//my test start
	window.getData = function(){
		return $rootScope.form;
	};
	//my test end
	$rootScope.showTips = function(title){
		$rootScope.form.showTips = false;
		if($rootScope.form.isShowTipsFirst){
			$rootScope.form.tipsTitle = title;
			$rootScope.form.showTips = true;
			$rootScope.form.isShowTipsFirst = false;
		}else{
			$timeout(function(){
				$rootScope.form.tipsTitle = title;
				$rootScope.form.showTips = true;
			});
		};
	};
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
}]);
app.factory('resourceService', function($resource){
	return $resource('request/:api.json',{},{
		query: {method: 'get',params: {api: 'form'},isArray: true}
	});
});
app.factory('form', function(){
	return {
		loadingText: '加载中...',
		showLoading: false,
		showTopBar: true,
		showLeftBack: true,
		topBarTitle: '',
		backFn: function(){
			window.history.back();
		}
	};
});
app.factory('baseDataService', ['$http', '$q', 'form', function($http, $q, form){
	var service = {};
	service.originalHttp = function(url, param, config){
		var url = url || '';
		var param = param || null;
		var config = config && typeof config == 'object' ? config : {};
		var method = config.method || 'post';
		var headers = config.headers || {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Requested-With': 'XMLHttpRequest'
		};
		var cache = config.cache || true;
		var msg = config.msg || '加载中...';
		var defer = $q.defer();
		var promise = defer.promise;
		$http({method: method,params: param,url: url,cache: cache}).success(function(data){
			defer.resolve(data);
		}).error(function(data){
			defer.reject(data);
		});
		return promise;
	};
	service.http = function(url, param, config){
		form.showLoading = true;
		form.loadingText = config && typeof config == 'object' && config.msg ? config.msg : '加载中...';
		var promise = this.originalHttp(url, param, config);
		promise.then(function(data){
			form.showLoading = false;
		},function(error){
			form.showLoading = false;
		});
		return promise;
	};
	return service;
}]);
app.factory('createDialog',['$compile','$rootScope','$controller','$timeout',function($compile,$rootScope,$controller,$timeout){
	var defaultOptions = {
		id: null,
		template: null,
		templateUrl: null,
		title: 'Default Title',
		success: {label: 'Ok',fn: null},
		cancel: {label: 'Cancel',fn: null},
		controller: null,
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
		var defaultFooter = '<button type="button" class="btn" ng-click="$modelCancel();">{{$modelCancelLabel}}</button>' +
							'<button type="button" class="btn btn-primary" ng-click="$modelSuccess();">{{$modelSuccessLabel}}</button>';
		var footerTemplate = options.footerShow ? '<div class="modal-footer">' + (options.footerTemplate || defaultFooter) + '</div>' : '';
		var modelTemplate = '<div class="' + options.modelClass + '" ' + idHtml + ' style="display: table;">' +
								'<div class="modal-dialog">' +
									'<div class="modal-content">' +
										'<div class="modal-header">' +
											'<a class="close" ng-click="$modelCancel();"></a>' +
											'<h2>{{$title}}</h2>' +
										'</div>' +
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
app.directive('showContent',function(){
	return {
		restrict: 'A',
		replace: false,
		link: function(scope, element, attr){
			$(element).click(function(){
				if($(this).is('.show-content')){
					$(this).removeClass('show-content').addClass('hidden-content').next().slideUp();
				}else{
					$(this).parent().find('dt').removeClass('show-content').addClass('hidden-content').end().find('dd').slideUp().end().end()
						   .removeClass('hidden-content').addClass('show-content').next().slideDown();
				};
			});
		}
	};
});
app.directive('renderHtml',function(){
	return {
		restrict: 'A',
		replace: false,
		link: function(scope, element, attr){
			var htmlTemp = scope.$eval(attr.renderHtml);
			$(element).html(htmlTemp);
		}
	};
});
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
//跟踪器
var trackerList = [];
function tracker(EventId,Label,MapKv){
	if(!tracker) trackerList.push({EventId:EventId,Label:Label,MapKv:MapKv});
	else{
		if(trackerList.length){
			trackerList.forEach(function(item,index){
				TDAPP.onEvent(item.EventId,item.Label,item.MapKv);
			});
			trackerList = [];
		}else TDAPP.onEvent(EventId,Label,MapKv);
	};
};
//截取url
function cutPageUrl(url){
	var url = url || '';
	var index = url.indexOf('index.html');
	if(index != -1) return url.substr(0,index);
	return '';
};

//api接口
var inviteListApi = 'request/jog/inviteList.json';                       //邀请列表:好友/团战
var acceptInviteApi = 'request/jog/acceptInvite.json';                   //接受邀请:好友/团战
var delInviteApi = 'request/jog/delInvite.json';                         //删除邀请:好友/团战

var acceptJoinGroupApi = 'request/jog/acceptJoinGroup.json';             //接受加入跑团
var refuseJoinGroupApi = 'request/jog/refuseJoinGroup.json';             //拒绝加入跑团
var getMessageApi = 'request/jog/getMessage.json';                       //获取跑团消息
var createGroupApi = 'request/jog/createGroup.json';                     //创建跑团
var getMemberRankApi = 'request/jog/getMemberRank.json';                 //获取成员排行
var getStatusUserInGroupApi = 'request/jog/getStatusUserInGroup.json';   //是否已申请加入跑团
var getGroupInfoApi = 'request/jog/getGroupInfo.json';                   //获取跑团信息
var joinGroupApi = 'request/jog/joinGroup.json';                         //加入跑团
var cancelJoinApi = 'request/jog/cancelJoin.json';                       //取消加入
var exitGroupApi = 'request/jog/exitGroup.json';                         //退出跑团
var delMemeberApi = 'request/jog/delMemeber.json';                       //移除成员
var getGroupRankApi = 'request/jog/getGroupRank.json';                   //获取跑团排行
var getRecommendGroupsApi = 'request/jog/getRecommendGroups.json';       //获取推荐跑团
var getGroupListApi = 'request/jog/getGroupList.json';                   //获取跑团列表
var getMemberListApi = 'request/jog/getMemberList.json';                 //获取成员列表
var updateGroupLeadApi = 'request/jog/updateGroupLead.json';             //团长变更
var shareGroupMessageApi = 'request/jog/shareGroupMessage.json';         //分享团信息

var sendInviteApi = 'request/jog/sendInvite.json';                       //邀请:好友
var jogInviteListApi = 'request/jog/jogInviteList.json';                 //邀请列表:跑团