/** 
 * @description 弹窗插件
 * @param {Object} 所有参数皆可选填
 * @example 
 * $.dialog({
		type : 'confirm',
		titleText : '提示',
		contentText : '提示内容描述',
		onClickOk:function(){
			console.log("左侧按钮回调")
		},
		onClickCancel:function(){
			console.log("右侧按钮回调")
		},
		buttonText : {
			ok : '确定',
			cancel : '取消'
		}
	})
 */

 
;(function(win,$){
	/* 
	 * 私有方法
	*/
	var event_f = function(e){e.preventDefault();}
	
	var okBtn,cancelBtn,overlay,settings;
	
	var _renderDOM = function (){
		switch (settings.type) {
			case 'alert':
				$('body').append( dialogWrapper = $('<div class="confirm-popup confirm-popup-in"></div>') );
				dialogWrapper.append(
					popupInner = $('<div class="confirm-popup-inner">'+
						'<div class="confirm-popup-title">'+ settings.titleText + '</div>'+
						'<div class="confirm-popup-text">'+ settings.contentText + '</div>'+
						'</div>'),
					popupButton = $( '<div class="confirm-popup-buttons"></div>')	
				)
				popupButton.append(
					okBtn = $('<span class="confirm-popup-button confirm-popup-button-bold">'+ settings.buttonText.ok + '</span>')
				)
				$('body').append( overlay = $('<div class="confirm-popup-backdrop confirm-active"></div>') );
				document.body.addEventListener('touchmove', event_f, false);
				break;
			case 'confirm':
				$('body').append( dialogWrapper = $('<div class="confirm-popup confirm-popup-in"></div>') );
				dialogWrapper.append(
					popupInner = $('<div class="confirm-popup-inner">'+
						'<div class="confirm-popup-title">'+ settings.titleText + '</div>'+
						'<div class="confirm-popup-text">'+ settings.contentText + '</div>'+
						'</div>'),
					popupButton = $( '<div class="confirm-popup-buttons"></div>' )	
				)
				popupButton.append(
					okBtn = $('<span class="confirm-popup-button confirm-popup-button-bold">'+ settings.buttonText.ok + '</span>'),
					cancelBtn = $('<span class="confirm-popup-button confirm-popup-button-bold">'+ settings.buttonText.cancel + '</span>')
				)
				$('body').append( overlay = $('<div class="confirm-popup-backdrop confirm-active"></div>') );
				document.body.addEventListener('touchmove', event_f, false);
				break;
			case 'alert2':
				$('body').append( dialogWrapper = $('<div class="dialog-wrap dialog-wrap-show"></div>') );
				dialogWrapper.append(
						overlay = $('<div class="dialog-overlay"></div>'),
						content = $('<div class="dialog-content"></div>')
				);
				content.append(
						title = $('<div class="dialog-content-hd"><h4 class="dialog-content-title">'+ settings.titleText +'</h4></div>')
				);
				content.append(
						contentBd = $('<div class="dialog-content-bd"><p>'+ settings.contentText +'</p></div>')
				);
				content.append(
						contentFt = $('<div class="dialog-content-ft"></div>')                   
				);
				contentFt.append(
						okBtn = $('<a class="dialog-btn dialog-btn-ok" href="javascript:;">'+ settings.buttonText.ok +'</a>')
				);
				document.body.addEventListener('touchmove', event_f, false);
				break;				
			default:
				break;
		}
	}

	var _bindEvent = function(){
		
		$(okBtn).on('click', function(e){
			settings.onClickOk();
			$.dialog.close();
			return false;
		})

		$(cancelBtn).on('click', function(e){
			settings.onClickCancel();
			$.dialog.close();
			return false;
		})

	}

	/* 
	 * 公共方法
	 */
	$.dialog = function(options){
		settings = $.extend({}, $.fn.dialog.default, options);
		$.dialog.init();
		return this;
	}
	
	$.dialog.init = function(){
		_renderDOM();
		_bindEvent();
	}
	
	$.dialog.close = function(){
		overlay.remove();
		dialogWrapper.remove();
		document.body.removeEventListener('touchmove',event_f,false);
	}

	// 挂载插件
	$.fn.dialog = function(options){
		return this;
	}

	//插件默认值
	$.fn.dialog.default = {
		type : 'alert',  //alert、alert2、confirm、toast、loading、loadingAll 目前只做了前三种，其余后期扩展
		titleText : '提示',
		contentText : '提示内容描述',

		buttonText : {
			ok : '确定',
			cancel : '取消'
		},

		onClickOk : function(){},
		onClickCancel : function(){},
		onClickClose : function(){}
	}
})(window, window.Zepto || window.jQuery)