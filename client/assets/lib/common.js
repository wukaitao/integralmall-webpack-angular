window.isStaticInterface = true;                                     //是否静态接口调试
window.staticPath = '/assets/json/';                                 //静态接口路径
window.origin = window.location.origin;                              //域名地址
window.apiPath = '/shop/interface/';                                 //接口路径

window.queryAdvertisementList = 'queryAdvertisementList';            //查询广告和我的积分接口
window.queryScoreStatisticsMonth = 'queryScoreStatisticsMonth';      //查询积分统计月份接口
window.queryScoreMonthDetail = 'queryScoreMonthDetail';              //查询积分月份明细接口

window.queryScoreChannelStatus = 'queryScoreChannelStatus';          //查询赚积分渠道状态接口

window.queryExchangeList = 'queryExchangeList';                      //商品列表
window.queryCombox = 'queryCombox';                                  //查询下拉选框数据接口
window.queryShopDetail = 'queryShopDetail';                          //查看商品详情
window.queryCollectList = 'queryCollectList';                        //收藏列表
window.addCollect = 'addCollect';                                    //添加收藏
window.delCollect = 'delCollect';                                    //删除收藏
window.queryCartList = 'queryCartList';                              //购物车列表
window.addCart = 'addCart';                                          //添加购物车
window.delCart = 'delCart';                                          //删除购物车
window.queryAddressList = 'queryAddressList';                        //收货地址列表
window.updateDefaultAddress = 'updateDefaultAddress';                //设置默认地址
window.updateAddress = 'updateAddress';                              //编辑地址
window.addAddress = 'addAddress';                                    //添加地址
window.delAddress = 'delAddress';                                    //删除地址
window.confirmExchange = 'confirmExchange';                          //确认兑换

window.doScoreEcard = 'doScoreEcard';                                //积分E卡兑换接口

window.queryOrderList = 'queryOrderList';                            //查询积分订单列表接口
window.confirmReceipt = 'confirmReceipt';                            //确认收货接口
window.queryOrderDetail = 'queryOrderDetail';                        //查询订单详情接口
window.cancelOrder = 'cancelOrder';                                  //取消订单接口
window.queryLogistics = 'queryLogistics';                            //查看物流接口

window.queryDrawList = 'queryDrawList';                              //抽奖活动专区列表
window.queryWinningRecordList = 'queryWinningRecordList';            //中奖客户列表
window.queryMyWinningRecordList = 'queryMyWinningRecordList';        //我的中奖记录
window.doDraw = 'doDraw';                                            //抽奖
window.getDraw = 'getDraw';                                          //立即领取

window.queryUserScore = 'queryUserScore';                            //查询用户积分
window.queryHotList = 'queryHotList';                                //查询热门推荐列表

window.chinaData = require('./chinaData.js');                        //省市区数据

//封装上拉刷新下拉加载更多
window.droploadList = function(option){
	var defaultOption = {
		scope: '',
		timeout: '',
		scroller: window,
		loadFn: function(callback){
			var callback = callback || function(){};
			callback.call(this);
		},
		beforeLoadUpFn: function(){},
		beforeLoadDownFn: function(){}
	};
	var option = option || defaultOption;
	var loadingImage = require('../images/design/icon-loading.png');
    var refreshingHintDom = '<div class="loadingToList">' +
							    '<div class="loadingIcon">' +
								    '<img src="' + loadingImage + '">' +
								'</div>' +
								'<div class="loadingFont">更新中...</div>' +
							'</div>';
    var loadingHintDom = '<div class="loadingToList">' +
    					     '<div class="loadingIcon">' +
    					         '<img src="' + loadingImage + '">' +
    					     '</div>' +
    					     '<div class="loadingFont">加载中...</div>' +
    					 '</div>';
    var noDataHintDom = '<div class="dropload-down-nodata" style="text-align: center;padding: 15px;display: none;">暂时没有数据</div>';
    $(option.scroller).dropload({
        scrollArea: window,
        autoLoad: true,
        domUp: {
            domClass: 'dropload-up',
            domRefresh: refreshingHintDom,
            domUpdate: refreshingHintDom,
            domLoad: refreshingHintDom
        },
        domDown: {
            domClass: 'dropload-down',
            domRefresh: loadingHintDom,
            domLoad: loadingHintDom,
            domNoData: noDataHintDom
        },
        loadUpFn: function (me) {
        	option.beforeLoadUpFn.call(me);
			me.unlock();
			me.noData(false);
			option.loadFn(function(){
				//锁定
				if(option.scope.isNoData){
					me.lock('down');
					me.noData();
				};
				me.direction = 'down';//修复插件BUG
				//ng-repeat遍历完后重置
				option.timeout(function(){
					me.resetload();
				},50);
			});
        },
        loadDownFn: function (me) {
        	option.beforeLoadDownFn.call(me);
			option.loadFn(function(){
				//锁定
				if(option.scope.isNoData){
					me.lock('down');
					me.noData();
				};
				//ng-repeat遍历完后重置
				option.timeout(function(){
					me.resetload();
				},50);
			});
        }
    });
};

//cookie操作
//写入cookie
window.setCookie = function(name, value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + '='+ escape (value) + ';expires=' + exp.toGMTString();
};
//获取cookie
window.getCookie = function(name){
	var arr,reg=new RegExp('(^| )'+name+'=([^;]*)(;|$)');
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
};
//删除cookie
window.delCookie = function(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + '='+cval+';expires='+exp.toGMTString();
};

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