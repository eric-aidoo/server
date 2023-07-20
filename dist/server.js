var $bs03N$process = require("process");
var $bs03N$path = require("path");
var $bs03N$crypto = require("crypto");
var $bs03N$buffer = require("buffer");
var $bs03N$fs = require("fs");
var $bs03N$dotenv = require("dotenv");
var $bs03N$jsonwebtoken = require("jsonwebtoken");
var $bs03N$bcrypt = require("bcrypt");
var $bs03N$expressratelimit = require("express-rate-limit");
var $bs03N$mysql2promise = require("mysql2/promise");
var $bs03N$expressfileupload = require("express-fileupload");
var $bs03N$cookieparser = require("cookie-parser");
var $bs03N$compression = require("compression");
var $bs03N$helmet = require("helmet");
var $bs03N$express = require("express");
var $bs03N$nodemailer = require("nodemailer");
var $bs03N$memorycache = require("memory-cache");
var $bs03N$redis = require("redis");
var $bs03N$nodefetch = require("node-fetch");
var $bs03N$ejs = require("ejs");
var $bs03N$twilio = require("twilio");
var $bs03N$nodeipinfo = require("node-ipinfo");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire030d"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire030d"] = parcelRequire;
}
parcelRequire.register("er45j", function(module, exports) {

"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = $a826c173f4456cde$var$createApplication;

var $a826c173f4456cde$var$_path = $a826c173f4456cde$var$_interopRequireDefault($bs03N$path);

var $a826c173f4456cde$var$_crypto = $a826c173f4456cde$var$_interopRequireDefault($bs03N$crypto);

var $1FEE0 = parcelRequire("1FEE0");

var $a826c173f4456cde$var$_errorHandler = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("klb6R")));

var $a826c173f4456cde$var$_libraries = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("jf6CP")));

var $a826c173f4456cde$var$_rateLimiter = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("gtiJ0")));

var $a826c173f4456cde$var$_cors = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("9eZET")));

var $a826c173f4456cde$var$_handleUnidentifiedRoutes = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("iUES8")));

var $37rWr = parcelRequire("37rWr");

