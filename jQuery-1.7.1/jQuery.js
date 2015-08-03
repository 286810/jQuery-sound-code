(function ( window, undefined) {
	
	var jQuery = (function () {
		
		var jQuery = function ( selector, context ) {
			return new jQuery.fn.init( selector, context, rootjQuery );
		};
		
		jQuery.fn = jQuery.prototype = {
			constructor: jQuery,
			init: function ( selector, context, rootjQuery ) {
				
			}
		};
		
		jQuery.fn.init.prototype = jQuery.prototype;
		
		jQuery.extend = jQuery.fn.extend = function () {
			//定义变量
			//指向某个源对象；表示某个源对象的某个属性名；表示目标对象的某个属性的原始值；表示某个源对象的某个属性的值；
			//指示变量 copy 是否是数组；表示深度复制时原始值的修正值；目标对象； 表示源对象的起始下标
			//表示参数的个数，用于修正变量 target ；指示是否执行深度复制，默认为 false 
			var options, name, src, copy, copyIsArray, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;					
			//如果第一个参数是布尔值，则修正为 deep ，修正第二个为目标对象 target，并期望源对象从第三个元素开始
			if ( typeof target === 'boolean' ) {
				deep = arguments[0];
				target = arguments[1] || {};
				i = 2;
			}
			//如果是字符串
			if ( typeof target !== 'object' && !jQuery.isFunction(target)) {
				target = {};
			}
			//如果只有一个参数，则把 jQuery 作为目标对象
			if ( length === i ) {
				target = this;
				--i;
			}
			
			for ( ; i < length; i++ ) {
				//先判断源对象是不是 null、undefined，把获取源对象和对源对象的判断合并为一条语句
				if ( (optinos = arguments[i]) != null ) {
					//遍历源对象的属性
					for ( name in options ) {
						//变量 src 是原始值，copy 是复制值。如果复制值 copy 与目标对象 target 相等，为了避免遍历时死循环，因此不会覆盖目标对象的同名属性
						src = target[name];
						copy = options[name];
						//防止死循环
						if ( target === copy ) {
							continue;	
						}
						//如果是深度合并，且复制值 copy 是普通 js 对象或数组，则递归合并
						if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
							if ( copyIsArray ) {
								//如果 copy 是数组，而原始值 src 不是，则修正为空数组；如果 copy 是对象，而 src 不是，则修正为空对象 {}
								//把原始值 src 或修正后的值赋值给原始值副本 clone
								copyIsArray = false;
								clone = src && jQuery.isArray(src) ? src : [];
							} else {
								clone = src && jQuery.isPlainObject(src) ? src : {};
							}
							//把复制值 copy 递归合并到原始值副本 clone 中，然后覆盖目标对象的同名属性
							target[name] = jQuery.extend( deep, clone, copy );
						} else if ( copy !== undefined ) {
						//如果不是深度合并，则直接覆盖目标对象的同名属性
							target[name] = copy;
						}
					}
				}
			}
			
			return target;
		};
		
		jQuery.extend();
		jQuery.fn.extend();
		
		return jQuery;
		
	})();
	
	//utilities 工具方法
	
	//Callbacks Object 回调函数列表
	
	//Deferred Object 异步队列
	
	//Support 浏览器功能测试
	
	//Data 数据缓存
	
	//Queue 队列
	
	//Attributes 属性操作
	
	//Events 事件系统
	
	//Sizzle 选择器
	
	//Traversing Dom遍历
	
	//Manipulation DOM操作
	
	//Css 样式操作
	
	//Ajax 异步请求
	
	//Effects 动画
	
	//Offset and Dimensions 坐标、尺寸
	
	window.jQuery = window.$ = jQuery;
})(window);


