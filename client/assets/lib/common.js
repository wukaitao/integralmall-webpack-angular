//接口api
const apiDomain = 'http://member-sit.cignacmb.com/shop/interface';

const initPageData = '/initPageData';//首页和我的积分页面初始化接口
const queryScoreStatisticsMonth = '/queryScoreStatisticsMonth';//查询积分统计月份接口
const queryScoreMonthDetail = '/queryScoreMonthDetail';//查询积分月份明细接口
const queryCombox = '/queryCombox';//查询下拉选框数据接口
const unnode = '/';//积分E卡兑换接口
const queryOrderList = '/queryOrderList';//查询积分订单列表接口
const queryOrderDetail = '/queryOrderDetail';//查询订单详情接口
const confirmReceipt = '/confirmReceipt';//确认收货接口
const cancelOrder = '/cancelOrder';//取消订单接口
const queryLogistics = '/queryLogistics';//查看物流接口
const queryScoreChannelStatus = '/queryScoreChannelStatus';//查询赚积分渠道状态接口
const queryFavoriteList = '/queryFavoriteList';//收藏列表
const addFavorite = '/addFavorite';//添加收藏
const delFavorite = '/delFavorite';//删除收藏
const queryCartList = '/queryCartList';//购物车列表
const addCart = '/addCart';//添加购物车
const delCart = '/delCart';//删除购物车

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