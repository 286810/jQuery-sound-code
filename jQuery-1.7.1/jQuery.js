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
				
		//检查字符串是否有非空字符
		rnotwhite = /\S/,
				
		//匹配空白字符：空格、制表符、换行符、换页符
		trimLeft = /^\s+/,
		trimRight = /\s+$/,
				
		//匹配单标签
		singleTag = /^<(\w+)\s*\/?>(?:<\/\1>?$/,
		
		//JSON RegExp
		//检查字符串是否只含有指定的字符 ( ']'、','、':'、'{'、'}'、'\s' )
		rvalidchars = /^[\],:{}\s]*$/,
		//匹配转义字符
		rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		//匹配有效值
		rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		//匹配正确的左方括号
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
				
		//Useragent RegExp
		rwebkit = /(webkit)[ \/]([\w.]+)/,
		ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
		rmsie = /(msie) ([\w.]+)/,
		rmozilla = /(mozilla)(?:.*? rv:([\w.]+)?/,
				
		//匹配连字符 ‘-’ 和其后的第一个字母或数字，如果是字母，则替换为大写，如果是数字，则保留数字
		rdashAlpha = /-([a-z]|[0-9])/ig,
		//匹配 IE 中的 ‘-ms-’，替换为 ‘ms-’，这是因为 IE 中，‘-ms-’ 对应小写的 ‘ms’，而不是驼峰式的 ’Ms‘
		rmsPrefix = /^-ms-/,
		//注意函数中的参数 letter 对应的是 '([a-z]|[0-9])' 匹配的字母或数字
		fcamelCase = function( all, letter ) {
			return ( letter + '' ).toUpperCase();		
		},		
		
		//UserAgent string
		userAgent = navigator.userAgent,
				
		//抽取内部对象的核心方法，供以后使用
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = Array.prototype.indexOf,
				
		//存放内部对象类
		class2type = {};		
		
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
			noConflict: function( deep ) {
				if ( window.$ === jQuery ) {
					window.$ = _$;
				}
				
				if ( deep && window.jQuery === jQuery ) {
					window.jQuery = _jQuery;
				}
				
				return jQuery;
			},
			//类型检测
			//是否函数
			isFunction: function( obj ) {
				return jQuery.type(obj) === 'function';
			},
			//是否数组
			isArray: Array.isArray || function( obj ) {
				return jQuery.type(obj) === 'array';
			},
			//jQuery.type
			type: function( obj ) {
				return obj === null ?
					String( obj ) :
					//从 class2type 中取出内部对象类名
					class2type[ toString.call(obj) ] || 'object';
			},
			//是否 window
			isWindow: function( obj ) {
				return obj != null && obj == obj.window;
			},
			//是否数字：合法并且是有限的
			isNumeric: function( obj ) {
				return !isNaN( parseFloat(obj) ) && isFinite( obj );
			},
			//是否是纯粹的对象
			isPlainObject: function( obj ) {
				if ( !obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj) ) {
					return false;
				}
				//如果由自定义函数创建,返回 false
				try {
					if ( obj.constructor && !hasOwn.call(obj, 'constructor') &&
							!hasOwn.call(obj.constructor.prototype, 'isPrototypeOf') ) {
						return false;
					}
				} catch ( e ) {
					//IE8,9 会抛出错误
					return false;
				}
				//如果含有继承属性，则返回 false
				var key;
				for ( key in obj ) {}
				
				return key === undefined || hasOwn.call( obj, key );
			},
			//对象是否是空的
			isEmptyObject: function( obj ) {
				for ( var name in obj ) {
					return false;
				}
				return true;
			},
			//解析 json
			parseJSON: function( data ) {
				if ( typeof data !== 'string' || !data ) {
					return null;
				}
				
				//移除开头末尾空白符，否则 IE6、7 不能正确解析
				data = jQuery.trim( data );
				
				if ( window.JSON && window.JSON.parse ) {
					return window.JSON.parse( data );
				}
				
				//确保 JSON 字符串是合法的，参考 http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, '@').replace( rvalidtokens, ']').replace( rvalidbraces, '' ) ) ) {
					//开始解析
					return ( new Function( 'return ' + data ) ) ();
				}
				
				jQuery.error( 'Invalid JSON: ' + data );
			},
			//解析 xml
			parseXML: function( data ) {
				var xml,tmp;
				try {
					if ( window.DOMParser ) {
						tmp = new DOMParser();
						xml = tmp.parseFromString( data, 'text/xml' );
					} eles { //IE
						xml = new ActiveXObject( 'microsf.XMLDOM' );
						xml.async = 'false';
						xml.loadXML( data );
					}
				} catch( e ) {
					xml = undefined;
				}
				if ( !xml || !xml.documentElement || xml.getElementsByTagName( 'parsererror' ).length ) {
					jQuery.error( 'Invalid XML: ' + data );
				}
				return xml;
			},
			//在全局作用域中执行 js 代码
			gloabalEval: function( data ) {
				if ( data && rnotwhite.test( data ) ) {
					( window.execScript || function( data ) {
						window[ 'eval' ].call( window, data );
					} )( data );
				}
			},
			//转换连字符为驼峰式
			camelCase: function( string ) {
				return string.replace( rmsprefix, 'ms-' ).replace( rdashAlpha, fcamelCase );
			},
			//检查 DOM 元素的节点名称
			nodeName: function( elem, name ) {
				return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
			},
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
			trim: trim ? 
				function( text ) {
					return text == null ?
						'' :
						trim.call( text );
				} :
				function( text ) {
					return text == null ? 
						'' :
						text.toString().replace( trimLeft, '' ).replace( trimRight, '' );
				},
			//数组操作方法
			//把类数组转换成真数组
			makeArray: function( array, results ) {
				var ret = results || [];
		
				if ( array != null ) {
					// The window, strings (and functions) also have 'length'
					// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
					var type = jQuery.type( array );
		
					if ( array.length == null || 
							 type === "string" || 
							 type === "function" || 
							 type === "regexp" || 
							 jQuery.isWindow( array ) ) {
						push.call( ret, array );
					} else {
						jQuery.merge( ret, array );
					}
				}
		
				return ret;
			},
			/*
			 * 查找指定元素并返回其下标
			 * 由于返回的是数字，可用按位非运算符（~）将运算数的所有位取反，相当于改变它的符号并减 1
			 * ~-1 == 0;
			 * ~0 == -1;
			 * ~1 == -2;
			 * 或者用 '!!' 转换成布尔值：
			 * if ( !!~jQuery.inArray( elem, array, i ) ) {  }
			 */
			inArray: function( elem, array, i ) {
				var len;
				
				if ( array ) {
					if ( indexOf ) {
						return indexOf.call( array, elem, i );
					}
					
					len = array.length;
					i = i ? i < 0 ? Math.max( 0 , len + i ) : i : 0;
					
					for ( ; i < len; i++ ) {
						if ( i in array && array[ i ] === elem ) {
							return i;	
						}
					}
				}
			},
			/*
			 * 将第二个数组合并到第一个数组中,注意合并后第一个数组已经被改变了，如果不想被改变，可以创建一份它的副本：
			 * var newArray = $.merge( [], oldArray);
			 * 参数：
			 * first：数组或类数组对象，必须含有整型属性 length
			 * second：数组、类数组对象或含有连续整型属性的对象
			 *
			 * 注：还可以用 jQuery.makeArray() 将参数变成真正的数组
			 */
			merge: function( first, second ) {
				var i = first.length,
						j = 0;
				
				if ( typeof second.length === 'number' ) {
					for ( var l = second.length; j < l; j++ ) {
						first[ i++ ] = second[ j ];
					}
				} else {
					while ( second[ j ] !== undefined ) {
						first[ i++ ] = second[ j++ ];
					}
				}
			},
			/*
			 * 查找数组中满足过滤函数的元素
			 * elems：待遍历查找的数组
			 * callback：过滤函数，执行时传入两个参数：当前元素和下标，返回一个布尔值
			 * inv：如果是 false 或未传入，则 jQuery.grep() 会返回一个满足回调函数的数组；如果是 true ，则返回一个不满足回调函数的数组
			 * 
			 * 注：( inv !== retVal ) 表达式实现了这个巧妙的用法
			 */
			grep: function( elems, callback, inv ) {
				var ret = [], retVal;
				inv = !!inv;
				
				for ( var i = 0, length = elems.length; i < length; i++ ) {
					retVal = !!callback( elems[ i ], i );
					if ( inv !== retVal ) {
						ret.push( elems[ i ] );
					}
				}
				
				return ret;
			},
			//遍历当前 jQuery 对象，在每个元素上执行回调函数，并将回调函数的返回值放入一个新的 jQuery 对象中
			//参数：待遍历的数组或对象、回调函数、arg 仅限于 jQuery 内部使用
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
			},
			//全局计算器，设置唯一标识，用于 jQuery 事件模块和缓存模块
			guiid: 1,
			//返回一个新函数，并持有特定的上下文
			proxy: function( fn, context ) {
				if ( typeof context === 'string' ) {
					var tmp = fn[ context ];
					context = fn;
					fn = tmp;
				}
				
				if ( !jQuery.isFunction( fn ) ) {
					return undefined;
				}
				
				var args = slice.call( arguments, 2 ),
						// 创建一个代理函数，在代理函数中调用原始函数 fn。代理函数通过闭包机制引用 context、args、slice
						proxy = function() {
							ruturn fn.apply( context, args.concat( slice.call( arguments ) ) );
						};
				
				//给代理函数和原始函数设置相同的唯一标识
				proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
			},
			/*
			 * 获取或设置属性值
			 * elems：元素集合，通常是 jQuery 对象
			 * key：属性名或含有键值对的对象
			 * value：属性值或函数。当 key 是对象时，该参数为 undefined
			 * exec：布尔值，当 value 为函数时，指示是否执行函数
			 * fn：回调函数
			 * pass：布尔值，可以忽略
			 */
			access: function( elems, key, value, exec, fn, pass ) {
				var length = elems.length;
				
				if ( typeof key === 'Object' ) {
					for ( var k in key ) {
						jQuery.access( elems, k, key[k], exec, fn, value);
					}
					return elems;
				}
				
				if ( value !== undefined ) {
					exec = !pass && exec && jQuery.isFunction(value);
					
					for ( var i = 0; i < length; i++ ) {
						fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key )) : value, pass );
					}
					
					return elems;
				}
				
				return length ? fn( elems[0], key ) : undefined;
			},
			
			//辅助开发插件
			error: function( msg ) {
					throw new Error( msg );
			},
			noop: function() {},
			now: function() {
				return ( new Date() ).getTime();	
			},
			//浏览器嗅探
			uaMatch: function( ua ) {
				ua = ua.toLowerCase();
				
				var match = rwebkit.exec( ua ) ||
						ropera.exec( ua ) ||
						rmsie.exec( ua ) ||
						ua.indexOf('compatible') < 0 && rmozilla.exec( ua ) ||
						[];
				
				return { browser: match[1] || '', version: match[2] || '0' };
			},
				
			browser: {}
		});
		
		//设置对象内部类对应的类型
		jQuery.each('Boolean Number String Function Array Date RegExp Object'.split(' '), function(i,name) {
			class2type[ '[object ' + name + ']' ] = name.toLowerCase();
		});
			
		browserMatch = jQuery.uaMatch( userAgent );
		if ( browserMatch.browser ) {
			jQuery.browser[ browserMatch.browser ] = true;
			jQuery.browser.version = browserMatch.version;
		}
		
		// Deprecated, use jQuery.browser.webkit instead
		if ( jQuery.browser.webkit ) {
			jQuery.browser.safari = true;
		}

		//IE9以下 \s 不匹配不间断空格 \xA0 ，需要为正则 trimLeft 和 trimRight 加上 '\xA0'
		if ( rnotwhite.test( '\xA0' ) {
			trimLeft = /^[\s\xA0]+/;
			trimRight = /[\s\xA0]+/;
		}
		
		return jQuery;
		
	})();
	
	//工具方法 utilities
	
	//Callbacks Object 回调函数列表
		//存储转换后的标记对象
		var flagsCache = {};
		//字符串格式标记转换为对象格式标记并存储在缓存中
		// flags 参数是结构为一个用空格标记分隔的标志可选列表,用来改变回调列表中的行为 (比如 'unique stopOnFalse' )
		function createFlags( flags ) {
			var object = flagsCache[ flags ] = {},
					i, length;
			flags = flags.split( /\s+/ );
			for ( i = 0, length = flags.length; i < length; i++ ) {
				object[ flags[i] ] = true;
			}
			return object;
		}
		/*
		 * flags 参数是结构为一个用空格标记分隔的标志可选列表,用来改变回调列表中的行为 (比如 'unique stopOnFalse' )
		 * 
		 * once: 确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred).
		 * 
		 * memory: 保持以前的值，将添加到这个列表的后面的最新的值立即执行调用任何回调 (像一个递延 Deferred).
		 *
		 * unique: 确保一次只能添加一个回调(所以在列表中没有重复的回调).
		 *
		 * stopOnFalse: 当一个回调返回false 时中断调用
		 */
		jQuery.Callbacks = function( flags ) {
			//先从缓存对象中获取标记字符串 flags 对应的标记对象，如果没找到，用工具函数将标记字符串解析为标记对象
			flags = flags ? ( flagsCache[ flags ] || createFlags[ flags ] ) : {};
			
			var // 回调函数列表
					list = [],
					// Stack of fire calls for repeatable lists
					// 如果不是 once 模式，那么 stack 会保持住 fire 所需的上下文跟参数
					stack = [],
					// 是否为 memory 类型的
					memory,
					// 是否已经触发过
					fired,
					// 是否正在触发
					firing,
					// 回调的起点
					firingStart,
					// 队列长度
					firingLength,
					// 当前触发的回调函数在队列中的索引
					firingIndex,
					
					add = function( args ) {
						var i,
								length,
								elem,
								type,
								actual;
						for ( i = 0, length = args.length; i < length; i++ ) {
							elem = args[ i ];
							type = jQuery.type( elem );
							if ( type === 'array' ) {
								//迭代调用工具函数 add( args ) 把数组中的回调函数添加到数组 list 中
								add( elem );
							} eles if ( type === 'function' ) {
								//如果 args[i] 是函数并且不是 unique 模式，或者是unique 模式但未添加过
								if ( !flags.unique || !self.has( elem ) ) {
									list.push( elem );
								}
							}
						}
					},
					/*
					 * context：回调函数执行时的上下文，即 this 所引用的对象
					 *
					 * args：调用回调函数时传入的参数
					 */
					fire = function( context, args ) {
						args = args || [];
						//如果当前回调函数列表不是 memory 模式，则 memory 被赋值为 true；如果是 memory 模式，则被赋值为 [ context, args ]，均表示回调函数列表已经被触发过
						memory = !flags.memory || [ context, args ];
						//执行前设置为 true，表示正在执行
						firing = true;
						firingIndex = firingStart || 0;
						firingStart = 0;
						//因为 fire 的时候可能还在 add 回调，所以这里要维护一下队列长度
						firingLength = list.length;
						for ( ; list && firingIndex < firingLength; firingIndex++ ) {
							//执行回调函数 list[ firingIndex ],如果返回值是 false，并且是 stopOnFalse 模式，则变量 memory 被赋值为 true，并停止执行后续的回调函数，表示当前回调函数列表已经被触发过
							if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
								memory = true;
								break;
							}
						}
						//执行后设置为 false，表示未执行
						firing = false;
						if ( list ) {
							/*
							 * 如果不是 once 模式，则从 stack 中弹出存放的下文和参数，再次执行整个回调函数列表，直到 stack 为空
							 * 
							 * 如果是 once 模式，并且不是 memory 模式，则禁用回调函数列表
							 * 
							 * 如果是 once + stopOnFalse 模式，并且某个回调函数返回了 false ，则禁用回调函数列表
							 * 
							 * 如果是 once + memory 模式，则清空数组 list，后续添加的回调函数还会立即执行
							 */
							if ( !flags.once ) {
								if ( stack && stack.length ) {
									memory = stack.shift();
									self.fireWith( memory[ 0 ], memory[ 1 ] );
								}
							} else if ( memory === true ) {
								self.disable();
							} else {
								list = [];
							}
						}
					},
					self = {
						add: function() {
						  if ( list ) {
								//在添加回调函数前，先备份数组 list 的长度，该值也是回调函数的插入位置
								var length = list.length;
								//调用工具函数添加回调函数
								add( arguments );
								//如果回调函数队列正在执行中，则修正结束下标 firingLength，使得新添加的回调函数也能执行
								if ( firing ) {
									firingLength = list.length;
								//如果回调函数队列未在执行中，并且已经被触发过，则修正起始下标为回调函数的插入位置，然后立即执行	
								} else if ( memory && memory !== true ) {
									firingStart = length;
									fire( memory[ 0 ], memory[ 1 ] );
								}
							}
							//返回当前回调函数列表，以保持链式语法
							return this;
						},
						remove: function() {
							if ( list ) {
								var args = arguments,
										argIndex = 0,
										argLength = args.length;
								for ( ; argIndex < argLength; argIndex++ ) {
									for ( var i = 0; i < list.length; i++ ){
										if ( args[ argIndex ] === list[ i ] ) {
											//如果回调函数列表正在执行，则在移除前使结束下标 firingLength 减 1；如果移除的函数的下标小于正在执行函数的下标，则修正 firingIndex 减 1，以确保不会漏执行函数
											if( firing ) {
												if ( i <= firingLength ) {
													firingLength--;
													if ( i <= firingIndex ) {
														firingIndex--;
													}
												}
											}
											
											list.splice( i--, 1 );
											//在 unique 模式下，list 中不会有重复的回调函数，可以直接退出内层遍历
											if ( flags.unique ) {
												break;	
											}
										}
									}
								}
							}							
							//返回当前回调函数列表，以保持链式语法
							return this;
						},
						has: function( fn ) {
							if ( list ) {
								var i = 0,
										length = list.length;
								for ( ; i < length; i++ ) {
									if ( list[ i ] === fn ) {
										return true;
									}
								}
							}
							return false;
						},
						empty: function() {
							list = [];
							return this;
						},
						//禁用回调函数列表，使它不再做任何事
						disable: function() {
							list = stack = memory = undefined;
							return this;
						},
						disabled: function() {
							return !list;
						},
						//锁定回调函数列表，使它无法再次触发
						lock: function() {
							stack = undefined;
							if ( !memory || memory === true ) {
								self.disable();
							}
							return this;
						},
						locked: function() {
							return !stack;
						},
						
						fireWith: function( context, args ) {
							if ( stack ) {
								//如果正在执行且不是 once 模式
								if ( firing ) {
									if ( !flags.once ) {
										stack.push( [ context, args ] );
									}
								//如果没有执行，并且不是触发过的 once 模式	
								} else if ( !( flags.once && memory ) ) {
									fire( context, args );
								}
							}
							
							return this;
						},
						fire: function() {
							self.fireWith( this, arguments );
							return this;
						},
						fired: function() {
							return !!memory;	
						}
					};
			
			return self;
		};
		
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


