module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService',
    function($scope, $timeout, $location, $routeParams, form, baseDataService){
	//form.leftBtnClick = function(){
	//};
	//初始页面配置
	var addressId = $routeParams.addressId;
	form.topBar.topBarTitle = addressId ? '修改地址' : '新增地址';
	$scope.isNoAddress = form.addressDetail.provinceCode==''||form.addressDetail.cityCode==''||form.addressDetail.countyCode=='';
	$scope.errorMessageReceiverName = '';
	$scope.errorMessageMobile = '';
	$scope.errorMessageArea = '';
	$scope.errorMessageDetail = '';
	$scope.isErrorCallbackReceiverName = false;
	$scope.isErrorCallbackMobile = false;
	$scope.isErrorCallbackArea = false;
	$scope.isErrorCallbackDetail = false;
	$scope.isErrorCheckReceiverName = true;
	$scope.isErrorCheckMobile = true;
	$scope.isErrorCheckArea = true;
	$scope.isErrorCheckDetail = true;
	//省市区
	$scope.chinaData = chinaData;
	$scope.selectCity = function(){
    	$timeout(function(){
        	var defaultValue = form.addressDetail.provinceName&&form.addressDetail.cityName&&form.addressDetail.countyName ? 
			                  [form.addressDetail.provinceName,form.addressDetail.cityName,form.addressDetail.countyName] : ['北京市','市辖区','东城区'];
    		$('#addressData').mobiscroll().treelist({
        		theme: 'ios',
        		display: 'bottom',
        		mode: 'scroller',
        		lang: 'zh',
        		defaultValue: defaultValue,
        		onSelect: function(val){
        			$timeout(function(){
        				$scope.isNoAddress = false;
        				form.addressDetail.provinceName = val.split(' ')[0];
        				form.addressDetail.cityName = val.split(' ')[1];
        				form.addressDetail.countyName = val.split(' ')[2];
    	                //匹配地址的省市区名称和编码
    	    			for(var i=0;i<chinaData.length;i++){
    	    				var one = chinaData[i];
    	    				if(form.addressDetail.provinceName==one.name){
    	    					form.addressDetail.provinceCode = one.code;
    	    					for(var j=0;j<one.cities.length;j++){
    	    						var subOne = one.cities[j];
    	    						if(form.addressDetail.cityName==subOne.name){
    	    							form.addressDetail.cityCode = subOne.code;
    	    							for(var k=0;k<subOne.districts.length;k++){
    	    								var littleOne = subOne.districts[k];
    	    								if(form.addressDetail.countyName==littleOne.name){
    	    									form.addressDetail.countyCode = littleOne.code;
    	    									break;
    	    								};
    	    							};
    	    							break;
    	    						};
    	    					};
    	    					break;
    	    				};
    	    			};
        			});
        		}
        	}).mobiscroll('show');
    	},50);
	};
	//删除非中文
	var _delNotCn = function(str){
		var chReg = new RegExp('[\u4E00-\u9FA5]');
		var result = '';
		str.split('').forEach(function(item,index){
			chReg.test(item) && (result = result + item);
		});
		return result;
	};
	//删除空格
	var _delBlank = function(str){
		var blankReg = /\s+/g;
		return str.replace(blankReg,'');
	};
	//删除特殊字符
	var _delSpeStr = function(str){
		var speReg = new RegExp("[\\s`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_]",'g');
		return str.replace(speReg,'');
	};
	$scope.checkReceiverName = function(){
		$scope.isErrorCallbackReceiverName = false;
		var chReg = new RegExp('^[\u4E00-\u9FA5A-Za-z]{1,8}$');
		var speReg = new RegExp("[\\s`~!@#$^&*()=|{}':;',\\[\\]%<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？_]",'g');
		if(!form.addressDetail.receiverName){
			$scope.errorMessageReceiverName = '请填写收货人姓名';
			$scope.isErrorCheckReceiverName = false;
			return false;
		}else if(speReg.test(form.addressDetail.receiverName)){
			$scope.errorMessageReceiverName = '含有特殊字符';
			$scope.isErrorCheckReceiverName = false;
			return false;
		}else if(!chReg.test(form.addressDetail.receiverName)){
			$scope.errorMessageReceiverName = '不超过8位中英文';
			$scope.isErrorCheckReceiverName = false;
			return false;
		};
		$scope.isErrorCheckReceiverName = true;
		return true;
	};
	$scope.checkMobile = function(){
		$scope.isErrorCallbackMobile = false;
		var mobileReg = new RegExp('^[1][3,4,5,7,8][0-9]{9}$');
		if(!form.addressDetail.mobile){
			$scope.errorMessageMobile = '请填写收货人手机号';
			$scope.isErrorCheckMobile = false;
			return false;
		}else if(!mobileReg.test(form.addressDetail.mobile)){
			$scope.errorMessageMobile = '请填写正确的手机号';
			$scope.isErrorCheckMobile = false;
			return false;
		};
		$scope.isErrorCheckMobile = true;
		return true;
	};
	$scope.checkArea = function(){
		$scope.isErrorCallbackArea = false;
		if(form.addressDetail.provinceCode==''||form.addressDetail.cityCode==''||form.addressDetail.countyCode==''){
			$scope.errorMessageArea = '请选择所在地区';
			$scope.isErrorCheckArea = false;
			return false;
		};
		$scope.isErrorCheckArea = true;
		return true;
	};
	$scope.checkDetail = function(){
		$scope.isErrorCallbackDetail = false;
		form.addressDetail.detail = _delBlank(form.addressDetail.detail);
		var detailReg = new RegExp('^[^\x00-\xff]|[A-Za-z0-9_]{5,120}$');
		if(!form.addressDetail.detail){
			$scope.errorMessageDetail = '请填写详细地址';
			$scope.isErrorCheckDetail = false;
			return false;
		}else if(!detailReg.test(form.addressDetail.detail)){
			$scope.errorMessageDetail = '请填写正确的地址';
			$scope.isErrorCheckDetail = false;
			return false;
		};
		$scope.isErrorCheckDetail = true;
		return true;
	};
	//保存地址
	$scope.saveAddress = function(){
		var checkFlag = $scope.checkReceiverName() && $scope.checkMobile() && $scope.checkArea() && $scope.checkDetail();
		if(!checkFlag) return;
		var param = {
			receiverName: form.addressDetail.receiverName,
			mobile: form.addressDetail.mobile,
			provinceCode: form.addressDetail.provinceCode,
			cityCode: form.addressDetail.cityCode,
			countyCode: form.addressDetail.countyCode,
			detail: form.addressDetail.detail
		};
		addressId && (param.addressId = addressId);
		var promise = baseDataService.originalHttp(addressId?updateAddress:addAddress,param);
		promise.then(function(data){
			if(data.respCode=='00'){
				$scope.showToast(addressId?'修改成功':'保存成功',function(){
					$location.path('addressManagement');
				});
			};
		});
	};
}];
