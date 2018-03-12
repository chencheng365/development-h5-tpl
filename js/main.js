var isPhone = (window.navigator.platform != "Win32");
var isAndroid = (window.navigator.userAgent.indexOf('Android')>=0)?true : false;

/**
 * localStorage保存数据
 * @param {String} key  保存数据的key值
 * @param {String} value  保存的数据
 */
function setLocVal(key,value){
	window.localStorage[key] = value;
}

/**
 * 根据key取localStorage的值
 * @param {Stirng} key 保存的key值
 */
function getLocVal(key){
	if(window.localStorage[key])
		return window.localStorage[key];
	else
		return "";
}

/**
 * 清除缓存
 * @param {Striong} key  保存数据的key，如果不传清空所有缓存数据
 */
function clearLocVal(key){
	if(key)
		window.localStorage.removeItem(key);
	else
		window.localStorage.clear();
}

/**
 * 小于10，补零
 * @param {Number} s 数值
 */
function setNum(s){
	return (parseInt(s)>9) ? s : '0'+s;
}

/**
 * 获取现在的时间(年月日)
 * @param {String} date 日期 [选填]
 */
function getNowDate(date){
	var d = date ? new Date(date):new Date();
	var y = d.getFullYear();
	var m = setNum(d.getMonth()+1);
	var dd = setNum(d.getDate());
	return y+"-"+m+"-"+dd;
}

/**
 * 获取现在的时间(时分)
 */
function getNowTime(){
	var d = new Date();
	var h = setNum(d.getHours());
	var mm = setNum(d.getMinutes());
	return h+":"+mm;
}

/**
 * 根据url打开网址
 * @param {String} url 网址
 */
function openUrl(url) {
    if(url) window.location.href = url;
}

/**
 * 判断是否是空
 * @param {String} value 
 */
function isDefine(value){
    if(value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined'){
        return false;
    }
    else{
		value = value+"";
        value = value.replace(/\s/g,"");
        if(value == ""){
            return false;
        }
        return true;
    }
}

/**
 * 给DOM对象赋值innerHTML
 * @param {String} id 对象id或者对象
 * @param {String} html html字符串
 * @param {String} showstr 当html不存在时的提示语
 */
function setHtml(id, html,showstr) {
	var showval = isDefine(showstr)? showstr : "";
	if ("string" == typeof(id)) {
		var ele = document.getElementById(id);
		if (ele != null) {
			ele.innerHTML = isDefine(html) ? html : showval;
		}else{
			alert("没有id为"+id+"的对象");
		}
	} else if (id != null) {
		id.innerHTML = isDefine(html) ? html : showval;
	}
}

/* 常用表单验证 start */

/**
 * 正则表达式-匹配邮箱
 * @param {String} str 邮箱
 */
function checkEmail(str) {
    var regx = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    if (regx.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 简单的手机号验证，11位数字
 * @param {Number} num 数字
 */
function checkPhone1(num){                
	if(!(/^\d{11}$/.test(num))){
	  return "手机号格式错误";
	}else{
		return true;
	}    
}

/**
 * 表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束。
 * @param {Number} num 数字
 */
function checkPhone2(num){ 
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(num))){ 
        return false;  
    }else{
        return true;
    } 
}
  
 /**
 * 校验手机号码
 * @param {String}  phone_num 手机号码
 */
function basicValidateMobile(phone_num) {
    var re = /^0*(86)*(13|15|14|18|17)\d{9}$/;
    var req = /^\d*$/;
    var mobile = $.trim(phone_num);
    if ( mobile == null || mobile == undefined || mobile.length == 0) {
        console.log("手机号码不能为空");
        return false;
    } else if (!re.test(mobile)) {
        if (req.test(mobile) && mobile.length < 11) {
            console.log("手机号不可少于11位，请正确填写！");
            return false;
        } else {
            console.log("手机号格式不对，请正确填写！");
            return false;
        }
    }
    var subNum = phone_num.substr(3);
    var o = 11;
    for (var i = 0; i < subNum.length - 1; i++) {
        var n = parseInt(subNum.charAt(i));
        var n1 = parseInt(subNum.charAt(i + 1));
        var offset = n - n1;

        if (Math.abs(offset) != 1) {
            return true;
        }

        if (o == 11) {
            o = offset;
        } else {
            if (o != offset) {
                return true;
            }
            o = offset;
        }
    }
    if (Math.abs(o) == 1) {
        console.log("手机号码不能连续！");
        return false;
    }
    return true;
}

 /**
 * 正则表达式-英文、数字、中文,4-24个字符
 * @param {String}  str 要匹配的字符串
 */