var $a826c173f4456cde$var$_asyncHandler = $a826c173f4456cde$var$_interopRequireDefault((parcelRequire("jdqHa")));
function $a826c173f4456cde$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $a826c173f4456cde$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $a826c173f4456cde$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $a826c173f4456cde$var$_typeof(obj);
}
function $a826c173f4456cde$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $a826c173f4456cde$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $a826c173f4456cde$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $a826c173f4456cde$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $a826c173f4456cde$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $a826c173f4456cde$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $a826c173f4456cde$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $a826c173f4456cde$var$createApplication(_x) {
    return $a826c173f4456cde$var$_createApplication.apply(this, arguments);
}
function $a826c173f4456cde$var$_createApplication() {
    $a826c173f4456cde$var$_createApplication = $a826c173f4456cde$var$_asyncToGenerator(/*#__PURE__*/ $a826c173f4456cde$var$_regeneratorRuntime().mark(function _callee2(webserver) {
        return $a826c173f4456cde$var$_regeneratorRuntime().wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    // const app = libraries.expressFramework();
                    (0, $37rWr.deactivateDebuggingInProductionMode)();
                    // These are security headers
                    webserver.disable("x-powered-by");
                    webserver.disable("server");
                    webserver.disable("etag");
                    webserver.disable("x-xss-protection");
                    webserver.set("x-dns-prefetch-control", "off");
                    webserver.use($a826c173f4456cde$var$_libraries["default"].helmet());
                    webserver.use($1FEE0.xFrameOptionMiddleware);
                    webserver.use($1FEE0.contentSecurityPolicyMiddleware);
                    webserver.use($1FEE0.expectCTMiddleware);
                    webserver.use($1FEE0.featurePolicyMiddleware);
                    webserver.use($a826c173f4456cde$var$_cors["default"]);
                    webserver.set("trust proxy", true);
                    // Other express middleware
                    webserver.use($a826c173f4456cde$var$_libraries["default"].expressFramework.urlencoded({
                        extended: true
                    }));
                    webserver.use($a826c173f4456cde$var$_libraries["default"].expressFramework.json({
                        limit: "50mb"
                    }));
                    webserver.use($a826c173f4456cde$var$_libraries["default"].compression());
                    webserver.use($a826c173f4456cde$var$_libraries["default"].cookieParser());
                    webserver.use($a826c173f4456cde$var$_libraries["default"].expressFramework["static"]($a826c173f4456cde$var$_path["default"].join($bs03N$process.cwd(), "src", "public")));
                    webserver.set("views", $a826c173f4456cde$var$_path["default"].join($bs03N$process.cwd(), "src", "views"));
                    webserver.use($a826c173f4456cde$var$_rateLimiter["default"]);
                    webserver.get("/", function(req, res) {
                        res.status(200).json({
                            success: true,
                            data: {
                                message: "Welcone to Credet payment APIs"
                            }
                        });
                    });
                    webserver.get("/ip", function(req, res) {
                        var ipAddress = req.ip;
                        res.send("Your IP address: ".concat(ipAddress));
                    });
                    webserver.get("/get-fingerprint", (0, $a826c173f4456cde$var$_asyncHandler["default"])(/*#__PURE__*/ function() {
                        var _ref = $a826c173f4456cde$var$_asyncToGenerator(/*#__PURE__*/ $a826c173f4456cde$var$_regeneratorRuntime().mark(function _callee(req, res) {
                            var fingerprint;
                            return $a826c173f4456cde$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                                while(true)switch(_context.prev = _context.next){
                                    case 0:
                                        _context.next = 2;
                                        return (0, $37rWr.generateFingerprint)(req);
                                    case 2:
                                        fingerprint = _context.sent;
                                        res.json({
                                            success: true,
                                            data: {
                                                fingerprint: fingerprint
                                            }
                                        });
                                    case 4:
                                    case "end":
                                        return _context.stop();
                                }
                            }, _callee);
                        }));
                        return function(_x2, _x3) {
                            return _ref.apply(this, arguments);
                        };
                    }()));
                    // Handle requests to unspecified routes
                    webserver.all("*", $a826c173f4456cde$var$_handleUnidentifiedRoutes["default"]);
                    webserver.use($a826c173f4456cde$var$_errorHandler["default"]);
                    return _context2.abrupt("return", webserver);
                case 26:
                case "end":
                    return _context2.stop();
            }
        }, _callee2);
    }));
    return $a826c173f4456cde$var$_createApplication.apply(this, arguments);
}

});
parcelRequire.register("1FEE0", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.xFrameOptionMiddleware = module.exports.featurePolicyMiddleware = module.exports.expectCTMiddleware = module.exports.contentSecurityPolicyMiddleware = void 0;

var $37rWr = parcelRequire("37rWr");
var $137925e66c03a6b2$var$xFrameOptionMiddleware = function xFrameOptionMiddleware(req, res, next) {
    res.setHeader("X-Frame-Options", "DENY");
    next();
};
module.exports.xFrameOptionMiddleware = $137925e66c03a6b2$var$xFrameOptionMiddleware;
var $137925e66c03a6b2$var$expectCTMiddleware = function expectCTMiddleware(req, res, next) {
    var TWENTY_FOUR_HRS = 86400;
    res.setHeader("Expect-CT", "enforce", "max-age=".concat(TWENTY_FOUR_HRS));
    next();
};
module.exports.expectCTMiddleware = $137925e66c03a6b2$var$expectCTMiddleware;
var $137925e66c03a6b2$var$contentSecurityPolicyMiddleware = function contentSecurityPolicyMiddleware(req, res, next) {
    var nonce = (0, $37rWr.generateToken)({
        lengthOfToken: 130
    });
    res.setHeader("Content-Security-Policy", "script-src 'self' 'nonce-".concat(nonce, "'"));
    res.locals.nonce = nonce;
    next();
};
module.exports.contentSecurityPolicyMiddleware = $137925e66c03a6b2$var$contentSecurityPolicyMiddleware;
var $137925e66c03a6b2$var$featurePolicyMiddleware = function featurePolicyMiddleware(req, res, next) {
    var unallowedFeatures = "accelerometer 'none'; microphone 'none'; usb 'none';";
    res.setHeader("Feature-Policy", unallowedFeatures);
    next();
};
module.exports.featurePolicyMiddleware = $137925e66c03a6b2$var$featurePolicyMiddleware;

});
parcelRequire.register("37rWr", function(module, exports) {


var $2457b32e9bfe73d7$require$Buffer = $bs03N$buffer.Buffer;
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.capitalize = $2457b32e9bfe73d7$var$capitalize;
module.exports.compareHash = $2457b32e9bfe73d7$var$compareHash;
module.exports.createAuditTrail = $2457b32e9bfe73d7$var$createAuditTrail;
module.exports.deactivateDebuggingInProductionMode = $2457b32e9bfe73d7$var$deactivateDebuggingInProductionMode;
module.exports.decrypt = $2457b32e9bfe73d7$var$decrypt;
module.exports.deleteCookie = $2457b32e9bfe73d7$var$deleteCookie;
module.exports.determineIdentityDocumentIssuer = $2457b32e9bfe73d7$var$determineIdentityDocumentIssuer;
module.exports.determineIdentityDocumentType = $2457b32e9bfe73d7$var$determineIdentityDocumentType;
module.exports.encrypt = $2457b32e9bfe73d7$var$encrypt;
module.exports.expressWrapper = $2457b32e9bfe73d7$var$expressWrapper;
module.exports.generateAccessToken = $2457b32e9bfe73d7$var$generateAccessToken;
module.exports.generateFingerprint = $2457b32e9bfe73d7$var$generateFingerprint;
module.exports.generateHash = $2457b32e9bfe73d7$var$generateHash;
module.exports.generateOtpCode = $2457b32e9bfe73d7$var$generateOtpCode;
module.exports.generatePasswordResetLink = $2457b32e9bfe73d7$var$generatePasswordResetLink;
module.exports.generateRefreshToken = $2457b32e9bfe73d7$var$generateRefreshToken;
module.exports.generateToken = $2457b32e9bfe73d7$var$generateToken;
module.exports.getBearerToken = $2457b32e9bfe73d7$var$getBearerToken;
module.exports.loadEmailTemplates = $2457b32e9bfe73d7$var$loadEmailTemplates;
module.exports.loadSqlQueries = $2457b32e9bfe73d7$var$loadSqlQueries;
module.exports.reformatResponse = $2457b32e9bfe73d7$var$reformatResponse;
module.exports.replaceHtmlPlaceholdersWithDynamicValues = $2457b32e9bfe73d7$var$replaceHtmlPlaceholdersWithDynamicValues;
module.exports.sanitize = void 0;
module.exports.sendEmail = $2457b32e9bfe73d7$var$sendEmail;
module.exports.serviceableCountries = void 0;
module.exports.setCookie = $2457b32e9bfe73d7$var$setCookie;
module.exports.standardizeDate = $2457b32e9bfe73d7$var$standardizeDate;
module.exports.validateParams = $2457b32e9bfe73d7$var$validateParams;
module.exports.verifyPasswordResetLinkToken = $2457b32e9bfe73d7$var$verifyPasswordResetLinkToken;
module.exports.verifyRefreshToken = $2457b32e9bfe73d7$var$verifyRefreshToken;

var $2457b32e9bfe73d7$var$_crypto = $2457b32e9bfe73d7$var$_interopRequireDefault($bs03N$crypto);

var $2457b32e9bfe73d7$var$_fs = $2457b32e9bfe73d7$var$_interopRequireWildcard($bs03N$fs);

var $2457b32e9bfe73d7$var$_path = $2457b32e9bfe73d7$var$_interopRequireDefault($bs03N$path);

var $2457b32e9bfe73d7$var$_appConfig = $2457b32e9bfe73d7$var$_interopRequireDefault((parcelRequire("avFDW")));

var $2457b32e9bfe73d7$var$_libraries = $2457b32e9bfe73d7$var$_interopRequireDefault((parcelRequire("jf6CP")));

var $k70SB = parcelRequire("k70SB");
function $2457b32e9bfe73d7$var$_getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return ($2457b32e9bfe73d7$var$_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function $2457b32e9bfe73d7$var$_interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || $2457b32e9bfe73d7$var$_typeof(obj) !== "object" && typeof obj !== "function") return {
        "default": obj
    };
    var cache = $2457b32e9bfe73d7$var$_getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj["default"] = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
function $2457b32e9bfe73d7$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $2457b32e9bfe73d7$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $2457b32e9bfe73d7$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $2457b32e9bfe73d7$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $2457b32e9bfe73d7$var$_createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = $2457b32e9bfe73d7$var$_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {};
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e2) {
                    throw _e2;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e3) {
            didErr = true;
            err = _e3;
        },
        f: function f() {
            try {
                if (!normalCompletion && it["return"] != null) it["return"]();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function $2457b32e9bfe73d7$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $2457b32e9bfe73d7$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $2457b32e9bfe73d7$var$_typeof(obj);
}
function $2457b32e9bfe73d7$var$_slicedToArray(arr, i) {
    return $2457b32e9bfe73d7$var$_arrayWithHoles(arr) || $2457b32e9bfe73d7$var$_iterableToArrayLimit(arr, i) || $2457b32e9bfe73d7$var$_unsupportedIterableToArray(arr, i) || $2457b32e9bfe73d7$var$_nonIterableRest();
}
function $2457b32e9bfe73d7$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $2457b32e9bfe73d7$var$_iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            _d = !0, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
function $2457b32e9bfe73d7$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $2457b32e9bfe73d7$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function $2457b32e9bfe73d7$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? $2457b32e9bfe73d7$var$ownKeys(Object(source), !0).forEach(function(key) {
            $2457b32e9bfe73d7$var$_defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : $2457b32e9bfe73d7$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $2457b32e9bfe73d7$var$_defineProperty(obj, key, value) {
    key = $2457b32e9bfe73d7$var$_toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $2457b32e9bfe73d7$var$_toPropertyKey(arg) {
    var key = $2457b32e9bfe73d7$var$_toPrimitive(arg, "string");
    return $2457b32e9bfe73d7$var$_typeof(key) === "symbol" ? key : String(key);
}
function $2457b32e9bfe73d7$var$_toPrimitive(input, hint) {
    if ($2457b32e9bfe73d7$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($2457b32e9bfe73d7$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $2457b32e9bfe73d7$var$_toConsumableArray(arr) {
    return $2457b32e9bfe73d7$var$_arrayWithoutHoles(arr) || $2457b32e9bfe73d7$var$_iterableToArray(arr) || $2457b32e9bfe73d7$var$_unsupportedIterableToArray(arr) || $2457b32e9bfe73d7$var$_nonIterableSpread();
}
function $2457b32e9bfe73d7$var$_nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $2457b32e9bfe73d7$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $2457b32e9bfe73d7$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $2457b32e9bfe73d7$var$_arrayLikeToArray(o, minLen);
}
function $2457b32e9bfe73d7$var$_iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function $2457b32e9bfe73d7$var$_arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return $2457b32e9bfe73d7$var$_arrayLikeToArray(arr);
}
function $2457b32e9bfe73d7$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $2457b32e9bfe73d7$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $2457b32e9bfe73d7$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $2457b32e9bfe73d7$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $2457b32e9bfe73d7$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $2457b32e9bfe73d7$var$generateToken(_ref) {
    var lengthOfToken = _ref.lengthOfToken;
    var cryptoGeneratedString = $2457b32e9bfe73d7$var$_crypto["default"].randomBytes(22).toString("hex");
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".concat(cryptoGeneratedString);
    var len = characters.length;
    var token = "";
    for(var i = 0; i < lengthOfToken; i++)token += characters.charAt(Math.floor(Math.random() * len));
    return token;
}
function $2457b32e9bfe73d7$var$generateOtpCode() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digits = "0123456789";
    var firstChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    var remainingDigits = "";
    for(var i = 0; i < 4; i++)remainingDigits += digits.charAt(Math.floor(Math.random() * digits.length));
    var otpCode = "".concat(firstChar, "-").concat(remainingDigits);
    return otpCode;
}
function $2457b32e9bfe73d7$var$loadSqlQueries(_x) {
    return $2457b32e9bfe73d7$var$_loadSqlQueries.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$_loadSqlQueries() {
    $2457b32e9bfe73d7$var$_loadSqlQueries = $2457b32e9bfe73d7$var$_asyncToGenerator(/*#__PURE__*/ $2457b32e9bfe73d7$var$_regeneratorRuntime().mark(function _callee(_ref2) {
        var sqlFolder, filePath, files, sqlFiles, queries, _iterator, _step, sqlFile, query;
        return $2457b32e9bfe73d7$var$_regeneratorRuntime().wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    sqlFolder = _ref2.sqlFolder;
                    filePath = $2457b32e9bfe73d7$var$_path["default"].join($bs03N$process.cwd(), "src", sqlFolder);
                    _context.next = 4;
                    return $2457b32e9bfe73d7$var$_fs.promises.readdir(filePath, {
                        withFileTypes: true
                    });
                case 4:
                    files = _context.sent;
                    sqlFiles = files.filter(function(f) {
                        return f.isFile() && f.name.endsWith(".sql");
                    }).map(function(f) {
                        return f.name;
                    });
                    queries = {};
                    _iterator = $2457b32e9bfe73d7$var$_createForOfIteratorHelper(sqlFiles);
                    _context.prev = 8;
                    _iterator.s();
                case 10:
                    if ((_step = _iterator.n()).done) {
                        _context.next = 18;
                        break;
                    }
                    sqlFile = _step.value;
                    _context.next = 14;
                    return $2457b32e9bfe73d7$var$_fs.promises.readFile($2457b32e9bfe73d7$var$_path["default"].join(filePath, sqlFile), {
                        encoding: "utf-8"
                    });
                case 14:
                    query = _context.sent;
                    queries[sqlFile.replace(".sql", "")] = query;
                case 16:
                    _context.next = 10;
                    break;
                case 18:
                    _context.next = 23;
                    break;
                case 20:
                    _context.prev = 20;
                    _context.t0 = _context["catch"](8);
                    _iterator.e(_context.t0);
                case 23:
                    _context.prev = 23;
                    _iterator.f();
                    return _context.finish(23);
                case 26:
                    return _context.abrupt("return", queries);
                case 27:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                8,
                20,
                23,
                26
            ]
        ]);
    }));
    return $2457b32e9bfe73d7$var$_loadSqlQueries.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$loadEmailTemplates(_x2) {
    return $2457b32e9bfe73d7$var$_loadEmailTemplates.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$_loadEmailTemplates() {
    $2457b32e9bfe73d7$var$_loadEmailTemplates = $2457b32e9bfe73d7$var$_asyncToGenerator(/*#__PURE__*/ $2457b32e9bfe73d7$var$_regeneratorRuntime().mark(function _callee2(_ref3) {
        var templatesFolder, filePath, files, htmlFiles, templates, _iterator2, _step2, htmlFile, query;
        return $2457b32e9bfe73d7$var$_regeneratorRuntime().wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    templatesFolder = _ref3.templatesFolder;
                    filePath = $2457b32e9bfe73d7$var$_path["default"].join($bs03N$process.cwd(), "src", templatesFolder);
                    _context2.next = 4;
                    return $2457b32e9bfe73d7$var$_fs.promises.readdir(filePath, {
                        withFileTypes: true
                    });
                case 4:
                    files = _context2.sent;
                    htmlFiles = files.filter(function(f) {
                        return f.isFile() && f.name.endsWith(".html");
                    }).map(function(f) {
                        return f.name;
                    });
                    templates = {};
                    _iterator2 = $2457b32e9bfe73d7$var$_createForOfIteratorHelper(htmlFiles);
                    _context2.prev = 8;
                    _iterator2.s();
                case 10:
                    if ((_step2 = _iterator2.n()).done) {
                        _context2.next = 18;
                        break;
                    }
                    htmlFile = _step2.value;
                    _context2.next = 14;
                    return $2457b32e9bfe73d7$var$_fs.promises.readFile($2457b32e9bfe73d7$var$_path["default"].join(filePath, htmlFile), {
                        encoding: "utf-8"
                    });
                case 14:
                    query = _context2.sent;
                    templates[htmlFile.replace(".html", "")] = query;
                case 16:
                    _context2.next = 10;
                    break;
                case 18:
                    _context2.next = 23;
                    break;
                case 20:
                    _context2.prev = 20;
                    _context2.t0 = _context2["catch"](8);
                    _iterator2.e(_context2.t0);
                case 23:
                    _context2.prev = 23;
                    _iterator2.f();
                    return _context2.finish(23);
                case 26:
                    return _context2.abrupt("return", templates);
                case 27:
                case "end":
                    return _context2.stop();
            }
        }, _callee2, null, [
            [
                8,
                20,
                23,
                26
            ]
        ]);
    }));
    return $2457b32e9bfe73d7$var$_loadEmailTemplates.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$createAuditTrail(_ref4) {
    var event = _ref4.event, description = _ref4.description, affectedTables = _ref4.affectedTables, trailedEntityId = _ref4.trailedEntityId, oldData = _ref4.oldData, newData = _ref4.newData;
    var auditTrail = Object.freeze({
        id: "trail_".concat($2457b32e9bfe73d7$var$generateToken({
            lengthOfToken: 26
        })),
        event: event,
        description: description,
        affectedTables: JSON.stringify(affectedTables),
        trailedEntityId: trailedEntityId,
        oldData: JSON.stringify(oldData),
        newData: JSON.stringify(newData),
        timestamp: new Date().toISOString()
    });
    return Object.values(auditTrail);
}
var $2457b32e9bfe73d7$var$serviceableCountries = /^(US)$/;
module.exports.serviceableCountries = $2457b32e9bfe73d7$var$serviceableCountries;
function $2457b32e9bfe73d7$var$capitalize(word) {
    if (!word) return null;
    var words = word.split(" ");
    var capitalizeWords = words.map(capitalizeFirstLetters);
    function capitalizeFirstLetters(element) {
        return element.charAt(0).toLocaleUpperCase() + element.slice(1).toLowerCase();
    }
    var capitalizedWord = capitalizeWords.join(" ");
    return capitalizedWord;
}
var $2457b32e9bfe73d7$var$sanitize = function sanitize(string) {
    if (!string) return null;
    var specialCharacters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
        "!": "&#x21;"
    };
    var regex = /[&<>"'`=!/]/gi;
    return string.replace(regex, function(match) {
        return specialCharacters[match];
    });
};
module.exports.sanitize = $2457b32e9bfe73d7$var$sanitize;
function $2457b32e9bfe73d7$var$generateHash(string) {
    try {
        if (!string) return null;
        var appIsInDevMode = $2457b32e9bfe73d7$var$_appConfig["default"].server.isInDevMode;
        if (appIsInDevMode) {
            var _salt = $2457b32e9bfe73d7$var$_libraries["default"].bcrypt.genSaltSync(10);
            var _hashedstring = $2457b32e9bfe73d7$var$_libraries["default"].bcrypt.hashSync(string, _salt);
            return _hashedstring;
        }
        var salt = $2457b32e9bfe73d7$var$_libraries["default"].bcrypt.genSaltSync(13);
        var hashedstring = $2457b32e9bfe73d7$var$_libraries["default"].bcrypt.hashSync(string, salt);
        return hashedstring;
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$compareHash(_x3, _x4) {
    return $2457b32e9bfe73d7$var$_compareHash.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$_compareHash() {
    $2457b32e9bfe73d7$var$_compareHash = $2457b32e9bfe73d7$var$_asyncToGenerator(/*#__PURE__*/ $2457b32e9bfe73d7$var$_regeneratorRuntime().mark(function _callee3(string, hashedString) {
        return $2457b32e9bfe73d7$var$_regeneratorRuntime().wrap(function _callee3$(_context3) {
            while(true)switch(_context3.prev = _context3.next){
                case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return $2457b32e9bfe73d7$var$_libraries["default"].bcrypt.compare(string, hashedString);
                case 3:
                    return _context3.abrupt("return", _context3.sent);
                case 6:
                    _context3.prev = 6;
                    _context3.t0 = _context3["catch"](0);
                    throw _context3.t0;
                case 9:
                case "end":
                    return _context3.stop();
            }
        }, _callee3, null, [
            [
                0,
                6
            ]
        ]);
    }));
    return $2457b32e9bfe73d7$var$_compareHash.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$standardizeDate(date) {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-CA");
}
function $2457b32e9bfe73d7$var$encrypt(data) {
    var encryptionAlgorithm = "aes-256-gcm";
    try {
        var secretKey = $2457b32e9bfe73d7$var$_appConfig["default"].encryption.secret;
        var iv = $2457b32e9bfe73d7$var$generateToken({
            lengthOfToken: 12
        });
        var encrypter = $2457b32e9bfe73d7$var$_crypto["default"].createCipheriv(encryptionAlgorithm, secretKey, iv);
        var encryptedData = encrypter.update(JSON.stringify(data), "utf8", "hex");
        encryptedData += encrypter["final"]("hex");
        var authTag = encrypter.getAuthTag().toString("hex");
        return "".concat(encryptedData, ".").concat(iv, ".").concat(authTag);
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$decrypt(encryptedData) {
    var encryptionAlgorithm = "aes-256-gcm";
    try {
        var secretKey = $2457b32e9bfe73d7$var$_appConfig["default"].encryption.secret;
        var encryptedMessage = encryptedData.split(".")[0];
        var iv = encryptedData.split(".")[1];
        var tag = $2457b32e9bfe73d7$require$Buffer.from(encryptedData.split(".")[2], "hex");
        var decrypter = $2457b32e9bfe73d7$var$_crypto["default"].createDecipheriv(encryptionAlgorithm, secretKey, iv);
        decrypter.setAuthTag(tag);
        var decryptedData = decrypter.update(encryptedMessage, "hex", "utf8");
        decryptedData += decrypter["final"]("utf8");
        return JSON.parse(decryptedData);
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$getBearerToken(authorizationHeader) {
    var authSchemeIsBearer = authorizationHeader.startsWith("Bearer ");
    if (!authSchemeIsBearer) throw new $k70SB.UnauthorizedError("Invalid authorization scheme");
    var bearerToken = authorizationHeader.split(" ")[1];
    if (!bearerToken || bearerToken.trim() === "") throw new $k70SB.UnauthorizedError("Authorization required");
    return bearerToken;
}
function $2457b32e9bfe73d7$var$generateAccessToken(username) {
    try {
        var payload = {};
        var options = {
            expiresIn: $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.accessTokenExpiration,
            issuer: $2457b32e9bfe73d7$var$_appConfig["default"].server.host,
            audience: username
        };
        var jwtAccessToken = $2457b32e9bfe73d7$var$_libraries["default"].jwt.sign(payload, $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.accessTokenSecret, options);
        return jwtAccessToken;
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$generateRefreshToken(username) {
    try {
        var payload = {};
        var options = {
            expiresIn: $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.refreshTokenExpiration,
            issuer: $2457b32e9bfe73d7$var$_appConfig["default"].server.host,
            audience: username
        };
        var refreshToken = $2457b32e9bfe73d7$var$_libraries["default"].jwt.sign(payload, $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.refreshTokenSecret, options);
        return refreshToken;
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$setCookie(_ref5) {
    var responseObject = _ref5.responseObject, cookieName = _ref5.cookieName, refreshToken = _ref5.refreshToken;
    responseObject.cookie(cookieName, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.cookieMaxAge,
        path: "/"
    });
}
function $2457b32e9bfe73d7$var$deleteCookie(_ref6) {
    var responseObject = _ref6.responseObject, cookieName = _ref6.cookieName;
    responseObject.clearCookie(cookieName, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });
}
function $2457b32e9bfe73d7$var$verifyRefreshToken(refreshToken) {
    return new Promise(function(resolve, reject) {
        $2457b32e9bfe73d7$var$_libraries["default"].jwt.verify(refreshToken, $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.refreshTokenSecret, function(error, payload) {
            if (error) reject(new $k70SB.ForbiddenError("Your request was denied"));
            else {
                var username = payload.aud;
                resolve(username);
            }
        });
    });
}
function $2457b32e9bfe73d7$var$generatePasswordResetLink(_ref7) {
    var email = _ref7.email, username = _ref7.username, password = _ref7.password;
    try {
        var secret = $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.passwordResetLinkSecret + password;
        var payload = {
            email: email,
            id: username
        };
        var options = {
            expiresIn: $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.accessTokenExpiration,
            issuer: $2457b32e9bfe73d7$var$_appConfig["default"].server.host,
            audience: username
        };
        var token = $2457b32e9bfe73d7$var$_libraries["default"].jwt.sign(payload, secret, options);
        var passwordResetLink = "".concat($2457b32e9bfe73d7$var$_appConfig["default"].server.host, "/user/reset-password/").concat(username, "/").concat(token);
        return passwordResetLink;
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$verifyPasswordResetLinkToken(_ref8) {
    var password = _ref8.password, extractedToken = _ref8.extractedToken;
    try {
        var secret = $2457b32e9bfe73d7$var$_appConfig["default"].oAuth.passwordResetLinkSecret + password;
        $2457b32e9bfe73d7$var$_libraries["default"].jwt.verify(extractedToken, secret, function(error, payload) {
            if (error) throw new $k70SB.UnauthorizedError("Your password reset link has expired or is no longer valid");
            var id = payload.aud;
            return id;
        });
    } catch (error) {
        throw error;
    }
}
function $2457b32e9bfe73d7$var$expressWrapper(server) {
    return {
        route: function route(routeObjects) {
            routeObjects.forEach(function(routeObject) {
                var method = routeObject.method.toLowerCase();
                var path = routeObject.path;
                var middleware = routeObject.middleware || [];
                var controller = routeObject.controller;
                server[method].apply(server, [
                    path
                ].concat($2457b32e9bfe73d7$var$_toConsumableArray(middleware), [
                    controller
                ]));
            });
        }
    };
}
function $2457b32e9bfe73d7$var$deactivateDebuggingInProductionMode() {
    if (!$2457b32e9bfe73d7$var$_appConfig["default"].server.isInDevMode) console.log = function() {};
}
function $2457b32e9bfe73d7$var$determineIdentityDocumentIssuer(country, documentType) {
    if (!country || !documentType) return null;
    var isUSAndDocumentTypeIsSSN = country === "US" && documentType === "SSN";
    if (isUSAndDocumentTypeIsSSN) return "Social Security Administration";
    var isUSAndDocumentTypeIsEIN = country === "US" && documentType === "EIN";
    if (isUSAndDocumentTypeIsEIN) return "Internal Revenue Service";
    var isGhanaAndDocumentTypeIsEcowasCard = country === "GH" && documentType === "GHANA CARD" || documentType === "ECOWAS CARD" || documentType === "GHANA (ECOWAS) CARD";
    if (isGhanaAndDocumentTypeIsEcowasCard) return "National Identification Authority";
    return null;
}
function $2457b32e9bfe73d7$var$determineIdentityDocumentType(country) {
    var documentType = country === "US" ? "SSN" : country === "GH" ? "GHANA_CARD" : "UNKNOWN";
    return documentType;
}
function $2457b32e9bfe73d7$var$replaceHtmlPlaceholdersWithDynamicValues(_ref9) {
    var html = _ref9.html, context = _ref9.context;
    if (!context || Object.keys(context).length === 0) return html;
    var result = html;
    for(var key in context){
        var placeholder = "{{".concat(key, "}}");
        var value = context[key];
        result = result.replace(new RegExp(placeholder, "g"), value);
    }
    return result;
}
function $2457b32e9bfe73d7$var$sendEmail(_x5) {
    return $2457b32e9bfe73d7$var$_sendEmail.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$_sendEmail() {
    $2457b32e9bfe73d7$var$_sendEmail = $2457b32e9bfe73d7$var$_asyncToGenerator(/*#__PURE__*/ $2457b32e9bfe73d7$var$_regeneratorRuntime().mark(function _callee4(_ref10) {
        var recipient, template, subject, dynamicValues, emailTransporter, emailTemplate, mail;
        return $2457b32e9bfe73d7$var$_regeneratorRuntime().wrap(function _callee4$(_context4) {
            while(true)switch(_context4.prev = _context4.next){
                case 0:
                    recipient = _ref10.recipient, template = _ref10.template, subject = _ref10.subject, dynamicValues = _ref10.dynamicValues;
                    _context4.prev = 1;
                    emailTransporter = $2457b32e9bfe73d7$var$_libraries["default"].nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: $2457b32e9bfe73d7$var$_appConfig["default"].emailAuthentication.user,
                            pass: $2457b32e9bfe73d7$var$_appConfig["default"].emailAuthentication.password
                        }
                    });
                    emailTemplate = $2457b32e9bfe73d7$var$replaceHtmlPlaceholdersWithDynamicValues({
                        html: template,
                        context: dynamicValues
                    });
                    mail = {
                        from: $2457b32e9bfe73d7$var$_appConfig["default"].emailAuthentication.user,
                        to: recipient,
                        subject: subject,
                        html: emailTemplate
                    };
                    _context4.next = 7;
                    return emailTransporter.sendMail(mail);
                case 7:
                    return _context4.abrupt("return", _context4.sent);
                case 10:
                    _context4.prev = 10;
                    _context4.t0 = _context4["catch"](1);
                    throw _context4.t0;
                case 13:
                case "end":
                    return _context4.stop();
            }
        }, _callee4, null, [
            [
                1,
                10
            ]
        ]);
    }));
    return $2457b32e9bfe73d7$var$_sendEmail.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$reformatResponse(_ref11) {
    var originalResponse = _ref11.originalResponse, _ref11$unwantedProper = _ref11.unwantedProperties, unwantedProperties = _ref11$unwantedProper === void 0 ? [] : _ref11$unwantedProper, _ref11$propertiesToMo = _ref11.propertiesToModify, propertiesToModify = _ref11$propertiesToMo === void 0 ? {} : _ref11$propertiesToMo;
    var removeProperty = function removeProperty(obj, property) {
        var parts = property.split(".");
        var lastPart = parts.pop();
        var nestedObject = parts.reduce(function(nested, part) {
            return nested[part];
        }, obj);
        if (nestedObject && nestedObject.hasOwnProperty(lastPart)) delete nestedObject[lastPart];
    };
    var modifyProperty = function modifyProperty(obj, property, newValue) {
        var parts = property.split(".");
        var lastPart = parts.pop();
        var nestedObject = parts.reduce(function(nested, part) {
            return nested[part];
        }, obj);
        if (nestedObject && nestedObject.hasOwnProperty(lastPart)) nestedObject[lastPart] = newValue;
        else {
            // Add the property to the nested object if it doesn't exist
            var parentObject = parts.reduce(function(nested, part) {
                if (!nested.hasOwnProperty(part)) nested[part] = {};
                return nested[part];
            }, obj);
            parentObject[lastPart] = newValue;
        }
    };
    var modifiedResponse = $2457b32e9bfe73d7$var$_objectSpread({}, originalResponse);
    unwantedProperties.forEach(function(property) {
        removeProperty(modifiedResponse, property);
    });
    Object.entries(propertiesToModify).forEach(function(_ref12) {
        var _ref13 = $2457b32e9bfe73d7$var$_slicedToArray(_ref12, 2), property = _ref13[0], newValue = _ref13[1];
        modifyProperty(modifiedResponse, property, newValue);
    });
    return modifiedResponse;
}
function $2457b32e9bfe73d7$var$validateParams(requiredParams, providedParams) {
    if ($2457b32e9bfe73d7$var$_typeof(requiredParams) !== "object" && $2457b32e9bfe73d7$var$_typeof(providedParams) !== "object") return false;
    for(var key in requiredParams){
        if (!(key in providedParams)) return false;
        var requiredType = requiredParams[key];
        var providedValue = providedParams[key];
        if ($2457b32e9bfe73d7$var$_typeof(providedValue) !== requiredType) return false;
    }
    return true;
}
function $2457b32e9bfe73d7$var$generateFingerprint(_x6) {
    return $2457b32e9bfe73d7$var$_generateFingerprint.apply(this, arguments);
}
function $2457b32e9bfe73d7$var$_generateFingerprint() {
    $2457b32e9bfe73d7$var$_generateFingerprint = $2457b32e9bfe73d7$var$_asyncToGenerator(/*#__PURE__*/ $2457b32e9bfe73d7$var$_regeneratorRuntime().mark(function _callee5(request) {
        var TEN_SECONDS_TIMEOUT, ipScanner, ipAddress, geolocation, userlocation, deviceId, language, requestTrail, fingerprint;
        return $2457b32e9bfe73d7$var$_regeneratorRuntime().wrap(function _callee5$(_context5) {
            while(true)switch(_context5.prev = _context5.next){
                case 0:
                    TEN_SECONDS_TIMEOUT = 10000;
                    ipScanner = new $2457b32e9bfe73d7$var$_libraries["default"].IPinfoWrapper($2457b32e9bfe73d7$var$_appConfig["default"].ipInfo.accessToken, null, TEN_SECONDS_TIMEOUT);
                    ipAddress = request.ip;
                    _context5.next = 5;
                    return ipScanner.lookupIp(ipAddress);
                case 5:
                    geolocation = _context5.sent;
                    userlocation = {
                        ip: geolocation.ip,
                        hostname: geolocation.hostname,
                        city: geolocation.city,
                        state: geolocation.region,
                        country: geolocation.country,
                        loc: geolocation.loc,
                        zipCode: geolocation.postal,
                        timezone: geolocation.timezone
                    };
                    deviceId = request.headers["user-agent"];
                    language = request.acceptsLanguages().join("");
                    requestTrail = "".concat(deviceId).concat(ipAddress).concat(language).concat(userlocation);
                    fingerprint = $2457b32e9bfe73d7$var$_libraries["default"].crypto.createHash("sha256").update(requestTrail).digest("hex");
                    return _context5.abrupt("return", fingerprint);
                case 12:
                case "end":
                    return _context5.stop();
            }
        }, _callee5);
    }));
    return $2457b32e9bfe73d7$var$_generateFingerprint.apply(this, arguments);
}

});
parcelRequire.register("avFDW", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $7a6d1a18327a6bd0$var$_libraries = $7a6d1a18327a6bd0$var$_interopRequireDefault((parcelRequire("jf6CP")));
function $7a6d1a18327a6bd0$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
$7a6d1a18327a6bd0$var$_libraries["default"].dotenv.config();
var $7a6d1a18327a6bd0$var$ONE_DAY = 86400000;
var $7a6d1a18327a6bd0$var$THIRTY_SECONDS = 30000;
var $7a6d1a18327a6bd0$var$TEN_SECONDS = 10;
var $7a6d1a18327a6bd0$var$THREE_MINUTES = 180000;
var $7a6d1a18327a6bd0$var$FIVE_SECONDS = 5000;
var $7a6d1a18327a6bd0$var$FIFTEEN_MINUTES = Date.now() + 900000;
var $7a6d1a18327a6bd0$var$config = {
    mysql: {
        developmentDb: {
            host: "127.0.0.1",
            user: "root",
            password: "engineering@credet",
            database: "payment_system",
            waitForConnections: true,
            connectionLimit: 3,
            queueLimit: 0
        },
        productionDb: 'mysql://a75c61qju70wqus67l1e:pscale_pw_5rfFIqc1QeLfq5pI32IXGEju11HvBOESwhh1oPZH2Ow@aws.connect.psdb.cloud/payment_system?ssl={"rejectUnauthorized":true}'
    },
    server: {
        host: "http://localhost:3200",
        port: "3200",
        environment: "development",
        isInDevMode: true
    },
    oAuth: {
        refreshTokenSecret: "ref_tok_07O7ddMMa1AVbe162FaZcF3bb72enW6r0TeGfkbetfeLOrcBOnc6T791Fbb6cMN7b38790bvbHO3WyH0",
        accessTokenSecret: "acc_tok_EmKZTeYb778bek54Xa838Y874cmltEeSIHfayNxaCSC5fp9L5d0YAa5584bLda9Yc97R8C3bC05F0Wec",
        passwordResetLinkSecret: "pwd_rsl_07O7ddMMa1AVbe162FaZcF3epjxno4x4r0TeGfkbetfeLOrcBOnc6T791Fbb6cMN7b38790bvbHO3WyH0",
        accessTokenExpiration: "30s",
        // 15m
        refreshTokenExpiration: "5m",
        // 90d or 3 months
        cookieMaxAge: $7a6d1a18327a6bd0$var$TEN_SECONDS
    },
    encryption: {
        secret: "c03353e92566be31509df1c76f67ff39"
    },
    authentication: {
        loginRetryWindow: $7a6d1a18327a6bd0$var$THREE_MINUTES,
        loginAttemptsPerWindow: 5,
        verificationCodeExpiration: $7a6d1a18327a6bd0$var$FIFTEEN_MINUTES
    },
    emailAuthentication: {
        user: "lifeoferic1@gmail.com",
        password: "tnsgexeewaydczww"
    },
    sms: {
        twilio: {
            accountSid: "AC184df932526108753b4f03aceb276afd",
            authToken: undefined,
            sender: "+18449914018"
        }
    },
    api: {
        version: undefined,
        requests: {
            retryWindow: $7a6d1a18327a6bd0$var$FIVE_SECONDS,
            attemptsPerWindow: 5
        }
    },
    ipInfo: {
        accessToken: "158e647887a2ca"
    }
};
var $7a6d1a18327a6bd0$var$_default = $7a6d1a18327a6bd0$var$config;
module.exports["default"] = $7a6d1a18327a6bd0$var$_default;

});
parcelRequire.register("jf6CP", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $e0248eb079f2ec89$var$_dotenv = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$dotenv);

var $e0248eb079f2ec89$var$_jsonwebtoken = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$jsonwebtoken);

var $e0248eb079f2ec89$var$_bcrypt = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$bcrypt);

var $e0248eb079f2ec89$var$_expressRateLimit = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$expressratelimit);

var $e0248eb079f2ec89$var$_promise = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$mysql2promise);

var $e0248eb079f2ec89$var$_expressFileupload = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$expressfileupload);

var $e0248eb079f2ec89$var$_cookieParser = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$cookieparser);

var $e0248eb079f2ec89$var$_compression = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$compression);

var $e0248eb079f2ec89$var$_helmet = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$helmet);

var $e0248eb079f2ec89$var$_express = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$express);

var $e0248eb079f2ec89$var$_nodemailer = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$nodemailer);

var $e0248eb079f2ec89$var$_memoryCache = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$memorycache);

