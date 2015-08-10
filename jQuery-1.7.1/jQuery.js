(function ( window, undefined) {
	
	var jQuery = (function () {
		
		var jQuery = function ( selector, context ) {
			return new jQuery.fn.init( selector, context, rootjQuery );
		},
		
		//Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
		
		//Map over $ in case of overweite
		_$ = window.$,
				
		//检测参数 selector 的正则表达式
		quickExpr = /(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				
		//save a reference to some core methods
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = Array.prototype.indexOf;		
		
		jQuery.fn = jQuery.prototype = {
			//指向构造函数 jQuery
			constructor: jQuery,
			/*
			 * selector：可以是任意类型的值，但只有 undefined、DOM元素、字符串、函数、jQuery对象、普通JS对象是有效的
			 * context：可以不传入，或传入DOM元素、jQuery对象、普通JS对象
			 * rootjQuery：包含了 document 对象的 jQuery 对象
			 */
			init: function ( selector, context, rootjQuery ) {
				var match, elem, ret, doc;
				//如果是 undefined、null 等，直接返回 this--->空 jQuery 对象
				if ( !selector ) {
					return this;
				}
				//如果有属性 nodeType，则认为 selector 是 DOM 元素
				if ( selector.nodeType ) {
					this.context = this[0] = selector;
					this.length = 1;
					return this;
				}
				//如果是字符串 ‘body’
				if ( slector === 'body' ) {
					this.context = document;
					this[0] = document.body;
					this.length = 1;
					return this;
				}
				//如果是其他字符串，先检测是 HTML 代码，还是 #id
				if ( typeof selector === 'string' ) {
					//HTML 代码
					if ( selector.charAt(0) === '<' && selector.charAt( selector.length - 1 ) === '>' && selector.length >= 3 ) {
						match = [ null, selector, null ];
					} else {
						match = quickExpr.exec( selector );
					}
					//是复杂 HTML 代码
					if ( match && (match[1] || !context) ) {
						
						//HANDLE: $(html)->$(array)
						if ( match[1] ) {
							context = context instanceof jQuery ? context[0] : context;
							doc = ( context ? context.ownerDocument || context : document );
							
							//单个标签
							ret = rsingleTag.exec( selector );
							
							if ( ret ) {
								if ( jQuery.isPlainObject( context ) ) {
									selector = [ document.createElement( ret[1] ) ];
									jQuery.fn.attr.call ( selector, context, true );
									
								} else {
									selector = [ doc.createElement( ret[1] ) ];
								}
								
							} else {
								ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
								selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
							}
							
							return jQuery.merge( this, selector );
							//HANDLE: $('#id')	 #id ，且未指定 context
						} else {
							elem = document.getElementById( match[2] );
							
							if ( elem && elem.parnetNode ) {
								//处理IE6、7和某些版本的 Opera 当调用核心方法 getElementById() ，会按属性 name 查找而不是 id 的 bug
								if ( elem.id !== match[2] ) {
									return rootjQuery.find( selector );
								}
								
								this.length = 1;
								this[0] = elem;
							}
							
							this.context = document;
							this.selector = selectot;
							return this;
						}
						
					//是选择器表达式	
					} else if ( !context || context.jquery ) {
						return ( context || rootjQuery ).find( selector );
					} else {
						return this.constructor( context ).find( selector );
					}
					
				//是函数
				} else if ( jQuery.isFunction( selector ) ) {
					return rootjQuery.ready( selector );
				}
				
				//是 jQuery 对象
				if ( selector.selector !== undefined ) {
					this.selector = selector.selector;
					this.context = selector.context;
				}
				//是任意其他值
				return jQuery.makeArray( selector, this );
			},
			//选择器表达式
			selector: '',
			//版本号
			jquery: '1.7.1',
			//当前 jQuery 对象中元素的个数
			length: 0,
			//返回当前 jQuery 对象中元素的个数
			size: function () {
				return this.length;
			},
			//将当前 jQuery 对象转换成真正的数组
			toArray: function () {
				return slice.call( this, 0 );
			},
			//返回指定位置的元素或包含了所有元素的数组
			get: function ( num ) {
				return num === null ?
					//如果没有传入参数
					this.toArray() :
					//传入参数值可以为负数
					( num < 0 ? this[ this.length + num ] : this[ num ] );
			},
			//入栈：创建一个新的空 jQuery 对象，然后把 DOM 元素集合放入这个对象中，并保留对当前 jQuery 对象的引用
			pushStack: function ( elems, name, selector ) {
				var ret = this.constructor();
				
				if ( jQuery.isArray( elems ) ) {
					push.apply( ret, elems );
				} else {
					jQuery.merge( ret, elems );
				}
				
				//构建一个新的 jQuery 对象并入栈
				ret.prevObject = this;
				
				ret.context = this.context;
				
				if ( name === 'find' ) {
					ret.selector = this.selector + ( this.selector ? '' : '' ) + selector;
				} else if ( name ) {
					ret.selector = this.selector + '.' + name + '(' + selector + ')';
				}
				
				return ret;
			},
			//遍历当前 jQuery 对象，并在每个元素上执行回调函数
			each: function ( callback, args ) {
				return jQuery.each( this, callback, args );
			},
			//遍历当前 jQuery 对象，在每个元素上执行回调函数，并将回调函数的返回值放入一个新的 jQuery 对象中
			map: function ( callback ) {
				return this.pushStack( jQuery.map(this, function( elem, i ) {
					return callback.call( elem, i, elem );
				}));
			},
			//出栈：结束当前链条中最近的筛选操作，并将匹配元素集合还原为之前的状态
			end: function () {
				//返回前一个 jQuery 对象，如果不存在，则构建一个空的 jQuery 对象返回
				return this.prevObject || this.constructor(null);
			},
			//将匹配元素集合缩减为集合中指定位置的元素
			eq: function( i ) {
				//如果参数是字符串，用 + 号把该参数转换成数值
				i = +i;
				return i === -1 ?
					this.slice( i ) :
					this.slice( i, i + 1 );
			},
			//将匹配元素集合缩减为集合中第一个元素
			first: function() {
				return this.eq( 0 );
			},
			//将匹配元素集合缩减为集合中最后一个元素
			last: function() {
				return this.eq( -1 );
			},
			//将匹配元素集合缩减为集合中指定范围的子集
			slice: function() {
				return this.pushStack( slice.apply( this, arguments ),
															'slice', slice.call(arguments).join(',') );
			},
			//向当前 jQuery 对象的末尾添加新元素，并返回新长度
			push: push,
			//对当前 jQuery 对象中的元素进行排序
			sort: [].sort,
			//向当前 jQuery 对象中插入、删除或替换元素，如果删除了元素，则返回含有被删除元素的数组
			splice: [].splice
		};
		
		jQuery.fn.init.prototype = jQuery.prototype;
		
		jQuery.extend = jQuery.fn.extend = function () {
			//定义变量
			//指向某个源对象、表示某个源对象的某个属性名、表示目标对象的某个属性的原始值、表示某个源对象的某个属性的值、
			//指示变量 copy 是否是数组、表示深度复制时原始值的修正值、目标对象、 表示源对象的起始下标、
			//表示参数的个数，用于修正变量 target 、指示是否执行深度复制，默认为 false 
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
		
		jQuery.extend({
			//释放 $ ，防止冲突
			
			//类型检测
			//是否函数
			
			//是否数组
			
			//jQuery.type
			
			//是否 window
			
			//是否数字
			
			//是否是纯粹的对象
			
			//对象是否是空的
			
			//解析 json
			
			//解析 xml
			
			//在全局作用域中执行 js 代码
			
			//转换连字符为驼峰式
			
			//检查 DOM 元素的节点名称
			
			//遍历当前 jQuery 对象，并在每个元素上执行回调函数
			each: function ( object, callback, args ) {
				var name, i = 0,
						length = object.length,
						isObj = length === undefined || jQuery.isFunction( object );
				
				if ( args ) {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.apply( object[ name ], args ) === false ) {
								break;
							}
						}
					} else {
						for ( ; i < length; ) {
							if ( callback.apply( object[ i++ ], args ) === false ) {
								break;
							}
						}
					}
				} else {
					if ( isObj ) {
						for ( name in object ) {
							if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
								break;
							}
						}
					} eles {
						for ( ; i < length; ) {
							if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
								break;
							}
						}
					}
				}
				
				return object;
			},
			//去除字符串两边的空白符
			
			//数组操作方法
			//把类数组转换成真数组
			
			//查找指定元素并返回其下标
			
			//合并两个数组
			
			//查找数组中满足过滤函数的元素
			
			//遍历当前 jQuery 对象，在每个元素上执行回调函数，并将回调函数的返回值放入一个新的 jQuery 对象中
			//参数：待遍历的数组或对象、回调函数、仅限于 jQuery 内部使用
			map: function( elems, callback, arg ) {
				var value, key, ret = [],
						i = 0,
						length = elems.length,
						isArray = elems instanceof jQuery
							|| length !== undefined && typeof length === 'number'
								&& ( (length > 0 && elems[0] && elems[ length-1 ]) || length === 0 || jQuery.isArray( elems ) );
				if ( isArray ) {
					for ( ; i < length; i++) {
						value = callback( elems[ i ], i, arg );
						
						//如果回调函数的返回值不是 null 或 undefined，则把返回值放入结果集 ret
						if ( value != null ) {
							ret[ ret.length ] = value;	
						}
					}
				} else {
					for ( key in elems ) {
						value = callback( elems[ key ], key, arg );
						
						if ( value != null ) {
							ret[ ret.length ] = value;	
						}
					}
				}
				
				//扁平化结果集 ret
				return ret.concat.apply( [], ret );
			}
			//全局计算器，设置唯一标识
			
			//返回一个新函数，并持有特定的上下文
			
			//获取或设置属性值
			
			//辅助开发插件
			
			//浏览器嗅探
			
		});
		
		return jQuery;
		
	})();
	
	//工具方法 utilities
	
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