function checkStr(str) {
    var regx = /^[a-zA-Z0-9\u4E00-\u9FA5]{4,24}$/
    if (regx.test(str)) {
        return true;
    } else {
        return false;
    }
}

 /**
 * 正则表达式-匹配 数字、英文、汉字
 * @param {String}  str 要匹配的字符串
 */
function checkStr(str){
    var regx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    if(regx.test(str)){
        return false;     
    } else {
        return true;
    } 
}

/**
 * 根据身份证号判断性别，18位身份证，第17位数字，奇数为 男，偶数为 女
 * @param {Number or String} card 身份证号码
 */
function discriCard(card){
    if (parseInt(card.substr(16, 1)) % 2 == 1) {
            return "男";
       } else {
            return "女";
       }
}

/**
 * 验证15位和18位身份证号码的正则表达式
 * @param {Number or String} idCard 身份证号码
 */
function validateIdCard(idCard) {
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (idCard.length == 15) {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var nTemp = 0,
            i;
        idCard = idCard.substr(0, 6) + '19' + idCard.substr(6, idCard.length - 6);
        for ( i = 0; i < 17; i++) {
            nTemp += idCard.substr(i, 1) * arrInt[i];
        }
        idCard += arrCh[nTemp % 11];
        var idCard = idCard;
    }
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2);
            //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0;
            //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;
            //计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);
            //得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("通过验证啦！");
                } else {
                    return false;
                    //alert("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                    // alert("通过验证啦！");
                } else {
                    return false;
                    // alert("身份证号码错误！");
                }
            }
        }
    } else {
        return false;
        // alert("身份证格式不正确!");
    }
}

/**
 * 正则匹配 数字、英文、汉字
 * @param {String} str 要匹配的字符串
 */	
function checkStr(str){
    var regx = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    if(regx.test(str)){
        return false;     
    } else {
        return true;
    } 
}

/* 常用表单验证 end */

/**
 * 把字符串的第2位到第4位变成星号
 * @param {String} str 普通字符串 (.*)任意字符 (?:\d+)数字
 */
function delHtmlTag(str){
	return str.replace(/^(.{2})(.*)(.{4})$/,"$1********$2");
}

/**
 * 去掉所有的html标记
 * @param {String} str html字符串
 */
function delHtmlTag(str){
	return str.replace(/<[^>]+>/g,"");
}

//tingting.yan 
// //删除数组中指定的某个元素
// Array.prototype.indexOf = function(val) { //查找指定的元素在数组中的位置
            // for (var i = 0; i < this.length; i++) {
            // if (this[i] == val) return i;
            // }
            // return -1;
        // };
// Array.prototype.remove = function(val) {
    // var index = this.indexOf(val);
    // if (index > -1) {
    // this.splice(index, 1);
    // }
// };


/**
 * 计算一个div的位置
 * @param {Object} obj 当前dome对象
 * 返回值："x,y" 坐标值，中间以逗号分隔
 */
function getPosition(obj){
    var topValue = 0, leftValue = 0;
    while (obj) {
        leftValue += obj.offsetLeft;
        topValue += obj.offsetTop;
        obj = obj.offsetParent;
    }
    finalvalue = leftValue + "," + topValue;
    return finalvalue;
}

/**
 * @description 根据给定的值去删除数组中的元素
 * @param {String} val 要删除的值
 * @example var arr = [1,2,3]; arr.removeByValue('2');
 */			
Array.prototype.removeByValue = function(val) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

/**
 * 计算字符串长度(英文占1个字符，中文汉字占2个字符)
 * @param {String} val 要计算的值
 */	
function getStrLen(val) {    
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
                len += 2; //如果是全角，占用两个字节
            else
                len += 1; //半角占用一个字节
        }
        return len;
} 

/**
 * 数组对象排序
 * @param {Array-Object} prop 要排序的数组对象
 */
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}

/** 
 * @description 计算N天前后的日期
 * @param {Number}  AddDayCount 天数
 * @example ("一月前："+GetDateStr(-30));  ("三月后："+GetDateStr(90));
 */
function GetDateStr(AddDayCount) {     
    var dd = new Date();    
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();     
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y+"-"+m+"-"+d;     
 }

 /**
 * 获得两个日期之间所有日期
 * @param {String}  begin 开始日期  end 结束日期 cb执行完成的回调[选填]
 */
function intervalAllDates(begin, end, cb) {
    var ab = begin.split("-");  
    var ae = end.split("-");  
    var db = new Date();  
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);  
    var de = new Date();  
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);  
    var unixDb = db.getTime();  
    var unixDe = de.getTime();  
    for (var k = unixDb; k <= unixDe;) {
        var d = new Date(parseInt(k));
        var ymd = getNowDate(parseInt(k));
        k = k + 24 * 60 * 60 * 1000;  
    }
    cb && cb();
} 

 /**
 * 比较两个日期大小
 * @param {String}  d1 开始日期  d2 结束日期
 */
