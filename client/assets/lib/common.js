//接口api
window.apiDomain = 'http://member-sit.cignacmb.com/shop/interface';

window.initPageData = '/initPageData';//首页和我的积分页面初始化接口
window.queryScoreStatisticsMonth = '/queryScoreStatisticsMonth';//查询积分统计月份接口
window.queryScoreMonthDetail = '/queryScoreMonthDetail';//查询积分月份明细接口
window.queryCombox = '/queryCombox';//查询下拉选框数据接口
window.unnode = '/';//积分E卡兑换接口
window.queryOrderList = '/queryOrderList';//查询积分订单列表接口
window.queryOrderDetail = '/queryOrderDetail';//查询订单详情接口
window.confirmReceipt = '/confirmReceipt';//确认收货接口
window.cancelOrder = '/cancelOrder';//取消订单接口
window.queryLogistics = '/queryLogistics';//查看物流接口
window.queryScoreChannelStatus = '/queryScoreChannelStatus';//查询赚积分渠道状态接口
window.queryFavoriteList = '/queryFavoriteList';//收藏列表
window.addFavorite = '/addFavorite';//添加收藏
window.delFavorite = '/delFavorite';//删除收藏
window.queryCartList = '/queryCartList';//购物车列表
window.addCart = '/addCart';//添加购物车
window.delCart = '/delCart';//删除购物车

window.confirmExchange = '/confirmExchange';//确认兑换
window.queryLotteryList = '/queryLotteryList';//抽奖活动专区列表
window.doLottery = '/doLottery';//抽奖
window.queryRewardList = '/queryRewardList';//中奖客户列表
window.queryMyRewardList = '/queryMyRewardList';//我的中奖记录
window.getReward = '/getReward';//立即领取
window.queryShopList = '/queryShopList';//商品列表
window.queryShopInfo = '/queryShopInfo';//查看商品详情
window.queryAddressList = '/queryAddressList';//收货地址列表
window.updateDefaultAddress = '/updateDefaultAddress';//设置默认地址
window.addAddress = '/addAddress';//添加地址
window.delAddress = '/delAddress';//删除地址

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