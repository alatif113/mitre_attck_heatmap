define(["api/SplunkVisualizationBase","api/SplunkVisualizationUtils"], function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1),__webpack_require__(2),__webpack_require__(3),__webpack_require__(4),__webpack_require__(5),__webpack_require__(6),__webpack_require__(7),__webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function(t,a,e,r,n,i,c,s){return e.extend({initialize:function(){e.prototype.initialize.apply(this,arguments),this.$el=t(this.el),this.animate=!1,this.$el.addClass("mitre-container"),this.colorMap=[{pct:0,color:{r:99,g:190,b:123}},{pct:50,color:{r:255,g:213,b:132}},{pct:100,color:{r:248,g:105,b:107}}]},formatData:function(t){if(t.rows.length<1)return!1;if(t.rows[0].length<2)throw new e.VisualizationError("Search results must have at least 2 fields: id, count");return t},updateView:function(a,e){if(a){this.$el.empty();var o=this,l=this.colorMap,d=r.normalizeBoolean(e[this.getPropertyNamespaceInfo().propertyNamespace+"animate"]||"no"),m=e[this.getPropertyNamespaceInfo().propertyNamespace+"duration"]||300,p=r.getCurrentTheme(),u=e[this.getPropertyNamespaceInfo().propertyNamespace+"startColor"]||"#53a051",h=e[this.getPropertyNamespaceInfo().propertyNamespace+"midColor"]||"#f8be34",v=e[this.getPropertyNamespaceInfo().propertyNamespace+"endColor"]||"#dc4e41",f=e[this.getPropertyNamespaceInfo().propertyNamespace+"startVal"]||0,g=e[this.getPropertyNamespaceInfo().propertyNamespace+"endVal"]||100,b=e[this.getPropertyNamespaceInfo().propertyNamespace+"display"]||"id",_=r.escapeHtml(e[this.getPropertyNamespaceInfo().propertyNamespace+"legendTitle"])||a.fields[1].name,q=e[this.getPropertyNamespaceInfo().propertyNamespace+"sortKey"]||"data-id",y=e[this.getPropertyNamespaceInfo().propertyNamespace+"sortOrder"]||"asc",N=r.normalizeBoolean(e[this.getPropertyNamespaceInfo().propertyNamespace+"hideNull"]||"no"),w=r.normalizeBoolean(e[this.getPropertyNamespaceInfo().propertyNamespace+"showSubTechniques"]||"yes"),k=(e[this.getPropertyNamespaceInfo().propertyNamespace+"matrix"]||"enterprise::").split("::"),C=k[0],I=k[1].split(","),x={};o.animate=d,x="ics"==C?i:"mobile"==C?c:"d3fend"==C?s:n,this.$el.attr("class","").addClass(p),l[0].color=this._hexToRgb(u),l[1].color=this._hexToRgb(h),l[2].color=this._hexToRgb(v);var P=t('<div class="mtr-viz-container"></div>'),T=t('\n            <div class="mtr-legend">\n                <div class="mtr-legend-title">'+_+'</div>\n                <div class="mtr-legend-meter-container">    \n                    <div class="mtr-legend-meter"></div>\n                </div>\n                <div class="mtr-legend-val">\n                    <span>'+f+"</span>\n                    <span>"+(g-f)/2+"</span>\n                    <span>"+g+"</span>\n                </div>\n            </div>\n        "),M="(45deg, "+u+" 0%, "+h+" 50%, "+v+" 100%)";t(".mtr-legend-meter",T).css("background","-moz-linear-gradient"+M).css("background","-webkit-linear-gradient"+M).css("background","linear-gradient"+M),T.hover((function(){t(".mtr-legend-meter-container",this).append(t('<div class="mtr-legend-cursor"></div'))}),(function(){t(".mtr-legend-cursor").remove(),t(".mtr-technique").removeClass("focused").removeClass("defocused")}));if(T.mousemove((function(a){if(a.preventDefault(),Date.now()>100){var e=t(".mtr-legend-cursor",this),r=e.width(),n=t(this).width(),i=a.pageX-t(this).offset().left;if(i<=n&&i>0){var c=i-r/2;e.css("left",c+"px");var s=c/n*(g-f),l=(c+r)/n*(g-f);o._setAnimationClass(s,l)}}})),x.tactics.forEach((function(a){$tactic_col=t('<div class="mtr-tactic-col" data-id="'.concat(a.id,'" data-name="').concat(a.name,'" data-tactic="').concat(a.short_name,'">')),$tactic_col.appendTo(P).append('\n                    <div class="mtr-tactic">\n                        <div class="mtr-tactic-title">'.concat(a.name,'</div>\n                        <div class="mtr-meter-container">\n                            <div class="mtr-meter-fill">\n                                <div class="mtr-stats-container">\n                                    <div class="mtr-total mtr-stat">\n                                        <div class="mtr-stats-label">Total</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                    <div class="mtr-count mtr-stat">\n                                        <div class="mtr-stats-label">Unique Techniques</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                    <div class="mtr-mean mtr-stat">\n                                        <div class="mtr-stats-label">Average per Technique</div>\n                                        <div class="mtr-stats-val"></div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="mtr-technique-col"></div>\n            ')),t(".mtr-tactic-title",P).click((function(a){drilldown_data={mtr_tactic:t(this).parents(".mtr-tactic-col").attr("data-name")},o._drilldown(drilldown_data,a)}))})),x.techniques.forEach((function(a){if(""==I||!("platform"in a)||I.some((function(t){return a.platform.indexOf(t)>=0}))){var e="id"==b?a.id:a.name,r=t('\n                <div class="mtr-technique-container mtr-display-'.concat(b,'" data-id="').concat(a.id,'">\n                    <div class="mtr-technique" data-id="').concat(a.id,'" data-name="').concat(a.name,'" data-url="').concat(a.url,'">\n                        <span>').concat(e,'</span>\n                    </div>\n                    <div class="mtr-sub-technique-container mtr-display-').concat(b,'"></div>\n                </div>\n            '));a.tactics.forEach((function(a){r.clone().prependTo(t('.mtr-tactic-col[data-tactic="'.concat(a,'"] .mtr-technique-col'),P))}))}})),w&&x.sub_techniques.forEach((function(a){if(""==I||!("platform"in a)||I.some((function(t){return a.platform.indexOf(t)>=0}))){var e="id"==b?a.short_id:a.name;t('.mtr-technique-container[data-id="'.concat(a.technique,'"]'),P).each((function(){t(".mtr-sub-technique-container",t(this)).append('\n                        <div class="mtr-sub-technique mtr-display-'.concat(b,'" data-id="').concat(a.id,'" data-name="').concat(a.name,'" data-url="').concat(a.url,'">\n                            <span>').concat(e,"</span>\n                        </div>\n                    "))}))}})),a.rows.forEach((function(a){var e=r.escapeHtml(a[0]),n=r.escapeHtml(a[1]),i=t('.mtr-technique[data-id="'.concat(e,'"], .mtr-sub-technique[data-id="').concat(e,'"]'),P);if(i&&n&&""!=n&&null!=n&&!isNaN(n)){var c=o._getPercent(f,g,n),s=o._getColor(c),l=r.escapeHtml(a[2])||"";c<2&&(c=2),i.attr("data-value",n),i.attr("data-percent",c),i.attr("data-desc",l),i.css("background",s.background).css("color",s.foreground)}})),t(".mtr-technique, .mtr-sub-technique",P).hover((function(e){var r=t(this).attr("data-id"),n=t(this).attr("data-name"),i=parseInt(t(this).attr("data-percent"))||"",c=t(this).attr("data-desc")||"",s=parseInt(t(this).attr("data-value"))||"",l=t(this).attr("data-url")||"",d=o._getColor(i);i<2&&(i=2);var m=t('\n                <div class="mtr-technique-tooltip">\n                    <div class="mtr-id">'.concat(r,'</div>\n                    <div class="mtr-name">').concat(n,'</div>\n                    <div class="mtr-meter-container">\n                        <div class="mtr-meter-fill"></div>\n                    </div>\n                    <div class="mtr-label"></div>\n                    <div class="mtr-val">').concat(s,'</div>\n                    <div class="mtr-desc"></div>\n                    <div class="mtr-ref"><a target="_blank" href="').concat(l,'">').concat(l,' <i class="icon-external"></i></a></div>\n                </div>\n            '));t(this).offset().left>t(window).width()-400?m.addClass("mtr-technique-tooltip-left"):m.addClass("mtr-technique-tooltip-right");var p="",u=256;if(c.length>u){var h=c.substr(0,u),v=c.substr(u,c.length-u);h=h.split("\\n").join("</p><p>"),v=v.split("\\n").join("</p><p>"),p="<p>".concat(h,' <span class="more-elipses">...</span><span class="more-content">').concat(v,'</span><a href="#" class="more-link">Show more</a></p>')}else p=c.split("\\n").join("</p><p>");t(".mtr-desc",m).append(p),t(".more-link",m).click((function(){return t(".more-elipses",m).hide(),t(".more-content",m).show(),t(".more-link",m).hide(),!1})),m.appendTo(t(this)),s&&(t(".mtr-label",m).text(a.fields[1].name),t(".mtr-meter-fill",m).css("background",d.background).animate({width:t(this).attr("data-percent")+"%"},50,"linear"),d.luminance<.1&&t(".mtr-meter-container",m).addClass("dark"))}),(function(){t(".mtr-technique-tooltip").remove()})),t(".mtr-tactic-col",P).each((function(){var a=0,e=0,r=0;if(t(".mtr-technique",this).each((function(){var n=t(this).attr("data-value");n||!N?(r+=1,n&&!isNaN(n)&&(a+=+n,e+=1)):t(this).parent().remove()})),0==r&&N)t(this).remove();else{var n=Math.round(a/e),i=Math.round(e/r*100);n||(n=0),i||(i=0);var c=o._getPercent(f,g,n),s=o._getColor(c);c<2&&(c=2),t(this).attr("data-value",a),t(".mtr-tactic .mtr-meter-fill",this).css("background",s.background).css("color",s.foreground).css("width",c+"%"),t(".mtr-tactic .mtr-stat",this).css("background",s.background).css("color",s.foreground).css("border-color",s.foreground),t(".mtr-tactic .mtr-total .mtr-stats-val",this).text(a.toLocaleString()),t(".mtr-tactic .mtr-count .mtr-stats-val",this).text(e.toLocaleString()+" (".concat(i,"%)")),t(".mtr-tactic .mtr-mean .mtr-stats-val",this).text(n.toLocaleString())}})),t(".mtr-technique, .mtr-sub-technique, .mtr-tactic",P).each((function(){t(this).click((function(a){var e=t(this).closest(".mtr-tactic-col"),r=t(this).closest(".mtr-technique-container"),n=t(".mtr-technique",r),i=t(this).closest(".mtr-sub-technique"),c={};c["mtr_sub-technique_id"]=i.attr("data-id"),c.mtr_technique_id=n.attr("data-id"),c.mtr_tactic_id=e.attr("data-id"),c["mtr_sub-technique_name"]=i.attr("data-name"),c.mtr_technique_name=n.attr("data-name"),c.mtr_tactic_name=e.attr("data-name"),c["mtr_sub-technique_value"]=i.attr("data-value"),c.mtr_technique_value=n.attr("data-value"),c.mtr_tactic_value=e.attr("data-value"),o._drilldown(c,a)}))})),t(".mtr-technique-col",P).each((function(){o._sortElements(t(this),q,y),t(this).append('\n                <div class="mtr-technique-container mtr-placeholder mtr-display-'.concat(b,'">\n                    <div class="mtr-technique mtr-display-').concat(b,'">\n                        <div class="mtr-technique-title">T0000</div>\n                    </div>\n                </div>\n                <div class="mtr-technique-container mtr-placeholder mtr-display-').concat(b,'">\n                    <div class="mtr-technique mtr-placeholder mtr-display-').concat(b,'">\n                        <div class="mtr-technique-title">T0000</div>\n                    </div>\n                </div>\n            '))})),P.appendTo(this.$el),T.appendTo(this.$el),o.animate){var V=(g-f)/m/60,A=.1*(g-f),E=0;window.requestAnimationFrame((function a(){var e=E,r=e+V+A;o._setAnimationClass(e,r),e<g?E+=V:E=0,o.animate?window.requestAnimationFrame(a):t(".mtr-technique").removeClass("focused").removeClass("defocused")}))}}},getInitialDataParams:function(){return{outputMode:e.ROW_MAJOR_OUTPUT_MODE}},reflow:function(){},_setAnimationClass:function(a,e){t(".mtr-technique").each((function(){var r=t(this).attr("data-value");r&&r>=a&&r<=e?t(this).addClass("focused").removeClass("defocused"):t(this).removeClass("focused").addClass("defocused")}))},_getPercent:function(t,a,e){var r=Math.round(100*(e-t)/(a-t));return r>100&&(r=100),r<0&&(r=0),r},_hexToRgb:function(t){var a=0,e=0,r=0;return 4==t.length?(a="0x"+t[1]+t[1],e="0x"+t[2]+t[2],r="0x"+t[3]+t[3]):7==t.length&&(a="0x"+t[1]+t[2],e="0x"+t[3]+t[4],r="0x"+t[5]+t[6]),{r:a,g:e,b:r}},_getColor:function(t){for(var a=1;a<this.colorMap.length-1&&!(t<this.colorMap[a].pct);a++);var e=this.colorMap[a-1],r=this.colorMap[a],n=r.pct-e.pct,i=(t-e.pct)/n,c=1-i,s=i,o={r:Math.floor(e.color.r*c+r.color.r*s),g:Math.floor(e.color.g*c+r.color.g*s),b:Math.floor(e.color.b*c+r.color.b*s)},l=(.299*o.r+.587*o.g+.114*o.b)/255,d=l>.65?"rgb(0,0,0)":"rgb(255,255,255)";return{background:"rgb("+[o.r,o.g,o.b].join(",")+")",luminance:l,foreground:d}},_sortElements:function(a,e,r){var n="asc"==r?1:-1;$children=a.children().sort((function(a,r){var i=t(".mtr-technique",t(a)),c=t(".mtr-technique",t(r));return"data-id"==e||"data-name"==e?n*(i.attr(e)<c.attr(e)?-1:1):"data-value"==e?(aVal=parseInt(i.attr(e)),bVal=parseInt(c.attr(e)),Number.isInteger(aVal)||(aVal=-1),Number.isInteger(bVal)||(bVal=-1),n*(aVal<bVal?-1:1)):0})),a.append($children)},_drilldown:function(t,a){this.drilldown({action:e.FIELD_VALUE_DRILLDOWN,data:t},a)}})}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.6.0
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright OpenJS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2021-03-02T17:08Z
	 */
	( function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var flat = arr.flat ? function( array ) {
		return arr.flat.call( array );
	} : function( array ) {
		return arr.concat.apply( [], array );
	};


	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};

	var isFunction = function isFunction( obj ) {

			// Support: Chrome <=57, Firefox <=52
			// In some browsers, typeof returns "function" for HTML <object> elements
			// (i.e., `typeof document.createElement( "object" ) === "function"`).
			// We don't want to classify *any* DOM node as a function.
			// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
			// Plus for old WebKit, typeof returns "function" for HTML collections
			// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
			return typeof obj === "function" && typeof obj.nodeType !== "number" &&
				typeof obj.item !== "function";
		};


	var isWindow = function isWindow( obj ) {
			return obj != null && obj === obj.window;
		};


	var document = window.document;



		var preservedScriptAttributes = {
			type: true,
			src: true,
			nonce: true,
			noModule: true
		};

		function DOMEval( code, node, doc ) {
			doc = doc || document;

			var i, val,
				script = doc.createElement( "script" );

			script.text = code;
			if ( node ) {
				for ( i in preservedScriptAttributes ) {

					// Support: Firefox 64+, Edge 18+
					// Some browsers don't support the "nonce" property on scripts.
					// On the other hand, just using `getAttribute` is not enough as
					// the `nonce` attribute is reset to an empty string whenever it
					// becomes browsing-context connected.
					// See https://github.com/whatwg/html/issues/2369
					// See https://html.spec.whatwg.org/#nonce-attributes
					// The `node.getAttribute` check was added for the sake of
					// `jQuery.globalEval` so that it can fake a nonce-containing node
					// via an object.
					val = node[ i ] || node.getAttribute && node.getAttribute( i );
					if ( val ) {
						script.setAttribute( i, val );
					}
				}
			}
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}


	function toType( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var
		version = "3.6.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		even: function() {
			return this.pushStack( jQuery.grep( this, function( _elem, i ) {
				return ( i + 1 ) % 2;
			} ) );
		},

		odd: function() {
			return this.pushStack( jQuery.grep( this, function( _elem, i ) {
				return i % 2;
			} ) );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					copy = options[ name ];

					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if ( name === "__proto__" || target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = Array.isArray( copy ) ) ) ) {
						src = target[ name ];

						// Ensure proper type for the source value
						if ( copyIsArray && !Array.isArray( src ) ) {
							clone = [];
						} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
							clone = {};
						} else {
							clone = src;
						}
						copyIsArray = false;

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		// Evaluates a script in a provided context; falls back to the global one
		// if not specified.
		globalEval: function( code, options, doc ) {
			DOMEval( code, { nonce: options && options.nonce }, doc );
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
							[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return flat( ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
		function( _i, name ) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = toType( obj );

		if ( isFunction( obj ) || isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.6
	 * https://sizzlejs.com/
	 *
	 * Copyright JS Foundation and other contributors
	 * Released under the MIT license
	 * https://js.foundation/
	 *
	 * Date: 2021-02-16
	 */
	( function( window ) {
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		nonnativeSelectorCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// Instance methods
		hasOwn = ( {} ).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		pushNative = arr.push,
		push = arr.push,
		slice = arr.slice,

		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[ i ] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
			"ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
		identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
			"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +

			// "Attribute values must be CSS identifiers [capture 5]
			// or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
			whitespace + "*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +

			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
			whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
			"*" ),
		rdescend = new RegExp( whitespace + "|>" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace +
				"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
				"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rhtml = /HTML$/i,
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
		funescape = function( escape, nonHex ) {
			var high = "0x" + escape.slice( 1 ) - 0x10000;

			return nonHex ?

				// Strip the backslash prefix from a non-hex escape sequence
				nonHex :

				// Replace a hexadecimal escape sequence with the encoded Unicode code point
				// Support: IE <=11+
				// For values outside the Basic Multilingual Plane (BMP), manually construct a
				// surrogate pair
				high < 0 ?
					String.fromCharCode( high + 0x10000 ) :
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" +
					ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},

		inDisabledFieldset = addCombinator(
			function( elem ) {
				return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			( arr = slice.call( preferredDoc.childNodes ) ),
			preferredDoc.childNodes
		);

		// Support: Android<4.0
		// Detect silently failing push.apply
		// eslint-disable-next-line no-unused-expressions
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				pushNative.apply( target, slice.call( els ) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;

				// Can't trust NodeList.length
				while ( ( target[ j++ ] = els[ i++ ] ) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
			setDocument( context );
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

					// ID selector
					if ( ( m = match[ 1 ] ) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( ( elem = context.getElementById( m ) ) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && ( elem = newContext.getElementById( m ) ) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[ 2 ] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!nonnativeSelectorCache[ selector + " " ] &&
					( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

					// Support: IE 8 only
					// Exclude object elements
					( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

					newSelector = selector;
					newContext = context;

					// qSA considers elements outside a scoping root when evaluating child or
					// descendant combinators, which is not what we want.
					// In such cases, we work around the behavior by prefixing every selector in the
					// list with an ID selector referencing the scope context.
					// The technique has to be used as well when a leading combinator is used
					// as such selectors are not recognized by querySelectorAll.
					// Thanks to Andrew Dupont for this technique.
					if ( nodeType === 1 &&
						( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;

						// We can use :scope instead of the ID hack if the browser
						// supports it & if we're not changing the context.
						if ( newContext !== context || !support.scope ) {

							// Capture the context ID, setting it first if necessary
							if ( ( nid = context.getAttribute( "id" ) ) ) {
								nid = nid.replace( rcssescape, fcssescape );
							} else {
								context.setAttribute( "id", ( nid = expando ) );
							}
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
								toSelector( groups[ i ] );
						}
						newSelector = groups.join( "," );
					}

					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
						nonnativeSelectorCache( selector, true );
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {

			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {

				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return ( cache[ key + " " ] = value );
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement( "fieldset" );

		try {
			return !!fn( el );
		} catch ( e ) {
			return false;
		} finally {

			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}

			// release memory in IE
			el = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split( "|" ),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[ i ] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( ( cur = cur.nextSibling ) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return ( name === "input" || name === "button" ) && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {

					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
				}

				return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction( function( argument ) {
			argument = +argument;
			return markFunction( function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
						seed[ j ] = !( matches[ j ] = seed[ j ] );
					}
				}
			} );
		} );
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Support: IE <=8
		// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
		// https://bugs.jquery.com/ticket/4833
		return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9 - 11+, Edge 12 - 18+
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( preferredDoc != document &&
			( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}

		// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
		// Safari 4 - 5 only, Opera <=11.6 - 12.x only
		// IE/Edge & older browsers don't support the :scope pseudo-class.
		// Support: Safari 6.0 only
		// Safari 6.0 supports :scope but it's an alias of :root there.
		support.scope = assert( function( el ) {
			docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
			return typeof el.querySelectorAll !== "undefined" &&
				!el.querySelectorAll( ":scope fieldset div" ).length;
		} );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert( function( el ) {
			el.className = "i";
			return !el.getAttribute( "className" );
		} );

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert( function( el ) {
			el.appendChild( document.createComment( "" ) );
			return !el.getElementsByTagName( "*" ).length;
		} );

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert( function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		} );

		// ID filter and find
		if ( support.getById ) {
			Expr.filter[ "ID" ] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute( "id" ) === attrId;
				};
			};
			Expr.find[ "ID" ] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter[ "ID" ] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode( "id" );
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find[ "ID" ] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );

					if ( elem ) {

						// Verify the id attribute
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( ( elem = elems[ i++ ] ) ) {
							node = elem.getAttributeNode( "id" );
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find[ "TAG" ] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,

					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( ( elem = results[ i++ ] ) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert( function( el ) {

				var input;

				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll( "[selected]" ).length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push( "~=" );
				}

				// Support: IE 11+, Edge 15 - 18+
				// IE 11/Edge don't find elements on a `[name='']` query in some cases.
				// Adding a temporary attribute to the document before the selection works
				// around the issue.
				// Interestingly, IE 10 & older don't seem to have the issue.
				input = document.createElement( "input" );
				input.setAttribute( "name", "" );
				el.appendChild( input );
				if ( !el.querySelectorAll( "[name='']" ).length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
						whitespace + "*(?:''|\"\")" );
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll( ":checked" ).length ) {
					rbuggyQSA.push( ":checked" );
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push( ".#.+[+~]" );
				}

				// Support: Firefox <=3.6 - 5 only
				// Old Firefox doesn't throw on a badly-escaped identifier.
				el.querySelectorAll( "\\\f" );
				rbuggyQSA.push( "[\\r\\n\\f]" );
			} );

			assert( function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement( "input" );
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll( "[name=d]" ).length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: Opera 10 - 11 only
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll( "*,:x" );
				rbuggyQSA.push( ",.*:" );
			} );
		}

		if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector ) ) ) ) {

			assert( function( el ) {

				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			} );
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				) );
			} :
			function( a, b ) {
				if ( b ) {
					while ( ( b = b.parentNode ) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

				// Choose the first element that is related to our preferred document
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ( a == document || a.ownerDocument == preferredDoc &&
					contains( preferredDoc, a ) ) {
					return -1;
				}

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ( b == document || b.ownerDocument == preferredDoc &&
					contains( preferredDoc, b ) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {

			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				/* eslint-disable eqeqeq */
				return a == document ? -1 :
					b == document ? 1 :
					/* eslint-enable eqeqeq */
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( ( cur = cur.parentNode ) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( ( cur = cur.parentNode ) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[ i ] === bp[ i ] ) {
				i++;
			}

			return i ?

				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[ i ], bp[ i ] ) :

				// Otherwise nodes in our document sort first
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				/* eslint-disable eqeqeq */
				ap[ i ] == preferredDoc ? -1 :
				bp[ i ] == preferredDoc ? 1 :
				/* eslint-enable eqeqeq */
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		setDocument( elem );

		if ( support.matchesSelector && documentIsHTML &&
			!nonnativeSelectorCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch ( e ) {
				nonnativeSelectorCache( expr, true );
			}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( ( context.ownerDocument || context ) != document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( ( elem.ownerDocument || elem ) != document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
	};

	Sizzle.escape = function( sel ) {
		return ( sel + "" ).replace( rcssescape, fcssescape );
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( ( elem = results[ i++ ] ) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {

				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[ 1 ] = match[ 1 ].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
					match[ 5 ] || "" ).replace( runescape, funescape );

				if ( match[ 2 ] === "~=" ) {
					match[ 3 ] = " " + match[ 3 ] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {

				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[ 1 ] = match[ 1 ].toLowerCase();

				if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

					// nth-* requires argument
					if ( !match[ 3 ] ) {
						Sizzle.error( match[ 0 ] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[ 4 ] = +( match[ 4 ] ?
						match[ 5 ] + ( match[ 6 ] || 1 ) :
						2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
					match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

					// other types prohibit arguments
				} else if ( match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[ 6 ] && match[ 2 ];

				if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[ 3 ] ) {
					match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&

					// Get excess from tokenize (recursively)
					( excess = tokenize( unquoted, true ) ) &&

					// advance to the next closing parenthesis
					( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

					// excess is a negative index
					match[ 0 ] = match[ 0 ].slice( 0, excess );
					match[ 2 ] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() {
						return true;
					} :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					( pattern = new RegExp( "(^|" + whitespace +
						")" + className + "(" + whitespace + "|$)" ) ) && classCache(
							className, function( elem ) {
								return pattern.test(
									typeof elem.className === "string" && elem.className ||
									typeof elem.getAttribute !== "undefined" &&
										elem.getAttribute( "class" ) ||
									""
								);
					} );
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					/* eslint-disable max-len */

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
					/* eslint-enable max-len */

				};
			},

			"CHILD": function( type, what, _argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, _context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( ( node = node[ dir ] ) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}

									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( ( node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {

								// Use previously-cached element index if available
								if ( useCache ) {

									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || ( node[ expando ] = {} );

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										( outerCache[ node.uniqueID ] = {} );

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {

									// Use the same loop as above to seek `elem` from the start
									while ( ( node = ++nodeIndex && node && node[ dir ] ||
										( diff = nodeIndex = 0 ) || start.pop() ) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] ||
													( node[ expando ] = {} );

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													( outerCache[ node.uniqueID ] = {} );

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {

				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction( function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[ i ] );
								seed[ idx ] = !( matches[ idx ] = matched[ i ] );
							}
						} ) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {

			// Potentially complex pseudos
			"not": markFunction( function( selector ) {

				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction( function( seed, matches, _context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( ( elem = unmatched[ i ] ) ) {
								seed[ i ] = !( matches[ i ] = elem );
							}
						}
					} ) :
					function( elem, _context, xml ) {
						input[ 0 ] = elem;
						matcher( input, null, xml, results );

						// Don't keep the element (issue #299)
						input[ 0 ] = null;
						return !results.pop();
					};
			} ),

			"has": markFunction( function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			} ),

			"contains": markFunction( function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
				};
			} ),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {

				// lang value must be a valid identifier
				if ( !ridentifier.test( lang || "" ) ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( ( elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
					return false;
				};
			} ),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement &&
					( !document.hasFocus || document.hasFocus() ) &&
					!!( elem.type || elem.href || ~elem.tabIndex );
			},

			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),

			"checked": function( elem ) {

				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return ( nodeName === "input" && !!elem.checked ) ||
					( nodeName === "option" && !!elem.selected );
			},

			"selected": function( elem ) {

				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					// eslint-disable-next-line no-unused-expressions
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {

				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos[ "empty" ]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( ( attr = elem.getAttribute( "type" ) ) == null ||
						attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo( function() {
				return [ 0 ];
			} ),

			"last": createPositionalPseudo( function( _matchIndexes, length ) {
				return [ length - 1 ];
			} ),

			"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			} ),

			"even": createPositionalPseudo( function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			"odd": createPositionalPseudo( function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
				var i = argument < 0 ?
					argument + length :
					argument > length ?
						length :
						argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} )
		}
	};

	Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
				if ( match ) {

					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[ 0 ].length ) || soFar;
				}
				groups.push( ( tokens = [] ) );
			}

			matched = false;

			// Combinators
			if ( ( match = rcombinators.exec( soFar ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,

					// Cast descendant combinators to space
					type: match[ 0 ].replace( rtrim, " " )
				} );
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
					( match = preFilters[ type ]( match ) ) ) ) {
					matched = match.shift();
					tokens.push( {
						value: matched,
						type: type,
						matches: match
					} );
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :

				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[ i ].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?

			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( ( elem = elem[ dir ] ) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( ( elem = elem[ dir ] ) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || ( elem[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] ||
								( outerCache[ elem.uniqueID ] = {} );

							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( ( oldCache = uniqueCache[ key ] ) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return ( newCache[ 2 ] = oldCache[ 2 ] );
							} else {

								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[ i ]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[ 0 ];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[ i ], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( ( elem = unmatched[ i ] ) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction( function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts(
					selector || "*",
					context.nodeType ? [ context ] : context,
					[]
				),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?

					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( ( elem = temp[ i ] ) ) {
						matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {

						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( ( elem = matcherOut[ i ] ) ) {

								// Restore matcherIn since elem is not yet a final match
								temp.push( ( matcherIn[ i ] = elem ) );
							}
						}
						postFinder( null, ( matcherOut = [] ), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) &&
							( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

							seed[ temp ] = !( results[ temp ] = elem );
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		} );
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[ 0 ].type ],
			implicitRelative = leadingRelative || Expr.relative[ " " ],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					( checkContext = context ).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );

				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
				matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
			} else {
				matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {

					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[ j ].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens
							.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,

					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
					len = elems.length;

				if ( outermost ) {

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					outermostContext = context == document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;

						// Support: IE 11+, Edge 17 - 18+
						// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
						// two documents; shallow comparisons work.
						// eslint-disable-next-line eqeqeq
						if ( !context && elem.ownerDocument != document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( ( matcher = elementMatchers[ j++ ] ) ) {
							if ( matcher( elem, context || document, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {

						// They will have gone through all possible matchers
						if ( ( elem = !matcher && elem ) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( ( matcher = setMatchers[ j++ ] ) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {

						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
									setMatched[ i ] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {

			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[ i ] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache(
				selector,
				matcherFromGroupMatchers( elementMatchers, setMatchers )
			);

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( ( selector = compiled.selector || selector ) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[ 0 ] = match[ 0 ].slice( 0 );
			if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

				context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
					.replace( runescape, funescape ), context ) || [] )[ 0 ];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[ i ];

				// Abort if we hit a combinator
				if ( Expr.relative[ ( type = token.type ) ] ) {
					break;
				}
				if ( ( find = Expr.find[ type ] ) ) {

					// Search, expanding context for leading sibling combinators
					if ( ( seed = find(
						token.matches[ 0 ].replace( runescape, funescape ),
						rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
							context
					) ) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert( function( el ) {

		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
	} );

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert( function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute( "href" ) === "#";
	} ) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		} );
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert( function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	} ) ) {
		addHandle( "value", function( elem, _name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		} );
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert( function( el ) {
		return el.getAttribute( "disabled" ) == null;
	} ) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
					( val = elem.getAttributeNode( name ) ) && val.specified ?
						val.value :
						null;
			}
		} );
	}

	return Sizzle;

	} )( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;




	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;



	function nodeName( elem, name ) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

	}
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}

		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}

		// Filtered directly for both simple and complex selectors
		return jQuery.filter( qualifier, elements, not );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}

		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, _i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, _i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, _i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			if ( elem.contentDocument != null &&

				// Support: IE 11+
				// <object> elements with no `data` attribute has an object
				// `contentDocument` with a `null` prototype.
				getProto( elem.contentDocument ) ) {

				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if ( nodeName( elem, "template" ) ) {
				elem = elem.content || elem;
			}

			return jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = locked || options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && toType( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject, noValue ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply( undefined, [ value ].slice( noValue ) );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply( undefined, [ value ] );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( _i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// rejected_handlers.disable
						// fulfilled_handlers.disable
						tuples[ 3 - i ][ 3 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock,

						// progress_handlers.lock
						tuples[ 0 ][ 3 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the primary Deferred
				primary = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							primary.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
					!remaining );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( primary.state() === "pending" ||
					isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return primary.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
			}

			return primary.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function( error, stack ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( toType( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, _key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
							value :
							value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		if ( chainable ) {
			return elems;
		}

		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}

		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};


	// Matches dashed string for camelizing
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g;

	// Used by camelCase as callback to replace()
	function fcamelCase( _all, letter ) {
		return letter.toUpperCase();
	}

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	function camelCase( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	}
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( Array.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( camelCase );
				} else {
					key = camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}

		if ( data === "false" ) {
			return false;
		}

		if ( data === "null" ) {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}

		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}

		return data;
	}

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || Array.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var documentElement = document.documentElement;



		var isAttached = function( elem ) {
				return jQuery.contains( elem.ownerDocument, elem );
			},
			composed = { composed: true };

		// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
		// Check attachment across shadow DOM boundaries when possible (gh-3504)
		// Support: iOS 10.0-10.2 only
		// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
		// leading to errors. We need to check for `getRootNode`.
		if ( documentElement.getRootNode ) {
			isAttached = function( elem ) {
				return jQuery.contains( elem.ownerDocument, elem ) ||
					elem.getRootNode( composed ) === elem.ownerDocument;
			};
		}
	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				isAttached( elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted, scale,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = elem.nodeType &&
				( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Support: Firefox <=54
			// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
			initial = initial / 2;

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			while ( maxIterations-- ) {

				// Evaluate and update our best guess (doubling guesses that zero out).
				// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
				jQuery.style( elem, prop, initialInUnit + unit );
				if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;

			}

			initialInUnit = initialInUnit * 2;
			jQuery.style( elem, prop, initialInUnit + unit );

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

	var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

		// Support: IE <=9 only
		// IE <=9 replaces <option> tags with their contents when inserted outside of
		// the select element.
		div.innerHTML = "<option></option>";
		support.option = !!div.lastChild;
	} )();


	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: IE <=9 only
	if ( !support.option ) {
		wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
	}


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );

		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );

		} else {
			ret = [];
		}

		if ( tag === undefined || tag && nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}

		return ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, attached, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( toType( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			attached = isAttached( elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( attached ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 - 11+
	// focus() and blur() are asynchronous, except when they are no-op.
	// So expect focus to be synchronous when the element is already active,
	// and blur to be synchronous when the element is not already active.
	// (focus and blur are always synchronous in other supported browsers,
	// this just defines when we can count on it).
	function expectSync( elem, type ) {
		return ( elem === safeActiveElement() ) === ( type === "focus" );
	}

	// Support: IE <=9 only
	// Accessing document.activeElement can throw unexpectedly
	// https://bugs.jquery.com/ticket/13393
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Only attach events to objects that accept data
			if ( !acceptData( elem ) ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = Object.create( null );
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),

				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix( nativeEvent ),

				handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// If the event is namespaced, then each handler is only invoked if it is
					// specially universal or its namespaces are a superset of the event's.
					if ( !event.rnamespace || handleObj.namespace === false ||
						event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			if ( delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
							return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
							return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			click: {

				// Utilize native event to ensure correct state for checkable inputs
				setup: function( data ) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;

					// Claim the first handler
					if ( rcheckableType.test( el.type ) &&
						el.click && nodeName( el, "input" ) ) {

						// dataPriv.set( el, "click", ... )
						leverageNative( el, "click", returnTrue );
					}

					// Return false to allow normal processing in the caller
					return false;
				},
				trigger: function( data ) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;

					// Force setup before triggering a click
					if ( rcheckableType.test( el.type ) &&
						el.click && nodeName( el, "input" ) ) {

						leverageNative( el, "click" );
					}

					// Return non-false to allow normal event-path propagation
					return true;
				},

				// For cross-browser consistency, suppress native .click() on links
				// Also prevent it if we're currently inside a leveraged native-event stack
				_default: function( event ) {
					var target = event.target;
					return rcheckableType.test( target.type ) &&
						target.click && nodeName( target, "input" ) &&
						dataPriv.get( target, "click" ) ||
						nodeName( target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	// Ensure the presence of an event listener that handles manually-triggered
	// synthetic events by interrupting progress until reinvoked in response to
	// *native* events that it fires directly, ensuring that state changes have
	// already occurred before other listeners are invoked.
	function leverageNative( el, type, expectSync ) {

		// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
		if ( !expectSync ) {
			if ( dataPriv.get( el, type ) === undefined ) {
				jQuery.event.add( el, type, returnTrue );
			}
			return;
		}

		// Register the controller as a special universal handler for all event namespaces
		dataPriv.set( el, type, false );
		jQuery.event.add( el, type, {
			namespace: false,
			handler: function( event ) {
				var notAsync, result,
					saved = dataPriv.get( this, type );

				if ( ( event.isTrigger & 1 ) && this[ type ] ) {

					// Interrupt processing of the outer synthetic .trigger()ed event
					// Saved data should be false in such cases, but might be a leftover capture object
					// from an async native handler (gh-4350)
					if ( !saved.length ) {

						// Store arguments for use when handling the inner native event
						// There will always be at least one argument (an event object), so this array
						// will not be confused with a leftover capture object.
						saved = slice.call( arguments );
						dataPriv.set( this, type, saved );

						// Trigger the native event and capture its result
						// Support: IE <=9 - 11+
						// focus() and blur() are asynchronous
						notAsync = expectSync( this, type );
						this[ type ]();
						result = dataPriv.get( this, type );
						if ( saved !== result || notAsync ) {
							dataPriv.set( this, type, false );
						} else {
							result = {};
						}
						if ( saved !== result ) {

							// Cancel the outer synthetic event
							event.stopImmediatePropagation();
							event.preventDefault();

							// Support: Chrome 86+
							// In Chrome, if an element having a focusout handler is blurred by
							// clicking outside of it, it invokes the handler synchronously. If
							// that handler calls `.remove()` on the element, the data is cleared,
							// leaving `result` undefined. We need to guard against this.
							return result && result.value;
						}

					// If this is an inner synthetic event for an event with a bubbling surrogate
					// (focus or blur), assume that the surrogate already propagated from triggering the
					// native event and prevent that from happening again here.
					// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
					// bubbling surrogate propagates *after* the non-bubbling base), but that seems
					// less bad than duplication.
					} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
						event.stopPropagation();
					}

				// If this is a native event triggered above, everything is now in order
				// Fire an inner synthetic event with the original arguments
				} else if ( saved.length ) {

					// ...and capture the result
					dataPriv.set( this, type, {
						value: jQuery.event.trigger(

							// Support: IE <=9 - 11+
							// Extend with the prototype to reset the above stopImmediatePropagation()
							jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
							saved.slice( 1 ),
							this
						)
					} );

					// Abort handling of the native event
					event.stopImmediatePropagation();
				}
			}
		} );
	}

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		code: true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
		which: true
	}, jQuery.event.addProp );

	jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
		jQuery.event.special[ type ] = {

			// Utilize native event if possible so blur/focus sequence is correct
			setup: function() {

				// Claim the first handler
				// dataPriv.set( this, "focus", ... )
				// dataPriv.set( this, "blur", ... )
				leverageNative( this, type, expectSync );

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function() {

				// Force setup before trigger
				leverageNative( this, type );

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// Suppress native focus or blur as it's already being fired
			// in leverageNative.
			_default: function() {
				return true;
			},

			delegateType: delegateType
		};
	} );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		// Support: IE <=10 - 11, Edge 12 - 13 only
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget( elem, content ) {
		if ( nodeName( elem, "table" ) &&
			nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
			elem.type = elem.type.slice( 5 );
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.get( src );
			events = pdataOld.events;

			if ( events ) {
				dataPriv.remove( dest, "handle events" );

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = flat( args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			valueIsFunction = isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( valueIsFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( valueIsFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl && !node.noModule ) {
									jQuery._evalUrl( node.src, {
										nonce: node.nonce || node.getAttribute( "nonce" )
									}, doc );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && isAttached( node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html;
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = isAttached( elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
				"margin-top:1px;padding:0;border:0";
			div.style.cssText =
				"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
				"margin:auto;border:1px;padding:1px;" +
				"width:60%;top:1%";
			documentElement.appendChild( container ).appendChild( div );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

			// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
			// Some styles come back with percentage values, even though they shouldn't
			div.style.right = "60%";
			pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

			// Support: IE 9 - 11 only
			// Detect misreporting of content dimensions for box-sizing:border-box elements
			boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

			// Support: IE 9 only
			// Detect overflow:scroll screwiness (gh-3699)
			// Support: Chrome <=64
			// Don't get tricked when zoom affects offsetWidth (gh-4029)
			div.style.position = "absolute";
			scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		function roundPixelMeasures( measure ) {
			return Math.round( parseFloat( measure ) );
		}

		var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
			reliableTrDimensionsVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		jQuery.extend( support, {
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function() {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function() {
				computeStyleTests();
				return scrollboxSizeVal;
			},

			// Support: IE 9 - 11+, Edge 15 - 18+
			// IE/Edge misreport `getComputedStyle` of table rows with width/height
			// set in CSS while `offset*` properties report correct values.
			// Behavior in IE 9 is more subtle than in newer versions & it passes
			// some versions of this test; make sure not to make it pass there!
			//
			// Support: Firefox 70+
			// Only Firefox includes border widths
			// in computed dimensions. (gh-4529)
			reliableTrDimensions: function() {
				var table, tr, trChild, trStyle;
				if ( reliableTrDimensionsVal == null ) {
					table = document.createElement( "table" );
					tr = document.createElement( "tr" );
					trChild = document.createElement( "div" );

					table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
					tr.style.cssText = "border:1px solid";

					// Support: Chrome 86+
					// Height set through cssText does not get applied.
					// Computed height then comes back as 0.
					tr.style.height = "1px";
					trChild.style.height = "9px";

					// Support: Android 8 Chrome 86+
					// In our bodyBackground.html iframe,
					// display for all div elements is set to "inline",
					// which causes a problem only in Android 8 Chrome 86.
					// Ensuring the div is display: block
					// gets around this issue.
					trChild.style.display = "block";

					documentElement
						.appendChild( table )
						.appendChild( tr )
						.appendChild( trChild );

					trStyle = window.getComputedStyle( tr );
					reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
						parseInt( trStyle.borderTopWidth, 10 ) +
						parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

					documentElement.removeChild( table );
				}
				return reliableTrDimensionsVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,

			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, #12537)
		//   .css('--customProperty) (#3144)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !isAttached( elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style,
		vendorProps = {};

	// Return a vendor-prefixed property or undefined
	function vendorPropName( name ) {

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
	function finalPropName( name ) {
		var final = jQuery.cssProps[ name ] || vendorProps[ name ];

		if ( final ) {
			return final;
		}
		if ( name in emptyStyle ) {
			return name;
		}
		return vendorProps[ name ] = vendorPropName( name ) || name;
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rcustomProp = /^--/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function setPositiveNumber( _elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
		var i = dimension === "width" ? 1 : 0,
			extra = 0,
			delta = 0;

		// Adjustment may not be necessary
		if ( box === ( isBorderBox ? "border" : "content" ) ) {
			return 0;
		}

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin
			if ( box === "margin" ) {
				delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
			}

			// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
			if ( !isBorderBox ) {

				// Add padding
				delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// For "border" or "margin", add border
				if ( box !== "padding" ) {
					delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

				// But still keep track of it otherwise
				} else {
					extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}

			// If we get here with a border-box (content + padding + border), we're seeking "content" or
			// "padding" or "margin"
			} else {

				// For "content", subtract padding
				if ( box === "content" ) {
					delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// For "content" or "padding", subtract border
				if ( box !== "margin" ) {
					delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		// Account for positive content-box scroll gutter when requested by providing computedVal
		if ( !isBorderBox && computedVal >= 0 ) {

			// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
			// Assuming integer scroll gutter, subtract the rest and round down
			delta += Math.max( 0, Math.ceil(
				elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
				computedVal -
				delta -
				extra -
				0.5

			// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
			// Use an explicit zero to avoid NaN (gh-3964)
			) ) || 0;
		}

		return delta;
	}

	function getWidthOrHeight( elem, dimension, extra ) {

		// Start with computed style
		var styles = getStyles( elem ),

			// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
			// Fake content-box until we know it's needed to know the true value.
			boxSizingNeeded = !support.boxSizingReliable() || extra,
			isBorderBox = boxSizingNeeded &&
				jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
			valueIsBorderBox = isBorderBox,

			val = curCSS( elem, dimension, styles ),
			offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

		// Support: Firefox <=54
		// Return a confounding non-pixel value or feign ignorance, as appropriate.
		if ( rnumnonpx.test( val ) ) {
			if ( !extra ) {
				return val;
			}
			val = "auto";
		}


		// Support: IE 9 - 11 only
		// Use offsetWidth/offsetHeight for when box sizing is unreliable.
		// In those cases, the computed value can be trusted to be border-box.
		if ( ( !support.boxSizingReliable() && isBorderBox ||

			// Support: IE 10 - 11+, Edge 15 - 18+
			// IE/Edge misreport `getComputedStyle` of table rows with width/height
			// set in CSS while `offset*` properties report correct values.
			// Interestingly, in some cases IE 9 doesn't suffer from this issue.
			!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

			// Fall back to offsetWidth/offsetHeight when value is "auto"
			// This happens for inline elements with no explicit setting (gh-3571)
			val === "auto" ||

			// Support: Android <=4.1 - 4.3 only
			// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
			!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

			// Make sure the element is visible & connected
			elem.getClientRects().length ) {

			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

			// Where available, offsetWidth/offsetHeight approximate border box dimensions.
			// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
			// retrieved value as a content box dimension.
			valueIsBorderBox = offsetProp in elem;
			if ( valueIsBorderBox ) {
				val = elem[ offsetProp ];
			}
		}

		// Normalize "" and auto
		val = parseFloat( val ) || 0;

		// Adjust for the element's box model
		return ( val +
			boxModelAdjustment(
				elem,
				dimension,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles,

				// Provide the current computed size to request scroll gutter calculation (gh-3589)
				val
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"gridArea": true,
			"gridColumn": true,
			"gridColumnEnd": true,
			"gridColumnStart": true,
			"gridRow": true,
			"gridRowEnd": true,
			"gridRowStart": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name ),
				style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
				// "px" to a few hardcoded values.
				if ( type === "number" && !isCustomProp ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					if ( isCustomProp ) {
						style.setProperty( name, value );
					} else {
						style[ name ] = value;
					}
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name );

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}

			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( _i, dimension ) {
		jQuery.cssHooks[ dimension ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = getStyles( elem ),

					// Only read styles.position if the test has a chance to fail
					// to avoid forcing a reflow.
					scrollboxSizeBuggy = !support.scrollboxSize() &&
						styles.position === "absolute",

					// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
					boxSizingNeeded = scrollboxSizeBuggy || extra,
					isBorderBox = boxSizingNeeded &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					subtract = extra ?
						boxModelAdjustment(
							elem,
							dimension,
							extra,
							isBorderBox,
							styles
						) :
						0;

				// Account for unreliable border-box dimensions by comparing offset* to computed and
				// faking a content-box to get border and padding (gh-3699)
				if ( isBorderBox && scrollboxSizeBuggy ) {
					subtract -= Math.ceil(
						elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
						parseFloat( styles[ dimension ] ) -
						boxModelAdjustment( elem, dimension, "border", false, styles ) -
						0.5
					);
				}

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ dimension ] = value;
					value = jQuery.css( elem, dimension );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
				) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( prefix !== "margin" ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( Array.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
						tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function schedule() {
		if ( inProgress ) {
			if ( document.hidden === false && window.requestAnimationFrame ) {
				window.requestAnimationFrame( schedule );
			} else {
				window.setTimeout( schedule, jQuery.fx.interval );
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = Date.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 15
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY and Edge just mirrors
			// the overflowX value there.
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( Array.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				// If there's more to do, yield
				if ( percent < 1 && length ) {
					return remaining;
				}

				// If this was an empty animation, synthesize a final progress notification
				if ( !length ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
				}

				// Resolve the animation and report its conclusion
				deferred.resolveWith( elem, [ animation ] );
				return false;
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						result.stop.bind( result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		// Attach callbacks from options
		animation
			.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		return animation;
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !isFunction( easing ) && easing
		};

		// Go to the end state if fx are off
		if ( jQuery.fx.off ) {
			opt.duration = 0;

		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];

				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};

			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = Date.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Run the timer and safely remove it when done (allowing for external removal)
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( inProgress ) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function() {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,

				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}

					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




		// Strip and collapse whitespace according to HTML spec
		// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}


	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	function classesToArray( value ) {
		if ( Array.isArray( value ) ) {
			return value;
		}
		if ( typeof value === "string" ) {
			return value.match( rnothtmlwhite ) || [];
		}
		return [];
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			classes = classesToArray( value );

			if ( classes.length ) {
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			classes = classesToArray( value );

			if ( classes.length ) {
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value,
				isValidValue = type === "string" || Array.isArray( value );

			if ( typeof stateVal === "boolean" && isValidValue ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( isValidValue ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = classesToArray( value );

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
								"" :
								dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, valueIsFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			valueIsFunction = isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( valueIsFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( Array.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;

					if ( index < 0 ) {
						i = max;

					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( Array.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	support.focusin = "onfocusin" in window;


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		stopPropagationCallback = function( e ) {
			e.stopPropagation();
		};

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = lastElement = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
				lastElement = cur;
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;

						if ( event.isPropagationStopped() ) {
							lastElement.addEventListener( type, stopPropagationCallback );
						}

						elem[ type ]();

						if ( event.isPropagationStopped() ) {
							lastElement.removeEventListener( type, stopPropagationCallback );
						}

						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {

					// Handle: regular nodes (via `this.ownerDocument`), window
					// (via `this.document`) & document (via `this`).
					var doc = this.ownerDocument || this.document || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this.document || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = { guid: Date.now() };

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, parserErrorElem;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {}

		parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
		if ( !xml || parserErrorElem ) {
			jQuery.error( "Invalid XML: " + (
				parserErrorElem ?
					jQuery.map( parserErrorElem.childNodes, function( el ) {
						return el.textContent;
					} ).join( "\n" ) :
					data
			) );
		}
		return xml;
	};


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( Array.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && toType( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		if ( a == null ) {
			return "";
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} ).filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} ).map( function( _i, elem ) {
				var val = jQuery( this ).val();

				if ( val == null ) {
					return null;
				}

				if ( Array.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}

				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );

	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

			if ( isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
										( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
											.concat( match[ 2 ] );
								}
							}
							match = responseHeaders[ key.toLowerCase() + " " ];
						}
						return match == null ? null : match.join( ", " );
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 15
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available and should be processed, append data to url
				if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
						uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Use a noop converter for missing script but not if jsonp
				if ( !isSuccess &&
					jQuery.inArray( "script", s.dataTypes ) > -1 &&
					jQuery.inArray( "json", s.dataTypes ) < 0 ) {
					s.converters[ "text script" ] = function() {};
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( _i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );

	jQuery.ajaxPrefilter( function( s ) {
		var i;
		for ( i in s.headers ) {
			if ( i.toLowerCase() === "content-type" ) {
				s.contentType = s.headers[ i ] || "";
			}
		}
	} );


	jQuery._evalUrl = function( url, options, doc ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,

			// Only evaluate the response if it is successful (gh-4126)
			// dataFilter is not invoked for failure responses, so using it instead
			// of the default converter is kludgy but it works.
			converters: {
				"text script": function() {}
			},
			dataFilter: function( response ) {
				jQuery.globalEval( response, options, doc );
			}
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var htmlIsFunction = isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.ontimeout =
										xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain or forced-by-attrs requests
		if ( s.crossDomain || s.scriptAttrs ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" )
						.attr( s.scriptAttrs || {} )
						.prop( { charset: s.scriptCharset, src: s.url } )
						.on( "load error", callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						} );

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {

		// offset() relates an element's border box to the document origin
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var rect, win,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset
			};
		},

		// position() relates an element's margin box to its offset parent's padding box
		// This corresponds to the behavior of CSS absolute positioning
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset, doc,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// position:fixed elements are offset from the viewport, which itself always has zero offset
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume position:fixed implies availability of getBoundingClientRect
				offset = elem.getBoundingClientRect();

			} else {
				offset = this.offset();

				// Account for the *real* offset parent, which can be the document or its root element
				// when a statically positioned element is identified
				doc = elem.ownerDocument;
				offsetParent = elem.offsetParent || doc.documentElement;
				while ( offsetParent &&
					( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
					jQuery.css( offsetParent, "position" ) === "static" ) {

					offsetParent = offsetParent.parentNode;
				}
				if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

					// Incorporate borders into its offset, since they are outside its content origin
					parentOffset = jQuery( offsetParent ).offset();
					parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
					parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
				}
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {

				// Coalesce documents and windows
				var win;
				if ( isWindow( elem ) ) {
					win = elem;
				} else if ( elem.nodeType === 9 ) {
					win = elem.defaultView;
				}

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( _i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( {
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( _i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},

		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );

	jQuery.each(
		( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( _i, name ) {

			// Handle event binding
			jQuery.fn[ name ] = function( data, fn ) {
				return arguments.length > 0 ?
					this.on( name, null, data, fn ) :
					this.trigger( name );
			};
		}
	);




	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

	// Bind a function to a context, optionally partially applying any
	// arguments.
	// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	// However, it is not slated for removal any time soon
	jQuery.proxy = function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	};

	jQuery.holdReady = function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	jQuery.isFunction = isFunction;
	jQuery.isWindow = isWindow;
	jQuery.camelCase = camelCase;
	jQuery.type = toType;

	jQuery.now = Date.now;

	jQuery.isNumeric = function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	};

	jQuery.trim = function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	};



	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === "undefined" ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;
	} );


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define('underscore', factory) :
	  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (function () {
	    var current = global._;
	    var exports = global._ = factory();
	    exports.noConflict = function () { global._ = current; return exports; };
	  }()));
	}(this, (function () {
	  //     Underscore.js 1.13.2
	  //     https://underscorejs.org
	  //     (c) 2009-2021 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
	  //     Underscore may be freely distributed under the MIT license.

	  // Current version.
	  var VERSION = '1.13.2';

	  // Establish the root object, `window` (`self`) in the browser, `global`
	  // on the server, or `this` in some virtual machines. We use `self`
	  // instead of `window` for `WebWorker` support.
	  var root = typeof self == 'object' && self.self === self && self ||
	            typeof global == 'object' && global.global === global && global ||
	            Function('return this')() ||
	            {};

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
	  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // Modern feature detection.
	  var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
	      supportsDataView = typeof DataView !== 'undefined';

	  // All **ECMAScript 5+** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeCreate = Object.create,
	      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

	  // Create references to these builtin functions because we override them.
	  var _isNaN = isNaN,
	      _isFinite = isFinite;

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  // The largest integer that can be represented exactly.
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	  // Some functions take a variable number of arguments, or a few expected
	  // arguments at the beginning and then a variable number of values to operate
	  // on. This helper accumulates all remaining arguments past the function’s
	  // argument length (or an explicit `startIndex`), into an array that becomes
	  // the last argument. Similar to ES6’s "rest parameter".
	  function restArguments(func, startIndex) {
	    startIndex = startIndex == null ? func.length - 1 : +startIndex;
	    return function() {
	      var length = Math.max(arguments.length - startIndex, 0),
	          rest = Array(length),
	          index = 0;
	      for (; index < length; index++) {
	        rest[index] = arguments[index + startIndex];
	      }
	      switch (startIndex) {
	        case 0: return func.call(this, rest);
	        case 1: return func.call(this, arguments[0], rest);
	        case 2: return func.call(this, arguments[0], arguments[1], rest);
	      }
	      var args = Array(startIndex + 1);
	      for (index = 0; index < startIndex; index++) {
	        args[index] = arguments[index];
	      }
	      args[startIndex] = rest;
	      return func.apply(this, args);
	    };
	  }

	  // Is a given variable an object?
	  function isObject(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  }

	  // Is a given value equal to null?
	  function isNull(obj) {
	    return obj === null;
	  }

	  // Is a given variable undefined?
	  function isUndefined(obj) {
	    return obj === void 0;
	  }

	  // Is a given value a boolean?
	  function isBoolean(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  }

	  // Is a given value a DOM element?
	  function isElement(obj) {
	    return !!(obj && obj.nodeType === 1);
	  }

	  // Internal function for creating a `toString`-based type tester.
	  function tagTester(name) {
	    var tag = '[object ' + name + ']';
	    return function(obj) {
	      return toString.call(obj) === tag;
	    };
	  }

	  var isString = tagTester('String');

	  var isNumber = tagTester('Number');

	  var isDate = tagTester('Date');

	  var isRegExp = tagTester('RegExp');

	  var isError = tagTester('Error');

	  var isSymbol = tagTester('Symbol');

	  var isArrayBuffer = tagTester('ArrayBuffer');

	  var isFunction = tagTester('Function');

	  // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
	  // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
	  var nodelist = root.document && root.document.childNodes;
	  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
	    isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  var isFunction$1 = isFunction;

	  var hasObjectTag = tagTester('Object');

	  // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
	  // In IE 11, the most common among them, this problem also applies to
	  // `Map`, `WeakMap` and `Set`.
	  var hasStringTagBug = (
	        supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
	      ),
	      isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

	  var isDataView = tagTester('DataView');

	  // In IE 10 - Edge 13, we need a different heuristic
	  // to determine whether an object is a `DataView`.
	  function ie10IsDataView(obj) {
	    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
	  }

	  var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);

	  // Is a given value an array?
	  // Delegates to ECMA5's native `Array.isArray`.
	  var isArray = nativeIsArray || tagTester('Array');

	  // Internal function to check whether `key` is an own property name of `obj`.
	  function has$1(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  }

	  var isArguments = tagTester('Arguments');

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  (function() {
	    if (!isArguments(arguments)) {
	      isArguments = function(obj) {
	        return has$1(obj, 'callee');
	      };
	    }
	  }());

	  var isArguments$1 = isArguments;

	  // Is a given object a finite number?
	  function isFinite$1(obj) {
	    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
	  }

	  // Is the given value `NaN`?
	  function isNaN$1(obj) {
	    return isNumber(obj) && _isNaN(obj);
	  }

	  // Predicate-generating function. Often useful outside of Underscore.
	  function constant(value) {
	    return function() {
	      return value;
	    };
	  }

	  // Common internal logic for `isArrayLike` and `isBufferLike`.
	  function createSizePropertyCheck(getSizeProperty) {
	    return function(collection) {
	      var sizeProperty = getSizeProperty(collection);
	      return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
	    }
	  }

	  // Internal helper to generate a function to obtain property `key` from `obj`.
	  function shallowProperty(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  }

	  // Internal helper to obtain the `byteLength` property of an object.
	  var getByteLength = shallowProperty('byteLength');

	  // Internal helper to determine whether we should spend extensive checks against
	  // `ArrayBuffer` et al.
	  var isBufferLike = createSizePropertyCheck(getByteLength);

	  // Is a given value a typed array?
	  var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
	  function isTypedArray(obj) {
	    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
	    // Otherwise, fall back on the above regular expression.
	    return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
	                  isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
	  }

	  var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

	  // Internal helper to obtain the `length` property of an object.
	  var getLength = shallowProperty('length');

	  // Internal helper to create a simple lookup structure.
	  // `collectNonEnumProps` used to depend on `_.contains`, but this led to
	  // circular imports. `emulatedSet` is a one-off solution that only works for
	  // arrays of strings.
	  function emulatedSet(keys) {
	    var hash = {};
	    for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
	    return {
	      contains: function(key) { return hash[key] === true; },
	      push: function(key) {
	        hash[key] = true;
	        return keys.push(key);
	      }
	    };
	  }

	  // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
	  // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
	  // needed.
	  function collectNonEnumProps(obj, keys) {
	    keys = emulatedSet(keys);
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`.
	  function keys(obj) {
	    if (!isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (has$1(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  }

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  function isEmpty(obj) {
	    if (obj == null) return true;
	    // Skip the more expensive `toString`-based type checks if `obj` has no
	    // `.length`.
	    var length = getLength(obj);
	    if (typeof length == 'number' && (
	      isArray(obj) || isString(obj) || isArguments$1(obj)
	    )) return length === 0;
	    return getLength(keys(obj)) === 0;
	  }

	  // Returns whether an object has a given set of `key:value` pairs.
	  function isMatch(object, attrs) {
	    var _keys = keys(attrs), length = _keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = _keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  }

	  // If Underscore is called as a function, it returns a wrapped object that can
	  // be used OO-style. This wrapper holds altered versions of all functions added
	  // through `_.mixin`. Wrapped objects may be chained.
	  function _$1(obj) {
	    if (obj instanceof _$1) return obj;
	    if (!(this instanceof _$1)) return new _$1(obj);
	    this._wrapped = obj;
	  }

	  _$1.VERSION = VERSION;

	  // Extracts the result from a wrapped and chained object.
	  _$1.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxies for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;

	  _$1.prototype.toString = function() {
	    return String(this._wrapped);
	  };

	  // Internal function to wrap or shallow-copy an ArrayBuffer,
	  // typed array or DataView to a new view, reusing the buffer.
	  function toBufferView(bufferSource) {
	    return new Uint8Array(
	      bufferSource.buffer || bufferSource,
	      bufferSource.byteOffset || 0,
	      getByteLength(bufferSource)
	    );
	  }

	  // We use this string twice, so give it a name for minification.
	  var tagDataView = '[object DataView]';

	  // Internal recursive comparison function for `_.isEqual`.
	  function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // `null` or `undefined` only equal to itself (strict comparison).
	    if (a == null || b == null) return false;
	    // `NaN`s are equivalent, but non-reflexive.
	    if (a !== a) return b !== b;
	    // Exhaust primitive checks
	    var type = typeof a;
	    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
	    return deepEq(a, b, aStack, bStack);
	  }

	  // Internal recursive comparison function for `_.isEqual`.
	  function deepEq(a, b, aStack, bStack) {
	    // Unwrap any wrapped objects.
	    if (a instanceof _$1) a = a._wrapped;
	    if (b instanceof _$1) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    // Work around a bug in IE 10 - Edge 13.
	    if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
	      if (!isDataView$1(b)) return false;
	      className = tagDataView;
	    }
	    switch (className) {
	      // These types are compared by value.
	      case '[object RegExp]':
	        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN.
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	      case '[object Symbol]':
	        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
	      case '[object ArrayBuffer]':
	      case tagDataView:
	        // Coerce to typed array so we can fall through.
	        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays && isTypedArray$1(a)) {
	        var byteLength = getByteLength(a);
	        if (byteLength !== getByteLength(b)) return false;
	        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
	        areArrays = true;
	    }
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
	                               isFunction$1(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var _keys = keys(a), key;
	      length = _keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = _keys[length];
	        if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  }

	  // Perform a deep comparison to check if two objects are equal.
	  function isEqual(a, b) {
	    return eq(a, b);
	  }

	  // Retrieve all the enumerable property names of an object.
	  function allKeys(obj) {
	    if (!isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  }

	  // Since the regular `Object.prototype.toString` type tests don't work for
	  // some types in IE 11, we use a fingerprinting heuristic instead, based
	  // on the methods. It's not great, but it's the best we got.
	  // The fingerprint method lists are defined below.
	  function ie11fingerprint(methods) {
	    var length = getLength(methods);
	    return function(obj) {
	      if (obj == null) return false;
	      // `Map`, `WeakMap` and `Set` have no enumerable keys.
	      var keys = allKeys(obj);
	      if (getLength(keys)) return false;
	      for (var i = 0; i < length; i++) {
	        if (!isFunction$1(obj[methods[i]])) return false;
	      }
	      // If we are testing against `WeakMap`, we need to ensure that
	      // `obj` doesn't have a `forEach` method in order to distinguish
	      // it from a regular `Map`.
	      return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
	    };
	  }

	  // In the interest of compact minification, we write
	  // each string in the fingerprints only once.
	  var forEachName = 'forEach',
	      hasName = 'has',
	      commonInit = ['clear', 'delete'],
	      mapTail = ['get', hasName, 'set'];

	  // `Map`, `WeakMap` and `Set` each have slightly different
	  // combinations of the above sublists.
	  var mapMethods = commonInit.concat(forEachName, mapTail),
	      weakMapMethods = commonInit.concat(mapTail),
	      setMethods = ['add'].concat(commonInit, forEachName, hasName);

	  var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

	  var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

	  var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

	  var isWeakSet = tagTester('WeakSet');

	  // Retrieve the values of an object's properties.
	  function values(obj) {
	    var _keys = keys(obj);
	    var length = _keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[_keys[i]];
	    }
	    return values;
	  }

	  // Convert an object into a list of `[key, value]` pairs.
	  // The opposite of `_.object` with one argument.
	  function pairs(obj) {
	    var _keys = keys(obj);
	    var length = _keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [_keys[i], obj[_keys[i]]];
	    }
	    return pairs;
	  }

	  // Invert the keys and values of an object. The values must be serializable.
	  function invert(obj) {
	    var result = {};
	    var _keys = keys(obj);
	    for (var i = 0, length = _keys.length; i < length; i++) {
	      result[obj[_keys[i]]] = _keys[i];
	    }
	    return result;
	  }

	  // Return a sorted list of the function names available on the object.
	  function functions(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (isFunction$1(obj[key])) names.push(key);
	    }
	    return names.sort();
	  }

	  // An internal function for creating assigner functions.
	  function createAssigner(keysFunc, defaults) {
	    return function(obj) {
	      var length = arguments.length;
	      if (defaults) obj = Object(obj);
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!defaults || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  }

	  // Extend a given object with all the properties in passed-in object(s).
	  var extend = createAssigner(allKeys);

	  // Assigns a given object with all the own properties in the passed-in
	  // object(s).
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  var extendOwn = createAssigner(keys);

	  // Fill in a given object with default properties.
	  var defaults = createAssigner(allKeys, true);

	  // Create a naked function reference for surrogate-prototype-swapping.
	  function ctor() {
	    return function(){};
	  }

	  // An internal function for creating a new object that inherits from another.
	  function baseCreate(prototype) {
	    if (!isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    var Ctor = ctor();
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  }

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  function create(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) extendOwn(result, props);
	    return result;
	  }

	  // Create a (shallow-cloned) duplicate of an object.
	  function clone(obj) {
	    if (!isObject(obj)) return obj;
	    return isArray(obj) ? obj.slice() : extend({}, obj);
	  }

	  // Invokes `interceptor` with the `obj` and then returns `obj`.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  function tap(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  }

	  // Normalize a (deep) property `path` to array.
	  // Like `_.iteratee`, this function can be customized.
	  function toPath$1(path) {
	    return isArray(path) ? path : [path];
	  }
	  _$1.toPath = toPath$1;

	  // Internal wrapper for `_.toPath` to enable minification.
	  // Similar to `cb` for `_.iteratee`.
	  function toPath(path) {
	    return _$1.toPath(path);
	  }

	  // Internal function to obtain a nested property in `obj` along `path`.
	  function deepGet(obj, path) {
	    var length = path.length;
	    for (var i = 0; i < length; i++) {
	      if (obj == null) return void 0;
	      obj = obj[path[i]];
	    }
	    return length ? obj : void 0;
	  }

	  // Get the value of the (deep) property on `path` from `object`.
	  // If any property in `path` does not exist or if the value is
	  // `undefined`, return `defaultValue` instead.
	  // The `path` is normalized through `_.toPath`.
	  function get(object, path, defaultValue) {
	    var value = deepGet(object, toPath(path));
	    return isUndefined(value) ? defaultValue : value;
	  }

	  // Shortcut function for checking if an object has a given property directly on
	  // itself (in other words, not on a prototype). Unlike the internal `has`
	  // function, this public version can also traverse nested properties.
	  function has(obj, path) {
	    path = toPath(path);
	    var length = path.length;
	    for (var i = 0; i < length; i++) {
	      var key = path[i];
	      if (!has$1(obj, key)) return false;
	      obj = obj[key];
	    }
	    return !!length;
	  }

	  // Keep the identity function around for default iteratees.
	  function identity(value) {
	    return value;
	  }

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  function matcher(attrs) {
	    attrs = extendOwn({}, attrs);
	    return function(obj) {
	      return isMatch(obj, attrs);
	    };
	  }

	  // Creates a function that, when passed an object, will traverse that object’s
	  // properties down the given `path`, specified as an array of keys or indices.
	  function property(path) {
	    path = toPath(path);
	    return function(obj) {
	      return deepGet(obj, path);
	    };
	  }

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      // The 2-argument case is omitted because we’re not using it.
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  }

	  // An internal function to generate callbacks that can be applied to each
	  // element in a collection, returning the desired result — either `_.identity`,
	  // an arbitrary callback, a property matcher, or a property accessor.
	  function baseIteratee(value, context, argCount) {
	    if (value == null) return identity;
	    if (isFunction$1(value)) return optimizeCb(value, context, argCount);
	    if (isObject(value) && !isArray(value)) return matcher(value);
	    return property(value);
	  }

	  // External wrapper for our callback generator. Users may customize
	  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
	  // This abstraction hides the internal-only `argCount` argument.
	  function iteratee(value, context) {
	    return baseIteratee(value, context, Infinity);
	  }
	  _$1.iteratee = iteratee;

	  // The function we call internally to generate a callback. It invokes
	  // `_.iteratee` if overridden, otherwise `baseIteratee`.
	  function cb(value, context, argCount) {
	    if (_$1.iteratee !== iteratee) return _$1.iteratee(value, context);
	    return baseIteratee(value, context, argCount);
	  }

	  // Returns the results of applying the `iteratee` to each element of `obj`.
	  // In contrast to `_.map` it returns an object.
	  function mapObject(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var _keys = keys(obj),
	        length = _keys.length,
	        results = {};
	    for (var index = 0; index < length; index++) {
	      var currentKey = _keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  }

	  // Predicate-generating function. Often useful outside of Underscore.
	  function noop(){}

	  // Generates a function for a given object that returns a given property.
	  function propertyOf(obj) {
	    if (obj == null) return noop;
	    return function(path) {
	      return get(obj, path);
	    };
	  }

	  // Run a function **n** times.
	  function times(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  }

	  // Return a random integer between `min` and `max` (inclusive).
	  function random(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  }

	  // A (possibly faster) way to get the current timestamp as an integer.
	  var now = Date.now || function() {
	    return new Date().getTime();
	  };

	  // Internal helper to generate functions for escaping and unescaping strings
	  // to/from HTML interpolation.
	  function createEscaper(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped.
	    var source = '(?:' + keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  }

	  // Internal list of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };

	  // Function for escaping strings to HTML interpolation.
	  var _escape = createEscaper(escapeMap);

	  // Internal list of HTML entities for unescaping.
	  var unescapeMap = invert(escapeMap);

	  // Function for unescaping strings from HTML interpolation.
	  var _unescape = createEscaper(unescapeMap);

	  // By default, Underscore uses ERB-style template delimiters. Change the
	  // following template settings to use alternative delimiters.
	  var templateSettings = _$1.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `_.templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'": "'",
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

	  function escapeChar(match) {
	    return '\\' + escapes[match];
	  }

	  // In order to prevent third-party code injection through
	  // `_.templateSettings.variable`, we test it against the following regular
	  // expression. It is intentionally a bit more liberal than just matching valid
	  // identifiers, but still prevents possible loopholes through defaults or
	  // destructuring assignment.
	  var bareIdentifier = /^\s*(\w|\$)+\s*$/;

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  function template(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = defaults({}, settings, _$1.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offset.
	      return match;
	    });
	    source += "';\n";

	    var argument = settings.variable;
	    if (argument) {
	      // Insure against third-party code injection. (CVE-2021-23358)
	      if (!bareIdentifier.test(argument)) throw new Error(
	        'variable is not a bare identifier: ' + argument
	      );
	    } else {
	      // If a variable is not specified, place data values in local scope.
	      source = 'with(obj||{}){\n' + source + '}\n';
	      argument = 'obj';
	    }

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    var render;
	    try {
	      render = new Function(argument, '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _$1);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  }

	  // Traverses the children of `obj` along `path`. If a child is a function, it
	  // is invoked with its parent as context. Returns the value of the final
	  // child, or `fallback` if any child is undefined.
	  function result(obj, path, fallback) {
	    path = toPath(path);
	    var length = path.length;
	    if (!length) {
	      return isFunction$1(fallback) ? fallback.call(obj) : fallback;
	    }
	    for (var i = 0; i < length; i++) {
	      var prop = obj == null ? void 0 : obj[path[i]];
	      if (prop === void 0) {
	        prop = fallback;
	        i = length; // Ensure we don't continue iterating.
	      }
	      obj = isFunction$1(prop) ? prop.call(obj) : prop;
	    }
	    return obj;
	  }

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  function uniqueId(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  }

	  // Start chaining a wrapped Underscore object.
	  function chain(obj) {
	    var instance = _$1(obj);
	    instance._chain = true;
	    return instance;
	  }

	  // Internal function to execute `sourceFunc` bound to `context` with optional
	  // `args`. Determines whether to execute a function as a constructor or as a
	  // normal function.
	  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (isObject(result)) return result;
	    return self;
	  }

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. `_` acts
	  // as a placeholder by default, allowing any combination of arguments to be
	  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
	  var partial = restArguments(function(func, boundArgs) {
	    var placeholder = partial.placeholder;
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  });

	  partial.placeholder = _$1;

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally).
	  var bind = restArguments(function(func, context, args) {
	    if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
	    var bound = restArguments(function(callArgs) {
	      return executeBound(func, bound, context, this, args.concat(callArgs));
	    });
	    return bound;
	  });

	  // Internal helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object.
	  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var isArrayLike = createSizePropertyCheck(getLength);

	  // Internal implementation of a recursive `flatten` function.
	  function flatten$1(input, depth, strict, output) {
	    output = output || [];
	    if (!depth && depth !== 0) {
	      depth = Infinity;
	    } else if (depth <= 0) {
	      return output.concat(input);
	    }
	    var idx = output.length;
	    for (var i = 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
	        // Flatten current level of array or arguments object.
	        if (depth > 1) {
	          flatten$1(value, depth - 1, strict, output);
	          idx = output.length;
	        } else {
	          var j = 0, len = value.length;
	          while (j < len) output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  }

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  var bindAll = restArguments(function(obj, keys) {
	    keys = flatten$1(keys, false, false);
	    var index = keys.length;
	    if (index < 1) throw new Error('bindAll must be passed function names');
	    while (index--) {
	      var key = keys[index];
	      obj[key] = bind(obj[key], obj);
	    }
	    return obj;
	  });

	  // Memoize an expensive function by storing its results.
	  function memoize(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  }

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  var delay = restArguments(function(func, wait, args) {
	    return setTimeout(function() {
	      return func.apply(null, args);
	    }, wait);
	  });

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  var defer = partial(delay, _$1, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  function throttle(func, wait, options) {
	    var timeout, context, args, result;
	    var previous = 0;
	    if (!options) options = {};

	    var later = function() {
	      previous = options.leading === false ? 0 : now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };

	    var throttled = function() {
	      var _now = now();
	      if (!previous && options.leading === false) previous = _now;
	      var remaining = wait - (_now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = _now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };

	    throttled.cancel = function() {
	      clearTimeout(timeout);
	      previous = 0;
	      timeout = context = args = null;
	    };

	    return throttled;
	  }

	  // When a sequence of calls of the returned function ends, the argument
	  // function is triggered. The end of a sequence is defined by the `wait`
	  // parameter. If `immediate` is passed, the argument function will be
	  // triggered at the beginning of the sequence instead of at the end.
	  function debounce(func, wait, immediate) {
	    var timeout, previous, args, result, context;

	    var later = function() {
	      var passed = now() - previous;
	      if (wait > passed) {
	        timeout = setTimeout(later, wait - passed);
	      } else {
	        timeout = null;
	        if (!immediate) result = func.apply(context, args);
	        // This check is needed because `func` can recursively invoke `debounced`.
	        if (!timeout) args = context = null;
	      }
	    };

	    var debounced = restArguments(function(_args) {
	      context = this;
	      args = _args;
	      previous = now();
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	        if (immediate) result = func.apply(context, args);
	      }
	      return result;
	    });

	    debounced.cancel = function() {
	      clearTimeout(timeout);
	      timeout = args = context = null;
	    };

	    return debounced;
	  }

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  function wrap(func, wrapper) {
	    return partial(wrapper, func);
	  }

	  // Returns a negated version of the passed-in predicate.
	  function negate(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  }

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  function compose() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  }

	  // Returns a function that will only be executed on and after the Nth call.
	  function after(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  }

	  // Returns a function that will only be executed up to (but not including) the
	  // Nth call.
	  function before(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  }

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  var once = partial(before, 2);

	  // Returns the first key on an object that passes a truth test.
	  function findKey(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var _keys = keys(obj), key;
	    for (var i = 0, length = _keys.length; i < length; i++) {
	      key = _keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  }

	  // Internal function to generate `_.findIndex` and `_.findLastIndex`.
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a truth test.
	  var findIndex = createPredicateIndexFinder(1);

	  // Returns the last index on an array-like that passes a truth test.
	  var findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  function sortedIndex(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  }

	  // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), isNaN$1);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  var indexOf = createIndexFinder(1, findIndex, sortedIndex);

	  // Return the position of the last occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  var lastIndexOf = createIndexFinder(-1, findLastIndex);

	  // Return the first value which passes a truth test.
	  function find(obj, predicate, context) {
	    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
	    var key = keyFinder(obj, predicate, context);
	    if (key !== void 0 && key !== -1) return obj[key];
	  }

	  // Convenience version of a common use case of `_.find`: getting the first
	  // object containing specific `key:value` pairs.
	  function findWhere(obj, attrs) {
	    return find(obj, matcher(attrs));
	  }

	  // The cornerstone for collection functions, an `each`
	  // implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  function each(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var _keys = keys(obj);
	      for (i = 0, length = _keys.length; i < length; i++) {
	        iteratee(obj[_keys[i]], _keys[i], obj);
	      }
	    }
	    return obj;
	  }

	  // Return the results of applying the iteratee to each element.
	  function map(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var _keys = !isArrayLike(obj) && keys(obj),
	        length = (_keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = _keys ? _keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  }

	  // Internal helper to create a reducing function, iterating left or right.
	  function createReduce(dir) {
	    // Wrap code that reassigns argument variables in a separate function than
	    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
	    var reducer = function(obj, iteratee, memo, initial) {
	      var _keys = !isArrayLike(obj) && keys(obj),
	          length = (_keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      if (!initial) {
	        memo = obj[_keys ? _keys[index] : index];
	        index += dir;
	      }
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = _keys ? _keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    };

	    return function(obj, iteratee, memo, context) {
	      var initial = arguments.length >= 3;
	      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  var reduce = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  var reduceRight = createReduce(-1);

	  // Return all the elements that pass a truth test.
	  function filter(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  }

	  // Return all the elements for which a truth test fails.
	  function reject(obj, predicate, context) {
	    return filter(obj, negate(cb(predicate)), context);
	  }

	  // Determine whether all of the elements pass a truth test.
	  function every(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var _keys = !isArrayLike(obj) && keys(obj),
	        length = (_keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = _keys ? _keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  }

	  // Determine if at least one element in the object passes a truth test.
	  function some(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var _keys = !isArrayLike(obj) && keys(obj),
	        length = (_keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = _keys ? _keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  }

	  // Determine if the array or object contains a given item (using `===`).
	  function contains(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return indexOf(obj, item, fromIndex) >= 0;
	  }

	  // Invoke a method (with arguments) on every item in a collection.
	  var invoke = restArguments(function(obj, path, args) {
	    var contextPath, func;
	    if (isFunction$1(path)) {
	      func = path;
	    } else {
	      path = toPath(path);
	      contextPath = path.slice(0, -1);
	      path = path[path.length - 1];
	    }
	    return map(obj, function(context) {
	      var method = func;
	      if (!method) {
	        if (contextPath && contextPath.length) {
	          context = deepGet(context, contextPath);
	        }
	        if (context == null) return void 0;
	        method = context[path];
	      }
	      return method == null ? method : method.apply(context, args);
	    });
	  });

	  // Convenience version of a common use case of `_.map`: fetching a property.
	  function pluck(obj, key) {
	    return map(obj, property(key));
	  }

	  // Convenience version of a common use case of `_.filter`: selecting only
	  // objects containing specific `key:value` pairs.
	  function where(obj, attrs) {
	    return filter(obj, matcher(attrs));
	  }

	  // Return the maximum element (or element-based computation).
	  function max(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
	      obj = isArrayLike(obj) ? obj : values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value != null && value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      each(obj, function(v, index, list) {
	        computed = iteratee(v, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = v;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  }

	  // Return the minimum element (or element-based computation).
	  function min(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
	      obj = isArrayLike(obj) ? obj : values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value != null && value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      each(obj, function(v, index, list) {
	        computed = iteratee(v, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = v;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  }

	  // Safely create a real, live array from anything iterable.
	  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
	  function toArray(obj) {
	    if (!obj) return [];
	    if (isArray(obj)) return slice.call(obj);
	    if (isString(obj)) {
	      // Keep surrogate pair characters together.
	      return obj.match(reStrSymbol);
	    }
	    if (isArrayLike(obj)) return map(obj, identity);
	    return values(obj);
	  }

	  // Sample **n** random values from a collection using the modern version of the
	  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `_.map`.
	  function sample(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = values(obj);
	      return obj[random(obj.length - 1)];
	    }
	    var sample = toArray(obj);
	    var length = getLength(sample);
	    n = Math.max(Math.min(n, length), 0);
	    var last = length - 1;
	    for (var index = 0; index < n; index++) {
	      var rand = random(index, last);
	      var temp = sample[index];
	      sample[index] = sample[rand];
	      sample[rand] = temp;
	    }
	    return sample.slice(0, n);
	  }

	  // Shuffle a collection.
	  function shuffle(obj) {
	    return sample(obj, Infinity);
	  }

	  // Sort the object's values by a criterion produced by an iteratee.
	  function sortBy(obj, iteratee, context) {
	    var index = 0;
	    iteratee = cb(iteratee, context);
	    return pluck(map(obj, function(value, key, list) {
	      return {
	        value: value,
	        index: index++,
	        criteria: iteratee(value, key, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  }

	  // An internal function used for aggregate "group by" operations.
	  function group(behavior, partition) {
	    return function(obj, iteratee, context) {
	      var result = partition ? [[], []] : {};
	      iteratee = cb(iteratee, context);
	      each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  }

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  var groupBy = group(function(result, value, key) {
	    if (has$1(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
	  // when you know that your index values will be unique.
	  var indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  var countBy = group(function(result, value, key) {
	    if (has$1(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Split a collection into two arrays: one whose elements all pass the given
	  // truth test, and one whose elements all do not pass the truth test.
	  var partition = group(function(result, value, pass) {
	    result[pass ? 0 : 1].push(value);
	  }, true);

	  // Return the number of elements in a collection.
	  function size(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : keys(obj).length;
	  }

	  // Internal `_.pick` helper function to determine whether `key` is an enumerable
	  // property name of `obj`.
	  function keyInObj(value, key, obj) {
	    return key in obj;
	  }

	  // Return a copy of the object only containing the allowed properties.
	  var pick = restArguments(function(obj, keys) {
	    var result = {}, iteratee = keys[0];
	    if (obj == null) return result;
	    if (isFunction$1(iteratee)) {
	      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
	      keys = allKeys(obj);
	    } else {
	      iteratee = keyInObj;
	      keys = flatten$1(keys, false, false);
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  });

	  // Return a copy of the object without the disallowed properties.
	  var omit = restArguments(function(obj, keys) {
	    var iteratee = keys[0], context;
	    if (isFunction$1(iteratee)) {
	      iteratee = negate(iteratee);
	      if (keys.length > 1) context = keys[1];
	    } else {
	      keys = map(flatten$1(keys, false, false), String);
	      iteratee = function(value, key) {
	        return !contains(keys, key);
	      };
	    }
	    return pick(obj, iteratee, context);
	  });

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  function initial(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  }

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  function first(array, n, guard) {
	    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
	    if (n == null || guard) return array[0];
	    return initial(array, array.length - n);
	  }

	  // Returns everything but the first entry of the `array`. Especially useful on
	  // the `arguments` object. Passing an **n** will return the rest N values in the
	  // `array`.
	  function rest(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  }

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  function last(array, n, guard) {
	    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
	    if (n == null || guard) return array[array.length - 1];
	    return rest(array, Math.max(0, array.length - n));
	  }

	  // Trim out all falsy values from an array.
	  function compact(array) {
	    return filter(array, Boolean);
	  }

	  // Flatten out an array, either recursively (by default), or up to `depth`.
	  // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
	  function flatten(array, depth) {
	    return flatten$1(array, depth, false);
	  }

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  var difference = restArguments(function(array, rest) {
	    rest = flatten$1(rest, true, true);
	    return filter(array, function(value){
	      return !contains(rest, value);
	    });
	  });

	  // Return a version of the array that does not contain the specified value(s).
	  var without = restArguments(function(array, otherArrays) {
	    return difference(array, otherArrays);
	  });

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // The faster algorithm will not work with an iteratee if the iteratee
	  // is not a one-to-one function, so providing an iteratee will disable
	  // the faster algorithm.
	  function uniq(array, isSorted, iteratee, context) {
	    if (!isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted && !iteratee) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  }

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  var union = restArguments(function(arrays) {
	    return uniq(flatten$1(arrays, true, true));
	  });

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  function intersection(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (contains(result, item)) continue;
	      var j;
	      for (j = 1; j < argsLength; j++) {
	        if (!contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  }

	  // Complement of zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices.
	  function unzip(array) {
	    var length = array && max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = pluck(array, index);
	    }
	    return result;
	  }

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  var zip = restArguments(unzip);

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
	  function object(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  }

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](https://docs.python.org/library/functions.html#range).
	  function range(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    if (!step) {
	      step = stop < start ? -1 : 1;
	    }

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  }

	  // Chunk a single array into multiple arrays, each containing `count` or fewer
	  // items.
	  function chunk(array, count) {
	    if (count == null || count < 1) return [];
	    var result = [];
	    var i = 0, length = array.length;
	    while (i < length) {
	      result.push(slice.call(array, i, i += count));
	    }
	    return result;
	  }

	  // Helper function to continue chaining intermediate results.
	  function chainResult(instance, obj) {
	    return instance._chain ? _$1(obj).chain() : obj;
	  }

	  // Add your own custom functions to the Underscore object.
	  function mixin(obj) {
	    each(functions(obj), function(name) {
	      var func = _$1[name] = obj[name];
	      _$1.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return chainResult(this, func.apply(_$1, args));
	      };
	    });
	    return _$1;
	  }

	  // Add all mutator `Array` functions to the wrapper.
	  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _$1.prototype[name] = function() {
	      var obj = this._wrapped;
	      if (obj != null) {
	        method.apply(obj, arguments);
	        if ((name === 'shift' || name === 'splice') && obj.length === 0) {
	          delete obj[0];
	        }
	      }
	      return chainResult(this, obj);
	    };
	  });

	  // Add all accessor `Array` functions to the wrapper.
	  each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _$1.prototype[name] = function() {
	      var obj = this._wrapped;
	      if (obj != null) obj = method.apply(obj, arguments);
	      return chainResult(this, obj);
	    };
	  });

	  // Named Exports

	  var allExports = {
	    __proto__: null,
	    VERSION: VERSION,
	    restArguments: restArguments,
	    isObject: isObject,
	    isNull: isNull,
	    isUndefined: isUndefined,
	    isBoolean: isBoolean,
	    isElement: isElement,
	    isString: isString,
	    isNumber: isNumber,
	    isDate: isDate,
	    isRegExp: isRegExp,
	    isError: isError,
	    isSymbol: isSymbol,
	    isArrayBuffer: isArrayBuffer,
	    isDataView: isDataView$1,
	    isArray: isArray,
	    isFunction: isFunction$1,
	    isArguments: isArguments$1,
	    isFinite: isFinite$1,
	    isNaN: isNaN$1,
	    isTypedArray: isTypedArray$1,
	    isEmpty: isEmpty,
	    isMatch: isMatch,
	    isEqual: isEqual,
	    isMap: isMap,
	    isWeakMap: isWeakMap,
	    isSet: isSet,
	    isWeakSet: isWeakSet,
	    keys: keys,
	    allKeys: allKeys,
	    values: values,
	    pairs: pairs,
	    invert: invert,
	    functions: functions,
	    methods: functions,
	    extend: extend,
	    extendOwn: extendOwn,
	    assign: extendOwn,
	    defaults: defaults,
	    create: create,
	    clone: clone,
	    tap: tap,
	    get: get,
	    has: has,
	    mapObject: mapObject,
	    identity: identity,
	    constant: constant,
	    noop: noop,
	    toPath: toPath$1,
	    property: property,
	    propertyOf: propertyOf,
	    matcher: matcher,
	    matches: matcher,
	    times: times,
	    random: random,
	    now: now,
	    escape: _escape,
	    unescape: _unescape,
	    templateSettings: templateSettings,
	    template: template,
	    result: result,
	    uniqueId: uniqueId,
	    chain: chain,
	    iteratee: iteratee,
	    partial: partial,
	    bind: bind,
	    bindAll: bindAll,
	    memoize: memoize,
	    delay: delay,
	    defer: defer,
	    throttle: throttle,
	    debounce: debounce,
	    wrap: wrap,
	    negate: negate,
	    compose: compose,
	    after: after,
	    before: before,
	    once: once,
	    findKey: findKey,
	    findIndex: findIndex,
	    findLastIndex: findLastIndex,
	    sortedIndex: sortedIndex,
	    indexOf: indexOf,
	    lastIndexOf: lastIndexOf,
	    find: find,
	    detect: find,
	    findWhere: findWhere,
	    each: each,
	    forEach: each,
	    map: map,
	    collect: map,
	    reduce: reduce,
	    foldl: reduce,
	    inject: reduce,
	    reduceRight: reduceRight,
	    foldr: reduceRight,
	    filter: filter,
	    select: filter,
	    reject: reject,
	    every: every,
	    all: every,
	    some: some,
	    any: some,
	    contains: contains,
	    includes: contains,
	    include: contains,
	    invoke: invoke,
	    pluck: pluck,
	    where: where,
	    max: max,
	    min: min,
	    shuffle: shuffle,
	    sample: sample,
	    sortBy: sortBy,
	    groupBy: groupBy,
	    indexBy: indexBy,
	    countBy: countBy,
	    partition: partition,
	    toArray: toArray,
	    size: size,
	    pick: pick,
	    omit: omit,
	    first: first,
	    head: first,
	    take: first,
	    initial: initial,
	    last: last,
	    rest: rest,
	    tail: rest,
	    drop: rest,
	    compact: compact,
	    flatten: flatten,
	    without: without,
	    uniq: uniq,
	    unique: uniq,
	    union: union,
	    intersection: intersection,
	    difference: difference,
	    unzip: unzip,
	    transpose: unzip,
	    zip: zip,
	    object: object,
	    range: range,
	    chunk: chunk,
	    mixin: mixin,
	    'default': _$1
	  };

	  // Default Export

	  // Add all of the Underscore functions to the wrapper object.
	  var _ = mixin(allExports);
	  // Legacy Node.js API.
	  _._ = _;

	  return _;

	})));
	//# sourceMappingURL=underscore-umd.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{"tactics":[{"id":"TA0043","name":"Reconnaissance","short_name":"reconnaissance","sort_order":0},{"id":"TA0042","name":"Resource Development","short_name":"resource-development","sort_order":1},{"id":"TA0001","name":"Initial Access","short_name":"initial-access","sort_order":2},{"id":"TA0002","name":"Execution","short_name":"execution","sort_order":3},{"id":"TA0003","name":"Persistence","short_name":"persistence","sort_order":4},{"id":"TA0004","name":"Privilege Escalation","short_name":"privilege-escalation","sort_order":5},{"id":"TA0005","name":"Defense Evasion","short_name":"defense-evasion","sort_order":6},{"id":"TA0006","name":"Credential Access","short_name":"credential-access","sort_order":7},{"id":"TA0007","name":"Discovery","short_name":"discovery","sort_order":8},{"id":"TA0008","name":"Lateral Movement","short_name":"lateral-movement","sort_order":9},{"id":"TA0009","name":"Collection","short_name":"collection","sort_order":10},{"id":"TA0011","name":"Command and Control","short_name":"command-and-control","sort_order":11},{"id":"TA0010","name":"Exfiltration","short_name":"exfiltration","sort_order":12},{"id":"TA0040","name":"Impact","short_name":"impact","sort_order":13}],"techniques":[{"id":"T1047","name":"Windows Management Instrumentation","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1047","platform":["Windows"]},{"id":"T1113","name":"Screen Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1113","platform":["Linux","macOS","Windows"]},{"id":"T1037","name":"Boot or Logon Initialization Scripts","tactics":["persistence","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1037","platform":["macOS","Windows","Linux"]},{"id":"T1557","name":"Adversary-in-the-Middle","tactics":["credential-access","collection"],"url":"https://attack.mitre.org/techniques/T1557","platform":["Windows","macOS","Linux","Network"]},{"id":"T1033","name":"System Owner/User Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1033","platform":["Linux","macOS","Windows","Network"]},{"id":"T1583","name":"Acquire Infrastructure","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1583","platform":["PRE"]},{"id":"T1613","name":"Container and Resource Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1613","platform":["Containers"]},{"id":"T1592","name":"Gather Victim Host Information","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1592","platform":["PRE"]},{"id":"T1003","name":"OS Credential Dumping","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1003","platform":["Windows","Linux","macOS"]},{"id":"T1129","name":"Shared Modules","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1129","platform":["Windows","macOS","Linux"]},{"id":"T1602","name":"Data from Configuration Repository","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1602","platform":["Network"]},{"id":"T1006","name":"Direct Volume Access","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1006","platform":["Windows"]},{"id":"T1014","name":"Rootkit","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1014","platform":["Linux","macOS","Windows"]},{"id":"T1123","name":"Audio Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1123","platform":["Linux","macOS","Windows"]},{"id":"T1543","name":"Create or Modify System Process","tactics":["persistence","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1543","platform":["Windows","macOS","Linux"]},{"id":"T1133","name":"External Remote Services","tactics":["persistence","initial-access"],"url":"https://attack.mitre.org/techniques/T1133","platform":["Windows","Linux","Containers","macOS"]},{"id":"T1539","name":"Steal Web Session Cookie","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1539","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1578","name":"Modify Cloud Compute Infrastructure","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1578","platform":["IaaS"]},{"id":"T1069","name":"Permission Groups Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1069","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1114","name":"Email Collection","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1114","platform":["Windows","Office 365","Google Workspace","macOS","Linux"]},{"id":"T1594","name":"Search Victim-Owned Websites","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1594","platform":["PRE"]},{"id":"T1561","name":"Disk Wipe","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1561","platform":["Linux","macOS","Windows","Network"]},{"id":"T1615","name":"Group Policy Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1615","platform":["Windows"]},{"id":"T1025","name":"Data from Removable Media","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1025","platform":["Linux","macOS","Windows"]},{"id":"T1547","name":"Boot or Logon Autostart Execution","tactics":["persistence","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1547","platform":["Linux","macOS","Windows"]},{"id":"T1600","name":"Weaken Encryption","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1600","platform":["Network"]},{"id":"T1489","name":"Service Stop","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1489","platform":["Windows","Linux","macOS"]},{"id":"T1652","name":"Device Driver Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1652","platform":["Linux","macOS","Windows"]},{"id":"T1564","name":"Hide Artifacts","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1564","platform":["Linux","macOS","Windows","Office 365"]},{"id":"T1080","name":"Taint Shared Content","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1080","platform":["Windows","Office 365","SaaS","Linux","macOS"]},{"id":"T1137","name":"Office Application Startup","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1137","platform":["Windows","Office 365"]},{"id":"T1119","name":"Automated Collection","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1119","platform":["Linux","macOS","Windows","IaaS","SaaS"]},{"id":"T1115","name":"Clipboard Data","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1115","platform":["Linux","Windows","macOS"]},{"id":"T1007","name":"System Service Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1007","platform":["Windows","macOS","Linux"]},{"id":"T1040","name":"Network Sniffing","tactics":["credential-access","discovery"],"url":"https://attack.mitre.org/techniques/T1040","platform":["Linux","macOS","Windows","Network","IaaS"]},{"id":"T1530","name":"Data from Cloud Storage","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1530","platform":["IaaS","SaaS","Google Workspace","Office 365"]},{"id":"T1135","name":"Network Share Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1135","platform":["macOS","Windows","Linux"]},{"id":"T1120","name":"Peripheral Device Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1120","platform":["Windows","macOS","Linux"]},{"id":"T1082","name":"System Information Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1082","platform":["Windows","IaaS","Linux","macOS","Network"]},{"id":"T1071","name":"Application Layer Protocol","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1071","platform":["Linux","macOS","Windows"]},{"id":"T1053","name":"Scheduled Task/Job","tactics":["execution","persistence","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1053","platform":["Windows","Linux","macOS","Containers"]},{"id":"T1176","name":"Browser Extensions","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1176","platform":["Linux","macOS","Windows"]},{"id":"T1106","name":"Native API","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1106","platform":["Windows","macOS","Linux"]},{"id":"T1202","name":"Indirect Command Execution","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1202","platform":["Windows"]},{"id":"T1091","name":"Replication Through Removable Media","tactics":["lateral-movement","initial-access"],"url":"https://attack.mitre.org/techniques/T1091","platform":["Windows"]},{"id":"T1005","name":"Data from Local System","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1005","platform":["Linux","macOS","Windows","Network"]},{"id":"T1140","name":"Deobfuscate/Decode Files or Information","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1140","platform":["Windows","Linux","macOS"]},{"id":"T1562","name":"Impair Defenses","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1562","platform":["Windows","Office 365","IaaS","Linux","macOS","Containers","Network"]},{"id":"T1195","name":"Supply Chain Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1195","platform":["Linux","Windows","macOS"]},{"id":"T1190","name":"Exploit Public-Facing Application","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1190","platform":["Windows","IaaS","Network","Linux","macOS","Containers"]},{"id":"T1558","name":"Steal or Forge Kerberos Tickets","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1558","platform":["Windows","Linux","macOS"]},{"id":"T1555","name":"Credentials from Password Stores","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1555","platform":["Linux","macOS","Windows","IaaS"]},{"id":"T1567","name":"Exfiltration Over Web Service","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1567","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1219","name":"Remote Access Software","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1219","platform":["Linux","Windows","macOS"]},{"id":"T1036","name":"Masquerading","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1036","platform":["Linux","macOS","Windows","Containers"]},{"id":"T1552","name":"Unsecured Credentials","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1552","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers","Network"]},{"id":"T1659","name":"Content Injection","tactics":["initial-access","command-and-control"],"url":"https://attack.mitre.org/techniques/T1659","platform":["Linux","macOS","Windows"]},{"id":"T1055","name":"Process Injection","tactics":["defense-evasion","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1055","platform":["Linux","macOS","Windows"]},{"id":"T1205","name":"Traffic Signaling","tactics":["defense-evasion","persistence","command-and-control"],"url":"https://attack.mitre.org/techniques/T1205","platform":["Linux","macOS","Windows","Network"]},{"id":"T1218","name":"System Binary Proxy Execution","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1218","platform":["Windows","Linux","macOS"]},{"id":"T1620","name":"Reflective Code Loading","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1620","platform":["macOS","Linux","Windows"]},{"id":"T1611","name":"Escape to Host","tactics":["privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1611","platform":["Windows","Linux","Containers"]},{"id":"T1010","name":"Application Window Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1010","platform":["macOS","Windows","Linux"]},{"id":"T1029","name":"Scheduled Transfer","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1029","platform":["Linux","macOS","Windows"]},{"id":"T1525","name":"Implant Internal Image","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1525","platform":["IaaS","Containers"]},{"id":"T1572","name":"Protocol Tunneling","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1572","platform":["Linux","macOS","Windows"]},{"id":"T1550","name":"Use Alternate Authentication Material","tactics":["defense-evasion","lateral-movement"],"url":"https://attack.mitre.org/techniques/T1550","platform":["Windows","Office 365","SaaS","Google Workspace","IaaS","Containers"]},{"id":"T1011","name":"Exfiltration Over Other Network Medium","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1011","platform":["Linux","macOS","Windows"]},{"id":"T1589","name":"Gather Victim Identity Information","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1589","platform":["PRE"]},{"id":"T1560","name":"Archive Collected Data","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1560","platform":["Linux","macOS","Windows"]},{"id":"T1185","name":"Browser Session Hijacking","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1185","platform":["Windows"]},{"id":"T1021","name":"Remote Services","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1021","platform":["Linux","macOS","Windows","IaaS"]},{"id":"T1596","name":"Search Open Technical Databases","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1596","platform":["PRE"]},{"id":"T1207","name":"Rogue Domain Controller","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1207","platform":["Windows"]},{"id":"T1610","name":"Deploy Container","tactics":["defense-evasion","execution"],"url":"https://attack.mitre.org/techniques/T1610","platform":["Containers"]},{"id":"T1112","name":"Modify Registry","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1112","platform":["Windows"]},{"id":"T1580","name":"Cloud Infrastructure Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1580","platform":["IaaS"]},{"id":"T1491","name":"Defacement","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1491","platform":["Windows","IaaS","Linux","macOS"]},{"id":"T1535","name":"Unused/Unsupported Cloud Regions","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1535","platform":["IaaS"]},{"id":"T1563","name":"Remote Service Session Hijacking","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1563","platform":["Linux","macOS","Windows"]},{"id":"T1217","name":"Browser Information Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1217","platform":["Linux","Windows","macOS"]},{"id":"T1092","name":"Communication Through Removable Media","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1092","platform":["Linux","macOS","Windows"]},{"id":"T1222","name":"File and Directory Permissions Modification","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1222","platform":["Linux","Windows","macOS"]},{"id":"T1595","name":"Active Scanning","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1595","platform":["PRE"]},{"id":"T1548","name":"Abuse Elevation Control Mechanism","tactics":["privilege-escalation","defense-evasion"],"url":"https://attack.mitre.org/techniques/T1548","platform":["Linux","macOS","Windows","Office 365","IaaS","Google Workspace","Azure AD"]},{"id":"T1125","name":"Video Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1125","platform":["Windows","macOS","Linux"]},{"id":"T1016","name":"System Network Configuration Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1016","platform":["Linux","macOS","Windows","Network"]},{"id":"T1087","name":"Account Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1087","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1090","name":"Proxy","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1090","platform":["Linux","macOS","Windows","Network"]},{"id":"T1059","name":"Command and Scripting Interpreter","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1059","platform":["Linux","macOS","Windows","Network","Office 365","Azure AD","IaaS","Google Workspace"]},{"id":"T1482","name":"Domain Trust Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1482","platform":["Windows"]},{"id":"T1020","name":"Automated Exfiltration","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1020","platform":["Linux","macOS","Windows","Network"]},{"id":"T1070","name":"Indicator Removal","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1070","platform":["Linux","macOS","Windows","Containers","Network","Office 365","Google Workspace"]},{"id":"T1609","name":"Container Administration Command","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1609","platform":["Containers"]},{"id":"T1083","name":"File and Directory Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1083","platform":["Linux","macOS","Windows","Network"]},{"id":"T1568","name":"Dynamic Resolution","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1568","platform":["Linux","macOS","Windows"]},{"id":"T1647","name":"Plist File Modification","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1647","platform":["macOS"]},{"id":"T1074","name":"Data Staged","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1074","platform":["Windows","IaaS","Linux","macOS"]},{"id":"T1649","name":"Steal or Forge Authentication Certificates","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1649","platform":["Windows","Linux","macOS","Azure AD"]},{"id":"T1049","name":"System Network Connections Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1049","platform":["Windows","IaaS","Linux","macOS","Network"]},{"id":"T1584","name":"Compromise Infrastructure","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1584","platform":["PRE"]},{"id":"T1542","name":"Pre-OS Boot","tactics":["defense-evasion","persistence"],"url":"https://attack.mitre.org/techniques/T1542","platform":["Linux","Windows","Network","macOS"]},{"id":"T1612","name":"Build Image on Host","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1612","platform":["Containers"]},{"id":"T1586","name":"Compromise Accounts","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1586","platform":["PRE"]},{"id":"T1497","name":"Virtualization/Sandbox Evasion","tactics":["defense-evasion","discovery"],"url":"https://attack.mitre.org/techniques/T1497","platform":["Windows","macOS","Linux"]},{"id":"T1102","name":"Web Service","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1102","platform":["Linux","macOS","Windows"]},{"id":"T1608","name":"Stage Capabilities","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1608","platform":["PRE"]},{"id":"T1104","name":"Multi-Stage Channels","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1104","platform":["Linux","macOS","Windows"]},{"id":"T1657","name":"Financial Theft","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1657","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1480","name":"Execution Guardrails","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1480","platform":["Linux","macOS","Windows"]},{"id":"T1619","name":"Cloud Storage Object Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1619","platform":["IaaS"]},{"id":"T1654","name":"Log Enumeration","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1654","platform":["Linux","macOS","Windows","IaaS"]},{"id":"T1528","name":"Steal Application Access Token","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1528","platform":["SaaS","Office 365","Azure AD","Google Workspace","Containers"]},{"id":"T1204","name":"User Execution","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1204","platform":["Linux","Windows","macOS","IaaS","Containers"]},{"id":"T1057","name":"Process Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1057","platform":["Linux","macOS","Windows","Network"]},{"id":"T1072","name":"Software Deployment Tools","tactics":["execution","lateral-movement"],"url":"https://attack.mitre.org/techniques/T1072","platform":["Linux","macOS","Windows","Network"]},{"id":"T1041","name":"Exfiltration Over C2 Channel","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1041","platform":["Linux","macOS","Windows"]},{"id":"T1591","name":"Gather Victim Org Information","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1591","platform":["PRE"]},{"id":"T1606","name":"Forge Web Credentials","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1606","platform":["SaaS","Windows","macOS","Linux","Azure AD","Office 365","Google Workspace","IaaS"]},{"id":"T1621","name":"Multi-Factor Authentication Request Generation","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1621","platform":["Windows","Office 365","Linux","macOS","IaaS","SaaS","Azure AD","Google Workspace"]},{"id":"T1554","name":"Compromise Client Software Binary","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1554","platform":["Linux","macOS","Windows"]},{"id":"T1212","name":"Exploitation for Credential Access","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1212","platform":["Linux","Windows","macOS","Azure AD"]},{"id":"T1590","name":"Gather Victim Network Information","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1590","platform":["PRE"]},{"id":"T1210","name":"Exploitation of Remote Services","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1210","platform":["Linux","Windows","macOS"]},{"id":"T1534","name":"Internal Spearphishing","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1534","platform":["Windows","macOS","Linux","Office 365","SaaS","Google Workspace"]},{"id":"T1199","name":"Trusted Relationship","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1199","platform":["Windows","SaaS","IaaS","Linux","macOS","Office 365"]},{"id":"T1593","name":"Search Open Websites/Domains","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1593","platform":["PRE"]},{"id":"T1098","name":"Account Manipulation","tactics":["persistence","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1098","platform":["Windows","Azure AD","Office 365","IaaS","Linux","macOS","Google Workspace","SaaS","Network","Containers"]},{"id":"T1048","name":"Exfiltration Over Alternative Protocol","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1048","platform":["Linux","macOS","Windows","Office 365","SaaS","IaaS","Google Workspace","Network"]},{"id":"T1597","name":"Search Closed Sources","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1597","platform":["PRE"]},{"id":"T1566","name":"Phishing","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1566","platform":["Linux","macOS","Windows","SaaS","Office 365","Google Workspace"]},{"id":"T1110","name":"Brute Force","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1110","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers","Network"]},{"id":"T1565","name":"Data Manipulation","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1565","platform":["Linux","macOS","Windows"]},{"id":"T1559","name":"Inter-Process Communication","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1559","platform":["Windows","macOS","Linux"]},{"id":"T1001","name":"Data Obfuscation","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1001","platform":["Linux","macOS","Windows"]},{"id":"T1039","name":"Data from Network Shared Drive","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1039","platform":["Linux","macOS","Windows"]},{"id":"T1601","name":"Modify System Image","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1601","platform":["Network"]},{"id":"T1574","name":"Hijack Execution Flow","tactics":["persistence","privilege-escalation","defense-evasion"],"url":"https://attack.mitre.org/techniques/T1574","platform":["Linux","macOS","Windows"]},{"id":"T1078","name":"Valid Accounts","tactics":["defense-evasion","persistence","privilege-escalation","initial-access"],"url":"https://attack.mitre.org/techniques/T1078","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers","Network"]},{"id":"T1571","name":"Non-Standard Port","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1571","platform":["Linux","macOS","Windows"]},{"id":"T1068","name":"Exploitation for Privilege Escalation","tactics":["privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1068","platform":["Linux","macOS","Windows","Containers"]},{"id":"T1531","name":"Account Access Removal","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1531","platform":["Linux","macOS","Windows","Office 365","SaaS"]},{"id":"T1027","name":"Obfuscated Files or Information","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1027","platform":["Linux","macOS","Windows"]},{"id":"T1201","name":"Password Policy Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1201","platform":["Windows","Linux","macOS","IaaS","Network"]},{"id":"T1546","name":"Event Triggered Execution","tactics":["privilege-escalation","persistence"],"url":"https://attack.mitre.org/techniques/T1546","platform":["Linux","macOS","Windows","SaaS","IaaS","Office 365"]},{"id":"T1187","name":"Forced Authentication","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1187","platform":["Windows"]},{"id":"T1599","name":"Network Boundary Bridging","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1599","platform":["Network"]},{"id":"T1486","name":"Data Encrypted for Impact","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1486","platform":["Linux","macOS","Windows","IaaS"]},{"id":"T1553","name":"Subvert Trust Controls","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1553","platform":["Windows","macOS","Linux"]},{"id":"T1573","name":"Encrypted Channel","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1573","platform":["Linux","macOS","Windows"]},{"id":"T1056","name":"Input Capture","tactics":["collection","credential-access"],"url":"https://attack.mitre.org/techniques/T1056","platform":["Linux","macOS","Windows","Network"]},{"id":"T1203","name":"Exploitation for Client Execution","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1203","platform":["Linux","Windows","macOS"]},{"id":"T1570","name":"Lateral Tool Transfer","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1570","platform":["Linux","macOS","Windows"]},{"id":"T1095","name":"Non-Application Layer Protocol","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1095","platform":["Windows","Linux","macOS","Network"]},{"id":"T1012","name":"Query Registry","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1012","platform":["Windows"]},{"id":"T1030","name":"Data Transfer Size Limits","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1030","platform":["Linux","macOS","Windows"]},{"id":"T1499","name":"Endpoint Denial of Service","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1499","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1614","name":"System Location Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1614","platform":["Windows","Linux","macOS","IaaS"]},{"id":"T1197","name":"BITS Jobs","tactics":["defense-evasion","persistence"],"url":"https://attack.mitre.org/techniques/T1197","platform":["Windows"]},{"id":"T1656","name":"Impersonation","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1656","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1132","name":"Data Encoding","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1132","platform":["Linux","macOS","Windows"]},{"id":"T1598","name":"Phishing for Information","tactics":["reconnaissance"],"url":"https://attack.mitre.org/techniques/T1598","platform":["PRE"]},{"id":"T1496","name":"Resource Hijacking","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1496","platform":["Windows","IaaS","Linux","macOS","Containers"]},{"id":"T1585","name":"Establish Accounts","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1585","platform":["PRE"]},{"id":"T1588","name":"Obtain Capabilities","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1588","platform":["PRE"]},{"id":"T1569","name":"System Services","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1569","platform":["Windows","macOS","Linux"]},{"id":"T1650","name":"Acquire Access","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1650","platform":["PRE"]},{"id":"T1213","name":"Data from Information Repositories","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1213","platform":["Linux","Windows","macOS","SaaS","Office 365","Google Workspace","IaaS"]},{"id":"T1200","name":"Hardware Additions","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1200","platform":["Windows","Linux","macOS"]},{"id":"T1505","name":"Server Software Component","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1505","platform":["Windows","Linux","macOS","Network"]},{"id":"T1485","name":"Data Destruction","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1485","platform":["Windows","IaaS","Linux","macOS","Containers"]},{"id":"T1537","name":"Transfer Data to Cloud Account","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1537","platform":["IaaS"]},{"id":"T1189","name":"Drive-by Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1189","platform":["Windows","Linux","macOS","SaaS"]},{"id":"T1498","name":"Network Denial of Service","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1498","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1651","name":"Cloud Administration Command","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1651","platform":["IaaS","Azure AD"]},{"id":"T1221","name":"Template Injection","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1221","platform":["Windows"]},{"id":"T1134","name":"Access Token Manipulation","tactics":["defense-evasion","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1134","platform":["Windows"]},{"id":"T1111","name":"Multi-Factor Authentication Interception","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1111","platform":["Linux","Windows","macOS"]},{"id":"T1136","name":"Create Account","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1136","platform":["Windows","Azure AD","Office 365","IaaS","Linux","macOS","Google Workspace","Network","Containers","SaaS"]},{"id":"T1526","name":"Cloud Service Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1526","platform":["Azure AD","Office 365","SaaS","IaaS","Google Workspace"]},{"id":"T1018","name":"Remote System Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1018","platform":["Linux","macOS","Windows","Network"]},{"id":"T1046","name":"Network Service Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1046","platform":["Windows","IaaS","Linux","macOS","Containers","Network"]},{"id":"T1518","name":"Software Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1518","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1538","name":"Cloud Service Dashboard","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1538","platform":["Azure AD","Office 365","IaaS","Google Workspace"]},{"id":"T1622","name":"Debugger Evasion","tactics":["defense-evasion","discovery"],"url":"https://attack.mitre.org/techniques/T1622","platform":["Windows","Linux","macOS"]},{"id":"T1052","name":"Exfiltration Over Physical Medium","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1052","platform":["Linux","macOS","Windows"]},{"id":"T1105","name":"Ingress Tool Transfer","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1105","platform":["Linux","macOS","Windows"]},{"id":"T1648","name":"Serverless Execution","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1648","platform":["SaaS","IaaS","Office 365"]},{"id":"T1653","name":"Power Settings","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1653","platform":["Windows","Linux","macOS","Network"]},{"id":"T1484","name":"Domain Policy Modification","tactics":["defense-evasion","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1484","platform":["Windows","Azure AD"]},{"id":"T1220","name":"XSL Script Processing","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1220","platform":["Windows"]},{"id":"T1587","name":"Develop Capabilities","tactics":["resource-development"],"url":"https://attack.mitre.org/techniques/T1587","platform":["PRE"]},{"id":"T1008","name":"Fallback Channels","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1008","platform":["Linux","Windows","macOS"]},{"id":"T1124","name":"System Time Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1124","platform":["Windows","Network"]},{"id":"T1556","name":"Modify Authentication Process","tactics":["credential-access","defense-evasion","persistence"],"url":"https://attack.mitre.org/techniques/T1556","platform":["Windows","Linux","macOS","Network","Azure AD","Google Workspace","IaaS","Office 365","SaaS"]},{"id":"T1495","name":"Firmware Corruption","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1495","platform":["Linux","macOS","Windows","Network"]},{"id":"T1490","name":"Inhibit System Recovery","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1490","platform":["Windows","macOS","Linux","Network","IaaS","Containers"]},{"id":"T1216","name":"System Script Proxy Execution","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1216","platform":["Windows"]},{"id":"T1211","name":"Exploitation for Defense Evasion","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1211","platform":["Linux","Windows","macOS","SaaS","IaaS"]},{"id":"T1127","name":"Trusted Developer Utilities Proxy Execution","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1127","platform":["Windows"]},{"id":"T1529","name":"System Shutdown/Reboot","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1529","platform":["Linux","macOS","Windows","Network"]}],"sub_techniques":[{"id":"T1001.001","short_id":".001","name":"Junk Data","technique":"T1001","url":"https://attack.mitre.org/techniques/T1001/001","platform":["Linux","macOS","Windows"]},{"id":"T1001.002","short_id":".002","name":"Steganography","technique":"T1001","url":"https://attack.mitre.org/techniques/T1001/002","platform":["Linux","macOS","Windows"]},{"id":"T1001.003","short_id":".003","name":"Protocol Impersonation","technique":"T1001","url":"https://attack.mitre.org/techniques/T1001/003","platform":["Linux","Windows","macOS"]},{"id":"T1003.001","short_id":".001","name":"LSASS Memory","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/001","platform":["Windows"]},{"id":"T1003.002","short_id":".002","name":"Security Account Manager","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/002","platform":["Windows"]},{"id":"T1003.003","short_id":".003","name":"NTDS","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/003","platform":["Windows"]},{"id":"T1003.004","short_id":".004","name":"LSA Secrets","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/004","platform":["Windows"]},{"id":"T1003.005","short_id":".005","name":"Cached Domain Credentials","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/005","platform":["Windows"]},{"id":"T1003.006","short_id":".006","name":"DCSync","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/006","platform":["Windows"]},{"id":"T1003.007","short_id":".007","name":"Proc Filesystem","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/007","platform":["Linux"]},{"id":"T1003.008","short_id":".008","name":"/etc/passwd and /etc/shadow","technique":"T1003","url":"https://attack.mitre.org/techniques/T1003/008","platform":["Linux"]},{"id":"T1011.001","short_id":".001","name":"Exfiltration Over Bluetooth","technique":"T1011","url":"https://attack.mitre.org/techniques/T1011/001","platform":["Linux","macOS","Windows"]},{"id":"T1016.001","short_id":".001","name":"Internet Connection Discovery","technique":"T1016","url":"https://attack.mitre.org/techniques/T1016/001","platform":["Windows","Linux","macOS"]},{"id":"T1016.002","short_id":".002","name":"Wi-Fi Discovery","technique":"T1016","url":"https://attack.mitre.org/techniques/T1016/002","platform":["Linux","macOS","Windows"]},{"id":"T1020.001","short_id":".001","name":"Traffic Duplication","technique":"T1020","url":"https://attack.mitre.org/techniques/T1020/001","platform":["Network","IaaS"]},{"id":"T1021.001","short_id":".001","name":"Remote Desktop Protocol","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/001","platform":["Windows"]},{"id":"T1021.002","short_id":".002","name":"SMB/Windows Admin Shares","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/002","platform":["Windows"]},{"id":"T1021.003","short_id":".003","name":"Distributed Component Object Model","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/003","platform":["Windows"]},{"id":"T1021.004","short_id":".004","name":"SSH","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/004","platform":["Linux","macOS"]},{"id":"T1021.005","short_id":".005","name":"VNC","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/005","platform":["Linux","macOS","Windows"]},{"id":"T1021.006","short_id":".006","name":"Windows Remote Management","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/006","platform":["Windows"]},{"id":"T1021.007","short_id":".007","name":"Cloud Services","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/007","platform":["Office 365","Azure AD","SaaS","IaaS","Google Workspace"]},{"id":"T1021.008","short_id":".008","name":"Direct Cloud VM Connections","technique":"T1021","url":"https://attack.mitre.org/techniques/T1021/008","platform":["IaaS"]},{"id":"T1027.001","short_id":".001","name":"Binary Padding","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/001","platform":["Linux","macOS","Windows"]},{"id":"T1027.002","short_id":".002","name":"Software Packing","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/002","platform":["macOS","Windows","Linux"]},{"id":"T1027.003","short_id":".003","name":"Steganography","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/003","platform":["Linux","macOS","Windows"]},{"id":"T1027.004","short_id":".004","name":"Compile After Delivery","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/004","platform":["Linux","macOS","Windows"]},{"id":"T1027.005","short_id":".005","name":"Indicator Removal from Tools","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/005","platform":["Linux","macOS","Windows"]},{"id":"T1027.006","short_id":".006","name":"HTML Smuggling","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/006","platform":["Windows","Linux","macOS"]},{"id":"T1027.007","short_id":".007","name":"Dynamic API Resolution","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/007","platform":["Windows"]},{"id":"T1027.008","short_id":".008","name":"Stripped Payloads","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/008","platform":["macOS","Linux","Windows"]},{"id":"T1027.009","short_id":".009","name":"Embedded Payloads","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/009","platform":["macOS","Windows","Linux"]},{"id":"T1027.010","short_id":".010","name":"Command Obfuscation","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/010","platform":["Linux","macOS","Windows"]},{"id":"T1027.011","short_id":".011","name":"Fileless Storage","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/011","platform":["Windows"]},{"id":"T1027.012","short_id":".012","name":"LNK Icon Smuggling","technique":"T1027","url":"https://attack.mitre.org/techniques/T1027/012","platform":["Windows"]},{"id":"T1036.001","short_id":".001","name":"Invalid Code Signature","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/001","platform":["macOS","Windows"]},{"id":"T1036.002","short_id":".002","name":"Right-to-Left Override","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/002","platform":["Linux","macOS","Windows"]},{"id":"T1036.003","short_id":".003","name":"Rename System Utilities","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/003","platform":["Linux","macOS","Windows"]},{"id":"T1036.004","short_id":".004","name":"Masquerade Task or Service","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/004","platform":["Windows","Linux","macOS"]},{"id":"T1036.005","short_id":".005","name":"Match Legitimate Name or Location","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/005","platform":["Linux","macOS","Windows","Containers"]},{"id":"T1036.006","short_id":".006","name":"Space after Filename","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/006","platform":["Linux","macOS"]},{"id":"T1036.007","short_id":".007","name":"Double File Extension","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/007","platform":["Windows"]},{"id":"T1036.008","short_id":".008","name":"Masquerade File Type","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/008","platform":["Linux","macOS","Windows"]},{"id":"T1036.009","short_id":".009","name":"Break Process Trees","technique":"T1036","url":"https://attack.mitre.org/techniques/T1036/009","platform":["Linux","macOS"]},{"id":"T1037.001","short_id":".001","name":"Logon Script (Windows)","technique":"T1037","url":"https://attack.mitre.org/techniques/T1037/001","platform":["Windows"]},{"id":"T1037.002","short_id":".002","name":"Login Hook","technique":"T1037","url":"https://attack.mitre.org/techniques/T1037/002","platform":["macOS"]},{"id":"T1037.003","short_id":".003","name":"Network Logon Script","technique":"T1037","url":"https://attack.mitre.org/techniques/T1037/003","platform":["Windows"]},{"id":"T1037.004","short_id":".004","name":"RC Scripts","technique":"T1037","url":"https://attack.mitre.org/techniques/T1037/004","platform":["macOS","Linux"]},{"id":"T1037.005","short_id":".005","name":"Startup Items","technique":"T1037","url":"https://attack.mitre.org/techniques/T1037/005","platform":["macOS"]},{"id":"T1048.001","short_id":".001","name":"Exfiltration Over Symmetric Encrypted Non-C2 Protocol","technique":"T1048","url":"https://attack.mitre.org/techniques/T1048/001","platform":["Linux","macOS","Windows"]},{"id":"T1048.002","short_id":".002","name":"Exfiltration Over Asymmetric Encrypted Non-C2 Protocol","technique":"T1048","url":"https://attack.mitre.org/techniques/T1048/002","platform":["Linux","macOS","Windows"]},{"id":"T1048.003","short_id":".003","name":"Exfiltration Over Unencrypted Non-C2 Protocol","technique":"T1048","url":"https://attack.mitre.org/techniques/T1048/003","platform":["Linux","macOS","Windows","Network"]},{"id":"T1052.001","short_id":".001","name":"Exfiltration over USB","technique":"T1052","url":"https://attack.mitre.org/techniques/T1052/001","platform":["Linux","macOS","Windows"]},{"id":"T1053.002","short_id":".002","name":"At","technique":"T1053","url":"https://attack.mitre.org/techniques/T1053/002","platform":["Windows","Linux","macOS"]},{"id":"T1053.003","short_id":".003","name":"Cron","technique":"T1053","url":"https://attack.mitre.org/techniques/T1053/003","platform":["Linux","macOS"]},{"id":"T1053.005","short_id":".005","name":"Scheduled Task","technique":"T1053","url":"https://attack.mitre.org/techniques/T1053/005","platform":["Windows"]},{"id":"T1053.006","short_id":".006","name":"Systemd Timers","technique":"T1053","url":"https://attack.mitre.org/techniques/T1053/006","platform":["Linux"]},{"id":"T1053.007","short_id":".007","name":"Container Orchestration Job","technique":"T1053","url":"https://attack.mitre.org/techniques/T1053/007","platform":["Containers"]},{"id":"T1055.001","short_id":".001","name":"Dynamic-link Library Injection","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/001","platform":["Windows"]},{"id":"T1055.002","short_id":".002","name":"Portable Executable Injection","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/002","platform":["Windows"]},{"id":"T1055.003","short_id":".003","name":"Thread Execution Hijacking","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/003","platform":["Windows"]},{"id":"T1055.004","short_id":".004","name":"Asynchronous Procedure Call","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/004","platform":["Windows"]},{"id":"T1055.005","short_id":".005","name":"Thread Local Storage","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/005","platform":["Windows"]},{"id":"T1055.008","short_id":".008","name":"Ptrace System Calls","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/008","platform":["Linux"]},{"id":"T1055.009","short_id":".009","name":"Proc Memory","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/009","platform":["Linux"]},{"id":"T1055.011","short_id":".011","name":"Extra Window Memory Injection","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/011","platform":["Windows"]},{"id":"T1055.012","short_id":".012","name":"Process Hollowing","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/012","platform":["Windows"]},{"id":"T1055.013","short_id":".013","name":"Process Doppelg\xE4nging","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/013","platform":["Windows"]},{"id":"T1055.014","short_id":".014","name":"VDSO Hijacking","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/014","platform":["Linux"]},{"id":"T1055.015","short_id":".015","name":"ListPlanting","technique":"T1055","url":"https://attack.mitre.org/techniques/T1055/015","platform":["Windows"]},{"id":"T1056.001","short_id":".001","name":"Keylogging","technique":"T1056","url":"https://attack.mitre.org/techniques/T1056/001","platform":["Windows","macOS","Linux","Network"]},{"id":"T1056.002","short_id":".002","name":"GUI Input Capture","technique":"T1056","url":"https://attack.mitre.org/techniques/T1056/002","platform":["macOS","Windows","Linux"]},{"id":"T1056.003","short_id":".003","name":"Web Portal Capture","technique":"T1056","url":"https://attack.mitre.org/techniques/T1056/003","platform":["Linux","macOS","Windows"]},{"id":"T1056.004","short_id":".004","name":"Credential API Hooking","technique":"T1056","url":"https://attack.mitre.org/techniques/T1056/004","platform":["Windows"]},{"id":"T1059.001","short_id":".001","name":"PowerShell","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/001","platform":["Windows"]},{"id":"T1059.002","short_id":".002","name":"AppleScript","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/002","platform":["macOS"]},{"id":"T1059.003","short_id":".003","name":"Windows Command Shell","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/003","platform":["Windows"]},{"id":"T1059.004","short_id":".004","name":"Unix Shell","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/004","platform":["macOS","Linux"]},{"id":"T1059.005","short_id":".005","name":"Visual Basic","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/005","platform":["Windows","macOS","Linux"]},{"id":"T1059.006","short_id":".006","name":"Python","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/006","platform":["Linux","Windows","macOS"]},{"id":"T1059.007","short_id":".007","name":"JavaScript","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/007","platform":["Windows","macOS","Linux"]},{"id":"T1059.008","short_id":".008","name":"Network Device CLI","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/008","platform":["Network"]},{"id":"T1059.009","short_id":".009","name":"Cloud API","technique":"T1059","url":"https://attack.mitre.org/techniques/T1059/009","platform":["IaaS","Azure AD","Office 365","SaaS","Google Workspace"]},{"id":"T1069.001","short_id":".001","name":"Local Groups","technique":"T1069","url":"https://attack.mitre.org/techniques/T1069/001","platform":["Linux","macOS","Windows"]},{"id":"T1069.002","short_id":".002","name":"Domain Groups","technique":"T1069","url":"https://attack.mitre.org/techniques/T1069/002","platform":["Linux","macOS","Windows"]},{"id":"T1069.003","short_id":".003","name":"Cloud Groups","technique":"T1069","url":"https://attack.mitre.org/techniques/T1069/003","platform":["Azure AD","Office 365","SaaS","IaaS","Google Workspace"]},{"id":"T1070.001","short_id":".001","name":"Clear Windows Event Logs","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/001","platform":["Windows"]},{"id":"T1070.002","short_id":".002","name":"Clear Linux or Mac System Logs","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/002","platform":["Linux","macOS"]},{"id":"T1070.003","short_id":".003","name":"Clear Command History","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/003","platform":["Linux","macOS","Windows","Network"]},{"id":"T1070.004","short_id":".004","name":"File Deletion","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/004","platform":["Linux","macOS","Windows"]},{"id":"T1070.005","short_id":".005","name":"Network Share Connection Removal","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/005","platform":["Windows"]},{"id":"T1070.006","short_id":".006","name":"Timestomp","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/006","platform":["Linux","macOS","Windows"]},{"id":"T1070.007","short_id":".007","name":"Clear Network Connection History and Configurations","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/007","platform":["Linux","macOS","Windows","Network"]},{"id":"T1070.008","short_id":".008","name":"Clear Mailbox Data","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/008","platform":["Linux","macOS","Windows","Office 365","Google Workspace"]},{"id":"T1070.009","short_id":".009","name":"Clear Persistence","technique":"T1070","url":"https://attack.mitre.org/techniques/T1070/009","platform":["Linux","macOS","Windows"]},{"id":"T1071.001","short_id":".001","name":"Web Protocols","technique":"T1071","url":"https://attack.mitre.org/techniques/T1071/001","platform":["Linux","macOS","Windows"]},{"id":"T1071.002","short_id":".002","name":"File Transfer Protocols","technique":"T1071","url":"https://attack.mitre.org/techniques/T1071/002","platform":["Linux","macOS","Windows"]},{"id":"T1071.003","short_id":".003","name":"Mail Protocols","technique":"T1071","url":"https://attack.mitre.org/techniques/T1071/003","platform":["Linux","macOS","Windows"]},{"id":"T1071.004","short_id":".004","name":"DNS","technique":"T1071","url":"https://attack.mitre.org/techniques/T1071/004","platform":["Linux","macOS","Windows"]},{"id":"T1074.001","short_id":".001","name":"Local Data Staging","technique":"T1074","url":"https://attack.mitre.org/techniques/T1074/001","platform":["Linux","macOS","Windows"]},{"id":"T1074.002","short_id":".002","name":"Remote Data Staging","technique":"T1074","url":"https://attack.mitre.org/techniques/T1074/002","platform":["Windows","IaaS","Linux","macOS"]},{"id":"T1078.001","short_id":".001","name":"Default Accounts","technique":"T1078","url":"https://attack.mitre.org/techniques/T1078/001","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1078.002","short_id":".002","name":"Domain Accounts","technique":"T1078","url":"https://attack.mitre.org/techniques/T1078/002","platform":["Linux","macOS","Windows"]},{"id":"T1078.003","short_id":".003","name":"Local Accounts","technique":"T1078","url":"https://attack.mitre.org/techniques/T1078/003","platform":["Linux","macOS","Windows","Containers","Network"]},{"id":"T1078.004","short_id":".004","name":"Cloud Accounts","technique":"T1078","url":"https://attack.mitre.org/techniques/T1078/004","platform":["Azure AD","Office 365","SaaS","IaaS","Google Workspace"]},{"id":"T1087.001","short_id":".001","name":"Local Account","technique":"T1087","url":"https://attack.mitre.org/techniques/T1087/001","platform":["Linux","macOS","Windows"]},{"id":"T1087.002","short_id":".002","name":"Domain Account","technique":"T1087","url":"https://attack.mitre.org/techniques/T1087/002","platform":["Linux","macOS","Windows"]},{"id":"T1087.003","short_id":".003","name":"Email Account","technique":"T1087","url":"https://attack.mitre.org/techniques/T1087/003","platform":["Windows","Office 365","Google Workspace"]},{"id":"T1087.004","short_id":".004","name":"Cloud Account","technique":"T1087","url":"https://attack.mitre.org/techniques/T1087/004","platform":["Azure AD","Office 365","SaaS","IaaS","Google Workspace"]},{"id":"T1090.001","short_id":".001","name":"Internal Proxy","technique":"T1090","url":"https://attack.mitre.org/techniques/T1090/001","platform":["Linux","macOS","Windows"]},{"id":"T1090.002","short_id":".002","name":"External Proxy","technique":"T1090","url":"https://attack.mitre.org/techniques/T1090/002","platform":["Linux","macOS","Windows"]},{"id":"T1090.003","short_id":".003","name":"Multi-hop Proxy","technique":"T1090","url":"https://attack.mitre.org/techniques/T1090/003","platform":["Linux","macOS","Windows","Network"]},{"id":"T1090.004","short_id":".004","name":"Domain Fronting","technique":"T1090","url":"https://attack.mitre.org/techniques/T1090/004","platform":["Linux","macOS","Windows"]},{"id":"T1098.001","short_id":".001","name":"Additional Cloud Credentials","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/001","platform":["IaaS","Azure AD","SaaS"]},{"id":"T1098.002","short_id":".002","name":"Additional Email Delegate Permissions","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/002","platform":["Windows","Office 365","Google Workspace"]},{"id":"T1098.003","short_id":".003","name":"Additional Cloud Roles","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/003","platform":["Office 365","IaaS","SaaS","Google Workspace","Azure AD"]},{"id":"T1098.004","short_id":".004","name":"SSH Authorized Keys","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/004","platform":["Linux","macOS","IaaS","Network"]},{"id":"T1098.005","short_id":".005","name":"Device Registration","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/005","platform":["Azure AD","Windows","SaaS"]},{"id":"T1098.006","short_id":".006","name":"Additional Container Cluster Roles","technique":"T1098","url":"https://attack.mitre.org/techniques/T1098/006","platform":["Containers"]},{"id":"T1102.001","short_id":".001","name":"Dead Drop Resolver","technique":"T1102","url":"https://attack.mitre.org/techniques/T1102/001","platform":["Linux","macOS","Windows"]},{"id":"T1102.002","short_id":".002","name":"Bidirectional Communication","technique":"T1102","url":"https://attack.mitre.org/techniques/T1102/002","platform":["Linux","macOS","Windows"]},{"id":"T1102.003","short_id":".003","name":"One-Way Communication","technique":"T1102","url":"https://attack.mitre.org/techniques/T1102/003","platform":["Linux","macOS","Windows"]},{"id":"T1110.001","short_id":".001","name":"Password Guessing","technique":"T1110","url":"https://attack.mitre.org/techniques/T1110/001","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers","Network"]},{"id":"T1110.002","short_id":".002","name":"Password Cracking","technique":"T1110","url":"https://attack.mitre.org/techniques/T1110/002","platform":["Linux","macOS","Windows","Office 365","Azure AD","Network"]},{"id":"T1110.003","short_id":".003","name":"Password Spraying","technique":"T1110","url":"https://attack.mitre.org/techniques/T1110/003","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1110.004","short_id":".004","name":"Credential Stuffing","technique":"T1110","url":"https://attack.mitre.org/techniques/T1110/004","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace","Containers"]},{"id":"T1114.001","short_id":".001","name":"Local Email Collection","technique":"T1114","url":"https://attack.mitre.org/techniques/T1114/001","platform":["Windows"]},{"id":"T1114.002","short_id":".002","name":"Remote Email Collection","technique":"T1114","url":"https://attack.mitre.org/techniques/T1114/002","platform":["Office 365","Windows","Google Workspace"]},{"id":"T1114.003","short_id":".003","name":"Email Forwarding Rule","technique":"T1114","url":"https://attack.mitre.org/techniques/T1114/003","platform":["Office 365","Windows","Google Workspace","macOS","Linux"]},{"id":"T1127.001","short_id":".001","name":"MSBuild","technique":"T1127","url":"https://attack.mitre.org/techniques/T1127/001","platform":["Windows"]},{"id":"T1132.001","short_id":".001","name":"Standard Encoding","technique":"T1132","url":"https://attack.mitre.org/techniques/T1132/001","platform":["Linux","macOS","Windows"]},{"id":"T1132.002","short_id":".002","name":"Non-Standard Encoding","technique":"T1132","url":"https://attack.mitre.org/techniques/T1132/002","platform":["Linux","macOS","Windows"]},{"id":"T1134.001","short_id":".001","name":"Token Impersonation/Theft","technique":"T1134","url":"https://attack.mitre.org/techniques/T1134/001","platform":["Windows"]},{"id":"T1134.002","short_id":".002","name":"Create Process with Token","technique":"T1134","url":"https://attack.mitre.org/techniques/T1134/002","platform":["Windows"]},{"id":"T1134.003","short_id":".003","name":"Make and Impersonate Token","technique":"T1134","url":"https://attack.mitre.org/techniques/T1134/003","platform":["Windows"]},{"id":"T1134.004","short_id":".004","name":"Parent PID Spoofing","technique":"T1134","url":"https://attack.mitre.org/techniques/T1134/004","platform":["Windows"]},{"id":"T1134.005","short_id":".005","name":"SID-History Injection","technique":"T1134","url":"https://attack.mitre.org/techniques/T1134/005","platform":["Windows"]},{"id":"T1136.001","short_id":".001","name":"Local Account","technique":"T1136","url":"https://attack.mitre.org/techniques/T1136/001","platform":["Linux","macOS","Windows","Network","Containers"]},{"id":"T1136.002","short_id":".002","name":"Domain Account","technique":"T1136","url":"https://attack.mitre.org/techniques/T1136/002","platform":["Windows","macOS","Linux"]},{"id":"T1136.003","short_id":".003","name":"Cloud Account","technique":"T1136","url":"https://attack.mitre.org/techniques/T1136/003","platform":["Azure AD","Office 365","IaaS","Google Workspace","SaaS"]},{"id":"T1137.001","short_id":".001","name":"Office Template Macros","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/001","platform":["Windows","Office 365"]},{"id":"T1137.002","short_id":".002","name":"Office Test","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/002","platform":["Windows","Office 365"]},{"id":"T1137.003","short_id":".003","name":"Outlook Forms","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/003","platform":["Windows","Office 365"]},{"id":"T1137.004","short_id":".004","name":"Outlook Home Page","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/004","platform":["Windows","Office 365"]},{"id":"T1137.005","short_id":".005","name":"Outlook Rules","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/005","platform":["Windows","Office 365"]},{"id":"T1137.006","short_id":".006","name":"Add-ins","technique":"T1137","url":"https://attack.mitre.org/techniques/T1137/006","platform":["Windows","Office 365"]},{"id":"T1195.001","short_id":".001","name":"Compromise Software Dependencies and Development Tools","technique":"T1195","url":"https://attack.mitre.org/techniques/T1195/001","platform":["Linux","macOS","Windows"]},{"id":"T1195.002","short_id":".002","name":"Compromise Software Supply Chain","technique":"T1195","url":"https://attack.mitre.org/techniques/T1195/002","platform":["Linux","macOS","Windows"]},{"id":"T1195.003","short_id":".003","name":"Compromise Hardware Supply Chain","technique":"T1195","url":"https://attack.mitre.org/techniques/T1195/003","platform":["Linux","macOS","Windows"]},{"id":"T1204.001","short_id":".001","name":"Malicious Link","technique":"T1204","url":"https://attack.mitre.org/techniques/T1204/001","platform":["Linux","macOS","Windows"]},{"id":"T1204.002","short_id":".002","name":"Malicious File","technique":"T1204","url":"https://attack.mitre.org/techniques/T1204/002","platform":["Linux","macOS","Windows"]},{"id":"T1204.003","short_id":".003","name":"Malicious Image","technique":"T1204","url":"https://attack.mitre.org/techniques/T1204/003","platform":["IaaS","Containers"]},{"id":"T1205.001","short_id":".001","name":"Port Knocking","technique":"T1205","url":"https://attack.mitre.org/techniques/T1205/001","platform":["Linux","macOS","Windows","Network"]},{"id":"T1205.002","short_id":".002","name":"Socket Filters","technique":"T1205","url":"https://attack.mitre.org/techniques/T1205/002","platform":["Linux","macOS","Windows"]},{"id":"T1213.001","short_id":".001","name":"Confluence","technique":"T1213","url":"https://attack.mitre.org/techniques/T1213/001","platform":["SaaS"]},{"id":"T1213.002","short_id":".002","name":"Sharepoint","technique":"T1213","url":"https://attack.mitre.org/techniques/T1213/002","platform":["Windows","Office 365"]},{"id":"T1213.003","short_id":".003","name":"Code Repositories","technique":"T1213","url":"https://attack.mitre.org/techniques/T1213/003","platform":["SaaS"]},{"id":"T1216.001","short_id":".001","name":"PubPrn","technique":"T1216","url":"https://attack.mitre.org/techniques/T1216/001","platform":["Windows"]},{"id":"T1218.001","short_id":".001","name":"Compiled HTML File","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/001","platform":["Windows"]},{"id":"T1218.002","short_id":".002","name":"Control Panel","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/002","platform":["Windows"]},{"id":"T1218.003","short_id":".003","name":"CMSTP","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/003","platform":["Windows"]},{"id":"T1218.004","short_id":".004","name":"InstallUtil","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/004","platform":["Windows"]},{"id":"T1218.005","short_id":".005","name":"Mshta","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/005","platform":["Windows"]},{"id":"T1218.007","short_id":".007","name":"Msiexec","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/007","platform":["Windows"]},{"id":"T1218.008","short_id":".008","name":"Odbcconf","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/008","platform":["Windows"]},{"id":"T1218.009","short_id":".009","name":"Regsvcs/Regasm","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/009","platform":["Windows"]},{"id":"T1218.010","short_id":".010","name":"Regsvr32","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/010","platform":["Windows"]},{"id":"T1218.011","short_id":".011","name":"Rundll32","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/011","platform":["Windows"]},{"id":"T1218.012","short_id":".012","name":"Verclsid","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/012","platform":["Windows"]},{"id":"T1218.013","short_id":".013","name":"Mavinject","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/013","platform":["Windows"]},{"id":"T1218.014","short_id":".014","name":"MMC","technique":"T1218","url":"https://attack.mitre.org/techniques/T1218/014","platform":["Windows"]},{"id":"T1222.001","short_id":".001","name":"Windows File and Directory Permissions Modification","technique":"T1222","url":"https://attack.mitre.org/techniques/T1222/001","platform":["Windows"]},{"id":"T1222.002","short_id":".002","name":"Linux and Mac File and Directory Permissions Modification","technique":"T1222","url":"https://attack.mitre.org/techniques/T1222/002","platform":["macOS","Linux"]},{"id":"T1480.001","short_id":".001","name":"Environmental Keying","technique":"T1480","url":"https://attack.mitre.org/techniques/T1480/001","platform":["Linux","macOS","Windows"]},{"id":"T1484.001","short_id":".001","name":"Group Policy Modification","technique":"T1484","url":"https://attack.mitre.org/techniques/T1484/001","platform":["Windows"]},{"id":"T1484.002","short_id":".002","name":"Domain Trust Modification","technique":"T1484","url":"https://attack.mitre.org/techniques/T1484/002","platform":["Windows","Azure AD"]},{"id":"T1491.001","short_id":".001","name":"Internal Defacement","technique":"T1491","url":"https://attack.mitre.org/techniques/T1491/001","platform":["Linux","macOS","Windows"]},{"id":"T1491.002","short_id":".002","name":"External Defacement","technique":"T1491","url":"https://attack.mitre.org/techniques/T1491/002","platform":["Windows","IaaS","Linux","macOS"]},{"id":"T1497.001","short_id":".001","name":"System Checks","technique":"T1497","url":"https://attack.mitre.org/techniques/T1497/001","platform":["Linux","macOS","Windows"]},{"id":"T1497.002","short_id":".002","name":"User Activity Based Checks","technique":"T1497","url":"https://attack.mitre.org/techniques/T1497/002","platform":["Linux","macOS","Windows"]},{"id":"T1497.003","short_id":".003","name":"Time Based Evasion","technique":"T1497","url":"https://attack.mitre.org/techniques/T1497/003","platform":["Linux","macOS","Windows"]},{"id":"T1498.001","short_id":".001","name":"Direct Network Flood","technique":"T1498","url":"https://attack.mitre.org/techniques/T1498/001","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1498.002","short_id":".002","name":"Reflection Amplification","technique":"T1498","url":"https://attack.mitre.org/techniques/T1498/002","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1499.001","short_id":".001","name":"OS Exhaustion Flood","technique":"T1499","url":"https://attack.mitre.org/techniques/T1499/001","platform":["Linux","macOS","Windows"]},{"id":"T1499.002","short_id":".002","name":"Service Exhaustion Flood","technique":"T1499","url":"https://attack.mitre.org/techniques/T1499/002","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1499.003","short_id":".003","name":"Application Exhaustion Flood","technique":"T1499","url":"https://attack.mitre.org/techniques/T1499/003","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1499.004","short_id":".004","name":"Application or System Exploitation","technique":"T1499","url":"https://attack.mitre.org/techniques/T1499/004","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1505.001","short_id":".001","name":"SQL Stored Procedures","technique":"T1505","url":"https://attack.mitre.org/techniques/T1505/001","platform":["Windows","Linux"]},{"id":"T1505.002","short_id":".002","name":"Transport Agent","technique":"T1505","url":"https://attack.mitre.org/techniques/T1505/002","platform":["Linux","Windows"]},{"id":"T1505.003","short_id":".003","name":"Web Shell","technique":"T1505","url":"https://attack.mitre.org/techniques/T1505/003","platform":["Linux","Windows","macOS","Network"]},{"id":"T1505.004","short_id":".004","name":"IIS Components","technique":"T1505","url":"https://attack.mitre.org/techniques/T1505/004","platform":["Windows"]},{"id":"T1505.005","short_id":".005","name":"Terminal Services DLL","technique":"T1505","url":"https://attack.mitre.org/techniques/T1505/005","platform":["Windows"]},{"id":"T1518.001","short_id":".001","name":"Security Software Discovery","technique":"T1518","url":"https://attack.mitre.org/techniques/T1518/001","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Linux","macOS","Google Workspace"]},{"id":"T1542.001","short_id":".001","name":"System Firmware","technique":"T1542","url":"https://attack.mitre.org/techniques/T1542/001","platform":["Windows"]},{"id":"T1542.002","short_id":".002","name":"Component Firmware","technique":"T1542","url":"https://attack.mitre.org/techniques/T1542/002","platform":["Windows","Linux","macOS"]},{"id":"T1542.003","short_id":".003","name":"Bootkit","technique":"T1542","url":"https://attack.mitre.org/techniques/T1542/003","platform":["Linux","Windows"]},{"id":"T1542.004","short_id":".004","name":"ROMMONkit","technique":"T1542","url":"https://attack.mitre.org/techniques/T1542/004","platform":["Network"]},{"id":"T1542.005","short_id":".005","name":"TFTP Boot","technique":"T1542","url":"https://attack.mitre.org/techniques/T1542/005","platform":["Network"]},{"id":"T1543.001","short_id":".001","name":"Launch Agent","technique":"T1543","url":"https://attack.mitre.org/techniques/T1543/001","platform":["macOS"]},{"id":"T1543.002","short_id":".002","name":"Systemd Service","technique":"T1543","url":"https://attack.mitre.org/techniques/T1543/002","platform":["Linux"]},{"id":"T1543.003","short_id":".003","name":"Windows Service","technique":"T1543","url":"https://attack.mitre.org/techniques/T1543/003","platform":["Windows"]},{"id":"T1543.004","short_id":".004","name":"Launch Daemon","technique":"T1543","url":"https://attack.mitre.org/techniques/T1543/004","platform":["macOS"]},{"id":"T1546.001","short_id":".001","name":"Change Default File Association","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/001","platform":["Windows"]},{"id":"T1546.002","short_id":".002","name":"Screensaver","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/002","platform":["Windows"]},{"id":"T1546.003","short_id":".003","name":"Windows Management Instrumentation Event Subscription","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/003","platform":["Windows"]},{"id":"T1546.004","short_id":".004","name":"Unix Shell Configuration Modification","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/004","platform":["Linux","macOS"]},{"id":"T1546.005","short_id":".005","name":"Trap","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/005","platform":["macOS","Linux"]},{"id":"T1546.006","short_id":".006","name":"LC_LOAD_DYLIB Addition","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/006","platform":["macOS"]},{"id":"T1546.007","short_id":".007","name":"Netsh Helper DLL","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/007","platform":["Windows"]},{"id":"T1546.008","short_id":".008","name":"Accessibility Features","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/008","platform":["Windows"]},{"id":"T1546.009","short_id":".009","name":"AppCert DLLs","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/009","platform":["Windows"]},{"id":"T1546.010","short_id":".010","name":"AppInit DLLs","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/010","platform":["Windows"]},{"id":"T1546.011","short_id":".011","name":"Application Shimming","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/011","platform":["Windows"]},{"id":"T1546.012","short_id":".012","name":"Image File Execution Options Injection","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/012","platform":["Windows"]},{"id":"T1546.013","short_id":".013","name":"PowerShell Profile","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/013","platform":["Windows"]},{"id":"T1546.014","short_id":".014","name":"Emond","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/014","platform":["macOS"]},{"id":"T1546.015","short_id":".015","name":"Component Object Model Hijacking","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/015","platform":["Windows"]},{"id":"T1546.016","short_id":".016","name":"Installer Packages","technique":"T1546","url":"https://attack.mitre.org/techniques/T1546/016","platform":["Linux","macOS","Windows"]},{"id":"T1547.001","short_id":".001","name":"Registry Run Keys / Startup Folder","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/001","platform":["Windows"]},{"id":"T1547.002","short_id":".002","name":"Authentication Package","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/002","platform":["Windows"]},{"id":"T1547.003","short_id":".003","name":"Time Providers","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/003","platform":["Windows"]},{"id":"T1547.004","short_id":".004","name":"Winlogon Helper DLL","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/004","platform":["Windows"]},{"id":"T1547.005","short_id":".005","name":"Security Support Provider","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/005","platform":["Windows"]},{"id":"T1547.006","short_id":".006","name":"Kernel Modules and Extensions","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/006","platform":["macOS","Linux"]},{"id":"T1547.007","short_id":".007","name":"Re-opened Applications","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/007","platform":["macOS"]},{"id":"T1547.008","short_id":".008","name":"LSASS Driver","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/008","platform":["Windows"]},{"id":"T1547.009","short_id":".009","name":"Shortcut Modification","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/009","platform":["Windows"]},{"id":"T1547.010","short_id":".010","name":"Port Monitors","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/010","platform":["Windows"]},{"id":"T1547.012","short_id":".012","name":"Print Processors","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/012","platform":["Windows"]},{"id":"T1547.013","short_id":".013","name":"XDG Autostart Entries","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/013","platform":["Linux"]},{"id":"T1547.014","short_id":".014","name":"Active Setup","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/014","platform":["Windows"]},{"id":"T1547.015","short_id":".015","name":"Login Items","technique":"T1547","url":"https://attack.mitre.org/techniques/T1547/015","platform":["macOS"]},{"id":"T1548.001","short_id":".001","name":"Setuid and Setgid","technique":"T1548","url":"https://attack.mitre.org/techniques/T1548/001","platform":["Linux","macOS"]},{"id":"T1548.002","short_id":".002","name":"Bypass User Account Control","technique":"T1548","url":"https://attack.mitre.org/techniques/T1548/002","platform":["Windows"]},{"id":"T1548.003","short_id":".003","name":"Sudo and Sudo Caching","technique":"T1548","url":"https://attack.mitre.org/techniques/T1548/003","platform":["Linux","macOS"]},{"id":"T1548.004","short_id":".004","name":"Elevated Execution with Prompt","technique":"T1548","url":"https://attack.mitre.org/techniques/T1548/004","platform":["macOS"]},{"id":"T1548.005","short_id":".005","name":"Temporary Elevated Cloud Access","technique":"T1548","url":"https://attack.mitre.org/techniques/T1548/005","platform":["IaaS","Azure AD","Office 365"]},{"id":"T1550.001","short_id":".001","name":"Application Access Token","technique":"T1550","url":"https://attack.mitre.org/techniques/T1550/001","platform":["Office 365","SaaS","Google Workspace","Containers","IaaS","Azure AD"]},{"id":"T1550.002","short_id":".002","name":"Pass the Hash","technique":"T1550","url":"https://attack.mitre.org/techniques/T1550/002","platform":["Windows"]},{"id":"T1550.003","short_id":".003","name":"Pass the Ticket","technique":"T1550","url":"https://attack.mitre.org/techniques/T1550/003","platform":["Windows"]},{"id":"T1550.004","short_id":".004","name":"Web Session Cookie","technique":"T1550","url":"https://attack.mitre.org/techniques/T1550/004","platform":["Office 365","SaaS","Google Workspace","IaaS"]},{"id":"T1552.001","short_id":".001","name":"Credentials In Files","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/001","platform":["Windows","IaaS","Linux","macOS","Containers"]},{"id":"T1552.002","short_id":".002","name":"Credentials in Registry","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/002","platform":["Windows"]},{"id":"T1552.003","short_id":".003","name":"Bash History","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/003","platform":["Linux","macOS"]},{"id":"T1552.004","short_id":".004","name":"Private Keys","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/004","platform":["Linux","macOS","Windows","Network"]},{"id":"T1552.005","short_id":".005","name":"Cloud Instance Metadata API","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/005","platform":["IaaS"]},{"id":"T1552.006","short_id":".006","name":"Group Policy Preferences","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/006","platform":["Windows"]},{"id":"T1552.007","short_id":".007","name":"Container API","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/007","platform":["Containers"]},{"id":"T1552.008","short_id":".008","name":"Chat Messages","technique":"T1552","url":"https://attack.mitre.org/techniques/T1552/008","platform":["Office 365","SaaS","Google Workspace"]},{"id":"T1553.001","short_id":".001","name":"Gatekeeper Bypass","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/001","platform":["macOS"]},{"id":"T1553.002","short_id":".002","name":"Code Signing","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/002","platform":["macOS","Windows"]},{"id":"T1553.003","short_id":".003","name":"SIP and Trust Provider Hijacking","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/003","platform":["Windows"]},{"id":"T1553.004","short_id":".004","name":"Install Root Certificate","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/004","platform":["Linux","macOS","Windows"]},{"id":"T1553.005","short_id":".005","name":"Mark-of-the-Web Bypass","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/005","platform":["Windows"]},{"id":"T1553.006","short_id":".006","name":"Code Signing Policy Modification","technique":"T1553","url":"https://attack.mitre.org/techniques/T1553/006","platform":["Windows","macOS"]},{"id":"T1555.001","short_id":".001","name":"Keychain","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/001","platform":["macOS"]},{"id":"T1555.002","short_id":".002","name":"Securityd Memory","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/002","platform":["Linux","macOS"]},{"id":"T1555.003","short_id":".003","name":"Credentials from Web Browsers","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/003","platform":["Linux","macOS","Windows"]},{"id":"T1555.004","short_id":".004","name":"Windows Credential Manager","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/004","platform":["Windows"]},{"id":"T1555.005","short_id":".005","name":"Password Managers","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/005","platform":["Linux","macOS","Windows"]},{"id":"T1555.006","short_id":".006","name":"Cloud Secrets Management Stores","technique":"T1555","url":"https://attack.mitre.org/techniques/T1555/006","platform":["IaaS"]},{"id":"T1556.001","short_id":".001","name":"Domain Controller Authentication","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/001","platform":["Windows"]},{"id":"T1556.002","short_id":".002","name":"Password Filter DLL","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/002","platform":["Windows"]},{"id":"T1556.003","short_id":".003","name":"Pluggable Authentication Modules","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/003","platform":["Linux","macOS"]},{"id":"T1556.004","short_id":".004","name":"Network Device Authentication","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/004","platform":["Network"]},{"id":"T1556.005","short_id":".005","name":"Reversible Encryption","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/005","platform":["Windows"]},{"id":"T1556.006","short_id":".006","name":"Multi-Factor Authentication","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/006","platform":["Windows","Azure AD","Office 365","SaaS","IaaS","Google Workspace","Linux","macOS"]},{"id":"T1556.007","short_id":".007","name":"Hybrid Identity","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/007","platform":["Windows","Azure AD","SaaS","Google Workspace","Office 365","IaaS"]},{"id":"T1556.008","short_id":".008","name":"Network Provider DLL","technique":"T1556","url":"https://attack.mitre.org/techniques/T1556/008","platform":["Windows"]},{"id":"T1557.001","short_id":".001","name":"LLMNR/NBT-NS Poisoning and SMB Relay","technique":"T1557","url":"https://attack.mitre.org/techniques/T1557/001","platform":["Windows"]},{"id":"T1557.002","short_id":".002","name":"ARP Cache Poisoning","technique":"T1557","url":"https://attack.mitre.org/techniques/T1557/002","platform":["Linux","Windows","macOS"]},{"id":"T1557.003","short_id":".003","name":"DHCP Spoofing","technique":"T1557","url":"https://attack.mitre.org/techniques/T1557/003","platform":["Linux","Windows","macOS"]},{"id":"T1558.001","short_id":".001","name":"Golden Ticket","technique":"T1558","url":"https://attack.mitre.org/techniques/T1558/001","platform":["Windows"]},{"id":"T1558.002","short_id":".002","name":"Silver Ticket","technique":"T1558","url":"https://attack.mitre.org/techniques/T1558/002","platform":["Windows"]},{"id":"T1558.003","short_id":".003","name":"Kerberoasting","technique":"T1558","url":"https://attack.mitre.org/techniques/T1558/003","platform":["Windows"]},{"id":"T1558.004","short_id":".004","name":"AS-REP Roasting","technique":"T1558","url":"https://attack.mitre.org/techniques/T1558/004","platform":["Windows"]},{"id":"T1559.001","short_id":".001","name":"Component Object Model","technique":"T1559","url":"https://attack.mitre.org/techniques/T1559/001","platform":["Windows"]},{"id":"T1559.002","short_id":".002","name":"Dynamic Data Exchange","technique":"T1559","url":"https://attack.mitre.org/techniques/T1559/002","platform":["Windows"]},{"id":"T1559.003","short_id":".003","name":"XPC Services","technique":"T1559","url":"https://attack.mitre.org/techniques/T1559/003","platform":["macOS"]},{"id":"T1560.001","short_id":".001","name":"Archive via Utility","technique":"T1560","url":"https://attack.mitre.org/techniques/T1560/001","platform":["Linux","macOS","Windows"]},{"id":"T1560.002","short_id":".002","name":"Archive via Library","technique":"T1560","url":"https://attack.mitre.org/techniques/T1560/002","platform":["Linux","macOS","Windows"]},{"id":"T1560.003","short_id":".003","name":"Archive via Custom Method","technique":"T1560","url":"https://attack.mitre.org/techniques/T1560/003","platform":["Linux","macOS","Windows"]},{"id":"T1561.001","short_id":".001","name":"Disk Content Wipe","technique":"T1561","url":"https://attack.mitre.org/techniques/T1561/001","platform":["Linux","macOS","Windows"]},{"id":"T1561.002","short_id":".002","name":"Disk Structure Wipe","technique":"T1561","url":"https://attack.mitre.org/techniques/T1561/002","platform":["Linux","macOS","Windows","Network"]},{"id":"T1562.001","short_id":".001","name":"Disable or Modify Tools","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/001","platform":["Windows","macOS","Linux","Containers","IaaS","Network"]},{"id":"T1562.002","short_id":".002","name":"Disable Windows Event Logging","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/002","platform":["Windows"]},{"id":"T1562.003","short_id":".003","name":"Impair Command History Logging","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/003","platform":["Linux","macOS","Windows","Network"]},{"id":"T1562.004","short_id":".004","name":"Disable or Modify System Firewall","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/004","platform":["Linux","macOS","Windows"]},{"id":"T1562.006","short_id":".006","name":"Indicator Blocking","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/006","platform":["Windows","macOS","Linux"]},{"id":"T1562.007","short_id":".007","name":"Disable or Modify Cloud Firewall","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/007","platform":["IaaS"]},{"id":"T1562.008","short_id":".008","name":"Disable or Modify Cloud Logs","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/008","platform":["IaaS","SaaS","Google Workspace","Azure AD","Office 365"]},{"id":"T1562.009","short_id":".009","name":"Safe Mode Boot","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/009","platform":["Windows"]},{"id":"T1562.010","short_id":".010","name":"Downgrade Attack","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/010","platform":["Windows","Linux","macOS"]},{"id":"T1562.011","short_id":".011","name":"Spoof Security Alerting","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/011","platform":["Windows","macOS","Linux"]},{"id":"T1562.012","short_id":".012","name":"Disable or Modify Linux Audit System","technique":"T1562","url":"https://attack.mitre.org/techniques/T1562/012","platform":["Linux"]},{"id":"T1563.001","short_id":".001","name":"SSH Hijacking","technique":"T1563","url":"https://attack.mitre.org/techniques/T1563/001","platform":["Linux","macOS"]},{"id":"T1563.002","short_id":".002","name":"RDP Hijacking","technique":"T1563","url":"https://attack.mitre.org/techniques/T1563/002","platform":["Windows"]},{"id":"T1564.001","short_id":".001","name":"Hidden Files and Directories","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/001","platform":["Windows","macOS","Linux"]},{"id":"T1564.002","short_id":".002","name":"Hidden Users","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/002","platform":["macOS","Windows","Linux"]},{"id":"T1564.003","short_id":".003","name":"Hidden Window","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/003","platform":["macOS","Windows","Linux"]},{"id":"T1564.004","short_id":".004","name":"NTFS File Attributes","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/004","platform":["Windows"]},{"id":"T1564.005","short_id":".005","name":"Hidden File System","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/005","platform":["Linux","macOS","Windows"]},{"id":"T1564.006","short_id":".006","name":"Run Virtual Instance","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/006","platform":["Linux","macOS","Windows"]},{"id":"T1564.007","short_id":".007","name":"VBA Stomping","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/007","platform":["Linux","Windows","macOS"]},{"id":"T1564.008","short_id":".008","name":"Email Hiding Rules","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/008","platform":["Windows","Office 365","Linux","macOS","Google Workspace"]},{"id":"T1564.009","short_id":".009","name":"Resource Forking","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/009","platform":["macOS"]},{"id":"T1564.010","short_id":".010","name":"Process Argument Spoofing","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/010","platform":["Windows"]},{"id":"T1564.011","short_id":".011","name":"Ignore Process Interrupts","technique":"T1564","url":"https://attack.mitre.org/techniques/T1564/011","platform":["Linux","macOS","Windows"]},{"id":"T1565.001","short_id":".001","name":"Stored Data Manipulation","technique":"T1565","url":"https://attack.mitre.org/techniques/T1565/001","platform":["Linux","macOS","Windows"]},{"id":"T1565.002","short_id":".002","name":"Transmitted Data Manipulation","technique":"T1565","url":"https://attack.mitre.org/techniques/T1565/002","platform":["Linux","macOS","Windows"]},{"id":"T1565.003","short_id":".003","name":"Runtime Data Manipulation","technique":"T1565","url":"https://attack.mitre.org/techniques/T1565/003","platform":["Linux","macOS","Windows"]},{"id":"T1566.001","short_id":".001","name":"Spearphishing Attachment","technique":"T1566","url":"https://attack.mitre.org/techniques/T1566/001","platform":["macOS","Windows","Linux"]},{"id":"T1566.002","short_id":".002","name":"Spearphishing Link","technique":"T1566","url":"https://attack.mitre.org/techniques/T1566/002","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1566.003","short_id":".003","name":"Spearphishing via Service","technique":"T1566","url":"https://attack.mitre.org/techniques/T1566/003","platform":["Linux","macOS","Windows"]},{"id":"T1566.004","short_id":".004","name":"Spearphishing Voice","technique":"T1566","url":"https://attack.mitre.org/techniques/T1566/004","platform":["Linux","macOS","Windows","Office 365","SaaS","Google Workspace"]},{"id":"T1567.001","short_id":".001","name":"Exfiltration to Code Repository","technique":"T1567","url":"https://attack.mitre.org/techniques/T1567/001","platform":["Linux","macOS","Windows"]},{"id":"T1567.002","short_id":".002","name":"Exfiltration to Cloud Storage","technique":"T1567","url":"https://attack.mitre.org/techniques/T1567/002","platform":["Linux","macOS","Windows"]},{"id":"T1567.003","short_id":".003","name":"Exfiltration to Text Storage Sites","technique":"T1567","url":"https://attack.mitre.org/techniques/T1567/003","platform":["Linux","macOS","Windows"]},{"id":"T1567.004","short_id":".004","name":"Exfiltration Over Webhook","technique":"T1567","url":"https://attack.mitre.org/techniques/T1567/004","platform":["Windows","macOS","Linux","SaaS","Office 365","Google Workspace"]},{"id":"T1568.001","short_id":".001","name":"Fast Flux DNS","technique":"T1568","url":"https://attack.mitre.org/techniques/T1568/001","platform":["Linux","macOS","Windows"]},{"id":"T1568.002","short_id":".002","name":"Domain Generation Algorithms","technique":"T1568","url":"https://attack.mitre.org/techniques/T1568/002","platform":["Linux","macOS","Windows"]},{"id":"T1568.003","short_id":".003","name":"DNS Calculation","technique":"T1568","url":"https://attack.mitre.org/techniques/T1568/003","platform":["Linux","macOS","Windows"]},{"id":"T1569.001","short_id":".001","name":"Launchctl","technique":"T1569","url":"https://attack.mitre.org/techniques/T1569/001","platform":["macOS"]},{"id":"T1569.002","short_id":".002","name":"Service Execution","technique":"T1569","url":"https://attack.mitre.org/techniques/T1569/002","platform":["Windows"]},{"id":"T1573.001","short_id":".001","name":"Symmetric Cryptography","technique":"T1573","url":"https://attack.mitre.org/techniques/T1573/001","platform":["Linux","Windows","macOS"]},{"id":"T1573.002","short_id":".002","name":"Asymmetric Cryptography","technique":"T1573","url":"https://attack.mitre.org/techniques/T1573/002","platform":["Linux","macOS","Windows"]},{"id":"T1574.001","short_id":".001","name":"DLL Search Order Hijacking","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/001","platform":["Windows"]},{"id":"T1574.002","short_id":".002","name":"DLL Side-Loading","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/002","platform":["Windows"]},{"id":"T1574.004","short_id":".004","name":"Dylib Hijacking","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/004","platform":["macOS"]},{"id":"T1574.005","short_id":".005","name":"Executable Installer File Permissions Weakness","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/005","platform":["Windows"]},{"id":"T1574.006","short_id":".006","name":"Dynamic Linker Hijacking","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/006","platform":["Linux","macOS"]},{"id":"T1574.007","short_id":".007","name":"Path Interception by PATH Environment Variable","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/007","platform":["Windows","macOS","Linux"]},{"id":"T1574.008","short_id":".008","name":"Path Interception by Search Order Hijacking","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/008","platform":["Windows"]},{"id":"T1574.009","short_id":".009","name":"Path Interception by Unquoted Path","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/009","platform":["Windows"]},{"id":"T1574.010","short_id":".010","name":"Services File Permissions Weakness","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/010","platform":["Windows"]},{"id":"T1574.011","short_id":".011","name":"Services Registry Permissions Weakness","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/011","platform":["Windows"]},{"id":"T1574.012","short_id":".012","name":"COR_PROFILER","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/012","platform":["Windows"]},{"id":"T1574.013","short_id":".013","name":"KernelCallbackTable","technique":"T1574","url":"https://attack.mitre.org/techniques/T1574/013","platform":["Windows"]},{"id":"T1578.001","short_id":".001","name":"Create Snapshot","technique":"T1578","url":"https://attack.mitre.org/techniques/T1578/001","platform":["IaaS"]},{"id":"T1578.002","short_id":".002","name":"Create Cloud Instance","technique":"T1578","url":"https://attack.mitre.org/techniques/T1578/002","platform":["IaaS"]},{"id":"T1578.003","short_id":".003","name":"Delete Cloud Instance","technique":"T1578","url":"https://attack.mitre.org/techniques/T1578/003","platform":["IaaS"]},{"id":"T1578.004","short_id":".004","name":"Revert Cloud Instance","technique":"T1578","url":"https://attack.mitre.org/techniques/T1578/004","platform":["IaaS"]},{"id":"T1578.005","short_id":".005","name":"Modify Cloud Compute Configurations","technique":"T1578","url":"https://attack.mitre.org/techniques/T1578/005","platform":["IaaS"]},{"id":"T1583.001","short_id":".001","name":"Domains","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/001","platform":["PRE"]},{"id":"T1583.002","short_id":".002","name":"DNS Server","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/002","platform":["PRE"]},{"id":"T1583.003","short_id":".003","name":"Virtual Private Server","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/003","platform":["PRE"]},{"id":"T1583.004","short_id":".004","name":"Server","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/004","platform":["PRE"]},{"id":"T1583.005","short_id":".005","name":"Botnet","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/005","platform":["PRE"]},{"id":"T1583.006","short_id":".006","name":"Web Services","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/006","platform":["PRE"]},{"id":"T1583.007","short_id":".007","name":"Serverless","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/007","platform":["PRE"]},{"id":"T1583.008","short_id":".008","name":"Malvertising","technique":"T1583","url":"https://attack.mitre.org/techniques/T1583/008","platform":["PRE"]},{"id":"T1584.001","short_id":".001","name":"Domains","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/001","platform":["PRE"]},{"id":"T1584.002","short_id":".002","name":"DNS Server","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/002","platform":["PRE"]},{"id":"T1584.003","short_id":".003","name":"Virtual Private Server","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/003","platform":["PRE"]},{"id":"T1584.004","short_id":".004","name":"Server","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/004","platform":["PRE"]},{"id":"T1584.005","short_id":".005","name":"Botnet","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/005","platform":["PRE"]},{"id":"T1584.006","short_id":".006","name":"Web Services","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/006","platform":["PRE"]},{"id":"T1584.007","short_id":".007","name":"Serverless","technique":"T1584","url":"https://attack.mitre.org/techniques/T1584/007","platform":["PRE"]},{"id":"T1585.001","short_id":".001","name":"Social Media Accounts","technique":"T1585","url":"https://attack.mitre.org/techniques/T1585/001","platform":["PRE"]},{"id":"T1585.002","short_id":".002","name":"Email Accounts","technique":"T1585","url":"https://attack.mitre.org/techniques/T1585/002","platform":["PRE"]},{"id":"T1585.003","short_id":".003","name":"Cloud Accounts","technique":"T1585","url":"https://attack.mitre.org/techniques/T1585/003","platform":["PRE"]},{"id":"T1586.001","short_id":".001","name":"Social Media Accounts","technique":"T1586","url":"https://attack.mitre.org/techniques/T1586/001","platform":["PRE"]},{"id":"T1586.002","short_id":".002","name":"Email Accounts","technique":"T1586","url":"https://attack.mitre.org/techniques/T1586/002","platform":["PRE"]},{"id":"T1586.003","short_id":".003","name":"Cloud Accounts","technique":"T1586","url":"https://attack.mitre.org/techniques/T1586/003","platform":["PRE"]},{"id":"T1587.001","short_id":".001","name":"Malware","technique":"T1587","url":"https://attack.mitre.org/techniques/T1587/001","platform":["PRE"]},{"id":"T1587.002","short_id":".002","name":"Code Signing Certificates","technique":"T1587","url":"https://attack.mitre.org/techniques/T1587/002","platform":["PRE"]},{"id":"T1587.003","short_id":".003","name":"Digital Certificates","technique":"T1587","url":"https://attack.mitre.org/techniques/T1587/003","platform":["PRE"]},{"id":"T1587.004","short_id":".004","name":"Exploits","technique":"T1587","url":"https://attack.mitre.org/techniques/T1587/004","platform":["PRE"]},{"id":"T1588.001","short_id":".001","name":"Malware","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/001","platform":["PRE"]},{"id":"T1588.002","short_id":".002","name":"Tool","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/002","platform":["PRE"]},{"id":"T1588.003","short_id":".003","name":"Code Signing Certificates","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/003","platform":["PRE"]},{"id":"T1588.004","short_id":".004","name":"Digital Certificates","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/004","platform":["PRE"]},{"id":"T1588.005","short_id":".005","name":"Exploits","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/005","platform":["PRE"]},{"id":"T1588.006","short_id":".006","name":"Vulnerabilities","technique":"T1588","url":"https://attack.mitre.org/techniques/T1588/006","platform":["PRE"]},{"id":"T1589.001","short_id":".001","name":"Credentials","technique":"T1589","url":"https://attack.mitre.org/techniques/T1589/001","platform":["PRE"]},{"id":"T1589.002","short_id":".002","name":"Email Addresses","technique":"T1589","url":"https://attack.mitre.org/techniques/T1589/002","platform":["PRE"]},{"id":"T1589.003","short_id":".003","name":"Employee Names","technique":"T1589","url":"https://attack.mitre.org/techniques/T1589/003","platform":["PRE"]},{"id":"T1590.001","short_id":".001","name":"Domain Properties","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/001","platform":["PRE"]},{"id":"T1590.002","short_id":".002","name":"DNS","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/002","platform":["PRE"]},{"id":"T1590.003","short_id":".003","name":"Network Trust Dependencies","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/003","platform":["PRE"]},{"id":"T1590.004","short_id":".004","name":"Network Topology","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/004","platform":["PRE"]},{"id":"T1590.005","short_id":".005","name":"IP Addresses","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/005","platform":["PRE"]},{"id":"T1590.006","short_id":".006","name":"Network Security Appliances","technique":"T1590","url":"https://attack.mitre.org/techniques/T1590/006","platform":["PRE"]},{"id":"T1591.001","short_id":".001","name":"Determine Physical Locations","technique":"T1591","url":"https://attack.mitre.org/techniques/T1591/001","platform":["PRE"]},{"id":"T1591.002","short_id":".002","name":"Business Relationships","technique":"T1591","url":"https://attack.mitre.org/techniques/T1591/002","platform":["PRE"]},{"id":"T1591.003","short_id":".003","name":"Identify Business Tempo","technique":"T1591","url":"https://attack.mitre.org/techniques/T1591/003","platform":["PRE"]},{"id":"T1591.004","short_id":".004","name":"Identify Roles","technique":"T1591","url":"https://attack.mitre.org/techniques/T1591/004","platform":["PRE"]},{"id":"T1592.001","short_id":".001","name":"Hardware","technique":"T1592","url":"https://attack.mitre.org/techniques/T1592/001","platform":["PRE"]},{"id":"T1592.002","short_id":".002","name":"Software","technique":"T1592","url":"https://attack.mitre.org/techniques/T1592/002","platform":["PRE"]},{"id":"T1592.003","short_id":".003","name":"Firmware","technique":"T1592","url":"https://attack.mitre.org/techniques/T1592/003","platform":["PRE"]},{"id":"T1592.004","short_id":".004","name":"Client Configurations","technique":"T1592","url":"https://attack.mitre.org/techniques/T1592/004","platform":["PRE"]},{"id":"T1593.001","short_id":".001","name":"Social Media","technique":"T1593","url":"https://attack.mitre.org/techniques/T1593/001","platform":["PRE"]},{"id":"T1593.002","short_id":".002","name":"Search Engines","technique":"T1593","url":"https://attack.mitre.org/techniques/T1593/002","platform":["PRE"]},{"id":"T1593.003","short_id":".003","name":"Code Repositories","technique":"T1593","url":"https://attack.mitre.org/techniques/T1593/003","platform":["PRE"]},{"id":"T1595.001","short_id":".001","name":"Scanning IP Blocks","technique":"T1595","url":"https://attack.mitre.org/techniques/T1595/001","platform":["PRE"]},{"id":"T1595.002","short_id":".002","name":"Vulnerability Scanning","technique":"T1595","url":"https://attack.mitre.org/techniques/T1595/002","platform":["PRE"]},{"id":"T1595.003","short_id":".003","name":"Wordlist Scanning","technique":"T1595","url":"https://attack.mitre.org/techniques/T1595/003","platform":["PRE"]},{"id":"T1596.001","short_id":".001","name":"DNS/Passive DNS","technique":"T1596","url":"https://attack.mitre.org/techniques/T1596/001","platform":["PRE"]},{"id":"T1596.002","short_id":".002","name":"WHOIS","technique":"T1596","url":"https://attack.mitre.org/techniques/T1596/002","platform":["PRE"]},{"id":"T1596.003","short_id":".003","name":"Digital Certificates","technique":"T1596","url":"https://attack.mitre.org/techniques/T1596/003","platform":["PRE"]},{"id":"T1596.004","short_id":".004","name":"CDNs","technique":"T1596","url":"https://attack.mitre.org/techniques/T1596/004","platform":["PRE"]},{"id":"T1596.005","short_id":".005","name":"Scan Databases","technique":"T1596","url":"https://attack.mitre.org/techniques/T1596/005","platform":["PRE"]},{"id":"T1597.001","short_id":".001","name":"Threat Intel Vendors","technique":"T1597","url":"https://attack.mitre.org/techniques/T1597/001","platform":["PRE"]},{"id":"T1597.002","short_id":".002","name":"Purchase Technical Data","technique":"T1597","url":"https://attack.mitre.org/techniques/T1597/002","platform":["PRE"]},{"id":"T1598.001","short_id":".001","name":"Spearphishing Service","technique":"T1598","url":"https://attack.mitre.org/techniques/T1598/001","platform":["PRE"]},{"id":"T1598.002","short_id":".002","name":"Spearphishing Attachment","technique":"T1598","url":"https://attack.mitre.org/techniques/T1598/002","platform":["PRE"]},{"id":"T1598.003","short_id":".003","name":"Spearphishing Link","technique":"T1598","url":"https://attack.mitre.org/techniques/T1598/003","platform":["PRE"]},{"id":"T1598.004","short_id":".004","name":"Spearphishing Voice","technique":"T1598","url":"https://attack.mitre.org/techniques/T1598/004","platform":["PRE"]},{"id":"T1599.001","short_id":".001","name":"Network Address Translation Traversal","technique":"T1599","url":"https://attack.mitre.org/techniques/T1599/001","platform":["Network"]},{"id":"T1600.001","short_id":".001","name":"Reduce Key Space","technique":"T1600","url":"https://attack.mitre.org/techniques/T1600/001","platform":["Network"]},{"id":"T1600.002","short_id":".002","name":"Disable Crypto Hardware","technique":"T1600","url":"https://attack.mitre.org/techniques/T1600/002","platform":["Network"]},{"id":"T1601.001","short_id":".001","name":"Patch System Image","technique":"T1601","url":"https://attack.mitre.org/techniques/T1601/001","platform":["Network"]},{"id":"T1601.002","short_id":".002","name":"Downgrade System Image","technique":"T1601","url":"https://attack.mitre.org/techniques/T1601/002","platform":["Network"]},{"id":"T1602.001","short_id":".001","name":"SNMP (MIB Dump)","technique":"T1602","url":"https://attack.mitre.org/techniques/T1602/001","platform":["Network"]},{"id":"T1602.002","short_id":".002","name":"Network Device Configuration Dump","technique":"T1602","url":"https://attack.mitre.org/techniques/T1602/002","platform":["Network"]},{"id":"T1606.001","short_id":".001","name":"Web Cookies","technique":"T1606","url":"https://attack.mitre.org/techniques/T1606/001","platform":["Linux","macOS","Windows","SaaS","IaaS"]},{"id":"T1606.002","short_id":".002","name":"SAML Tokens","technique":"T1606","url":"https://attack.mitre.org/techniques/T1606/002","platform":["Azure AD","SaaS","Windows","Office 365","Google Workspace","IaaS"]},{"id":"T1608.001","short_id":".001","name":"Upload Malware","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/001","platform":["PRE"]},{"id":"T1608.002","short_id":".002","name":"Upload Tool","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/002","platform":["PRE"]},{"id":"T1608.003","short_id":".003","name":"Install Digital Certificate","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/003","platform":["PRE"]},{"id":"T1608.004","short_id":".004","name":"Drive-by Target","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/004","platform":["PRE"]},{"id":"T1608.005","short_id":".005","name":"Link Target","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/005","platform":["PRE"]},{"id":"T1608.006","short_id":".006","name":"SEO Poisoning","technique":"T1608","url":"https://attack.mitre.org/techniques/T1608/006","platform":["PRE"]},{"id":"T1614.001","short_id":".001","name":"System Language Discovery","technique":"T1614","url":"https://attack.mitre.org/techniques/T1614/001","platform":["Windows","Linux","macOS"]}]}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{"tactics":[{"id":"TA0108","name":"Initial Access","short_name":"initial-access","sort_order":0},{"id":"TA0104","name":"Execution","short_name":"execution","sort_order":1},{"id":"TA0110","name":"Persistence","short_name":"persistence","sort_order":2},{"id":"TA0111","name":"Privilege Escalation","short_name":"privilege-escalation","sort_order":3},{"id":"TA0103","name":"Evasion","short_name":"evasion","sort_order":4},{"id":"TA0102","name":"Discovery","short_name":"discovery","sort_order":5},{"id":"TA0109","name":"Lateral Movement","short_name":"lateral-movement","sort_order":6},{"id":"TA0100","name":"Collection","short_name":"collection","sort_order":7},{"id":"TA0101","name":"Command and Control","short_name":"command-and-control","sort_order":8},{"id":"TA0107","name":"Inhibit Response Function","short_name":"inhibit-response-function","sort_order":9},{"id":"TA0106","name":"Impair Process Control","short_name":"impair-process-control","sort_order":10},{"id":"TA0105","name":"Impact","short_name":"impact","sort_order":11}],"techniques":[{"id":"T0803","name":"Block Command Message","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0803","platform":["None"]},{"id":"T0881","name":"Service Stop","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0881","platform":["None"]},{"id":"T0836","name":"Modify Parameter","tactics":["impair-process-control"],"url":"https://attack.mitre.org/techniques/T0836","platform":["None"]},{"id":"T0821","name":"Modify Controller Tasking","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0821","platform":["None"]},{"id":"T0887","name":"Wireless Sniffing","tactics":["discovery","collection"],"url":"https://attack.mitre.org/techniques/T0887","platform":["None"]},{"id":"T0829","name":"Loss of View","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0829","platform":["None"]},{"id":"T0800","name":"Activate Firmware Update Mode","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0800","platform":["None"]},{"id":"T0831","name":"Manipulation of Control","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0831","platform":["None"]},{"id":"T0814","name":"Denial of Service","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0814","platform":["None"]},{"id":"T0805","name":"Block Serial COM","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0805","platform":["None"]},{"id":"T0807","name":"Command-Line Interface","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0807","platform":["None"]},{"id":"T0861","name":"Point & Tag Identification","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0861","platform":["None"]},{"id":"T0816","name":"Device Restart/Shutdown","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0816","platform":["None"]},{"id":"T0863","name":"User Execution","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0863","platform":["None"]},{"id":"T0860","name":"Wireless Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0860","platform":["None"]},{"id":"T0858","name":"Change Operating Mode","tactics":["execution","evasion"],"url":"https://attack.mitre.org/techniques/T0858","platform":["None"]},{"id":"T0878","name":"Alarm Suppression","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0878","platform":["None"]},{"id":"T0868","name":"Detect Operating Mode","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0868","platform":["None"]},{"id":"T0837","name":"Loss of Protection","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0837","platform":["None"]},{"id":"T0801","name":"Monitor Process State","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0801","platform":["None"]},{"id":"T0853","name":"Scripting","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0853","platform":["None"]},{"id":"T0888","name":"Remote System Information Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T0888","platform":["None"]},{"id":"T0845","name":"Program Upload","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0845","platform":["None"]},{"id":"T0819","name":"Exploit Public-Facing Application","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0819","platform":["None"]},{"id":"T0811","name":"Data from Information Repositories","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0811","platform":["None"]},{"id":"T0864","name":"Transient Cyber Asset","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0864","platform":["None"]},{"id":"T0835","name":"Manipulate I/O Image","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0835","platform":["None"]},{"id":"T0842","name":"Network Sniffing","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T0842","platform":["None"]},{"id":"T0851","name":"Rootkit","tactics":["evasion","inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0851","platform":["None"]},{"id":"T0802","name":"Automated Collection","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0802","platform":["None"]},{"id":"T0804","name":"Block Reporting Message","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0804","platform":["None"]},{"id":"T0855","name":"Unauthorized Command Message","tactics":["impair-process-control"],"url":"https://attack.mitre.org/techniques/T0855","platform":["None"]},{"id":"T0809","name":"Data Destruction","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0809","platform":["None"]},{"id":"T0832","name":"Manipulation of View","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0832","platform":["None"]},{"id":"T0872","name":"Indicator Removal on Host","tactics":["evasion"],"url":"https://attack.mitre.org/techniques/T0872","platform":["None"]},{"id":"T0877","name":"I/O Image","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0877","platform":["None"]},{"id":"T0815","name":"Denial of View","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0815","platform":["None"]},{"id":"T0871","name":"Execution through API","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0871","platform":["None"]},{"id":"T0862","name":"Supply Chain Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0862","platform":["None"]},{"id":"T0880","name":"Loss of Safety","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0880","platform":["None"]},{"id":"T0828","name":"Loss of Productivity and Revenue","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0828","platform":["None"]},{"id":"T0865","name":"Spearphishing Attachment","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0865","platform":["None"]},{"id":"T0817","name":"Drive-by Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0817","platform":["None"]},{"id":"T0879","name":"Damage to Property","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0879","platform":["None"]},{"id":"T0856","name":"Spoof Reporting Message","tactics":["evasion","impair-process-control"],"url":"https://attack.mitre.org/techniques/T0856","platform":["None"]},{"id":"T0866","name":"Exploitation of Remote Services","tactics":["initial-access","lateral-movement"],"url":"https://attack.mitre.org/techniques/T0866","platform":["None"]},{"id":"T0812","name":"Default Credentials","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T0812","platform":["None"]},{"id":"T0822","name":"External Remote Services","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0822","platform":["None"]},{"id":"T0806","name":"Brute Force I/O","tactics":["impair-process-control"],"url":"https://attack.mitre.org/techniques/T0806","platform":["None"]},{"id":"T0830","name":"Adversary-in-the-Middle","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0830","platform":["None"]},{"id":"T0820","name":"Exploitation for Evasion","tactics":["evasion"],"url":"https://attack.mitre.org/techniques/T0820","platform":["None"]},{"id":"T0827","name":"Loss of Control","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0827","platform":["None"]},{"id":"T0874","name":"Hooking","tactics":["execution","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T0874","platform":["None"]},{"id":"T0823","name":"Graphical User Interface","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0823","platform":["None"]},{"id":"T0848","name":"Rogue Master","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0848","platform":["None"]},{"id":"T0834","name":"Native API","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T0834","platform":["None"]},{"id":"T0826","name":"Loss of Availability","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0826","platform":["None"]},{"id":"T0882","name":"Theft of Operational Information","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0882","platform":["None"]},{"id":"T0857","name":"System Firmware","tactics":["persistence","inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0857","platform":["None"]},{"id":"T0849","name":"Masquerading","tactics":["evasion"],"url":"https://attack.mitre.org/techniques/T0849","platform":["None"]},{"id":"T0843","name":"Program Download","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T0843","platform":["None"]},{"id":"T0847","name":"Replication Through Removable Media","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0847","platform":["None"]},{"id":"T0852","name":"Screen Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0852","platform":["None"]},{"id":"T0891","name":"Hardcoded Credentials","tactics":["lateral-movement","persistence"],"url":"https://attack.mitre.org/techniques/T0891","platform":["None"]},{"id":"T0859","name":"Valid Accounts","tactics":["persistence","lateral-movement"],"url":"https://attack.mitre.org/techniques/T0859","platform":["None"]},{"id":"T0890","name":"Exploitation for Privilege Escalation","tactics":["privilege-escalation"],"url":"https://attack.mitre.org/techniques/T0890","platform":["None"]},{"id":"T0846","name":"Remote System Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T0846","platform":["None"]},{"id":"T0884","name":"Connection Proxy","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T0884","platform":["None"]},{"id":"T0869","name":"Standard Application Layer Protocol","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T0869","platform":["None"]},{"id":"T0886","name":"Remote Services","tactics":["initial-access","lateral-movement"],"url":"https://attack.mitre.org/techniques/T0886","platform":["None"]},{"id":"T0813","name":"Denial of Control","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T0813","platform":["None"]},{"id":"T0838","name":"Modify Alarm Settings","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0838","platform":["None"]},{"id":"T0885","name":"Commonly Used Port","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T0885","platform":["None"]},{"id":"T0873","name":"Project File Infection","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T0873","platform":["None"]},{"id":"T0840","name":"Network Connection Enumeration","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T0840","platform":["None"]},{"id":"T0867","name":"Lateral Tool Transfer","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T0867","platform":["None"]},{"id":"T0839","name":"Module Firmware","tactics":["persistence","impair-process-control"],"url":"https://attack.mitre.org/techniques/T0839","platform":["None"]},{"id":"T0883","name":"Internet Accessible Device","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T0883","platform":["None"]},{"id":"T0893","name":"Data from Local System","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T0893","platform":["None"]},{"id":"T0892","name":"Change Credential","tactics":["inhibit-response-function"],"url":"https://attack.mitre.org/techniques/T0892","platform":["None"]},{"id":"T0889","name":"Modify Program","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T0889","platform":["None"]}],"sub_techniques":[]}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{"tactics":[{"id":"TA0027","name":"Initial Access","short_name":"initial-access","sort_order":0},{"id":"TA0041","name":"Execution","short_name":"execution","sort_order":1},{"id":"TA0028","name":"Persistence","short_name":"persistence","sort_order":2},{"id":"TA0029","name":"Privilege Escalation","short_name":"privilege-escalation","sort_order":3},{"id":"TA0030","name":"Defense Evasion","short_name":"defense-evasion","sort_order":4},{"id":"TA0031","name":"Credential Access","short_name":"credential-access","sort_order":5},{"id":"TA0032","name":"Discovery","short_name":"discovery","sort_order":6},{"id":"TA0033","name":"Lateral Movement","short_name":"lateral-movement","sort_order":7},{"id":"TA0035","name":"Collection","short_name":"collection","sort_order":8},{"id":"TA0037","name":"Command and Control","short_name":"command-and-control","sort_order":9},{"id":"TA0036","name":"Exfiltration","short_name":"exfiltration","sort_order":10},{"id":"TA0034","name":"Impact","short_name":"impact","sort_order":11},{"id":"TA0038","name":"Network Effects","short_name":"network-effects","sort_order":100},{"id":"TA0039","name":"Remote Service Effects","short_name":"remote-service-effects","sort_order":100}],"techniques":[{"id":"T1603","name":"Scheduled Task/Job","tactics":["execution","persistence"],"url":"https://attack.mitre.org/techniques/T1603","platform":["Android","iOS"]},{"id":"T1638","name":"Adversary-in-the-Middle","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1638","platform":["Android","iOS"]},{"id":"T1626","name":"Abuse Elevation Control Mechanism","tactics":["privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1626","platform":["Android"]},{"id":"T1663","name":"Remote Access Software","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1663","platform":["Android","iOS"]},{"id":"T1630","name":"Indicator Removal on Host","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1630","platform":["iOS","Android"]},{"id":"T1474","name":"Supply Chain Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1474","platform":["Android","iOS"]},{"id":"T1636","name":"Protected User Data","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1636","platform":["Android","iOS"]},{"id":"T1418","name":"Software Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1418","platform":["Android","iOS"]},{"id":"T1424","name":"Process Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1424","platform":["Android","iOS"]},{"id":"T1629","name":"Impair Defenses","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1629","platform":["Android"]},{"id":"T1428","name":"Exploitation of Remote Services","tactics":["lateral-movement"],"url":"https://attack.mitre.org/techniques/T1428","platform":["Android","iOS"]},{"id":"T1635","name":"Steal Application Access Token","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1635","platform":["Android","iOS"]},{"id":"T1633","name":"Virtualization/Sandbox Evasion","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1633","platform":["Android","iOS"]},{"id":"T1661","name":"Application Versioning","tactics":["initial-access","defense-evasion"],"url":"https://attack.mitre.org/techniques/T1661","platform":["Android","iOS"]},{"id":"T1623","name":"Command and Scripting Interpreter","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1623","platform":["Android","iOS"]},{"id":"T1544","name":"Ingress Tool Transfer","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1544","platform":["Android","iOS"]},{"id":"T1637","name":"Dynamic Resolution","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1637","platform":["Android","iOS"]},{"id":"T1423","name":"Network Service Scanning","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1423","platform":["Android","iOS"]},{"id":"T1646","name":"Exfiltration Over C2 Channel","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1646","platform":["Android","iOS"]},{"id":"T1404","name":"Exploitation for Privilege Escalation","tactics":["privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1404","platform":["Android","iOS"]},{"id":"T1616","name":"Call Control","tactics":["collection","impact","command-and-control"],"url":"https://attack.mitre.org/techniques/T1616","platform":["Android"]},{"id":"T1517","name":"Access Notifications","tactics":["collection","credential-access"],"url":"https://attack.mitre.org/techniques/T1517","platform":["Android"]},{"id":"T1639","name":"Exfiltration Over Alternative Protocol","tactics":["exfiltration"],"url":"https://attack.mitre.org/techniques/T1639","platform":["Android","iOS"]},{"id":"T1398","name":"Boot or Logon Initialization Scripts","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1398","platform":["Android","iOS"]},{"id":"T1627","name":"Execution Guardrails","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1627","platform":["Android","iOS"]},{"id":"T1645","name":"Compromise Client Software Binary","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1645","platform":["Android","iOS"]},{"id":"T1575","name":"Native API","tactics":["defense-evasion","execution"],"url":"https://attack.mitre.org/techniques/T1575","platform":["Android"]},{"id":"T1658","name":"Exploitation for Client Execution","tactics":["execution"],"url":"https://attack.mitre.org/techniques/T1658","platform":["Android","iOS"]},{"id":"T1604","name":"Proxy Through Victim","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1604","platform":["Android"]},{"id":"T1541","name":"Foreground Persistence","tactics":["defense-evasion","persistence"],"url":"https://attack.mitre.org/techniques/T1541","platform":["Android"]},{"id":"T1458","name":"Replication Through Removable Media","tactics":["initial-access","lateral-movement"],"url":"https://attack.mitre.org/techniques/T1458","platform":["Android","iOS"]},{"id":"T1429","name":"Audio Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1429","platform":["Android","iOS"]},{"id":"T1625","name":"Hijack Execution Flow","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1625","platform":["Android"]},{"id":"T1437","name":"Application Layer Protocol","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1437","platform":["Android","iOS"]},{"id":"T1407","name":"Download New Code at Runtime","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1407","platform":["Android","iOS"]},{"id":"T1409","name":"Stored Application Data","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1409","platform":["Android","iOS"]},{"id":"T1513","name":"Screen Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1513","platform":["Android"]},{"id":"T1632","name":"Subvert Trust Controls","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1632","platform":["Android","iOS"]},{"id":"T1509","name":"Non-Standard Port","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1509","platform":["Android","iOS"]},{"id":"T1430","name":"Location Tracking","tactics":["collection","discovery"],"url":"https://attack.mitre.org/techniques/T1430","platform":["Android","iOS"]},{"id":"T1662","name":"Data Destruction","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1662","platform":["Android"]},{"id":"T1417","name":"Input Capture","tactics":["collection","credential-access"],"url":"https://attack.mitre.org/techniques/T1417","platform":["Android","iOS"]},{"id":"T1643","name":"Generate Traffic from Victim","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1643","platform":["Android","iOS"]},{"id":"T1582","name":"SMS Control","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1582","platform":["Android"]},{"id":"T1631","name":"Process Injection","tactics":["defense-evasion","privilege-escalation"],"url":"https://attack.mitre.org/techniques/T1631","platform":["Android","iOS"]},{"id":"T1414","name":"Clipboard Data","tactics":["collection","credential-access"],"url":"https://attack.mitre.org/techniques/T1414","platform":["Android","iOS"]},{"id":"T1641","name":"Data Manipulation","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1641","platform":["Android"]},{"id":"T1481","name":"Web Service","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1481","platform":["Android","iOS"]},{"id":"T1634","name":"Credentials from Password Store","tactics":["credential-access"],"url":"https://attack.mitre.org/techniques/T1634","platform":["iOS"]},{"id":"T1617","name":"Hooking","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1617","platform":["Android"]},{"id":"T1420","name":"File and Directory Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1420","platform":["Android","iOS"]},{"id":"T1406","name":"Obfuscated Files or Information","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1406","platform":["Android","iOS"]},{"id":"T1516","name":"Input Injection","tactics":["defense-evasion","impact"],"url":"https://attack.mitre.org/techniques/T1516","platform":["Android"]},{"id":"T1464","name":"Network Denial of Service","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1464","platform":["Android","iOS"]},{"id":"T1577","name":"Compromise Application Executable","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1577","platform":["Android"]},{"id":"T1624","name":"Event Triggered Execution","tactics":["persistence"],"url":"https://attack.mitre.org/techniques/T1624","platform":["Android"]},{"id":"T1422","name":"System Network Configuration Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1422","platform":["Android","iOS"]},{"id":"T1512","name":"Video Capture","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1512","platform":["Android","iOS"]},{"id":"T1471","name":"Data Encrypted for Impact","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1471","platform":["Android"]},{"id":"T1421","name":"System Network Connections Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1421","platform":["Android"]},{"id":"T1660","name":"Phishing","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1660","platform":["Android","iOS"]},{"id":"T1461","name":"Lockscreen Bypass","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1461","platform":["Android","iOS"]},{"id":"T1533","name":"Data from Local System","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1533","platform":["Android","iOS"]},{"id":"T1640","name":"Account Access Removal","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1640","platform":["Android"]},{"id":"T1426","name":"System Information Discovery","tactics":["discovery"],"url":"https://attack.mitre.org/techniques/T1426","platform":["Android","iOS"]},{"id":"T1532","name":"Archive Collected Data","tactics":["collection"],"url":"https://attack.mitre.org/techniques/T1532","platform":["Android","iOS"]},{"id":"T1642","name":"Endpoint Denial of Service","tactics":["impact"],"url":"https://attack.mitre.org/techniques/T1642","platform":["Android","iOS"]},{"id":"T1644","name":"Out of Band Data","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1644","platform":["Android","iOS"]},{"id":"T1521","name":"Encrypted Channel","tactics":["command-and-control"],"url":"https://attack.mitre.org/techniques/T1521","platform":["Android","iOS"]},{"id":"T1655","name":"Masquerading","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1655","platform":["Android","iOS"]},{"id":"T1628","name":"Hide Artifacts","tactics":["defense-evasion"],"url":"https://attack.mitre.org/techniques/T1628","platform":["Android"]},{"id":"T1456","name":"Drive-By Compromise","tactics":["initial-access"],"url":"https://attack.mitre.org/techniques/T1456","platform":["Android","iOS"]}],"sub_techniques":[{"id":"T1406.001","short_id":".001","name":"Steganography","technique":"T1406","url":"https://attack.mitre.org/techniques/T1406/001","platform":["Android"]},{"id":"T1406.002","short_id":".002","name":"Software Packing","technique":"T1406","url":"https://attack.mitre.org/techniques/T1406/002","platform":["iOS","Android"]},{"id":"T1417.001","short_id":".001","name":"Keylogging","technique":"T1417","url":"https://attack.mitre.org/techniques/T1417/001","platform":["Android","iOS"]},{"id":"T1417.002","short_id":".002","name":"GUI Input Capture","technique":"T1417","url":"https://attack.mitre.org/techniques/T1417/002","platform":["Android","iOS"]},{"id":"T1418.001","short_id":".001","name":"Security Software Discovery","technique":"T1418","url":"https://attack.mitre.org/techniques/T1418/001","platform":["Android","iOS"]},{"id":"T1430.001","short_id":".001","name":"Remote Device Management Services","technique":"T1430","url":"https://attack.mitre.org/techniques/T1430/001","platform":["Android","iOS"]},{"id":"T1430.002","short_id":".002","name":"Impersonate SS7 Nodes","technique":"T1430","url":"https://attack.mitre.org/techniques/T1430/002","platform":["Android","iOS"]},{"id":"T1437.001","short_id":".001","name":"Web Protocols","technique":"T1437","url":"https://attack.mitre.org/techniques/T1437/001","platform":["Android","iOS"]},{"id":"T1474.001","short_id":".001","name":"Compromise Software Dependencies and Development Tools","technique":"T1474","url":"https://attack.mitre.org/techniques/T1474/001","platform":["Android","iOS"]},{"id":"T1474.002","short_id":".002","name":"Compromise Hardware Supply Chain","technique":"T1474","url":"https://attack.mitre.org/techniques/T1474/002","platform":["Android","iOS"]},{"id":"T1474.003","short_id":".003","name":"Compromise Software Supply Chain","technique":"T1474","url":"https://attack.mitre.org/techniques/T1474/003","platform":["Android","iOS"]},{"id":"T1481.001","short_id":".001","name":"Dead Drop Resolver","technique":"T1481","url":"https://attack.mitre.org/techniques/T1481/001","platform":["Android","iOS"]},{"id":"T1481.002","short_id":".002","name":"Bidirectional Communication","technique":"T1481","url":"https://attack.mitre.org/techniques/T1481/002","platform":["Android","iOS"]},{"id":"T1481.003","short_id":".003","name":"One-Way Communication","technique":"T1481","url":"https://attack.mitre.org/techniques/T1481/003","platform":["Android","iOS"]},{"id":"T1521.001","short_id":".001","name":"Symmetric Cryptography","technique":"T1521","url":"https://attack.mitre.org/techniques/T1521/001","platform":["Android","iOS"]},{"id":"T1521.002","short_id":".002","name":"Asymmetric Cryptography","technique":"T1521","url":"https://attack.mitre.org/techniques/T1521/002","platform":["Android","iOS"]},{"id":"T1623.001","short_id":".001","name":"Unix Shell","technique":"T1623","url":"https://attack.mitre.org/techniques/T1623/001","platform":["Android","iOS"]},{"id":"T1624.001","short_id":".001","name":"Broadcast Receivers","technique":"T1624","url":"https://attack.mitre.org/techniques/T1624/001","platform":["Android"]},{"id":"T1625.001","short_id":".001","name":"System Runtime API Hijacking","technique":"T1625","url":"https://attack.mitre.org/techniques/T1625/001","platform":["Android"]},{"id":"T1626.001","short_id":".001","name":"Device Administrator Permissions","technique":"T1626","url":"https://attack.mitre.org/techniques/T1626/001","platform":["Android"]},{"id":"T1627.001","short_id":".001","name":"Geofencing","technique":"T1627","url":"https://attack.mitre.org/techniques/T1627/001","platform":["Android","iOS"]},{"id":"T1628.001","short_id":".001","name":"Suppress Application Icon","technique":"T1628","url":"https://attack.mitre.org/techniques/T1628/001","platform":["Android"]},{"id":"T1628.002","short_id":".002","name":"User Evasion","technique":"T1628","url":"https://attack.mitre.org/techniques/T1628/002","platform":["Android"]},{"id":"T1629.001","short_id":".001","name":"Prevent Application Removal","technique":"T1629","url":"https://attack.mitre.org/techniques/T1629/001","platform":["Android"]},{"id":"T1629.002","short_id":".002","name":"Device Lockout","technique":"T1629","url":"https://attack.mitre.org/techniques/T1629/002","platform":["Android"]},{"id":"T1629.003","short_id":".003","name":"Disable or Modify Tools","technique":"T1629","url":"https://attack.mitre.org/techniques/T1629/003","platform":["Android"]},{"id":"T1630.001","short_id":".001","name":"Uninstall Malicious Application","technique":"T1630","url":"https://attack.mitre.org/techniques/T1630/001","platform":["Android"]},{"id":"T1630.002","short_id":".002","name":"File Deletion","technique":"T1630","url":"https://attack.mitre.org/techniques/T1630/002","platform":["Android"]},{"id":"T1630.003","short_id":".003","name":"Disguise Root/Jailbreak Indicators","technique":"T1630","url":"https://attack.mitre.org/techniques/T1630/003","platform":["Android","iOS"]},{"id":"T1631.001","short_id":".001","name":"Ptrace System Calls","technique":"T1631","url":"https://attack.mitre.org/techniques/T1631/001","platform":["Android","iOS"]},{"id":"T1632.001","short_id":".001","name":"Code Signing Policy Modification","technique":"T1632","url":"https://attack.mitre.org/techniques/T1632/001","platform":["Android","iOS"]},{"id":"T1633.001","short_id":".001","name":"System Checks","technique":"T1633","url":"https://attack.mitre.org/techniques/T1633/001","platform":["Android","iOS"]},{"id":"T1634.001","short_id":".001","name":"Keychain","technique":"T1634","url":"https://attack.mitre.org/techniques/T1634/001","platform":["iOS"]},{"id":"T1635.001","short_id":".001","name":"URI Hijacking","technique":"T1635","url":"https://attack.mitre.org/techniques/T1635/001","platform":["Android","iOS"]},{"id":"T1636.001","short_id":".001","name":"Calendar Entries","technique":"T1636","url":"https://attack.mitre.org/techniques/T1636/001","platform":["Android","iOS"]},{"id":"T1636.002","short_id":".002","name":"Call Log","technique":"T1636","url":"https://attack.mitre.org/techniques/T1636/002","platform":["Android","iOS"]},{"id":"T1636.003","short_id":".003","name":"Contact List","technique":"T1636","url":"https://attack.mitre.org/techniques/T1636/003","platform":["iOS","Android"]},{"id":"T1636.004","short_id":".004","name":"SMS Messages","technique":"T1636","url":"https://attack.mitre.org/techniques/T1636/004","platform":["Android","iOS"]},{"id":"T1637.001","short_id":".001","name":"Domain Generation Algorithms","technique":"T1637","url":"https://attack.mitre.org/techniques/T1637/001","platform":["Android","iOS"]},{"id":"T1639.001","short_id":".001","name":"Exfiltration Over Unencrypted Non-C2 Protocol","technique":"T1639","url":"https://attack.mitre.org/techniques/T1639/001","platform":["Android","iOS"]},{"id":"T1641.001","short_id":".001","name":"Transmitted Data Manipulation","technique":"T1641","url":"https://attack.mitre.org/techniques/T1641/001","platform":["Android"]},{"id":"T1655.001","short_id":".001","name":"Match Legitimate Name or Location","technique":"T1655","url":"https://attack.mitre.org/techniques/T1655/001","platform":["Android","iOS"]}]}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{"tactics":[{"id":"D3-AI","name":"Asset Inventory","short_name":"d3f:AssetInventory","sort_order":0},{"id":"D3-NM","name":"Network Mapping","short_name":"d3f:NetworkMapping","sort_order":1},{"id":"D3-OAM","name":"Operational Activity Mapping","short_name":"d3f:OperationalActivityMapping","sort_order":2},{"id":"D3-SYSM","name":"System Mapping","short_name":"d3f:SystemMapping","sort_order":3},{"id":"D3-AH","name":"Application Hardening","short_name":"d3f:ApplicationHardening","sort_order":4},{"id":"D3-CH","name":"Credential Hardening","short_name":"d3f:CredentialHardening","sort_order":5},{"id":"D3-MH","name":"Message Hardening","short_name":"d3f:MessageHardening","sort_order":6},{"id":"D3-PH","name":"Platform Hardening","short_name":"d3f:PlatformHardening","sort_order":7},{"id":"D3-FA","name":"File Analysis","short_name":"d3f:FileAnalysis","sort_order":8},{"id":"D3-ID","name":"Identifier Analysis","short_name":"d3f:IdentifierAnalysis","sort_order":9},{"id":"D3-MA","name":"Message Analysis","short_name":"d3f:MessageAnalysis","sort_order":10},{"id":"D3-NTA","name":"Network Traffic Analysis","short_name":"d3f:NetworkTrafficAnalysis","sort_order":11},{"id":"D3-PM","name":"Platform Monitoring","short_name":"d3f:PlatformMonitoring","sort_order":12},{"id":"D3-PA","name":"Process Analysis","short_name":"d3f:ProcessAnalysis","sort_order":13},{"id":"D3-UBA","name":"User Behavior Analysis","short_name":"d3f:UserBehaviorAnalysis","sort_order":14},{"id":"D3-EI","name":"Execution Isolation","short_name":"d3f:ExecutionIsolation","sort_order":15},{"id":"D3-NI","name":"Network Isolation","short_name":"d3f:NetworkIsolation","sort_order":16},{"id":"D3-DE","name":"Decoy Environment","short_name":"d3f:DecoyEnvironment","sort_order":17},{"id":"D3-DO","name":"Decoy Object","short_name":"d3f:DecoyObject","sort_order":18},{"id":"D3-CE","name":"Credential Eviction","short_name":"d3f:CredentialEviction","sort_order":19},{"id":"D3-FEV","name":"File Eviction","short_name":"d3f:FileEviction","sort_order":20},{"id":"D3-PE","name":"Process Eviction","short_name":"d3f:ProcessEviction","sort_order":21},{"id":"D3-RA","name":"Restore Access","short_name":"d3f:RestoreAccess","sort_order":22},{"id":"D3-RO","name":"Restore Object","short_name":"d3f:RestoreObject","sort_order":23}],"techniques":[{"id":"D3-KBPI","name":"Kernel-based Process Isolation","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:Kernel-basedProcessIsolation"},{"id":"D3-BSE","name":"Byte Sequence Emulation","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ByteSequenceEmulation"},{"id":"D3-SDA","name":"Session Duration Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SessionDurationAnalysis"},{"id":"D3-CR","name":"Credential Revoking","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialRevoking"},{"id":"D3-WSAA","name":"Web Session Activity Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:WebSessionActivityAnalysis"},{"id":"D3-SPP","name":"Strong Password Policy","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:StrongPasswordPolicy"},{"id":"D3-OTP","name":"One-time Password","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:One-timePassword"},{"id":"D3-DLIC","name":"Driver Load Integrity Checking","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DriverLoadIntegrityChecking"},{"id":"D3-DQSA","name":"Database Query String Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DatabaseQueryStringAnalysis"},{"id":"D3-DNSDL","name":"DNS Denylisting","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:DNSDenylisting"},{"id":"D3-LFP","name":"Local File Permissions","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:LocalFilePermissions"},{"id":"D3-HCI","name":"Hardware Component Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:HardwareComponentInventory"},{"id":"D3-PS","name":"Process Suspension","tactics":["d3f:ProcessEviction"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSuspension"},{"id":"D3-HD","name":"Homoglyph Detection","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:HomoglyphDetection"},{"id":"D3-RTA","name":"RPC Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RPCTrafficAnalysis"},{"id":"D3-CBAN","name":"Certificate-based Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:Certificate-basedAuthentication"},{"id":"D3-ANET","name":"Authentication Event Thresholding","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AuthenticationEventThresholding"},{"id":"D3-CCSA","name":"Credential Compromise Scope Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialCompromiseScopeAnalysis"},{"id":"D3-FV","name":"Firmware Verification","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareVerification"},{"id":"D3-FC","name":"File Carving","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileCarving"},{"id":"D3-SWI","name":"Software Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:SoftwareInventory"},{"id":"D3-DEM","name":"Data Exchange Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:DataExchangeMapping"},{"id":"D3-DF","name":"Decoy File","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyFile"},{"id":"D3-MFA","name":"Multi-factor Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:Multi-factorAuthentication"},{"id":"D3-RTSD","name":"Remote Terminal Session Detection","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RemoteTerminalSessionDetection"},{"id":"D3-IHN","name":"Integrated Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:IntegratedHoneynet"},{"id":"D3-AZET","name":"Authorization Event Thresholding","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AuthorizationEventThresholding"},{"id":"D3-SYSVA","name":"System Vulnerability Assessment","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:SystemVulnerabilityAssessment"},{"id":"D3-RC","name":"Restore Configuration","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreConfiguration"},{"id":"D3-JFAPA","name":"Job Function Access Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:JobFunctionAccessPatternAnalysis"},{"id":"D3-NTPM","name":"Network Traffic Policy Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficPolicyMapping"},{"id":"D3-PMAD","name":"Protocol Metadata Anomaly Detection","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProtocolMetadataAnomalyDetection"},{"id":"D3-TAAN","name":"Transfer Agent Authentication","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:TransferAgentAuthentication"},{"id":"D3-ET","name":"Encrypted Tunnels","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:EncryptedTunnels"},{"id":"D3-DNR","name":"Decoy Network Resource","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyNetworkResource"},{"id":"D3-CRO","name":"Credential Rotation","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialRotation"},{"id":"D3-LLM","name":"Logical Link Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:LogicalLinkMapping"},{"id":"D3-OM","name":"Organization Mapping","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OrganizationMapping"},{"id":"D3-EAL","name":"Executable Allowlisting","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ExecutableAllowlisting"},{"id":"D3-DA","name":"Dynamic Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DynamicAnalysis"},{"id":"D3-SFCV","name":"Stack Frame Canary Validation","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:StackFrameCanaryValidation"},{"id":"D3-DP","name":"Decoy Persona","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyPersona"},{"id":"D3-RD","name":"Restore Database","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreDatabase"},{"id":"D3-UAP","name":"User Account Permissions","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:UserAccountPermissions"},{"id":"D3-RUAA","name":"Restore User Account Access","tactics":["d3f:RestoreAccess"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreUserAccountAccess"},{"id":"D3-AM","name":"Access Modeling","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:AccessModeling"},{"id":"D3-ODM","name":"Operational Dependency Mapping","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OperationalDependencyMapping"},{"id":"D3-SVCDM","name":"Service Dependency Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ServiceDependencyMapping"},{"id":"D3-RPA","name":"Relay Pattern Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:RelayPatternAnalysis"},{"id":"D3-UGLPA","name":"User Geolocation Logon Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:UserGeolocationLogonPatternAnalysis"},{"id":"D3-FH","name":"File Hashing","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileHashing"},{"id":"D3-DTP","name":"Domain Trust Policy","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DomainTrustPolicy"},{"id":"D3-SHN","name":"Standalone Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:StandaloneHoneynet"},{"id":"D3-MENCR","name":"Message Encryption","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:MessageEncryption"},{"id":"D3-SCA","name":"System Call Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SystemCallAnalysis"},{"id":"D3-RS","name":"Restore Software","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreSoftware"},{"id":"D3-IOPR","name":"IO Port Restriction","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:IOPortRestriction"},{"id":"D3-CAA","name":"Connection Attempt Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ConnectionAttemptAnalysis"},{"id":"D3-CHN","name":"Connected Honeynet","tactics":["d3f:DecoyEnvironment"],"url":"https://d3fend.mitre.org/technique/d3f:ConnectedHoneynet"},{"id":"D3-DAM","name":"Domain Account Monitoring","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DomainAccountMonitoring"},{"id":"D3-CA","name":"Certificate Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CertificateAnalysis"},{"id":"D3-SCP","name":"System Configuration Permissions","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SystemConfigurationPermissions"},{"id":"D3-FCOA","name":"File Content Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileContentAnalysis"},{"id":"D3-ORA","name":"Operational Risk Assessment","tactics":["d3f:OperationalActivityMapping"],"url":"https://d3fend.mitre.org/technique/d3f:OperationalRiskAssessment"},{"id":"D3-DENCR","name":"Disk Encryption","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DiskEncryption"},{"id":"D3-MAN","name":"Message Authentication","tactics":["d3f:MessageHardening"],"url":"https://d3fend.mitre.org/technique/d3f:MessageAuthentication"},{"id":"D3-EDL","name":"Executable Denylisting","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:ExecutableDenylisting"},{"id":"D3-FAPA","name":"File Access Pattern Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileAccessPatternAnalysis"},{"id":"D3-OSM","name":"Operating System Monitoring","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:OperatingSystemMonitoring"},{"id":"D3-SEA","name":"Script Execution Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ScriptExecutionAnalysis"},{"id":"D3-PCSV","name":"Process Code Segment Verification","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessCodeSegmentVerification"},{"id":"D3-RNA","name":"Restore Network Access","tactics":["d3f:RestoreAccess"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreNetworkAccess"},{"id":"D3-RF","name":"Restore File","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreFile"},{"id":"D3-IBCA","name":"Indirect Branch Call Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IndirectBranchCallAnalysis"},{"id":"D3-ACH","name":"Application Configuration Hardening","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ApplicationConfigurationHardening"},{"id":"D3-CI","name":"Configuration Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:ConfigurationInventory"},{"id":"D3-DPR","name":"Decoy Public Release","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyPublicRelease"},{"id":"D3-BAN","name":"Biometric Authentication","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:BiometricAuthentication"},{"id":"D3-NTF","name":"Network Traffic Filtering","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficFiltering"},{"id":"D3-NTCD","name":"Network Traffic Community Deviation","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkTrafficCommunityDeviation"},{"id":"D3-PHDURA","name":"Per Host Download-Upload Ratio Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:PerHostDownload-UploadRatioAnalysis"},{"id":"D3-CP","name":"Certificate Pinning","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CertificatePinning"},{"id":"D3-RAPA","name":"Resource Access Pattern Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ResourceAccessPatternAnalysis"},{"id":"D3-SAOR","name":"Segment Address Offset Randomization","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SegmentAddressOffsetRandomization"},{"id":"D3-EHPV","name":"Exception Handler Pointer Validation","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ExceptionHandlerPointerValidation"},{"id":"D3-TBI","name":"TPM Boot Integrity","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:TPMBootIntegrity"},{"id":"D3-ANAA","name":"Administrative Network Activity Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:AdministrativeNetworkActivityAnalysis"},{"id":"D3-NVA","name":"Network Vulnerability Assessment","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkVulnerabilityAssessment"},{"id":"D3-IPCTA","name":"IPC Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IPCTrafficAnalysis"},{"id":"D3-RFS","name":"RF Shielding","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:RFShielding"},{"id":"D3-DI","name":"Data Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:DataInventory"},{"id":"D3-DCE","name":"Dead Code Elimination","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:DeadCodeElimination"},{"id":"D3-FBA","name":"Firmware Behavior Analysis","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareBehaviorAnalysis"},{"id":"D3-SU","name":"Software Update","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:SoftwareUpdate"},{"id":"D3-DST","name":"Decoy Session Token","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoySessionToken"},{"id":"D3-IAA","name":"Identifier Activity Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IdentifierActivityAnalysis"},{"id":"D3-DNSAL","name":"DNS Allowlisting","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:DNSAllowlisting"},{"id":"D3-IRA","name":"Identifier Reputation Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IdentifierReputationAnalysis"},{"id":"D3-PLM","name":"Physical Link Mapping","tactics":["d3f:NetworkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PhysicalLinkMapping"},{"id":"D3-LAM","name":"Local Account Monitoring","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:LocalAccountMonitoring"},{"id":"D3-CTS","name":"Credential Transmission Scoping","tactics":["d3f:CredentialHardening"],"url":"https://d3fend.mitre.org/technique/d3f:CredentialTransmissionScoping"},{"id":"D3-SSC","name":"Shadow Stack Comparisons","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ShadowStackComparisons"},{"id":"D3-SMRA","name":"Sender MTA Reputation Analysis","tactics":["d3f:MessageAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SenderMTAReputationAnalysis"},{"id":"D3-PSMD","name":"Process Self-Modification Detection","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSelf-ModificationDetection"},{"id":"D3-NNI","name":"Network Node Inventory","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:NetworkNodeInventory"},{"id":"D3-SRA","name":"Sender Reputation Analysis","tactics":["d3f:MessageAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:SenderReputationAnalysis"},{"id":"D3-ANCI","name":"Authentication Cache Invalidation","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:AuthenticationCacheInvalidation"},{"id":"D3-PSEP","name":"Process Segment Execution Prevention","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSegmentExecutionPrevention"},{"id":"D3-UDTA","name":"User Data Transfer Analysis","tactics":["d3f:UserBehaviorAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis"},{"id":"D3-AL","name":"Account Locking","tactics":["d3f:CredentialEviction"],"url":"https://d3fend.mitre.org/technique/d3f:AccountLocking"},{"id":"D3-UA","name":"URL Analysis","tactics":["d3f:IdentifierAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:URLAnalysis"},{"id":"D3-EFA","name":"Emulated File Analysis","tactics":["d3f:FileAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:EmulatedFileAnalysis"},{"id":"D3-FEMC","name":"Firmware Embedded Monitoring Code","tactics":["d3f:PlatformMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:FirmwareEmbeddedMonitoringCode"},{"id":"D3-CSPP","name":"Client-server Payload Profiling","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:Client-serverPayloadProfiling"},{"id":"D3-BDI","name":"Broadcast Domain Isolation","tactics":["d3f:NetworkIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:BroadcastDomainIsolation"},{"id":"D3-FE","name":"File Encryption","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:FileEncryption"},{"id":"D3-ISVA","name":"Inbound Session Volume Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:InboundSessionVolumeAnalysis"},{"id":"D3-RC","name":"Reissue Credential","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:ReissueCredential"},{"id":"D3-AVE","name":"Asset Vulnerability Enumeration","tactics":["d3f:AssetInventory"],"url":"https://d3fend.mitre.org/technique/d3f:AssetVulnerabilityEnumeration"},{"id":"D3-FR","name":"File Removal","tactics":["d3f:FileEviction"],"url":"https://d3fend.mitre.org/technique/d3f:FileRemoval"},{"id":"D3-PT","name":"Process Termination","tactics":["d3f:ProcessEviction"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessTermination"},{"id":"D3-DNSTA","name":"DNS Traffic Analysis","tactics":["d3f:NetworkTrafficAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DNSTrafficAnalysis"},{"id":"D3-HBPI","name":"Hardware-based Process Isolation","tactics":["d3f:ExecutionIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:Hardware-basedProcessIsolation"},{"id":"D3-RDI","name":"Restore Disk Image","tactics":["d3f:RestoreObject"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreDiskImage"},{"id":"D3-PAN","name":"Pointer Authentication","tactics":["d3f:ApplicationHardening"],"url":"https://d3fend.mitre.org/technique/d3f:PointerAuthentication"},{"id":"D3-BA","name":"Bootloader Authentication","tactics":["d3f:PlatformHardening"],"url":"https://d3fend.mitre.org/technique/d3f:BootloaderAuthentication"},{"id":"D3-PSA","name":"Process Spawn Analysis","tactics":["d3f:ProcessAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessSpawnAnalysis"},{"id":"D3-SYSDM","name":"System Dependency Mapping","tactics":["d3f:SystemMapping"],"url":"https://d3fend.mitre.org/technique/d3f:SystemDependencyMapping"},{"id":"D3-DUC","name":"Decoy User Credential","tactics":["d3f:DecoyObject"],"url":"https://d3fend.mitre.org/technique/d3f:DecoyUserCredential"}],"sub_techniques":[{"id":"D3-ACA","name":"Active Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ActiveCertificateAnalysis"},{"id":"D3-ALLM","name":"Active Logical Link Mapping","technique":["d3f:LogicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ActiveLogicalLinkMapping"},{"id":"D3-APLM","name":"Active Physical Link Mapping","technique":["d3f:PhysicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:ActivePhysicalLinkMapping"},{"id":"D3-CA","name":"Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:CertificateAnalysis"},{"id":"D3-DNRA","name":"Domain Name Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:DomainNameReputationAnalysis"},{"id":"D3-EHB","name":"Endpoint Health Beacon","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:EndpointHealthBeacon"},{"id":"D3-ER","name":"Email Removal","technique":["d3f:FileRemoval"],"url":"https://d3fend.mitre.org/technique/d3f:EmailRemoval"},{"id":"D3-FCA","name":"File Creation Analysis","technique":["d3f:SystemCallAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileCreationAnalysis"},{"id":"D3-FCR","name":"File Content Rules","technique":["d3f:FileContentAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileContentRules"},{"id":"D3-FHRA","name":"File Hash Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:FileHashReputationAnalysis"},{"id":"D3-FRDDL","name":"Forward Resolution Domain Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ForwardResolutionDomainDenylisting"},{"id":"D3-FRIDL","name":"Forward Resolution IP Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ForwardResolutionIPDenylisting"},{"id":"D3-IDA","name":"Input Device Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:InputDeviceAnalysis"},{"id":"D3-IPRA","name":"IP Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:IPReputationAnalysis"},{"id":"D3-ITF","name":"Inbound Traffic Filtering","technique":["d3f:NetworkTrafficFiltering"],"url":"https://d3fend.mitre.org/technique/d3f:InboundTrafficFiltering"},{"id":"D3-MAC","name":"Mandatory Access Control","technique":["d3f:Kernel-basedProcessIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:MandatoryAccessControl"},{"id":"D3-MBT","name":"Memory Boundary Tracking","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:MemoryBoundaryTracking"},{"id":"D3-OTF","name":"Outbound Traffic Filtering","technique":["d3f:NetworkTrafficFiltering"],"url":"https://d3fend.mitre.org/technique/d3f:OutboundTrafficFiltering"},{"id":"D3-PCA","name":"Passive Certificate Analysis","technique":["d3f:CertificateAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:PassiveCertificateAnalysis"},{"id":"D3-PFV","name":"Peripheral Firmware Verification","technique":["d3f:FirmwareVerification"],"url":"https://d3fend.mitre.org/technique/d3f:PeripheralFirmwareVerification"},{"id":"D3-PLA","name":"Process Lineage Analysis","technique":["d3f:ProcessSpawnAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:ProcessLineageAnalysis"},{"id":"D3-PLLM","name":"Passive Logical Link Mapping","technique":["d3f:LogicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PassiveLogicalLinkMapping"},{"id":"D3-PPLM","name":"Passive Physical Link Mapping","technique":["d3f:PhysicalLinkMapping"],"url":"https://d3fend.mitre.org/technique/d3f:PassivePhysicalLinkMapping"},{"id":"D3-RE","name":"Restore Email","technique":["d3f:RestoreFile"],"url":"https://d3fend.mitre.org/technique/d3f:RestoreEmail"},{"id":"D3-RRDD","name":"Reverse Resolution Domain Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ReverseResolutionDomainDenylisting"},{"id":"D3-RRID","name":"Reverse Resolution IP Denylisting","technique":["d3f:DNSDenylisting"],"url":"https://d3fend.mitre.org/technique/d3f:ReverseResolutionIPDenylisting"},{"id":"D3-SCF","name":"System Call Filtering","technique":["d3f:Kernel-basedProcessIsolation"],"url":"https://d3fend.mitre.org/technique/d3f:SystemCallFiltering"},{"id":"D3-SDM","name":"System Daemon Monitoring","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemDaemonMonitoring"},{"id":"D3-SFA","name":"System File Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemFileAnalysis"},{"id":"D3-SFV","name":"System Firmware Verification","technique":["d3f:FirmwareVerification"],"url":"https://d3fend.mitre.org/technique/d3f:SystemFirmwareVerification"},{"id":"D3-SICA","name":"System Init Config Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:SystemInitConfigAnalysis"},{"id":"D3-SJA","name":"Scheduled Job Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:ScheduledJobAnalysis"},{"id":"D3-ULA","name":"Unlock Account","technique":["d3f:RestoreUserAccountAccess"],"url":"https://d3fend.mitre.org/technique/d3f:UnlockAccount"},{"id":"D3-URA","name":"URL Reputation Analysis","technique":["d3f:IdentifierReputationAnalysis"],"url":"https://d3fend.mitre.org/technique/d3f:URLReputationAnalysis"},{"id":"D3-USICA","name":"User Session Init Config Analysis","technique":["d3f:OperatingSystemMonitoring"],"url":"https://d3fend.mitre.org/technique/d3f:UserSessionInitConfigAnalysis"}]}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;