function compareData(d1,d2) {
    return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))))
}

 /**
 * 获取地址栏参数
 * @param {String}  name 要获取的值名称（key）
 */
function getQueryStr(name) {
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return unescape(r[2]); return null;
}

 /**
 * 获取字符串中最后一个 符号（str） 后面的内容
 * @param {String}  str 需要处理的字符串，code 标识符
 */
function getLastStr(str,code) {
    var index = str.lastIndexOf(code);
    return str.substring(index+1,str.length);
}

/**
 * @description 阻止 or 解除 默认事件
 * @example  document.body.addEventListener('touchmove', event_f, false);
 * @example  document.body.removeEventListener('touchmove',event_f,false);
 */
var event_f = function(e){e.preventDefault();}

 /**
 * 监测字符串中是否有重复的内容
 * @param {String}  str 需要处理的字符串
 */
function isRepeat(str) {
    return !/(.).*\1/i.test(str);
}

/** 
 * @description 将字符串中的多个空格缩减为一个空格
 * @example 'te xtT   XT'.ResetBlank()
 */
String.prototype.ResetBlank = function () {
     var regEx = /\s+/g;
     return this.replace(regEx, ' ');
};

 /**
 * 验证姓名
 * @param {String}  v 需要处理的字符串
 * @param {function}  cb 回调
 * 需要根据项目情况改写
 */
var checkName = function (v,cb) {
    if(!isDefine(v)){
        console.log('姓名不能为空!');
        cb && cb('1');
        return false;
    }
    var len = getStrLen(v);
    //计算字符串长度(字符数)
    if (len >= 3 && len < 31){
        //判断字符串中是否包含数字
        if (/[0-9]/g.test(v)) {
            console.log('字符串不能包含数字!');
            cb && cb('1');
            return false;
        }
        //判断字符串中是否同时包含中英文
        var regx = /[A-Za-z].*[\u4E00-\u9FA5]|[\u4E00-\u9FA5].*[A-Za-z]/;
        if (regx.test(v)) {
            console.log('字符串不能同时包含中英文!');
            cb && cb('1');
            return false;
        }

        var reg = /^[a-zA-Z .．_-]*$/;
        var newv = v;
        if (reg.test(newv)) {
            //英文的时候删掉连续空格，只保留一个空格
            var reg2 = /\s/;
            if (reg2.exec(newv) != null) {
                var newv = newv.ResetBlank();
                document.getElementById('name').value = newv;
            }
        } else {
            //中文的时候需要把空格全部删掉
            var newv = newv.replace(/\s+/g, "");//匹配空格
            document.getElementById('name').value = newv;
        }

        //判断字符串中是否包含 规则之外的特殊符号
        var reg3 = /^[a-zA-Z\u4e00-\u9fa5·, .．。，、_-]+$/g;
        if (reg3.test(newv)) {
            //将字符串中的 合法符号 转成 ·
            var reg4 = /[,.．。，、]/g;
            if (reg4.test(newv)) {
            	var btnArray = ['取消', '确认'];
				mui.confirm('输入的内容中含有非法字符，是否将其转换为 · ', '提示', btnArray, function(e) {
					if (e.index == 1) {
                        var zhi1 = newv.replace(/[^a-zA-Z\u4e00-\u9fa5-_]/g, "·"); //将特殊符号替换成 ·
                        var zhi2 = zhi1.replace(/[·]+/g, '·'); // 将连续出现的多个 · 替换成一个 ·
                        var zhi3 = zhi2.replace(/^·*|·*$/g, ''); //去掉首尾 ·
                        var zhi4 = zhi3.replace(/([,.．。·，、_-]){2,}/g, '$1'); //两个字符件出现多个特殊字符，只保留第一个
                        //处理完成最后的值
                        document.getElementById('name').value = zhi4;
                        cb && cb('0');
                        return true;
					} else {
                        //未转换特殊符号
						cb && cb('1');
					}
				})
				$(".mui-popup").css("top","44%");
            }else {
                //未发现符号不需要处理
                document.getElementById('name').value = newv.replace(/([,.．·。，、_-]){2,}/g, '$1');
                cb && cb('0');
                return true;
            }
        } else {
            cb && cb('1');
            console.log('不得出现特殊符号');
            // console.log('有特殊符号！--> 有除(,.．。，、_-)之外的字符');
        }
    }else{
        cb && cb('1');
        console.log('姓名长度需为3至30个字符（2-15个汉字）');
    }
}