var $e0248eb079f2ec89$var$_redis = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$redis);

var $e0248eb079f2ec89$var$_nodeFetch = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$nodefetch);

var $e0248eb079f2ec89$var$_ejs = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$ejs);

var $e0248eb079f2ec89$var$_fs = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$fs);

var $e0248eb079f2ec89$var$_twilio = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$twilio);


var $e0248eb079f2ec89$var$_crypto = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$crypto);

var $e0248eb079f2ec89$var$_path = $e0248eb079f2ec89$var$_interopRequireDefault($bs03N$path);
function $e0248eb079f2ec89$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $e0248eb079f2ec89$var$libraries = {
    dotenv: $e0248eb079f2ec89$var$_dotenv["default"],
    bcrypt: $e0248eb079f2ec89$var$_bcrypt["default"],
    jwt: $e0248eb079f2ec89$var$_jsonwebtoken["default"],
    rateLimit: $e0248eb079f2ec89$var$_expressRateLimit["default"],
    mysql: $e0248eb079f2ec89$var$_promise["default"],
    fileUploader: $e0248eb079f2ec89$var$_expressFileupload["default"],
    cookieParser: $e0248eb079f2ec89$var$_cookieParser["default"],
    compression: $e0248eb079f2ec89$var$_compression["default"],
    helmet: $e0248eb079f2ec89$var$_helmet["default"],
    expressFramework: $e0248eb079f2ec89$var$_express["default"],
    nodemailer: $e0248eb079f2ec89$var$_nodemailer["default"],
    cache: $e0248eb079f2ec89$var$_memoryCache["default"],
    redis: $e0248eb079f2ec89$var$_redis["default"],
    fetch: $e0248eb079f2ec89$var$_nodeFetch["default"],
    ejs: $e0248eb079f2ec89$var$_ejs["default"],
    fs: $e0248eb079f2ec89$var$_fs["default"],
    twilio: $e0248eb079f2ec89$var$_twilio["default"],
    IPinfoWrapper: $bs03N$nodeipinfo.IPinfoWrapper,
    crypto: $e0248eb079f2ec89$var$_crypto["default"],
    path: $e0248eb079f2ec89$var$_path["default"]
};
var $e0248eb079f2ec89$var$_default = $e0248eb079f2ec89$var$libraries;
module.exports["default"] = $e0248eb079f2ec89$var$_default;

});


