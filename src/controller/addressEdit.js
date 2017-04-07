module.exports = ['$scope', '$timeout', '$location', '$routeParams', 'form', 'baseDataService', function($scope, $timeout, $location, $routeParams, form, baseDataService) {
	form.topBar.showLeftBtn = true;
	form.topBar.leftBtnType = 'back-button';
	//初始页面配置
	var addressId = $routeParams.addressId;
	form.topBar.topBarTitle = addressId ? '修改地址' : '新增地址';
	$scope.isNoAddress = form.addressDetail.provinceCode==''||form.addressDetail.cityCode==''||form.addressDetail.countyCode=='';
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
    	    			for(one of chinaData){
    	    				if(form.addressDetail.provinceName==one.name){
    	    					form.addressDetail.provinceCode = one.code;
    	    					for(subOne of one.cities){
    	    						if(form.addressDetail.cityName==subOne.name){
    	    							form.addressDetail.cityCode = subOne.code;
    	    							for(littleOne of subOne.districts){
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
    	    			//console.log('provinceCode:'+form.addressDetail.provinceCode);
    	    			//console.log('cityCode:'+form.addressDetail.cityCode);
    	    			//console.log('countyCode:'+form.addressDetail.countyCode);
        			});
        		}
        	}).mobiscroll('show');
    	},50);
	};
	//校验
	var _checkForm = function(){
		if(form.addressDetail.receiveName==''){
			console.log('收件人不能为空');
			return false;
		}else if(form.addressDetail.mobile==''){
			console.log('联系方式不能为空');
			return false;
		}else if(form.addressDetail.provinceCode==''||form.addressDetail.cityCode==''||form.addressDetail.countyCode==''){
			console.log('所在地区不能为空');
			return false;
		}else if(form.addressDetail.detail==''){
			console.log('详细地址不能为空');
			return false;
		};
		return true;
	};
	//保存地址
	$scope.saveAddress = function(){
		if(!_checkForm()) return;
		var param = {
			receiveName: form.addressDetail.receiveName,
			mobile: form.addressDetail.mobile,
			provinceCode: form.addressDetail.provinceCode,
			cityCode: form.addressDetail.cityCode,
			countyCode: form.addressDetail.countyCode,
			detail: form.addressDetail.detail
		};
		addressId && (param.addressId = addressId);
		if(addAddressJSON.respCode=='00'){
			console.log('修改地址成功.');
			$location.path('addressManager');
		};
	};
}];
