// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/vue3.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reactive = reactive;
exports.effect = effect;
exports.track = track;
exports.trigger = trigger;
exports.createApp = exports.targetMap = void 0;

var _PatchFlagNames, _errorMessages, _helperNameMap, _registerRuntimeHelpe, _DOMErrorMessages, _ErrorTypeStrings;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return !!map[val.toLowerCase()];
  } : function (val) {
    return !!map[val];
  };
} // Patch flags are optimization hints generated by the compiler.
// when a block with dynamicChildren is encountered during diff, the algorithm
// enters "optimized mode". In this mode, we know that the vdom is produced by
// a render function generated by the compiler, so the algorithm only needs to
// handle updates explicitly marked by these patch flags.
// dev only flag -> name mapping


var PatchFlagNames = (_PatchFlagNames = {}, _defineProperty(_PatchFlagNames, 1
/* TEXT */
, "TEXT"), _defineProperty(_PatchFlagNames, 2
/* CLASS */
, "CLASS"), _defineProperty(_PatchFlagNames, 4
/* STYLE */
, "STYLE"), _defineProperty(_PatchFlagNames, 8
/* PROPS */
, "PROPS"), _defineProperty(_PatchFlagNames, 16
/* FULL_PROPS */
, "FULL_PROPS"), _defineProperty(_PatchFlagNames, 32
/* HYDRATE_EVENTS */
, "HYDRATE_EVENTS"), _defineProperty(_PatchFlagNames, 64
/* STABLE_FRAGMENT */
, "STABLE_FRAGMENT"), _defineProperty(_PatchFlagNames, 128
/* KEYED_FRAGMENT */
, "KEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 256
/* UNKEYED_FRAGMENT */
, "UNKEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 1024
/* DYNAMIC_SLOTS */
, "DYNAMIC_SLOTS"), _defineProperty(_PatchFlagNames, 512
/* NEED_PATCH */
, "NEED_PATCH"), _defineProperty(_PatchFlagNames, -1
/* HOISTED */
, "HOISTED"), _defineProperty(_PatchFlagNames, -2
/* BAIL */
, "BAIL"), _PatchFlagNames);
var GLOBALS_WHITE_LISTED = 'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,' + 'decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,' + 'Object,Boolean,String,RegExp,Map,Set,JSON,Intl';
var isGloballyWhitelisted = /*#__PURE__*/makeMap(GLOBALS_WHITE_LISTED);
var range = 2;

function generateCodeFrame(source) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];

  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;

    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) continue;
        var line = j + 1;
        res.push("".concat(line).concat(' '.repeat(3 - String(line).length), "|  ").concat(lines[j]));
        var lineLength = lines[j].length;

        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push("   |  " + ' '.repeat(pad) + '^'.repeat(length));
        } else if (j > i) {
          if (end > count) {
            var _length = Math.max(Math.min(end - count, lineLength), 1);

            res.push("   |  " + '^'.repeat(_length));
          }

          count += lineLength + 1;
        }
      }

      break;
    }
  }

  return res.join('\n');
}
/**
 * On the client we only need to offer special cases for boolean attributes that
 * have different names from their corresponding dom properties:
 * - itemscope -> N/A
 * - allowfullscreen -> allowFullscreen
 * - formnovalidate -> formNoValidate
 * - ismap -> isMap
 * - nomodule -> noModule
 * - novalidate -> noValidate
 * - readonly -> readOnly
 */


var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
var isSpecialBooleanAttr = /*#__PURE__*/makeMap(specialBooleanAttrs);

function normalizeStyle(value) {
  if (isArray(value)) {
    var res = {};

    for (var i = 0; i < value.length; i++) {
      var item = value[i];
      var normalized = normalizeStyle(isString(item) ? parseStringStyle(item) : item);

      if (normalized) {
        for (var key in normalized) {
          res[key] = normalized[key];
        }
      }
    }

    return res;
  } else if (isObject(value)) {
    return value;
  }
}

var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:(.+)/;

function parseStringStyle(cssText) {
  var ret = {};
  cssText.split(listDelimiterRE).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}

function normalizeClass(value) {
  var res = '';

  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      res += normalizeClass(value[i]) + ' ';
    }
  } else if (isObject(value)) {
    for (var name in value) {
      if (value[name]) {
        res += name + ' ';
      }
    }
  }

  return res.trim();
} // These tag configs are shared between compiler-dom and runtime-dom, so they
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element


var HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' + 'header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,' + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' + 'data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,' + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' + 'option,output,progress,select,textarea,details,dialog,menu,menuitem,' + 'summary,content,element,shadow,template,blockquote,iframe,tfoot'; // https://developer.mozilla.org/en-US/docs/Web/SVG/Element

var SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' + 'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' + 'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' + 'feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' + 'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' + 'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' + 'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' + 'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' + 'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' + 'text,textPath,title,tspan,unknown,use,view';
var VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';
var isHTMLTag = /*#__PURE__*/makeMap(HTML_TAGS);
var isSVGTag = /*#__PURE__*/makeMap(SVG_TAGS);
var isVoidTag = /*#__PURE__*/makeMap(VOID_TAGS);

function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a);
      var isArrayB = isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

function looseIndexOf(arr, val) {
  return arr.findIndex(function (item) {
    return looseEqual(item, val);
  });
} // For converting {{ interpolation }} values to displayed strings.


var toDisplayString = function toDisplayString(val) {
  return val == null ? '' : isObject(val) ? JSON.stringify(val, replacer, 2) : String(val);
};

var replacer = function replacer(_key, val) {
  if (val instanceof Map) {
    return _defineProperty({}, "Map(".concat(val.size, ")"), _toConsumableArray(val.entries()).reduce(function (entries, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          val = _ref2[1];

      entries["".concat(key, " =>")] = val;
      return entries;
    }, {}));
  } else if (val instanceof Set) {
    return _defineProperty({}, "Set(".concat(val.size, ")"), _toConsumableArray(val.values()));
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }

  return val;
};

var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = [];

var NOOP = function NOOP() {};
/**
 * Always return false.
 */


var NO = function NO() {
  return false;
};

var onRE = /^on[^a-z]/;

var isOn = function isOn(key) {
  return onRE.test(key);
};

var extend = Object.assign;

var remove = function remove(arr, el) {
  var i = arr.indexOf(el);

  if (i > -1) {
    arr.splice(i, 1);
  }
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};

var isArray = Array.isArray;

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var isSymbol = function isSymbol(val) {
  return _typeof(val) === 'symbol';
};

var isObject = function isObject(val) {
  return val !== null && _typeof(val) === 'object';
};

var isPromise = function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

var objectToString = Object.prototype.toString;

var toTypeString = function toTypeString(value) {
  return objectToString.call(value);
};

var toRawType = function toRawType(value) {
  return toTypeString(value).slice(8, -1);
};

var isPlainObject = function isPlainObject(val) {
  return toTypeString(val) === '[object Object]';
};

var isReservedProp = /*#__PURE__*/makeMap('key,ref,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');

var cacheStringFunction = function cacheStringFunction(fn) {
  var cache = Object.create(null);
  return function (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};

var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
var capitalize = cacheStringFunction(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}); // compare whether a value has changed, accounting for NaN.

var hasChanged = function hasChanged(value, oldValue) {
  return value !== oldValue && (value === value || oldValue === oldValue);
};

var invokeArrayFns = function invokeArrayFns(fns, arg) {
  for (var i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};

var def = function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value: value
  });
};

var toNumber = function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
};

function defaultOnError(error) {
  throw error;
}

function createCompilerError(code, loc, messages, additionalMessage) {
  var msg = (messages || errorMessages)[code] + (additionalMessage || "");
  var error = new SyntaxError(String(msg));
  error.code = code;
  error.loc = loc;
  return error;
}

var errorMessages = (_errorMessages = {}, _defineProperty(_errorMessages, 0
/* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
, 'Illegal comment.'), _defineProperty(_errorMessages, 1
/* CDATA_IN_HTML_CONTENT */
, 'CDATA section is allowed only in XML context.'), _defineProperty(_errorMessages, 2
/* DUPLICATE_ATTRIBUTE */
, 'Duplicate attribute.'), _defineProperty(_errorMessages, 3
/* END_TAG_WITH_ATTRIBUTES */
, 'End tag cannot have attributes.'), _defineProperty(_errorMessages, 4
/* END_TAG_WITH_TRAILING_SOLIDUS */
, "Illegal '/' in tags."), _defineProperty(_errorMessages, 5
/* EOF_BEFORE_TAG_NAME */
, 'Unexpected EOF in tag.'), _defineProperty(_errorMessages, 6
/* EOF_IN_CDATA */
, 'Unexpected EOF in CDATA section.'), _defineProperty(_errorMessages, 7
/* EOF_IN_COMMENT */
, 'Unexpected EOF in comment.'), _defineProperty(_errorMessages, 8
/* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
, 'Unexpected EOF in script.'), _defineProperty(_errorMessages, 9
/* EOF_IN_TAG */
, 'Unexpected EOF in tag.'), _defineProperty(_errorMessages, 10
/* INCORRECTLY_CLOSED_COMMENT */
, 'Incorrectly closed comment.'), _defineProperty(_errorMessages, 11
/* INCORRECTLY_OPENED_COMMENT */
, 'Incorrectly opened comment.'), _defineProperty(_errorMessages, 12
/* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
, "Illegal tag name. Use '&lt;' to print '<'."), _defineProperty(_errorMessages, 13
/* MISSING_ATTRIBUTE_VALUE */
, 'Attribute value was expected.'), _defineProperty(_errorMessages, 14
/* MISSING_END_TAG_NAME */
, 'End tag name was expected.'), _defineProperty(_errorMessages, 15
/* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
, 'Whitespace was expected.'), _defineProperty(_errorMessages, 16
/* NESTED_COMMENT */
, "Unexpected '<!--' in comment."), _defineProperty(_errorMessages, 17
/* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
, 'Attribute name cannot contain U+0022 ("), U+0027 (\'), and U+003C (<).'), _defineProperty(_errorMessages, 18
/* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
, 'Unquoted attribute value cannot contain U+0022 ("), U+0027 (\'), U+003C (<), U+003D (=), and U+0060 (`).'), _defineProperty(_errorMessages, 19
/* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
, "Attribute name cannot start with '='."), _defineProperty(_errorMessages, 21
/* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
, "'<?' is allowed only in XML context."), _defineProperty(_errorMessages, 22
/* UNEXPECTED_SOLIDUS_IN_TAG */
, "Illegal '/' in tags."), _defineProperty(_errorMessages, 23
/* X_INVALID_END_TAG */
, 'Invalid end tag.'), _defineProperty(_errorMessages, 24
/* X_MISSING_END_TAG */
, 'Element is missing end tag.'), _defineProperty(_errorMessages, 25
/* X_MISSING_INTERPOLATION_END */
, 'Interpolation end sign was not found.'), _defineProperty(_errorMessages, 26
/* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
, 'End bracket for dynamic directive argument was not found. ' + 'Note that dynamic directive argument cannot contain spaces.'), _defineProperty(_errorMessages, 27
/* X_V_IF_NO_EXPRESSION */
, "v-if/v-else-if is missing expression."), _defineProperty(_errorMessages, 28
/* X_V_ELSE_NO_ADJACENT_IF */
, "v-else/v-else-if has no adjacent v-if."), _defineProperty(_errorMessages, 29
/* X_V_FOR_NO_EXPRESSION */
, "v-for is missing expression."), _defineProperty(_errorMessages, 30
/* X_V_FOR_MALFORMED_EXPRESSION */
, "v-for has invalid expression."), _defineProperty(_errorMessages, 31
/* X_V_BIND_NO_EXPRESSION */
, "v-bind is missing expression."), _defineProperty(_errorMessages, 32
/* X_V_ON_NO_EXPRESSION */
, "v-on is missing expression."), _defineProperty(_errorMessages, 33
/* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
, "Unexpected custom directive on <slot> outlet."), _defineProperty(_errorMessages, 34
/* X_V_SLOT_MIXED_SLOT_USAGE */
, "Mixed v-slot usage on both the component and nested <template>." + "When there are multiple named slots, all slots should use <template> " + "syntax to avoid scope ambiguity."), _defineProperty(_errorMessages, 35
/* X_V_SLOT_DUPLICATE_SLOT_NAMES */
, "Duplicate slot names found. "), _defineProperty(_errorMessages, 36
/* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
, "Extraneous children found when component already has explicitly named " + "default slot. These children will be ignored."), _defineProperty(_errorMessages, 37
/* X_V_SLOT_MISPLACED */
, "v-slot can only be used on components or <template> tags."), _defineProperty(_errorMessages, 38
/* X_V_MODEL_NO_EXPRESSION */
, "v-model is missing expression."), _defineProperty(_errorMessages, 39
/* X_V_MODEL_MALFORMED_EXPRESSION */
, "v-model value must be a valid JavaScript member expression."), _defineProperty(_errorMessages, 40
/* X_V_MODEL_ON_SCOPE_VARIABLE */
, "v-model cannot be used on v-for or v-slot scope variables because they are not writable."), _defineProperty(_errorMessages, 41
/* X_INVALID_EXPRESSION */
, "Error parsing JavaScript expression: "), _defineProperty(_errorMessages, 42
/* X_KEEP_ALIVE_INVALID_CHILDREN */
, "<KeepAlive> expects exactly one child component."), _defineProperty(_errorMessages, 43
/* X_PREFIX_ID_NOT_SUPPORTED */
, "\"prefixIdentifiers\" option is not supported in this build of compiler."), _defineProperty(_errorMessages, 44
/* X_MODULE_MODE_NOT_SUPPORTED */
, "ES module mode is not supported in this build of compiler."), _defineProperty(_errorMessages, 45
/* X_CACHE_HANDLER_NOT_SUPPORTED */
, "\"cacheHandlers\" option is only supported when the \"prefixIdentifiers\" option is enabled."), _defineProperty(_errorMessages, 46
/* X_SCOPE_ID_NOT_SUPPORTED */
, "\"scopeId\" option is only supported in module mode."), _errorMessages);
var FRAGMENT = Symbol("Fragment");
var TELEPORT = Symbol("Teleport");
var SUSPENSE = Symbol("Suspense");
var KEEP_ALIVE = Symbol("KeepAlive");
var BASE_TRANSITION = Symbol("BaseTransition");
var OPEN_BLOCK = Symbol("openBlock");
var CREATE_BLOCK = Symbol("createBlock");
var CREATE_VNODE = Symbol("createVNode");
var CREATE_COMMENT = Symbol("createCommentVNode");
var CREATE_TEXT = Symbol("createTextVNode");
var CREATE_STATIC = Symbol("createStaticVNode");
var RESOLVE_COMPONENT = Symbol("resolveComponent");
var RESOLVE_DYNAMIC_COMPONENT = Symbol("resolveDynamicComponent");
var RESOLVE_DIRECTIVE = Symbol("resolveDirective");
var WITH_DIRECTIVES = Symbol("withDirectives");
var RENDER_LIST = Symbol("renderList");
var RENDER_SLOT = Symbol("renderSlot");
var CREATE_SLOTS = Symbol("createSlots");
var TO_DISPLAY_STRING = Symbol("toDisplayString");
var MERGE_PROPS = Symbol("mergeProps");
var TO_HANDLERS = Symbol("toHandlers");
var CAMELIZE = Symbol("camelize");
var SET_BLOCK_TRACKING = Symbol("setBlockTracking");
var PUSH_SCOPE_ID = Symbol("pushScopeId");
var POP_SCOPE_ID = Symbol("popScopeId");
var WITH_SCOPE_ID = Symbol("withScopeId");
var WITH_CTX = Symbol("withCtx"); // Name mapping for runtime helpers that need to be imported from 'vue' in
// generated code. Make sure these are correctly exported in the runtime!
// Using `any` here because TS doesn't allow symbols as index type.

var helperNameMap = (_helperNameMap = {}, _defineProperty(_helperNameMap, FRAGMENT, "Fragment"), _defineProperty(_helperNameMap, TELEPORT, "Teleport"), _defineProperty(_helperNameMap, SUSPENSE, "Suspense"), _defineProperty(_helperNameMap, KEEP_ALIVE, "KeepAlive"), _defineProperty(_helperNameMap, BASE_TRANSITION, "BaseTransition"), _defineProperty(_helperNameMap, OPEN_BLOCK, "openBlock"), _defineProperty(_helperNameMap, CREATE_BLOCK, "createBlock"), _defineProperty(_helperNameMap, CREATE_VNODE, "createVNode"), _defineProperty(_helperNameMap, CREATE_COMMENT, "createCommentVNode"), _defineProperty(_helperNameMap, CREATE_TEXT, "createTextVNode"), _defineProperty(_helperNameMap, CREATE_STATIC, "createStaticVNode"), _defineProperty(_helperNameMap, RESOLVE_COMPONENT, "resolveComponent"), _defineProperty(_helperNameMap, RESOLVE_DYNAMIC_COMPONENT, "resolveDynamicComponent"), _defineProperty(_helperNameMap, RESOLVE_DIRECTIVE, "resolveDirective"), _defineProperty(_helperNameMap, WITH_DIRECTIVES, "withDirectives"), _defineProperty(_helperNameMap, RENDER_LIST, "renderList"), _defineProperty(_helperNameMap, RENDER_SLOT, "renderSlot"), _defineProperty(_helperNameMap, CREATE_SLOTS, "createSlots"), _defineProperty(_helperNameMap, TO_DISPLAY_STRING, "toDisplayString"), _defineProperty(_helperNameMap, MERGE_PROPS, "mergeProps"), _defineProperty(_helperNameMap, TO_HANDLERS, "toHandlers"), _defineProperty(_helperNameMap, CAMELIZE, "camelize"), _defineProperty(_helperNameMap, SET_BLOCK_TRACKING, "setBlockTracking"), _defineProperty(_helperNameMap, PUSH_SCOPE_ID, "pushScopeId"), _defineProperty(_helperNameMap, POP_SCOPE_ID, "popScopeId"), _defineProperty(_helperNameMap, WITH_SCOPE_ID, "withScopeId"), _defineProperty(_helperNameMap, WITH_CTX, "withCtx"), _helperNameMap);

function registerRuntimeHelpers(helpers) {
  Object.getOwnPropertySymbols(helpers).forEach(function (s) {
    helperNameMap[s] = helpers[s];
  });
} // AST Utilities ---------------------------------------------------------------
// Some expressions, e.g. sequence and conditional expressions, are never
// associated with template nodes, so their source locations are just a stub.
// Container types like CompoundExpression also don't need a real location.


var locStub = {
  source: '',
  start: {
    line: 1,
    column: 1,
    offset: 0
  },
  end: {
    line: 1,
    column: 1,
    offset: 0
  }
};

function createRoot(children) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 0
    /* ROOT */
    ,
    children: children,
    helpers: [],
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: 0,
    temps: 0,
    codegenNode: undefined,
    loc: loc
  };
}

function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives) {
  var isBlock = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var disableTracking = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var loc = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : locStub;

  if (context) {
    if (isBlock) {
      context.helper(OPEN_BLOCK);
      context.helper(CREATE_BLOCK);
    } else {
      context.helper(CREATE_VNODE);
    }

    if (directives) {
      context.helper(WITH_DIRECTIVES);
    }
  }

  return {
    type: 13
    /* VNODE_CALL */
    ,
    tag: tag,
    props: props,
    children: children,
    patchFlag: patchFlag,
    dynamicProps: dynamicProps,
    directives: directives,
    isBlock: isBlock,
    disableTracking: disableTracking,
    loc: loc
  };
}

function createArrayExpression(elements) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 17
    /* JS_ARRAY_EXPRESSION */
    ,
    loc: loc,
    elements: elements
  };
}

function createObjectExpression(properties) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 15
    /* JS_OBJECT_EXPRESSION */
    ,
    loc: loc,
    properties: properties
  };
}

function createObjectProperty(key, value) {
  return {
    type: 16
    /* JS_PROPERTY */
    ,
    loc: locStub,
    key: isString(key) ? createSimpleExpression(key, true) : key,
    value: value
  };
}

function createSimpleExpression(content, isStatic) {
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locStub;
  var isConstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return {
    type: 4
    /* SIMPLE_EXPRESSION */
    ,
    loc: loc,
    isConstant: isConstant,
    content: content,
    isStatic: isStatic
  };
}

function createCompoundExpression(children) {
  var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : locStub;
  return {
    type: 8
    /* COMPOUND_EXPRESSION */
    ,
    loc: loc,
    children: children
  };
}

function createCallExpression(callee) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var loc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locStub;
  return {
    type: 14
    /* JS_CALL_EXPRESSION */
    ,
    loc: loc,
    callee: callee,
    arguments: args
  };
}

function createFunctionExpression(params) {
  var returns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var newline = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSlot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var loc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : locStub;
  return {
    type: 18
    /* JS_FUNCTION_EXPRESSION */
    ,
    params: params,
    returns: returns,
    newline: newline,
    isSlot: isSlot,
    loc: loc
  };
}

function createConditionalExpression(test, consequent, alternate) {
  var newline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return {
    type: 19
    /* JS_CONDITIONAL_EXPRESSION */
    ,
    test: test,
    consequent: consequent,
    alternate: alternate,
    newline: newline,
    loc: locStub
  };
}

function createCacheExpression(index, value) {
  var isVNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    type: 20
    /* JS_CACHE_EXPRESSION */
    ,
    index: index,
    value: value,
    isVNode: isVNode,
    loc: locStub
  };
}

var isBuiltInType = function isBuiltInType(tag, expected) {
  return tag === expected || tag === hyphenate(expected);
};

function isCoreComponent(tag) {
  if (isBuiltInType(tag, 'Teleport')) {
    return TELEPORT;
  } else if (isBuiltInType(tag, 'Suspense')) {
    return SUSPENSE;
  } else if (isBuiltInType(tag, 'KeepAlive')) {
    return KEEP_ALIVE;
  } else if (isBuiltInType(tag, 'BaseTransition')) {
    return BASE_TRANSITION;
  }
}

var nonIdentifierRE = /^\d|[^\$\w]/;

var isSimpleIdentifier = function isSimpleIdentifier(name) {
  return !nonIdentifierRE.test(name);
};

var memberExpRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\[[^\]]+\])*$/;

var isMemberExpression = function isMemberExpression(path) {
  if (!path) return false;
  return memberExpRE.test(path.trim());
};

function getInnerRange(loc, offset, length) {
  var source = loc.source.substr(offset, length);
  var newLoc = {
    source: source,
    start: advancePositionWithClone(loc.start, loc.source, offset),
    end: loc.end
  };

  if (length != null) {
    newLoc.end = advancePositionWithClone(loc.start, loc.source, offset + length);
  }

  return newLoc;
}

function advancePositionWithClone(pos, source) {
  var numberOfCharacters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  return advancePositionWithMutation(extend({}, pos), source, numberOfCharacters);
} // advance by mutation without cloning (for performance reasons), since this
// gets called a lot in the parser


function advancePositionWithMutation(pos, source) {
  var numberOfCharacters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : source.length;
  var linesCount = 0;
  var lastNewLinePos = -1;

  for (var i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10
    /* newline char code */
    ) {
        linesCount++;
        lastNewLinePos = i;
      }
  }

  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}

function assert(condition, msg) {
  /* istanbul ignore if */
  if (!condition) {
    throw new Error(msg || "unexpected compiler condition");
  }
}

function findDir(node, name) {
  var allowEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  for (var i = 0; i < node.props.length; i++) {
    var _p = node.props[i];

    if (_p.type === 7
    /* DIRECTIVE */
    && (allowEmpty || _p.exp) && (isString(name) ? _p.name === name : name.test(_p.name))) {
      return _p;
    }
  }
}

function findProp(node, name) {
  var dynamicOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var allowEmpty = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  for (var i = 0; i < node.props.length; i++) {
    var _p2 = node.props[i];

    if (_p2.type === 6
    /* ATTRIBUTE */
    ) {
        if (dynamicOnly) continue;

        if (_p2.name === name && (_p2.value || allowEmpty)) {
          return _p2;
        }
      } else if (_p2.name === 'bind' && _p2.exp && isBindKey(_p2.arg, name)) {
      return _p2;
    }
  }
}

function isBindKey(arg, name) {
  return !!(arg && arg.type === 4
  /* SIMPLE_EXPRESSION */
  && arg.isStatic && arg.content === name);
}

function hasDynamicKeyVBind(node) {
  return node.props.some(function (p) {
    return p.type === 7
    /* DIRECTIVE */
    && p.name === 'bind' && (!p.arg || // v-bind="obj"
    p.arg.type !== 4
    /* SIMPLE_EXPRESSION */
    || // v-bind:[_ctx.foo]
    !p.arg.isStatic);
  } // v-bind:[foo]
  );
}

function isText(node) {
  return node.type === 5
  /* INTERPOLATION */
  || node.type === 2
  /* TEXT */
  ;
}

function isVSlot(p) {
  return p.type === 7
  /* DIRECTIVE */
  && p.name === 'slot';
}

function isTemplateNode(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 3
  /* TEMPLATE */
  ;
}

function isSlotOutlet(node) {
  return node.type === 1
  /* ELEMENT */
  && node.tagType === 2
  /* SLOT */
  ;
}

function injectProp(node, prop, context) {
  var propsWithInjection;
  var props = node.type === 13
  /* VNODE_CALL */
  ? node.props : node.arguments[2];

  if (props == null || isString(props)) {
    propsWithInjection = createObjectExpression([prop]);
  } else if (props.type === 14
  /* JS_CALL_EXPRESSION */
  ) {
      // merged props... add ours
      // only inject key to object literal if it's the first argument so that
      // if doesn't override user provided keys
      var first = props.arguments[0];

      if (!isString(first) && first.type === 15
      /* JS_OBJECT_EXPRESSION */
      ) {
          first.properties.unshift(prop);
        } else {
        props.arguments.unshift(createObjectExpression([prop]));
      }

      propsWithInjection = props;
    } else if (props.type === 15
  /* JS_OBJECT_EXPRESSION */
  ) {
      var alreadyExists = false; // check existing key to avoid overriding user provided keys

      if (prop.key.type === 4
      /* SIMPLE_EXPRESSION */
      ) {
          var propKeyName = prop.key.content;
          alreadyExists = props.properties.some(function (p) {
            return p.key.type === 4
            /* SIMPLE_EXPRESSION */
            && p.key.content === propKeyName;
          });
        }

      if (!alreadyExists) {
        props.properties.unshift(prop);
      }

      propsWithInjection = props;
    } else {
    // single v-bind with expression, return a merged replacement
    propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [createObjectExpression([prop]), props]);
  }

  if (node.type === 13
  /* VNODE_CALL */
  ) {
      node.props = propsWithInjection;
    } else {
    node.arguments[2] = propsWithInjection;
  }
}

function toValidAssetId(name, type) {
  return "_".concat(type, "_").concat(name.replace(/[^\w]/g, '_'));
} // The default decoder only provides escapes for characters reserved as part of
// the template syntax, and is only used if the custom renderer did not provide
// a platform-specific decoder.


var decodeRE = /&(gt|lt|amp|apos|quot);/g;
var decodeMap = {
  gt: '>',
  lt: '<',
  amp: '&',
  apos: "'",
  quot: '"'
};
var defaultParserOptions = {
  delimiters: ["{{", "}}"],
  getNamespace: function getNamespace() {
    return 0;
  }
  /* HTML */
  ,
  getTextMode: function getTextMode() {
    return 0;
  }
  /* DATA */
  ,
  isVoidTag: NO,
  isPreTag: NO,
  isCustomElement: NO,
  decodeEntities: function decodeEntities(rawText) {
    return rawText.replace(decodeRE, function (_, p1) {
      return decodeMap[p1];
    });
  },
  onError: defaultOnError
};

function baseParse(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = createParserContext(content, options);
  var start = getCursor(context);
  return createRoot(parseChildren(context, 0
  /* DATA */
  , []), getSelection(context, start));
}

function createParserContext(content, options) {
  return {
    options: extend({}, defaultParserOptions, options),
    column: 1,
    line: 1,
    offset: 0,
    originalSource: content,
    source: content,
    inPre: false,
    inVPre: false
  };
}

function parseChildren(context, mode, ancestors) {
  var parent = last(ancestors);
  var ns = parent ? parent.ns : 0
  /* HTML */
  ;
  var nodes = [];

  while (!isEnd(context, mode, ancestors)) {
    var s = context.source;
    var node = undefined;

    if (mode === 0
    /* DATA */
    || mode === 1
    /* RCDATA */
    ) {
        if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
          // '{{'
          node = parseInterpolation(context, mode);
        } else if (mode === 0
        /* DATA */
        && s[0] === '<') {
          // https://html.spec.whatwg.org/multipage/parsing.html#tag-open-state
          if (s.length === 1) {
            emitError(context, 5
            /* EOF_BEFORE_TAG_NAME */
            , 1);
          } else if (s[1] === '!') {
            // https://html.spec.whatwg.org/multipage/parsing.html#markup-declaration-open-state
            if (startsWith(s, '<!--')) {
              node = parseComment(context);
            } else if (startsWith(s, '<!DOCTYPE')) {
              // Ignore DOCTYPE by a limitation.
              node = parseBogusComment(context);
            } else if (startsWith(s, '<![CDATA[')) {
              if (ns !== 0
              /* HTML */
              ) {
                  node = parseCDATA(context, ancestors);
                } else {
                emitError(context, 1
                /* CDATA_IN_HTML_CONTENT */
                );
                node = parseBogusComment(context);
              }
            } else {
              emitError(context, 11
              /* INCORRECTLY_OPENED_COMMENT */
              );
              node = parseBogusComment(context);
            }
          } else if (s[1] === '/') {
            // https://html.spec.whatwg.org/multipage/parsing.html#end-tag-open-state
            if (s.length === 2) {
              emitError(context, 5
              /* EOF_BEFORE_TAG_NAME */
              , 2);
            } else if (s[2] === '>') {
              emitError(context, 14
              /* MISSING_END_TAG_NAME */
              , 2);
              advanceBy(context, 3);
              continue;
            } else if (/[a-z]/i.test(s[2])) {
              emitError(context, 23
              /* X_INVALID_END_TAG */
              );
              parseTag(context, 1
              /* End */
              , parent);
              continue;
            } else {
              emitError(context, 12
              /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
              , 2);
              node = parseBogusComment(context);
            }
          } else if (/[a-z]/i.test(s[1])) {
            node = parseElement(context, ancestors);
          } else if (s[1] === '?') {
            emitError(context, 21
            /* UNEXPECTED_QUESTION_MARK_INSTEAD_OF_TAG_NAME */
            , 1);
            node = parseBogusComment(context);
          } else {
            emitError(context, 12
            /* INVALID_FIRST_CHARACTER_OF_TAG_NAME */
            , 1);
          }
        }
      }

    if (!node) {
      node = parseText(context, mode);
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        pushNode(nodes, node[i]);
      }
    } else {
      pushNode(nodes, node);
    }
  } // Whitespace management for more efficient output
  // (same as v2 whitespace: 'condense')


  var removedWhitespace = false;

  if (mode !== 2
  /* RAWTEXT */
  ) {
      if (!context.inPre) {
        for (var _i2 = 0; _i2 < nodes.length; _i2++) {
          var _node = nodes[_i2];

          if (_node.type === 2
          /* TEXT */
          ) {
              if (!/[^\t\r\n\f ]/.test(_node.content)) {
                var prev = nodes[_i2 - 1];
                var next = nodes[_i2 + 1]; // If:
                // - the whitespace is the first or last node, or:
                // - the whitespace is adjacent to a comment, or:
                // - the whitespace is between two elements AND contains newline
                // Then the whitespace is ignored.

                if (!prev || !next || prev.type === 3
                /* COMMENT */
                || next.type === 3
                /* COMMENT */
                || prev.type === 1
                /* ELEMENT */
                && next.type === 1
                /* ELEMENT */
                && /[\r\n]/.test(_node.content)) {
                  removedWhitespace = true;
                  nodes[_i2] = null;
                } else {
                  // Otherwise, condensed consecutive whitespace inside the text
                  // down to a single space
                  _node.content = ' ';
                }
              } else {
                _node.content = _node.content.replace(/[\t\r\n\f ]+/g, ' ');
              }
            }
        }
      } else if (parent && context.options.isPreTag(parent.tag)) {
        // remove leading newline per html spec
        // https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element
        var first = nodes[0];

        if (first && first.type === 2
        /* TEXT */
        ) {
            first.content = first.content.replace(/^\r?\n/, '');
          }
      }
    }

  return removedWhitespace ? nodes.filter(Boolean) : nodes;
}

function pushNode(nodes, node) {
  if (node.type === 2
  /* TEXT */
  ) {
      var prev = last(nodes); // Merge if both this and the previous node are text and those are
      // consecutive. This happens for cases like "a < b".

      if (prev && prev.type === 2
      /* TEXT */
      && prev.loc.end.offset === node.loc.start.offset) {
        prev.content += node.content;
        prev.loc.end = node.loc.end;
        prev.loc.source += node.loc.source;
        return;
      }
    }

  nodes.push(node);
}

function parseCDATA(context, ancestors) {
  advanceBy(context, 9);
  var nodes = parseChildren(context, 3
  /* CDATA */
  , ancestors);

  if (context.source.length === 0) {
    emitError(context, 6
    /* EOF_IN_CDATA */
    );
  } else {
    advanceBy(context, 3);
  }

  return nodes;
}

function parseComment(context) {
  var start = getCursor(context);
  var content; // Regular comment.

  var match = /--(\!)?>/.exec(context.source);

  if (!match) {
    content = context.source.slice(4);
    advanceBy(context, context.source.length);
    emitError(context, 7
    /* EOF_IN_COMMENT */
    );
  } else {
    if (match.index <= 3) {
      emitError(context, 0
      /* ABRUPT_CLOSING_OF_EMPTY_COMMENT */
      );
    }

    if (match[1]) {
      emitError(context, 10
      /* INCORRECTLY_CLOSED_COMMENT */
      );
    }

    content = context.source.slice(4, match.index); // Advancing with reporting nested comments.

    var s = context.source.slice(0, match.index);
    var prevIndex = 1,
        nestedIndex = 0;

    while ((nestedIndex = s.indexOf('<!--', prevIndex)) !== -1) {
      advanceBy(context, nestedIndex - prevIndex + 1);

      if (nestedIndex + 4 < s.length) {
        emitError(context, 16
        /* NESTED_COMMENT */
        );
      }

      prevIndex = nestedIndex + 1;
    }

    advanceBy(context, match.index + match[0].length - prevIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}

function parseBogusComment(context) {
  var start = getCursor(context);
  var contentStart = context.source[1] === '?' ? 1 : 2;
  var content;
  var closeIndex = context.source.indexOf('>');

  if (closeIndex === -1) {
    content = context.source.slice(contentStart);
    advanceBy(context, context.source.length);
  } else {
    content = context.source.slice(contentStart, closeIndex);
    advanceBy(context, closeIndex + 1);
  }

  return {
    type: 3
    /* COMMENT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}

function parseElement(context, ancestors) {
  // Start tag.
  var wasInPre = context.inPre;
  var wasInVPre = context.inVPre;
  var parent = last(ancestors);
  var element = parseTag(context, 0
  /* Start */
  , parent);
  var isPreBoundary = context.inPre && !wasInPre;
  var isVPreBoundary = context.inVPre && !wasInVPre;

  if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
    return element;
  } // Children.


  ancestors.push(element);
  var mode = context.options.getTextMode(element, parent);
  var children = parseChildren(context, mode, ancestors);
  ancestors.pop();
  element.children = children; // End tag.

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, 1
    /* End */
    , parent);
  } else {
    emitError(context, 24
    /* X_MISSING_END_TAG */
    , 0, element.loc.start);

    if (context.source.length === 0 && element.tag.toLowerCase() === 'script') {
      var first = children[0];

      if (first && startsWith(first.loc.source, '<!--')) {
        emitError(context, 8
        /* EOF_IN_SCRIPT_HTML_COMMENT_LIKE_TEXT */
        );
      }
    }
  }

  element.loc = getSelection(context, element.loc.start);

  if (isPreBoundary) {
    context.inPre = false;
  }

  if (isVPreBoundary) {
    context.inVPre = false;
  }

  return element;
}

var isSpecialTemplateDirective = /*#__PURE__*/makeMap("if,else,else-if,for,slot");
/**
 * Parse a tag (E.g. `<div id=a>`) with that type (start tag or end tag).
 */

function parseTag(context, type, parent) {
  // Tag open.
  var start = getCursor(context);
  var match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
  var tag = match[1];
  var ns = context.options.getNamespace(tag, parent);
  advanceBy(context, match[0].length);
  advanceSpaces(context); // save current state in case we need to re-parse attributes with v-pre

  var cursor = getCursor(context);
  var currentSource = context.source; // Attributes.

  var props = parseAttributes(context, type); // check <pre> tag

  if (context.options.isPreTag(tag)) {
    context.inPre = true;
  } // check v-pre


  if (!context.inVPre && props.some(function (p) {
    return p.type === 7
    /* DIRECTIVE */
    && p.name === 'pre';
  })) {
    context.inVPre = true; // reset context

    extend(context, cursor);
    context.source = currentSource; // re-parse attrs and filter out v-pre itself

    props = parseAttributes(context, type).filter(function (p) {
      return p.name !== 'v-pre';
    });
  } // Tag close.


  var isSelfClosing = false;

  if (context.source.length === 0) {
    emitError(context, 9
    /* EOF_IN_TAG */
    );
  } else {
    isSelfClosing = startsWith(context.source, '/>');

    if (type === 1
    /* End */
    && isSelfClosing) {
      emitError(context, 4
      /* END_TAG_WITH_TRAILING_SOLIDUS */
      );
    }

    advanceBy(context, isSelfClosing ? 2 : 1);
  }

  var tagType = 0
  /* ELEMENT */
  ;
  var options = context.options;

  if (!context.inVPre && !options.isCustomElement(tag)) {
    var hasVIs = props.some(function (p) {
      return p.type === 7
      /* DIRECTIVE */
      && p.name === 'is';
    });

    if (options.isNativeTag && !hasVIs) {
      if (!options.isNativeTag(tag)) tagType = 1
      /* COMPONENT */
      ;
    } else if (hasVIs || isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || /^[A-Z]/.test(tag) || tag === 'component') {
      tagType = 1
      /* COMPONENT */
      ;
    }

    if (tag === 'slot') {
      tagType = 2
      /* SLOT */
      ;
    } else if (tag === 'template' && props.some(function (p) {
      return p.type === 7
      /* DIRECTIVE */
      && isSpecialTemplateDirective(p.name);
    })) {
      tagType = 3
      /* TEMPLATE */
      ;
    }
  }

  return {
    type: 1
    /* ELEMENT */
    ,
    ns: ns,
    tag: tag,
    tagType: tagType,
    props: props,
    isSelfClosing: isSelfClosing,
    children: [],
    loc: getSelection(context, start),
    codegenNode: undefined // to be created during transform phase

  };
}

function parseAttributes(context, type) {
  var props = [];
  var attributeNames = new Set();

  while (context.source.length > 0 && !startsWith(context.source, '>') && !startsWith(context.source, '/>')) {
    if (startsWith(context.source, '/')) {
      emitError(context, 22
      /* UNEXPECTED_SOLIDUS_IN_TAG */
      );
      advanceBy(context, 1);
      advanceSpaces(context);
      continue;
    }

    if (type === 1
    /* End */
    ) {
        emitError(context, 3
        /* END_TAG_WITH_ATTRIBUTES */
        );
      }

    var attr = parseAttribute(context, attributeNames);

    if (type === 0
    /* Start */
    ) {
        props.push(attr);
      }

    if (/^[^\t\r\n\f />]/.test(context.source)) {
      emitError(context, 15
      /* MISSING_WHITESPACE_BETWEEN_ATTRIBUTES */
      );
    }

    advanceSpaces(context);
  }

  return props;
}

function parseAttribute(context, nameSet) {
  // Name.
  var start = getCursor(context);
  var match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
  var name = match[0];

  if (nameSet.has(name)) {
    emitError(context, 2
    /* DUPLICATE_ATTRIBUTE */
    );
  }

  nameSet.add(name);

  if (name[0] === '=') {
    emitError(context, 19
    /* UNEXPECTED_EQUALS_SIGN_BEFORE_ATTRIBUTE_NAME */
    );
  }

  {
    var pattern = /["'<]/g;
    var m;

    while (m = pattern.exec(name)) {
      emitError(context, 17
      /* UNEXPECTED_CHARACTER_IN_ATTRIBUTE_NAME */
      , m.index);
    }
  }
  advanceBy(context, name.length); // Value

  var value = undefined;

  if (/^[\t\r\n\f ]*=/.test(context.source)) {
    advanceSpaces(context);
    advanceBy(context, 1);
    advanceSpaces(context);
    value = parseAttributeValue(context);

    if (!value) {
      emitError(context, 13
      /* MISSING_ATTRIBUTE_VALUE */
      );
    }
  }

  var loc = getSelection(context, start);

  if (!context.inVPre && /^(v-|:|@|#)/.test(name)) {
    var _match = /(?:^v-([a-z0-9-]+))?(?:(?::|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(name);

    var dirName = _match[1] || (startsWith(name, ':') ? 'bind' : startsWith(name, '@') ? 'on' : 'slot');
    var arg;

    if (_match[2]) {
      var isSlot = dirName === 'slot';
      var startOffset = name.indexOf(_match[2]);

      var _loc = getSelection(context, getNewPosition(context, start, startOffset), getNewPosition(context, start, startOffset + _match[2].length + (isSlot && _match[3] || '').length));

      var content = _match[2];
      var isStatic = true;

      if (content.startsWith('[')) {
        isStatic = false;

        if (!content.endsWith(']')) {
          emitError(context, 26
          /* X_MISSING_DYNAMIC_DIRECTIVE_ARGUMENT_END */
          );
        }

        content = content.substr(1, content.length - 2);
      } else if (isSlot) {
        // #1241 special case for v-slot: vuetify relies extensively on slot
        // names containing dots. v-slot doesn't have any modifiers and Vue 2.x
        // supports such usage so we are keeping it consistent with 2.x.
        content += _match[3] || '';
      }

      arg = {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content: content,
        isStatic: isStatic,
        isConstant: isStatic,
        loc: _loc
      };
    }

    if (value && value.isQuoted) {
      var valueLoc = value.loc;
      valueLoc.start.offset++;
      valueLoc.start.column++;
      valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
      valueLoc.source = valueLoc.source.slice(1, -1);
    }

    return {
      type: 7
      /* DIRECTIVE */
      ,
      name: dirName,
      exp: value && {
        type: 4
        /* SIMPLE_EXPRESSION */
        ,
        content: value.content,
        isStatic: false,
        // Treat as non-constant by default. This can be potentially set to
        // true by `transformExpression` to make it eligible for hoisting.
        isConstant: false,
        loc: value.loc
      },
      arg: arg,
      modifiers: _match[3] ? _match[3].substr(1).split('.') : [],
      loc: loc
    };
  }

  return {
    type: 6
    /* ATTRIBUTE */
    ,
    name: name,
    value: value && {
      type: 2
      /* TEXT */
      ,
      content: value.content,
      loc: value.loc
    },
    loc: loc
  };
}

function parseAttributeValue(context) {
  var start = getCursor(context);
  var content;
  var quote = context.source[0];
  var isQuoted = quote === "\"" || quote === "'";

  if (isQuoted) {
    // Quoted value.
    advanceBy(context, 1);
    var endIndex = context.source.indexOf(quote);

    if (endIndex === -1) {
      content = parseTextData(context, context.source.length, 4
      /* ATTRIBUTE_VALUE */
      );
    } else {
      content = parseTextData(context, endIndex, 4
      /* ATTRIBUTE_VALUE */
      );
      advanceBy(context, 1);
    }
  } else {
    // Unquoted
    var match = /^[^\t\r\n\f >]+/.exec(context.source);

    if (!match) {
      return undefined;
    }

    var unexpectedChars = /["'<=`]/g;
    var m;

    while (m = unexpectedChars.exec(match[0])) {
      emitError(context, 18
      /* UNEXPECTED_CHARACTER_IN_UNQUOTED_ATTRIBUTE_VALUE */
      , m.index);
    }

    content = parseTextData(context, match[0].length, 4
    /* ATTRIBUTE_VALUE */
    );
  }

  return {
    content: content,
    isQuoted: isQuoted,
    loc: getSelection(context, start)
  };
}

function parseInterpolation(context, mode) {
  var _context$options$deli = _slicedToArray(context.options.delimiters, 2),
      open = _context$options$deli[0],
      close = _context$options$deli[1];

  var closeIndex = context.source.indexOf(close, open.length);

  if (closeIndex === -1) {
    emitError(context, 25
    /* X_MISSING_INTERPOLATION_END */
    );
    return undefined;
  }

  var start = getCursor(context);
  advanceBy(context, open.length);
  var innerStart = getCursor(context);
  var innerEnd = getCursor(context);
  var rawContentLength = closeIndex - open.length;
  var rawContent = context.source.slice(0, rawContentLength);
  var preTrimContent = parseTextData(context, rawContentLength, mode);
  var content = preTrimContent.trim();
  var startOffset = preTrimContent.indexOf(content);

  if (startOffset > 0) {
    advancePositionWithMutation(innerStart, rawContent, startOffset);
  }

  var endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
  advancePositionWithMutation(innerEnd, rawContent, endOffset);
  advanceBy(context, close.length);
  return {
    type: 5
    /* INTERPOLATION */
    ,
    content: {
      type: 4
      /* SIMPLE_EXPRESSION */
      ,
      isStatic: false,
      // Set `isConstant` to false by default and will decide in transformExpression
      isConstant: false,
      content: content,
      loc: getSelection(context, innerStart, innerEnd)
    },
    loc: getSelection(context, start)
  };
}

function parseText(context, mode) {
  var endTokens = ['<', context.options.delimiters[0]];

  if (mode === 3
  /* CDATA */
  ) {
      endTokens.push(']]>');
    }

  var endIndex = context.source.length;

  for (var i = 0; i < endTokens.length; i++) {
    var index = context.source.indexOf(endTokens[i], 1);

    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  var start = getCursor(context);
  var content = parseTextData(context, endIndex, mode);
  return {
    type: 2
    /* TEXT */
    ,
    content: content,
    loc: getSelection(context, start)
  };
}
/**
 * Get text data with a given length from the current location.
 * This translates HTML entities in the text data.
 */


function parseTextData(context, length, mode) {
  var rawText = context.source.slice(0, length);
  advanceBy(context, length);

  if (mode === 2
  /* RAWTEXT */
  || mode === 3
  /* CDATA */
  || rawText.indexOf('&') === -1) {
    return rawText;
  } else {
    // DATA or RCDATA containing "&"". Entity decoding required.
    return context.options.decodeEntities(rawText, mode === 4
    /* ATTRIBUTE_VALUE */
    );
  }
}

function getCursor(context) {
  var column = context.column,
      line = context.line,
      offset = context.offset;
  return {
    column: column,
    line: line,
    offset: offset
  };
}

function getSelection(context, start, end) {
  end = end || getCursor(context);
  return {
    start: start,
    end: end,
    source: context.originalSource.slice(start.offset, end.offset)
  };
}

function last(xs) {
  return xs[xs.length - 1];
}

function startsWith(source, searchString) {
  return source.startsWith(searchString);
}

function advanceBy(context, numberOfCharacters) {
  var source = context.source;
  advancePositionWithMutation(context, source, numberOfCharacters);
  context.source = source.slice(numberOfCharacters);
}

function advanceSpaces(context) {
  var match = /^[\t\r\n\f ]+/.exec(context.source);

  if (match) {
    advanceBy(context, match[0].length);
  }
}

function getNewPosition(context, start, numberOfCharacters) {
  return advancePositionWithClone(start, context.originalSource.slice(start.offset, numberOfCharacters), numberOfCharacters);
}

function emitError(context, code, offset) {
  var loc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getCursor(context);

  if (offset) {
    loc.offset += offset;
    loc.column += offset;
  }

  context.options.onError(createCompilerError(code, {
    start: loc,
    end: loc,
    source: ''
  }));
}

function isEnd(context, mode, ancestors) {
  var s = context.source;

  switch (mode) {
    case 0
    /* DATA */
    :
      if (startsWith(s, '</')) {
        //TODO: probably bad performance
        for (var i = ancestors.length - 1; i >= 0; --i) {
          if (startsWithEndTagOpen(s, ancestors[i].tag)) {
            return true;
          }
        }
      }

      break;

    case 1
    /* RCDATA */
    :
    case 2
    /* RAWTEXT */
    :
      {
        var parent = last(ancestors);

        if (parent && startsWithEndTagOpen(s, parent.tag)) {
          return true;
        }

        break;
      }

    case 3
    /* CDATA */
    :
      if (startsWith(s, ']]>')) {
        return true;
      }

      break;
  }

  return !s;
}

function startsWithEndTagOpen(source, tag) {
  return startsWith(source, '</') && source.substr(2, tag.length).toLowerCase() === tag.toLowerCase() && /[\t\n\f />]/.test(source[2 + tag.length] || '>');
}

function hoistStatic(root, context) {
  walk(root, context, new Map(), // Root node is unfortunately non-hoistable due to potential parent
  // fallthrough attributes.
  isSingleElementRoot(root, root.children[0]));
}

function isSingleElementRoot(root, child) {
  var children = root.children;
  return children.length === 1 && child.type === 1
  /* ELEMENT */
  && !isSlotOutlet(child);
}

function walk(node, context, resultCache) {
  var doNotHoistNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var hasHoistedNode = false; // Some transforms, e.g. trasnformAssetUrls from @vue/compiler-sfc, replaces
  // static bindings with expressions. These expressions are guaranteed to be
  // constant so they are still eligible for hoisting, but they are only
  // available at runtime and therefore cannot be evaluated ahead of time.
  // This is only a concern for pre-stringification (via transformHoist by
  // @vue/compiler-dom), but doing it here allows us to perform only one full
  // walk of the AST and allow `stringifyStatic` to stop walking as soon as its
  // stringficiation threshold is met.

  var hasRuntimeConstant = false;
  var children = node.children;

  for (var i = 0; i < children.length; i++) {
    var child = children[i]; // only plain elements & text calls are eligible for hoisting.

    if (child.type === 1
    /* ELEMENT */
    && child.tagType === 0
    /* ELEMENT */
    ) {
        var staticType = void 0;

        if (!doNotHoistNode && (staticType = getStaticType(child, resultCache)) > 0) {
          if (staticType === 2
          /* HAS_RUNTIME_CONSTANT */
          ) {
              hasRuntimeConstant = true;
            }

          child.codegenNode.patchFlag = -1
          /* HOISTED */
          + " /* HOISTED */";
          child.codegenNode = context.hoist(child.codegenNode);
          hasHoistedNode = true;
          continue;
        } else {
          // node may contain dynamic children, but its props may be eligible for
          // hoisting.
          var codegenNode = child.codegenNode;

          if (codegenNode.type === 13
          /* VNODE_CALL */
          ) {
              var flag = getPatchFlag(codegenNode);

              if ((!flag || flag === 512
              /* NEED_PATCH */
              || flag === 1
              /* TEXT */
              ) && !hasDynamicKeyOrRef(child) && !hasCachedProps()) {
                var props = getNodeProps(child);

                if (props) {
                  codegenNode.props = context.hoist(props);
                }
              }
            }
        }
      } else if (child.type === 12
    /* TEXT_CALL */
    ) {
        var _staticType = getStaticType(child.content, resultCache);

        if (_staticType > 0) {
          if (_staticType === 2
          /* HAS_RUNTIME_CONSTANT */
          ) {
              hasRuntimeConstant = true;
            }

          child.codegenNode = context.hoist(child.codegenNode);
          hasHoistedNode = true;
        }
      } // walk further


    if (child.type === 1
    /* ELEMENT */
    ) {
        walk(child, context, resultCache);
      } else if (child.type === 11
    /* FOR */
    ) {
        // Do not hoist v-for single child because it has to be a block
        walk(child, context, resultCache, child.children.length === 1);
      } else if (child.type === 9
    /* IF */
    ) {
        for (var _i3 = 0; _i3 < child.branches.length; _i3++) {
          // Do not hoist v-if single child because it has to be a block
          walk(child.branches[_i3], context, resultCache, child.branches[_i3].children.length === 1);
        }
      }
  }

  if (!hasRuntimeConstant && hasHoistedNode && context.transformHoist) {
    context.transformHoist(children, context, node);
  }
}

function getStaticType(node) {
  var resultCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
      if (node.tagType !== 0
      /* ELEMENT */
      ) {
          return 0
          /* NOT_STATIC */
          ;
        }

      var cached = resultCache.get(node);

      if (cached !== undefined) {
        return cached;
      }

      var codegenNode = node.codegenNode;

      if (codegenNode.type !== 13
      /* VNODE_CALL */
      ) {
          return 0
          /* NOT_STATIC */
          ;
        }

      var flag = getPatchFlag(codegenNode);

      if (!flag && !hasDynamicKeyOrRef(node) && !hasCachedProps()) {
        // element self is static. check its children.
        var _returnType = 1
        /* FULL_STATIC */
        ;

        for (var i = 0; i < node.children.length; i++) {
          var childType = getStaticType(node.children[i], resultCache);

          if (childType === 0
          /* NOT_STATIC */
          ) {
              resultCache.set(node, 0
              /* NOT_STATIC */
              );
              return 0
              /* NOT_STATIC */
              ;
            } else if (childType === 2
          /* HAS_RUNTIME_CONSTANT */
          ) {
              _returnType = 2
              /* HAS_RUNTIME_CONSTANT */
              ;
            }
        } // check if any of the props contain runtime constants


        if (_returnType !== 2
        /* HAS_RUNTIME_CONSTANT */
        ) {
            for (var _i4 = 0; _i4 < node.props.length; _i4++) {
              var _p3 = node.props[_i4];

              if (_p3.type === 7
              /* DIRECTIVE */
              && _p3.name === 'bind' && _p3.exp && (_p3.exp.type === 8
              /* COMPOUND_EXPRESSION */
              || _p3.exp.isRuntimeConstant)) {
                _returnType = 2
                /* HAS_RUNTIME_CONSTANT */
                ;
              }
            }
          } // only svg/foreignObject could be block here, however if they are
        // stati then they don't need to be blocks since there will be no
        // nested updates.


        if (codegenNode.isBlock) {
          codegenNode.isBlock = false;
        }

        resultCache.set(node, _returnType);
        return _returnType;
      } else {
        resultCache.set(node, 0
        /* NOT_STATIC */
        );
        return 0
        /* NOT_STATIC */
        ;
      }

    case 2
    /* TEXT */
    :
    case 3
    /* COMMENT */
    :
      return 1
      /* FULL_STATIC */
      ;

    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
    case 10
    /* IF_BRANCH */
    :
      return 0
      /* NOT_STATIC */
      ;

    case 5
    /* INTERPOLATION */
    :
    case 12
    /* TEXT_CALL */
    :
      return getStaticType(node.content, resultCache);

    case 4
    /* SIMPLE_EXPRESSION */
    :
      return node.isConstant ? node.isRuntimeConstant ? 2
      /* HAS_RUNTIME_CONSTANT */
      : 1
      /* FULL_STATIC */
      : 0
      /* NOT_STATIC */
      ;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      var returnType = 1
      /* FULL_STATIC */
      ;

      for (var _i5 = 0; _i5 < node.children.length; _i5++) {
        var child = node.children[_i5];

        if (isString(child) || isSymbol(child)) {
          continue;
        }

        var _childType = getStaticType(child, resultCache);

        if (_childType === 0
        /* NOT_STATIC */
        ) {
            return 0
            /* NOT_STATIC */
            ;
          } else if (_childType === 2
        /* HAS_RUNTIME_CONSTANT */
        ) {
            returnType = 2
            /* HAS_RUNTIME_CONSTANT */
            ;
          }
      }

      return returnType;

    default:
      return 0
      /* NOT_STATIC */
      ;
  }
}

function hasDynamicKeyOrRef(node) {
  return !!(findProp(node, 'key', true) || findProp(node, 'ref', true));
}

function hasCachedProps(node) {
  {
    return false;
  }
}

function getNodeProps(node) {
  var codegenNode = node.codegenNode;

  if (codegenNode.type === 13
  /* VNODE_CALL */
  ) {
      return codegenNode.props;
    }
}

function getPatchFlag(node) {
  var flag = node.patchFlag;
  return flag ? parseInt(flag, 10) : undefined;
}

function createTransformContext(root, _ref5) {
  var _ref5$prefixIdentifie = _ref5.prefixIdentifiers,
      prefixIdentifiers = _ref5$prefixIdentifie === void 0 ? false : _ref5$prefixIdentifie,
      _ref5$hoistStatic = _ref5.hoistStatic,
      hoistStatic = _ref5$hoistStatic === void 0 ? false : _ref5$hoistStatic,
      _ref5$cacheHandlers = _ref5.cacheHandlers,
      cacheHandlers = _ref5$cacheHandlers === void 0 ? false : _ref5$cacheHandlers,
      _ref5$nodeTransforms = _ref5.nodeTransforms,
      nodeTransforms = _ref5$nodeTransforms === void 0 ? [] : _ref5$nodeTransforms,
      _ref5$directiveTransf = _ref5.directiveTransforms,
      directiveTransforms = _ref5$directiveTransf === void 0 ? {} : _ref5$directiveTransf,
      _ref5$transformHoist = _ref5.transformHoist,
      transformHoist = _ref5$transformHoist === void 0 ? null : _ref5$transformHoist,
      _ref5$isBuiltInCompon = _ref5.isBuiltInComponent,
      isBuiltInComponent = _ref5$isBuiltInCompon === void 0 ? NOOP : _ref5$isBuiltInCompon,
      _ref5$expressionPlugi = _ref5.expressionPlugins,
      expressionPlugins = _ref5$expressionPlugi === void 0 ? [] : _ref5$expressionPlugi,
      _ref5$scopeId = _ref5.scopeId,
      scopeId = _ref5$scopeId === void 0 ? null : _ref5$scopeId,
      _ref5$ssr = _ref5.ssr,
      ssr = _ref5$ssr === void 0 ? false : _ref5$ssr,
      _ref5$onError = _ref5.onError,
      onError = _ref5$onError === void 0 ? defaultOnError : _ref5$onError;
  var context = {
    // options
    prefixIdentifiers: prefixIdentifiers,
    hoistStatic: hoistStatic,
    cacheHandlers: cacheHandlers,
    nodeTransforms: nodeTransforms,
    directiveTransforms: directiveTransforms,
    transformHoist: transformHoist,
    isBuiltInComponent: isBuiltInComponent,
    expressionPlugins: expressionPlugins,
    scopeId: scopeId,
    ssr: ssr,
    onError: onError,
    // state
    root: root,
    helpers: new Set(),
    components: new Set(),
    directives: new Set(),
    hoists: [],
    imports: new Set(),
    temps: 0,
    cached: 0,
    identifiers: {},
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    currentNode: root,
    childIndex: 0,
    // methods
    helper: function helper(name) {
      context.helpers.add(name);
      return name;
    },
    helperString: function helperString(name) {
      return "_".concat(helperNameMap[context.helper(name)]);
    },
    replaceNode: function replaceNode(node) {
      /* istanbul ignore if */
      {
        if (!context.currentNode) {
          throw new Error("Node being replaced is already removed.");
        }

        if (!context.parent) {
          throw new Error("Cannot replace root node.");
        }
      }
      context.parent.children[context.childIndex] = context.currentNode = node;
    },
    removeNode: function removeNode(node) {
      if (!context.parent) {
        throw new Error("Cannot remove root node.");
      }

      var list = context.parent.children;
      var removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
      /* istanbul ignore if */

      if (removalIndex < 0) {
        throw new Error("node being removed is not a child of current parent");
      }

      if (!node || node === context.currentNode) {
        // current node removed
        context.currentNode = null;
        context.onNodeRemoved();
      } else {
        // sibling node removed
        if (context.childIndex > removalIndex) {
          context.childIndex--;
          context.onNodeRemoved();
        }
      }

      context.parent.children.splice(removalIndex, 1);
    },
    onNodeRemoved: function onNodeRemoved() {},
    addIdentifiers: function addIdentifiers(exp) {},
    removeIdentifiers: function removeIdentifiers(exp) {},
    hoist: function hoist(exp) {
      context.hoists.push(exp);
      var identifier = createSimpleExpression("_hoisted_".concat(context.hoists.length), false, exp.loc, true);
      identifier.hoisted = exp;
      return identifier;
    },
    cache: function cache(exp) {
      var isVNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return createCacheExpression(++context.cached, exp, isVNode);
    }
  };
  return context;
}

function transform(root, options) {
  var context = createTransformContext(root, options);
  traverseNode(root, context);

  if (options.hoistStatic) {
    hoistStatic(root, context);
  }

  if (!options.ssr) {
    createRootCodegen(root, context);
  } // finalize meta information


  root.helpers = _toConsumableArray(context.helpers);
  root.components = _toConsumableArray(context.components);
  root.directives = _toConsumableArray(context.directives);
  root.imports = _toConsumableArray(context.imports);
  root.hoists = context.hoists;
  root.temps = context.temps;
  root.cached = context.cached;
}

function createRootCodegen(root, context) {
  var helper = context.helper;
  var children = root.children;
  var child = children[0];

  if (children.length === 1) {
    // if the single child is an element, turn it into a block.
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      // single element root is never hoisted so codegenNode will never be
      // SimpleExpressionNode
      var codegenNode = child.codegenNode;

      if (codegenNode.type === 13
      /* VNODE_CALL */
      ) {
          codegenNode.isBlock = true;
          helper(OPEN_BLOCK);
          helper(CREATE_BLOCK);
        }

      root.codegenNode = codegenNode;
    } else {
      // - single <slot/>, IfNode, ForNode: already blocks.
      // - single text node: always patched.
      // root codegen falls through via genNode()
      root.codegenNode = child;
    }
  } else if (children.length > 1) {
    // root has multiple nodes - return a fragment block.
    root.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, root.children, "".concat(64
    /* STABLE_FRAGMENT */
    , " /* ", PatchFlagNames[64
    /* STABLE_FRAGMENT */
    ], " */"), undefined, undefined, true);
  }
}

function traverseChildren(parent, context) {
  var i = 0;

  var nodeRemoved = function nodeRemoved() {
    i--;
  };

  for (; i < parent.children.length; i++) {
    var child = parent.children[i];
    if (isString(child)) continue;
    context.parent = parent;
    context.childIndex = i;
    context.onNodeRemoved = nodeRemoved;
    traverseNode(child, context);
  }
}

function traverseNode(node, context) {
  context.currentNode = node; // apply transform plugins

  var nodeTransforms = context.nodeTransforms;
  var exitFns = [];

  for (var _i6 = 0; _i6 < nodeTransforms.length; _i6++) {
    var onExit = nodeTransforms[_i6](node, context);

    if (onExit) {
      if (isArray(onExit)) {
        exitFns.push.apply(exitFns, _toConsumableArray(onExit));
      } else {
        exitFns.push(onExit);
      }
    }

    if (!context.currentNode) {
      // node was removed
      return;
    } else {
      // node may have been replaced
      node = context.currentNode;
    }
  }

  switch (node.type) {
    case 3
    /* COMMENT */
    :
      if (!context.ssr) {
        // inject import for the Comment symbol, which is needed for creating
        // comment nodes with `createVNode`
        context.helper(CREATE_COMMENT);
      }

      break;

    case 5
    /* INTERPOLATION */
    :
      // no need to traverse, but we need to inject toString helper
      if (!context.ssr) {
        context.helper(TO_DISPLAY_STRING);
      }

      break;
    // for container types, further traverse downwards

    case 9
    /* IF */
    :
      for (var _i7 = 0; _i7 < node.branches.length; _i7++) {
        traverseNode(node.branches[_i7], context);
      }

      break;

    case 10
    /* IF_BRANCH */
    :
    case 11
    /* FOR */
    :
    case 1
    /* ELEMENT */
    :
    case 0
    /* ROOT */
    :
      traverseChildren(node, context);
      break;
  } // exit transforms


  var i = exitFns.length;

  while (i--) {
    exitFns[i]();
  }
}

function createStructuralDirectiveTransform(name, fn) {
  var matches = isString(name) ? function (n) {
    return n === name;
  } : function (n) {
    return name.test(n);
  };
  return function (node, context) {
    if (node.type === 1
    /* ELEMENT */
    ) {
        var props = node.props; // structural directive transforms are not concerned with slots
        // as they are handled separately in vSlot.ts

        if (node.tagType === 3
        /* TEMPLATE */
        && props.some(isVSlot)) {
          return;
        }

        var exitFns = [];

        for (var i = 0; i < props.length; i++) {
          var prop = props[i];

          if (prop.type === 7
          /* DIRECTIVE */
          && matches(prop.name)) {
            // structural directives are removed to avoid infinite recursion
            // also we remove them *before* applying so that it can further
            // traverse itself in case it moves the node around
            props.splice(i, 1);
            i--;
            var onExit = fn(node, prop, context);
            if (onExit) exitFns.push(onExit);
          }
        }

        return exitFns;
      }
  };
}

var PURE_ANNOTATION = "/*#__PURE__*/";

function createCodegenContext(ast, _ref6) {
  var _ref6$mode = _ref6.mode,
      mode = _ref6$mode === void 0 ? 'function' : _ref6$mode,
      _ref6$prefixIdentifie = _ref6.prefixIdentifiers,
      prefixIdentifiers = _ref6$prefixIdentifie === void 0 ? mode === 'module' : _ref6$prefixIdentifie,
      _ref6$sourceMap = _ref6.sourceMap,
      sourceMap = _ref6$sourceMap === void 0 ? false : _ref6$sourceMap,
      _ref6$filename = _ref6.filename,
      filename = _ref6$filename === void 0 ? "template.vue.html" : _ref6$filename,
      _ref6$scopeId = _ref6.scopeId,
      scopeId = _ref6$scopeId === void 0 ? null : _ref6$scopeId,
      _ref6$optimizeBinding = _ref6.optimizeBindings,
      optimizeBindings = _ref6$optimizeBinding === void 0 ? false : _ref6$optimizeBinding,
      _ref6$runtimeGlobalNa = _ref6.runtimeGlobalName,
      runtimeGlobalName = _ref6$runtimeGlobalNa === void 0 ? "Vue" : _ref6$runtimeGlobalNa,
      _ref6$runtimeModuleNa = _ref6.runtimeModuleName,
      runtimeModuleName = _ref6$runtimeModuleNa === void 0 ? "vue" : _ref6$runtimeModuleNa,
      _ref6$ssr = _ref6.ssr,
      ssr = _ref6$ssr === void 0 ? false : _ref6$ssr;
  var context = {
    mode: mode,
    prefixIdentifiers: prefixIdentifiers,
    sourceMap: sourceMap,
    filename: filename,
    scopeId: scopeId,
    optimizeBindings: optimizeBindings,
    runtimeGlobalName: runtimeGlobalName,
    runtimeModuleName: runtimeModuleName,
    ssr: ssr,
    source: ast.loc.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: false,
    map: undefined,
    helper: function helper(key) {
      return "_".concat(helperNameMap[key]);
    },
    push: function push(code, node) {
      context.code += code;
    },
    indent: function indent() {
      _newline(++context.indentLevel);
    },
    deindent: function deindent() {
      var withoutNewLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (withoutNewLine) {
        --context.indentLevel;
      } else {
        _newline(--context.indentLevel);
      }
    },
    newline: function newline() {
      _newline(context.indentLevel);
    }
  };

  function _newline(n) {
    context.push('\n' + "  ".repeat(n));
  }

  return context;
}

function generate(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var context = createCodegenContext(ast, options);
  var mode = context.mode,
      push = context.push,
      prefixIdentifiers = context.prefixIdentifiers,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline,
      scopeId = context.scopeId,
      ssr = context.ssr;
  var hasHelpers = ast.helpers.length > 0;
  var useWithBlock = !prefixIdentifiers && mode !== 'module'; // preambles

  {
    genFunctionPreamble(ast, context);
  } // enter render function

  if (!ssr) {
    push("function render(_ctx, _cache) {");
  } else {
    push("function ssrRender(_ctx, _push, _parent, _attrs) {");
  }

  indent();

  if (useWithBlock) {
    push("with (_ctx) {");
    indent(); // function mode const declarations should be inside with block
    // also they should be renamed to avoid collision with user properties

    if (hasHelpers) {
      push("const { ".concat(ast.helpers.map(function (s) {
        return "".concat(helperNameMap[s], ": _").concat(helperNameMap[s]);
      }).join(', '), " } = _Vue"));
      push("\n");
      newline();
    }
  } // generate asset resolution statements


  if (ast.components.length) {
    genAssets(ast.components, 'component', context);

    if (ast.directives.length || ast.temps > 0) {
      newline();
    }
  }

  if (ast.directives.length) {
    genAssets(ast.directives, 'directive', context);

    if (ast.temps > 0) {
      newline();
    }
  }

  if (ast.temps > 0) {
    push("let ");

    for (var i = 0; i < ast.temps; i++) {
      push("".concat(i > 0 ? ", " : "", "_temp").concat(i));
    }
  }

  if (ast.components.length || ast.directives.length || ast.temps) {
    push("\n");
    newline();
  } // generate the VNode tree expression


  if (!ssr) {
    push("return ");
  }

  if (ast.codegenNode) {
    genNode(ast.codegenNode, context);
  } else {
    push("null");
  }

  if (useWithBlock) {
    deindent();
    push("}");
  }

  deindent();
  push("}");
  return {
    ast: ast,
    code: context.code,
    // SourceMapGenerator does have toJSON() method but it's not in the types
    map: context.map ? context.map.toJSON() : undefined
  };
}

function genFunctionPreamble(ast, context) {
  var ssr = context.ssr,
      prefixIdentifiers = context.prefixIdentifiers,
      push = context.push,
      newline = context.newline,
      runtimeModuleName = context.runtimeModuleName,
      runtimeGlobalName = context.runtimeGlobalName;
  var VueBinding = runtimeGlobalName;

  var aliasHelper = function aliasHelper(s) {
    return "".concat(helperNameMap[s], ": _").concat(helperNameMap[s]);
  }; // Generate const declaration for helpers
  // In prefix mode, we place the const declaration at top so it's done
  // only once; But if we not prefixing, we place the declaration inside the
  // with block so it doesn't incur the `in` check cost for every helper access.


  if (ast.helpers.length > 0) {
    {
      // "with" mode.
      // save Vue in a separate variable to avoid collision
      push("const _Vue = ".concat(VueBinding, "\n")); // in "with" mode, helpers are declared inside the with block to avoid
      // has check cost, but hoists are lifted out of the function - we need
      // to provide the helper here.

      if (ast.hoists.length) {
        var staticHelpers = [CREATE_VNODE, CREATE_COMMENT, CREATE_TEXT, CREATE_STATIC].filter(function (helper) {
          return ast.helpers.includes(helper);
        }).map(aliasHelper).join(', ');
        push("const { ".concat(staticHelpers, " } = _Vue\n"));
      }
    }
  }

  genHoists(ast.hoists, context);
  newline();
  push("return ");
}

function genAssets(assets, type, _ref7) {
  var helper = _ref7.helper,
      push = _ref7.push,
      newline = _ref7.newline;
  var resolver = helper(type === 'component' ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE);

  for (var i = 0; i < assets.length; i++) {
    var id = assets[i];
    push("const ".concat(toValidAssetId(id, type), " = ").concat(resolver, "(").concat(JSON.stringify(id), ")"));

    if (i < assets.length - 1) {
      newline();
    }
  }
}

function genHoists(hoists, context) {
  if (!hoists.length) {
    return;
  }

  context.pure = true;
  var push = context.push,
      newline = context.newline,
      helper = context.helper,
      scopeId = context.scopeId,
      mode = context.mode;
  newline();
  hoists.forEach(function (exp, i) {
    if (exp) {
      push("const _hoisted_".concat(i + 1, " = "));
      genNode(exp, context);
      newline();
    }
  });
  context.pure = false;
}

function isText$1(n) {
  return isString(n) || n.type === 4
  /* SIMPLE_EXPRESSION */
  || n.type === 2
  /* TEXT */
  || n.type === 5
  /* INTERPOLATION */
  || n.type === 8
  /* COMPOUND_EXPRESSION */
  ;
}

function genNodeListAsArray(nodes, context) {
  var multilines = nodes.length > 3 || nodes.some(function (n) {
    return isArray(n) || !isText$1(n);
  });
  context.push("[");
  multilines && context.indent();
  genNodeList(nodes, context, multilines);
  multilines && context.deindent();
  context.push("]");
}

function genNodeList(nodes, context) {
  var multilines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var comma = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var push = context.push,
      newline = context.newline;

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];

    if (isString(node)) {
      push(node);
    } else if (isArray(node)) {
      genNodeListAsArray(node, context);
    } else {
      genNode(node, context);
    }

    if (i < nodes.length - 1) {
      if (multilines) {
        comma && push(',');
        newline();
      } else {
        comma && push(', ');
      }
    }
  }
}

function genNode(node, context) {
  if (isString(node)) {
    context.push(node);
    return;
  }

  if (isSymbol(node)) {
    context.push(context.helper(node));
    return;
  }

  switch (node.type) {
    case 1
    /* ELEMENT */
    :
    case 9
    /* IF */
    :
    case 11
    /* FOR */
    :
      assert(node.codegenNode != null, "Codegen node is missing for element/if/for node. " + "Apply appropriate transforms first.");
      genNode(node.codegenNode, context);
      break;

    case 2
    /* TEXT */
    :
      genText(node, context);
      break;

    case 4
    /* SIMPLE_EXPRESSION */
    :
      genExpression(node, context);
      break;

    case 5
    /* INTERPOLATION */
    :
      genInterpolation(node, context);
      break;

    case 12
    /* TEXT_CALL */
    :
      genNode(node.codegenNode, context);
      break;

    case 8
    /* COMPOUND_EXPRESSION */
    :
      genCompoundExpression(node, context);
      break;

    case 3
    /* COMMENT */
    :
      genComment(node, context);
      break;

    case 13
    /* VNODE_CALL */
    :
      genVNodeCall(node, context);
      break;

    case 14
    /* JS_CALL_EXPRESSION */
    :
      genCallExpression(node, context);
      break;

    case 15
    /* JS_OBJECT_EXPRESSION */
    :
      genObjectExpression(node, context);
      break;

    case 17
    /* JS_ARRAY_EXPRESSION */
    :
      genArrayExpression(node, context);
      break;

    case 18
    /* JS_FUNCTION_EXPRESSION */
    :
      genFunctionExpression(node, context);
      break;

    case 19
    /* JS_CONDITIONAL_EXPRESSION */
    :
      genConditionalExpression(node, context);
      break;

    case 20
    /* JS_CACHE_EXPRESSION */
    :
      genCacheExpression(node, context);
      break;
    // SSR only types

    case 21
    /* JS_BLOCK_STATEMENT */
    :
      break;

    case 22
    /* JS_TEMPLATE_LITERAL */
    :
      break;

    case 23
    /* JS_IF_STATEMENT */
    :
      break;

    case 24
    /* JS_ASSIGNMENT_EXPRESSION */
    :
      break;

    case 25
    /* JS_SEQUENCE_EXPRESSION */
    :
      break;

    case 26
    /* JS_RETURN_STATEMENT */
    :
      break;

    /* istanbul ignore next */

    case 10
    /* IF_BRANCH */
    :
      // noop
      break;

    default:
      {
        assert(false, "unhandled codegen node type: ".concat(node.type)); // make sure we exhaust all possible types

        var exhaustiveCheck = node;
        return exhaustiveCheck;
      }
  }
}

function genText(node, context) {
  context.push(JSON.stringify(node.content), node);
}

function genExpression(node, context) {
  var content = node.content,
      isStatic = node.isStatic;
  context.push(isStatic ? JSON.stringify(content) : content, node);
}

function genInterpolation(node, context) {
  var push = context.push,
      helper = context.helper,
      pure = context.pure;
  if (pure) push(PURE_ANNOTATION);
  push("".concat(helper(TO_DISPLAY_STRING), "("));
  genNode(node.content, context);
  push(")");
}

function genCompoundExpression(node, context) {
  for (var i = 0; i < node.children.length; i++) {
    var child = node.children[i];

    if (isString(child)) {
      context.push(child);
    } else {
      genNode(child, context);
    }
  }
}

function genExpressionAsPropertyKey(node, context) {
  var push = context.push;

  if (node.type === 8
  /* COMPOUND_EXPRESSION */
  ) {
      push("[");
      genCompoundExpression(node, context);
      push("]");
    } else if (node.isStatic) {
    // only quote keys if necessary
    var text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
    push(text, node);
  } else {
    push("[".concat(node.content, "]"), node);
  }
}

function genComment(node, context) {
  {
    var push = context.push,
        helper = context.helper,
        pure = context.pure;

    if (pure) {
      push(PURE_ANNOTATION);
    }

    push("".concat(helper(CREATE_COMMENT), "(").concat(JSON.stringify(node.content), ")"), node);
  }
}

function genVNodeCall(node, context) {
  var push = context.push,
      helper = context.helper,
      pure = context.pure;
  var tag = node.tag,
      props = node.props,
      children = node.children,
      patchFlag = node.patchFlag,
      dynamicProps = node.dynamicProps,
      directives = node.directives,
      isBlock = node.isBlock,
      disableTracking = node.disableTracking;

  if (directives) {
    push(helper(WITH_DIRECTIVES) + "(");
  }

  if (isBlock) {
    push("(".concat(helper(OPEN_BLOCK), "(").concat(disableTracking ? "true" : "", "), "));
  }

  if (pure) {
    push(PURE_ANNOTATION);
  }

  push(helper(isBlock ? CREATE_BLOCK : CREATE_VNODE) + "(", node);
  genNodeList(genNullableArgs([tag, props, children, patchFlag, dynamicProps]), context);
  push(")");

  if (isBlock) {
    push(")");
  }

  if (directives) {
    push(", ");
    genNode(directives, context);
    push(")");
  }
}

function genNullableArgs(args) {
  var i = args.length;

  while (i--) {
    if (args[i] != null) break;
  }

  return args.slice(0, i + 1).map(function (arg) {
    return arg || "null";
  });
} // JavaScript


function genCallExpression(node, context) {
  var push = context.push,
      helper = context.helper,
      pure = context.pure;
  var callee = isString(node.callee) ? node.callee : helper(node.callee);

  if (pure) {
    push(PURE_ANNOTATION);
  }

  push(callee + "(", node);
  genNodeList(node.arguments, context);
  push(")");
}

function genObjectExpression(node, context) {
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;
  var properties = node.properties;

  if (!properties.length) {
    push("{}", node);
    return;
  }

  var multilines = properties.length > 1 || properties.some(function (p) {
    return p.value.type !== 4;
  }
  /* SIMPLE_EXPRESSION */
  );
  push(multilines ? "{" : "{ ");
  multilines && indent();

  for (var i = 0; i < properties.length; i++) {
    var _properties$i = properties[i],
        key = _properties$i.key,
        value = _properties$i.value; // key

    genExpressionAsPropertyKey(key, context);
    push(": "); // value

    genNode(value, context);

    if (i < properties.length - 1) {
      // will only reach this if it's multilines
      push(",");
      newline();
    }
  }

  multilines && deindent();
  push(multilines ? "}" : " }");
}

function genArrayExpression(node, context) {
  genNodeListAsArray(node.elements, context);
}

function genFunctionExpression(node, context) {
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      scopeId = context.scopeId,
      mode = context.mode;
  var params = node.params,
      returns = node.returns,
      body = node.body,
      newline = node.newline,
      isSlot = node.isSlot;

  if (isSlot) {
    push("_".concat(helperNameMap[WITH_CTX], "("));
  }

  push("(", node);

  if (isArray(params)) {
    genNodeList(params, context);
  } else if (params) {
    genNode(params, context);
  }

  push(") => ");

  if (newline || body) {
    push("{");
    indent();
  }

  if (returns) {
    if (newline) {
      push("return ");
    }

    if (isArray(returns)) {
      genNodeListAsArray(returns, context);
    } else {
      genNode(returns, context);
    }
  } else if (body) {
    genNode(body, context);
  }

  if (newline || body) {
    deindent();
    push("}");
  }

  if (isSlot) {
    push(")");
  }
}

function genConditionalExpression(node, context) {
  var test = node.test,
      consequent = node.consequent,
      alternate = node.alternate,
      needNewline = node.newline;
  var push = context.push,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;

  if (test.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
      var needsParens = !isSimpleIdentifier(test.content);
      needsParens && push("(");
      genExpression(test, context);
      needsParens && push(")");
    } else {
    push("(");
    genNode(test, context);
    push(")");
  }

  needNewline && indent();
  context.indentLevel++;
  needNewline || push(" ");
  push("? ");
  genNode(consequent, context);
  context.indentLevel--;
  needNewline && newline();
  needNewline || push(" ");
  push(": ");
  var isNested = alternate.type === 19
  /* JS_CONDITIONAL_EXPRESSION */
  ;

  if (!isNested) {
    context.indentLevel++;
  }

  genNode(alternate, context);

  if (!isNested) {
    context.indentLevel--;
  }

  needNewline && deindent(true
  /* without newline */
  );
}

function genCacheExpression(node, context) {
  var push = context.push,
      helper = context.helper,
      indent = context.indent,
      deindent = context.deindent,
      newline = context.newline;
  push("_cache[".concat(node.index, "] || ("));

  if (node.isVNode) {
    indent();
    push("".concat(helper(SET_BLOCK_TRACKING), "(-1),"));
    newline();
  }

  push("_cache[".concat(node.index, "] = "));
  genNode(node.value, context);

  if (node.isVNode) {
    push(",");
    newline();
    push("".concat(helper(SET_BLOCK_TRACKING), "(1),"));
    newline();
    push("_cache[".concat(node.index, "]"));
    deindent();
  }

  push(")");
} // these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed


var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments,typeof,void').split(',').join('\\b|\\b') + '\\b'); // strip strings in expressions

var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
/**
 * Validate a non-prefixed expression.
 * This is only called when using the in-browser runtime compiler since it
 * doesn't prefix expressions.
 */

function validateBrowserExpression(node, context) {
  var asParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var asRawStatements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var exp = node.content; // empty expressions are validated per-directive since some directives
  // do allow empty expressions.

  if (!exp.trim()) {
    return;
  }

  try {
    new Function(asRawStatements ? " ".concat(exp, " ") : "return ".concat(asParams ? "(".concat(exp, ") => {}") : "(".concat(exp, ")")));
  } catch (e) {
    var message = e.message;
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);

    if (keywordMatch) {
      message = "avoid using JavaScript keyword as property name: \"".concat(keywordMatch[0], "\"");
    }

    context.onError(createCompilerError(41
    /* X_INVALID_EXPRESSION */
    , node.loc, undefined, message));
  }
}

var transformExpression = function transformExpression(node, context) {
  if (node.type === 5
  /* INTERPOLATION */
  ) {
      node.content = processExpression(node.content, context);
    } else if (node.type === 1
  /* ELEMENT */
  ) {
      // handle directives on element
      for (var i = 0; i < node.props.length; i++) {
        var dir = node.props[i]; // do not process for v-on & v-for since they are special handled

        if (dir.type === 7
        /* DIRECTIVE */
        && dir.name !== 'for') {
          var exp = dir.exp;
          var arg = dir.arg; // do not process exp if this is v-on:arg - we need special handling
          // for wrapping inline statements.

          if (exp && exp.type === 4
          /* SIMPLE_EXPRESSION */
          && !(dir.name === 'on' && arg)) {
            dir.exp = processExpression(exp, context, // slot args must be processed as function params
            dir.name === 'slot');
          }

          if (arg && arg.type === 4
          /* SIMPLE_EXPRESSION */
          && !arg.isStatic) {
            dir.arg = processExpression(arg, context);
          }
        }
      }
    }
}; // Important: since this function uses Node.js only dependencies, it should
// always be used with a leading !true check so that it can be
// tree-shaken from the browser build.


function processExpression(node, context) {
  var asParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var asRawStatements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  {
    // simple in-browser validation (same logic in 2.x)
    validateBrowserExpression(node, context, asParams, asRawStatements);
    return node;
  }
}

var transformIf = createStructuralDirectiveTransform(/^(if|else|else-if)$/, function (node, dir, context) {
  return processIf(node, dir, context, function (ifNode, branch, isRoot) {
    // Exit callback. Complete the codegenNode when all children have been
    // transformed.
    return function () {
      if (isRoot) {
        ifNode.codegenNode = createCodegenNodeForBranch(branch, 0, context);
      } else {
        // attach this branch's codegen node to the v-if root.
        var parentCondition = ifNode.codegenNode;

        while (parentCondition.alternate.type === 19
        /* JS_CONDITIONAL_EXPRESSION */
        ) {
          parentCondition = parentCondition.alternate;
        }

        parentCondition.alternate = createCodegenNodeForBranch(branch, ifNode.branches.length - 1, context);
      }
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processIf(node, dir, context, processCodegen) {
  if (dir.name !== 'else' && (!dir.exp || !dir.exp.content.trim())) {
    var loc = dir.exp ? dir.exp.loc : node.loc;
    context.onError(createCompilerError(27
    /* X_V_IF_NO_EXPRESSION */
    , dir.loc));
    dir.exp = createSimpleExpression("true", false, loc);
  }

  if (dir.exp) {
    validateBrowserExpression(dir.exp, context);
  }

  if (dir.name === 'if') {
    var branch = createIfBranch(node, dir);
    var ifNode = {
      type: 9
      /* IF */
      ,
      loc: node.loc,
      branches: [branch]
    };
    context.replaceNode(ifNode);

    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    // locate the adjacent v-if
    var siblings = context.parent.children;
    var comments = [];
    var i = siblings.indexOf(node);

    while (i-- >= -1) {
      var sibling = siblings[i];

      if (sibling && sibling.type === 3
      /* COMMENT */
      ) {
          context.removeNode(sibling);
          comments.unshift(sibling);
          continue;
        }

      if (sibling && sibling.type === 9
      /* IF */
      ) {
          // move the node to the if node's branches
          context.removeNode();

          var _branch = createIfBranch(node, dir);

          if (comments.length) {
            _branch.children = [].concat(comments, _toConsumableArray(_branch.children));
          }

          sibling.branches.push(_branch);
          var onExit = processCodegen && processCodegen(sibling, _branch, false); // since the branch was removed, it will not be traversed.
          // make sure to traverse here.

          traverseNode(_branch, context); // call on exit

          if (onExit) onExit(); // make sure to reset currentNode after traversal to indicate this
          // node has been removed.

          context.currentNode = null;
        } else {
        context.onError(createCompilerError(28
        /* X_V_ELSE_NO_ADJACENT_IF */
        , node.loc));
      }

      break;
    }
  }
}

function createIfBranch(node, dir) {
  return {
    type: 10
    /* IF_BRANCH */
    ,
    loc: node.loc,
    condition: dir.name === 'else' ? undefined : dir.exp,
    children: node.tagType === 3
    /* TEMPLATE */
    ? node.children : [node]
  };
}

function createCodegenNodeForBranch(branch, index, context) {
  if (branch.condition) {
    return createConditionalExpression(branch.condition, createChildrenCodegenNode(branch, index, context), // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    createCallExpression(context.helper(CREATE_COMMENT), ['"v-if"', 'true']));
  } else {
    return createChildrenCodegenNode(branch, index, context);
  }
}

function createChildrenCodegenNode(branch, index, context) {
  var helper = context.helper;
  var keyProperty = createObjectProperty("key", createSimpleExpression(index + '', false));
  var children = branch.children;
  var firstChild = children[0];
  var needFragmentWrapper = children.length !== 1 || firstChild.type !== 1
  /* ELEMENT */
  ;

  if (needFragmentWrapper) {
    if (children.length === 1 && firstChild.type === 11
    /* FOR */
    ) {
        // optimize away nested fragments when child is a ForNode
        var vnodeCall = firstChild.codegenNode;
        injectProp(vnodeCall, keyProperty, context);
        return vnodeCall;
      } else {
      return createVNodeCall(context, helper(FRAGMENT), createObjectExpression([keyProperty]), children, "".concat(64
      /* STABLE_FRAGMENT */
      , " /* ", PatchFlagNames[64
      /* STABLE_FRAGMENT */
      ], " */"), undefined, undefined, true, false, branch.loc);
    }
  } else {
    var _vnodeCall = firstChild.codegenNode; // Change createVNode to createBlock.

    if (_vnodeCall.type === 13
    /* VNODE_CALL */
    && ( // component vnodes are always tracked and its children are
    // compiled into slots so no need to make it a block
    firstChild.tagType !== 1
    /* COMPONENT */
    || // teleport has component type but isn't always tracked
    _vnodeCall.tag === TELEPORT)) {
      _vnodeCall.isBlock = true;
      helper(OPEN_BLOCK);
      helper(CREATE_BLOCK);
    } // inject branch key


    injectProp(_vnodeCall, keyProperty, context);
    return _vnodeCall;
  }
}

var transformFor = createStructuralDirectiveTransform('for', function (node, dir, context) {
  var helper = context.helper;
  return processFor(node, dir, context, function (forNode) {
    // create the loop render function expression now, and add the
    // iterator on exit after all children have been traversed
    var renderExp = createCallExpression(helper(RENDER_LIST), [forNode.source]);
    var keyProp = findProp(node, "key");
    var isStableFragment = forNode.source.type === 4
    /* SIMPLE_EXPRESSION */
    && forNode.source.isConstant;
    var fragmentFlag = isStableFragment ? 64
    /* STABLE_FRAGMENT */
    : keyProp ? 128
    /* KEYED_FRAGMENT */
    : 256
    /* UNKEYED_FRAGMENT */
    ;
    forNode.codegenNode = createVNodeCall(context, helper(FRAGMENT), undefined, renderExp, "".concat(fragmentFlag, " /* ").concat(PatchFlagNames[fragmentFlag], " */"), undefined, undefined, true
    /* isBlock */
    , !isStableFragment
    /* disableTracking */
    , node.loc);
    return function () {
      // finish the codegen now that all children have been traversed
      var childBlock;
      var isTemplate = isTemplateNode(node);
      var children = forNode.children;
      var needFragmentWrapper = children.length > 1 || children[0].type !== 1
      /* ELEMENT */
      ;
      var slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] // api-extractor somehow fails to infer this
      : null;
      var keyProperty = keyProp ? createObjectProperty("key", keyProp.type === 6
      /* ATTRIBUTE */
      ? createSimpleExpression(keyProp.value.content, true) : keyProp.exp) : null;

      if (slotOutlet) {
        // <slot v-for="..."> or <template v-for="..."><slot/></template>
        childBlock = slotOutlet.codegenNode;

        if (isTemplate && keyProperty) {
          // <template v-for="..." :key="..."><slot/></template>
          // we need to inject the key to the renderSlot() call.
          // the props for renderSlot is passed as the 3rd argument.
          injectProp(childBlock, keyProperty, context);
        }
      } else if (needFragmentWrapper) {
        // <template v-for="..."> with text or multi-elements
        // should generate a fragment block for each loop
        childBlock = createVNodeCall(context, helper(FRAGMENT), keyProperty ? createObjectExpression([keyProperty]) : undefined, node.children, "".concat(64
        /* STABLE_FRAGMENT */
        , " /* ", PatchFlagNames[64
        /* STABLE_FRAGMENT */
        ], " */"), undefined, undefined, true);
      } else {
        // Normal element v-for. Directly use the child's codegenNode
        // but mark it as a block.
        childBlock = children[0].codegenNode;
        childBlock.isBlock = !isStableFragment;

        if (childBlock.isBlock) {
          helper(OPEN_BLOCK);
          helper(CREATE_BLOCK);
        }
      }

      renderExp.arguments.push(createFunctionExpression(createForLoopParams(forNode.parseResult), childBlock, true
      /* force newline */
      ));
    };
  });
}); // target-agnostic transform used for both Client and SSR

function processFor(node, dir, context, processCodegen) {
  if (!dir.exp) {
    context.onError(createCompilerError(29
    /* X_V_FOR_NO_EXPRESSION */
    , dir.loc));
    return;
  }

  var parseResult = parseForExpression( // can only be simple expression because vFor transform is applied
  // before expression transform.
  dir.exp, context);

  if (!parseResult) {
    context.onError(createCompilerError(30
    /* X_V_FOR_MALFORMED_EXPRESSION */
    , dir.loc));
    return;
  }

  var addIdentifiers = context.addIdentifiers,
      removeIdentifiers = context.removeIdentifiers,
      scopes = context.scopes;
  var source = parseResult.source,
      value = parseResult.value,
      key = parseResult.key,
      index = parseResult.index;
  var forNode = {
    type: 11
    /* FOR */
    ,
    loc: dir.loc,
    source: source,
    valueAlias: value,
    keyAlias: key,
    objectIndexAlias: index,
    parseResult: parseResult,
    children: node.tagType === 3
    /* TEMPLATE */
    ? node.children : [node]
  };
  context.replaceNode(forNode); // bookkeeping

  scopes.vFor++;
  var onExit = processCodegen && processCodegen(forNode);
  return function () {
    scopes.vFor--;
    if (onExit) onExit();
  };
}

var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/; // This regex doesn't cover the case if key or index aliases have destructuring,
// but those do not make sense in the first place, so this works in practice.

var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

function parseForExpression(input, context) {
  var loc = input.loc;
  var exp = input.content;
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) return;

  var _inMatch = _slicedToArray(inMatch, 3),
      LHS = _inMatch[1],
      RHS = _inMatch[2];

  var result = {
    source: createAliasExpression(loc, RHS.trim(), exp.indexOf(RHS, LHS.length)),
    value: undefined,
    key: undefined,
    index: undefined
  };
  {
    validateBrowserExpression(result.source, context);
  }
  var valueContent = LHS.trim().replace(stripParensRE, '').trim();
  var trimmedOffset = LHS.indexOf(valueContent);
  var iteratorMatch = valueContent.match(forIteratorRE);

  if (iteratorMatch) {
    valueContent = valueContent.replace(forIteratorRE, '').trim();
    var keyContent = iteratorMatch[1].trim();
    var keyOffset;

    if (keyContent) {
      keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
      result.key = createAliasExpression(loc, keyContent, keyOffset);
      {
        validateBrowserExpression(result.key, context, true);
      }
    }

    if (iteratorMatch[2]) {
      var indexContent = iteratorMatch[2].trim();

      if (indexContent) {
        result.index = createAliasExpression(loc, indexContent, exp.indexOf(indexContent, result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length));
        {
          validateBrowserExpression(result.index, context, true);
        }
      }
    }
  }

  if (valueContent) {
    result.value = createAliasExpression(loc, valueContent, trimmedOffset);
    {
      validateBrowserExpression(result.value, context, true);
    }
  }

  return result;
}

function createAliasExpression(range, content, offset) {
  return createSimpleExpression(content, false, getInnerRange(range, offset, content.length));
}

function createForLoopParams(_ref8) {
  var value = _ref8.value,
      key = _ref8.key,
      index = _ref8.index;
  var params = [];

  if (value) {
    params.push(value);
  }

  if (key) {
    if (!value) {
      params.push(createSimpleExpression("_", false));
    }

    params.push(key);
  }

  if (index) {
    if (!key) {
      if (!value) {
        params.push(createSimpleExpression("_", false));
      }

      params.push(createSimpleExpression("__", false));
    }

    params.push(index);
  }

  return params;
}

var isStaticExp = function isStaticExp(p) {
  return p.type === 4
  /* SIMPLE_EXPRESSION */
  && p.isStatic;
};

var defaultFallback = createSimpleExpression("undefined", false); // A NodeTransform that:
// 1. Tracks scope identifiers for scoped slots so that they don't get prefixed
//    by transformExpression. This is only applied in non-browser builds with
//    { prefixIdentifiers: true }.
// 2. Track v-slot depths so that we know a slot is inside another slot.
//    Note the exit callback is executed before buildSlots() on the same node,
//    so only nested slots see positive numbers.

var trackSlotScopes = function trackSlotScopes(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && (node.tagType === 1
  /* COMPONENT */
  || node.tagType === 3
  /* TEMPLATE */
  )) {
    // We are only checking non-empty v-slot here
    // since we only care about slots that introduce scope variables.
    var vSlot = findDir(node, 'slot');

    if (vSlot) {
      var slotProps = vSlot.exp;
      context.scopes.vSlot++;
      return function () {
        context.scopes.vSlot--;
      };
    }
  }
};

var buildClientSlotFn = function buildClientSlotFn(props, children, loc) {
  return createFunctionExpression(props, children, false
  /* newline */
  , true
  /* isSlot */
  , children.length ? children[0].loc : loc);
}; // Instead of being a DirectiveTransform, v-slot processing is called during
// transformElement to build the slots object for a component.


function buildSlots(node, context) {
  var buildSlotFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : buildClientSlotFn;
  context.helper(WITH_CTX);
  var children = node.children,
      loc = node.loc;
  var slotsProperties = [];
  var dynamicSlots = [];

  var buildDefaultSlotProperty = function buildDefaultSlotProperty(props, children) {
    return createObjectProperty("default", buildSlotFn(props, children, loc));
  }; // If the slot is inside a v-for or another v-slot, force it to be dynamic
  // since it likely uses a scope variable.


  var hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0; // 1. Check for slot with slotProps on component itself.
  //    <Comp v-slot="{ prop }"/>

  var onComponentSlot = findDir(node, 'slot', true);

  if (onComponentSlot) {
    var arg = onComponentSlot.arg,
        exp = onComponentSlot.exp;
    slotsProperties.push(createObjectProperty(arg || createSimpleExpression('default', true), buildSlotFn(exp, children, loc)));
  } // 2. Iterate through children and check for template slots
  //    <template v-slot:foo="{ prop }">


  var hasTemplateSlots = false;
  var hasNamedDefaultSlot = false;
  var implicitDefaultChildren = [];
  var seenSlotNames = new Set();

  for (var i = 0; i < children.length; i++) {
    var slotElement = children[i];
    var slotDir = void 0;

    if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, 'slot', true))) {
      // not a <template v-slot>, skip.
      if (slotElement.type !== 3
      /* COMMENT */
      ) {
          implicitDefaultChildren.push(slotElement);
        }

      continue;
    }

    if (onComponentSlot) {
      // already has on-component slot - this is incorrect usage.
      context.onError(createCompilerError(34
      /* X_V_SLOT_MIXED_SLOT_USAGE */
      , slotDir.loc));
      break;
    }

    hasTemplateSlots = true;
    var slotChildren = slotElement.children,
        slotLoc = slotElement.loc;
    var _slotDir = slotDir,
        _slotDir$arg = _slotDir.arg,
        slotName = _slotDir$arg === void 0 ? createSimpleExpression("default", true) : _slotDir$arg,
        slotProps = _slotDir.exp,
        dirLoc = _slotDir.loc; // check if name is dynamic.

    var staticSlotName = void 0;

    if (isStaticExp(slotName)) {
      staticSlotName = slotName ? slotName.content : "default";
    } else {
      hasDynamicSlots = true;
    }

    var slotFunction = buildSlotFn(slotProps, slotChildren, slotLoc); // check if this slot is conditional (v-if/v-for)

    var vIf = void 0;
    var vElse = void 0;
    var vFor = void 0;

    if (vIf = findDir(slotElement, 'if')) {
      hasDynamicSlots = true;
      dynamicSlots.push(createConditionalExpression(vIf.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback));
    } else if (vElse = findDir(slotElement, /^else(-if)?$/, true
    /* allowEmpty */
    )) {
      // find adjacent v-if
      var j = i;
      var prev = void 0;

      while (j--) {
        prev = children[j];

        if (prev.type !== 3
        /* COMMENT */
        ) {
            break;
          }
      }

      if (prev && isTemplateNode(prev) && findDir(prev, 'if')) {
        // remove node
        children.splice(i, 1);
        i--; // attach this slot to previous conditional

        var conditional = dynamicSlots[dynamicSlots.length - 1];

        while (conditional.alternate.type === 19
        /* JS_CONDITIONAL_EXPRESSION */
        ) {
          conditional = conditional.alternate;
        }

        conditional.alternate = vElse.exp ? createConditionalExpression(vElse.exp, buildDynamicSlot(slotName, slotFunction), defaultFallback) : buildDynamicSlot(slotName, slotFunction);
      } else {
        context.onError(createCompilerError(28
        /* X_V_ELSE_NO_ADJACENT_IF */
        , vElse.loc));
      }
    } else if (vFor = findDir(slotElement, 'for')) {
      hasDynamicSlots = true;
      var parseResult = vFor.parseResult || parseForExpression(vFor.exp, context);

      if (parseResult) {
        // Render the dynamic slots as an array and add it to the createSlot()
        // args. The runtime knows how to handle it appropriately.
        dynamicSlots.push(createCallExpression(context.helper(RENDER_LIST), [parseResult.source, createFunctionExpression(createForLoopParams(parseResult), buildDynamicSlot(slotName, slotFunction), true
        /* force newline */
        )]));
      } else {
        context.onError(createCompilerError(30
        /* X_V_FOR_MALFORMED_EXPRESSION */
        , vFor.loc));
      }
    } else {
      // check duplicate static names
      if (staticSlotName) {
        if (seenSlotNames.has(staticSlotName)) {
          context.onError(createCompilerError(35
          /* X_V_SLOT_DUPLICATE_SLOT_NAMES */
          , dirLoc));
          continue;
        }

        seenSlotNames.add(staticSlotName);

        if (staticSlotName === 'default') {
          hasNamedDefaultSlot = true;
        }
      }

      slotsProperties.push(createObjectProperty(slotName, slotFunction));
    }
  }

  if (!onComponentSlot) {
    if (!hasTemplateSlots) {
      // implicit default slot (on component)
      slotsProperties.push(buildDefaultSlotProperty(undefined, children));
    } else if (implicitDefaultChildren.length) {
      // implicit default slot (mixed with named slots)
      if (hasNamedDefaultSlot) {
        context.onError(createCompilerError(36
        /* X_V_SLOT_EXTRANEOUS_DEFAULT_SLOT_CHILDREN */
        , implicitDefaultChildren[0].loc));
      } else {
        slotsProperties.push(buildDefaultSlotProperty(undefined, implicitDefaultChildren));
      }
    }
  }

  var slots = createObjectExpression(slotsProperties.concat(createObjectProperty("_", createSimpleExpression("1", false))), loc);

  if (dynamicSlots.length) {
    slots = createCallExpression(context.helper(CREATE_SLOTS), [slots, createArrayExpression(dynamicSlots)]);
  }

  return {
    slots: slots,
    hasDynamicSlots: hasDynamicSlots
  };
}

function buildDynamicSlot(name, fn) {
  return createObjectExpression([createObjectProperty("name", name), createObjectProperty("fn", fn)]);
} // some directive transforms (e.g. v-model) may return a symbol for runtime
// import, which should be used instead of a resolveDirective call.


var directiveImportMap = new WeakMap(); // generate a JavaScript AST for this element's codegen

var transformElement = function transformElement(node, context) {
  if (!(node.type === 1
  /* ELEMENT */
  && (node.tagType === 0
  /* ELEMENT */
  || node.tagType === 1
  /* COMPONENT */
  ))) {
    return;
  } // perform the work on exit, after all child expressions have been
  // processed and merged.


  return function postTransformElement() {
    var tag = node.tag,
        props = node.props;
    var isComponent = node.tagType === 1
    /* COMPONENT */
    ; // The goal of the transform is to create a codegenNode implementing the
    // VNodeCall interface.

    var vnodeTag = isComponent ? resolveComponentType(node, context) : "\"".concat(tag, "\"");
    var isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
    var vnodeProps;
    var vnodeChildren;
    var vnodePatchFlag;
    var patchFlag = 0;
    var vnodeDynamicProps;
    var dynamicPropNames;
    var vnodeDirectives;
    var shouldUseBlock = // dynamic component may resolve to plain elements
    isDynamicComponent || !isComponent && ( // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    tag === 'svg' || tag === 'foreignObject' || // #938: elements with dynamic keys should be forced into blocks
    findProp(node, 'key', true)); // props

    if (props.length > 0) {
      var propsBuildResult = buildProps(node, context);
      vnodeProps = propsBuildResult.props;
      patchFlag = propsBuildResult.patchFlag;
      dynamicPropNames = propsBuildResult.dynamicPropNames;
      var directives = propsBuildResult.directives;
      vnodeDirectives = directives && directives.length ? createArrayExpression(directives.map(function (dir) {
        return buildDirectiveArgs(dir, context);
      })) : undefined;
    } // children


    if (node.children.length > 0) {
      if (vnodeTag === KEEP_ALIVE) {
        // Although a built-in component, we compile KeepAlive with raw children
        // instead of slot functions so that it can be used inside Transition
        // or other Transition-wrapping HOCs.
        // To ensure correct updates with block optimizations, we need to:
        // 1. Force keep-alive into a block. This avoids its children being
        //    collected by a parent block.
        shouldUseBlock = true; // 2. Force keep-alive to always be updated, since it uses raw children.

        patchFlag |= 1024
        /* DYNAMIC_SLOTS */
        ;

        if (node.children.length > 1) {
          context.onError(createCompilerError(42
          /* X_KEEP_ALIVE_INVALID_CHILDREN */
          , {
            start: node.children[0].loc.start,
            end: node.children[node.children.length - 1].loc.end,
            source: ''
          }));
        }
      }

      var shouldBuildAsSlots = isComponent && // Teleport is not a real component and has dedicated runtime handling
      vnodeTag !== TELEPORT && // explained above.
      vnodeTag !== KEEP_ALIVE;

      if (shouldBuildAsSlots) {
        var _buildSlots = buildSlots(node, context),
            slots = _buildSlots.slots,
            hasDynamicSlots = _buildSlots.hasDynamicSlots;

        vnodeChildren = slots;

        if (hasDynamicSlots) {
          patchFlag |= 1024
          /* DYNAMIC_SLOTS */
          ;
        }
      } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
        var child = node.children[0];
        var type = child.type; // check for dynamic text children

        var hasDynamicTextChild = type === 5
        /* INTERPOLATION */
        || type === 8
        /* COMPOUND_EXPRESSION */
        ;

        if (hasDynamicTextChild && !getStaticType(child)) {
          patchFlag |= 1
          /* TEXT */
          ;
        } // pass directly if the only child is a text node
        // (plain / interpolation / expression)


        if (hasDynamicTextChild || type === 2
        /* TEXT */
        ) {
            vnodeChildren = child;
          } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    } // patchFlag & dynamicPropNames


    if (patchFlag !== 0) {
      {
        if (patchFlag < 0) {
          // special flags (negative and mutually exclusive)
          vnodePatchFlag = patchFlag + " /* ".concat(PatchFlagNames[patchFlag], " */");
        } else {
          // bitwise flags
          var flagNames = Object.keys(PatchFlagNames).map(Number).filter(function (n) {
            return n > 0 && patchFlag & n;
          }).map(function (n) {
            return PatchFlagNames[n];
          }).join(", ");
          vnodePatchFlag = patchFlag + " /* ".concat(flagNames, " */");
        }
      }

      if (dynamicPropNames && dynamicPropNames.length) {
        vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
      }
    }

    node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren, vnodePatchFlag, vnodeDynamicProps, vnodeDirectives, !!shouldUseBlock, false
    /* disableTracking */
    , node.loc);
  };
};

function resolveComponentType(node, context) {
  var ssr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var tag = node.tag; // 1. dynamic component

  var isProp = node.tag === 'component' ? findProp(node, 'is') : findDir(node, 'is');

  if (isProp) {
    var exp = isProp.type === 6
    /* ATTRIBUTE */
    ? isProp.value && createSimpleExpression(isProp.value.content, true) : isProp.exp;

    if (exp) {
      return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [exp]);
    }
  } // 2. built-in components (Teleport, Transition, KeepAlive, Suspense...)


  var builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);

  if (builtIn) {
    // built-ins are simply fallthroughs / have special handling during ssr
    // no we don't need to import their runtime equivalents
    if (!ssr) context.helper(builtIn);
    return builtIn;
  } // 3. user component (resolve)


  context.helper(RESOLVE_COMPONENT);
  context.components.add(tag);
  return toValidAssetId(tag, "component");
}

function buildProps(node, context) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : node.props;
  var ssr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var tag = node.tag,
      elementLoc = node.loc;
  var isComponent = node.tagType === 1
  /* COMPONENT */
  ;
  var properties = [];
  var mergeArgs = [];
  var runtimeDirectives = []; // patchFlag analysis

  var patchFlag = 0;
  var hasRef = false;
  var hasClassBinding = false;
  var hasStyleBinding = false;
  var hasHydrationEventBinding = false;
  var hasDynamicKeys = false;
  var dynamicPropNames = [];

  var analyzePatchFlag = function analyzePatchFlag(_ref9) {
    var key = _ref9.key,
        value = _ref9.value;

    if (key.type === 4
    /* SIMPLE_EXPRESSION */
    && key.isStatic) {
      var name = key.content;

      if (!isComponent && isOn(name) && // omit the flag for click handlers becaues hydration gives click
      // dedicated fast path.
      name.toLowerCase() !== 'onclick' && // omit v-model handlers
      name !== 'onUpdate:modelValue') {
        hasHydrationEventBinding = true;
      }

      if (value.type === 20
      /* JS_CACHE_EXPRESSION */
      || (value.type === 4
      /* SIMPLE_EXPRESSION */
      || value.type === 8
      /* COMPOUND_EXPRESSION */
      ) && getStaticType(value) > 0) {
        // skip if the prop is a cached handler or has constant value
        return;
      }

      if (name === 'ref') {
        hasRef = true;
      } else if (name === 'class' && !isComponent) {
        hasClassBinding = true;
      } else if (name === 'style' && !isComponent) {
        hasStyleBinding = true;
      } else if (name !== 'key' && !dynamicPropNames.includes(name)) {
        dynamicPropNames.push(name);
      }
    } else {
      hasDynamicKeys = true;
    }
  };

  for (var i = 0; i < props.length; i++) {
    // static attribute
    var prop = props[i];

    if (prop.type === 6
    /* ATTRIBUTE */
    ) {
        var loc = prop.loc,
            name = prop.name,
            value = prop.value;

        if (name === 'ref') {
          hasRef = true;
        } // skip :is on <component>


        if (name === 'is' && tag === 'component') {
          continue;
        }

        properties.push(createObjectProperty(createSimpleExpression(name, true, getInnerRange(loc, 0, name.length)), createSimpleExpression(value ? value.content : '', true, value ? value.loc : loc)));
      } else {
      // directives
      var _name = prop.name,
          arg = prop.arg,
          exp = prop.exp,
          _loc2 = prop.loc;
      var isBind = _name === 'bind';

      var _isOn = _name === 'on'; // skip v-slot - it is handled by its dedicated transform.


      if (_name === 'slot') {
        if (!isComponent) {
          context.onError(createCompilerError(37
          /* X_V_SLOT_MISPLACED */
          , _loc2));
        }

        continue;
      } // skip v-once - it is handled by its dedicated transform.


      if (_name === 'once') {
        continue;
      } // skip v-is and :is on <component>


      if (_name === 'is' || isBind && tag === 'component' && isBindKey(arg, 'is')) {
        continue;
      } // skip v-on in SSR compilation


      if (_isOn && ssr) {
        continue;
      } // special case for v-bind and v-on with no argument


      if (!arg && (isBind || _isOn)) {
        hasDynamicKeys = true;

        if (exp) {
          if (properties.length) {
            mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
            properties = [];
          }

          if (isBind) {
            mergeArgs.push(exp);
          } else {
            // v-on="obj" -> toHandlers(obj)
            mergeArgs.push({
              type: 14
              /* JS_CALL_EXPRESSION */
              ,
              loc: _loc2,
              callee: context.helper(TO_HANDLERS),
              arguments: [exp]
            });
          }
        } else {
          context.onError(createCompilerError(isBind ? 31
          /* X_V_BIND_NO_EXPRESSION */
          : 32
          /* X_V_ON_NO_EXPRESSION */
          , _loc2));
        }

        continue;
      }

      var directiveTransform = context.directiveTransforms[_name];

      if (directiveTransform) {
        var _properties;

        // has built-in directive transform.
        var _directiveTransform = directiveTransform(prop, node, context),
            _props = _directiveTransform.props,
            needRuntime = _directiveTransform.needRuntime;

        !ssr && _props.forEach(analyzePatchFlag);

        (_properties = properties).push.apply(_properties, _toConsumableArray(_props));

        if (needRuntime) {
          runtimeDirectives.push(prop);

          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      } else {
        // no built-in transform, this is a user custom directive.
        runtimeDirectives.push(prop);
      }
    }
  }

  var propsExpression = undefined; // has v-bind="object" or v-on="object", wrap with mergeProps

  if (mergeArgs.length) {
    if (properties.length) {
      mergeArgs.push(createObjectExpression(dedupeProperties(properties), elementLoc));
    }

    if (mergeArgs.length > 1) {
      propsExpression = createCallExpression(context.helper(MERGE_PROPS), mergeArgs, elementLoc);
    } else {
      // single v-bind with nothing else - no need for a mergeProps call
      propsExpression = mergeArgs[0];
    }
  } else if (properties.length) {
    propsExpression = createObjectExpression(dedupeProperties(properties), elementLoc);
  } // patchFlag analysis


  if (hasDynamicKeys) {
    patchFlag |= 16
    /* FULL_PROPS */
    ;
  } else {
    if (hasClassBinding) {
      patchFlag |= 2
      /* CLASS */
      ;
    }

    if (hasStyleBinding) {
      patchFlag |= 4
      /* STYLE */
      ;
    }

    if (dynamicPropNames.length) {
      patchFlag |= 8
      /* PROPS */
      ;
    }

    if (hasHydrationEventBinding) {
      patchFlag |= 32
      /* HYDRATE_EVENTS */
      ;
    }
  }

  if ((patchFlag === 0 || patchFlag === 32
  /* HYDRATE_EVENTS */
  ) && (hasRef || runtimeDirectives.length > 0)) {
    patchFlag |= 512
    /* NEED_PATCH */
    ;
  }

  return {
    props: propsExpression,
    directives: runtimeDirectives,
    patchFlag: patchFlag,
    dynamicPropNames: dynamicPropNames
  };
} // Dedupe props in an object literal.
// Literal duplicated attributes would have been warned during the parse phase,
// however, it's possible to encounter duplicated `onXXX` handlers with different
// modifiers. We also need to merge static and dynamic class / style attributes.
// - onXXX handlers / style: merge into array
// - class: merge into single expression with concatenation


function dedupeProperties(properties) {
  var knownProps = new Map();
  var deduped = [];

  for (var i = 0; i < properties.length; i++) {
    var prop = properties[i]; // dynamic keys are always allowed

    if (prop.key.type === 8
    /* COMPOUND_EXPRESSION */
    || !prop.key.isStatic) {
      deduped.push(prop);
      continue;
    }

    var name = prop.key.content;
    var existing = knownProps.get(name);

    if (existing) {
      if (name === 'style' || name === 'class' || name.startsWith('on')) {
        mergeAsArray(existing, prop);
      } // unexpected duplicate, should have emitted error during parse

    } else {
      knownProps.set(name, prop);
      deduped.push(prop);
    }
  }

  return deduped;
}

function mergeAsArray(existing, incoming) {
  if (existing.value.type === 17
  /* JS_ARRAY_EXPRESSION */
  ) {
      existing.value.elements.push(incoming.value);
    } else {
    existing.value = createArrayExpression([existing.value, incoming.value], existing.loc);
  }
}

function buildDirectiveArgs(dir, context) {
  var dirArgs = [];
  var runtime = directiveImportMap.get(dir);

  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  } else {
    // inject statement for resolving directive
    context.helper(RESOLVE_DIRECTIVE);
    context.directives.add(dir.name);
    dirArgs.push(toValidAssetId(dir.name, "directive"));
  }

  var loc = dir.loc;
  if (dir.exp) dirArgs.push(dir.exp);

  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push("void 0");
    }

    dirArgs.push(dir.arg);
  }

  if (Object.keys(dir.modifiers).length) {
    if (!dir.arg) {
      if (!dir.exp) {
        dirArgs.push("void 0");
      }

      dirArgs.push("void 0");
    }

    var trueExpression = createSimpleExpression("true", false, loc);
    dirArgs.push(createObjectExpression(dir.modifiers.map(function (modifier) {
      return createObjectProperty(modifier, trueExpression);
    }), loc));
  }

  return createArrayExpression(dirArgs, dir.loc);
}

function stringifyDynamicPropNames(props) {
  var propsNamesString = "[";

  for (var i = 0, l = props.length; i < l; i++) {
    propsNamesString += JSON.stringify(props[i]);
    if (i < l - 1) propsNamesString += ', ';
  }

  return propsNamesString + "]";
}

var transformSlotOutlet = function transformSlotOutlet(node, context) {
  if (isSlotOutlet(node)) {
    var children = node.children,
        loc = node.loc;

    var _processSlotOutlet = processSlotOutlet(node, context),
        slotName = _processSlotOutlet.slotName,
        slotProps = _processSlotOutlet.slotProps;

    var slotArgs = [context.prefixIdentifiers ? "_ctx.$slots" : "$slots", slotName];

    if (slotProps) {
      slotArgs.push(slotProps);
    }

    if (children.length) {
      if (!slotProps) {
        slotArgs.push("{}");
      }

      slotArgs.push(createFunctionExpression([], children, false, false, loc));
    }

    node.codegenNode = createCallExpression(context.helper(RENDER_SLOT), slotArgs, loc);
  }
};

function processSlotOutlet(node, context) {
  var slotName = "\"default\"";
  var slotProps = undefined; // check for <slot name="xxx" OR :name="xxx" />

  var name = findProp(node, 'name');

  if (name) {
    if (name.type === 6
    /* ATTRIBUTE */
    && name.value) {
      // static name
      slotName = JSON.stringify(name.value.content);
    } else if (name.type === 7
    /* DIRECTIVE */
    && name.exp) {
      // dynamic name
      slotName = name.exp;
    }
  }

  var propsWithoutName = name ? node.props.filter(function (p) {
    return p !== name;
  }) : node.props;

  if (propsWithoutName.length > 0) {
    var _buildProps = buildProps(node, context, propsWithoutName),
        props = _buildProps.props,
        directives = _buildProps.directives;

    slotProps = props;

    if (directives.length) {
      context.onError(createCompilerError(33
      /* X_V_SLOT_UNEXPECTED_DIRECTIVE_ON_SLOT_OUTLET */
      , directives[0].loc));
    }
  }

  return {
    slotName: slotName,
    slotProps: slotProps
  };
}

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;

var transformOn = function transformOn(dir, node, context, augmentor) {
  var loc = dir.loc,
      modifiers = dir.modifiers,
      arg = dir.arg;

  if (!dir.exp && !modifiers.length) {
    context.onError(createCompilerError(32
    /* X_V_ON_NO_EXPRESSION */
    , loc));
  }

  var eventName;

  if (arg.type === 4
  /* SIMPLE_EXPRESSION */
  ) {
      if (arg.isStatic) {
        var rawName = arg.content; // for @vnode-xxx event listeners, auto convert it to camelCase

        var normalizedName = rawName.startsWith("vnode") ? capitalize(camelize(rawName)) : capitalize(rawName);
        eventName = createSimpleExpression("on".concat(normalizedName), true, arg.loc);
      } else {
        eventName = createCompoundExpression(["\"on\" + (", arg, ")"]);
      }
    } else {
    // already a compound expression.
    eventName = arg;
    eventName.children.unshift("\"on\" + (");
    eventName.children.push(")");
  } // handler processing


  var exp = dir.exp;

  if (exp && !exp.content.trim()) {
    exp = undefined;
  }

  var isCacheable = !exp;

  if (exp) {
    var isMemberExp = isMemberExpression(exp.content);
    var isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
    var hasMultipleStatements = exp.content.includes(";");
    {
      validateBrowserExpression(exp, context, false, hasMultipleStatements);
    }

    if (isInlineStatement || isCacheable && isMemberExp) {
      // wrap inline statement in a function expression
      exp = createCompoundExpression(["".concat(isInlineStatement ? "$event" : "($event, ...args)", " => ").concat(hasMultipleStatements ? "{" : "("), exp, hasMultipleStatements ? "}" : ")"]);
    }
  }

  var ret = {
    props: [createObjectProperty(eventName, exp || createSimpleExpression("() => {}", false, loc))]
  }; // apply extended compiler augmentor

  if (augmentor) {
    ret = augmentor(ret);
  }

  if (isCacheable) {
    // cache handlers so that it's always the same handler being passed down.
    // this avoids unnecessary re-renders when users use inline handlers on
    // components.
    ret.props[0].value = context.cache(ret.props[0].value);
  }

  return ret;
}; // v-bind without arg is handled directly in ./transformElements.ts due to it affecting
// codegen for the entire props object. This transform here is only for v-bind
// *with* args.


var transformBind = function transformBind(dir, node, context) {
  var exp = dir.exp,
      modifiers = dir.modifiers,
      loc = dir.loc;
  var arg = dir.arg;

  if (!exp || exp.type === 4
  /* SIMPLE_EXPRESSION */
  && !exp.content) {
    context.onError(createCompilerError(31
    /* X_V_BIND_NO_EXPRESSION */
    , loc));
  } // .prop is no longer necessary due to new patch behavior
  // .sync is replaced by v-model:arg


  if (modifiers.includes('camel')) {
    if (arg.type === 4
    /* SIMPLE_EXPRESSION */
    ) {
        if (arg.isStatic) {
          arg.content = camelize(arg.content);
        } else {
          arg.content = "".concat(context.helperString(CAMELIZE), "(").concat(arg.content, ")");
        }
      } else {
      arg.children.unshift("".concat(context.helperString(CAMELIZE), "("));
      arg.children.push(")");
    }
  }

  return {
    props: [createObjectProperty(arg, exp || createSimpleExpression('', true, loc))]
  };
}; // Merge adjacent text nodes and expressions into a single expression
// e.g. <div>abc {{ d }} {{ e }}</div> should have a single expression node as child.


var transformText = function transformText(node, context) {
  if (node.type === 0
  /* ROOT */
  || node.type === 1
  /* ELEMENT */
  || node.type === 11
  /* FOR */
  || node.type === 10
  /* IF_BRANCH */
  ) {
      // perform the transform on node exit so that all expressions have already
      // been processed.
      return function () {
        var children = node.children;
        var currentContainer = undefined;
        var hasText = false;

        for (var i = 0; i < children.length; i++) {
          var child = children[i];

          if (isText(child)) {
            hasText = true;

            for (var j = i + 1; j < children.length; j++) {
              var next = children[j];

              if (isText(next)) {
                if (!currentContainer) {
                  currentContainer = children[i] = {
                    type: 8
                    /* COMPOUND_EXPRESSION */
                    ,
                    loc: child.loc,
                    children: [child]
                  };
                } // merge adjacent text node into current


                currentContainer.children.push(" + ", next);
                children.splice(j, 1);
                j--;
              } else {
                currentContainer = undefined;
                break;
              }
            }
          }
        }

        if (!hasText || // if this is a plain element with a single text child, leave it
        // as-is since the runtime has dedicated fast path for this by directly
        // setting textContent of the element.
        // for component root it's always normalized anyway.
        children.length === 1 && (node.type === 0
        /* ROOT */
        || node.type === 1
        /* ELEMENT */
        && node.tagType === 0
        /* ELEMENT */
        )) {
          return;
        } // pre-convert text nodes into createTextVNode(text) calls to avoid
        // runtime normalization.


        for (var _i8 = 0; _i8 < children.length; _i8++) {
          var _child = children[_i8];

          if (isText(_child) || _child.type === 8
          /* COMPOUND_EXPRESSION */
          ) {
              var callArgs = []; // createTextVNode defaults to single whitespace, so if it is a
              // single space the code could be an empty call to save bytes.

              if (_child.type !== 2
              /* TEXT */
              || _child.content !== ' ') {
                callArgs.push(_child);
              } // mark dynamic text with flag so it gets patched inside a block


              if (!context.ssr && _child.type !== 2
              /* TEXT */
              ) {
                  callArgs.push("".concat(1
                  /* TEXT */
                  , " /* ", PatchFlagNames[1
                  /* TEXT */
                  ], " */"));
                }

              children[_i8] = {
                type: 12
                /* TEXT_CALL */
                ,
                content: _child,
                loc: _child.loc,
                codegenNode: createCallExpression(context.helper(CREATE_TEXT), callArgs)
              };
            }
        }
      };
    }
};

var transformOnce = function transformOnce(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && findDir(node, 'once', true)) {
    context.helper(SET_BLOCK_TRACKING);
    return function () {
      if (node.codegenNode) {
        node.codegenNode = context.cache(node.codegenNode, true
        /* isVNode */
        );
      }
    };
  }
};

var transformModel = function transformModel(dir, node, context) {
  var exp = dir.exp,
      arg = dir.arg;

  if (!exp) {
    context.onError(createCompilerError(38
    /* X_V_MODEL_NO_EXPRESSION */
    , dir.loc));
    return createTransformProps();
  }

  var expString = exp.type === 4
  /* SIMPLE_EXPRESSION */
  ? exp.content : exp.loc.source;

  if (!isMemberExpression(expString)) {
    context.onError(createCompilerError(39
    /* X_V_MODEL_MALFORMED_EXPRESSION */
    , exp.loc));
    return createTransformProps();
  }

  var propName = arg ? arg : createSimpleExpression('modelValue', true);
  var eventName = arg ? arg.type === 4
  /* SIMPLE_EXPRESSION */
  && arg.isStatic ? "onUpdate:".concat(arg.content) : createCompoundExpression(['"onUpdate:" + ', arg]) : "onUpdate:modelValue";
  var props = [// modelValue: foo
  createObjectProperty(propName, dir.exp), // "onUpdate:modelValue": $event => (foo = $event)
  createObjectProperty(eventName, createCompoundExpression(["$event => (", exp, " = $event)"]))]; // modelModifiers: { foo: true, "bar-baz": true }

  if (dir.modifiers.length && node.tagType === 1
  /* COMPONENT */
  ) {
      var modifiers = dir.modifiers.map(function (m) {
        return (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + ": true";
      }).join(", ");
      var modifiersKey = arg ? arg.type === 4
      /* SIMPLE_EXPRESSION */
      && arg.isStatic ? "".concat(arg.content, "Modifiers") : createCompoundExpression([arg, ' + "Modifiers"']) : "modelModifiers";
      props.push(createObjectProperty(modifiersKey, createSimpleExpression("{ ".concat(modifiers, " }"), false, dir.loc, true)));
    }

  return createTransformProps(props);
};

function createTransformProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    props: props
  };
}

function getBaseTransformPreset(prefixIdentifiers) {
  return [[transformOnce, transformIf, transformFor].concat([transformExpression], [transformSlotOutlet, transformElement, trackSlotScopes, transformText]), {
    on: transformOn,
    bind: transformBind,
    model: transformModel
  }];
} // we name it `baseCompile` so that higher order compilers like
// @vue/compiler-dom can export `compile` while re-exporting everything else.


function baseCompile(template) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onError = options.onError || defaultOnError;
  var isModuleMode = options.mode === 'module';
  /* istanbul ignore if */

  {
    if (options.prefixIdentifiers === true) {
      onError(createCompilerError(43
      /* X_PREFIX_ID_NOT_SUPPORTED */
      ));
    } else if (isModuleMode) {
      onError(createCompilerError(44
      /* X_MODULE_MODE_NOT_SUPPORTED */
      ));
    }
  }
  var prefixIdentifiers = !true;

  if (options.cacheHandlers) {
    onError(createCompilerError(45
    /* X_CACHE_HANDLER_NOT_SUPPORTED */
    ));
  }

  if (options.scopeId && !isModuleMode) {
    onError(createCompilerError(46
    /* X_SCOPE_ID_NOT_SUPPORTED */
    ));
  }

  var ast = isString(template) ? baseParse(template, options) : template;

  var _getBaseTransformPres = getBaseTransformPreset(),
      _getBaseTransformPres2 = _slicedToArray(_getBaseTransformPres, 2),
      nodeTransforms = _getBaseTransformPres2[0],
      directiveTransforms = _getBaseTransformPres2[1];

  transform(ast, extend({}, options, {
    prefixIdentifiers: prefixIdentifiers,
    nodeTransforms: [].concat(_toConsumableArray(nodeTransforms), _toConsumableArray(options.nodeTransforms || [])),
    directiveTransforms: extend({}, directiveTransforms, options.directiveTransforms || {} // user transforms
    )
  }));
  return generate(ast, extend({}, options, {
    prefixIdentifiers: prefixIdentifiers
  }));
}

var noopDirectiveTransform = function noopDirectiveTransform() {
  return {
    props: []
  };
};

var V_MODEL_RADIO = Symbol("vModelRadio");
var V_MODEL_CHECKBOX = Symbol("vModelCheckbox");
var V_MODEL_TEXT = Symbol("vModelText");
var V_MODEL_SELECT = Symbol("vModelSelect");
var V_MODEL_DYNAMIC = Symbol("vModelDynamic");
var V_ON_WITH_MODIFIERS = Symbol("vOnModifiersGuard");
var V_ON_WITH_KEYS = Symbol("vOnKeysGuard");
var V_SHOW = Symbol("vShow");
var TRANSITION = Symbol("Transition");
var TRANSITION_GROUP = Symbol("TransitionGroup");
registerRuntimeHelpers((_registerRuntimeHelpe = {}, _defineProperty(_registerRuntimeHelpe, V_MODEL_RADIO, "vModelRadio"), _defineProperty(_registerRuntimeHelpe, V_MODEL_CHECKBOX, "vModelCheckbox"), _defineProperty(_registerRuntimeHelpe, V_MODEL_TEXT, "vModelText"), _defineProperty(_registerRuntimeHelpe, V_MODEL_SELECT, "vModelSelect"), _defineProperty(_registerRuntimeHelpe, V_MODEL_DYNAMIC, "vModelDynamic"), _defineProperty(_registerRuntimeHelpe, V_ON_WITH_MODIFIERS, "withModifiers"), _defineProperty(_registerRuntimeHelpe, V_ON_WITH_KEYS, "withKeys"), _defineProperty(_registerRuntimeHelpe, V_SHOW, "vShow"), _defineProperty(_registerRuntimeHelpe, TRANSITION, "Transition"), _defineProperty(_registerRuntimeHelpe, TRANSITION_GROUP, "TransitionGroup"), _registerRuntimeHelpe));
/* eslint-disable no-restricted-globals */

var decoder;

function decodeHtmlBrowser(raw) {
  (decoder || (decoder = document.createElement('div'))).innerHTML = raw;
  return decoder.textContent;
}

var isRawTextContainer = /*#__PURE__*/makeMap('style,iframe,script,noscript', true);
var parserOptions = {
  isVoidTag: isVoidTag,
  isNativeTag: function isNativeTag(tag) {
    return isHTMLTag(tag) || isSVGTag(tag);
  },
  isPreTag: function isPreTag(tag) {
    return tag === 'pre';
  },
  decodeEntities: decodeHtmlBrowser,
  isBuiltInComponent: function isBuiltInComponent(tag) {
    if (isBuiltInType(tag, "Transition")) {
      return TRANSITION;
    } else if (isBuiltInType(tag, "TransitionGroup")) {
      return TRANSITION_GROUP;
    }
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace: function getNamespace(tag, parent) {
    var ns = parent ? parent.ns : 0
    /* HTML */
    ;

    if (parent && ns === 2
    /* MATH_ML */
    ) {
        if (parent.tag === 'annotation-xml') {
          if (tag === 'svg') {
            return 1
            /* SVG */
            ;
          }

          if (parent.props.some(function (a) {
            return a.type === 6
            /* ATTRIBUTE */
            && a.name === 'encoding' && a.value != null && (a.value.content === 'text/html' || a.value.content === 'application/xhtml+xml');
          })) {
            ns = 0
            /* HTML */
            ;
          }
        } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== 'mglyph' && tag !== 'malignmark') {
          ns = 0
          /* HTML */
          ;
        }
      } else if (parent && ns === 1
    /* SVG */
    ) {
        if (parent.tag === 'foreignObject' || parent.tag === 'desc' || parent.tag === 'title') {
          ns = 0
          /* HTML */
          ;
        }
      }

    if (ns === 0
    /* HTML */
    ) {
        if (tag === 'svg') {
          return 1
          /* SVG */
          ;
        }

        if (tag === 'math') {
          return 2
          /* MATH_ML */
          ;
        }
      }

    return ns;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
  getTextMode: function getTextMode(_ref10) {
    var tag = _ref10.tag,
        ns = _ref10.ns;

    if (ns === 0
    /* HTML */
    ) {
        if (tag === 'textarea' || tag === 'title') {
          return 1
          /* RCDATA */
          ;
        }

        if (isRawTextContainer(tag)) {
          return 2
          /* RAWTEXT */
          ;
        }
      }

    return 0
    /* DATA */
    ;
  }
}; // Parse inline CSS strings for static style attributes into an object.
// This is a NodeTransform since it works on the static `style` attribute and
// converts it into a dynamic equivalent:
// style="color: red" -> :style='{ "color": "red" }'
// It is then processed by `transformElement` and included in the generated
// props.

var transformStyle = function transformStyle(node) {
  if (node.type === 1
  /* ELEMENT */
  ) {
      node.props.forEach(function (p, i) {
        if (p.type === 6
        /* ATTRIBUTE */
        && p.name === 'style' && p.value) {
          // replace p with an expression node
          node.props[i] = {
            type: 7
            /* DIRECTIVE */
            ,
            name: "bind",
            arg: createSimpleExpression("style", true, p.loc),
            exp: parseInlineCSS(p.value.content, p.loc),
            modifiers: [],
            loc: p.loc
          };
        }
      });
    }
};

var parseInlineCSS = function parseInlineCSS(cssText, loc) {
  var normalized = parseStringStyle(cssText);
  return createSimpleExpression(JSON.stringify(normalized), false, loc, true);
};

function createDOMCompilerError(code, loc) {
  return createCompilerError(code, loc, DOMErrorMessages);
}

var DOMErrorMessages = (_DOMErrorMessages = {}, _defineProperty(_DOMErrorMessages, 47
/* X_V_HTML_NO_EXPRESSION */
, "v-html is missing expression."), _defineProperty(_DOMErrorMessages, 48
/* X_V_HTML_WITH_CHILDREN */
, "v-html will override element children."), _defineProperty(_DOMErrorMessages, 49
/* X_V_TEXT_NO_EXPRESSION */
, "v-text is missing expression."), _defineProperty(_DOMErrorMessages, 50
/* X_V_TEXT_WITH_CHILDREN */
, "v-text will override element children."), _defineProperty(_DOMErrorMessages, 51
/* X_V_MODEL_ON_INVALID_ELEMENT */
, "v-model can only be used on <input>, <textarea> and <select> elements."), _defineProperty(_DOMErrorMessages, 52
/* X_V_MODEL_ARG_ON_ELEMENT */
, "v-model argument is not supported on plain elements."), _defineProperty(_DOMErrorMessages, 53
/* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
, "v-model cannot used on file inputs since they are read-only. Use a v-on:change listener instead."), _defineProperty(_DOMErrorMessages, 54
/* X_V_MODEL_UNNECESSARY_VALUE */
, "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior."), _defineProperty(_DOMErrorMessages, 55
/* X_V_SHOW_NO_EXPRESSION */
, "v-show is missing expression."), _defineProperty(_DOMErrorMessages, 56
/* X_TRANSITION_INVALID_CHILDREN */
, "<Transition> expects exactly one child element or component."), _DOMErrorMessages);

var transformVHtml = function transformVHtml(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(47
    /* X_V_HTML_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(48
    /* X_V_HTML_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression("innerHTML", true, loc), exp || createSimpleExpression('', true))]
  };
};

var transformVText = function transformVText(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(49
    /* X_V_TEXT_NO_EXPRESSION */
    , loc));
  }

  if (node.children.length) {
    context.onError(createDOMCompilerError(50
    /* X_V_TEXT_WITH_CHILDREN */
    , loc));
    node.children.length = 0;
  }

  return {
    props: [createObjectProperty(createSimpleExpression("textContent", true, loc), exp || createSimpleExpression('', true))]
  };
};

var transformModel$1 = function transformModel$1(dir, node, context) {
  var baseResult = transformModel(dir, node, context); // base transform has errors OR component v-model (only need props)

  if (!baseResult.props.length || node.tagType === 1
  /* COMPONENT */
  ) {
      return baseResult;
    }

  if (dir.arg) {
    context.onError(createDOMCompilerError(52
    /* X_V_MODEL_ARG_ON_ELEMENT */
    , dir.arg.loc));
  }

  function checkDuplicatedValue() {
    var value = findProp(node, 'value');

    if (value) {
      context.onError(createDOMCompilerError(54
      /* X_V_MODEL_UNNECESSARY_VALUE */
      , value.loc));
    }
  }

  var tag = node.tag;

  if (tag === 'input' || tag === 'textarea' || tag === 'select') {
    var directiveToUse = V_MODEL_TEXT;
    var isInvalidType = false;

    if (tag === 'input') {
      var type = findProp(node, "type");

      if (type) {
        if (type.type === 7
        /* DIRECTIVE */
        ) {
            // :type="foo"
            directiveToUse = V_MODEL_DYNAMIC;
          } else if (type.value) {
          switch (type.value.content) {
            case 'radio':
              directiveToUse = V_MODEL_RADIO;
              break;

            case 'checkbox':
              directiveToUse = V_MODEL_CHECKBOX;
              break;

            case 'file':
              isInvalidType = true;
              context.onError(createDOMCompilerError(53
              /* X_V_MODEL_ON_FILE_INPUT_ELEMENT */
              , dir.loc));
              break;

            default:
              // text type
              checkDuplicatedValue();
              break;
          }
        }
      } else if (hasDynamicKeyVBind(node)) {
        // element has bindings with dynamic keys, which can possibly contain
        // "type".
        directiveToUse = V_MODEL_DYNAMIC;
      } else {
        // text type
        checkDuplicatedValue();
      }
    } else if (tag === 'select') {
      directiveToUse = V_MODEL_SELECT;
    } else if (tag === 'textarea') {
      checkDuplicatedValue();
    } // inject runtime directive
    // by returning the helper symbol via needRuntime
    // the import will replaced a resolveDirective call.


    if (!isInvalidType) {
      baseResult.needRuntime = context.helper(directiveToUse);
    }
  } else {
    context.onError(createDOMCompilerError(51
    /* X_V_MODEL_ON_INVALID_ELEMENT */
    , dir.loc));
  } // native vmodel doesn't need the `modelValue` props since they are also
  // passed to the runtime as `binding.value`. removing it reduces code size.


  baseResult.props = baseResult.props.filter(function (p) {
    if (p.key.type === 4
    /* SIMPLE_EXPRESSION */
    && p.key.content === 'modelValue') {
      return false;
    }

    return true;
  });
  return baseResult;
};

var isEventOptionModifier = /*#__PURE__*/makeMap("passive,once,capture");
var isNonKeyModifier = /*#__PURE__*/makeMap( // event propagation management
"stop,prevent,self," + // system modifiers + exact
"ctrl,shift,alt,meta,exact," + // mouse
"left,middle,right");
var isKeyboardEvent = /*#__PURE__*/makeMap("onkeyup,onkeydown,onkeypress", true);

var generateModifiers = function generateModifiers(modifiers) {
  var keyModifiers = [];
  var nonKeyModifiers = [];
  var eventOptionModifiers = [];

  for (var i = 0; i < modifiers.length; i++) {
    var modifier = modifiers[i];

    if (isEventOptionModifier(modifier)) {
      // eventOptionModifiers: modifiers for addEventListener() options, e.g. .passive & .capture
      eventOptionModifiers.push(modifier);
    } else {
      // runtimeModifiers: modifiers that needs runtime guards
      if (isNonKeyModifier(modifier)) {
        nonKeyModifiers.push(modifier);
      } else {
        keyModifiers.push(modifier);
      }
    }
  }

  return {
    keyModifiers: keyModifiers,
    nonKeyModifiers: nonKeyModifiers,
    eventOptionModifiers: eventOptionModifiers
  };
};

var transformClick = function transformClick(key, event) {
  var isStaticClick = key.type === 4
  /* SIMPLE_EXPRESSION */
  && key.isStatic && key.content.toLowerCase() === 'onclick';
  return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4
  /* SIMPLE_EXPRESSION */
  ? createCompoundExpression(["(", key, ").toLowerCase() === \"onclick\" ? \"".concat(event, "\" : ("), key, ")"]) : key;
};

var transformOn$1 = function transformOn$1(dir, node, context) {
  return transformOn(dir, node, context, function (baseResult) {
    var modifiers = dir.modifiers;
    if (!modifiers.length) return baseResult;
    var _baseResult$props$ = baseResult.props[0],
        key = _baseResult$props$.key,
        handlerExp = _baseResult$props$.value;

    var _generateModifiers = generateModifiers(modifiers),
        keyModifiers = _generateModifiers.keyModifiers,
        nonKeyModifiers = _generateModifiers.nonKeyModifiers,
        eventOptionModifiers = _generateModifiers.eventOptionModifiers; // normalize click.right and click.middle since they don't actually fire


    if (nonKeyModifiers.includes('right')) {
      key = transformClick(key, "onContextmenu");
    }

    if (nonKeyModifiers.includes('middle')) {
      key = transformClick(key, "onMouseup");
    }

    if (nonKeyModifiers.length) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [handlerExp, JSON.stringify(nonKeyModifiers)]);
    }

    if (keyModifiers.length && ( // if event name is dynamic, always wrap with keys guard
    key.type === 8
    /* COMPOUND_EXPRESSION */
    || !key.isStatic || isKeyboardEvent(key.content))) {
      handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [handlerExp, JSON.stringify(keyModifiers)]);
    }

    if (eventOptionModifiers.length) {
      handlerExp = createObjectExpression([createObjectProperty('handler', handlerExp), createObjectProperty('options', createObjectExpression(eventOptionModifiers.map(function (modifier) {
        return createObjectProperty(modifier, createSimpleExpression('true', false));
      })))]);
    }

    return {
      props: [createObjectProperty(key, handlerExp)]
    };
  });
};

var transformShow = function transformShow(dir, node, context) {
  var exp = dir.exp,
      loc = dir.loc;

  if (!exp) {
    context.onError(createDOMCompilerError(55
    /* X_V_SHOW_NO_EXPRESSION */
    , loc));
  }

  return {
    props: [],
    needRuntime: context.helper(V_SHOW)
  };
};

var warnTransitionChildren = function warnTransitionChildren(node, context) {
  if (node.type === 1
  /* ELEMENT */
  && node.tagType === 1
  /* COMPONENT */
  ) {
      var component = context.isBuiltInComponent(node.tag);

      if (component === TRANSITION) {
        return function () {
          if (node.children.length && hasMultipleChildren(node)) {
            context.onError(createDOMCompilerError(56
            /* X_TRANSITION_INVALID_CHILDREN */
            , {
              start: node.children[0].loc.start,
              end: node.children[node.children.length - 1].loc.end,
              source: ''
            }));
          }
        };
      }
    }
};

function hasMultipleChildren(node) {
  // #1352 filter out potential comment nodes.
  var children = node.children = node.children.filter(function (c) {
    return c.type !== 3;
  }
  /* COMMENT */
  );
  var child = children[0];
  return children.length !== 1 || child.type === 11
  /* FOR */
  || child.type === 9
  /* IF */
  && child.branches.some(hasMultipleChildren);
}

var DOMNodeTransforms = [transformStyle].concat([warnTransitionChildren]);
var DOMDirectiveTransforms = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel$1,
  on: transformOn$1,
  show: transformShow
};

function compile(template) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return baseCompile(template, extend({}, parserOptions, options, {
    nodeTransforms: [].concat(_toConsumableArray(DOMNodeTransforms), _toConsumableArray(options.nodeTransforms || [])),
    directiveTransforms: extend({}, DOMDirectiveTransforms, options.directiveTransforms || {}),
    transformHoist: null
  }));
}

var targetMap = new WeakMap();
exports.targetMap = targetMap;
var effectStack = [];
var activeEffect;
var ITERATE_KEY = Symbol('iterate');
var MAP_KEY_ITERATE_KEY = Symbol('Map key iterate');

function isEffect(fn) {
  return fn && fn._isEffect === true;
}

function effect(fn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EMPTY_OBJ;

  if (isEffect(fn)) {
    fn = fn.raw;
  }

  var effect = createReactiveEffect(fn, options);

  if (!options.lazy) {
    effect();
  }

  return effect;
}

function stop(effect) {
  if (effect.active) {
    cleanup(effect);

    if (effect.options.onStop) {
      effect.options.onStop();
    }

    effect.active = false;
  }
}

var uid = 0;

function createReactiveEffect(fn, options) {
  var effect = function reactiveEffect() {
    if (!effect.active) {
      return options.scheduler ? undefined : fn.apply(void 0, arguments);
    }

    if (!effectStack.includes(effect)) {
      cleanup(effect);

      try {
        enableTracking();
        effectStack.push(effect);
        activeEffect = effect;
        return fn.apply(void 0, arguments);
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };

  effect.id = uid++;
  effect._isEffect = true;
  effect.active = true;
  effect.raw = fn;
  effect.deps = [];
  effect.options = options;
  return effect;
}

function cleanup(effect) {
  var deps = effect.deps;

  if (deps.length) {
    for (var i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }

    deps.length = 0;
  }
}

var shouldTrack = true;
var trackStack = [];

function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}

function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}

function resetTracking() {
  var last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
}

function track(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }

  var depsMap = targetMap.get(target);

  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }

  var dep = depsMap.get(key);

  if (!dep) {
    depsMap.set(key, dep = new Set());
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);

    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target: target,
        type: type,
        key: key
      });
    }
  }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
  var depsMap = targetMap.get(target);

  if (!depsMap) {
    // never been tracked
    return;
  }

  var effects = new Set();

  var add = function add(effectsToAdd) {
    if (effectsToAdd) {
      effectsToAdd.forEach(function (effect) {
        if (effect !== activeEffect || !shouldTrack) {
          effects.add(effect);
        }
      });
    }
  };

  if (type === "clear"
  /* CLEAR */
  ) {
      // collection being cleared
      // trigger all effects for target
      depsMap.forEach(add);
    } else if (key === 'length' && isArray(target)) {
    depsMap.forEach(function (dep, key) {
      if (key === 'length' || key >= newValue) {
        add(dep);
      }
    });
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      add(depsMap.get(key));
    } // also run for iteration key on ADD | DELETE | Map.SET


    var isAddOrDelete = type === "add"
    /* ADD */
    || type === "delete"
    /* DELETE */
    && !isArray(target);

    if (isAddOrDelete || type === "set"
    /* SET */
    && target instanceof Map) {
      add(depsMap.get(isArray(target) ? 'length' : ITERATE_KEY));
    }

    if (isAddOrDelete && target instanceof Map) {
      add(depsMap.get(MAP_KEY_ITERATE_KEY));
    }
  }

  var run = function run(effect) {
    if (effect.options.onTrigger) {
      effect.options.onTrigger({
        effect: effect,
        target: target,
        key: key,
        type: type,
        newValue: newValue,
        oldValue: oldValue,
        oldTarget: oldTarget
      });
    }

    if (effect.options.scheduler) {
      effect.options.scheduler(effect);
    } else {
      effect();
    }
  };

  effects.forEach(run);
}

var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map(function (key) {
  return Symbol[key];
}).filter(isSymbol));
var get = /*#__PURE__*/createGetter();
var shallowGet = /*#__PURE__*/createGetter(false, true);
var readonlyGet = /*#__PURE__*/createGetter(true);
var shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
var arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(function (key) {
  arrayInstrumentations[key] = function () {
    var arr = toRaw(this);

    for (var i = 0, l = this.length; i < l; i++) {
      track(arr, "get"
      /* GET */
      , i + '');
    } // we run the method using the original args first (which may be reactive)


    for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var res = arr[key].apply(arr, args);

    if (res === -1 || res === false) {
      // if that didn't work, run it again using raw values.
      return arr[key].apply(arr, _toConsumableArray(args.map(toRaw)));
    } else {
      return res;
    }
  };
});

function createGetter() {
  var isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function get(target, key, receiver) {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
        return !isReadonly;
      } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
        return isReadonly;
      } else if (key === "__v_raw"
    /* RAW */
    && receiver === (isReadonly ? target["__v_readonly"
    /* READONLY */
    ] : target["__v_reactive"
    /* REACTIVE */
    ])) {
      return target;
    }

    var targetIsArray = isArray(target);

    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }

    var res = Reflect.get(target, key, receiver);

    if (isSymbol(key) ? builtInSymbols.has(key) : key === "__proto__" || key === "__v_isRef") {
      return res;
    }

    if (!isReadonly) {
      track(target, "get"
      /* GET */
      , key);
    }

    if (shallow) {
      return res;
    }

    if (isRef(res)) {
      // ref unwrapping, only for Objects, not for Arrays.
      return targetIsArray ? res : res.value;
    }

    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res);
    }

    return res;
  };
}

var set = /*#__PURE__*/createSetter();
var shallowSet = /*#__PURE__*/createSetter(true);

function createSetter() {
  var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function set(target, key, value, receiver) {
    var oldValue = target[key];

    if (!shallow) {
      value = toRaw(value);

      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }

    var hadKey = hasOwn(target, key);
    var result = Reflect.set(target, key, value, receiver); // don't trigger if target is something up in the prototype chain of original

    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add"
        /* ADD */
        , key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set"
        /* SET */
        , key, value, oldValue);
      }
    }

    return result;
  };
}

function deleteProperty(target, key) {
  var hadKey = hasOwn(target, key);
  var oldValue = target[key];
  var result = Reflect.deleteProperty(target, key);

  if (result && hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function has(target, key) {
  var result = Reflect.has(target, key);
  track(target, "has"
  /* HAS */
  , key);
  return result;
}

function ownKeys(target) {
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.ownKeys(target);
}

var mutableHandlers = {
  get: get,
  set: set,
  deleteProperty: deleteProperty,
  has: has,
  ownKeys: ownKeys
};
var readonlyHandlers = {
  get: readonlyGet,
  has: has,
  ownKeys: ownKeys,
  set: function set(target, key) {
    {
      console.warn("Set operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
    }
    return true;
  },
  deleteProperty: function deleteProperty(target, key) {
    {
      console.warn("Delete operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
    }
    return true;
  }
};
var shallowReactiveHandlers = extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
}); // Props handlers are special in the sense that it should not unwrap top-level
// refs (in order to allow refs to be explicitly passed down), but should
// retain the reactivity of the normal readonly object.

var shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});

var toReactive = function toReactive(value) {
  return isObject(value) ? reactive(value) : value;
};

var toReadonly = function toReadonly(value) {
  return isObject(value) ? readonly(value) : value;
};

var toShallow = function toShallow(value) {
  return value;
};

var getProto = function getProto(v) {
  return Reflect.getPrototypeOf(v);
};

function get$1(target, key, wrap) {
  target = toRaw(target);
  var rawKey = toRaw(key);

  if (key !== rawKey) {
    track(target, "get"
    /* GET */
    , key);
  }

  track(target, "get"
  /* GET */
  , rawKey);

  var _getProto = getProto(target),
      has = _getProto.has,
      get = _getProto.get;

  if (has.call(target, key)) {
    return wrap(get.call(target, key));
  } else if (has.call(target, rawKey)) {
    return wrap(get.call(target, rawKey));
  }
}

function has$1(key) {
  var target = toRaw(this);
  var rawKey = toRaw(key);

  if (key !== rawKey) {
    track(target, "has"
    /* HAS */
    , key);
  }

  track(target, "has"
  /* HAS */
  , rawKey);
  var has = getProto(target).has;
  return has.call(target, key) || has.call(target, rawKey);
}

function size(target) {
  target = toRaw(target);
  track(target, "iterate"
  /* ITERATE */
  , ITERATE_KEY);
  return Reflect.get(getProto(target), 'size', target);
}

function add(value) {
  value = toRaw(value);
  var target = toRaw(this);
  var proto = getProto(target);
  var hadKey = proto.has.call(target, value);
  var result = proto.add.call(target, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , value, value);
  }

  return result;
}

function set$1(key, value) {
  value = toRaw(value);
  var target = toRaw(this);

  var _getProto2 = getProto(target),
      has = _getProto2.has,
      get = _getProto2.get,
      set = _getProto2.set;

  var hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else {
    checkIdentityKeys(target, has, key);
  }

  var oldValue = get.call(target, key);
  var result = set.call(target, key, value);

  if (!hadKey) {
    trigger(target, "add"
    /* ADD */
    , key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set"
    /* SET */
    , key, value, oldValue);
  }

  return result;
}

function deleteEntry(key) {
  var target = toRaw(this);

  var _getProto3 = getProto(target),
      has = _getProto3.has,
      get = _getProto3.get,
      del = _getProto3.delete;

  var hadKey = has.call(target, key);

  if (!hadKey) {
    key = toRaw(key);
    hadKey = has.call(target, key);
  } else {
    checkIdentityKeys(target, has, key);
  }

  var oldValue = get ? get.call(target, key) : undefined; // forward the operation before queueing reactions

  var result = del.call(target, key);

  if (hadKey) {
    trigger(target, "delete"
    /* DELETE */
    , key, undefined, oldValue);
  }

  return result;
}

function clear() {
  var target = toRaw(this);
  var hadItems = target.size !== 0;
  var oldTarget = target instanceof Map ? new Map(target) : new Set(target); // forward the operation before queueing reactions

  var result = getProto(target).clear.call(target);

  if (hadItems) {
    trigger(target, "clear"
    /* CLEAR */
    , undefined, undefined, oldTarget);
  }

  return result;
}

function createForEach(isReadonly, shallow) {
  return function forEach(callback, thisArg) {
    var observed = this;
    var target = toRaw(observed);
    var wrap = isReadonly ? toReadonly : shallow ? toShallow : toReactive;
    !isReadonly && track(target, "iterate"
    /* ITERATE */
    , ITERATE_KEY); // important: create sure the callback is
    // 1. invoked with the reactive map as `this` and 3rd arg
    // 2. the value received should be a corresponding reactive/readonly.

    function wrappedCallback(value, key) {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    }

    return getProto(target).forEach.call(target, wrappedCallback);
  };
}

function createIterableMethod(method, isReadonly, shallow) {
  return function () {
    var target = toRaw(this);
    var isMap = target instanceof Map;
    var isPair = method === 'entries' || method === Symbol.iterator && isMap;
    var isKeyOnly = method === 'keys' && isMap;

    for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var innerIterator = getProto(target)[method].apply(target, args);
    var wrap = isReadonly ? toReadonly : shallow ? toShallow : toReactive;
    !isReadonly && track(target, "iterate"
    /* ITERATE */
    , isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY); // return a wrapped iterator which returns observed versions of the
    // values emitted from the real iterator

    return _defineProperty({
      // iterator protocol
      next: function next() {
        var _innerIterator$next = innerIterator.next(),
            value = _innerIterator$next.value,
            done = _innerIterator$next.done;

        return done ? {
          value: value,
          done: done
        } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done: done
        };
      }
    }, Symbol.iterator, function () {
      return this;
    });
  };
}

function createReadonlyMethod(type) {
  return function () {
    {
      var key = (arguments.length <= 0 ? undefined : arguments[0]) ? "on key \"".concat(arguments.length <= 0 ? undefined : arguments[0], "\" ") : "";
      console.warn("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
    }
    return type === "delete"
    /* DELETE */
    ? false : this;
  };
}

var mutableInstrumentations = {
  get: function get(key) {
    return get$1(this, key, toReactive);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: add,
  set: set$1,
  delete: deleteEntry,
  clear: clear,
  forEach: createForEach(false, false)
};
var shallowInstrumentations = {
  get: function get(key) {
    return get$1(this, key, toShallow);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: add,
  set: set$1,
  delete: deleteEntry,
  clear: clear,
  forEach: createForEach(false, true)
};
var readonlyInstrumentations = {
  get: function get(key) {
    return get$1(this, key, toReadonly);
  },

  get size() {
    return size(this);
  },

  has: has$1,
  add: createReadonlyMethod("add"
  /* ADD */
  ),
  set: createReadonlyMethod("set"
  /* SET */
  ),
  delete: createReadonlyMethod("delete"
  /* DELETE */
  ),
  clear: createReadonlyMethod("clear"
  /* CLEAR */
  ),
  forEach: createForEach(true, false)
};
var iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
iteratorMethods.forEach(function (method) {
  mutableInstrumentations[method] = createIterableMethod(method, false, false);
  readonlyInstrumentations[method] = createIterableMethod(method, true, false);
  shallowInstrumentations[method] = createIterableMethod(method, false, true);
});

function createInstrumentationGetter(isReadonly, shallow) {
  var instrumentations = shallow ? shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return function (target, key, receiver) {
    if (key === "__v_isReactive"
    /* IS_REACTIVE */
    ) {
        return !isReadonly;
      } else if (key === "__v_isReadonly"
    /* IS_READONLY */
    ) {
        return isReadonly;
      } else if (key === "__v_raw"
    /* RAW */
    ) {
        return target;
      }

    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}

var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};

function checkIdentityKeys(target, has, key) {
  var rawKey = toRaw(key);

  if (rawKey !== key && has.call(target, rawKey)) {
    var type = toRawType(target);
    console.warn("Reactive ".concat(type, " contains both the raw and reactive ") + "versions of the same object".concat(type === "Map" ? "as keys" : "", ", ") + "which can lead to inconsistencies. " + "Avoid differentiating between the raw and reactive versions " + "of an object and only use the reactive version if possible.");
  }
}

var collectionTypes = new Set([Set, Map, WeakMap, WeakSet]);
var isObservableType = /*#__PURE__*/makeMap('Object,Array,Map,Set,WeakMap,WeakSet');

var canObserve = function canObserve(value) {
  return !value["__v_skip"
  /* SKIP */
  ] && isObservableType(toRawType(value)) && !Object.isFrozen(value);
};

function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (target && target["__v_isReadonly"
  /* IS_READONLY */
  ]) {
    return target;
  }

  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are reactive, and does NOT unwrap refs nor recursively convert
// returned properties.


function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers);
}

function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers);
} // Return a reactive-copy of the original object, where only the root level
// properties are readonly, and does NOT unwrap refs nor recursively convert
// returned properties.
// This is used for creating the props proxy object for stateful components.


function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, readonlyCollectionHandlers);
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
  if (!isObject(target)) {
    {
      console.warn("value cannot be made reactive: ".concat(String(target)));
    }
    return target;
  } // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object


  if (target["__v_raw"
  /* RAW */
  ] && !(isReadonly && target["__v_isReactive"
  /* IS_REACTIVE */
  ])) {
    return target;
  } // target already has corresponding Proxy


  if (hasOwn(target, isReadonly ? "__v_readonly"
  /* READONLY */
  : "__v_reactive"
  /* REACTIVE */
  )) {
    return isReadonly ? target["__v_readonly"
    /* READONLY */
    ] : target["__v_reactive"
    /* REACTIVE */
    ];
  } // only a whitelist of value types can be observed.


  if (!canObserve(target)) {
    return target;
  }

  var observed = new Proxy(target, collectionTypes.has(target.constructor) ? collectionHandlers : baseHandlers);
  def(target, isReadonly ? "__v_readonly"
  /* READONLY */
  : "__v_reactive"
  /* REACTIVE */
  , observed);
  return observed;
}

function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"
    /* RAW */
    ]);
  }

  return !!(value && value["__v_isReactive"
  /* IS_REACTIVE */
  ]);
}

function isReadonly(value) {
  return !!(value && value["__v_isReadonly"
  /* IS_READONLY */
  ]);
}

function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function toRaw(observed) {
  return observed && toRaw(observed["__v_raw"
  /* RAW */
  ]) || observed;
}

function markRaw(value) {
  def(value, "__v_skip"
  /* SKIP */
  , true);
  return value;
}

var convert = function convert(val) {
  return isObject(val) ? reactive(val) : val;
};

function isRef(r) {
  return r ? r.__v_isRef === true : false;
}

function ref(value) {
  return createRef(value);
}

function shallowRef(value) {
  return createRef(value, true);
}

function createRef(rawValue) {
  var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isRef(rawValue)) {
    return rawValue;
  }

  var value = shallow ? rawValue : convert(rawValue);
  var r = {
    __v_isRef: true,

    get value() {
      track(r, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newVal) {
      if (hasChanged(toRaw(newVal), rawValue)) {
        rawValue = newVal;
        value = shallow ? newVal : convert(newVal);
        trigger(r, "set"
        /* SET */
        , 'value', {
          newValue: newVal
        });
      }
    }

  };
  return r;
}

function triggerRef(ref) {
  trigger(ref, "set"
  /* SET */
  , 'value', {
    newValue: ref.value
  });
}

function unref(ref) {
  return isRef(ref) ? ref.value : ref;
}

function customRef(factory) {
  var _factory = factory(function () {
    return track(r, "get"
    /* GET */
    , 'value');
  }, function () {
    return trigger(r, "set"
    /* SET */
    , 'value');
  }),
      get = _factory.get,
      set = _factory.set;

  var r = {
    __v_isRef: true,

    get value() {
      return get();
    },

    set value(v) {
      set(v);
    }

  };
  return r;
}

function toRefs(object) {
  if (!isProxy(object)) {
    console.warn("toRefs() expects a reactive object but received a plain one.");
  }

  var ret = {};

  for (var key in object) {
    ret[key] = toRef(object, key);
  }

  return ret;
}

function toRef(object, key) {
  return {
    __v_isRef: true,

    get value() {
      return object[key];
    },

    set value(newVal) {
      object[key] = newVal;
    }

  };
}

function computed(getterOrOptions) {
  var getter;
  var setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;

    setter = function setter() {
      console.warn('Write operation failed: computed value is readonly');
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  var dirty = true;
  var value;
  var computed;
  var runner = effect(getter, {
    lazy: true,
    // mark effect as computed so that it gets priority during trigger
    scheduler: function scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(computed, "set"
        /* SET */
        , 'value');
      }
    }
  });
  computed = {
    __v_isRef: true,
    // expose effect so computed can be stopped
    effect: runner,

    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }

      track(computed, "get"
      /* GET */
      , 'value');
      return value;
    },

    set value(newValue) {
      setter(newValue);
    }

  };
  return computed;
}

var stack = [];

function pushWarningContext(vnode) {
  stack.push(vnode);
}

function popWarningContext() {
  stack.pop();
}

function warn(msg) {
  // avoid props formatting or warn handler tracking deps that might be mutated
  // during patch, leading to infinite recursion.
  pauseTracking();
  var instance = stack.length ? stack[stack.length - 1].component : null;
  var appWarnHandler = instance && instance.appContext.config.warnHandler;
  var trace = getComponentTrace();

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11
    /* APP_WARN_HANDLER */
    , [msg + args.join(''), instance && instance.proxy, trace.map(function (_ref12) {
      var vnode = _ref12.vnode;
      return "at <".concat(formatComponentName(instance, vnode.type), ">");
    }).join('\n'), trace]);
  } else {
    var _console;

    var warnArgs = ["[Vue warn]: ".concat(msg)].concat(args);

    if (trace.length && // avoid spamming console during tests
    !false) {
      warnArgs.push.apply(warnArgs, ["\n"].concat(_toConsumableArray(formatTrace(trace))));
    }

    (_console = console).warn.apply(_console, _toConsumableArray(warnArgs));
  }

  resetTracking();
}

function getComponentTrace() {
  var currentVNode = stack[stack.length - 1];

  if (!currentVNode) {
    return [];
  } // we can't just use the stack because it will be incomplete during updates
  // that did not start from the root. Re-construct the parent chain using
  // instance parent pointers.


  var normalizedStack = [];

  while (currentVNode) {
    var _last = normalizedStack[0];

    if (_last && _last.vnode === currentVNode) {
      _last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }

    var parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }

  return normalizedStack;
}

function formatTrace(trace) {
  var logs = [];
  trace.forEach(function (entry, i) {
    logs.push.apply(logs, _toConsumableArray(i === 0 ? [] : ["\n"]).concat(_toConsumableArray(formatTraceEntry(entry))));
  });
  return logs;
}

function formatTraceEntry(_ref13) {
  var vnode = _ref13.vnode,
      recurseCount = _ref13.recurseCount;
  var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
  var isRoot = vnode.component ? vnode.component.parent == null : false;
  var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
  var close = ">" + postfix;
  return vnode.props ? [open].concat(_toConsumableArray(formatProps(vnode.props)), [close]) : [open + close];
}

function formatProps(props) {
  var res = [];
  var keys = Object.keys(props);
  keys.slice(0, 3).forEach(function (key) {
    res.push.apply(res, _toConsumableArray(formatProp(key, props[key])));
  });

  if (keys.length > 3) {
    res.push(" ...");
  }

  return res;
}

function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
    return raw ? value : ["".concat(key, "=").concat(value)];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : ["".concat(key, "=Ref<"), value, ">"];
  } else if (isFunction(value)) {
    return ["".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
  } else {
    value = toRaw(value);
    return raw ? value : ["".concat(key, "="), value];
  }
}

var ErrorTypeStrings = (_ErrorTypeStrings = {}, _defineProperty(_ErrorTypeStrings, "bc"
/* BEFORE_CREATE */
, 'beforeCreate hook'), _defineProperty(_ErrorTypeStrings, "c"
/* CREATED */
, 'created hook'), _defineProperty(_ErrorTypeStrings, "bm"
/* BEFORE_MOUNT */
, 'beforeMount hook'), _defineProperty(_ErrorTypeStrings, "m"
/* MOUNTED */
, 'mounted hook'), _defineProperty(_ErrorTypeStrings, "bu"
/* BEFORE_UPDATE */
, 'beforeUpdate hook'), _defineProperty(_ErrorTypeStrings, "u"
/* UPDATED */
, 'updated'), _defineProperty(_ErrorTypeStrings, "bum"
/* BEFORE_UNMOUNT */
, 'beforeUnmount hook'), _defineProperty(_ErrorTypeStrings, "um"
/* UNMOUNTED */
, 'unmounted hook'), _defineProperty(_ErrorTypeStrings, "a"
/* ACTIVATED */
, 'activated hook'), _defineProperty(_ErrorTypeStrings, "da"
/* DEACTIVATED */
, 'deactivated hook'), _defineProperty(_ErrorTypeStrings, "ec"
/* ERROR_CAPTURED */
, 'errorCaptured hook'), _defineProperty(_ErrorTypeStrings, "rtc"
/* RENDER_TRACKED */
, 'renderTracked hook'), _defineProperty(_ErrorTypeStrings, "rtg"
/* RENDER_TRIGGERED */
, 'renderTriggered hook'), _defineProperty(_ErrorTypeStrings, 0
/* SETUP_FUNCTION */
, 'setup function'), _defineProperty(_ErrorTypeStrings, 1
/* RENDER_FUNCTION */
, 'render function'), _defineProperty(_ErrorTypeStrings, 2
/* WATCH_GETTER */
, 'watcher getter'), _defineProperty(_ErrorTypeStrings, 3
/* WATCH_CALLBACK */
, 'watcher callback'), _defineProperty(_ErrorTypeStrings, 4
/* WATCH_CLEANUP */
, 'watcher cleanup function'), _defineProperty(_ErrorTypeStrings, 5
/* NATIVE_EVENT_HANDLER */
, 'native event handler'), _defineProperty(_ErrorTypeStrings, 6
/* COMPONENT_EVENT_HANDLER */
, 'component event handler'), _defineProperty(_ErrorTypeStrings, 7
/* VNODE_HOOK */
, 'vnode hook'), _defineProperty(_ErrorTypeStrings, 8
/* DIRECTIVE_HOOK */
, 'directive hook'), _defineProperty(_ErrorTypeStrings, 9
/* TRANSITION_HOOK */
, 'transition hook'), _defineProperty(_ErrorTypeStrings, 10
/* APP_ERROR_HANDLER */
, 'app errorHandler'), _defineProperty(_ErrorTypeStrings, 11
/* APP_WARN_HANDLER */
, 'app warnHandler'), _defineProperty(_ErrorTypeStrings, 12
/* FUNCTION_REF */
, 'ref function'), _defineProperty(_ErrorTypeStrings, 13
/* ASYNC_COMPONENT_LOADER */
, 'async component loader'), _defineProperty(_ErrorTypeStrings, 14
/* SCHEDULER */
, 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'), _ErrorTypeStrings);

function callWithErrorHandling(fn, instance, type, args) {
  var res;

  try {
    res = args ? fn.apply(void 0, _toConsumableArray(args)) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }

  return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    var res = callWithErrorHandling(fn, instance, type, args);

    if (res && isPromise(res)) {
      res.catch(function (err) {
        handleError(err, instance, type);
      });
    }

    return res;
  }

  var values = [];

  for (var i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }

  return values;
}

function handleError(err, instance, type) {
  var contextVNode = instance ? instance.vnode : null;

  if (instance) {
    var cur = instance.parent; // the exposed instance is the render proxy to keep it consistent with 2.x

    var exposedInstance = instance.proxy; // in production the hook receives only the error code

    var errorInfo = ErrorTypeStrings[type];

    while (cur) {
      var errorCapturedHooks = cur.ec;

      if (errorCapturedHooks) {
        for (var i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo)) {
            return;
          }
        }
      }

      cur = cur.parent;
    } // app-level handling


    var appErrorHandler = instance.appContext.config.errorHandler;

    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10
      /* APP_ERROR_HANDLER */
      , [err, exposedInstance, errorInfo]);
      return;
    }
  }

  logError(err, type, contextVNode);
}

function logError(err, type, contextVNode) {
  // default behavior is crash in prod & test, recover in dev.
  {
    var info = ErrorTypeStrings[type];

    if (contextVNode) {
      pushWarningContext(contextVNode);
    }

    warn("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
    console.error(err);

    if (contextVNode) {
      popWarningContext();
    }
  }
}

var queue = [];
var postFlushCbs = [];
var p = Promise.resolve();
var isFlushing = false;
var isFlushPending = false;
var RECURSION_LIMIT = 100;

function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    queueFlush();
  }
}

function invalidateJob(job) {
  var i = queue.indexOf(job);

  if (i > -1) {
    queue[i] = null;
  }
}

function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    postFlushCbs.push(cb);
  } else {
    postFlushCbs.push.apply(postFlushCbs, _toConsumableArray(cb));
  }

  queueFlush();
}

function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    nextTick(flushJobs);
  }
}

function flushPostFlushCbs(seen) {
  if (postFlushCbs.length) {
    var cbs = _toConsumableArray(new Set(postFlushCbs));

    postFlushCbs.length = 0;
    {
      seen = seen || new Map();
    }

    for (var i = 0; i < cbs.length; i++) {
      {
        checkRecursiveUpdates(seen, cbs[i]);
      }
      cbs[i]();
    }
  }
}

var getId = function getId(job) {
  return job.id == null ? Infinity : job.id;
};

function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  var job;
  {
    seen = seen || new Map();
  } // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child so its render effect will have smaller
  //    priority number)
  // 2. If a component is unmounted during a parent component's update,
  //    its update can be skipped.
  // Jobs can never be null before flush starts, since they are only invalidated
  // during execution of another flushed job.

  queue.sort(function (a, b) {
    return getId(a) - getId(b);
  });

  while ((job = queue.shift()) !== undefined) {
    if (job === null) {
      continue;
    }

    {
      checkRecursiveUpdates(seen, job);
    }
    callWithErrorHandling(job, null, 14
    /* SCHEDULER */
    );
  }

  flushPostFlushCbs(seen);
  isFlushing = false; // some postFlushCb queued jobs!
  // keep flushing until it drains.

  if (queue.length || postFlushCbs.length) {
    flushJobs(seen);
  }
}

function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    var count = seen.get(fn);

    if (count > RECURSION_LIMIT) {
      throw new Error('Maximum recursive updates exceeded. ' + "You may have code that is mutating state in your component's " + 'render function or updated hook or watcher source function.');
    } else {
      seen.set(fn, count + 1);
    }
  }
}

var isHmrUpdating = false;
var hmrDirtyComponents = new Set(); // Expose the HMR runtime on the global object
// This makes it entirely tree-shakable without polluting the exports and makes
// it easier to be used in toolings like vue-loader
// Note: for a component to be eligible for HMR it also needs the __hmrId option
// to be set so that its instances can be registered / removed.

{
  var globalObject = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};
  globalObject.__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = new Map();

function registerHMR(instance) {
  var id = instance.type.__hmrId;
  var record = map.get(id);

  if (!record) {
    createRecord(id);
    record = map.get(id);
  }

  record.add(instance);
}

function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).delete(instance);
}

function createRecord(id) {
  if (map.has(id)) {
    return false;
  }

  map.set(id, new Set());
  return true;
}

function rerender(id, newRender) {
  var record = map.get(id);
  if (!record) return; // Array.from creates a snapshot which avoids the set being mutated during
  // updates

  Array.from(record).forEach(function (instance) {
    if (newRender) {
      instance.render = newRender;
    }

    instance.renderCache = []; // this flag forces child components with slot content to update

    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}

function reload(id, newComp) {
  var record = map.get(id);
  if (!record) return; // Array.from creates a snapshot which avoids the set being mutated during
  // updates

  Array.from(record).forEach(function (instance) {
    var comp = instance.type;

    if (!hmrDirtyComponents.has(comp)) {
      // 1. Update existing comp definition to match new one
      extend(comp, newComp);

      for (var key in comp) {
        if (!(key in newComp)) {
          delete comp[key];
        }
      } // 2. Mark component dirty. This forces the renderer to replace the component
      // on patch.


      hmrDirtyComponents.add(comp); // 3. Make sure to unmark the component after the reload.

      queuePostFlushCb(function () {
        hmrDirtyComponents.delete(comp);
      });
    }

    if (instance.parent) {
      // 4. Force the parent instance to re-render. This will cause all updated
      // components to be unmounted and re-mounted. Queue the update so that we
      // don't end up forcing the same parent to re-render multiple times.
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      // root instance mounted via createApp() has a reload method
      instance.appContext.reload();
    } else if (typeof window !== 'undefined') {
      // root instance inside tree created via raw render(). Force reload.
      window.location.reload();
    } else {
      console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
    }
  });
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn("[HMR] Something went wrong during Vue component hot-reload. " + "Full reload required.");
    }
  };
} // mark the current rendering instance for asset resolution (e.g.
// resolveComponent, resolveDirective) during render


var currentRenderingInstance = null;

function setCurrentRenderingInstance(instance) {
  currentRenderingInstance = instance;
} // dev only flag to track whether $attrs was used during render.
// If $attrs was used during render then the warning for failed attrs
// fallthrough can be suppressed.


var accessedAttrs = false;

function markAttrsAccessed() {
  accessedAttrs = true;
}

function renderComponentRoot(instance) {
  var Component = instance.type,
      parent = instance.parent,
      vnode = instance.vnode,
      proxy = instance.proxy,
      withProxy = instance.withProxy,
      props = instance.props,
      slots = instance.slots,
      attrs = instance.attrs,
      emit = instance.emit,
      renderCache = instance.renderCache;
  var result;
  currentRenderingInstance = instance;
  {
    accessedAttrs = false;
  }

  try {
    var fallthroughAttrs;

    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
        // withProxy is a proxy with a different `has` trap only for
        // runtime-compiled render functions using `with` block.
        var proxyToUse = withProxy || proxy;
        result = normalizeVNode(instance.render.call(proxyToUse, proxyToUse, renderCache));
        fallthroughAttrs = attrs;
      } else {
      // functional
      var _render = Component; // in dev, mark attrs accessed if optional props (attrs === props)

      if (true && attrs === props) {
        markAttrsAccessed();
      }

      result = normalizeVNode(_render.length > 1 ? _render(props, true ? {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },

        slots: slots,
        emit: emit
      } : {
        attrs: attrs,
        slots: slots,
        emit: emit
      }) : _render(props, null
      /* we know it doesn't need it */
      ));
      fallthroughAttrs = Component.props ? attrs : getFallthroughAttrs(attrs);
    } // attr merging
    // in dev mode, comments are preserved, and it's possible for a template
    // to have comments along side the root element which makes it a fragment


    var root = result;
    var setRoot = undefined;

    if (true) {
      ;

      var _getChildRoot = getChildRoot(result);

      var _getChildRoot2 = _slicedToArray(_getChildRoot, 2);

      root = _getChildRoot2[0];
      setRoot = _getChildRoot2[1];
    }

    if (Component.inheritAttrs !== false && fallthroughAttrs && Object.keys(fallthroughAttrs).length) {
      if (root.shapeFlag & 1
      /* ELEMENT */
      || root.shapeFlag & 6
      /* COMPONENT */
      ) {
          root = cloneVNode(root, fallthroughAttrs);
        } else if (true && !accessedAttrs && root.type !== Comment) {
        var allAttrs = Object.keys(attrs);
        var eventAttrs = [];
        var extraAttrs = [];

        for (var i = 0, l = allAttrs.length; i < l; i++) {
          var key = allAttrs[i];

          if (isOn(key)) {
            // remove `on`, lowercase first letter to reflect event casing accurately
            eventAttrs.push(key[2].toLowerCase() + key.slice(3));
          } else {
            extraAttrs.push(key);
          }
        }

        if (extraAttrs.length) {
          warn("Extraneous non-props attributes (" + "".concat(extraAttrs.join(', '), ") ") + "were passed to component but could not be automatically inherited " + "because component renders fragment or text root nodes.");
        }

        if (eventAttrs.length) {
          warn("Extraneous non-emits event listeners (" + "".concat(eventAttrs.join(', '), ") ") + "were passed to component but could not be automatically inherited " + "because component renders fragment or text root nodes. " + "If the listener is intended to be a component custom event listener only, " + "declare it using the \"emits\" option.");
        }
      }
    } // inherit scopeId


    var scopeId = vnode.scopeId;
    var treeOwnerId = parent && parent.type.__scopeId;
    var slotScopeId = treeOwnerId && treeOwnerId !== scopeId ? treeOwnerId + '-s' : null;

    if (scopeId || slotScopeId) {
      var extras = {};
      if (scopeId) extras[scopeId] = '';
      if (slotScopeId) extras[slotScopeId] = '';
      root = cloneVNode(root, extras);
    } // inherit directives


    if (vnode.dirs) {
      if (true && !isElementRoot(root)) {
        warn("Runtime directive used on component with non-element root node. " + "The directives will not function as intended.");
      }

      root.dirs = vnode.dirs;
    } // inherit transition data


    if (vnode.transition) {
      if (true && !isElementRoot(root)) {
        warn("Component inside <Transition> renders non-element root node " + "that cannot be animated.");
      }

      root.transition = vnode.transition;
    }

    if (true && setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
  } catch (err) {
    handleError(err, instance, 1
    /* RENDER_FUNCTION */
    );
    result = createVNode(Comment);
  }

  currentRenderingInstance = null;
  return result;
}

var getChildRoot = function getChildRoot(vnode) {
  if (vnode.type !== Fragment) {
    return [vnode, undefined];
  }

  var rawChildren = vnode.children;
  var dynamicChildren = vnode.dynamicChildren;
  var children = rawChildren.filter(function (child) {
    return !(isVNode(child) && child.type === Comment);
  });

  if (children.length !== 1) {
    return [vnode, undefined];
  }

  var childRoot = children[0];
  var index = rawChildren.indexOf(childRoot);
  var dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : null;

  var setRoot = function setRoot(updatedRoot) {
    rawChildren[index] = updatedRoot;
    if (dynamicIndex !== null) dynamicChildren[dynamicIndex] = updatedRoot;
  };

  return [normalizeVNode(childRoot), setRoot];
};

var getFallthroughAttrs = function getFallthroughAttrs(attrs) {
  var res;

  for (var key in attrs) {
    if (key === 'class' || key === 'style' || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }

  return res;
};

var isElementRoot = function isElementRoot(vnode) {
  return vnode.shapeFlag & 6
  /* COMPONENT */
  || vnode.shapeFlag & 1
  /* ELEMENT */
  || vnode.type === Comment // potential v-if branch switch
  ;
};

function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  var prevProps = prevVNode.props,
      prevChildren = prevVNode.children;
  var nextProps = nextVNode.props,
      nextChildren = nextVNode.children,
      patchFlag = nextVNode.patchFlag; // Parent component's render function was hot-updated. Since this may have
  // caused the child component's slots content to have changed, we need to
  // force the child to update as well.

  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  } // force child update for runtime directive or transition on component vnode.


  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }

  if (patchFlag > 0) {
    if (patchFlag & 1024
    /* DYNAMIC_SLOTS */
    ) {
        // slot content that references values that might have changed,
        // e.g. in a v-for
        return true;
      }

    if (patchFlag & 16
    /* FULL_PROPS */
    ) {
        if (!prevProps) {
          return !!nextProps;
        } // presence of this flag indicates props are always non-null


        return hasPropsChanged(prevProps, nextProps);
      } else if (patchFlag & 8
    /* PROPS */
    ) {
        var dynamicProps = nextVNode.dynamicProps;

        for (var i = 0; i < dynamicProps.length; i++) {
          var key = dynamicProps[i];

          if (nextProps[key] !== prevProps[key]) {
            return true;
          }
        }
      }
  } else if (!optimized) {
    // this path is only taken by manually written render functions
    // so presence of any children leads to a forced update
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }

    if (prevProps === nextProps) {
      return false;
    }

    if (!prevProps) {
      return !!nextProps;
    }

    if (!nextProps) {
      return true;
    }

    return hasPropsChanged(prevProps, nextProps);
  }

  return false;
}

function hasPropsChanged(prevProps, nextProps) {
  var nextKeys = Object.keys(nextProps);

  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }

  for (var i = 0; i < nextKeys.length; i++) {
    var key = nextKeys[i];

    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }

  return false;
}

function updateHOCHostEl(_ref14, el // HostNode
) {
  var vnode = _ref14.vnode,
      parent = _ref14.parent;

  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}

var isSuspense = function isSuspense(type) {
  return type.__isSuspense;
}; // Suspense exposes a component-like API, and is treated like a component
// in the compiler, but internally it's a special built-in type that hooks
// directly into the renderer.


var SuspenseImpl = {
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process: function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, // platform-specific impl passed from renderer
  rendererInternals) {
    if (n1 == null) {
      mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals);
    } else {
      patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, rendererInternals);
    }
  },
  hydrate: hydrateSuspense
}; // Force-casted public typing for h and TSX props inference

var Suspense = SuspenseImpl;

function mountSuspense(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, rendererInternals) {
  var patch = rendererInternals.p,
      createElement = rendererInternals.o.createElement;
  var hiddenContainer = createElement('div');
  var suspense = n2.suspense = createSuspenseBoundary(n2, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals); // start mounting the content subtree in an off-dom container

  patch(null, suspense.subTree, hiddenContainer, null, parentComponent, suspense, isSVG, optimized); // now check if we have encountered any async deps

  if (suspense.deps > 0) {
    // mount the fallback tree
    patch(null, suspense.fallbackTree, container, anchor, parentComponent, null, // fallback tree will not have suspense context
    isSVG, optimized);
    n2.el = suspense.fallbackTree.el;
  } else {
    // Suspense has no async deps. Just resolve.
    suspense.resolve();
  }
}

function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, optimized, _ref15) {
  var patch = _ref15.p;
  var suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;

  var _normalizeSuspenseChi = normalizeSuspenseChildren(n2),
      content = _normalizeSuspenseChi.content,
      fallback = _normalizeSuspenseChi.fallback;

  var oldSubTree = suspense.subTree;
  var oldFallbackTree = suspense.fallbackTree;

  if (!suspense.isResolved) {
    patch(oldSubTree, content, suspense.hiddenContainer, null, parentComponent, suspense, isSVG, optimized);

    if (suspense.deps > 0) {
      // still pending. patch the fallback tree.
      patch(oldFallbackTree, fallback, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      n2.el = fallback.el;
    } // If deps somehow becomes 0 after the patch it means the patch caused an
    // async dep component to unmount and removed its dep. It will cause the
    // suspense to resolve and we don't need to do anything here.

  } else {
    // just normal patch inner content as a fragment
    patch(oldSubTree, content, container, anchor, parentComponent, suspense, isSVG, optimized);
    n2.el = content.el;
  }

  suspense.subTree = content;
  suspense.fallbackTree = fallback;
}

var hasWarned = false;

function createSuspenseBoundary(vnode, parent, parentComponent, container, hiddenContainer, anchor, isSVG, optimized, rendererInternals) {
  var isHydrating = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;

  /* istanbul ignore if */
  if (!hasWarned) {
    hasWarned = true; // @ts-ignore `console.info` cannot be null error

    console[console.info ? 'info' : 'log']("<Suspense> is an experimental feature and its API will likely change.");
  }

  var patch = rendererInternals.p,
      _move = rendererInternals.m,
      _unmount2 = rendererInternals.um,
      _next = rendererInternals.n,
      parentNode = rendererInternals.o.parentNode;

  var getCurrentTree = function getCurrentTree() {
    return suspense.isResolved || suspense.isHydrating ? suspense.subTree : suspense.fallbackTree;
  };

  var _normalizeSuspenseChi2 = normalizeSuspenseChildren(vnode),
      content = _normalizeSuspenseChi2.content,
      fallback = _normalizeSuspenseChi2.fallback;

  var suspense = {
    vnode: vnode,
    parent: parent,
    parentComponent: parentComponent,
    isSVG: isSVG,
    optimized: optimized,
    container: container,
    hiddenContainer: hiddenContainer,
    anchor: anchor,
    deps: 0,
    subTree: content,
    fallbackTree: fallback,
    isHydrating: isHydrating,
    isResolved: false,
    isUnmounted: false,
    effects: [],
    resolve: function resolve() {
      {
        if (suspense.isResolved) {
          throw new Error("resolveSuspense() is called on an already resolved suspense boundary.");
        }

        if (suspense.isUnmounted) {
          throw new Error("resolveSuspense() is called on an already unmounted suspense boundary.");
        }
      }
      var vnode = suspense.vnode,
          subTree = suspense.subTree,
          fallbackTree = suspense.fallbackTree,
          effects = suspense.effects,
          parentComponent = suspense.parentComponent,
          container = suspense.container;

      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else {
        // this is initial anchor on mount
        var _anchor = suspense.anchor; // unmount fallback tree

        if (fallbackTree.el) {
          // if the fallback tree was mounted, it may have been moved
          // as part of a parent suspense. get the latest anchor for insertion
          _anchor = _next(fallbackTree);

          _unmount2(fallbackTree, parentComponent, suspense, true);
        } // move content from off-dom container to actual container


        _move(subTree, container, _anchor, 0
        /* ENTER */
        );
      }

      var el = vnode.el = subTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // check if there is a pending parent suspense


      var parent = suspense.parent;
      var hasUnresolvedAncestor = false;

      while (parent) {
        if (!parent.isResolved) {
          var _parent$effects;

          // found a pending parent suspense, merge buffered post jobs
          // into that parent
          (_parent$effects = parent.effects).push.apply(_parent$effects, _toConsumableArray(effects));

          hasUnresolvedAncestor = true;
          break;
        }

        parent = parent.parent;
      } // no pending parent suspense, flush all jobs


      if (!hasUnresolvedAncestor) {
        queuePostFlushCb(effects);
      }

      suspense.isResolved = true;
      suspense.effects = []; // invoke @resolve event

      var onResolve = vnode.props && vnode.props.onResolve;

      if (isFunction(onResolve)) {
        onResolve();
      }
    },
    recede: function recede() {
      suspense.isResolved = false;
      var vnode = suspense.vnode,
          subTree = suspense.subTree,
          fallbackTree = suspense.fallbackTree,
          parentComponent = suspense.parentComponent,
          container = suspense.container,
          hiddenContainer = suspense.hiddenContainer,
          isSVG = suspense.isSVG,
          optimized = suspense.optimized; // move content tree back to the off-dom container

      var anchor = _next(subTree);

      _move(subTree, hiddenContainer, null, 1
      /* LEAVE */
      ); // remount the fallback tree


      patch(null, fallbackTree, container, anchor, parentComponent, null, // fallback tree will not have suspense context
      isSVG, optimized);
      var el = vnode.el = fallbackTree.el; // suspense as the root node of a component...

      if (parentComponent && parentComponent.subTree === vnode) {
        parentComponent.vnode.el = el;
        updateHOCHostEl(parentComponent, el);
      } // invoke @recede event


      var onRecede = vnode.props && vnode.props.onRecede;

      if (isFunction(onRecede)) {
        onRecede();
      }
    },
    move: function move(container, anchor, type) {
      _move(getCurrentTree(), container, anchor, type);

      suspense.container = container;
    },
    next: function next() {
      return _next(getCurrentTree());
    },
    registerDep: function registerDep(instance, setupRenderEffect) {
      // suspense is already resolved, need to recede.
      // use queueJob so it's handled synchronously after patching the current
      // suspense tree
      if (suspense.isResolved) {
        queueJob(function () {
          suspense.recede();
        });
      }

      var hydratedEl = instance.vnode.el;
      suspense.deps++;
      instance.asyncDep.catch(function (err) {
        handleError(err, instance, 0
        /* SETUP_FUNCTION */
        );
      }).then(function (asyncSetupResult) {
        // retry when the setup() promise resolves.
        // component may have been unmounted before resolve.
        if (instance.isUnmounted || suspense.isUnmounted) {
          return;
        }

        suspense.deps--; // retry from this component

        instance.asyncResolved = true;
        var vnode = instance.vnode;
        {
          pushWarningContext(vnode);
        }
        handleSetupResult(instance, asyncSetupResult);

        if (hydratedEl) {
          // vnode may have been replaced if an update happened before the
          // async dep is resolved.
          vnode.el = hydratedEl;
        }

        setupRenderEffect(instance, vnode, // component may have been moved before resolve.
        // if this is not a hydration, instance.subTree will be the comment
        // placeholder.
        hydratedEl ? parentNode(hydratedEl) : parentNode(instance.subTree.el), // anchor will not be used if this is hydration, so only need to
        // consider the comment placeholder case.
        hydratedEl ? null : _next(instance.subTree), suspense, isSVG, optimized);
        updateHOCHostEl(instance, vnode.el);
        {
          popWarningContext();
        }

        if (suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount: function unmount(parentSuspense, doRemove) {
      suspense.isUnmounted = true;

      _unmount2(suspense.subTree, parentComponent, parentSuspense, doRemove);

      if (!suspense.isResolved) {
        _unmount2(suspense.fallbackTree, parentComponent, parentSuspense, doRemove);
      }
    }
  };
  return suspense;
}

function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, optimized, rendererInternals, hydrateNode) {
  /* eslint-disable no-restricted-globals */
  var suspense = vnode.suspense = createSuspenseBoundary(vnode, parentSuspense, parentComponent, node.parentNode, document.createElement('div'), null, isSVG, optimized, rendererInternals, true
  /* hydrating */
  ); // there are two possible scenarios for server-rendered suspense:
  // - success: ssr content should be fully resolved
  // - failure: ssr content should be the fallback branch.
  // however, on the client we don't really know if it has failed or not
  // attempt to hydrate the DOM assuming it has succeeded, but we still
  // need to construct a suspense boundary first

  var result = hydrateNode(node, suspense.subTree, parentComponent, suspense, optimized);

  if (suspense.deps === 0) {
    suspense.resolve();
  }

  return result;
  /* eslint-enable no-restricted-globals */
}

function normalizeSuspenseChildren(vnode) {
  var shapeFlag = vnode.shapeFlag,
      children = vnode.children;

  if (shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      var d = children.default,
          fallback = children.fallback;
      return {
        content: normalizeVNode(isFunction(d) ? d() : d),
        fallback: normalizeVNode(isFunction(fallback) ? fallback() : fallback)
      };
    } else {
    return {
      content: normalizeVNode(children),
      fallback: normalizeVNode(null)
    };
  }
}

function queueEffectWithSuspense(fn, suspense) {
  if (suspense && !suspense.isResolved) {
    if (isArray(fn)) {
      var _suspense$effects;

      (_suspense$effects = suspense.effects).push.apply(_suspense$effects, _toConsumableArray(fn));
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
/**
 * Wrap a slot function to memoize current rendering instance
 * @private
 */


function withCtx(fn) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentRenderingInstance;
  if (!ctx) return fn;
  return function renderFnWithContext() {
    var owner = currentRenderingInstance;
    setCurrentRenderingInstance(ctx);
    var res = fn.apply(null, arguments);
    setCurrentRenderingInstance(owner);
    return res;
  };
} // SFC scoped style ID management.


var currentScopeId = null;
var scopeIdStack = [];
/**
 * @private
 */

function pushScopeId(id) {
  scopeIdStack.push(currentScopeId = id);
}
/**
 * @private
 */


function popScopeId() {
  scopeIdStack.pop();
  currentScopeId = scopeIdStack[scopeIdStack.length - 1] || null;
}
/**
 * @private
 */


function withScopeId(id) {
  return function (fn) {
    return withCtx(function () {
      pushScopeId(id);
      var res = fn.apply(this, arguments);
      popScopeId();
      return res;
    });
  };
}

var isTeleport = function isTeleport(type) {
  return type.__isTeleport;
};

var isTeleportDisabled = function isTeleportDisabled(props) {
  return props && (props.disabled || props.disabled === '');
};

var resolveTarget = function resolveTarget(props, select) {
  var targetSelector = props && props.to;

  if (isString(targetSelector)) {
    if (!select) {
      warn("Current renderer does not support string target for Teleports. " + "(missing querySelector renderer option)");
      return null;
    } else {
      var target = select(targetSelector);

      if (!target) {
        warn("Failed to locate Teleport target with selector \"".concat(targetSelector, "\"."));
      }

      return target;
    }
  } else {
    if (!targetSelector) {
      warn("Invalid Teleport target: ".concat(targetSelector));
    }

    return targetSelector;
  }
};

var TeleportImpl = {
  __isTeleport: true,
  process: function process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals) {
    var mountChildren = internals.mc,
        patchChildren = internals.pc,
        patchBlockChildren = internals.pbc,
        _internals$o = internals.o,
        insert = _internals$o.insert,
        querySelector = _internals$o.querySelector,
        createText = _internals$o.createText,
        createComment = _internals$o.createComment;
    var disabled = isTeleportDisabled(n2.props);
    var shapeFlag = n2.shapeFlag,
        children = n2.children;

    if (n1 == null) {
      // insert anchors in the main view
      var placeholder = n2.el = createComment('teleport start');
      var mainAnchor = n2.anchor = createComment('teleport end');
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      var target = n2.target = resolveTarget(n2.props, querySelector);
      var targetAnchor = n2.targetAnchor = createText('');

      if (target) {
        insert(targetAnchor, target);
      } else {
        warn('Invalid Teleport target on mount:', target, "(".concat(_typeof(target), ")"));
      }

      var mount = function mount(container, anchor) {
        // Teleport *always* has Array children. This is enforced in both the
        // compiler and vnode children normalization.
        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
      };

      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      // update content
      n2.el = n1.el;

      var _mainAnchor = n2.anchor = n1.anchor;

      var _target = n2.target = n1.target;

      var _targetAnchor = n2.targetAnchor = n1.targetAnchor;

      var wasDisabled = isTeleportDisabled(n1.props);
      var currentContainer = wasDisabled ? container : _target;
      var currentAnchor = wasDisabled ? _mainAnchor : _targetAnchor;

      if (n2.dynamicChildren) {
        // fast path when the teleport happens to be a block root
        patchBlockChildren(n1.dynamicChildren, n2.dynamicChildren, currentContainer, parentComponent, parentSuspense, isSVG);
      } else if (!optimized) {
        patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, isSVG);
      }

      if (disabled) {
        if (!wasDisabled) {
          // enabled -> disabled
          // move into main container
          moveTeleport(n2, container, _mainAnchor, internals, 1
          /* TOGGLE */
          );
        }
      } else {
        // target changed
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          var nextTarget = n2.target = resolveTarget(n2.props, querySelector);

          if (nextTarget) {
            moveTeleport(n2, nextTarget, null, internals, 0
            /* TARGET_CHANGE */
            );
          } else {
            warn('Invalid Teleport target on update:', _target, "(".concat(_typeof(_target), ")"));
          }
        } else if (wasDisabled) {
          // disabled -> enabled
          // move into teleport target
          moveTeleport(n2, _target, _targetAnchor, internals, 1
          /* TOGGLE */
          );
        }
      }
    }
  },
  remove: function remove(vnode, _ref16) {
    var remove = _ref16.r,
        hostRemove = _ref16.o.remove;
    var shapeFlag = vnode.shapeFlag,
        children = vnode.children,
        anchor = vnode.anchor;
    hostRemove(anchor);

    if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        for (var i = 0; i < children.length; i++) {
          remove(children[i]);
        }
      }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};

function moveTeleport(vnode, container, parentAnchor, _ref17)
/* REORDER */
{
  var insert = _ref17.o.insert,
      move = _ref17.m;
  var moveType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

  // move target anchor if this is a target change.
  if (moveType === 0
  /* TARGET_CHANGE */
  ) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }

  var el = vnode.el,
      anchor = vnode.anchor,
      shapeFlag = vnode.shapeFlag,
      children = vnode.children,
      props = vnode.props;
  var isReorder = moveType === 2
  /* REORDER */
  ; // move main view anchor if this is a re-order.

  if (isReorder) {
    insert(el, container, parentAnchor);
  } // if this is a re-order and teleport is enabled (content is in target)
  // do not move children. So the opposite is: only move children if this
  // is not a reorder, or the teleport is disabled


  if (!isReorder || isTeleportDisabled(props)) {
    // Teleport has either Array children or no children.
    if (shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        for (var i = 0; i < children.length; i++) {
          move(children[i], container, parentAnchor, 2
          /* REORDER */
          );
        }
      }
  } // move main view anchor if this is a re-order.


  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}

function hydrateTeleport(node, vnode, parentComponent, parentSuspense, optimized, _ref18, hydrateChildren) {
  var _ref18$o = _ref18.o,
      nextSibling = _ref18$o.nextSibling,
      parentNode = _ref18$o.parentNode,
      querySelector = _ref18$o.querySelector;
  var target = vnode.target = resolveTarget(vnode.props, querySelector);

  if (target) {
    // if multiple teleports rendered to the same target element, we need to
    // pick up from where the last teleport finished instead of the first node
    var targetNode = target._lpa || target.firstChild;

    if (vnode.shapeFlag & 16
    /* ARRAY_CHILDREN */
    ) {
        if (isTeleportDisabled(vnode.props)) {
          vnode.anchor = hydrateChildren(nextSibling(node), vnode, parentNode(node), parentComponent, parentSuspense, optimized);
          vnode.targetAnchor = targetNode;
        } else {
          vnode.anchor = nextSibling(node);
          vnode.targetAnchor = hydrateChildren(targetNode, vnode, target, parentComponent, parentSuspense, optimized);
        }

        target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
      }
  }

  return vnode.anchor && nextSibling(vnode.anchor);
} // Force-casted public typing for h and TSX props inference


var Teleport = TeleportImpl;
var COMPONENTS = 'components';
var DIRECTIVES = 'directives';
/**
 * @private
 */

function resolveComponent(name) {
  return resolveAsset(COMPONENTS, name) || name;
}

var NULL_DYNAMIC_COMPONENT = Symbol();
/**
 * @private
 */

function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    // invalid types will fallthrough to createVNode and raise warning
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
/**
 * @private
 */


function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
} // implementation


function resolveAsset(type, name) {
  var warnMissing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var instance = currentRenderingInstance || currentInstance;

  if (instance) {
    var camelized, capitalized;
    var registry = instance[type];
    var res = registry[name] || registry[camelized = camelize(name)] || registry[capitalized = capitalize(camelized)];

    if (!res && type === COMPONENTS) {
      var _self = instance.type;
      var selfName = _self.displayName || _self.name;

      if (selfName && (selfName === name || selfName === camelized || selfName === capitalized)) {
        res = _self;
      }
    }

    if (warnMissing && !res) {
      warn("Failed to resolve ".concat(type.slice(0, -1), ": ").concat(name));
    }

    return res;
  } else {
    warn("resolve".concat(capitalize(type.slice(0, -1)), " ") + "can only be used in render() or setup().");
  }
}

var Fragment = Symbol('Fragment');
var Text = Symbol('Text');
var Comment = Symbol('Comment');
var Static = Symbol('Static'); // Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).

var blockStack = [];
var currentBlock = null;
/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */

function openBlock() {
  var disableTracking = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  blockStack.push(currentBlock = disableTracking ? null : []);
} // Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)


var shouldTrack$1 = 1;
/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */

function setBlockTracking(value) {
  shouldTrack$1 += value;
}
/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */


function createBlock(type, props, children, patchFlag, dynamicProps) {
  var vnode = createVNode(type, props, children, patchFlag, dynamicProps, true
  /* isBlock: prevent a block from tracking itself */
  ); // save current block children on the block vnode

  vnode.dynamicChildren = currentBlock || EMPTY_ARR; // close block

  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null; // a block is always going to be patched, so track it as a child of its
  // parent block

  if (currentBlock) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}

function isSameVNodeType(n1, n2) {
  if (n2.shapeFlag & 6
  /* COMPONENT */
  && hmrDirtyComponents.has(n2.type)) {
    // HMR only: if the component has been hot-updated, force a reload.
    return false;
  }

  return n1.type === n2.type && n1.key === n2.key;
}

var vnodeArgsTransformer;
/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */

function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}

var createVNodeWithArgsTransform = function createVNodeWithArgsTransform() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return _createVNode.apply(void 0, _toConsumableArray(vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args));
};

var InternalObjectKey = "__vInternal";

var normalizeKey = function normalizeKey(_ref19) {
  var key = _ref19.key;
  return key != null ? key : null;
};

var normalizeRef = function normalizeRef(_ref20) {
  var ref = _ref20.ref;
  return ref != null ? isArray(ref) ? ref : [currentRenderingInstance, ref] : null;
};

var createVNode = createVNodeWithArgsTransform;

function _createVNode(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var isBlockNode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn("Invalid vnode type when creating vnode: ".concat(type, "."));
    }

    type = Comment;
  }

  if (isVNode(type)) {
    return cloneVNode(type, props, children);
  } // class component normalization.


  if (isFunction(type) && '__vccOpts' in type) {
    type = type.__vccOpts;
  } // class & style normalization.


  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    if (isProxy(props) || InternalObjectKey in props) {
      props = extend({}, props);
    }

    var _props2 = props,
        klass = _props2.class,
        style = _props2.style;

    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }

    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }

      props.style = normalizeStyle(style);
    }
  } // encode the vnode type information into a bitmap


  var shapeFlag = isString(type) ? 1
  /* ELEMENT */
  : isSuspense(type) ? 128
  /* SUSPENSE */
  : isTeleport(type) ? 64
  /* TELEPORT */
  : isObject(type) ? 4
  /* STATEFUL_COMPONENT */
  : isFunction(type) ? 2
  /* FUNCTIONAL_COMPONENT */
  : 0;

  if (shapeFlag & 4
  /* STATEFUL_COMPONENT */
  && isProxy(type)) {
    type = toRaw(type);
    warn("Vue received a Component which was made a reactive object. This can " + "lead to unnecessary performance overhead, and should be avoided by " + "marking the component with `markRaw` or using `shallowRef` " + "instead of `ref`.", "\nComponent that was made reactive: ", type);
  }

  var vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type: type,
    props: props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    children: null,
    component: null,
    suspense: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: shapeFlag,
    patchFlag: patchFlag,
    dynamicProps: dynamicProps,
    dynamicChildren: null,
    appContext: null
  };
  normalizeChildren(vnode, children); // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.

  if (shouldTrack$1 > 0 && !isBlockNode && currentBlock && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  patchFlag !== 32
  /* HYDRATE_EVENTS */
  && (patchFlag > 0 || shapeFlag & 128
  /* SUSPENSE */
  || shapeFlag & 64
  /* TELEPORT */
  || shapeFlag & 4
  /* STATEFUL_COMPONENT */
  || shapeFlag & 2
  /* FUNCTIONAL_COMPONENT */
  )) {
    currentBlock.push(vnode);
  }

  return vnode;
}

function cloneVNode(vnode, extraProps, children) {
  var props = extraProps ? vnode.props ? mergeProps(vnode.props, extraProps) : extend({}, extraProps) : vnode.props; // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.

  var cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: props,
    key: props && normalizeKey(props),
    ref: extraProps && extraProps.ref ? normalizeRef(extraProps) : vnode.ref,
    scopeId: vnode.scopeId,
    children: vnode.children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to bail out of optimized mode.
    // however we don't want block nodes to de-opt their children, so if the
    // vnode is a block node, we only add the FULL_PROPS flag to it.
    patchFlag: extraProps ? vnode.dynamicChildren ? vnode.patchFlag | 16
    /* FULL_PROPS */
    : -2
    /* BAIL */
    : vnode.patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    el: vnode.el,
    anchor: vnode.anchor
  };

  if (children) {
    normalizeChildren(cloned, children);
  }

  return cloned;
}
/**
 * @private
 */


function createTextVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
  var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return createVNode(Text, null, text, flag);
}
/**
 * @private
 */


function createStaticVNode(content, numberOfNodes) {
  // A static vnode can contain multiple stringified elements, and the number
  // of elements is necessary for hydration.
  var vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
/**
 * @private
 */


function createCommentVNode() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var asBlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}

function normalizeVNode(child) {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode(Comment);
  } else if (isArray(child)) {
    // fragment
    return createVNode(Fragment, null, child);
  } else if (_typeof(child) === 'object') {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return child.el === null ? child : cloneVNode(child);
  } else {
    // strings and numbers
    return createVNode(Text, null, String(child));
  }
} // optimized normalization for template-compiled render fns


function cloneIfMounted(child) {
  return child.el === null ? child : cloneVNode(child);
}

function normalizeChildren(vnode, children) {
  var type = 0;
  var shapeFlag = vnode.shapeFlag;

  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16
    /* ARRAY_CHILDREN */
    ;
  } else if (_typeof(children) === 'object') {
    // Normalize slot to plain children
    if ((shapeFlag & 1
    /* ELEMENT */
    || shapeFlag & 64
    /* TELEPORT */
    ) && children.default) {
      normalizeChildren(vnode, children.default());
      return;
    } else {
      type = 32
      /* SLOTS_CHILDREN */
      ;

      if (!children._ && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      }
    }
  } else if (isFunction(children)) {
    children = {
      default: children,
      _ctx: currentRenderingInstance
    };
    type = 32
    /* SLOTS_CHILDREN */
    ;
  } else {
    children = String(children); // force teleport children to array so it can be moved around

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
        type = 16
        /* ARRAY_CHILDREN */
        ;
        children = [createTextVNode(children)];
      } else {
      type = 8
      /* TEXT_CHILDREN */
      ;
    }
  }

  vnode.children = children;
  vnode.shapeFlag |= type;
}

var handlersRE = /^on|^vnode/;

function mergeProps() {
  var ret = extend({}, arguments.length <= 0 ? undefined : arguments[0]);

  for (var i = 1; i < arguments.length; i++) {
    var toMerge = i < 0 || arguments.length <= i ? undefined : arguments[i];

    for (var key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (handlersRE.test(key)) {
        // on*, vnode*
        var existing = ret[key];
        var incoming = toMerge[key];

        if (existing !== incoming) {
          ret[key] = existing ? [].concat(existing, toMerge[key]) : incoming;
        }
      } else {
        ret[key] = toMerge[key];
      }
    }
  }

  return ret;
}

function emit(instance, event) {
  var props = instance.vnode.props || EMPTY_OBJ;

  for (var _len5 = arguments.length, args = new Array(_len5 > 2 ? _len5 - 2 : 0), _key6 = 2; _key6 < _len5; _key6++) {
    args[_key6 - 2] = arguments[_key6];
  }

  {
    var options = normalizeEmitsOptions(instance.type.emits);

    if (options) {
      if (!(event in options)) {
        var propsOptions = normalizePropsOptions(instance.type)[0];

        if (!propsOptions || !("on" + capitalize(event) in propsOptions)) {
          warn("Component emitted event \"".concat(event, "\" but it is neither declared in ") + "the emits option nor as an \"on".concat(capitalize(event), "\" prop."));
        }
      } else {
        var validator = options[event];

        if (isFunction(validator)) {
          var isValid = validator.apply(void 0, args);

          if (!isValid) {
            warn("Invalid event arguments: event validation failed for event \"".concat(event, "\"."));
          }
        }
      }
    }
  }
  var handler = props["on".concat(capitalize(event))]; // for v-model update:xxx events, also trigger kebab-case equivalent
  // for props passed via kebab-case

  if (!handler && event.startsWith('update:')) {
    event = hyphenate(event);
    handler = props["on".concat(capitalize(event))];
  }

  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6
    /* COMPONENT_EVENT_HANDLER */
    , args);
  }
}

function normalizeEmitsOptions(options) {
  if (!options) {
    return;
  } else if (isArray(options)) {
    if (options._n) {
      return options._n;
    }

    var normalized = {};
    options.forEach(function (key) {
      return normalized[key] = null;
    });
    def(options, '_n', normalized);
    return normalized;
  } else {
    return options;
  }
} // Check if an incoming prop key is a declared emit event listener.
// e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
// both considered matched listeners.


function isEmitListener(emits, key) {
  return isOn(key) && (hasOwn(emits = normalizeEmitsOptions(emits), key[2].toLowerCase() + key.slice(3)) || hasOwn(emits, key.slice(2)));
}

function initProps(instance, rawProps, isStateful) {
  var isSSR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var props = {};
  var attrs = {};
  def(attrs, InternalObjectKey, 1);
  setFullProps(instance, rawProps, props, attrs); // validation

  {
    validateProps(props, instance.type);
  }

  if (isStateful) {
    // stateful
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      // functional w/ optional props, props === attrs
      instance.props = attrs;
    } else {
      // functional w/ declared props
      instance.props = props;
    }
  }

  instance.attrs = attrs;
}

function updateProps(instance, rawProps, rawPrevProps, optimized) {
  var props = instance.props,
      attrs = instance.attrs,
      patchFlag = instance.vnode.patchFlag;
  var rawCurrentProps = toRaw(props);

  var _normalizePropsOption = normalizePropsOptions(instance.type),
      _normalizePropsOption2 = _slicedToArray(_normalizePropsOption, 1),
      options = _normalizePropsOption2[0];

  if ((optimized || patchFlag > 0) && !(patchFlag & 16
  /* FULL_PROPS */
  )) {
    if (patchFlag & 8
    /* PROPS */
    ) {
        // Compiler-generated props & no keys change, just set the updated
        // the props.
        var propsToUpdate = instance.vnode.dynamicProps;

        for (var i = 0; i < propsToUpdate.length; i++) {
          var key = propsToUpdate[i]; // PROPS flag guarantees rawProps to be non-null

          var value = rawProps[key];

          if (options) {
            // attr / props separation was done on init and will be consistent
            // in this code path, so just check if attrs have it.
            if (hasOwn(attrs, key)) {
              attrs[key] = value;
            } else {
              var camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value);
            }
          } else {
            attrs[key] = value;
          }
        }
      }
  } else {
    // full props update.
    setFullProps(instance, rawProps, props, attrs); // in case of dynamic props, check if we need to delete keys from
    // the props object

    var kebabKey;

    for (var _key7 in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, _key7) && ( // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      (kebabKey = hyphenate(_key7)) === _key7 || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && ( // for camelCase
          rawPrevProps[_key7] !== undefined || // for kebab-case
          rawPrevProps[kebabKey] !== undefined)) {
            props[_key7] = resolvePropValue(options, rawProps || EMPTY_OBJ, _key7, undefined);
          }
        } else {
          delete props[_key7];
        }
      }
    } // in the case of functional component w/o props declaration, props and
    // attrs point to the same object so it should already have been updated.


    if (attrs !== rawCurrentProps) {
      for (var _key8 in attrs) {
        if (!rawProps || !hasOwn(rawProps, _key8)) {
          delete attrs[_key8];
        }
      }
    }
  } // trigger updates for $attrs in case it's used in component slots


  trigger(instance, "set"
  /* SET */
  , '$attrs');

  if (rawProps) {
    validateProps(props, instance.type);
  }
}

function setFullProps(instance, rawProps, props, attrs) {
  var _normalizePropsOption3 = normalizePropsOptions(instance.type),
      _normalizePropsOption4 = _slicedToArray(_normalizePropsOption3, 2),
      options = _normalizePropsOption4[0],
      needCastKeys = _normalizePropsOption4[1];

  var emits = instance.type.emits;

  if (rawProps) {
    for (var key in rawProps) {
      var value = rawProps[key]; // key, ref are reserved and never passed down

      if (isReservedProp(key)) {
        continue;
      } // prop option names are camelized during normalization, so to support
      // kebab -> camel conversion here we need to camelize the key.


      var camelKey = void 0;

      if (options && hasOwn(options, camelKey = camelize(key))) {
        props[camelKey] = value;
      } else if (!emits || !isEmitListener(emits, key)) {
        // Any non-declared (either as a prop or an emitted event) props are put
        // into a separate `attrs` object for spreading. Make sure to preserve
        // original key casing
        attrs[key] = value;
      }
    }
  }

  if (needCastKeys) {
    var rawCurrentProps = toRaw(props);

    for (var i = 0; i < needCastKeys.length; i++) {
      var _key9 = needCastKeys[i];
      props[_key9] = resolvePropValue(options, rawCurrentProps, _key9, rawCurrentProps[_key9]);
    }
  }
}

function resolvePropValue(options, props, key, value) {
  var opt = options[key];

  if (opt != null) {
    var hasDefault = hasOwn(opt, 'default'); // default values

    if (hasDefault && value === undefined) {
      var defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    } // boolean casting


    if (opt[0
    /* shouldCast */
    ]) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (opt[1
      /* shouldCastTrue */
      ] && (value === '' || value === hyphenate(key))) {
        value = true;
      }
    }
  }

  return value;
}

function normalizePropsOptions(comp) {
  if (comp.__props) {
    return comp.__props;
  }

  var raw = comp.props;
  var normalized = {};
  var needCastKeys = []; // apply mixin/extends props

  var hasExtends = false;

  if (!isFunction(comp)) {
    var extendProps = function extendProps(raw) {
      var _normalizePropsOption5 = normalizePropsOptions(raw),
          _normalizePropsOption6 = _slicedToArray(_normalizePropsOption5, 2),
          props = _normalizePropsOption6[0],
          keys = _normalizePropsOption6[1];

      extend(normalized, props);
      if (keys) needCastKeys.push.apply(needCastKeys, _toConsumableArray(keys));
    };

    if (comp.extends) {
      hasExtends = true;
      extendProps(comp.extends);
    }

    if (comp.mixins) {
      hasExtends = true;
      comp.mixins.forEach(extendProps);
    }
  }

  if (!raw && !hasExtends) {
    return comp.__props = EMPTY_ARR;
  }

  if (isArray(raw)) {
    for (var i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn("props must be strings when using array syntax.", raw[i]);
      }

      var normalizedKey = camelize(raw[i]);

      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn("invalid props options", raw);
    }

    for (var key in raw) {
      var _normalizedKey = camelize(key);

      if (validatePropName(_normalizedKey)) {
        var opt = raw[key];
        var prop = normalized[_normalizedKey] = isArray(opt) || isFunction(opt) ? {
          type: opt
        } : opt;

        if (prop) {
          var booleanIndex = getTypeIndex(Boolean, prop.type);
          var stringIndex = getTypeIndex(String, prop.type);
          prop[0
          /* shouldCast */
          ] = booleanIndex > -1;
          prop[1
          /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex; // if the prop needs boolean casting or default value

          if (booleanIndex > -1 || hasOwn(prop, 'default')) {
            needCastKeys.push(_normalizedKey);
          }
        }
      }
    }
  }

  var normalizedEntry = [normalized, needCastKeys];
  comp.__props = normalizedEntry;
  return normalizedEntry;
} // use function string name to check type constructors
// so that it works across vms / iframes.


function getType(ctor) {
  var match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i;
      }
    }
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  return -1;
}
/**
 * dev only
 */


function validateProps(props, comp) {
  var rawValues = toRaw(props);
  var options = normalizePropsOptions(comp)[0];

  for (var key in options) {
    var opt = options[key];
    if (opt == null) continue;
    validateProp(key, rawValues[key], opt, !hasOwn(rawValues, key));
  }
}
/**
 * dev only
 */


function validatePropName(key) {
  if (key[0] !== '$') {
    return true;
  } else {
    warn("Invalid prop name: \"".concat(key, "\" is a reserved property."));
  }

  return false;
}
/**
 * dev only
 */


function validateProp(name, value, prop, isAbsent) {
  var type = prop.type,
      required = prop.required,
      validator = prop.validator; // required!

  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  } // missing but optional


  if (value == null && !prop.required) {
    return;
  } // type check


  if (type != null && type !== true) {
    var isValid = false;
    var types = isArray(type) ? type : [type];
    var expectedTypes = []; // value is valid as long as one of the specified types match

    for (var i = 0; i < types.length && !isValid; i++) {
      var _assertType = assertType(value, types[i]),
          valid = _assertType.valid,
          expectedType = _assertType.expectedType;

      expectedTypes.push(expectedType || '');
      isValid = valid;
    }

    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  } // custom validator


  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}

var isSimpleType = /*#__PURE__*/makeMap('String,Number,Boolean,Function,Symbol');
/**
 * dev only
 */

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (isSimpleType(expectedType)) {
    var t = _typeof(value);

    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = toRawType(value) === 'Object';
  } else if (expectedType === 'Array') {
    valid = isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * dev only
 */


function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") + " Expected ".concat(expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value ".concat(expectedValue);
  }

  message += ", got ".concat(receivedType, " "); // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value ".concat(receivedValue, ".");
  }

  return message;
}
/**
 * dev only
 */


function styleValue(value, type) {
  if (type === 'String') {
    return "\"".concat(value, "\"");
  } else if (type === 'Number') {
    return "".concat(Number(value));
  } else {
    return "".concat(value);
  }
}
/**
 * dev only
 */


function isExplicable(type) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return type.toLowerCase() === elem;
  });
}
/**
 * dev only
 */


function isBoolean() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key10 = 0; _key10 < _len6; _key10++) {
    args[_key10] = arguments[_key10];
  }

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}

var isInternalKey = function isInternalKey(key) {
  return key[0] === '_' || key === '$stable';
};

var normalizeSlotValue = function normalizeSlotValue(value) {
  return isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
};

var normalizeSlot = function normalizeSlot(key, rawSlot, ctx) {
  return withCtx(function (props) {
    if (currentInstance) {
      warn("Slot \"".concat(key, "\" invoked outside of the render function: ") + "this will not track dependencies used in the slot. " + "Invoke the slot function inside the render function instead.");
    }

    return normalizeSlotValue(rawSlot(props));
  }, ctx);
};

var normalizeObjectSlots = function normalizeObjectSlots(rawSlots, slots) {
  var ctx = rawSlots._ctx;

  for (var key in rawSlots) {
    if (isInternalKey(key)) continue;
    var value = rawSlots[key];

    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      (function () {
        {
          warn("Non-function value encountered for slot \"".concat(key, "\". ") + "Prefer function slots for better performance.");
        }
        var normalized = normalizeSlotValue(value);

        slots[key] = function () {
          return normalized;
        };
      })();
    }
  }
};

var normalizeVNodeSlots = function normalizeVNodeSlots(instance, children) {
  if (!isKeepAlive(instance.vnode)) {
    warn("Non-function value encountered for default slot. " + "Prefer function slots for better performance.");
  }

  var normalized = normalizeSlotValue(children);

  instance.slots.default = function () {
    return normalized;
  };
};

var initSlots = function initSlots(instance, children) {
  if (instance.vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      if (children._ === 1) {
        instance.slots = children; // make compiler marker non-enumerable

        def(children, '_', 1);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
    instance.slots = {};

    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }

  def(instance.slots, InternalObjectKey, 1);
};

var updateSlots = function updateSlots(instance, children) {
  var vnode = instance.vnode,
      slots = instance.slots;
  var needDeletionCheck = true;
  var deletionComparisonTarget = EMPTY_OBJ;

  if (vnode.shapeFlag & 32
  /* SLOTS_CHILDREN */
  ) {
      if (children._ === 1) {
        // compiled slots.
        if (isHmrUpdating) {
          // Parent was HMR updated so slot content may have changed.
          // force update slots and mark instance for hmr as well
          extend(slots, children);
        } else if ( // bail on dynamic slots (v-if, v-for, reference of scope variables)
        !(vnode.patchFlag & 1024
        /* DYNAMIC_SLOTS */
        )) {
          // compiled AND static.
          // no need to update, and skip stale slots removal.
          needDeletionCheck = false;
        } else {
          // compiled but dynamic - update slots, but skip normalization.
          extend(slots, children);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }

      deletionComparisonTarget = children;
    } else if (children) {
    // non slot object children (direct value) passed to a component
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = {
      default: 1
    };
  } // delete stale slots


  if (needDeletionCheck) {
    for (var key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
/**
Runtime helper for applying directives to a vnode. Example usage:
  const comp = resolveComponent('comp')
const foo = resolveDirective('foo')
const bar = resolveDirective('bar')
  return withDirectives(h(comp), [
  [foo, this.x],
  [bar, this.y]
])
*/


var isBuiltInDirective = /*#__PURE__*/makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text');

function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn('Do not use built-in directive ids as custom directive id: ' + name);
  }
}
/**
 * Adds directives to a VNode.
 */


function withDirectives(vnode, directives) {
  var internalInstance = currentRenderingInstance;

  if (internalInstance === null) {
    warn("withDirectives can only be used inside render functions.");
    return vnode;
  }

  var instance = internalInstance.proxy;
  var bindings = vnode.dirs || (vnode.dirs = []);

  for (var i = 0; i < directives.length; i++) {
    var _directives$i = _slicedToArray(directives[i], 4),
        dir = _directives$i[0],
        value = _directives$i[1],
        arg = _directives$i[2],
        _directives$i$ = _directives$i[3],
        modifiers = _directives$i$ === void 0 ? EMPTY_OBJ : _directives$i$;

    if (isFunction(dir)) {
      dir = {
        mounted: dir,
        updated: dir
      };
    }

    bindings.push({
      dir: dir,
      instance: instance,
      value: value,
      oldValue: void 0,
      arg: arg,
      modifiers: modifiers
    });
  }

  return vnode;
}

function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  var bindings = vnode.dirs;
  var oldBindings = prevVNode && prevVNode.dirs;

  for (var i = 0; i < bindings.length; i++) {
    var binding = bindings[i];

    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }

    var hook = binding.dir[name];

    if (hook) {
      callWithAsyncErrorHandling(hook, instance, 8
      /* DIRECTIVE_HOOK */
      , [vnode.el, binding, vnode, prevVNode]);
    }
  }
}

function createAppContext() {
  return {
    config: {
      isNativeTag: NO,
      devtools: true,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      isCustomElement: NO,
      errorHandler: undefined,
      warnHandler: undefined
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null)
  };
}

function createAppAPI(render, hydrate) {
  return function createApp(rootComponent) {
    var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (rootProps != null && !isObject(rootProps)) {
      warn("root props passed to app.mount() must be an object.");
      rootProps = null;
    }

    var context = createAppContext();
    var installedPlugins = new Set();
    var isMounted = false;
    var app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      version: version,

      get config() {
        return context.config;
      },

      set config(v) {
        {
          warn("app.config cannot be replaced. Modify individual options instead.");
        }
      },

      use: function use(plugin) {
        for (var _len7 = arguments.length, options = new Array(_len7 > 1 ? _len7 - 1 : 0), _key11 = 1; _key11 < _len7; _key11++) {
          options[_key11 - 1] = arguments[_key11];
        }

        if (installedPlugins.has(plugin)) {
          warn("Plugin has already been applied to target app.");
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install.apply(plugin, [app].concat(options));
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin.apply(void 0, [app].concat(options));
        } else {
          warn("A plugin must either be a function or an object with an \"install\" " + "function.");
        }

        return app;
      },
      mixin: function mixin(_mixin) {
        {
          if (!context.mixins.includes(_mixin)) {
            context.mixins.push(_mixin);
          } else {
            warn('Mixin has already been applied to target app' + (_mixin.name ? ": ".concat(_mixin.name) : ''));
          }
        }
        return app;
      },
      component: function component(name, _component) {
        {
          validateComponentName(name, context.config);
        }

        if (!_component) {
          return context.components[name];
        }

        if (context.components[name]) {
          warn("Component \"".concat(name, "\" has already been registered in target app."));
        }

        context.components[name] = _component;
        return app;
      },
      directive: function directive(name, _directive) {
        {
          validateDirectiveName(name);
        }

        if (!_directive) {
          return context.directives[name];
        }

        if (context.directives[name]) {
          warn("Directive \"".concat(name, "\" has already been registered in target app."));
        }

        context.directives[name] = _directive;
        return app;
      },
      mount: function mount(rootContainer, isHydrate) {
        if (!isMounted) {
          var vnode = createVNode(rootComponent, rootProps); // store app context on the root VNode.
          // this will be set on the root instance on initial mount.

          vnode.appContext = context; // HMR root reload

          {
            context.reload = function () {
              render(cloneVNode(vnode), rootContainer);
            };
          }

          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer);
          }

          isMounted = true;
          app._container = rootContainer;
          return vnode.component.proxy;
        } else {
          warn("App has already been mounted.\n" + "If you want to remount the same app, move your app creation logic " + "into a factory function and create fresh app instances for each " + "mount - e.g. `const createMyApp = () => createApp(App)`");
        }
      },
      unmount: function unmount() {
        if (isMounted) {
          render(null, app._container);
        } else {
          warn("Cannot unmount an app that is not mounted.");
        }
      },
      provide: function provide(key, value) {
        if (key in context.provides) {
          warn("App already provides property with key \"".concat(String(key), "\". ") + "It will be overwritten with the new value.");
        } // TypeScript doesn't allow symbols as index type
        // https://github.com/Microsoft/TypeScript/issues/24587


        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}

var hasMismatch = false;

var isSVGContainer = function isSVGContainer(container) {
  return /svg/.test(container.namespaceURI) && container.tagName !== 'foreignObject';
};

var isComment = function isComment(node) {
  return node.nodeType === 8;
}
/* COMMENT */
; // Note: hydration is DOM-specific
// But we have to place it in core due to tight coupling with core - splitting
// it out creates a ton of unnecessary complexity.
// Hydration also depends on some renderer internal logic which needs to be
// passed in via arguments.


function createHydrationFunctions(rendererInternals) {
  var mountComponent = rendererInternals.mt,
      patch = rendererInternals.p,
      _rendererInternals$o = rendererInternals.o,
      patchProp = _rendererInternals$o.patchProp,
      nextSibling = _rendererInternals$o.nextSibling,
      parentNode = _rendererInternals$o.parentNode,
      remove = _rendererInternals$o.remove,
      insert = _rendererInternals$o.insert,
      createComment = _rendererInternals$o.createComment;

  var hydrate = function hydrate(vnode, container) {
    if (!container.hasChildNodes()) {
      warn("Attempting to hydrate existing markup but container is empty. " + "Performing full mount instead.");
      patch(null, vnode, container);
      return;
    }

    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null);
    flushPostFlushCbs();

    if (hasMismatch && !false) {
      // this error should show up in production
      console.error("Hydration completed but contains mismatches.");
    }
  };

  var hydrateNode = function hydrateNode(node, vnode, parentComponent, parentSuspense) {
    var optimized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var isFragmentStart = isComment(node) && node.data === '[';

    var onMismatch = function onMismatch() {
      return handleMismtach(node, vnode, parentComponent, parentSuspense, isFragmentStart);
    };

    var type = vnode.type,
        ref = vnode.ref,
        shapeFlag = vnode.shapeFlag;
    var domType = node.nodeType;
    vnode.el = node;
    var nextNode = null;

    switch (type) {
      case Text:
        if (domType !== 3
        /* TEXT */
        ) {
            nextNode = onMismatch();
          } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
            warn("Hydration text mismatch:" + "\n- Client: ".concat(JSON.stringify(node.data)) + "\n- Server: ".concat(JSON.stringify(vnode.children)));
            node.data = vnode.children;
          }

          nextNode = nextSibling(node);
        }

        break;

      case Comment:
        if (domType !== 8
        /* COMMENT */
        || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }

        break;

      case Static:
        if (domType !== 1
        /* ELEMENT */
        ) {
            nextNode = onMismatch();
          } else {
          // determine anchor, adopt content
          nextNode = node; // if the static vnode has its content stripped during build,
          // adopt it from the server-rendered HTML.

          var needToAdoptContent = !vnode.children.length;

          for (var i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent) vnode.children += nextNode.outerHTML;

            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }

            nextNode = nextSibling(nextNode);
          }

          return nextNode;
        }

        break;

      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(node, vnode, parentComponent, parentSuspense, optimized);
        }

        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            if (domType !== 1
            /* ELEMENT */
            || vnode.type !== node.tagName.toLowerCase()) {
              nextNode = onMismatch();
            } else {
              nextNode = hydrateElement(node, vnode, parentComponent, parentSuspense, optimized);
            }
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            // when setting up the render effect, if the initial vnode already
            // has .el set, the component will perform hydration instead of mount
            // on its sub-tree.
            var container = parentNode(node);

            var hydrateComponent = function hydrateComponent() {
              mountComponent(vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container), optimized);
            }; // async component


            var loadAsync = vnode.type.__asyncLoader;

            if (loadAsync) {
              loadAsync().then(hydrateComponent);
            } else {
              hydrateComponent();
            } // component may be async, so in the case of fragments we cannot rely
            // on component's rendered output to determine the end of the fragment
            // instead, we do a lookahead to find the end anchor node.


            nextNode = isFragmentStart ? locateClosingAsyncAnchor(node) : nextSibling(node);
          } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
            if (domType !== 8
            /* COMMENT */
            ) {
                nextNode = onMismatch();
              } else {
              nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, optimized, rendererInternals, hydrateChildren);
            }
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
            nextNode = vnode.type.hydrate(node, vnode, parentComponent, parentSuspense, isSVGContainer(parentNode(node)), optimized, rendererInternals, hydrateNode);
          } else {
          warn('Invalid HostVNode type:', type, "(".concat(_typeof(type), ")"));
        }

    }

    if (ref != null && parentComponent) {
      setRef(ref, null, parentComponent, vnode);
    }

    return nextNode;
  };

  var hydrateElement = function hydrateElement(el, vnode, parentComponent, parentSuspense, optimized) {
    optimized = optimized || !!vnode.dynamicChildren;
    var props = vnode.props,
        patchFlag = vnode.patchFlag,
        shapeFlag = vnode.shapeFlag,
        dirs = vnode.dirs; // skip props & children if this is hoisted static nodes

    if (patchFlag !== -1
    /* HOISTED */
    ) {
        // props
        if (props) {
          if (!optimized || patchFlag & 16
          /* FULL_PROPS */
          || patchFlag & 32
          /* HYDRATE_EVENTS */
          ) {
            for (var key in props) {
              if (!isReservedProp(key) && isOn(key)) {
                patchProp(el, key, null, props[key]);
              }
            }
          } else if (props.onClick) {
            // Fast path for click listeners (which is most often) to avoid
            // iterating through props.
            patchProp(el, 'onClick', null, props.onClick);
          }
        } // vnode / directive hooks


        var vnodeHooks;

        if (vnodeHooks = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHooks, parentComponent, vnode);
        }

        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
        }

        if ((vnodeHooks = props && props.onVnodeMounted) || dirs) {
          queueEffectWithSuspense(function () {
            vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
          }, parentSuspense);
        } // children


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        && // skip if element has innerHTML / textContent
        !(props && (props.innerHTML || props.textContent))) {
          var next = hydrateChildren(el.firstChild, vnode, el, parentComponent, parentSuspense, optimized);
          var _hasWarned = false;

          while (next) {
            hasMismatch = true;

            if (!_hasWarned) {
              warn("Hydration children mismatch in <".concat(vnode.type, ">: ") + "server rendered element contains more child nodes than client vdom.");
              _hasWarned = true;
            } // The SSRed DOM contains more nodes than it should. Remove them.


            var cur = next;
            next = next.nextSibling;
            remove(cur);
          }
        } else if (shapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            if (el.textContent !== vnode.children) {
              hasMismatch = true;
              warn("Hydration text content mismatch in <".concat(vnode.type, ">:\n") + "- Client: ".concat(el.textContent, "\n") + "- Server: ".concat(vnode.children));
              el.textContent = vnode.children;
            }
          }
      }

    return el.nextSibling;
  };

  var hydrateChildren = function hydrateChildren(node, vnode, container, parentComponent, parentSuspense, optimized) {
    optimized = optimized || !!vnode.dynamicChildren;
    var children = vnode.children;
    var l = children.length;
    var hasWarned = false;

    for (var i = 0; i < l; i++) {
      var _vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);

      if (node) {
        node = hydrateNode(node, _vnode, parentComponent, parentSuspense, optimized);
      } else {
        hasMismatch = true;

        if (!hasWarned) {
          warn("Hydration children mismatch in <".concat(container.tagName.toLowerCase(), ">: ") + "server rendered element contains fewer child nodes than client vdom.");
          hasWarned = true;
        } // the SSRed DOM didn't contain enough nodes. Mount the missing ones.


        patch(null, _vnode, container, null, parentComponent, parentSuspense, isSVGContainer(container));
      }
    }

    return node;
  };

  var hydrateFragment = function hydrateFragment(node, vnode, parentComponent, parentSuspense, optimized) {
    var container = parentNode(node);
    var next = hydrateChildren(nextSibling(node), vnode, container, parentComponent, parentSuspense, optimized);

    if (next && isComment(next) && next.data === ']') {
      return nextSibling(vnode.anchor = next);
    } else {
      // fragment didn't hydrate successfully, since we didn't get a end anchor
      // back. This should have led to node/children mismatch warnings.
      hasMismatch = true; // since the anchor is missing, we need to create one and insert it

      insert(vnode.anchor = createComment("]"), container, next);
      return next;
    }
  };

  var handleMismtach = function handleMismtach(node, vnode, parentComponent, parentSuspense, isFragment) {
    hasMismatch = true;
    warn("Hydration node mismatch:\n- Client vnode:", vnode.type, "\n- Server rendered DOM:", node, node.nodeType === 3
    /* TEXT */
    ? "(text)" : isComment(node) && node.data === '[' ? "(start of fragment)" : "");
    vnode.el = null;

    if (isFragment) {
      // remove excessive fragment nodes
      var end = locateClosingAsyncAnchor(node);

      while (true) {
        var _next2 = nextSibling(node);

        if (_next2 && _next2 !== end) {
          remove(_next2);
        } else {
          break;
        }
      }
    }

    var next = nextSibling(node);
    var container = parentNode(node);
    remove(node);
    patch(null, vnode, container, next, parentComponent, parentSuspense, isSVGContainer(container));
    return next;
  };

  var locateClosingAsyncAnchor = function locateClosingAsyncAnchor(node) {
    var match = 0;

    while (node) {
      node = nextSibling(node);

      if (node && isComment(node)) {
        if (node.data === '[') match++;

        if (node.data === ']') {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }

    return node;
  };

  return [hydrate, hydrateNode];
}

var supported;
var perf;

function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark("vue-".concat(type, "-").concat(instance.uid));
  }
}

function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    var startTag = "vue-".concat(type, "-").concat(instance.uid);
    var endTag = startTag + ":end";
    perf.mark(endTag);
    perf.measure("<".concat(formatComponentName(instance, instance.type), "> ").concat(type), startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
}

function isSupported() {
  if (supported !== undefined) {
    return supported;
  }
  /* eslint-disable no-restricted-globals */


  if (typeof window !== 'undefined' && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  /* eslint-enable no-restricted-globals */


  return supported;
}

function createDevEffectOptions(instance) {
  return {
    scheduler: queueJob,
    onTrack: instance.rtc ? function (e) {
      return invokeArrayFns(instance.rtc, e);
    } : void 0,
    onTrigger: instance.rtg ? function (e) {
      return invokeArrayFns(instance.rtg, e);
    } : void 0
  };
}

var queuePostRenderEffect = queueEffectWithSuspense;

var setRef = function setRef(rawRef, oldRawRef, parent, vnode) {
  var value;

  if (!vnode) {
    value = null;
  } else {
    if (vnode.shapeFlag & 4
    /* STATEFUL_COMPONENT */
    ) {
        value = vnode.component.proxy;
      } else {
      value = vnode.el;
    }
  }

  var _rawRef = _slicedToArray(rawRef, 2),
      owner = _rawRef[0],
      ref = _rawRef[1];

  if (!owner) {
    warn("Missing ref owner context. ref cannot be used on hoisted vnodes. " + "A vnode with ref must be created inside the render function.");
    return;
  }

  var oldRef = oldRawRef && oldRawRef[1];
  var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  var setupState = owner.setupState; // unset old ref

  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null;

      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }

  if (isString(ref)) {
    refs[ref] = value;

    if (hasOwn(setupState, ref)) {
      setupState[ref] = value;
    }
  } else if (isRef(ref)) {
    ref.value = value;
  } else if (isFunction(ref)) {
    callWithErrorHandling(ref, parent, 12
    /* FUNCTION_REF */
    , [value, refs]);
  } else {
    warn('Invalid template ref type:', value, "(".concat(_typeof(value), ")"));
  }
};
/**
 * The createRenderer function accepts two generic arguments:
 * HostNode and HostElement, corresponding to Node and Element types in the
 * host environment. For example, for runtime-dom, HostNode would be the DOM
 * `Node` interface and HostElement would be the DOM `Element` interface.
 *
 * Custom renderers can pass in the platform specific types like this:
 *
 * ``` js
 * const { render, createApp } = createRenderer<Node, Element>({
 *   patchProp,
 *   ...nodeOps
 * })
 * ```
 */


function createRenderer(options) {
  return baseCreateRenderer(options);
} // Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.


function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
} // implementation


function baseCreateRenderer(options, createHydrationFns) {
  var hostInsert = options.insert,
      hostRemove = options.remove,
      hostPatchProp = options.patchProp,
      hostForcePatchProp = options.forcePatchProp,
      hostCreateElement = options.createElement,
      hostCreateText = options.createText,
      hostCreateComment = options.createComment,
      hostSetText = options.setText,
      hostSetElementText = options.setElementText,
      hostParentNode = options.parentNode,
      hostNextSibling = options.nextSibling,
      _options$setScopeId = options.setScopeId,
      hostSetScopeId = _options$setScopeId === void 0 ? NOOP : _options$setScopeId,
      hostCloneNode = options.cloneNode,
      hostInsertStaticContent = options.insertStaticContent; // Note: functions inside this closure should use `const xxx = () => {}`
  // style in order to prevent being inlined by minifiers.

  var patch = function patch(n1, n2, container) {
    var anchor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var parentComponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var parentSuspense = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var isSVG = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var optimized = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    // patching & not same type, unmount old tree
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }

    if (n2.patchFlag === -2
    /* BAIL */
    ) {
        optimized = false;
        n2.dynamicChildren = null;
      }

    var type = n2.type,
        ref = n2.ref,
        shapeFlag = n2.shapeFlag;

    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;

      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;

      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else {
          patchStaticNode(n1, n2, container, isSVG);
        }

        break;

      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        break;

      default:
        if (shapeFlag & 1
        /* ELEMENT */
        ) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 6
        /* COMPONENT */
        ) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          } else if (shapeFlag & 64
        /* TELEPORT */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else if (shapeFlag & 128
        /* SUSPENSE */
        ) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, internals);
          } else {
          warn('Invalid VNode type:', type, "(".concat(_typeof(type), ")"));
        }

    } // set ref


    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentComponent, n2);
    }
  };

  var processText = function processText(n1, n2, container, anchor) {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      var el = n2.el = n1.el;

      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };

  var processCommentNode = function processCommentNode(n1, n2, container, anchor) {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
    } else {
      // there's no support for dynamic comments
      n2.el = n1.el;
    }
  };

  var mountStaticNode = function mountStaticNode(n2, container, anchor, isSVG) {
    var _hostInsertStaticCont = hostInsertStaticContent(n2.children, container, anchor, isSVG);

    var _hostInsertStaticCont2 = _slicedToArray(_hostInsertStaticCont, 2);

    n2.el = _hostInsertStaticCont2[0];
    n2.anchor = _hostInsertStaticCont2[1];
  };
  /**
   * Dev / HMR only
   */


  var patchStaticNode = function patchStaticNode(n1, n2, container, isSVG) {
    // static nodes are only patched during dev for HMR
    if (n2.children !== n1.children) {
      var anchor = hostNextSibling(n1.anchor); // remove existing

      removeStaticNode(n1);

      var _hostInsertStaticCont3 = hostInsertStaticContent(n2.children, container, anchor, isSVG);

      var _hostInsertStaticCont4 = _slicedToArray(_hostInsertStaticCont3, 2);

      n2.el = _hostInsertStaticCont4[0];
      n2.anchor = _hostInsertStaticCont4[1];
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  /**
   * Dev / HMR only
   */


  var moveStaticNode = function moveStaticNode(vnode, container, anchor) {
    var cur = vnode.el;
    var end = vnode.anchor;

    while (cur && cur !== end) {
      var next = hostNextSibling(cur);
      hostInsert(cur, container, anchor);
      cur = next;
    }

    hostInsert(end, container, anchor);
  };
  /**
   * Dev / HMR only
   */


  var removeStaticNode = function removeStaticNode(vnode) {
    var cur = vnode.el;

    while (cur && cur !== vnode.anchor) {
      var next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(vnode.anchor);
  };

  var processElement = function processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    isSVG = isSVG || n2.type === 'svg';

    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized);
    }
  };

  var mountElement = function mountElement(vnode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var el;
    var vnodeHook;
    var type = vnode.type,
        props = vnode.props,
        shapeFlag = vnode.shapeFlag,
        transition = vnode.transition,
        scopeId = vnode.scopeId,
        patchFlag = vnode.patchFlag,
        dirs = vnode.dirs;

    if (vnode.el && hostCloneNode !== undefined && patchFlag === -1
    /* HOISTED */
    ) {
        // If a vnode has non-null el, it means it's being reused.
        // Only static vnodes can be reused, so its mounted DOM nodes should be
        // exactly the same, and we can simply do a clone here.
        el = vnode.el = hostCloneNode(vnode.el);
      } else {
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is); // mount children first, since some props may rely on child content
      // being already rendered, e.g. `<select value>`

      if (shapeFlag & 8
      /* TEXT_CHILDREN */
      ) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', optimized || !!vnode.dynamicChildren);
        } // props


      if (props) {
        for (var key in props) {
          if (!isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }

        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }

      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
      } // scopeId


      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }

      var treeOwnerId = parentComponent && parentComponent.type.__scopeId; // vnode's own scopeId and the current patched component's scopeId is
      // different - this is a slot content node.

      if (treeOwnerId && treeOwnerId !== scopeId) {
        hostSetScopeId(el, treeOwnerId + '-s');
      }

      if (transition && !transition.persisted) {
        transition.beforeEnter(el);
      }
    }

    hostInsert(el, container, anchor);

    if ((vnodeHook = props && props.onVnodeMounted) || transition && !transition.persisted || dirs) {
      queuePostRenderEffect(function () {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        transition && !transition.persisted && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
      }, parentSuspense);
    }
  };

  var mountChildren = function mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var start = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;

    for (var i = start; i < children.length; i++) {
      var child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
    }
  };

  var patchElement = function patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized) {
    var el = n2.el = n1.el;
    var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren,
        dirs = n2.dirs; // #1426 take the old vnode's patch flag into account since user may clone a
    // compiler-generated vnode, which de-opts to FULL_PROPS

    patchFlag |= n1.patchFlag & 16
    /* FULL_PROPS */
    ;
    var oldProps = n1.props || EMPTY_OBJ;
    var newProps = n2.props || EMPTY_OBJ;
    var vnodeHook;

    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }

    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
    }

    if (isHmrUpdating) {
      // HMR updated, force full diff
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }

    if (patchFlag > 0) {
      // the presence of a patchFlag means this element's render code was
      // generated by the compiler and can take the fast path.
      // in this path old node and new node are guaranteed to have the same shape
      // (i.e. at the exact same position in the source template)
      if (patchFlag & 16
      /* FULL_PROPS */
      ) {
          // element props contain dynamic keys, full diff needed
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
        // class
        // this flag is matched when the element has dynamic class bindings.
        if (patchFlag & 2
        /* CLASS */
        ) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, 'class', null, newProps.class, isSVG);
            }
          } // style
        // this flag is matched when the element has dynamic style bindings


        if (patchFlag & 4
        /* STYLE */
        ) {
            hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
          } // props
        // This flag is matched when the element has dynamic prop/attr bindings
        // other than class and style. The keys of dynamic prop/attrs are saved for
        // faster iteration.
        // Note dynamic keys like :[foo]="bar" will cause this optimization to
        // bail out and go through a full diff because we need to unset the old key


        if (patchFlag & 8
        /* PROPS */
        ) {
            // if the flag is present then dynamicProps must be non-null
            var propsToUpdate = n2.dynamicProps;

            for (var i = 0; i < propsToUpdate.length; i++) {
              var key = propsToUpdate[i];
              var prev = oldProps[key];
              var next = newProps[key];

              if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
      } // text
      // This flag is matched when the element has only dynamic text children.


      if (patchFlag & 1
      /* TEXT */
      ) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
    } else if (!optimized && dynamicChildren == null) {
      // unoptimized, full diff
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
    }

    var areChildrenSVG = isSVG && n2.type !== 'foreignObject';

    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG);

      if (parentComponent && parentComponent.type.__hmrId) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      // full diff
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG);
    }

    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(function () {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
      }, parentSuspense);
    }
  }; // The fast path for blocks.


  var patchBlockChildren = function patchBlockChildren(oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG) {
    for (var i = 0; i < newChildren.length; i++) {
      var oldVNode = oldChildren[i];
      var newVNode = newChildren[i]; // Determine the container (parent element) for the patch.

      var container = // - In the case of a Fragment, we need to provide the actual parent
      // of the Fragment itself so it can move its children.
      oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
      // which also requires the correct parent container
      !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
      oldVNode.shapeFlag & 6
      /* COMPONENT */
      ? hostParentNode(oldVNode.el) : // In other cases, the parent container is not actually used so we
      // just pass the block element here to avoid a DOM parentNode call.
      fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, true);
    }
  };

  var patchProps = function patchProps(el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) {
    if (oldProps !== newProps) {
      for (var key in newProps) {
        if (isReservedProp(key)) continue;
        var next = newProps[key];
        var prev = oldProps[key];

        if (next !== prev || hostForcePatchProp && hostForcePatchProp(el, key)) {
          hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (var _key12 in oldProps) {
          if (!isReservedProp(_key12) && !(_key12 in newProps)) {
            hostPatchProp(el, _key12, oldProps[_key12], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
    }
  };

  var processFragment = function processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText('');
    var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText('');
    var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren;

    if (patchFlag > 0) {
      optimized = true;
    }

    if (isHmrUpdating) {
      // HMR updated, force full diff
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }

    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor); // a fragment can only have array children
      // since they are either generated by the compiler, or implicitly created
      // from arrays.

      mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      && dynamicChildren) {
        // a stable fragment (template root or <template v-for>) doesn't need to
        // patch children order, but it may contain dynamicChildren.
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG);

        if (parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else {
        // keyed / unkeyed, or manual fragments.
        // for keyed & unkeyed, since they are compiler generated from v-for,
        // each child is guaranteed to be a block so the fragment will never
        // have dynamicChildren.
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    }
  };

  var processComponent = function processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    if (n1 == null) {
      if (n2.shapeFlag & 512
      /* COMPONENT_KEPT_ALIVE */
      ) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };

  var mountComponent = function mountComponent(initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);

    if (instance.type.__hmrId) {
      registerHMR(instance);
    }

    {
      pushWarningContext(initialVNode);
      startMeasure(instance, "mount");
    } // inject renderer internals for keepAlive

    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    } // resolve props and slots for setup context


    {
      startMeasure(instance, "init");
    }
    setupComponent(instance);
    {
      endMeasure(instance, "init");
    } // setup() is async. This component relies on async logic to be resolved
    // before proceeding

    if (instance.asyncDep) {
      if (!parentSuspense) {
        warn('async setup() is used without a suspense boundary!');
        return;
      }

      parentSuspense.registerDep(instance, setupRenderEffect); // Give it a placeholder if this is not hydration

      if (!initialVNode.el) {
        var placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }

      return;
    }

    setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
    {
      popWarningContext();
      endMeasure(instance, "mount");
    }
  };

  var updateComponent = function updateComponent(n1, n2, optimized) {
    var instance = n2.component = n1.component;

    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        // async & still pending - just update props and slots
        // since the component's reactive effect for render isn't set-up yet
        {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        {
          popWarningContext();
        }
        return;
      } else {
        // normal update
        instance.next = n2; // in case the child component is also queued, remove it to avoid
        // double updating the same child component in the same flush.

        invalidateJob(instance.update); // instance.update is the reactive effect runner.

        instance.update();
      }
    } else {
      // no update needed. just copy over properties
      n2.component = n1.component;
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };

  var setupRenderEffect = function setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) {
    // create reactive effect for rendering
    instance.update = effect(function componentEffect() {
      if (!instance.isMounted) {
        var vnodeHook;
        var el = initialVNode.el,
            props = initialVNode.props;
        var bm = instance.bm,
            m = instance.m,
            a = instance.a,
            parent = instance.parent;
        {
          startMeasure(instance, "render");
        }
        var subTree = instance.subTree = renderComponentRoot(instance);
        {
          endMeasure(instance, "render");
        } // beforeMount hook

        if (bm) {
          invokeArrayFns(bm);
        } // onVnodeBeforeMount


        if (vnodeHook = props && props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }

        if (el && hydrateNode) {
          {
            startMeasure(instance, "hydrate");
          } // vnode has adopted host node - perform hydration instead of mount.

          hydrateNode(initialVNode.el, subTree, instance, parentSuspense);
          {
            endMeasure(instance, "hydrate");
          }
        } else {
          {
            startMeasure(instance, "patch");
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
          {
            endMeasure(instance, "patch");
          }
          initialVNode.el = subTree.el;
        } // mounted hook


        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        } // onVnodeMounted


        if (vnodeHook = props && props.onVnodeMounted) {
          queuePostRenderEffect(function () {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }, parentSuspense);
        } // activated hook for keep-alive roots.


        if (a && initialVNode.shapeFlag & 256
        /* COMPONENT_SHOULD_KEEP_ALIVE */
        ) {
            queuePostRenderEffect(a, parentSuspense);
          }

        instance.isMounted = true;
      } else {
        // updateComponent
        // This is triggered by mutation of component's own state (next: null)
        // OR parent calling processComponent (next: VNode)
        var next = instance.next,
            bu = instance.bu,
            u = instance.u,
            _parent = instance.parent,
            vnode = instance.vnode;
        var originNext = next;

        var _vnodeHook;

        {
          pushWarningContext(next || instance.vnode);
        }

        if (next) {
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }

        {
          startMeasure(instance, "render");
        }
        var nextTree = renderComponentRoot(instance);
        {
          endMeasure(instance, "render");
        }
        var prevTree = instance.subTree;
        instance.subTree = nextTree;
        next.el = vnode.el; // beforeUpdate hook

        if (bu) {
          invokeArrayFns(bu);
        } // onVnodeBeforeUpdate


        if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(_vnodeHook, _parent, next, vnode);
        } // reset refs
        // only needed if previous patch had refs


        if (instance.refs !== EMPTY_OBJ) {
          instance.refs = {};
        }

        {
          startMeasure(instance, "patch");
        }
        patch(prevTree, nextTree, // parent may have changed if it's in a teleport
        hostParentNode(prevTree.el), // anchor may have changed if it's in a fragment
        getNextHostNode(prevTree), instance, parentSuspense, isSVG);
        {
          endMeasure(instance, "patch");
        }
        next.el = nextTree.el;

        if (originNext === null) {
          // self-triggered update. In case of HOC, update parent component
          // vnode el. HOC is indicated by parent instance's subTree pointing
          // to child component's vnode
          updateHOCHostEl(instance, nextTree.el);
        } // updated hook


        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        } // onVnodeUpdated


        if (_vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(function () {
            invokeVNodeHook(_vnodeHook, _parent, next, vnode);
          }, parentSuspense);
        }

        {
          popWarningContext();
        }
      }
    }, createDevEffectOptions(instance));
  };

  var updateComponentPreRender = function updateComponentPreRender(instance, nextVNode, optimized) {
    if (instance.type.__hmrId) {
      optimized = false;
    }

    nextVNode.component = instance;
    var prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children);
  };

  var patchChildren = function patchChildren(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG) {
    var optimized = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var c1 = n1 && n1.children;
    var prevShapeFlag = n1 ? n1.shapeFlag : 0;
    var c2 = n2.children;
    var patchFlag = n2.patchFlag,
        shapeFlag = n2.shapeFlag; // fast path

    if (patchFlag > 0) {
      if (patchFlag & 128
      /* KEYED_FRAGMENT */
      ) {
          // this could be either fully-keyed or mixed (some keyed some not)
          // presence of patchFlag means children are guaranteed to be arrays
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        } else if (patchFlag & 256
      /* UNKEYED_FRAGMENT */
      ) {
          // unkeyed
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          return;
        }
    } // children has 3 possibilities: text, array or no children.


    if (shapeFlag & 8
    /* TEXT_CHILDREN */
    ) {
        // text children fast path
        if (prevShapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }

        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
      if (prevShapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          // prev children was array
          if (shapeFlag & 16
          /* ARRAY_CHILDREN */
          ) {
              // two arrays, cannot assume anything, do full diff
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
            } else {
            // no new children, just unmount old
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
        // prev children was text OR null
        // new children is array OR null
        if (prevShapeFlag & 8
        /* TEXT_CHILDREN */
        ) {
            hostSetElementText(container, '');
          } // mount new if array


        if (shapeFlag & 16
        /* ARRAY_CHILDREN */
        ) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
      }
    }
  };

  var patchUnkeyedChildren = function patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    var oldLength = c1.length;
    var newLength = c2.length;
    var commonLength = Math.min(oldLength, newLength);
    var i;

    for (i = 0; i < commonLength; i++) {
      var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, optimized);
    }

    if (oldLength > newLength) {
      // remove old
      unmountChildren(c1, parentComponent, parentSuspense, true, commonLength);
    } else {
      // mount new
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized, commonLength);
    }
  }; // can be all-keyed or mixed


  var patchKeyedChildren = function patchKeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, optimized) {
    var i = 0;
    var l2 = c2.length;
    var e1 = c1.length - 1; // prev ending index

    var e2 = l2 - 1; // next ending index
    // 1. sync from start
    // (a b) c
    // (a b) d e

    while (i <= e1 && i <= e2) {
      var n1 = c1[i];
      var n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      i++;
    } // 2. sync from end
    // a (b c)
    // d e (b c)


    while (i <= e1 && i <= e2) {
      var _n2 = c1[e1];

      var _n3 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);

      if (isSameVNodeType(_n2, _n3)) {
        patch(_n2, _n3, container, null, parentComponent, parentSuspense, isSVG, optimized);
      } else {
        break;
      }

      e1--;
      e2--;
    } // 3. common sequence + mount
    // (a b)
    // (a b) c
    // i = 2, e1 = 1, e2 = 2
    // (a b)
    // c (a b)
    // i = 0, e1 = -1, e2 = 0


    if (i > e1) {
      if (i <= e2) {
        var nextPos = e2 + 1;
        var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;

        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG);
          i++;
        }
      }
    } // 4. common sequence + unmount
    // (a b) c
    // (a b)
    // i = 2, e1 = 2, e2 = 1
    // a (b c)
    // (b c)
    // i = 0, e1 = 0, e2 = -1
    else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } // 5. unknown sequence
      // [i ... e1 + 1]: a b [c d e] f g
      // [i ... e2 + 1]: a b [e d c h] f g
      // i = 2, e1 = 4, e2 = 5
      else {
          var s1 = i; // prev starting index

          var s2 = i; // next starting index
          // 5.1 build key:index map for newChildren

          var keyToNewIndexMap = new Map();

          for (i = s2; i <= e2; i++) {
            var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);

            if (nextChild.key != null) {
              if (keyToNewIndexMap.has(nextChild.key)) {
                warn("Duplicate keys found during update:", JSON.stringify(nextChild.key), "Make sure keys are unique.");
              }

              keyToNewIndexMap.set(nextChild.key, i);
            }
          } // 5.2 loop through old children left to be patched and try to patch
          // matching nodes & remove nodes that are no longer present


          var j;
          var patched = 0;
          var toBePatched = e2 - s2 + 1;
          var moved = false; // used to track whether any node has moved

          var maxNewIndexSoFar = 0; // works as Map<newIndex, oldIndex>
          // Note that oldIndex is offset by +1
          // and oldIndex = 0 is a special value indicating the new node has
          // no corresponding old node.
          // used for determining longest stable subsequence

          var newIndexToOldIndexMap = new Array(toBePatched);

          for (i = 0; i < toBePatched; i++) {
            newIndexToOldIndexMap[i] = 0;
          }

          for (i = s1; i <= e1; i++) {
            var prevChild = c1[i];

            if (patched >= toBePatched) {
              // all new children have been patched so this can only be a removal
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }

            var newIndex = void 0;

            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              // key-less node, try to locate a key-less node of the same type
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }

            if (newIndex === undefined) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;

              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }

              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, optimized);
              patched++;
            }
          } // 5.3 move and mount
          // generate longest stable subsequence only when nodes have moved


          var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1; // looping backwards so that we can use last patched node as anchor

          for (i = toBePatched - 1; i >= 0; i--) {
            var nextIndex = s2 + i;
            var _nextChild = c2[nextIndex];

            var _anchor2 = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;

            if (newIndexToOldIndexMap[i] === 0) {
              // mount new
              patch(null, _nextChild, container, _anchor2, parentComponent, parentSuspense, isSVG);
            } else if (moved) {
              // move if:
              // There is no stable subsequence (e.g. a reverse)
              // OR current node is not among the stable sequence
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(_nextChild, container, _anchor2, 2
                /* REORDER */
                );
              } else {
                j--;
              }
            }
          }
        }
  };

  var move = function move(vnode, container, anchor, moveType) {
    var parentSuspense = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var el = vnode.el,
        type = vnode.type,
        transition = vnode.transition,
        children = vnode.children,
        shapeFlag = vnode.shapeFlag;

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }

    if (shapeFlag & 128
    /* SUSPENSE */
    ) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }

    if (shapeFlag & 64
    /* TELEPORT */
    ) {
        type.move(vnode, container, anchor, internals);
        return;
      }

    if (type === Fragment) {
      hostInsert(el, container, anchor);

      for (var i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }

      hostInsert(vnode.anchor, container, anchor);
      return;
    } // static node move can only happen when force updating HMR


    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    } // single nodes


    var needTransition = moveType !== 2
    /* REORDER */
    && shapeFlag & 1
    /* ELEMENT */
    && transition;

    if (needTransition) {
      if (moveType === 0
      /* ENTER */
      ) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(function () {
            return transition.enter(el);
          }, parentSuspense);
        } else {
        var leave = transition.leave,
            delayLeave = transition.delayLeave,
            afterLeave = transition.afterLeave;

        var _remove = function _remove() {
          return hostInsert(el, container, anchor);
        };

        var performLeave = function performLeave() {
          leave(el, function () {
            _remove();

            afterLeave && afterLeave();
          });
        };

        if (delayLeave) {
          delayLeave(el, _remove, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };

  var unmount = function unmount(vnode, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var type = vnode.type,
        props = vnode.props,
        ref = vnode.ref,
        children = vnode.children,
        dynamicChildren = vnode.dynamicChildren,
        shapeFlag = vnode.shapeFlag,
        patchFlag = vnode.patchFlag,
        dirs = vnode.dirs; // unset ref

    if (ref != null && parentComponent) {
      setRef(ref, null, parentComponent, null);
    }

    if (shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }

    var shouldInvokeDirs = shapeFlag & 1
    /* ELEMENT */
    && dirs;
    var vnodeHook;

    if (vnodeHook = props && props.onVnodeBeforeUnmount) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }

    if (shapeFlag & 6
    /* COMPONENT */
    ) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
      if (shapeFlag & 128
      /* SUSPENSE */
      ) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }

      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
      }

      if (dynamicChildren && ( // #1153: fast path should not be taken for non-stable (v-for) fragments
      type !== Fragment || patchFlag > 0 && patchFlag & 64
      /* STABLE_FRAGMENT */
      )) {
        // fast path for block nodes: only need to unmount dynamic children.
        unmountChildren(dynamicChildren, parentComponent, parentSuspense);
      } else if (shapeFlag & 16
      /* ARRAY_CHILDREN */
      ) {
          unmountChildren(children, parentComponent, parentSuspense);
        } // an unmounted teleport should always remove its children


      if (shapeFlag & 64
      /* TELEPORT */
      ) {
          vnode.type.remove(vnode, internals);
        }

      if (doRemove) {
        remove(vnode);
      }
    }

    if ((vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(function () {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
      }, parentSuspense);
    }
  };

  var remove = function remove(vnode) {
    var type = vnode.type,
        el = vnode.el,
        anchor = vnode.anchor,
        transition = vnode.transition;

    if (type === Fragment) {
      removeFragment(el, anchor);
      return;
    }

    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }

    var performRemove = function performRemove() {
      hostRemove(el);

      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };

    if (vnode.shapeFlag & 1
    /* ELEMENT */
    && transition && !transition.persisted) {
      var leave = transition.leave,
          delayLeave = transition.delayLeave;

      var performLeave = function performLeave() {
        return leave(el, performRemove);
      };

      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };

  var removeFragment = function removeFragment(cur, end) {
    // For fragments, directly remove all contained DOM nodes.
    // (fragment child nodes cannot have transition)
    var next;

    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }

    hostRemove(end);
  };

  var unmountComponent = function unmountComponent(instance, parentSuspense, doRemove) {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }

    var bum = instance.bum,
        effects = instance.effects,
        update = instance.update,
        subTree = instance.subTree,
        um = instance.um,
        da = instance.da,
        isDeactivated = instance.isDeactivated; // beforeUnmount hook

    if (bum) {
      invokeArrayFns(bum);
    }

    if (effects) {
      for (var i = 0; i < effects.length; i++) {
        stop(effects[i]);
      }
    } // update may be null if a component is unmounted before its async
    // setup has resolved.


    if (update) {
      stop(update);
      unmount(subTree, instance, parentSuspense, doRemove);
    } // unmounted hook


    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    } // deactivated hook


    if (da && !isDeactivated && instance.vnode.shapeFlag & 256
    /* COMPONENT_SHOULD_KEEP_ALIVE */
    ) {
        queuePostRenderEffect(da, parentSuspense);
      }

    queuePostRenderEffect(function () {
      instance.isUnmounted = true;
    }, parentSuspense); // A component with async dep inside a pending suspense is unmounted before
    // its async dep resolves. This should remove the dep from the suspense, and
    // cause the suspense to resolve immediately if that was the last dep.

    if (parentSuspense && !parentSuspense.isResolved && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved) {
      parentSuspense.deps--;

      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };

  var unmountChildren = function unmountChildren(children, parentComponent, parentSuspense) {
    var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var start = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    for (var i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove);
    }
  };

  var getNextHostNode = function getNextHostNode(vnode) {
    if (vnode.shapeFlag & 6
    /* COMPONENT */
    ) {
        return getNextHostNode(vnode.component.subTree);
      }

    if (vnode.shapeFlag & 128
    /* SUSPENSE */
    ) {
        return vnode.suspense.next();
      }

    return hostNextSibling(vnode.anchor || vnode.el);
  };
  /**
   * #1156
   * When a component is HMR-enabled, we need to make sure that all static nodes
   * inside a block also inherit the DOM element from the previous tree so that
   * HMR updates (which are full updates) can retrieve the element for patching.
   *
   * Dev only.
   */


  var traverseStaticChildren = function traverseStaticChildren(n1, n2) {
    var ch1 = n1.children;
    var ch2 = n2.children;

    if (isArray(ch1) && isArray(ch2)) {
      for (var i = 0; i < ch1.length; i++) {
        var c1 = ch1[i];
        var c2 = ch2[i];

        if (isVNode(c1) && isVNode(c2) && c2.shapeFlag & 1
        /* ELEMENT */
        && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0) {
            c2.el = c1.el;
          }

          traverseStaticChildren(c1, c2);
        }
      }
    }
  };

  var render = function render(vnode, container) {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }

    flushPostFlushCbs();
    container._vnode = vnode;
  };

  var internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  var hydrate;
  var hydrateNode;

  if (createHydrationFns) {
    var _createHydrationFns = createHydrationFns(internals);

    var _createHydrationFns2 = _slicedToArray(_createHydrationFns, 2);

    hydrate = _createHydrationFns2[0];
    hydrateNode = _createHydrationFns2[1];
  }

  return {
    render: render,
    hydrate: hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}

function invokeVNodeHook(hook, instance, vnode) {
  var prevVNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  callWithAsyncErrorHandling(hook, instance, 7
  /* VNODE_HOOK */
  , [vnode, prevVNode]);
} // https://en.wikipedia.org/wiki/Longest_increasing_subsequence


function getSequence(arr) {
  var p = arr.slice();
  var result = [0];
  var i, j, u, v, c;
  var len = arr.length;

  for (i = 0; i < len; i++) {
    var arrI = arr[i];

    if (arrI !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }

      u = 0;
      v = result.length - 1;

      while (u < v) {
        c = (u + v) / 2 | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }

        result[u] = i;
      }
    }
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }

  return result;
}

function useTransitionState() {
  var state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map()
  };
  onMounted(function () {
    state.isMounted = true;
  });
  onBeforeUnmount(function () {
    state.isUnmounting = true;
  });
  return state;
}

var BaseTransitionImpl = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    // enter
    onBeforeEnter: Function,
    onEnter: Function,
    onAfterEnter: Function,
    onEnterCancelled: Function,
    // leave
    onBeforeLeave: Function,
    onLeave: Function,
    onAfterLeave: Function,
    onLeaveCancelled: Function,
    // appear
    onBeforeAppear: Function,
    onAppear: Function,
    onAfterAppear: Function,
    onAppearCancelled: Function
  },
  setup: function setup(props, _ref21) {
    var slots = _ref21.slots;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    var prevTransitionKey;
    return function () {
      var children = slots.default && getTransitionRawChildren(slots.default(), true);

      if (!children || !children.length) {
        return;
      } // warn multiple elements


      if (children.length > 1) {
        warn('<transition> can only be used on a single element or component. Use ' + '<transition-group> for lists.');
      } // there's no need to track reactivity for these props so use the raw
      // props for a bit better perf


      var rawProps = toRaw(props);
      var mode = rawProps.mode; // check mode

      if (mode && !['in-out', 'out-in', 'default'].includes(mode)) {
        warn("invalid <transition> mode: ".concat(mode));
      } // at this point children has a guaranteed length of 1.


      var child = children[0];

      if (state.isLeaving) {
        return emptyPlaceholder(child);
      } // in the case of <transition><keep-alive/></transition>, we need to
      // compare the type of the kept-alive children.


      var innerChild = getKeepAliveChild(child);

      if (!innerChild) {
        return emptyPlaceholder(child);
      }

      var enterHooks = innerChild.transition = resolveTransitionHooks(innerChild, rawProps, state, instance);
      var oldChild = instance.subTree;
      var oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      var transitionKeyChanged = false;
      var getTransitionKey = innerChild.type.getTransitionKey;

      if (getTransitionKey) {
        var key = getTransitionKey();

        if (prevTransitionKey === undefined) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      } // handle mode


      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        var leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance); // update old tree's hooks in case of dynamic transition

        setTransitionHooks(oldInnerChild, leavingHooks); // switching between different views

        if (mode === 'out-in') {
          state.isLeaving = true; // return placeholder node and queue update when leave finishes

          leavingHooks.afterLeave = function () {
            state.isLeaving = false;
            instance.update();
          };

          return emptyPlaceholder(child);
        } else if (mode === 'in-out') {
          leavingHooks.delayLeave = function (el, earlyRemove, delayedLeave) {
            var leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild; // early removal callback

            el._leaveCb = function () {
              earlyRemove();
              el._leaveCb = undefined;
              delete enterHooks.delayedLeave;
            };

            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }

      return child;
    };
  }
}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

var BaseTransition = BaseTransitionImpl;

function getLeavingNodesForType(state, vnode) {
  var leavingVNodes = state.leavingVNodes;
  var leavingVNodesCache = leavingVNodes.get(vnode.type);

  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }

  return leavingVNodesCache;
} // The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.


function resolveTransitionHooks(vnode, _ref22, state, instance) {
  var appear = _ref22.appear,
      _ref22$persisted = _ref22.persisted,
      persisted = _ref22$persisted === void 0 ? false : _ref22$persisted,
      onBeforeEnter = _ref22.onBeforeEnter,
      onEnter = _ref22.onEnter,
      onAfterEnter = _ref22.onAfterEnter,
      onEnterCancelled = _ref22.onEnterCancelled,
      onBeforeLeave = _ref22.onBeforeLeave,
      onLeave = _ref22.onLeave,
      onAfterLeave = _ref22.onAfterLeave,
      onLeaveCancelled = _ref22.onLeaveCancelled,
      onBeforeAppear = _ref22.onBeforeAppear,
      onAppear = _ref22.onAppear,
      onAfterAppear = _ref22.onAfterAppear,
      onAppearCancelled = _ref22.onAppearCancelled;
  var key = String(vnode.key);
  var leavingVNodesCache = getLeavingNodesForType(state, vnode);

  var callHook = function callHook(hook, args) {
    hook && callWithAsyncErrorHandling(hook, instance, 9
    /* TRANSITION_HOOK */
    , args);
  };

  var hooks = {
    persisted: persisted,
    beforeEnter: function beforeEnter(el) {
      var hook = onBeforeEnter;

      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      } // for same element (v-show)


      if (el._leaveCb) {
        el._leaveCb(true
        /* cancelled */
        );
      } // for toggled element with same key (v-if)


      var leavingVNode = leavingVNodesCache[key];

      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        // force early removal (not cancelled)
        leavingVNode.el._leaveCb();
      }

      callHook(hook, [el]);
    },
    enter: function enter(el) {
      var hook = onEnter;
      var afterHook = onAfterEnter;
      var cancelHook = onEnterCancelled;

      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }

      var called = false;

      var done = el._enterCb = function (cancelled) {
        if (called) return;
        called = true;

        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }

        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }

        el._enterCb = undefined;
      };

      if (hook) {
        hook(el, done);

        if (hook.length <= 1) {
          done();
        }
      } else {
        done();
      }
    },
    leave: function leave(el, remove) {
      var key = String(vnode.key);

      if (el._enterCb) {
        el._enterCb(true
        /* cancelled */
        );
      }

      if (state.isUnmounting) {
        return remove();
      }

      callHook(onBeforeLeave, [el]);
      var called = false;

      var done = el._leaveCb = function (cancelled) {
        if (called) return;
        called = true;
        remove();

        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }

        el._leaveCb = undefined;

        if (leavingVNodesCache[key] === vnode) {
          delete leavingVNodesCache[key];
        }
      };

      leavingVNodesCache[key] = vnode;

      if (onLeave) {
        onLeave(el, done);

        if (onLeave.length <= 1) {
          done();
        }
      } else {
        done();
      }
    }
  };
  return hooks;
} // the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.


function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}

function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : undefined : vnode;
}

function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6
  /* COMPONENT */
  && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else {
    vnode.transition = hooks;
  }
}

function getTransitionRawChildren(children) {
  var keepComment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var ret = [];
  var keyedFragmentCount = 0;

  for (var i = 0; i < children.length; i++) {
    var child = children[i]; // handle fragment children case, e.g. v-for

    if (child.type === Fragment) {
      if (child.patchFlag & 128
      /* KEYED_FRAGMENT */
      ) keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment));
    } // comment placeholders should be skipped, e.g. v-if
    else if (keepComment || child.type !== Comment) {
        ret.push(child);
      }
  } // #1126 if a transition children list contains multiple sub fragments, these
  // fragments will be merged into a flat children array. Since each v-for
  // fragment may contain different static bindings inside, we need to de-top
  // these children to force full diffs to ensure correct behavior.


  if (keyedFragmentCount > 1) {
    for (var _i9 = 0; _i9 < ret.length; _i9++) {
      ret[_i9].patchFlag = -2
      /* BAIL */
      ;
    }
  }

  return ret;
}

var isKeepAlive = function isKeepAlive(vnode) {
  return vnode.type.__isKeepAlive;
};

var KeepAliveImpl = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  inheritRef: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup: function setup(props, _ref23) {
    var slots = _ref23.slots;
    var cache = new Map();
    var keys = new Set();
    var current = null;
    var instance = getCurrentInstance();
    var parentSuspense = instance.suspense; // KeepAlive communicates with the instantiated renderer via the
    // ctx where the renderer passes in its internals,
    // and the KeepAlive instance exposes activate/deactivate implementations.
    // The whole point of this is to avoid importing KeepAlive directly in the
    // renderer to facilitate tree-shaking.

    var sharedContext = instance.ctx;
    var _sharedContext$render = sharedContext.renderer,
        patch = _sharedContext$render.p,
        move = _sharedContext$render.m,
        _unmount = _sharedContext$render.um,
        createElement = _sharedContext$render.o.createElement;
    var storageContainer = createElement('div');

    sharedContext.activate = function (vnode, container, anchor, isSVG, optimized) {
      var instance = vnode.component;
      move(vnode, container, anchor, 0
      /* ENTER */
      , parentSuspense); // in case props have changed

      patch(instance.vnode, vnode, container, anchor, instance, parentSuspense, isSVG, optimized);
      queuePostRenderEffect(function () {
        instance.isDeactivated = false;

        if (instance.a) {
          invokeArrayFns(instance.a);
        }

        var vnodeHook = vnode.props && vnode.props.onVnodeMounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }
      }, parentSuspense);
    };

    sharedContext.deactivate = function (vnode) {
      var instance = vnode.component;
      move(vnode, storageContainer, null, 1
      /* LEAVE */
      , parentSuspense);
      queuePostRenderEffect(function () {
        if (instance.da) {
          invokeArrayFns(instance.da);
        }

        var vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;

        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance.parent, vnode);
        }

        instance.isDeactivated = true;
      }, parentSuspense);
    };

    function unmount(vnode) {
      // reset the shapeFlag so it can be properly unmounted
      resetShapeFlag(vnode);

      _unmount(vnode, instance, parentSuspense);
    }

    function pruneCache(filter) {
      cache.forEach(function (vnode, key) {
        var name = getName(vnode.type);

        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }

    function pruneCacheEntry(key) {
      var cached = cache.get(key);

      if (!current || cached.type !== current.type) {
        unmount(cached);
      } else if (current) {
        // current active instance should no longer be kept-alive.
        // we can't unmount it now but it might be later, so reset its flag now.
        resetShapeFlag(current);
      }

      cache.delete(key);
      keys.delete(key);
    }

    watch(function () {
      return [props.include, props.exclude];
    }, function (_ref24) {
      var _ref25 = _slicedToArray(_ref24, 2),
          include = _ref25[0],
          exclude = _ref25[1];

      include && pruneCache(function (name) {
        return matches(include, name);
      });
      exclude && pruneCache(function (name) {
        return matches(exclude, name);
      });
    });
    onBeforeUnmount(function () {
      cache.forEach(function (cached) {
        var subTree = instance.subTree,
            suspense = instance.suspense;

        if (cached.type === subTree.type) {
          // current instance will be unmounted as part of keep-alive's unmount
          resetShapeFlag(subTree); // but invoke its deactivated hook here

          var da = subTree.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }

        unmount(cached);
      });
    });
    return function () {
      if (!slots.default) {
        return null;
      }

      var children = slots.default();
      var vnode = children[0];

      if (children.length > 1) {
        {
          warn("KeepAlive should contain exactly one component child.");
        }
        current = null;
        return children;
      } else if (!isVNode(vnode) || !(vnode.shapeFlag & 4
      /* STATEFUL_COMPONENT */
      )) {
        current = null;
        return vnode;
      }

      var comp = vnode.type;
      var name = getName(comp);
      var include = props.include,
          exclude = props.exclude,
          max = props.max;

      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        return current = vnode;
      }

      var key = vnode.key == null ? comp : vnode.key;
      var cachedVNode = cache.get(key); // clone vnode if it's reused because we are going to mutate it

      if (vnode.el) {
        vnode = cloneVNode(vnode);
      }

      cache.set(key, vnode);

      if (cachedVNode) {
        // copy over mounted state
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;

        if (vnode.transition) {
          // recursively update transition hooks on subTree
          setTransitionHooks(vnode, vnode.transition);
        } // avoid vnode being mounted as fresh


        vnode.shapeFlag |= 512
        /* COMPONENT_KEPT_ALIVE */
        ; // make this key the freshest

        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key); // prune oldest entry

        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      } // avoid vnode being unmounted


      vnode.shapeFlag |= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
      current = vnode;
      return vnode;
    };
  }
}; // export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files

var KeepAlive = KeepAliveImpl;

function getName(comp) {
  return comp.displayName || comp.name;
}

function matches(pattern, name) {
  if (isArray(pattern)) {
    return pattern.some(function (p) {
      return matches(p, name);
    });
  } else if (isString(pattern)) {
    return pattern.split(',').indexOf(name) > -1;
  } else if (pattern.test) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a"
  /* ACTIVATED */
  , target);
}

function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da"
  /* DEACTIVATED */
  , target);
}

function registerKeepAliveHook(hook, type) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;

  // cache the deactivate branch check wrapper for injected hooks so the same
  // hook can be properly deduped by the scheduler. "__wdc" stands for "with
  // deactivation check".
  var wrappedHook = hook.__wdc || (hook.__wdc = function () {
    // only fire the hook if the target instance is NOT in a deactivated branch.
    var current = target;

    while (current) {
      if (current.isDeactivated) {
        return;
      }

      current = current.parent;
    }

    hook();
  });

  injectHook(type, wrappedHook, target); // In addition to registering it on the target instance, we walk up the parent
  // chain and register it on all ancestor instances that are keep-alive roots.
  // This avoids the need to walk the entire component tree when invoking these
  // hooks, and more importantly, avoids the need to track child components in
  // arrays.

  if (target) {
    var current = target.parent;

    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }

      current = current.parent;
    }
  }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  injectHook(type, hook, keepAliveRoot, true
  /* prepend */
  );
  onUnmounted(function () {
    remove(keepAliveRoot[type], hook);
  }, target);
}

function resetShapeFlag(vnode) {
  var shapeFlag = vnode.shapeFlag;

  if (shapeFlag & 256
  /* COMPONENT_SHOULD_KEEP_ALIVE */
  ) {
      shapeFlag -= 256
      /* COMPONENT_SHOULD_KEEP_ALIVE */
      ;
    }

  if (shapeFlag & 512
  /* COMPONENT_KEPT_ALIVE */
  ) {
      shapeFlag -= 512
      /* COMPONENT_KEPT_ALIVE */
      ;
    }

  vnode.shapeFlag = shapeFlag;
}

function injectHook(type, hook) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
  var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (target) {
    var hooks = target[type] || (target[type] = []); // cache the error handling wrapper for injected hooks so the same hook
    // can be properly deduped by the scheduler. "__weh" stands for "with error
    // handling".

    var wrappedHook = hook.__weh || (hook.__weh = function () {
      if (target.isUnmounted) {
        return;
      } // disable tracking inside all lifecycle hooks
      // since they can potentially be called inside effects.


      pauseTracking(); // Set currentInstance during hook invocation.
      // This assumes the hook does not synchronously trigger other hooks, which
      // can only be false when the user does something really funky.

      setCurrentInstance(target);

      for (var _len8 = arguments.length, args = new Array(_len8), _key13 = 0; _key13 < _len8; _key13++) {
        args[_key13] = arguments[_key13];
      }

      var res = callWithAsyncErrorHandling(hook, target, type, args);
      setCurrentInstance(null);
      resetTracking();
      return res;
    });

    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
  } else {
    var apiName = "on".concat(capitalize(ErrorTypeStrings[type].replace(/ hook$/, '')));
    warn("".concat(apiName, " is called when there is no active component instance to be ") + "associated with. " + "Lifecycle injection APIs can only be used during execution of setup()." + (" If you are using async setup(), make sure to register lifecycle " + "hooks before the first await statement."));
  }
}

var createHook = function createHook(lifecycle) {
  return function (hook) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
    return (// post-create lifecycle registrations are noops during SSR
      !isInSSRComponentSetup && injectHook(lifecycle, hook, target)
    );
  };
};

var onBeforeMount = createHook("bm"
/* BEFORE_MOUNT */
);
var onMounted = createHook("m"
/* MOUNTED */
);
var onBeforeUpdate = createHook("bu"
/* BEFORE_UPDATE */
);
var onUpdated = createHook("u"
/* UPDATED */
);
var onBeforeUnmount = createHook("bum"
/* BEFORE_UNMOUNT */
);
var onUnmounted = createHook("um"
/* UNMOUNTED */
);
var onRenderTriggered = createHook("rtg"
/* RENDER_TRIGGERED */
);
var onRenderTracked = createHook("rtc"
/* RENDER_TRACKED */
);

var onErrorCaptured = function onErrorCaptured(hook) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
  injectHook("ec"
  /* ERROR_CAPTURED */
  , hook, target);
};

var invoke = function invoke(fn) {
  return fn();
}; // Simple effect.


function watchEffect(effect, options) {
  return doWatch(effect, null, options);
} // initial value for watchers to trigger on undefined initial values


var INITIAL_WATCHER_VALUE = {}; // implementation

function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn("`watch(fn, options?)` signature has been moved to a separate API. " + "Use `watchEffect(fn, options?)` instead. `watch` now only " + "supports `watch(source, cb, options?) signature.");
  }

  return doWatch(source, cb, options);
}

function doWatch(source, cb) {
  var _ref26 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ,
      immediate = _ref26.immediate,
      deep = _ref26.deep,
      flush = _ref26.flush,
      onTrack = _ref26.onTrack,
      onTrigger = _ref26.onTrigger;

  if (!cb) {
    if (immediate !== undefined) {
      warn("watch() \"immediate\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }

    if (deep !== undefined) {
      warn("watch() \"deep\" option is only respected when using the " + "watch(source, callback, options?) signature.");
    }
  }

  var warnInvalidSource = function warnInvalidSource(s) {
    warn("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, " + "a reactive object, or an array of these types.");
  };

  var instance = currentInstance;
  var getter;

  if (isArray(source)) {
    getter = function getter() {
      return source.map(function (s) {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return callWithErrorHandling(s, instance, 2
          /* WATCH_GETTER */
          );
        } else {
          warnInvalidSource(s);
        }
      });
    };
  } else if (isRef(source)) {
    getter = function getter() {
      return source.value;
    };
  } else if (isReactive(source)) {
    getter = function getter() {
      return source;
    };

    deep = true;
  } else if (isFunction(source)) {
    if (cb) {
      // getter with cb
      getter = function getter() {
        return callWithErrorHandling(source, instance, 2
        /* WATCH_GETTER */
        );
      };
    } else {
      // no cb -> simple effect
      getter = function getter() {
        if (instance && instance.isUnmounted) {
          return;
        }

        if (cleanup) {
          cleanup();
        }

        return callWithErrorHandling(source, instance, 3
        /* WATCH_CALLBACK */
        , [onInvalidate]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }

  if (cb && deep) {
    var baseGetter = getter;

    getter = function getter() {
      return traverse(baseGetter());
    };
  }

  var cleanup;

  var onInvalidate = function onInvalidate(fn) {
    cleanup = runner.options.onStop = function () {
      callWithErrorHandling(fn, instance, 4
      /* WATCH_CLEANUP */
      );
    };
  };

  var oldValue = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
  var applyCb = cb ? function () {
    if (instance && instance.isUnmounted) {
      return;
    }

    var newValue = runner();

    if (deep || hasChanged(newValue, oldValue)) {
      // cleanup before running cb again
      if (cleanup) {
        cleanup();
      }

      callWithAsyncErrorHandling(cb, instance, 3
      /* WATCH_CALLBACK */
      , [newValue, // pass undefined as the old value when it's changed for the first time
      oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onInvalidate]);
      oldValue = newValue;
    }
  } : void 0;
  var scheduler;

  if (flush === 'sync') {
    scheduler = invoke;
  } else if (flush === 'pre') {
    scheduler = function scheduler(job) {
      if (!instance || instance.isMounted) {
        queueJob(job);
      } else {
        // with 'pre' option, the first call must happen before
        // the component is mounted so it is called synchronously.
        job();
      }
    };
  } else {
    scheduler = function scheduler(job) {
      return queuePostRenderEffect(job, instance && instance.suspense);
    };
  }

  var runner = effect(getter, {
    lazy: true,
    // so it runs before component update effects in pre flush mode
    computed: true,
    onTrack: onTrack,
    onTrigger: onTrigger,
    scheduler: applyCb ? function () {
      return scheduler(applyCb);
    } : scheduler
  });
  recordInstanceBoundEffect(runner); // initial run

  if (applyCb) {
    if (immediate) {
      applyCb();
    } else {
      oldValue = runner();
    }
  } else {
    runner();
  }

  return function () {
    stop(runner);

    if (instance) {
      remove(instance.effects, runner);
    }
  };
} // this.$watch


function instanceWatch(source, cb, options) {
  var publicThis = this.proxy;
  var getter = isString(source) ? function () {
    return publicThis[source];
  } : source.bind(publicThis);
  var stop = watch(getter, cb.bind(publicThis), options);
  onBeforeUnmount(stop, this);
  return stop;
}

function traverse(value) {
  var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

  if (!isObject(value) || seen.has(value)) {
    return value;
  }

  seen.add(value);

  if (isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (value instanceof Map) {
    value.forEach(function (v, key) {
      // to register mutation dep for existing keys
      traverse(value.get(key), seen);
    });
  } else if (value instanceof Set) {
    value.forEach(function (v) {
      traverse(v, seen);
    });
  } else {
    for (var key in value) {
      traverse(value[key], seen);
    }
  }

  return value;
}

function provide(key, value) {
  if (!currentInstance) {
    {
      warn("provide() can only be used inside setup().");
    }
  } else {
    var provides = currentInstance.provides; // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.

    var parentProvides = currentInstance.parent && currentInstance.parent.provides;

    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    } // TS doesn't allow symbol as index type


    provides[key] = value;
  }
}

function inject(key, defaultValue) {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  var instance = currentInstance || currentRenderingInstance;

  if (instance) {
    var provides = instance.provides;

    if (key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (arguments.length > 1) {
      return defaultValue;
    } else {
      warn("injection \"".concat(String(key), "\" not found."));
    }
  } else {
    warn("inject() can only be used inside setup() or functional components.");
  }
}

function createDuplicateChecker() {
  var cache = Object.create(null);
  return function (type, key) {
    if (cache[key]) {
      warn("".concat(type, " property \"").concat(key, "\" is already defined in ").concat(cache[key], "."));
    } else {
      cache[key] = type;
    }
  };
}

function applyOptions(instance, options) {
  var deferredData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var deferredWatch = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var asMixin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var mixins = options.mixins,
      extendsOptions = options.extends,
      dataOptions = options.data,
      computedOptions = options.computed,
      methods = options.methods,
      watchOptions = options.watch,
      provideOptions = options.provide,
      injectOptions = options.inject,
      components = options.components,
      directives = options.directives,
      beforeMount = options.beforeMount,
      mounted = options.mounted,
      beforeUpdate = options.beforeUpdate,
      updated = options.updated,
      activated = options.activated,
      deactivated = options.deactivated,
      beforeUnmount = options.beforeUnmount,
      unmounted = options.unmounted,
      renderTracked = options.renderTracked,
      renderTriggered = options.renderTriggered,
      errorCaptured = options.errorCaptured;
  var publicThis = instance.proxy;
  var ctx = instance.ctx;
  var globalMixins = instance.appContext.mixins; // call it only during dev
  // applyOptions is called non-as-mixin once per instance

  if (!asMixin) {
    callSyncHook('beforeCreate', options, publicThis, globalMixins); // global mixins are applied first

    applyMixins(instance, globalMixins, deferredData, deferredWatch);
  } // extending a base component...


  if (extendsOptions) {
    applyOptions(instance, extendsOptions, deferredData, deferredWatch, true);
  } // local mixins


  if (mixins) {
    applyMixins(instance, mixins, deferredData, deferredWatch);
  }

  var checkDuplicateProperties = createDuplicateChecker();
  {
    var propsOptions = normalizePropsOptions(options)[0];

    if (propsOptions) {
      for (var key in propsOptions) {
        checkDuplicateProperties("Props"
        /* PROPS */
        , key);
      }
    }
  } // options initialization order (to be consistent with Vue 2):
  // - props (already done outside of this function)
  // - inject
  // - methods
  // - data (deferred since it relies on `this` access)
  // - computed
  // - watch (deferred since it relies on `this` access)

  if (injectOptions) {
    if (isArray(injectOptions)) {
      for (var i = 0; i < injectOptions.length; i++) {
        var _key14 = injectOptions[i];
        ctx[_key14] = inject(_key14);
        {
          checkDuplicateProperties("Inject"
          /* INJECT */
          , _key14);
        }
      }
    } else {
      for (var _key15 in injectOptions) {
        var opt = injectOptions[_key15];

        if (isObject(opt)) {
          ctx[_key15] = inject(opt.from, opt.default);
        } else {
          ctx[_key15] = inject(opt);
        }

        {
          checkDuplicateProperties("Inject"
          /* INJECT */
          , _key15);
        }
      }
    }
  }

  if (methods) {
    for (var _key16 in methods) {
      var methodHandler = methods[_key16];

      if (isFunction(methodHandler)) {
        ctx[_key16] = methodHandler.bind(publicThis);
        {
          checkDuplicateProperties("Methods"
          /* METHODS */
          , _key16);
        }
      } else {
        warn("Method \"".concat(_key16, "\" has type \"").concat(_typeof(methodHandler), "\" in the component definition. ") + "Did you reference the function correctly?");
      }
    }
  }

  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn("The data option must be a function. " + "Plain object usage is no longer supported.");
    }

    if (asMixin) {
      deferredData.push(dataOptions);
    } else {
      resolveData(instance, dataOptions, publicThis);
    }
  }

  if (!asMixin) {
    if (deferredData.length) {
      deferredData.forEach(function (dataFn) {
        return resolveData(instance, dataFn, publicThis);
      });
    }

    {
      (function () {
        var rawData = toRaw(instance.data);

        var _loop = function _loop(_key17) {
          checkDuplicateProperties("Data"
          /* DATA */
          , _key17); // expose data on ctx during dev

          if (_key17[0] !== '$' && _key17[0] !== '_') {
            Object.defineProperty(ctx, _key17, {
              configurable: true,
              enumerable: true,
              get: function get() {
                return rawData[_key17];
              },
              set: NOOP
            });
          }
        };

        for (var _key17 in rawData) {
          _loop(_key17);
        }
      })();
    }
  }

  if (computedOptions) {
    var _loop2 = function _loop2(_key18) {
      var opt = computedOptions[_key18];
      var get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;

      if (get === NOOP) {
        warn("Computed property \"".concat(_key18, "\" has no getter."));
      }

      var set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : function () {
        warn("Write operation failed: computed property \"".concat(_key18, "\" is readonly."));
      };
      var c = computed$1({
        get: get,
        set: set
      });
      Object.defineProperty(ctx, _key18, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return c.value;
        },
        set: function set(v) {
          return c.value = v;
        }
      });
      {
        checkDuplicateProperties("Computed"
        /* COMPUTED */
        , _key18);
      }
    };

    for (var _key18 in computedOptions) {
      _loop2(_key18);
    }
  }

  if (watchOptions) {
    deferredWatch.push(watchOptions);
  }

  if (!asMixin && deferredWatch.length) {
    deferredWatch.forEach(function (watchOptions) {
      for (var _key19 in watchOptions) {
        createWatcher(watchOptions[_key19], ctx, publicThis, _key19);
      }
    });
  }

  if (provideOptions) {
    var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;

    for (var _key20 in provides) {
      provide(_key20, provides[_key20]);
    }
  } // asset options


  if (components) {
    extend(instance.components, components);
  }

  if (directives) {
    extend(instance.directives, directives);
  } // lifecycle options


  if (!asMixin) {
    callSyncHook('created', options, publicThis, globalMixins);
  }

  if (beforeMount) {
    onBeforeMount(beforeMount.bind(publicThis));
  }

  if (mounted) {
    onMounted(mounted.bind(publicThis));
  }

  if (beforeUpdate) {
    onBeforeUpdate(beforeUpdate.bind(publicThis));
  }

  if (updated) {
    onUpdated(updated.bind(publicThis));
  }

  if (activated) {
    onActivated(activated.bind(publicThis));
  }

  if (deactivated) {
    onDeactivated(deactivated.bind(publicThis));
  }

  if (errorCaptured) {
    onErrorCaptured(errorCaptured.bind(publicThis));
  }

  if (renderTracked) {
    onRenderTracked(renderTracked.bind(publicThis));
  }

  if (renderTriggered) {
    onRenderTriggered(renderTriggered.bind(publicThis));
  }

  if (beforeUnmount) {
    onBeforeUnmount(beforeUnmount.bind(publicThis));
  }

  if (unmounted) {
    onUnmounted(unmounted.bind(publicThis));
  }
}

function callSyncHook(name, options, ctx, globalMixins) {
  callHookFromMixins(name, globalMixins, ctx);
  var baseHook = options.extends && options.extends[name];

  if (baseHook) {
    baseHook.call(ctx);
  }

  var mixins = options.mixins;

  if (mixins) {
    callHookFromMixins(name, mixins, ctx);
  }

  var selfHook = options[name];

  if (selfHook) {
    selfHook.call(ctx);
  }
}

function callHookFromMixins(name, mixins, ctx) {
  for (var i = 0; i < mixins.length; i++) {
    var fn = mixins[i][name];

    if (fn) {
      fn.call(ctx);
    }
  }
}

function applyMixins(instance, mixins, deferredData, deferredWatch) {
  for (var i = 0; i < mixins.length; i++) {
    applyOptions(instance, mixins[i], deferredData, deferredWatch, true);
  }
}

function resolveData(instance, dataFn, publicThis) {
  var data = dataFn.call(publicThis, publicThis);

  if (isPromise(data)) {
    warn("data() returned a Promise - note data() cannot be async; If you " + "intend to perform data fetching before component renders, use " + "async setup() + <Suspense>.");
  }

  if (!isObject(data)) {
    warn("data() should return an object.");
  } else if (instance.data === EMPTY_OBJ) {
    instance.data = reactive(data);
  } else {
    // existing data: this is a mixin or extends.
    extend(instance.data, data);
  }
}

function createWatcher(raw, ctx, publicThis, key) {
  var getter = function getter() {
    return publicThis[key];
  };

  if (isString(raw)) {
    var handler = ctx[raw];

    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn("Invalid watch handler specified by key \"".concat(raw, "\""), handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach(function (r) {
        return createWatcher(r, ctx, publicThis, key);
      });
    } else {
      watch(getter, raw.handler.bind(publicThis), raw);
    }
  } else {
    warn("Invalid watch option: \"".concat(key, "\""));
  }
}

function resolveMergedOptions(instance) {
  var raw = instance.type;
  var __merged = raw.__merged,
      mixins = raw.mixins,
      extendsOptions = raw.extends;
  if (__merged) return __merged;
  var globalMixins = instance.appContext.mixins;
  if (!globalMixins.length && !mixins && !extendsOptions) return raw;
  var options = {};
  globalMixins.forEach(function (m) {
    return mergeOptions(options, m, instance);
  });
  extendsOptions && mergeOptions(options, extendsOptions, instance);
  mixins && mixins.forEach(function (m) {
    return mergeOptions(options, m, instance);
  });
  mergeOptions(options, raw, instance);
  return raw.__merged = options;
}

function mergeOptions(to, from, instance) {
  var strats = instance.appContext.config.optionMergeStrategies;

  for (var key in from) {
    if (strats && hasOwn(strats, key)) {
      to[key] = strats[key](to[key], from[key], instance.proxy, key);
    } else if (!hasOwn(to, key)) {
      to[key] = from[key];
    }
  }
}

var publicPropertiesMap = extend(Object.create(null), {
  $: function $(i) {
    return i;
  },
  $el: function $el(i) {
    return i.vnode.el;
  },
  $data: function $data(i) {
    return i.data;
  },
  $props: function $props(i) {
    return shallowReadonly(i.props);
  },
  $attrs: function $attrs(i) {
    return shallowReadonly(i.attrs);
  },
  $slots: function $slots(i) {
    return shallowReadonly(i.slots);
  },
  $refs: function $refs(i) {
    return shallowReadonly(i.refs);
  },
  $parent: function $parent(i) {
    return i.parent && i.parent.proxy;
  },
  $root: function $root(i) {
    return i.root && i.root.proxy;
  },
  $emit: function $emit(i) {
    return i.emit;
  },
  $options: function $options(i) {
    return resolveMergedOptions(i);
  },
  $forceUpdate: function $forceUpdate(i) {
    return function () {
      return queueJob(i.update);
    };
  },
  $nextTick: function $nextTick() {
    return nextTick;
  },
  $watch: function $watch(i) {
    return instanceWatch.bind(i);
  }
});
var PublicInstanceProxyHandlers = {
  get: function get(_ref27, key) {
    var instance = _ref27._;
    var ctx = instance.ctx,
        setupState = instance.setupState,
        data = instance.data,
        props = instance.props,
        accessCache = instance.accessCache,
        type = instance.type,
        appContext = instance.appContext; // let @vue/reatvitiy know it should never observe Vue public instances.

    if (key === "__v_skip"
    /* SKIP */
    ) {
        return true;
      } // data / props / ctx
    // This getter gets called for every property access on the render context
    // during render and is a major hotspot. The most expensive part of this
    // is the multiple hasOwn() calls. It's much faster to do a simple property
    // access on a plain object, so we use an accessCache object (with null
    // prototype) to memoize what access type a key corresponds to.


    var normalizedProps;

    if (key[0] !== '$') {
      var n = accessCache[key];

      if (n !== undefined) {
        switch (n) {
          case 0
          /* SETUP */
          :
            return setupState[key];

          case 1
          /* DATA */
          :
            return data[key];

          case 3
          /* CONTEXT */
          :
            return ctx[key];

          case 2
          /* PROPS */
          :
            return props[key];
          // default: just fallthrough
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
        accessCache[key] = 0
        /* SETUP */
        ;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 1
        /* DATA */
        ;
        return data[key];
      } else if ( // only cache other properties when instance has declared (thus stable)
      // props
      (normalizedProps = normalizePropsOptions(type)[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 2
        /* PROPS */
        ;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 3
        /* CONTEXT */
        ;
        return ctx[key];
      } else {
        accessCache[key] = 4
        /* OTHER */
        ;
      }
    }

    var publicGetter = publicPropertiesMap[key];
    var cssModule, globalProperties; // public $xxx properties

    if (publicGetter) {
      if (key === '$attrs') {
        track(instance, "get"
        /* GET */
        , key);
        markAttrsAccessed();
      }

      return publicGetter(instance);
    } else if ( // css module (injected by vue-loader)
    (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      // user may set custom properties to `this` that start with `$`
      accessCache[key] = 3
      /* CONTEXT */
      ;
      return ctx[key];
    } else if ( // global properties
    globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      return globalProperties[key];
    } else if (currentRenderingInstance && // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf('__v') !== 0) {
      if (data !== EMPTY_OBJ && key[0] === '$' && hasOwn(data, key)) {
        warn("Property ".concat(JSON.stringify(key), " must be accessed via $data because it starts with a reserved ") + "character and is not proxied on the render context.");
      } else {
        warn("Property ".concat(JSON.stringify(key), " was accessed during render ") + "but is not defined on instance.");
      }
    }
  },
  set: function set(_ref28, key, value) {
    var instance = _ref28._;
    var data = instance.data,
        setupState = instance.setupState,
        ctx = instance.ctx;

    if (setupState !== EMPTY_OBJ && hasOwn(setupState, key)) {
      setupState[key] = value;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
    } else if (key in instance.props) {
      warn("Attempting to mutate prop \"".concat(key, "\". Props are readonly."), instance);
      return false;
    }

    if (key[0] === '$' && key.slice(1) in instance) {
      warn("Attempting to mutate public property \"".concat(key, "\". ") + "Properties starting with $ are reserved and readonly.", instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value: value
        });
      } else {
        ctx[key] = value;
      }
    }

    return true;
  },
  has: function has(_ref29, key) {
    var _ref29$_ = _ref29._,
        data = _ref29$_.data,
        setupState = _ref29$_.setupState,
        accessCache = _ref29$_.accessCache,
        ctx = _ref29$_.ctx,
        type = _ref29$_.type,
        appContext = _ref29$_.appContext;
    var normalizedProps;
    return accessCache[key] !== undefined || data !== EMPTY_OBJ && hasOwn(data, key) || setupState !== EMPTY_OBJ && hasOwn(setupState, key) || (normalizedProps = normalizePropsOptions(type)[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = function (target) {
    warn("Avoid app logic that relies on enumerating keys on a component instance. " + "The keys will be empty in production mode to avoid performance overhead.");
    return Reflect.ownKeys(target);
  };
}
var RuntimeCompiledPublicInstanceProxyHandlers = extend({}, PublicInstanceProxyHandlers, {
  get: function get(target, key) {
    // fast path for unscopables when using `with` block
    if (key === Symbol.unscopables) {
      return;
    }

    return PublicInstanceProxyHandlers.get(target, key, target);
  },
  has: function has(_, key) {
    var has = key[0] !== '_' && !isGloballyWhitelisted(key);

    if (!has && PublicInstanceProxyHandlers.has(_, key)) {
      warn("Property ".concat(JSON.stringify(key), " should not start with _ which is a reserved prefix for Vue internals."));
    }

    return has;
  }
}); // In dev mode, the proxy target exposes the same properties as seen on `this`
// for easier console inspection. In prod mode it will be an empty object so
// these properties definitions can be skipped.

function createRenderContext(instance) {
  var target = {}; // expose internal instance for proxy handlers

  Object.defineProperty(target, "_", {
    configurable: true,
    enumerable: false,
    get: function get() {
      return instance;
    }
  }); // expose public properties

  Object.keys(publicPropertiesMap).forEach(function (key) {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: function get() {
        return publicPropertiesMap[key](instance);
      },
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  }); // expose global properties

  var globalProperties = instance.appContext.config.globalProperties;
  Object.keys(globalProperties).forEach(function (key) {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: function get() {
        return globalProperties[key];
      },
      set: NOOP
    });
  });
  return target;
} // dev only


function exposePropsOnRenderContext(instance) {
  var ctx = instance.ctx,
      type = instance.type;
  var propsOptions = normalizePropsOptions(type)[0];

  if (propsOptions) {
    Object.keys(propsOptions).forEach(function (key) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: function get() {
          return instance.props[key];
        },
        set: NOOP
      });
    });
  }
} // dev only


function exposeSetupStateOnRenderContext(instance) {
  var ctx = instance.ctx,
      setupState = instance.setupState;
  Object.keys(toRaw(setupState)).forEach(function (key) {
    Object.defineProperty(ctx, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        return setupState[key];
      },
      set: NOOP
    });
  });
}

var emptyAppContext = createAppContext();
var uid$1 = 0;

function createComponentInstance(vnode, parent, suspense) {
  // inherit parent app context - or - if root, adopt from root vnode
  var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  var instance = {
    uid: uid$1++,
    vnode: vnode,
    parent: parent,
    appContext: appContext,
    type: vnode.type,
    root: null,
    next: null,
    subTree: null,
    update: null,
    render: null,
    proxy: null,
    withProxy: null,
    effects: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // per-instance asset storage (mutable during options resolution)
    components: Object.create(appContext.components),
    directives: Object.create(appContext.directives),
    // suspense related
    suspense: suspense,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    emit: null // to be set immediately

  };
  {
    instance.ctx = createRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  return instance;
}

var currentInstance = null;

var getCurrentInstance = function getCurrentInstance() {
  return currentInstance || currentRenderingInstance;
};

var setCurrentInstance = function setCurrentInstance(instance) {
  currentInstance = instance;
};

var isBuiltInTag = /*#__PURE__*/makeMap('slot,component');

function validateComponentName(name, config) {
  var appIsNativeTag = config.isNativeTag || NO;

  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component id: ' + name);
  }
}

var isInSSRComponentSetup = false;

function setupComponent(instance) {
  var isSSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isInSSRComponentSetup = isSSR;
  var _instance$vnode = instance.vnode,
      props = _instance$vnode.props,
      children = _instance$vnode.children,
      shapeFlag = _instance$vnode.shapeFlag;
  var isStateful = shapeFlag & 4
  /* STATEFUL_COMPONENT */
  ;
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  isInSSRComponentSetup = false;
  return setupResult;
}

function setupStatefulComponent(instance, isSSR) {
  var Component = instance.type;
  {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }

    if (Component.components) {
      var names = Object.keys(Component.components);

      for (var i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }

    if (Component.directives) {
      var _names = Object.keys(Component.directives);

      for (var _i10 = 0; _i10 < _names.length; _i10++) {
        validateDirectiveName(_names[_i10]);
      }
    }
  } // 0. create render proxy property access cache

  instance.accessCache = {}; // 1. create public instance / render proxy
  // also mark it raw so it's never observed

  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  {
    exposePropsOnRenderContext(instance);
  } // 2. call setup()

  var setup = Component.setup;

  if (setup) {
    var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    currentInstance = instance;
    pauseTracking();
    var setupResult = callWithErrorHandling(setup, instance, 0
    /* SETUP_FUNCTION */
    , [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    currentInstance = null;

    if (isPromise(setupResult)) {
      if (isSSR) {
        // return the promise so server-renderer can wait on it
        return setupResult.then(function (resolvedResult) {
          handleSetupResult(instance, resolvedResult);
        });
      } else {
        // async setup returned Promise.
        // bail here and wait for re-entry.
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}

function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    // setup returned an inline render function
    instance.render = setupResult;
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn("setup() should not return VNodes directly - " + "return a render function instead.");
    } // setup returned bindings.
    // assuming a render function compiled from template is present.


    instance.setupState = reactive(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== undefined) {
    warn("setup() should return an object. Received: ".concat(setupResult === null ? 'null' : _typeof(setupResult)));
  }

  finishComponentSetup(instance);
}

var compile$1;
/**
 * For runtime-dom to register the compiler.
 * Note the exported method uses any to avoid d.ts relying on the compiler types.
 */

function registerRuntimeCompiler(_compile) {
  compile$1 = _compile;
}

function finishComponentSetup(instance, isSSR) {
  var Component = instance.type; // template / render function normalization

  if (!instance.render) {
    if (compile$1 && Component.template && !Component.render) {
      {
        startMeasure(instance, "compile");
      }
      Component.render = compile$1(Component.template, {
        isCustomElement: instance.appContext.config.isCustomElement || NO
      });
      {
        endMeasure(instance, "compile");
      }
      Component.render._rc = true;
    }

    if (!Component.render) {
      /* istanbul ignore if */
      if (!compile$1 && Component.template) {
        warn("Component provided template option but " + "runtime compilation is not supported in this build of Vue." + " Use \"vue.global.js\" instead."
        /* should not happen */
        );
      } else {
        warn("Component is missing template or render function.");
      }
    }

    instance.render = Component.render || NOOP; // for runtime-compiled render functions using `with` blocks, the render
    // proxy used needs a different `has` handler which is more performant and
    // also only allows a whitelist of globals to fallthrough.

    if (instance.render._rc) {
      instance.withProxy = new Proxy(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  } // support for 2.x options


  {
    currentInstance = instance;
    applyOptions(instance, Component);
    currentInstance = null;
  }
}

var attrHandlers = {
  get: function get(target, key) {
    {
      markAttrsAccessed();
    }
    return target[key];
  },
  set: function set() {
    warn("setupContext.attrs is readonly.");
    return false;
  },
  deleteProperty: function deleteProperty() {
    warn("setupContext.attrs is readonly.");
    return false;
  }
};

function createSetupContext(instance) {
  {
    // We use getters in dev in case libs like test-utils overwrite instance
    // properties (overwrites should not be done in prod)
    return Object.freeze({
      get attrs() {
        return new Proxy(instance.attrs, attrHandlers);
      },

      get slots() {
        return shallowReadonly(instance.slots);
      },

      get emit() {
        return function (event) {
          for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key21 = 1; _key21 < _len9; _key21++) {
            args[_key21 - 1] = arguments[_key21];
          }

          return instance.emit.apply(instance, [event].concat(args));
        };
      }

    });
  }
} // record effects created during a component's setup() so that they can be
// stopped when the component unmounts


function recordInstanceBoundEffect(effect) {
  if (currentInstance) {
    (currentInstance.effects || (currentInstance.effects = [])).push(effect);
  }
}

var classifyRE = /(?:^|[-_])(\w)/g;

var classify = function classify(str) {
  return str.replace(classifyRE, function (c) {
    return c.toUpperCase();
  }).replace(/[-_]/g, '');
};

function formatComponentName(instance, Component) {
  var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var name = isFunction(Component) ? Component.displayName || Component.name : Component.name;

  if (!name && Component.__file) {
    var match = Component.__file.match(/([^/\\]+)\.vue$/);

    if (match) {
      name = match[1];
    }
  }

  if (!name && instance && instance.parent) {
    // try to infer the name based on local resolution
    var registry = instance.parent.components;

    for (var key in registry) {
      if (registry[key] === Component) {
        name = key;
        break;
      }
    }
  }

  return name ? classify(name) : isRoot ? "App" : "Anonymous";
}

function computed$1(getterOrOptions) {
  var c = computed(getterOrOptions);
  recordInstanceBoundEffect(c.effect);
  return c;
} // implementation, close to no-op


function defineComponent(options) {
  return isFunction(options) ? {
    setup: options
  } : options;
}

function defineAsyncComponent(source) {
  if (isFunction(source)) {
    source = {
      loader: source
    };
  }

  var _source = source,
      loader = _source.loader,
      loadingComponent = _source.loadingComponent,
      errorComponent = _source.errorComponent,
      _source$delay = _source.delay,
      delay = _source$delay === void 0 ? 200 : _source$delay,
      timeout = _source.timeout,
      _source$suspensible = _source.suspensible,
      suspensible = _source$suspensible === void 0 ? true : _source$suspensible,
      userOnError = _source.onError;
  var pendingRequest = null;
  var resolvedComp;
  var retries = 0;

  var retry = function retry() {
    retries++;
    pendingRequest = null;
    return load();
  };

  var load = function load() {
    var thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch(function (err) {
      err = err instanceof Error ? err : new Error(String(err));

      if (userOnError) {
        return new Promise(function (resolve, reject) {
          var userRetry = function userRetry() {
            return resolve(retry());
          };

          var userFail = function userFail() {
            return reject(err);
          };

          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then(function (comp) {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }

      if (!comp) {
        warn("Async component loader resolved to undefined. " + "If you are using retry(), make sure to return its return value.");
      } // interop module default


      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
        comp = comp.default;
      }

      if (comp && !isObject(comp) && !isFunction(comp)) {
        throw new Error("Invalid async component load result: ".concat(comp));
      }

      resolvedComp = comp;
      return comp;
    }));
  };

  return defineComponent({
    __asyncLoader: load,
    name: 'AsyncComponentWrapper',
    setup: function setup() {
      var instance = currentInstance; // already resolved

      if (resolvedComp) {
        return function () {
          return createInnerComp(resolvedComp, instance);
        };
      }

      var onError = function onError(err) {
        pendingRequest = null;
        handleError(err, instance, 13
        /* ASYNC_COMPONENT_LOADER */
        );
      }; // suspense-controlled or SSR.


      if (suspensible && instance.suspense || false) {
        return load().then(function (comp) {
          return function () {
            return createInnerComp(comp, instance);
          };
        }).catch(function (err) {
          onError(err);
          return function () {
            return errorComponent ? createVNode(errorComponent, {
              error: err
            }) : null;
          };
        });
      }

      var loaded = ref(false);
      var error = ref();
      var delayed = ref(!!delay);

      if (delay) {
        setTimeout(function () {
          delayed.value = false;
        }, delay);
      }

      if (timeout != null) {
        setTimeout(function () {
          if (!loaded.value) {
            var err = new Error("Async component timed out after ".concat(timeout, "ms."));
            onError(err);
            error.value = err;
          }
        }, timeout);
      }

      load().then(function () {
        loaded.value = true;
      }).catch(function (err) {
        onError(err);
        error.value = err;
      });
      return function () {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}

function createInnerComp(comp, _ref30) {
  var _ref30$vnode = _ref30.vnode,
      props = _ref30$vnode.props,
      children = _ref30$vnode.children;
  return createVNode(comp, props, children);
} // Actual implementation


function h(type, propsOrChildren, children) {
  if (arguments.length === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      } // props without children


      return createVNode(type, propsOrChildren);
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (isVNode(children)) {
      children = [children];
    }

    return createVNode(type, propsOrChildren, children);
  }
}

var useCSSModule = function useCSSModule() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '$style';
  {
    {
      warn("useCSSModule() is not supported in the global build.");
    }
    return EMPTY_OBJ;
  }
};

var ssrContextKey = Symbol("ssrContext");

var useSSRContext = function useSSRContext() {
  {
    warn("useSsrContext() is not supported in the global build.");
  }
};
/**
 * Actual implementation
 */


function renderList(source, renderItem) {
  var ret;

  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);

    for (var i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i);
    }
  } else if (typeof source === 'number') {
    ret = new Array(source);

    for (var _i11 = 0; _i11 < source; _i11++) {
      ret[_i11] = renderItem(_i11 + 1, _i11);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, renderItem);
    } else {
      var keys = Object.keys(source);
      ret = new Array(keys.length);

      for (var _i12 = 0, _l = keys.length; _i12 < _l; _i12++) {
        var key = keys[_i12];
        ret[_i12] = renderItem(source[key], key, _i12);
      }
    }
  } else {
    ret = [];
  }

  return ret;
}
/**
 * For prefixing keys in v-on="obj" with "on"
 * @private
 */


function toHandlers(obj) {
  var ret = {};

  if (!isObject(obj)) {
    warn("v-on with no argument expects an object value.");
    return ret;
  }

  for (var key in obj) {
    ret["on".concat(capitalize(key))] = obj[key];
  }

  return ret;
}
/**
 * Compiler runtime helper for rendering <slot/>
 * @private
 */


function renderSlot(slots, name) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var // this is not a user-facing function, so the fallback is always generated by
  // the compiler and guaranteed to be a function returning an array
  fallback = arguments.length > 3 ? arguments[3] : undefined;
  var slot = slots[name];

  if (slot && slot.length > 1) {
    warn("SSR-optimized slot function detected in a non-SSR-optimized render " + "function. You need to mark this component with $dynamic-slots in the " + "parent template.");

    slot = function slot() {
      return [];
    };
  }

  return openBlock(), createBlock(Fragment, {
    key: props.key
  }, slot ? slot(props) : fallback ? fallback() : [], slots._ ? 64
  /* STABLE_FRAGMENT */
  : -2
  /* BAIL */
  );
}
/**
 * Compiler runtime helper for creating dynamic slots object
 * @private
 */


function createSlots(slots, dynamicSlots) {
  for (var i = 0; i < dynamicSlots.length; i++) {
    var slot = dynamicSlots[i]; // array of dynamic slot generated by <template v-for="..." #[...]>

    if (isArray(slot)) {
      for (var j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      // conditional single slot generated by <template v-if="..." #foo>
      slots[slot.name] = slot.fn;
    }
  }

  return slots;
} // Core API ------------------------------------------------------------------


var version = "3.0.0-beta.18";
/**
 * @private
 */

var _toDisplayString = toDisplayString;
/**
 * @private
 */

var _camelize = camelize;
/**
 * SSR utils for \@vue/server-renderer. Only exposed in cjs builds.
 * @internal
 */

var ssrUtils = null;
var svgNS = 'http://www.w3.org/2000/svg';
var doc = typeof document !== 'undefined' ? document : null;
var tempContainer;
var tempSVGContainer;
var nodeOps = {
  insert: function insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
  remove: function remove(child) {
    var parent = child.parentNode;

    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: function createElement(tag, isSVG, is) {
    return isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {
      is: is
    } : undefined);
  },
  createText: function createText(text) {
    return doc.createTextNode(text);
  },
  createComment: function createComment(text) {
    return doc.createComment(text);
  },
  setText: function setText(node, text) {
    node.nodeValue = text;
  },
  setElementText: function setElementText(el, text) {
    el.textContent = text;
  },
  parentNode: function parentNode(node) {
    return node.parentNode;
  },
  nextSibling: function nextSibling(node) {
    return node.nextSibling;
  },
  querySelector: function querySelector(selector) {
    return doc.querySelector(selector);
  },
  setScopeId: function setScopeId(el, id) {
    el.setAttribute(id, '');
  },
  cloneNode: function cloneNode(el) {
    return el.cloneNode(true);
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent: function insertStaticContent(content, parent, anchor, isSVG) {
    var temp = isSVG ? tempSVGContainer || (tempSVGContainer = doc.createElementNS(svgNS, 'svg')) : tempContainer || (tempContainer = doc.createElement('div'));
    temp.innerHTML = content;
    var first = temp.firstChild;
    var node = first;
    var last = node;

    while (node) {
      last = node;
      nodeOps.insert(node, parent, anchor);
      node = temp.firstChild;
    }

    return [first, last];
  }
}; // compiler should normalize class + :class bindings on the same element
// into a single binding ['staticClass', dynamic]

function patchClass(el, value, isSVG) {
  if (value == null) {
    value = '';
  }

  if (isSVG) {
    el.setAttribute('class', value);
  } else {
    // directly setting className should be faster than setAttribute in theory
    // if this is an element during a transition, take the temporary transition
    // classes into account.
    var transitionClasses = el._vtc;

    if (transitionClasses) {
      value = (value ? [value].concat(_toConsumableArray(transitionClasses)) : _toConsumableArray(transitionClasses)).join(' ');
    }

    el.className = value;
  }
}

function patchStyle(el, prev, next) {
  var style = el.style;

  if (!next) {
    el.removeAttribute('style');
  } else if (isString(next)) {
    if (prev !== next) {
      style.cssText = next;
    }
  } else {
    for (var key in next) {
      setStyle(style, key, next[key]);
    }

    if (prev && !isString(prev)) {
      for (var _key22 in prev) {
        if (!next[_key22]) {
          setStyle(style, _key22, '');
        }
      }
    }
  }
}

var importantRE = /\s*!important$/;

function setStyle(style, name, val) {
  if (name.startsWith('--')) {
    // custom property definition
    style.setProperty(name, val);
  } else {
    var prefixed = autoPrefix(style, name);

    if (importantRE.test(val)) {
      // !important
      style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
    } else {
      style[prefixed] = val;
    }
  }
}

var prefixes = ['Webkit', 'Moz', 'ms'];
var prefixCache = {};

function autoPrefix(style, rawName) {
  var cached = prefixCache[rawName];

  if (cached) {
    return cached;
  }

  var name = _camelize(rawName);

  if (name !== 'filter' && name in style) {
    return prefixCache[rawName] = name;
  }

  name = capitalize(name);

  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + name;

    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }

  return rawName;
}

var xlinkNS = 'http://www.w3.org/1999/xlink';

function patchAttr(el, key, value, isSVG) {
  if (isSVG && key.startsWith('xlink:')) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    // note we are only checking boolean attributes that don't have a
    // corresponding dom prop of the same name here.
    var _isBoolean = isSpecialBooleanAttr(key);

    if (value == null || _isBoolean && value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, _isBoolean ? '' : value);
    }
  }
} // __UNSAFE__
// functions. The user is reponsible for using them with only trusted content.


function patchDOMProp(el, key, value, // the following args are passed only due to potential innerHTML/textContent
// overriding existing VNodes, in which case the old tree must be properly
// unmounted.
prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === 'innerHTML' || key === 'textContent') {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }

    el[key] = value == null ? '' : value;
    return;
  }

  if (key === 'value' && el.tagName !== 'PROGRESS') {
    // store value as _value as well since
    // non-string values will be stringified.
    el._value = value;
    el.value = value == null ? '' : value;
    return;
  }

  if (value === '' && typeof el[key] === 'boolean') {
    // e.g. <select multiple> compiles to { multiple: '' }
    el[key] = true;
  } else if (value == null && typeof el[key] === 'string') {
    // e.g. <div :id="null">
    el[key] = '';
  } else {
    // some properties perform value validation and throw
    try {
      el[key] = value;
    } catch (e) {
      {
        warn("Failed setting prop \"".concat(key, "\" on <").concat(el.tagName.toLowerCase(), ">: ") + "value ".concat(value, " is invalid."), e);
      }
    }
  }
} // Async edge case fix requires storing an event listener's attach timestamp.


var _getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.

if (typeof document !== 'undefined' && _getNow() > document.createEvent('Event').timeStamp) {
  // if the low-res timestamp which is bigger than the event timestamp
  // (which is evaluated AFTER) it means the event is using a hi-res timestamp,
  // and we need to use the hi-res version for event listeners as well.
  _getNow = function _getNow() {
    return performance.now();
  };
} // To avoid the overhead of repeatedly calling performance.now(), we cache
// and use the same timestamp for all event listeners attached in the same tick.


var cachedNow = 0;
var p$1 = Promise.resolve();

var reset = function reset() {
  cachedNow = 0;
};

var getNow = function getNow() {
  return cachedNow || (p$1.then(reset), cachedNow = _getNow());
};

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}

function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}

function patchEvent(el, rawName, prevValue, nextValue) {
  var instance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var name = rawName.slice(2).toLowerCase();
  var prevOptions = prevValue && 'options' in prevValue && prevValue.options;
  var nextOptions = nextValue && 'options' in nextValue && nextValue.options;
  var invoker = prevValue && prevValue.invoker;
  var value = nextValue && 'handler' in nextValue ? nextValue.handler : nextValue;

  if (prevOptions || nextOptions) {
    var prev = prevOptions || EMPTY_OBJ;
    var next = nextOptions || EMPTY_OBJ;

    if (prev.capture !== next.capture || prev.passive !== next.passive || prev.once !== next.once) {
      if (invoker) {
        removeEventListener(el, name, invoker, prev);
      }

      if (nextValue && value) {
        var _invoker = createInvoker(value, instance);

        nextValue.invoker = _invoker;
        addEventListener(el, name, _invoker, next);
      }

      return;
    }
  }

  if (nextValue && value) {
    if (invoker) {
      prevValue.invoker = null;
      invoker.value = value;
      nextValue.invoker = invoker;
      invoker.lastUpdated = getNow();
    } else {
      addEventListener(el, name, createInvoker(value, instance), nextOptions || void 0);
    }
  } else if (invoker) {
    removeEventListener(el, name, invoker, prevOptions || void 0);
  }
}

function createInvoker(initialValue, instance) {
  var invoker = function invoker(e) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    var timeStamp = e.timeStamp || _getNow();

    if (timeStamp >= invoker.lastUpdated - 1) {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5
      /* NATIVE_EVENT_HANDLER */
      , [e]);
    }
  };

  invoker.value = initialValue;
  initialValue.invoker = invoker;
  invoker.lastUpdated = getNow();
  return invoker;
}

function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    var originalStop = e.stopImmediatePropagation;

    e.stopImmediatePropagation = function () {
      originalStop.call(e);
      e._stopped = true;
    };

    return value.map(function (fn) {
      return function (e) {
        return !e._stopped && fn(e);
      };
    });
  } else {
    return value;
  }
}

var nativeOnRE = /^on[a-z]/;

var forcePatchProp = function forcePatchProp(_, key) {
  return key === 'value';
};

var patchProp = function patchProp(el, key, prevValue, nextValue) {
  var isSVG = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var prevChildren = arguments.length > 5 ? arguments[5] : undefined;
  var parentComponent = arguments.length > 6 ? arguments[6] : undefined;
  var parentSuspense = arguments.length > 7 ? arguments[7] : undefined;
  var unmountChildren = arguments.length > 8 ? arguments[8] : undefined;

  switch (key) {
    // special
    case 'class':
      patchClass(el, nextValue, isSVG);
      break;

    case 'style':
      patchStyle(el, prevValue, nextValue);
      break;

    default:
      if (isOn(key)) {
        // ignore v-model listeners
        if (!key.startsWith('onUpdate:')) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else if ( // spellcheck and draggable are numerated attrs, however their
      // corresponding DOM properties are actually booleans - this leads to
      // setting it with a string "false" value leading it to be coerced to
      // `true`, so we need to always treat them as attributes.
      // Note that `contentEditable` doesn't have this problem: its DOM
      // property is also enumerated string values.
      key !== 'spellcheck' && key !== 'draggable' && (isSVG ? // most keys must be set as attribute on svg elements to work
      // ...except innerHTML
      key === 'innerHTML' || // or native onclick with function values
      key in el && nativeOnRE.test(key) && isFunction(nextValue) : // for normal html elements, set as a property if it exists
      key in el && // except native onclick with string values
      !(nativeOnRE.test(key) && isString(nextValue)))) {
        patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
      } else {
        // special case for <input v-model type="checkbox"> with
        // :true-value & :false-value
        // store value as dom properties since non-string values will be
        // stringified.
        if (key === 'true-value') {
          el._trueValue = nextValue;
        } else if (key === 'false-value') {
          el._falseValue = nextValue;
        }

        patchAttr(el, key, nextValue, isSVG);
      }

      break;
  }
};

var TRANSITION$1 = 'transition';
var ANIMATION = 'animation'; // DOM Transition is a higher-order-component based on the platform-agnostic
// base Transition component, with DOM-specific logic.

var Transition = function Transition(props, _ref31) {
  var slots = _ref31.slots;
  return h(BaseTransition, resolveTransitionProps(props), slots);
};

Transition.displayName = 'Transition';
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
var TransitionPropsValidators = Transition.props = extend({}, BaseTransition.props, DOMTransitionPropsValidators);

function resolveTransitionProps(rawProps) {
  var _rawProps$name = rawProps.name,
      name = _rawProps$name === void 0 ? 'v' : _rawProps$name,
      type = rawProps.type,
      _rawProps$css = rawProps.css,
      css = _rawProps$css === void 0 ? true : _rawProps$css,
      duration = rawProps.duration,
      _rawProps$enterFromCl = rawProps.enterFromClass,
      enterFromClass = _rawProps$enterFromCl === void 0 ? "".concat(name, "-enter-from") : _rawProps$enterFromCl,
      _rawProps$enterActive = rawProps.enterActiveClass,
      enterActiveClass = _rawProps$enterActive === void 0 ? "".concat(name, "-enter-active") : _rawProps$enterActive,
      _rawProps$enterToClas = rawProps.enterToClass,
      enterToClass = _rawProps$enterToClas === void 0 ? "".concat(name, "-enter-to") : _rawProps$enterToClas,
      _rawProps$appearFromC = rawProps.appearFromClass,
      appearFromClass = _rawProps$appearFromC === void 0 ? enterFromClass : _rawProps$appearFromC,
      _rawProps$appearActiv = rawProps.appearActiveClass,
      appearActiveClass = _rawProps$appearActiv === void 0 ? enterActiveClass : _rawProps$appearActiv,
      _rawProps$appearToCla = rawProps.appearToClass,
      appearToClass = _rawProps$appearToCla === void 0 ? enterToClass : _rawProps$appearToCla,
      _rawProps$leaveFromCl = rawProps.leaveFromClass,
      leaveFromClass = _rawProps$leaveFromCl === void 0 ? "".concat(name, "-leave-from") : _rawProps$leaveFromCl,
      _rawProps$leaveActive = rawProps.leaveActiveClass,
      leaveActiveClass = _rawProps$leaveActive === void 0 ? "".concat(name, "-leave-active") : _rawProps$leaveActive,
      _rawProps$leaveToClas = rawProps.leaveToClass,
      leaveToClass = _rawProps$leaveToClas === void 0 ? "".concat(name, "-leave-to") : _rawProps$leaveToClas;
  var baseProps = {};

  for (var key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }

  if (!css) {
    return baseProps;
  }

  var durations = normalizeDuration(duration);
  var enterDuration = durations && durations[0];
  var leaveDuration = durations && durations[1];

  var _onBeforeEnter = baseProps.onBeforeEnter,
      onEnter = baseProps.onEnter,
      _onEnterCancelled = baseProps.onEnterCancelled,
      _onLeave = baseProps.onLeave,
      _onLeaveCancelled = baseProps.onLeaveCancelled,
      _baseProps$onBeforeAp = baseProps.onBeforeAppear,
      _onBeforeAppear = _baseProps$onBeforeAp === void 0 ? _onBeforeEnter : _baseProps$onBeforeAp,
      _baseProps$onAppear = baseProps.onAppear,
      onAppear = _baseProps$onAppear === void 0 ? onEnter : _baseProps$onAppear,
      _baseProps$onAppearCa = baseProps.onAppearCancelled,
      _onAppearCancelled = _baseProps$onAppearCa === void 0 ? _onEnterCancelled : _baseProps$onAppearCa;

  var finishEnter = function finishEnter(el, isAppear, done) {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };

  var finishLeave = function finishLeave(el, done) {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };

  var makeEnterHook = function makeEnterHook(isAppear) {
    return function (el, done) {
      var hook = isAppear ? onAppear : onEnter;

      var resolve = function resolve() {
        return finishEnter(el, isAppear, done);
      };

      hook && hook(el, resolve);
      nextFrame(function () {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);

        if (!(hook && hook.length > 1)) {
          if (enterDuration) {
            setTimeout(resolve, enterDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
    };
  };

  return extend(baseProps, {
    onBeforeEnter: function onBeforeEnter(el) {
      _onBeforeEnter && _onBeforeEnter(el);
      addTransitionClass(el, enterActiveClass);
      addTransitionClass(el, enterFromClass);
    },
    onBeforeAppear: function onBeforeAppear(el) {
      _onBeforeAppear && _onBeforeAppear(el);
      addTransitionClass(el, appearActiveClass);
      addTransitionClass(el, appearFromClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave: function onLeave(el, done) {
      var resolve = function resolve() {
        return finishLeave(el, done);
      };

      addTransitionClass(el, leaveActiveClass);
      addTransitionClass(el, leaveFromClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);

        if (!(_onLeave && _onLeave.length > 1)) {
          if (leaveDuration) {
            setTimeout(resolve, leaveDuration);
          } else {
            whenTransitionEnds(el, type, resolve);
          }
        }
      });
      _onLeave && _onLeave(el, resolve);
    },
    onEnterCancelled: function onEnterCancelled(el) {
      finishEnter(el, false);
      _onEnterCancelled && _onEnterCancelled(el);
    },
    onAppearCancelled: function onAppearCancelled(el) {
      finishEnter(el, true);
      _onAppearCancelled && _onAppearCancelled(el);
    },
    onLeaveCancelled: function onLeaveCancelled(el) {
      finishLeave(el);
      _onLeaveCancelled && _onLeaveCancelled(el);
    }
  });
}

function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    var n = NumberOf(duration);
    return [n, n];
  }
}

function NumberOf(val) {
  var res = toNumber(val);
  validateDuration(res);
  return res;
}

function validateDuration(val) {
  if (typeof val !== 'number') {
    warn("<transition> explicit duration is not a valid number - " + "got ".concat(JSON.stringify(val), "."));
  } else if (isNaN(val)) {
    warn("<transition> explicit duration is NaN - " + 'the duration expression might be incorrect.');
  }
}

function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(function (c) {
    return c && el.classList.add(c);
  });
  (el._vtc || (el._vtc = new Set())).add(cls);
}

function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach(function (c) {
    return c && el.classList.remove(c);
  });
  var _vtc = el._vtc;

  if (_vtc) {
    _vtc.delete(cls);

    if (!_vtc.size) {
      el._vtc = undefined;
    }
  }
}

function nextFrame(cb) {
  requestAnimationFrame(function () {
    requestAnimationFrame(cb);
  });
}

function whenTransitionEnds(el, expectedType, cb) {
  var _getTransitionInfo = getTransitionInfo(el, expectedType),
      type = _getTransitionInfo.type,
      timeout = _getTransitionInfo.timeout,
      propCount = _getTransitionInfo.propCount;

  if (!type) {
    return cb();
  }

  var endEvent = type + 'end';
  var ended = 0;

  var end = function end() {
    el.removeEventListener(endEvent, onEnd);
    cb();
  };

  var onEnd = function onEnd(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var getStyleProperties = function getStyleProperties(key) {
    return (styles[key] || '').split(', ');
  };

  var transitionDelays = getStyleProperties(TRANSITION$1 + 'Delay');
  var transitionDurations = getStyleProperties(TRANSITION$1 + 'Duration');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = getStyleProperties(ANIMATION + 'Delay');
  var animationDurations = getStyleProperties(ANIMATION + 'Duration');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type = null;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION$1) {
    if (transitionTimeout > 0) {
      type = TRANSITION$1;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION$1 : ANIMATION : null;
    propCount = type ? type === TRANSITION$1 ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION$1 && /\b(transform|all)(,|$)/.test(styles[TRANSITION$1 + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(Math, _toConsumableArray(durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  })));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer
// numbers in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down
// (i.e. acting as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}

var positionMap = new WeakMap();
var newPositionMap = new WeakMap();
var TransitionGroupImpl = {
  name: 'TransitionGroup',
  props: extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup: function setup(props, _ref32) {
    var slots = _ref32.slots;
    var instance = getCurrentInstance();
    var state = useTransitionState();
    var prevChildren;
    var children;
    onUpdated(function () {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return;
      }

      var moveClass = props.moveClass || "".concat(props.name || 'v', "-move");

      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      } // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.


      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      var movedChildren = prevChildren.filter(applyTranslation); // force reflow to put everything in position

      forceReflow();
      movedChildren.forEach(function (c) {
        var el = c.el;
        var style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = '';

        var cb = el._moveCb = function (e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };

        el.addEventListener('transitionend', cb);
      });
    });
    return function () {
      var rawProps = toRaw(props);
      var cssTransitionProps = resolveTransitionProps(rawProps);
      var tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];

      for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else {
          warn("<TransitionGroup> children must be keyed.");
        }
      }

      if (prevChildren) {
        for (var _i13 = 0; _i13 < prevChildren.length; _i13++) {
          var _child2 = prevChildren[_i13];
          setTransitionHooks(_child2, resolveTransitionHooks(_child2, cssTransitionProps, state, instance));
          positionMap.set(_child2, _child2.el.getBoundingClientRect());
        }
      }

      return createVNode(tag, null, children);
    };
  }
}; // remove mode props as TransitionGroup doesn't support it

delete TransitionGroupImpl.props.mode;
var TransitionGroup = TransitionGroupImpl;

function callPendingCbs(c) {
  var el = c.el;

  if (el._moveCb) {
    el._moveCb();
  }

  if (el._enterCb) {
    el._enterCb();
  }
}

function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}

function applyTranslation(c) {
  var oldPos = positionMap.get(c);
  var newPos = newPositionMap.get(c);
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    var s = c.el.style;
    s.transform = s.webkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = '0s';
    return c;
  }
} // this is put in a dedicated function to avoid the line from being treeshaken


function forceReflow() {
  return document.body.offsetHeight;
}

function hasCSSTransform(el, root, moveClass) {
  // Detect whether an element with the move class applied has
  // CSS transitions. Since the element may be inside an entering
  // transition at this very moment, we make a clone of it and remove
  // all other transition classes applied to ensure only the move class
  // is applied.
  var clone = el.cloneNode();

  if (el._vtc) {
    el._vtc.forEach(function (cls) {
      cls.split(/\s+/).forEach(function (c) {
        return c && clone.classList.remove(c);
      });
    });
  }

  moveClass.split(/\s+/).forEach(function (c) {
    return c && clone.classList.add(c);
  });
  clone.style.display = 'none';
  var container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);

  var _getTransitionInfo2 = getTransitionInfo(clone),
      hasTransform = _getTransitionInfo2.hasTransform;

  container.removeChild(clone);
  return hasTransform;
}

var getModelAssigner = function getModelAssigner(vnode) {
  var fn = vnode.props['onUpdate:modelValue'];
  return isArray(fn) ? function (value) {
    return invokeArrayFns(fn, value);
  } : fn;
};

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  var target = e.target;

  if (target.composing) {
    target.composing = false;
    trigger$1(target, 'input');
  }
}

function trigger$1(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
} // We are exporting the v-model runtime directly as vnode hooks so that it can
// be tree-shaken in case v-model is never used.


var vModelText = {
  beforeMount: function beforeMount(el, _ref33, vnode) {
    var value = _ref33.value,
        _ref33$modifiers = _ref33.modifiers,
        lazy = _ref33$modifiers.lazy,
        trim = _ref33$modifiers.trim,
        number = _ref33$modifiers.number;
    el.value = value;
    el._assign = getModelAssigner(vnode);
    var castToNumber = number || el.type === 'number';
    addEventListener(el, lazy ? 'change' : 'input', function (e) {
      if (e.target.composing) return;
      var domValue = el.value;

      if (trim) {
        domValue = domValue.trim();
      } else if (castToNumber) {
        domValue = toNumber(domValue);
      }

      el._assign(domValue);
    });

    if (trim) {
      addEventListener(el, 'change', function () {
        el.value = el.value.trim();
      });
    }

    if (!lazy) {
      addEventListener(el, 'compositionstart', onCompositionStart);
      addEventListener(el, 'compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
      // switching focus before confirming composition choice
      // this also fixes the issue where some browsers e.g. iOS Chrome
      // fires "change" instead of "input" on autocomplete.

      addEventListener(el, 'change', onCompositionEnd);
    }
  },
  beforeUpdate: function beforeUpdate(el, _ref34, vnode) {
    var value = _ref34.value,
        _ref34$modifiers = _ref34.modifiers,
        trim = _ref34$modifiers.trim,
        number = _ref34$modifiers.number;
    el._assign = getModelAssigner(vnode);

    if (document.activeElement === el) {
      if (trim && el.value.trim() === value) {
        return;
      }

      if ((number || el.type === 'number') && toNumber(el.value) === value) {
        return;
      }
    }

    el.value = value;
  }
};
var vModelCheckbox = {
  beforeMount: function beforeMount(el, binding, vnode) {
    setChecked(el, binding, vnode);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      var modelValue = el._modelValue;
      var elementValue = getValue(el);
      var checked = el.checked;
      var assign = el._assign;

      if (isArray(modelValue)) {
        var index = looseIndexOf(modelValue, elementValue);
        var found = index !== -1;

        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          var filtered = _toConsumableArray(modelValue);

          filtered.splice(index, 1);
          assign(filtered);
        }
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  beforeUpdate: function beforeUpdate(el, binding, vnode) {
    el._assign = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};

function setChecked(el, _ref35, vnode) {
  var value = _ref35.value,
      oldValue = _ref35.oldValue;
  el._modelValue = value;

  if (isArray(value)) {
    el.checked = looseIndexOf(value, vnode.props.value) > -1;
  } else if (value !== oldValue) {
    el.checked = looseEqual(value, getCheckboxValue(el, true));
  }
}

var vModelRadio = {
  beforeMount: function beforeMount(el, _ref36, vnode) {
    var value = _ref36.value;
    el.checked = looseEqual(value, vnode.props.value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      el._assign(getValue(el));
    });
  },
  beforeUpdate: function beforeUpdate(el, _ref37, vnode) {
    var value = _ref37.value,
        oldValue = _ref37.oldValue;
    el._assign = getModelAssigner(vnode);

    if (value !== oldValue) {
      el.checked = looseEqual(value, vnode.props.value);
    }
  }
};
var vModelSelect = {
  // use mounted & updated because <select> relies on its children <option>s.
  mounted: function mounted(el, _ref38, vnode) {
    var value = _ref38.value;
    setSelected(el, value);
    el._assign = getModelAssigner(vnode);
    addEventListener(el, 'change', function () {
      var selectedVal = Array.prototype.filter.call(el.options, function (o) {
        return o.selected;
      }).map(getValue);

      el._assign(el.multiple ? selectedVal : selectedVal[0]);
    });
  },
  beforeUpdate: function beforeUpdate(el, _binding, vnode) {
    el._assign = getModelAssigner(vnode);
  },
  updated: function updated(el, _ref39) {
    var value = _ref39.value;
    setSelected(el, value);
  }
};

function setSelected(el, value) {
  var isMultiple = el.multiple;

  if (isMultiple && !isArray(value)) {
    warn("<select multiple v-model> expects an Array value for its binding, " + "but got ".concat(Object.prototype.toString.call(value).slice(8, -1), "."));
    return;
  }

  for (var i = 0, l = el.options.length; i < l; i++) {
    var option = el.options[i];
    var optionValue = getValue(option);

    if (isMultiple) {
      option.selected = looseIndexOf(value, optionValue) > -1;
    } else {
      if (looseEqual(getValue(option), value)) {
        el.selectedIndex = i;
        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
} // retrieve raw value set via :value bindings


function getValue(el) {
  return '_value' in el ? el._value : el.value;
} // retrieve raw value for true-value and false-value set via :true-value or :false-value bindings


function getCheckboxValue(el, checked) {
  var key = checked ? '_trueValue' : '_falseValue';
  return key in el ? el[key] : checked;
}

var vModelDynamic = {
  beforeMount: function beforeMount(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'beforeMount');
  },
  mounted: function mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, 'mounted');
  },
  beforeUpdate: function beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'beforeUpdate');
  },
  updated: function updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, 'updated');
  }
};

function callModelHook(el, binding, vnode, prevVNode, hook) {
  var modelToUse;

  switch (el.tagName) {
    case 'SELECT':
      modelToUse = vModelSelect;
      break;

    case 'TEXTAREA':
      modelToUse = vModelText;
      break;

    default:
      switch (el.type) {
        case 'checkbox':
          modelToUse = vModelCheckbox;
          break;

        case 'radio':
          modelToUse = vModelRadio;
          break;

        default:
          modelToUse = vModelText;
      }

  }

  var fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}

var systemModifiers = ['ctrl', 'shift', 'alt', 'meta'];
var modifierGuards = {
  stop: function stop(e) {
    return e.stopPropagation();
  },
  prevent: function prevent(e) {
    return e.preventDefault();
  },
  self: function self(e) {
    return e.target !== e.currentTarget;
  },
  ctrl: function ctrl(e) {
    return !e.ctrlKey;
  },
  shift: function shift(e) {
    return !e.shiftKey;
  },
  alt: function alt(e) {
    return !e.altKey;
  },
  meta: function meta(e) {
    return !e.metaKey;
  },
  left: function left(e) {
    return 'button' in e && e.button !== 0;
  },
  middle: function middle(e) {
    return 'button' in e && e.button !== 1;
  },
  right: function right(e) {
    return 'button' in e && e.button !== 2;
  },
  exact: function exact(e, modifiers) {
    return systemModifiers.some(function (m) {
      return e["".concat(m, "Key")] && !modifiers.includes(m);
    });
  }
};
/**
 * @private
 */

var withModifiers = function withModifiers(fn, modifiers) {
  return function (event) {
    for (var i = 0; i < modifiers.length; i++) {
      var guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }

    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key23 = 1; _key23 < _len10; _key23++) {
      args[_key23 - 1] = arguments[_key23];
    }

    return fn.apply(void 0, [event].concat(args));
  };
}; // Kept for 2.x compat.
// Note: IE11 compat for `spacebar` and `del` is removed for now.


var keyNames = {
  esc: 'escape',
  space: ' ',
  up: 'arrow-up',
  left: 'arrow-left',
  right: 'arrow-right',
  down: 'arrow-down',
  delete: 'backspace'
};
/**
 * @private
 */

var withKeys = function withKeys(fn, modifiers) {
  return function (event) {
    if (!('key' in event)) return;
    var eventKey = hyphenate(event.key);

    if ( // None of the provided key modifiers match the current event key
    !modifiers.some(function (k) {
      return k === eventKey || keyNames[k] === eventKey;
    })) {
      return;
    }

    return fn(event);
  };
};

var vShow = {
  beforeMount: function beforeMount(el, _ref40, _ref41) {
    var value = _ref40.value;
    var transition = _ref41.transition;
    el._vod = el.style.display === 'none' ? '' : el.style.display;

    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted: function mounted(el, _ref42, _ref43) {
    var value = _ref42.value;
    var transition = _ref43.transition;

    if (transition && value) {
      transition.enter(el);
    }
  },
  updated: function updated(el, _ref44, _ref45) {
    var value = _ref44.value,
        oldValue = _ref44.oldValue;
    var transition = _ref45.transition;
    if (!value === !oldValue) return;

    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, function () {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount: function beforeUnmount(el, _ref46) {
    var value = _ref46.value;
    setDisplay(el, value);
  }
};

function setDisplay(el, value) {
  el.style.display = value ? el._vod : 'none';
}

var rendererOptions = extend({
  patchProp: patchProp,
  forcePatchProp: forcePatchProp
}, nodeOps); // lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.

var renderer;
var enabledHydration = false;

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}

function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : createHydrationRenderer(rendererOptions);
  enabledHydration = true;
  return renderer;
} // use explicit type casts here to avoid import() calls in rolled-up d.ts


var render = function render() {
  var _ensureRenderer;

  (_ensureRenderer = ensureRenderer()).render.apply(_ensureRenderer, arguments);
};

var hydrate = function hydrate() {
  var _ensureHydrationRende;

  (_ensureHydrationRende = ensureHydrationRenderer()).hydrate.apply(_ensureHydrationRende, arguments);
};

var createApp = function createApp() {
  var _ensureRenderer2;

  var app = (_ensureRenderer2 = ensureRenderer()).createApp.apply(_ensureRenderer2, arguments);

  {
    injectNativeTagCheck(app);
  }
  var mount = app.mount;

  app.mount = function (containerOrSelector) {
    var container = normalizeContainer(containerOrSelector);
    if (!container) return;
    var component = app._component;

    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    } // clear content before mounting


    container.innerHTML = '';
    var proxy = mount(container);
    container.removeAttribute('v-cloak');
    return proxy;
  };

  return app;
};

exports.createApp = createApp;

var createSSRApp = function createSSRApp() {
  var _ensureHydrationRende2;

  var app = (_ensureHydrationRende2 = ensureHydrationRenderer()).createApp.apply(_ensureHydrationRende2, arguments);

  {
    injectNativeTagCheck(app);
  }
  var mount = app.mount;

  app.mount = function (containerOrSelector) {
    var container = normalizeContainer(containerOrSelector);

    if (container) {
      return mount(container, true);
    }
  };

  return app;
};

function injectNativeTagCheck(app) {
  // Inject `isNativeTag`
  // this is used for component name validation (dev only)
  Object.defineProperty(app.config, 'isNativeTag', {
    value: function value(tag) {
      return isHTMLTag(tag) || isSVGTag(tag);
    },
    writable: false
  });
}

function normalizeContainer(container) {
  if (isString(container)) {
    var res = document.querySelector(container);

    if (!res) {
      warn("Failed to mount app: mount target selector returned null.");
    }

    return res;
  }

  return container;
} // This entry is the "full-build" that includes both the runtime


var compileCache = Object.create(null);

function compileToFunction(template, options) {
  if (!isString(template)) {
    if (template.nodeType) {
      template = template.innerHTML;
    } else {
      warn("invalid template option: ", template);
      return NOOP;
    }
  }

  var key = template;
  var cached = compileCache[key];

  if (cached) {
    return cached;
  }

  if (template[0] === '#') {
    var el = document.querySelector(template);

    if (!el) {
      warn("Template element not found or is empty: ".concat(template));
    } // __UNSAFE__
    // Reason: potential execution of JS expressions in in-DOM template.
    // The user must make sure the in-DOM template is trusted. If it's rendered
    // by the server, the template should not contain any user data.


    template = el ? el.innerHTML : "";
  }

  var _compile2 = compile(template, extend({
    hoistStatic: true,
    onError: function onError(err) {
      {
        var message = "Template compilation error: ".concat(err.message);
        var codeFrame = err.loc && generateCodeFrame(template, err.loc.start.offset, err.loc.end.offset);
        warn(codeFrame ? "".concat(message, "\n").concat(codeFrame) : message);
      }
    }
  }, options)),
      code = _compile2.code; // The wildcard import results in a huge object with every export
  // with keys that cannot be mangled, and can be quite heavy size-wise.
  // In the global build we know `Vue` is available globally so we can avoid
  // the wildcard object.


  var render = new Function(code)();
  return compileCache[key] = render;
}

registerRuntimeCompiler(compileToFunction); //   exports.BaseTransition = BaseTransition;
//   exports.Comment = Comment;
//   exports.Fragment = Fragment;
//   exports.KeepAlive = KeepAlive;
//   exports.Static = Static;
//   exports.Suspense = Suspense;
//   exports.Teleport = Teleport;
//   exports.Text = Text;
//   exports.Transition = Transition;
//   exports.TransitionGroup = TransitionGroup;
//   exports.callWithAsyncErrorHandling = callWithAsyncErrorHandling;
//   exports.callWithErrorHandling = callWithErrorHandling;
//   exports.camelize = _camelize;
//   exports.cloneVNode = cloneVNode;
//   exports.compile = compileToFunction;
//   exports.computed = computed$1;
//   exports.createApp = createApp;
//   exports.createBlock = createBlock;
//   exports.createCommentVNode = createCommentVNode;
//   exports.createHydrationRenderer = createHydrationRenderer;
//   exports.createRenderer = createRenderer;
//   exports.createSSRApp = createSSRApp;
//   exports.createSlots = createSlots;
//   exports.createStaticVNode = createStaticVNode;
//   exports.createTextVNode = createTextVNode;
//   exports.createVNode = createVNode;
//   exports.customRef = customRef;
//   exports.defineAsyncComponent = defineAsyncComponent;
//   exports.defineComponent = defineComponent;
//   exports.getCurrentInstance = getCurrentInstance;
//   exports.getTransitionRawChildren = getTransitionRawChildren;
//   exports.h = h;
//   exports.handleError = handleError;
//   exports.hydrate = hydrate;
//   exports.inject = inject;
//   exports.isProxy = isProxy;
//   exports.isReactive = isReactive;
//   exports.isReadonly = isReadonly;
//   exports.isRef = isRef;
//   exports.isVNode = isVNode;
//   exports.markRaw = markRaw;
//   exports.mergeProps = mergeProps;
//   exports.nextTick = nextTick;
//   exports.onActivated = onActivated;
//   exports.onBeforeMount = onBeforeMount;
//   exports.onBeforeUnmount = onBeforeUnmount;
//   exports.onBeforeUpdate = onBeforeUpdate;
//   exports.onDeactivated = onDeactivated;
//   exports.onErrorCaptured = onErrorCaptured;
//   exports.onMounted = onMounted;
//   exports.onRenderTracked = onRenderTracked;
//   exports.onRenderTriggered = onRenderTriggered;
//   exports.onUnmounted = onUnmounted;
//   exports.onUpdated = onUpdated;
//   exports.openBlock = openBlock;
//   exports.popScopeId = popScopeId;
//   exports.provide = provide;
//   exports.pushScopeId = pushScopeId;
//   exports.queuePostFlushCb = queuePostFlushCb;
//   exports.reactive = reactive;
//   exports.readonly = readonly;
//   exports.ref = ref;
//   exports.registerRuntimeCompiler = registerRuntimeCompiler;
//   exports.render = render;
//   exports.renderList = renderList;
//   exports.renderSlot = renderSlot;
//   exports.resolveComponent = resolveComponent;
//   exports.resolveDirective = resolveDirective;
//   exports.resolveDynamicComponent = resolveDynamicComponent;
//   exports.resolveTransitionHooks = resolveTransitionHooks;
//   exports.setBlockTracking = setBlockTracking;
//   exports.setTransitionHooks = setTransitionHooks;
//   exports.shallowReactive = shallowReactive;
//   exports.shallowReadonly = shallowReadonly;
//   exports.shallowRef = shallowRef;
//   exports.ssrContextKey = ssrContextKey;
//   exports.ssrUtils = ssrUtils;
//   exports.toDisplayString = _toDisplayString;
//   exports.toHandlers = toHandlers;
//   exports.toRaw = toRaw;
//   exports.toRef = toRef;
//   exports.toRefs = toRefs;
//   exports.transformVNodeArgs = transformVNodeArgs;
//   exports.triggerRef = triggerRef;
//   exports.unref = unref;
//   exports.useCSSModule = useCSSModule;
//   exports.useSSRContext = useSSRContext;
//   exports.useTransitionState = useTransitionState;
//   exports.vModelCheckbox = vModelCheckbox;
//   exports.vModelDynamic = vModelDynamic;
//   exports.vModelRadio = vModelRadio;
//   exports.vModelSelect = vModelSelect;
//   exports.vModelText = vModelText;
//   exports.vShow = vShow;
//   exports.version = version;
//   exports.warn = warn;
//   exports.watch = watch;
//   exports.watchEffect = watchEffect;
//   exports.withCtx = withCtx;
//   exports.withDirectives = withDirectives;
//   exports.withKeys = withKeys;
//   exports.withModifiers = withModifiers;
//   exports.withScopeId = withScopeId;
},{}],"src/demo/reactive.js":[function(require,module,exports) {
"use strict";

var _vue = require("../vue3.js");

/* 
  场景 1
*/
var obj = (0, _vue.reactive)({
  x: 1
});
(0, _vue.effect)(function () {
  patch();
});
setTimeout(function () {
  obj.x = 2;
}, 1000);

function patch() {
  document.body.innerText = obj.x;
}
},{"../vue3.js":"src/vue3.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

require("./demo/reactive");
},{"./demo/reactive":"src/demo/reactive.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60173" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map