parcelRequire.register("k70SB", function(module, exports) {
"use strict";
function $ea4524c8302aff29$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $ea4524c8302aff29$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $ea4524c8302aff29$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.ValidationError = module.exports.UnauthorizedError = module.exports.TooManyRequestsError = module.exports.ServiceUnavailableError = module.exports.PayloadTooLargeError = module.exports.NotFoundError = module.exports.MissingFieldError = module.exports.InternalServerError = module.exports.ForbiddenError = module.exports.BadRequestError = module.exports.AlreadyExistsError = void 0;
function $ea4524c8302aff29$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, $ea4524c8302aff29$var$_toPropertyKey(descriptor.key), descriptor);
    }
}
function $ea4524c8302aff29$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $ea4524c8302aff29$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $ea4524c8302aff29$var$_defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor;
}
function $ea4524c8302aff29$var$_toPropertyKey(arg) {
    var key = $ea4524c8302aff29$var$_toPrimitive(arg, "string");
    return $ea4524c8302aff29$var$_typeof(key) === "symbol" ? key : String(key);
}
function $ea4524c8302aff29$var$_toPrimitive(input, hint) {
    if ($ea4524c8302aff29$var$_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if ($ea4524c8302aff29$var$_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}
function $ea4524c8302aff29$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $ea4524c8302aff29$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {
        writable: false
    });
    if (superClass) $ea4524c8302aff29$var$_setPrototypeOf(subClass, superClass);
}
function $ea4524c8302aff29$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $ea4524c8302aff29$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $ea4524c8302aff29$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $ea4524c8302aff29$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $ea4524c8302aff29$var$_possibleConstructorReturn(this, result);
    };
}
function $ea4524c8302aff29$var$_possibleConstructorReturn(self, call) {
    if (call && ($ea4524c8302aff29$var$_typeof(call) === "object" || typeof call === "function")) return call;
    else if (call !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
    return $ea4524c8302aff29$var$_assertThisInitialized(self);
}
function $ea4524c8302aff29$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $ea4524c8302aff29$var$_wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    $ea4524c8302aff29$var$_wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !$ea4524c8302aff29$var$_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return $ea4524c8302aff29$var$_construct(Class, arguments, $ea4524c8302aff29$var$_getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return $ea4524c8302aff29$var$_setPrototypeOf(Wrapper, Class);
    };
    return $ea4524c8302aff29$var$_wrapNativeSuper(Class);
}
function $ea4524c8302aff29$var$_construct(Parent, args, Class) {
    if ($ea4524c8302aff29$var$_isNativeReflectConstruct()) $ea4524c8302aff29$var$_construct = Reflect.construct.bind();
    else $ea4524c8302aff29$var$_construct = function _construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) $ea4524c8302aff29$var$_setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return $ea4524c8302aff29$var$_construct.apply(null, arguments);
}
function $ea4524c8302aff29$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function $ea4524c8302aff29$var$_isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function $ea4524c8302aff29$var$_setPrototypeOf(o, p) {
    $ea4524c8302aff29$var$_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $ea4524c8302aff29$var$_setPrototypeOf(o, p);
}
function $ea4524c8302aff29$var$_getPrototypeOf(o) {
    $ea4524c8302aff29$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $ea4524c8302aff29$var$_getPrototypeOf(o);
}
var $ea4524c8302aff29$var$BadRequestError = /*#__PURE__*/ function(_Error) {
    $ea4524c8302aff29$var$_inherits(BadRequestError, _Error);
    var _super = $ea4524c8302aff29$var$_createSuper(BadRequestError);
    function BadRequestError(message) {
        var _this;
        $ea4524c8302aff29$var$_classCallCheck(this, BadRequestError);
        _this = _super.call(this, message);
        _this.code = "BAD_REQUEST";
        _this.name = "BadRequestError";
        _this.statusCode = 400;
        return _this;
    }
    return $ea4524c8302aff29$var$_createClass(BadRequestError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.BadRequestError = $ea4524c8302aff29$var$BadRequestError;
var $ea4524c8302aff29$var$AlreadyExistsError = /*#__PURE__*/ function(_Error2) {
    $ea4524c8302aff29$var$_inherits(AlreadyExistsError, _Error2);
    var _super2 = $ea4524c8302aff29$var$_createSuper(AlreadyExistsError);
    function AlreadyExistsError(message) {
        var _this2;
        $ea4524c8302aff29$var$_classCallCheck(this, AlreadyExistsError);
        _this2 = _super2.call(this, message);
        _this2.code = "ALREADY_EXISTS";
        _this2.name = "AlreadyExistsError";
        _this2.statusCode = 409;
        return _this2;
    }
    return $ea4524c8302aff29$var$_createClass(AlreadyExistsError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.AlreadyExistsError = $ea4524c8302aff29$var$AlreadyExistsError;
var $ea4524c8302aff29$var$NotFoundError = /*#__PURE__*/ function(_Error3) {
    $ea4524c8302aff29$var$_inherits(NotFoundError, _Error3);
    var _super3 = $ea4524c8302aff29$var$_createSuper(NotFoundError);
    function NotFoundError(message) {
        var _this3;
        $ea4524c8302aff29$var$_classCallCheck(this, NotFoundError);
        _this3 = _super3.call(this, message);
        _this3.code = "NOT_FOUND";
        _this3.name = "NotFoundError";
        _this3.statusCode = 404;
        return _this3;
    }
    return $ea4524c8302aff29$var$_createClass(NotFoundError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.NotFoundError = $ea4524c8302aff29$var$NotFoundError;
var $ea4524c8302aff29$var$UnauthorizedError = /*#__PURE__*/ function(_Error4) {
    $ea4524c8302aff29$var$_inherits(UnauthorizedError, _Error4);
    var _super4 = $ea4524c8302aff29$var$_createSuper(UnauthorizedError);
    function UnauthorizedError(message) {
        var _this4;
        $ea4524c8302aff29$var$_classCallCheck(this, UnauthorizedError);
        _this4 = _super4.call(this, message);
        _this4.code = "UNAUTHORIZED_ACCESS";
        _this4.name = "UnauthorizedError";
        _this4.statusCode = 401;
        return _this4;
    }
    return $ea4524c8302aff29$var$_createClass(UnauthorizedError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.UnauthorizedError = $ea4524c8302aff29$var$UnauthorizedError;
var $ea4524c8302aff29$var$ServiceUnavailableError = /*#__PURE__*/ function(_Error5) {
    $ea4524c8302aff29$var$_inherits(ServiceUnavailableError, _Error5);
    var _super5 = $ea4524c8302aff29$var$_createSuper(ServiceUnavailableError);
    function ServiceUnavailableError(message) {
        var _this5;
        $ea4524c8302aff29$var$_classCallCheck(this, ServiceUnavailableError);
        _this5 = _super5.call(this, message);
        _this5.code = "SERVICE_UNAVAILABLE";
        _this5.name = "ServiceUnavailableError";
        _this5.statusCode = 451;
        return _this5;
    }
    return $ea4524c8302aff29$var$_createClass(ServiceUnavailableError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.ServiceUnavailableError = $ea4524c8302aff29$var$ServiceUnavailableError;
var $ea4524c8302aff29$var$InternalServerError = /*#__PURE__*/ function(_Error6) {
    $ea4524c8302aff29$var$_inherits(InternalServerError, _Error6);
    var _super6 = $ea4524c8302aff29$var$_createSuper(InternalServerError);
    function InternalServerError(message) {
        var _this6;
        $ea4524c8302aff29$var$_classCallCheck(this, InternalServerError);
        _this6 = _super6.call(this, message);
        _this6.code = "INTERNAL_SERVER_ERROR";
        _this6.name = "InternalServerError";
        _this6.statusCode = 500;
        return _this6;
    }
    return $ea4524c8302aff29$var$_createClass(InternalServerError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.InternalServerError = $ea4524c8302aff29$var$InternalServerError;
var $ea4524c8302aff29$var$MissingFieldError = /*#__PURE__*/ function(_Error7) {
    $ea4524c8302aff29$var$_inherits(MissingFieldError, _Error7);
    var _super7 = $ea4524c8302aff29$var$_createSuper(MissingFieldError);
    function MissingFieldError(message) {
        var _this7;
        $ea4524c8302aff29$var$_classCallCheck(this, MissingFieldError);
        _this7 = _super7.call(this, message);
        _this7.code = "MISSING_PARAMETER";
        _this7.name = "MissingFieldError";
        _this7.statusCode = 400;
        return _this7;
    }
    return $ea4524c8302aff29$var$_createClass(MissingFieldError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.MissingFieldError = $ea4524c8302aff29$var$MissingFieldError;
var $ea4524c8302aff29$var$TooManyRequestsError = /*#__PURE__*/ function(_Error8) {
    $ea4524c8302aff29$var$_inherits(TooManyRequestsError, _Error8);
    var _super8 = $ea4524c8302aff29$var$_createSuper(TooManyRequestsError);
    function TooManyRequestsError(message) {
        var _this8;
        $ea4524c8302aff29$var$_classCallCheck(this, TooManyRequestsError);
        _this8 = _super8.call(this, message);
        _this8.code = "TOO_MANY_REQUESTS";
        _this8.name = "TooManyRequestsError ";
        _this8.statusCode = 429;
        return _this8;
    }
    return $ea4524c8302aff29$var$_createClass(TooManyRequestsError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.TooManyRequestsError = $ea4524c8302aff29$var$TooManyRequestsError;
var $ea4524c8302aff29$var$PayloadTooLargeError = /*#__PURE__*/ function(_Error9) {
    $ea4524c8302aff29$var$_inherits(PayloadTooLargeError, _Error9);
    var _super9 = $ea4524c8302aff29$var$_createSuper(PayloadTooLargeError);
    function PayloadTooLargeError(message) {
        var _this9;
        $ea4524c8302aff29$var$_classCallCheck(this, PayloadTooLargeError);
        _this9 = _super9.call(this, message);
        _this9.code = "PAYLOAD_TOO_LARGE";
        _this9.name = "HeavyPayloadError";
        _this9.statusCode = 413;
        return _this9;
    }
    return $ea4524c8302aff29$var$_createClass(PayloadTooLargeError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.PayloadTooLargeError = $ea4524c8302aff29$var$PayloadTooLargeError;
var $ea4524c8302aff29$var$ForbiddenError = /*#__PURE__*/ function(_Error10) {
    $ea4524c8302aff29$var$_inherits(ForbiddenError, _Error10);
    var _super10 = $ea4524c8302aff29$var$_createSuper(ForbiddenError);
    function ForbiddenError(message) {
        var _this10;
        $ea4524c8302aff29$var$_classCallCheck(this, ForbiddenError);
        _this10 = _super10.call(this, message);
        _this10.code = "REQUEST_FORBIDDEN";
        _this10.name = "ForbiddenError";
        _this10.statusCode = 403;
        return _this10;
    }
    return $ea4524c8302aff29$var$_createClass(ForbiddenError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.ForbiddenError = $ea4524c8302aff29$var$ForbiddenError;
var $ea4524c8302aff29$var$ValidationError = /*#__PURE__*/ function(_Error11) {
    $ea4524c8302aff29$var$_inherits(ValidationError, _Error11);
    var _super11 = $ea4524c8302aff29$var$_createSuper(ValidationError);
    function ValidationError(message) {
        var _this11;
        $ea4524c8302aff29$var$_classCallCheck(this, ValidationError);
        _this11 = _super11.call(this, message);
        _this11.code = "INVALID_REQUEST_BODY";
        _this11.name = "ValidationError";
        _this11.statusCode = 422;
        return _this11;
    }
    return $ea4524c8302aff29$var$_createClass(ValidationError);
}(/*#__PURE__*/ $ea4524c8302aff29$var$_wrapNativeSuper(Error));
module.exports.ValidationError = $ea4524c8302aff29$var$ValidationError;

});



parcelRequire.register("klb6R", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = $ecee62fa84906661$var$errorHandler;

var $k70SB = parcelRequire("k70SB");
function $ecee62fa84906661$var$errorHandler(error, req, res, next) {
    console.error(error.message);
    if (error instanceof $k70SB.BadRequestError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.MissingFieldError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.AlreadyExistsError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.NotFoundError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.UnauthorizedError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.ServiceUnavailableError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.TooManyRequestsError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.PayloadTooLargeError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.ForbiddenError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.ValidationError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: error.message
        }
    });
    if (error instanceof $k70SB.InternalServerError) return res.status(error.statusCode).json({
        error: {
            code: error.code,
            message: "Server error"
        }
    });
    return res.status(500).json({
        error: {
            code: "internal_server_error",
            message: error.message
        }
    });
}

});

parcelRequire.register("gtiJ0", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $bfdde1298473b28f$var$_appConfig = $bfdde1298473b28f$var$_interopRequireDefault((parcelRequire("avFDW")));

var $bfdde1298473b28f$var$_libraries = $bfdde1298473b28f$var$_interopRequireDefault((parcelRequire("jf6CP")));
function $bfdde1298473b28f$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $bfdde1298473b28f$var$requestLimiter = $bfdde1298473b28f$var$_libraries["default"].rateLimit({
    windowMs: $bfdde1298473b28f$var$_appConfig["default"].api.requests.retryWindow,
    max: $bfdde1298473b28f$var$_appConfig["default"].api.requests.attemptsPerWindow,
    message: {
        error: {
            code: "too_many_requests",
            message: "Too many requests, please try again later."
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});
var $bfdde1298473b28f$var$_default = $bfdde1298473b28f$var$requestLimiter;
module.exports["default"] = $bfdde1298473b28f$var$_default;

});

parcelRequire.register("9eZET", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $6ba53ff9135a211f$var$_appConfig = $6ba53ff9135a211f$var$_interopRequireDefault((parcelRequire("avFDW")));

var $k70SB = parcelRequire("k70SB");
function $6ba53ff9135a211f$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
var $6ba53ff9135a211f$var$corsMiddleware = function corsMiddleware(req, res, next) {
    if ($6ba53ff9135a211f$var$_appConfig["default"].server.isInDevMode) {
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, User-Agent, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Referer");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Origin", "*");
        return next();
    }
    var allowedOrigins = [
        "https://www.credet.app",
        "https://credet.app",
        "https://www.credetpay.com",
        "https://credetpay.com",
        "https://auth.credet.app",
        "https://api.credetpay.com",
        "https://www.movecredet.com",
        "https://movecredet.com"
    ];
    var origin = req.headers.origin;
    if (!allowedOrigins.includes(origin)) return next(new $k70SB.ForbiddenError("Request denied"));
    res.setHeader("Access-Control-Allow-Headers", server.allowedHeaders.join(", "));
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", origin);
    next();
};
var $6ba53ff9135a211f$var$_default = $6ba53ff9135a211f$var$corsMiddleware;
module.exports["default"] = $6ba53ff9135a211f$var$_default;

});

parcelRequire.register("iUES8", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;
var $dc4d295109c687b5$var$handleUnspecifiedRouteRequests = function handleUnspecifiedRouteRequests(req, res) {
    var html404Page = "Not Found html page";
    res.status(404);
    if (req.accepts("html")) return res.send(html404Page);
    if (req.accepts("json")) return res.json({
        error: {
            code: "NOT_FOUND",
            message: "404 Not found"
        }
    });
    res.type("txt").send("404 Not found");
};
var $dc4d295109c687b5$var$_default = $dc4d295109c687b5$var$handleUnspecifiedRouteRequests;
module.exports["default"] = $dc4d295109c687b5$var$_default;

});

parcelRequire.register("jdqHa", function(module, exports) {
"use strict";
function $dfd3f055cffe31d4$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $dfd3f055cffe31d4$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $dfd3f055cffe31d4$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;
function $dfd3f055cffe31d4$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $dfd3f055cffe31d4$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $dfd3f055cffe31d4$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $dfd3f055cffe31d4$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $dfd3f055cffe31d4$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $dfd3f055cffe31d4$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $dfd3f055cffe31d4$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $dfd3f055cffe31d4$var$asyncHandler = function asyncHandler(controller) {
    return /*#__PURE__*/ function() {
        var _ref = $dfd3f055cffe31d4$var$_asyncToGenerator(/*#__PURE__*/ $dfd3f055cffe31d4$var$_regeneratorRuntime().mark(function _callee(req, res, next) {
            return $dfd3f055cffe31d4$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                while(true)switch(_context.prev = _context.next){
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return controller(req, res, next);
                    case 3:
                        _context.next = 8;
                        break;
                    case 5:
                        _context.prev = 5;
                        _context.t0 = _context["catch"](0);
                        next(_context.t0);
                    case 8:
                    case "end":
                        return _context.stop();
                }
            }, _callee, null, [
                [
                    0,
                    5
                ]
            ]);
        }));
        return function(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};
var $dfd3f055cffe31d4$var$_default = $dfd3f055cffe31d4$var$asyncHandler;
module.exports["default"] = $dfd3f055cffe31d4$var$_default;

});


parcelRequire.register("jAIIt", function(module, exports) {
"use strict";
function $e43410d16fa8e6c6$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $e43410d16fa8e6c6$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $e43410d16fa8e6c6$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $jARKD = parcelRequire("jARKD");
function $e43410d16fa8e6c6$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $e43410d16fa8e6c6$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $e43410d16fa8e6c6$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $e43410d16fa8e6c6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $e43410d16fa8e6c6$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $e43410d16fa8e6c6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $e43410d16fa8e6c6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $e43410d16fa8e6c6$var$initializeTables = /*#__PURE__*/ function() {
    var _ref2 = $e43410d16fa8e6c6$var$_asyncToGenerator(/*#__PURE__*/ $e43410d16fa8e6c6$var$_regeneratorRuntime().mark(function _callee(_ref) {
        var typeOfDatabase, isSQLDatabase, isMongoDatabase;
        return $e43410d16fa8e6c6$var$_regeneratorRuntime().wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    typeOfDatabase = _ref.typeOfDatabase;
                    _context.prev = 1;
                    isSQLDatabase = typeOfDatabase === "SQL" || typeOfDatabase === "MySQL";
                    if (!isSQLDatabase) {
                        _context.next = 7;
                        break;
                    }
                    _context.next = 6;
                    return (0, $jARKD.initializeSQLTables)();
                case 6:
                    return _context.abrupt("return", _context.sent);
                case 7:
                    isMongoDatabase = typeOfDatabase === "MongoDB" || typeOfDatabase === "Mongo";
                    if (!isMongoDatabase) {
                        _context.next = 12;
                        break;
                    }
                    _context.next = 11;
                    return initializeMongoDbTables();
                case 11:
                    return _context.abrupt("return", _context.sent);
                case 12:
                    return _context.abrupt("return");
                case 15:
                    _context.prev = 15;
                    _context.t0 = _context["catch"](1);
                    throw _context.t0;
                case 18:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                1,
                15
            ]
        ]);
    }));
    return function initializeTables(_x) {
        return _ref2.apply(this, arguments);
    };
}();
// dataCollectionJurisdiction
var $e43410d16fa8e6c6$var$database = {
    initializeTables: $e43410d16fa8e6c6$var$initializeTables
};
var $e43410d16fa8e6c6$var$_default = $e43410d16fa8e6c6$var$database;
module.exports["default"] = $e43410d16fa8e6c6$var$_default;

});
parcelRequire.register("jARKD", function(module, exports) {
"use strict";
function $e43b12f60822f5a0$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $e43b12f60822f5a0$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $e43b12f60822f5a0$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.initializeSQLTables = void 0;

var $e43b12f60822f5a0$var$_usersTable = $e43b12f60822f5a0$var$_interopRequireDefault((parcelRequire("bEnSX")));

var $e43b12f60822f5a0$var$_walletsTable = $e43b12f60822f5a0$var$_interopRequireDefault((parcelRequire("1JU6V")));
function $e43b12f60822f5a0$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $e43b12f60822f5a0$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $e43b12f60822f5a0$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $e43b12f60822f5a0$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $e43b12f60822f5a0$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $e43b12f60822f5a0$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $e43b12f60822f5a0$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $e43b12f60822f5a0$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $e43b12f60822f5a0$var$initializeSQLTables = /*#__PURE__*/ function() {
    var _ref = $e43b12f60822f5a0$var$_asyncToGenerator(/*#__PURE__*/ $e43b12f60822f5a0$var$_regeneratorRuntime().mark(function _callee() {
        return $e43b12f60822f5a0$var$_regeneratorRuntime().wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    _context.next = 2;
                    return (0, $e43b12f60822f5a0$var$_usersTable["default"])();
                case 2:
                    _context.next = 4;
                    return (0, $e43b12f60822f5a0$var$_walletsTable["default"])();
                case 4:
                case "end":
                    return _context.stop();
            }
        }, _callee);
    }));
    return function initializeSQLTables() {
        return _ref.apply(this, arguments);
    };
}();
module.exports.initializeSQLTables = $e43b12f60822f5a0$var$initializeSQLTables;

});
parcelRequire.register("bEnSX", function(module, exports) {
"use strict";
function $87b5f5443c40dbf6$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $87b5f5443c40dbf6$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $87b5f5443c40dbf6$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $87b5f5443c40dbf6$var$_databaseClient = $87b5f5443c40dbf6$var$_interopRequireDefault((parcelRequire("auN7S")));

var $37rWr = parcelRequire("37rWr");
function $87b5f5443c40dbf6$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $87b5f5443c40dbf6$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $87b5f5443c40dbf6$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $87b5f5443c40dbf6$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $87b5f5443c40dbf6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $87b5f5443c40dbf6$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $87b5f5443c40dbf6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $87b5f5443c40dbf6$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $87b5f5443c40dbf6$var$usersTable = /*#__PURE__*/ function() {
    var _ref = $87b5f5443c40dbf6$var$_asyncToGenerator(/*#__PURE__*/ $87b5f5443c40dbf6$var$_regeneratorRuntime().mark(function _callee() {
        var database, schema, tableAlreadyExists;
        return $87b5f5443c40dbf6$var$_regeneratorRuntime().wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return $87b5f5443c40dbf6$var$_databaseClient["default"].connectToDatabase();
                case 3:
                    database = _context.sent;
                    _context.next = 6;
                    return (0, $37rWr.loadSqlQueries)({
                        sqlFolder: "database/mysqlDb/schema"
                    });
                case 6:
                    schema = _context.sent;
                    _context.next = 9;
                    return database.query(schema.user);
                case 9:
                    console.log('Table "users" created');
                    return _context.abrupt("return");
                case 13:
                    _context.prev = 13;
                    _context.t0 = _context["catch"](0);
                    tableAlreadyExists = _context.t0.code === "ER_TABLE_EXISTS_ERROR";
                    if (!tableAlreadyExists) {
                        _context.next = 19;
                        break;
                    }
                    console.log('Table "users" already exists');
                    return _context.abrupt("return");
                case 19:
                    throw _context.t0;
                case 20:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                0,
                13
            ]
        ]);
    }));
    return function usersTable() {
        return _ref.apply(this, arguments);
    };
}();
var $87b5f5443c40dbf6$var$_default = $87b5f5443c40dbf6$var$usersTable;
module.exports["default"] = $87b5f5443c40dbf6$var$_default;

});
parcelRequire.register("auN7S", function(module, exports) {
"use strict";
function $7a42d01e7ac19948$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $7a42d01e7ac19948$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $7a42d01e7ac19948$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $7a42d01e7ac19948$var$_libraries = $7a42d01e7ac19948$var$_interopRequireDefault((parcelRequire("jf6CP")));

var $7a42d01e7ac19948$var$_appConfig = $7a42d01e7ac19948$var$_interopRequireDefault((parcelRequire("avFDW")));
function $7a42d01e7ac19948$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $7a42d01e7ac19948$var$_slicedToArray(arr, i) {
    return $7a42d01e7ac19948$var$_arrayWithHoles(arr) || $7a42d01e7ac19948$var$_iterableToArrayLimit(arr, i) || $7a42d01e7ac19948$var$_unsupportedIterableToArray(arr, i) || $7a42d01e7ac19948$var$_nonIterableRest();
}
function $7a42d01e7ac19948$var$_nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function $7a42d01e7ac19948$var$_unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $7a42d01e7ac19948$var$_arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $7a42d01e7ac19948$var$_arrayLikeToArray(o, minLen);
}
function $7a42d01e7ac19948$var$_arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $7a42d01e7ac19948$var$_iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for(; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
        } catch (err) {
            _d = !0, _e = err;
        } finally{
            try {
                if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
            } finally{
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}
function $7a42d01e7ac19948$var$_arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function $7a42d01e7ac19948$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $7a42d01e7ac19948$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $7a42d01e7ac19948$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $7a42d01e7ac19948$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $7a42d01e7ac19948$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $7a42d01e7ac19948$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $7a42d01e7ac19948$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $7a42d01e7ac19948$var$databaseConnection = /*#__PURE__*/ function() {
    var _ref = $7a42d01e7ac19948$var$_asyncToGenerator(/*#__PURE__*/ $7a42d01e7ac19948$var$_regeneratorRuntime().mark(function _callee5() {
        var pool, closePool, getConnection, query;
        return $7a42d01e7ac19948$var$_regeneratorRuntime().wrap(function _callee5$(_context5) {
            while(true)switch(_context5.prev = _context5.next){
                case 0:
                    pool = null; // Close database connection pool
                    closePool = /*#__PURE__*/ function() {
                        var _ref2 = $7a42d01e7ac19948$var$_asyncToGenerator(/*#__PURE__*/ $7a42d01e7ac19948$var$_regeneratorRuntime().mark(function _callee() {
                            return $7a42d01e7ac19948$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                                while(true)switch(_context.prev = _context.next){
                                    case 0:
                                        _context.prev = 0;
                                        _context.next = 3;
                                        return pool.end();
                                    case 3:
                                        pool = null;
                                        _context.next = 10;
                                        break;
                                    case 6:
                                        _context.prev = 6;
                                        _context.t0 = _context["catch"](0);
                                        console.error(_context.t0.message);
                                        throw _context.t0;
                                    case 10:
                                    case "end":
                                        return _context.stop();
                                }
                            }, _callee, null, [
                                [
                                    0,
                                    6
                                ]
                            ]);
                        }));
                        return function closePool() {
                            return _ref2.apply(this, arguments);
                        };
                    }(); // Establish a new database connection
                    getConnection = /*#__PURE__*/ function() {
                        var _ref3 = $7a42d01e7ac19948$var$_asyncToGenerator(/*#__PURE__*/ $7a42d01e7ac19948$var$_regeneratorRuntime().mark(function _callee3() {
                            var connection;
                            return $7a42d01e7ac19948$var$_regeneratorRuntime().wrap(function _callee3$(_context3) {
                                while(true)switch(_context3.prev = _context3.next){
                                    case 0:
                                        _context3.prev = 0;
                                        if (!pool) {
                                            _context3.next = 3;
                                            break;
                                        }
                                        return _context3.abrupt("return", pool);
                                    case 3:
                                        pool = $7a42d01e7ac19948$var$_libraries["default"].mysql.createPool($7a42d01e7ac19948$var$_appConfig["default"].mysql.developmentDb);
                                        pool.on("error", /*#__PURE__*/ function() {
                                            var _ref4 = $7a42d01e7ac19948$var$_asyncToGenerator(/*#__PURE__*/ $7a42d01e7ac19948$var$_regeneratorRuntime().mark(function _callee2(error) {
                                                return $7a42d01e7ac19948$var$_regeneratorRuntime().wrap(function _callee2$(_context2) {
                                                    while(true)switch(_context2.prev = _context2.next){
                                                        case 0:
                                                            console.error(error.message);
                                                            _context2.next = 3;
                                                            return closePool();
                                                        case 3:
                                                            return _context2.abrupt("return");
                                                        case 4:
                                                        case "end":
                                                            return _context2.stop();
                                                    }
                                                }, _callee2);
                                            }));
                                            return function(_x) {
                                                return _ref4.apply(this, arguments);
                                            };
                                        }());
                                        _context3.next = 7;
                                        return pool.getConnection();
                                    case 7:
                                        connection = _context3.sent;
                                        connection.release();
                                        return _context3.abrupt("return", connection);
                                    case 12:
                                        _context3.prev = 12;
                                        _context3.t0 = _context3["catch"](0);
                                        pool = null;
                                        console.error(_context3.t0.message);
                                        throw _context3.t0;
                                    case 17:
                                    case "end":
                                        return _context3.stop();
                                }
                            }, _callee3, null, [
                                [
                                    0,
                                    12
                                ]
                            ]);
                        }));
                        return function getConnection() {
                            return _ref3.apply(this, arguments);
                        };
                    }();
                    query = /*#__PURE__*/ function() {
                        var _ref5 = $7a42d01e7ac19948$var$_asyncToGenerator(/*#__PURE__*/ $7a42d01e7ac19948$var$_regeneratorRuntime().mark(function _callee4(sql, values) {
                            var connection, _yield$connection$que, _yield$connection$que2, results;
                            return $7a42d01e7ac19948$var$_regeneratorRuntime().wrap(function _callee4$(_context4) {
                                while(true)switch(_context4.prev = _context4.next){
                                    case 0:
                                        _context4.next = 2;
                                        return getConnection();
                                    case 2:
                                        connection = _context4.sent;
                                        _context4.prev = 3;
                                        _context4.next = 6;
                                        return connection.query(sql, values);
                                    case 6:
                                        _yield$connection$que = _context4.sent;
                                        _yield$connection$que2 = $7a42d01e7ac19948$var$_slicedToArray(_yield$connection$que, 1);
                                        results = _yield$connection$que2[0];
                                        connection.release();
                                        return _context4.abrupt("return", [
                                            results
                                        ]);
                                    case 13:
                                        _context4.prev = 13;
                                        _context4.t0 = _context4["catch"](3);
                                        connection.release();
                                        throw _context4.t0;
                                    case 17:
                                    case "end":
                                        return _context4.stop();
                                }
                            }, _callee4, null, [
                                [
                                    3,
                                    13
                                ]
                            ]);
                        }));
                        return function query(_x2, _x3) {
                            return _ref5.apply(this, arguments);
                        };
                    }();
                    return _context5.abrupt("return", {
                        query: query
                    });
                case 5:
                case "end":
                    return _context5.stop();
            }
        }, _callee5);
    }));
    return function databaseConnection() {
        return _ref.apply(this, arguments);
    };
}();
var $7a42d01e7ac19948$var$mysqlClient = {
    connectToDatabase: $7a42d01e7ac19948$var$databaseConnection
};
var $7a42d01e7ac19948$var$_default = $7a42d01e7ac19948$var$mysqlClient;
module.exports["default"] = $7a42d01e7ac19948$var$_default;

});


parcelRequire.register("1JU6V", function(module, exports) {
"use strict";
function $144584ce0a3c4b9e$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $144584ce0a3c4b9e$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $144584ce0a3c4b9e$var$_typeof(obj);
}
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $144584ce0a3c4b9e$var$_databaseClient = $144584ce0a3c4b9e$var$_interopRequireDefault((parcelRequire("auN7S")));

var $37rWr = parcelRequire("37rWr");
function $144584ce0a3c4b9e$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $144584ce0a3c4b9e$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $144584ce0a3c4b9e$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports1;
    };
    var exports1 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports1.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $144584ce0a3c4b9e$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports1.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports1.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports1.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports1.AsyncIterator = AsyncIterator, exports1.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports1.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports1.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports1.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports1;
}
function $144584ce0a3c4b9e$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $144584ce0a3c4b9e$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $144584ce0a3c4b9e$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $144584ce0a3c4b9e$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
var $144584ce0a3c4b9e$var$walletsTable = /*#__PURE__*/ function() {
    var _ref = $144584ce0a3c4b9e$var$_asyncToGenerator(/*#__PURE__*/ $144584ce0a3c4b9e$var$_regeneratorRuntime().mark(function _callee() {
        var database, schema, tableAlreadyExists;
        return $144584ce0a3c4b9e$var$_regeneratorRuntime().wrap(function _callee$(_context) {
            while(true)switch(_context.prev = _context.next){
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return $144584ce0a3c4b9e$var$_databaseClient["default"].connectToDatabase();
                case 3:
                    database = _context.sent;
                    _context.next = 6;
                    return (0, $37rWr.loadSqlQueries)({
                        sqlFolder: "database/mysqlDb/schema"
                    });
                case 6:
                    schema = _context.sent;
                    _context.next = 9;
                    return database.query(schema.wallet);
                case 9:
                    console.log('Table "wallets" created');
                    return _context.abrupt("return");
                case 13:
                    _context.prev = 13;
                    _context.t0 = _context["catch"](0);
                    tableAlreadyExists = _context.t0.code === "ER_TABLE_EXISTS_ERROR";
                    if (!tableAlreadyExists) {
                        _context.next = 19;
                        break;
                    }
                    console.log('Table "wallets" already exists');
                    return _context.abrupt("return");
                case 19:
                    throw _context.t0;
                case 20:
                case "end":
                    return _context.stop();
            }
        }, _callee, null, [
            [
                0,
                13
            ]
        ]);
    }));
    return function walletsTable() {
        return _ref.apply(this, arguments);
    };
}();
var $144584ce0a3c4b9e$var$_default = $144584ce0a3c4b9e$var$walletsTable;
module.exports["default"] = $144584ce0a3c4b9e$var$_default;

});




"use strict";
function $bd295355364a39aa$var$_typeof(obj) {
    "@babel/helpers - typeof";
    return $bd295355364a39aa$var$_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, $bd295355364a39aa$var$_typeof(obj);
}

var $bd295355364a39aa$var$_app = $bd295355364a39aa$var$_interopRequireDefault((parcelRequire("er45j")));

var $bd295355364a39aa$var$_appConfig = $bd295355364a39aa$var$_interopRequireDefault((parcelRequire("avFDW")));

var $bd295355364a39aa$var$_database = $bd295355364a39aa$var$_interopRequireDefault((parcelRequire("jAIIt")));

var $bd295355364a39aa$var$_libraries = $bd295355364a39aa$var$_interopRequireDefault((parcelRequire("jf6CP")));
function $bd295355364a39aa$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $bd295355364a39aa$var$_regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ 
    $bd295355364a39aa$var$_regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    };
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }
    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        }), generator;
    }
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == $bd295355364a39aa$var$_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function(error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }
        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function(resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }
                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }
    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function(method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for(context.method = method, context.arg = arg;;){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg;
                else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for(; ++i < iterable.length;)if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    function doneResult() {
        return {
            value: undefined,
            done: !0
        };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function(genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function(arg) {
        return {
            __await: arg
        };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
        return this;
    }), define(Gp, "toString", function() {
        return "[object Generator]";
    }), exports.keys = function(val) {
        var object = Object(val), keys = [];
        for(var key in object)keys.push(key);
        return keys.reverse(), function next() {
            for(; keys.length;){
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for(var name in this)"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        },
        stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        },
        "catch": function _catch(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}
function $bd295355364a39aa$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $bd295355364a39aa$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $bd295355364a39aa$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $bd295355364a39aa$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
} // import createApplication from './app';
var $bd295355364a39aa$var$startServer = /*#__PURE__*/ function() {
    var _ref = $bd295355364a39aa$var$_asyncToGenerator(/*#__PURE__*/ $bd295355364a39aa$var$_regeneratorRuntime().mark(function _callee2() {
        var expressFramework, application, server, signalInterruptionOrTermination;
        return $bd295355364a39aa$var$_regeneratorRuntime().wrap(function _callee2$(_context2) {
            while(true)switch(_context2.prev = _context2.next){
                case 0:
                    _context2.prev = 0;
                    expressFramework = $bd295355364a39aa$var$_libraries["default"].expressFramework();
                    _context2.next = 4;
                    return (0, $bd295355364a39aa$var$_app["default"])(expressFramework);
                case 4:
                    application = _context2.sent;
                    server = application.listen($bd295355364a39aa$var$_appConfig["default"].server.port, /*#__PURE__*/ $bd295355364a39aa$var$_asyncToGenerator(/*#__PURE__*/ $bd295355364a39aa$var$_regeneratorRuntime().mark(function _callee() {
                        return $bd295355364a39aa$var$_regeneratorRuntime().wrap(function _callee$(_context) {
                            while(true)switch(_context.prev = _context.next){
                                case 0:
                                    _context.next = 2;
                                    return $bd295355364a39aa$var$_database["default"].initializeTables({
                                        typeOfDatabase: "SQL"
                                    });
                                case 2:
                                    console.log("Server running at ".concat($bd295355364a39aa$var$_appConfig["default"].server.host));
                                case 3:
                                case "end":
                                    return _context.stop();
                            }
                        }, _callee);
                    }))).on("error", function(error) {
                        console.error(error);
                        $bs03N$process.exit(1);
                    });
                    $bs03N$process.on("unhandledRejection", function(error) {
                        console.log("Server error: ".concat(error));
                    });
                    // Initiate a graceful shutdown
                    signalInterruptionOrTermination = $bd295355364a39aa$var$_appConfig["default"].server.isInDevMode ? "SIGINT" : "SIGTERM";
                    $bs03N$process.on(signalInterruptionOrTermination, function() {
                        console.log("SIGINT received...");
                        console.log("server is starting cleanup");
                        server.close(function() {
                            console.log("Server is now closed...");
                            $bs03N$process.exit(0);
                        });
                    });
                    _context2.next = 15;
                    break;
                case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2["catch"](0);
                    console.error(_context2.t0);
                    throw _context2.t0;
                case 15:
                case "end":
                    return _context2.stop();
            }
        }, _callee2, null, [
            [
                0,
                11
            ]
        ]);
    }));
    return function startServer() {
        return _ref.apply(this, arguments);
    };
}();
$bd295355364a39aa$var$startServer(); // const cluster = require('cluster');
 // const os = require('os');
 // const runExpressServer = require('./app');
 // // Check if current process is master.
 // if (cluster.isMaster) {
 //   // Get total CPU cores.
 //   const cpuCount = os.cpus().length;
 //   // Spawn a worker for every core.
 //   for (let j = 0; j < cpuCount; j++) {
 //     cluster.fork();
 //   }
 // } else {
 //   // This is not the master process, so we spawn the express server.
 //   runExpressServer();
 // }
 // // Cluster API has a variety of events.
 // // Here we are creating a new process if a worker die.
 // cluster.on('exit', function (worker) {
 //   console.log(`Worker ${worker.id} died'`);
 //   console.log(`Staring a new one...`);
 //   cluster.fork();
 // });


//# sourceMappingURL=server.js.map
