/*
 AngularJS v1.3.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(N,f,W){'use strict';f.module("ngAnimate",["ng"]).directive("ngAnimateChildren",function(){return function(X,C,g){g=g.ngAnimateChildren;f.isString(g)&&0===g.length?C.data("$$ngAnimateChildren",!0):X.$watch(g,function(f){C.data("$$ngAnimateChildren",!!f)})}}).factory("$$animateReflow",["$$rAF","$document",function(f,C){return function(g){return f(function(){g()})}}]).config(["$provide","$animateProvider",function(X,C){function g(f){for(var n=0;n<f.length;n++){var g=f[n];if(1==g.nodeType)return g}}
function ba(f,n){return g(f)==g(n)}var t=f.noop,n=f.forEach,da=C.$$selectors,aa=f.isArray,ea=f.isString,ga=f.isObject,r={running:!0},u;X.decorator("$animate",["$delegate","$$q","$injector","$sniffer","$rootElement","$$asyncCallback","$rootScope","$document","$templateRequest","$$jqLite",function(O,N,M,Y,y,H,P,W,Z,Q){function R(a,c){var b=a.data("$$ngAnimateState")||{};c&&(b.running=!0,b.structural=!0,a.data("$$ngAnimateState",b));return b.disabled||b.running&&b.structural}function D(a){var c,b=N.defer();
b.promise.$$cancelFn=function(){c&&c()};P.$$postDigest(function(){c=a(function(){b.resolve()})});return b.promise}function I(a){if(ga(a))return a.tempClasses&&ea(a.tempClasses)&&(a.tempClasses=a.tempClasses.split(/\s+/)),a}function S(a,c,b){b=b||{};var d={};n(b,function(e,a){n(a.split(" "),function(a){d[a]=e})});var h=Object.create(null);n((a.attr("class")||"").split(/\s+/),function(e){h[e]=!0});var f=[],l=[];n(c&&c.classes||[],function(e,a){var b=h[a],c=d[a]||{};!1===e?(b||"addClass"==c.event)&&
l.push(a):!0===e&&(b&&"removeClass"!=c.event||f.push(a))});return 0<f.length+l.length&&[f.join(" "),l.join(" ")]}function T(a){if(a){var c=[],b={};a=a.substr(1).split(".");(Y.transitions||Y.animations)&&c.push(M.get(da[""]));for(var d=0;d<a.length;d++){var f=a[d],k=da[f];k&&!b[f]&&(c.push(M.get(k)),b[f]=!0)}return c}}function U(a,c,b,d){function h(e,a){var b=e[a],c=e["before"+a.charAt(0).toUpperCase()+a.substr(1)];if(b||c)return"leave"==a&&(c=b,b=null),u.push({event:a,fn:b}),J.push({event:a,fn:c}),
!0}function k(c,l,w){var E=[];n(c,function(a){a.fn&&E.push(a)});var m=0;n(E,function(c,f){var p=function(){a:{if(l){(l[f]||t)();if(++m<E.length)break a;l=null}w()}};switch(c.event){case "setClass":l.push(c.fn(a,e,A,p,d));break;case "animate":l.push(c.fn(a,b,d.from,d.to,p));break;case "addClass":l.push(c.fn(a,e||b,p,d));break;case "removeClass":l.push(c.fn(a,A||b,p,d));break;default:l.push(c.fn(a,p,d))}});l&&0===l.length&&w()}var l=a[0];if(l){d&&(d.to=d.to||{},d.from=d.from||{});var e,A;aa(b)&&(e=
b[0],A=b[1],e?A?b=e+" "+A:(b=e,c="addClass"):(b=A,c="removeClass"));var w="setClass"==c,E=w||"addClass"==c||"removeClass"==c||"animate"==c,p=a.attr("class")+" "+b;if(x(p)){var ca=t,m=[],J=[],g=t,s=[],u=[],p=(" "+p).replace(/\s+/g,".");n(T(p),function(a){!h(a,c)&&w&&(h(a,"addClass"),h(a,"removeClass"))});return{node:l,event:c,className:b,isClassBased:E,isSetClassOperation:w,applyStyles:function(){d&&a.css(f.extend(d.from||{},d.to||{}))},before:function(a){ca=a;k(J,m,function(){ca=t;a()})},after:function(a){g=
a;k(u,s,function(){g=t;a()})},cancel:function(){m&&(n(m,function(a){(a||t)(!0)}),ca(!0));s&&(n(s,function(a){(a||t)(!0)}),g(!0))}}}}}function G(a,c,b,d,h,k,l,e){function A(e){var l="$animate:"+e;J&&J[l]&&0<J[l].length&&H(function(){b.triggerHandler(l,{event:a,className:c})})}function w(){A("before")}function E(){A("after")}function p(){p.hasBeenRun||(p.hasBeenRun=!0,k())}function g(){if(!g.hasBeenRun){m&&m.applyStyles();g.hasBeenRun=!0;l&&l.tempClasses&&n(l.tempClasses,function(a){u.removeClass(b,
a)});var w=b.data("$$ngAnimateState");w&&(m&&m.isClassBased?B(b,c):(H(function(){var e=b.data("$$ngAnimateState")||{};fa==e.index&&B(b,c,a)}),b.data("$$ngAnimateState",w)));A("close");e()}}var m=U(b,a,c,l);if(!m)return p(),w(),E(),g(),t;a=m.event;c=m.className;var J=f.element._data(m.node),J=J&&J.events;d||(d=h?h.parent():b.parent());if(z(b,d))return p(),w(),E(),g(),t;d=b.data("$$ngAnimateState")||{};var L=d.active||{},s=d.totalActive||0,q=d.last;h=!1;if(0<s){s=[];if(m.isClassBased)"setClass"==q.event?
(s.push(q),B(b,c)):L[c]&&(v=L[c],v.event==a?h=!0:(s.push(v),B(b,c)));else if("leave"==a&&L["ng-leave"])h=!0;else{for(var v in L)s.push(L[v]);d={};B(b,!0)}0<s.length&&n(s,function(a){a.cancel()})}!m.isClassBased||m.isSetClassOperation||"animate"==a||h||(h="addClass"==a==b.hasClass(c));if(h)return p(),w(),E(),A("close"),e(),t;L=d.active||{};s=d.totalActive||0;if("leave"==a)b.one("$destroy",function(a){a=f.element(this);var e=a.data("$$ngAnimateState");e&&(e=e.active["ng-leave"])&&(e.cancel(),B(a,"ng-leave"))});
u.addClass(b,"ng-animate");l&&l.tempClasses&&n(l.tempClasses,function(a){u.addClass(b,a)});var fa=K++;s++;L[c]=m;b.data("$$ngAnimateState",{last:m,active:L,index:fa,totalActive:s});w();m.before(function(e){var l=b.data("$$ngAnimateState");e=e||!l||!l.active[c]||m.isClassBased&&l.active[c].event!=a;p();!0===e?g():(E(),m.after(g))});return m.cancel}function q(a){if(a=g(a))a=f.isFunction(a.getElementsByClassName)?a.getElementsByClassName("ng-animate"):a.querySelectorAll(".ng-animate"),n(a,function(a){a=
f.element(a);(a=a.data("$$ngAnimateState"))&&a.active&&n(a.active,function(a){a.cancel()})})}function B(a,c){if(ba(a,y))r.disabled||(r.running=!1,r.structural=!1);else if(c){var b=a.data("$$ngAnimateState")||{},d=!0===c;!d&&b.active&&b.active[c]&&(b.totalActive--,delete b.active[c]);if(d||!b.totalActive)u.removeClass(a,"ng-animate"),a.removeData("$$ngAnimateState")}}function z(a,c){if(r.disabled)return!0;if(ba(a,y))return r.running;var b,d,g;do{if(0===c.length)break;var k=ba(c,y),l=k?r:c.data("$$ngAnimateState")||
{};if(l.disabled)return!0;k&&(g=!0);!1!==b&&(k=c.data("$$ngAnimateChildren"),f.isDefined(k)&&(b=k));d=d||l.running||l.last&&!l.last.isClassBased}while(c=c.parent());return!g||!b&&d}u=Q;y.data("$$ngAnimateState",r);var $=P.$watch(function(){return Z.totalPendingRequests},function(a,c){0===a&&($(),P.$$postDigest(function(){P.$$postDigest(function(){r.running=!1})}))}),K=0,V=C.classNameFilter(),x=V?function(a){return V.test(a)}:function(){return!0};return{animate:function(a,c,b,d,h){d=d||"ng-inline-animate";
h=I(h)||{};h.from=b?c:null;h.to=b?b:c;return D(function(b){return G("animate",d,f.element(g(a)),null,null,t,h,b)})},enter:function(a,c,b,d){d=I(d);a=f.element(a);c=c&&f.element(c);b=b&&f.element(b);R(a,!0);O.enter(a,c,b);return D(function(h){return G("enter","ng-enter",f.element(g(a)),c,b,t,d,h)})},leave:function(a,c){c=I(c);a=f.element(a);q(a);R(a,!0);return D(function(b){return G("leave","ng-leave",f.element(g(a)),null,null,function(){O.leave(a)},c,b)})},move:function(a,c,b,d){d=I(d);a=f.element(a);
c=c&&f.element(c);b=b&&f.element(b);q(a);R(a,!0);O.move(a,c,b);return D(function(h){return G("move","ng-move",f.element(g(a)),c,b,t,d,h)})},addClass:function(a,c,b){return this.setClass(a,c,[],b)},removeClass:function(a,c,b){return this.setClass(a,[],c,b)},setClass:function(a,c,b,d){d=I(d);a=f.element(a);a=f.element(g(a));if(R(a))return O.$$setClassImmediately(a,c,b,d);var h,k=a.data("$$animateClasses"),l=!!k;k||(k={classes:{}});h=k.classes;c=aa(c)?c:c.split(" ");n(c,function(a){a&&a.length&&(h[a]=
!0)});b=aa(b)?b:b.split(" ");n(b,function(a){a&&a.length&&(h[a]=!1)});if(l)return d&&k.options&&(k.options=f.extend(k.options||{},d)),k.promise;a.data("$$animateClasses",k={classes:h,options:d});return k.promise=D(function(e){var l=a.parent(),b=g(a),c=b.parentNode;if(!c||c.$$NG_REMOVED||b.$$NG_REMOVED)e();else{b=a.data("$$animateClasses");a.removeData("$$animateClasses");var c=a.data("$$ngAnimateState")||{},d=S(a,b,c.active);return d?G("setClass",d,a,l,null,function(){d[0]&&O.$$addClassImmediately(a,
d[0]);d[1]&&O.$$removeClassImmediately(a,d[1])},b.options,e):e()}})},cancel:function(a){a.$$cancelFn()},enabled:function(a,c){switch(arguments.length){case 2:if(a)B(c);else{var b=c.data("$$ngAnimateState")||{};b.disabled=!0;c.data("$$ngAnimateState",b)}break;case 1:r.disabled=!a;break;default:a=!r.disabled}return!!a}}}]);C.register("",["$window","$sniffer","$timeout","$$animateReflow",function(r,C,M,Y){function y(){b||(b=Y(function(){c=[];b=null;x={}}))}function H(a,e){b&&b();c.push(e);b=Y(function(){n(c,
function(a){a()});c=[];b=null;x={}})}function P(a,e){var b=g(a);a=f.element(b);k.push(a);b=Date.now()+e;b<=h||(M.cancel(d),h=b,d=M(function(){X(k);k=[]},e,!1))}function X(a){n(a,function(a){(a=a.data("$$ngAnimateCSS3Data"))&&n(a.closeAnimationFns,function(a){a()})})}function Z(a,e){var b=e?x[e]:null;if(!b){var c=0,d=0,f=0,g=0;n(a,function(a){if(1==a.nodeType){a=r.getComputedStyle(a)||{};c=Math.max(Q(a[z+"Duration"]),c);d=Math.max(Q(a[z+"Delay"]),d);g=Math.max(Q(a[K+"Delay"]),g);var e=Q(a[K+"Duration"]);
0<e&&(e*=parseInt(a[K+"IterationCount"],10)||1);f=Math.max(e,f)}});b={total:0,transitionDelay:d,transitionDuration:c,animationDelay:g,animationDuration:f};e&&(x[e]=b)}return b}function Q(a){var e=0;a=ea(a)?a.split(/\s*,\s*/):[];n(a,function(a){e=Math.max(parseFloat(a)||0,e)});return e}function R(b,e,c,d){b=0<=["ng-enter","ng-leave","ng-move"].indexOf(c);var f,p=e.parent(),h=p.data("$$ngAnimateKey");h||(p.data("$$ngAnimateKey",++a),h=a);f=h+"-"+g(e).getAttribute("class");var p=f+" "+c,h=x[p]?++x[p].total:
0,m={};if(0<h){var n=c+"-stagger",m=f+" "+n;(f=!x[m])&&u.addClass(e,n);m=Z(e,m);f&&u.removeClass(e,n)}u.addClass(e,c);var n=e.data("$$ngAnimateCSS3Data")||{},k=Z(e,p);f=k.transitionDuration;k=k.animationDuration;if(b&&0===f&&0===k)return u.removeClass(e,c),!1;c=d||b&&0<f;b=0<k&&0<m.animationDelay&&0===m.animationDuration;e.data("$$ngAnimateCSS3Data",{stagger:m,cacheKey:p,running:n.running||0,itemIndex:h,blockTransition:c,closeAnimationFns:n.closeAnimationFns||[]});p=g(e);c&&(I(p,!0),d&&e.css(d));
b&&(p.style[K+"PlayState"]="paused");return!0}function D(a,e,b,c,d){function f(){e.off(D,h);u.removeClass(e,k);u.removeClass(e,t);z&&M.cancel(z);G(e,b);var a=g(e),c;for(c in s)a.style.removeProperty(s[c])}function h(a){a.stopPropagation();var b=a.originalEvent||a;a=b.$manualTimeStamp||b.timeStamp||Date.now();b=parseFloat(b.elapsedTime.toFixed(3));Math.max(a-H,0)>=C&&b>=x&&c()}var m=g(e);a=e.data("$$ngAnimateCSS3Data");if(-1!=m.getAttribute("class").indexOf(b)&&a){var k="",t="";n(b.split(" "),function(a,
b){var e=(0<b?" ":"")+a;k+=e+"-active";t+=e+"-pending"});var s=[],q=a.itemIndex,v=a.stagger,r=0;if(0<q){r=0;0<v.transitionDelay&&0===v.transitionDuration&&(r=v.transitionDelay*q);var y=0;0<v.animationDelay&&0===v.animationDuration&&(y=v.animationDelay*q,s.push(B+"animation-play-state"));r=Math.round(100*Math.max(r,y))/100}r||(u.addClass(e,k),a.blockTransition&&I(m,!1));var F=Z(e,a.cacheKey+" "+k),x=Math.max(F.transitionDuration,F.animationDuration);if(0===x)u.removeClass(e,k),G(e,b),c();else{!r&&
d&&0<Object.keys(d).length&&(F.transitionDuration||(e.css("transition",F.animationDuration+"s linear all"),s.push("transition")),e.css(d));var q=Math.max(F.transitionDelay,F.animationDelay),C=1E3*q;0<s.length&&(v=m.getAttribute("style")||"",";"!==v.charAt(v.length-1)&&(v+=";"),m.setAttribute("style",v+" "));var H=Date.now(),D=V+" "+$,q=1E3*(r+1.5*(q+x)),z;0<r&&(u.addClass(e,t),z=M(function(){z=null;0<F.transitionDuration&&I(m,!1);0<F.animationDuration&&(m.style[K+"PlayState"]="");u.addClass(e,k);
u.removeClass(e,t);d&&(0===F.transitionDuration&&e.css("transition",F.animationDuration+"s linear all"),e.css(d),s.push("transition"))},1E3*r,!1));e.on(D,h);a.closeAnimationFns.push(function(){f();c()});a.running++;P(e,q);return f}}else c()}function I(a,b){a.style[z+"Property"]=b?"none":""}function S(a,b,c,d){if(R(a,b,c,d))return function(a){a&&G(b,c)}}function T(a,b,c,d,f){if(b.data("$$ngAnimateCSS3Data"))return D(a,b,c,d,f);G(b,c);d()}function U(a,b,c,d,f){var g=S(a,b,c,f.from);if(g){var h=g;H(b,
function(){h=T(a,b,c,d,f.to)});return function(a){(h||t)(a)}}y();d()}function G(a,b){u.removeClass(a,b);var c=a.data("$$ngAnimateCSS3Data");c&&(c.running&&c.running--,c.running&&0!==c.running||a.removeData("$$ngAnimateCSS3Data"))}function q(a,b){var c="";a=aa(a)?a:a.split(/\s+/);n(a,function(a,d){a&&0<a.length&&(c+=(0<d?" ":"")+a+b)});return c}var B="",z,$,K,V;N.ontransitionend===W&&N.onwebkittransitionend!==W?(B="-webkit-",z="WebkitTransition",$="webkitTransitionEnd transitionend"):(z="transition",
$="transitionend");N.onanimationend===W&&N.onwebkitanimationend!==W?(B="-webkit-",K="WebkitAnimation",V="webkitAnimationEnd animationend"):(K="animation",V="animationend");var x={},a=0,c=[],b,d=null,h=0,k=[];return{animate:function(a,b,c,d,f,g){g=g||{};g.from=c;g.to=d;return U("animate",a,b,f,g)},enter:function(a,b,c){c=c||{};return U("enter",a,"ng-enter",b,c)},leave:function(a,b,c){c=c||{};return U("leave",a,"ng-leave",b,c)},move:function(a,b,c){c=c||{};return U("move",a,"ng-move",b,c)},beforeSetClass:function(a,
b,c,d,f){f=f||{};b=q(c,"-remove")+" "+q(b,"-add");if(f=S("setClass",a,b,f.from))return H(a,d),f;y();d()},beforeAddClass:function(a,b,c,d){d=d||{};if(b=S("addClass",a,q(b,"-add"),d.from))return H(a,c),b;y();c()},beforeRemoveClass:function(a,b,c,d){d=d||{};if(b=S("removeClass",a,q(b,"-remove"),d.from))return H(a,c),b;y();c()},setClass:function(a,b,c,d,f){f=f||{};c=q(c,"-remove");b=q(b,"-add");return T("setClass",a,c+" "+b,d,f.to)},addClass:function(a,b,c,d){d=d||{};return T("addClass",a,q(b,"-add"),
c,d.to)},removeClass:function(a,b,c,d){d=d||{};return T("removeClass",a,q(b,"-remove"),c,d.to)}}}])}])})(window,window.angular);
//# sourceMappingURL=angular-animate.min.js.map

/*
 AngularJS v1.3.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
 */
(function (I, d, B) {
    'use strict';
    function D(f, q) {
        q = q || {};
        d.forEach(q, function (d, h) {
            delete q[h]
        });
        for (var h in f)!f.hasOwnProperty(h) || "$" === h.charAt(0) && "$" === h.charAt(1) || (q[h] = f[h]);
        return q
    }

    var w = d.$$minErr("$resource"), C = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
    d.module("ngResource", ["ng"]).provider("$resource", function () {
        var f = this;
        this.defaults = {
            stripTrailingSlashes: !0,
            actions: {
                get: {method: "GET"},
                save: {method: "POST"},
                query: {method: "GET", isArray: !0},
                remove: {method: "DELETE"},
                "delete": {method: "DELETE"}
            }
        };
        this.$get = ["$http", "$q", function (q, h) {
            function t(d, g) {
                this.template = d;
                this.defaults = s({}, f.defaults, g);
                this.urlParams = {}
            }

            function v(x, g, l, m) {
                function c(b, k) {
                    var c = {};
                    k = s({}, g, k);
                    r(k, function (a, k) {
                        u(a) && (a = a());
                        var d;
                        if (a && a.charAt && "@" == a.charAt(0)) {
                            d = b;
                            var e = a.substr(1);
                            if (null == e || "" === e || "hasOwnProperty" === e || !C.test("." + e))throw w("badmember", e);
                            for (var e = e.split("."), n = 0, g = e.length; n < g && d !== B; n++) {
                                var h = e[n];
                                d = null !== d ? d[h] : B
                            }
                        } else d = a;
                        c[k] = d
                    });
                    return c
                }

                function F(b) {
                    return b.resource
                }

                function e(b) {
                    D(b ||
                    {}, this)
                }

                var G = new t(x, m);
                l = s({}, f.defaults.actions, l);
                e.prototype.toJSON = function () {
                    var b = s({}, this);
                    delete b.$promise;
                    delete b.$resolved;
                    return b
                };
                r(l, function (b, k) {
                    var g = /^(POST|PUT|PATCH)$/i.test(b.method);
                    e[k] = function (a, y, m, x) {
                        var n = {}, f, l, z;
                        switch (arguments.length) {
                            case 4:
                                z = x, l = m;
                            case 3:
                            case 2:
                                if (u(y)) {
                                    if (u(a)) {
                                        l = a;
                                        z = y;
                                        break
                                    }
                                    l = y;
                                    z = m
                                } else {
                                    n = a;
                                    f = y;
                                    l = m;
                                    break
                                }
                            case 1:
                                u(a) ? l = a : g ? f = a : n = a;
                                break;
                            case 0:
                                break;
                            default:
                                throw w("badargs", arguments.length);
                        }
                        var t = this instanceof e, p = t ? f : b.isArray ? [] : new e(f),
                            A = {}, v = b.interceptor && b.interceptor.response || F, C = b.interceptor && b.interceptor.responseError || B;
                        r(b, function (b, a) {
                            "params" != a && "isArray" != a && "interceptor" != a && (A[a] = H(b))
                        });
                        g && (A.data = f);
                        G.setUrlParams(A, s({}, c(f, b.params || {}), n), b.url);
                        n = q(A).then(function (a) {
                            var c = a.data, g = p.$promise;
                            if (c) {
                                if (d.isArray(c) !== !!b.isArray)throw w("badcfg", k, b.isArray ? "array" : "object", d.isArray(c) ? "array" : "object");
                                b.isArray ? (p.length = 0, r(c, function (a) {
                                    "object" === typeof a ? p.push(new e(a)) : p.push(a)
                                })) : (D(c, p), p.$promise =
                                    g)
                            }
                            p.$resolved = !0;
                            a.resource = p;
                            return a
                        }, function (a) {
                            p.$resolved = !0;
                            (z || E)(a);
                            return h.reject(a)
                        });
                        n = n.then(function (a) {
                            var b = v(a);
                            (l || E)(b, a.headers);
                            return b
                        }, C);
                        return t ? n : (p.$promise = n, p.$resolved = !1, p)
                    };
                    e.prototype["$" + k] = function (a, b, c) {
                        u(a) && (c = b, b = a, a = {});
                        a = e[k].call(this, a, this, b, c);
                        return a.$promise || a
                    }
                });
                e.bind = function (b) {
                    return v(x, s({}, g, b), l)
                };
                return e
            }

            var E = d.noop, r = d.forEach, s = d.extend, H = d.copy, u = d.isFunction;
            t.prototype = {
                setUrlParams: function (f, g, l) {
                    var m = this, c = l || m.template, h,
                        e, q = m.urlParams = {};
                    r(c.split(/\W/), function (b) {
                        if ("hasOwnProperty" === b)throw w("badname");
                        !/^\d+$/.test(b) && b && (new RegExp("(^|[^\\\\]):" + b + "(\\W|$)")).test(c) && (q[b] = !0)
                    });
                    c = c.replace(/\\:/g, ":");
                    g = g || {};
                    r(m.urlParams, function (b, k) {
                        h = g.hasOwnProperty(k) ? g[k] : m.defaults[k];
                        d.isDefined(h) && null !== h ? (e = encodeURIComponent(h).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "%20").replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+"), c = c.replace(new RegExp(":" +
                        k + "(\\W|$)", "g"), function (b, a) {
                            return e + a
                        })) : c = c.replace(new RegExp("(/?):" + k + "(\\W|$)", "g"), function (b, a, c) {
                            return "/" == c.charAt(0) ? c : a + c
                        })
                    });
                    m.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/");
                    c = c.replace(/\/\.(?=\w+($|\?))/, ".");
                    f.url = c.replace(/\/\\\./, "/.");
                    r(g, function (b, c) {
                        m.urlParams[c] || (f.params = f.params || {}, f.params[c] = b)
                    })
                }
            };
            return v
        }]
    })
})(window, window.angular);
//# sourceMappingURL=angular-resource.min.js.map

/**
 * State-based routing for AngularJS
 * @version v0.2.11
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (a, b, c) {
    "use strict";
    function d(a, b) {
        return J(new (J(function () {
        }, {prototype: a})), b)
    }

    function e(a) {
        return I(arguments, function (b) {
            b !== a && I(b, function (b, c) {
                a.hasOwnProperty(c) || (a[c] = b)
            })
        }), a
    }

    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])break;
            c.push(a.path[d])
        }
        return c
    }

    function g(a) {
        if (Object.keys)return Object.keys(a);
        var c = [];
        return b.forEach(a, function (a, b) {
            c.push(b)
        }), c
    }

    function h(a, b) {
        if (Array.prototype.indexOf)return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)if (d in a && a[d] === b)return d;
        return -1
    }

    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i)if (i[l].params && (e = g(i[l].params), e.length))for (var m in e)h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
        return J({}, j, b)
    }

    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a)c.push(d)
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f])return !1
        }
        return !0
    }

    function k(a, b) {
        var c = {};
        return I(a, function (a) {
            c[a] = b[a]
        }), c
    }

    function l(a, b) {
        var d = 1, f = 2, g = {}, h = [], i = g, j = J(a.when(g), {$$promises: g, $$values: g});
        this.study = function (g) {
            function k(a, c) {
                if (o[c] !== f) {
                    if (n.push(c), o[c] === d)throw n.splice(0, n.indexOf(c)), new Error("Cyclic dependency: " + n.join(" -> "));
                    if (o[c] = d, F(a))m.push(c, [function () {
                        return b.get(a)
                    }], h); else {
                        var e = b.annotate(a);
                        I(e, function (a) {
                            a !== c && g.hasOwnProperty(a) && k(g[a], a)
                        }), m.push(c, a, e)
                    }
                    n.pop(), o[c] = f
                }
            }

            function l(a) {
                return G(a) && a.then && a.$$promises
            }

            if (!G(g))throw new Error("'invocables' must be an object");
            var m = [], n = [], o = {};
            return I(g, k), g = n = o = null, function (d, f, g) {
                function h() {
                    --s || (t || e(r, f.$$values), p.$$values = r, p.$$promises = !0, delete p.$$inheritedValues, o.resolve(r))
                }

                function k(a) {
                    p.$$failure = a, o.reject(a)
                }

                function n(c, e, f) {
                    function i(a) {
                        l.reject(a), k(a)
                    }

                    function j() {
                        if (!D(p.$$failure))try {
                            l.resolve(b.invoke(e, g, r)), l.promise.then(function (a) {
                                r[c] = a, h()
                            }, i)
                        } catch (a) {
                            i(a)
                        }
                    }

                    var l = a.defer(), m = 0;
                    I(f, function (a) {
                        q.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, q[a].then(function (b) {
                            r[a] = b, --m || j()
                        }, i))
                    }), m || j(), q[c] = l.promise
                }

                if (l(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!G(d))throw new Error("'locals' must be an object")
                } else d = i;
                if (f) {
                    if (!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else f = j;
                var o = a.defer(), p = o.promise, q = p.$$promises = {}, r = J({}, d), s = 1 + m.length / 3, t = !1;
                if (D(f.$$failure))return k(f.$$failure), p;
                f.$$inheritedValues && e(r, f.$$inheritedValues), f.$$values ? (t = e(r, f.$$values), p.$$inheritedValues = f.$$values, h()) : (f.$$inheritedValues && (p.$$inheritedValues = f.$$inheritedValues), J(q, f.$$promises), f.then(h, k));
                for (var u = 0, v = m.length; v > u; u += 3)d.hasOwnProperty(m[u]) ? h() : n(m[u], m[u + 1], m[u + 2]);
                return p
            }
        }, this.resolve = function (a, b, c, d) {
            return this.study(a)(b, c, d)
        }
    }

    function m(a, b, c) {
        this.fromConfig = function (a, b, c) {
            return D(a.template) ? this.fromString(a.template, b) : D(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : D(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
        }, this.fromString = function (a, b) {
            return E(a) ? a(b) : a
        }, this.fromUrl = function (c, d) {
            return E(c) && (c = c(d)), null == c ? null : a.get(c, {cache: b}).then(function (a) {
                return a.data
            })
        }, this.fromProvider = function (a, b, d) {
            return c.invoke(a, null, d || {params: b})
        }
    }

    function n(a, d) {
        function e(a) {
            return D(a) ? this.type.decode(a) : p.$$getDefaultValue(this)
        }

        function f(b, c, d) {
            if (!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (n[b])throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            n[b] = J({type: c || new o, $value: e}, d)
        }

        function g(a, b, c) {
            var d = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!b)return d;
            var e = c ? "?" : "";
            return d + e + "(" + b + ")" + e
        }

        function h(a) {
            if (!d.params || !d.params[a])return {};
            var b = d.params[a];
            return G(b) ? b : {value: b}
        }

        d = b.isObject(d) ? d : {};
        var i, j = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = "^", l = 0, m = this.segments = [], n = this.params = {};
        this.source = a;
        for (var q, r, s, t, u; (i = j.exec(a)) && (q = i[2] || i[3], r = i[4] || ("*" == i[1] ? ".*" : "[^/]*"), s = a.substring(l, i.index), t = this.$types[r] || new o({pattern: new RegExp(r)}), u = h(q), !(s.indexOf("?") >= 0));)k += g(s, t.$subPattern(), D(u.value)), f(q, t, u), m.push(s), l = j.lastIndex;
        s = a.substring(l);
        var v = s.indexOf("?");
        if (v >= 0) {
            var w = this.sourceSearch = s.substring(v);
            s = s.substring(0, v), this.sourcePath = a.substring(0, l + v), I(w.substring(1).split(/[&?]/), function (a) {
                f(a, null, h(a))
            })
        } else this.sourcePath = a, this.sourceSearch = "";
        k += g(s) + (d.strict === !1 ? "/?" : "") + "$", m.push(s), this.regexp = new RegExp(k, d.caseInsensitive ? "i" : c), this.prefix = m[0]
    }

    function o(a) {
        J(this, a)
    }

    function p() {
        function a() {
            return {strict: f, caseInsensitive: e}
        }

        function b(a) {
            return E(a) || H(a) && E(a[a.length - 1])
        }

        function c() {
            I(h, function (a) {
                if (n.prototype.$types[a.name])throw new Error("A type named '" + a.name + "' has already been defined.");
                var c = new o(b(a.def) ? d.invoke(a.def) : a.def);
                n.prototype.$types[a.name] = c
            })
        }

        var d, e = !1, f = !0, g = !0, h = [], i = {
            "int": {
                decode: function (a) {
                    return parseInt(a, 10)
                }, is: function (a) {
                    return D(a) ? this.decode(a.toString()) === a : !1
                }, pattern: /\d+/
            }, bool: {
                encode: function (a) {
                    return a ? 1 : 0
                }, decode: function (a) {
                    return 0 === parseInt(a, 10) ? !1 : !0
                }, is: function (a) {
                    return a === !0 || a === !1
                }, pattern: /0|1/
            }, string: {pattern: /[^\/]*/}, date: {
                equals: function (a, b) {
                    return a.toISOString() === b.toISOString()
                }, decode: function (a) {
                    return new Date(a)
                }, encode: function (a) {
                    return [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-")
                }, pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/
            }
        };
        p.$$getDefaultValue = function (a) {
            if (!b(a.value))return a.value;
            if (!d)throw new Error("Injectable functions cannot be called at configuration time");
            return d.invoke(a.value)
        }, this.caseInsensitive = function (a) {
            e = a
        }, this.strictMode = function (a) {
            f = a
        }, this.compile = function (b, c) {
            return new n(b, J(a(), c))
        }, this.isMatcher = function (a) {
            if (!G(a))return !1;
            var b = !0;
            return I(n.prototype, function (c, d) {
                E(c) && (b = b && D(a[d]) && E(a[d]))
            }), b
        }, this.type = function (a, b) {
            return D(b) ? (h.push({name: a, def: b}), g || c(), this) : n.prototype.$types[a]
        }, this.$get = ["$injector", function (a) {
            return d = a, g = !1, n.prototype.$types = {}, c(), I(i, function (a, b) {
                n.prototype.$types[b] || (n.prototype.$types[b] = new o(a))
            }), this
        }]
    }

    function q(a, b) {
        function d(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
        }

        function e(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
                return b["$" === c ? 0 : Number(c)]
            })
        }

        function f(a, b, c) {
            if (!c)return !1;
            var d = a.invoke(b, b, {$match: c});
            return D(d) ? d : !0
        }

        function g(b, c, d, e) {
            function f(a, b, c) {
                return "/" === m ? a : b ? m.slice(0, -1) + a : c ? m.slice(1) + a : a
            }

            function g(a) {
                function c(a) {
                    var c = a(d, b);
                    return c ? (F(c) && b.replace().url(c), !0) : !1
                }

                if (!a || !a.defaultPrevented) {
                    var e, f = i.length;
                    for (e = 0; f > e; e++)if (c(i[e]))return;
                    j && c(j)
                }
            }

            function l() {
                return h = h || c.$on("$locationChangeSuccess", g)
            }

            var m = e.baseHref(), n = b.url();
            return k || l(), {
                sync: function () {
                    g()
                }, listen: function () {
                    return l()
                }, update: function (a) {
                    return a ? void(n = b.url()) : void(b.url() !== n && (b.url(n), b.replace()))
                }, push: function (a, c, d) {
                    b.url(a.format(c || {})), d && d.replace && b.replace()
                }, href: function (c, d, e) {
                    if (!c.validates(d))return null;
                    var g = a.html5Mode(), h = c.format(d);
                    if (e = e || {}, g || null === h || (h = "#" + a.hashPrefix() + h), h = f(h, g, e.absolute), !e.absolute || !h)return h;
                    var i = !g && h ? "/" : "", j = b.port();
                    return j = 80 === j || 443 === j ? "" : ":" + j, [b.protocol(), "://", b.host(), j, i, h].join("")
                }
            }
        }

        var h, i = [], j = null, k = !1;
        this.rule = function (a) {
            if (!E(a))throw new Error("'rule' must be a function");
            return i.push(a), this
        }, this.otherwise = function (a) {
            if (F(a)) {
                var b = a;
                a = function () {
                    return b
                }
            } else if (!E(a))throw new Error("'rule' must be a function");
            return j = a, this
        }, this.when = function (a, c) {
            var g, h = F(c);
            if (F(a) && (a = b.compile(a)), !h && !E(c) && !H(c))throw new Error("invalid 'handler' in when()");
            var i = {
                matcher: function (a, c) {
                    return h && (g = b.compile(c), c = ["$match", function (a) {
                        return g.format(a)
                    }]), J(function (b, d) {
                        return f(b, c, a.exec(d.path(), d.search()))
                    }, {prefix: F(a.prefix) ? a.prefix : ""})
                }, regex: function (a, b) {
                    if (a.global || a.sticky)throw new Error("when() RegExp must not be global or sticky");
                    return h && (g = b, b = ["$match", function (a) {
                        return e(g, a)
                    }]), J(function (c, d) {
                        return f(c, b, a.exec(d.path()))
                    }, {prefix: d(a)})
                }
            }, j = {matcher: b.isMatcher(a), regex: a instanceof RegExp};
            for (var k in j)if (j[k])return this.rule(i[k](a, c));
            throw new Error("invalid 'what' in when()")
        }, this.deferIntercept = function (a) {
            a === c && (a = !0), k = a
        }, this.$get = g, g.$inject = ["$location", "$rootScope", "$injector", "$browser"]
    }

    function r(a, e) {
        function f(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^")
        }

        function h(a, b) {
            if (!a)return c;
            var d = F(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b)throw new Error("No reference point given for path '" + e + "'");
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i])break;
                    if (!k.parent)throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
            }
            var l = v[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l
        }

        function l(a, b) {
            w[a] || (w[a] = []), w[a].push(b)
        }

        function m(b) {
            b = d(b, {
                self: b, resolve: b.resolve || {}, toString: function () {
                    return this.name
                }
            });
            var c = b.name;
            if (!F(c) || c.indexOf("@") >= 0)throw new Error("State must have a valid name");
            if (v.hasOwnProperty(c))throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : F(b.parent) ? b.parent : "";
            if (e && !v[e])return l(e, b.self);
            for (var f in y)E(y[f]) && (b[f] = y[f](b, y.$delegates[f]));
            if (v[c] = b, !b[x] && b.url && a.when(b.url, ["$match", "$stateParams", function (a, c) {
                    u.$current.navigable == b && j(a, c) || u.transitionTo(b, a, {location: !1})
                }]), w[c])for (var g = 0; g < w[c].length; g++)m(w[c][g]);
            return b
        }

        function n(a) {
            return a.indexOf("*") > -1
        }

        function o(a) {
            var b = a.split("."), c = u.$current.name.split(".");
            if ("**" === b[0] && (c = c.slice(c.indexOf(b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(c.indexOf(b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length)return !1;
            for (var d = 0, e = b.length; e > d; d++)"*" === b[d] && (c[d] = "*");
            return c.join("") === b.join("")
        }

        function p(a, b) {
            return F(a) && !D(b) ? y[a] : E(b) && F(a) ? (y[a] && !y.$delegates[a] && (y.$delegates[a] = y[a]), y[a] = b, this) : this
        }

        function q(a, b) {
            return G(a) ? b = a : b.name = a, m(b), this
        }

        function r(a, e, f, l, m, p, q) {
            function r(b, c, d, f) {
                var g = a.$broadcast("$stateNotFound", b, c, d);
                if (g.defaultPrevented)return q.update(), A;
                if (!g.retry)return null;
                if (f.$retry)return q.update(), B;
                var h = u.transition = e.when(g.retry);
                return h.then(function () {
                    return h !== u.transition ? y : (b.options.$retry = !0, u.transitionTo(b.to, b.toParams, b.options))
                }, function () {
                    return A
                }), q.update(), h
            }

            function w(a, c, d, h, i) {
                var j = d ? c : k(g(a.params), c), n = {$stateParams: j};
                i.resolve = m.resolve(a.resolve, n, i.resolve, a);
                var o = [i.resolve.then(function (a) {
                    i.globals = a
                })];
                return h && o.push(h), I(a.views, function (c, d) {
                    var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                    e.$template = [function () {
                        return f.load(d, {view: c, locals: n, params: j}) || ""
                    }], o.push(m.resolve(e, n, i.resolve, a).then(function (f) {
                        if (E(c.controllerProvider) || H(c.controllerProvider)) {
                            var g = b.extend({}, e, n);
                            f.$$controller = l.invoke(c.controllerProvider, null, g)
                        } else f.$$controller = c.controller;
                        f.$$state = a, f.$$controllerAs = c.controllerAs, i[d] = f
                    }))
                }), e.all(o).then(function () {
                    return i
                })
            }

            var y = e.reject(new Error("transition superseded")), z = e.reject(new Error("transition prevented")), A = e.reject(new Error("transition aborted")), B = e.reject(new Error("transition failed"));
            return t.locals = {resolve: null, globals: {$stateParams: {}}}, u = {
                params: {},
                current: t.self,
                $current: t,
                transition: null
            }, u.reload = function () {
                u.transitionTo(u.current, p, {reload: !0, inherit: !1, notify: !1})
            }, u.go = function (a, b, c) {
                return u.transitionTo(a, b, J({inherit: !0, relative: u.$current}, c))
            }, u.transitionTo = function (b, c, f) {
                c = c || {}, f = J({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var m, n = u.$current, o = u.params, v = n.path, A = h(b, f.relative);
                if (!D(A)) {
                    var B = {to: b, toParams: c, options: f}, C = r(B, n.self, o, f);
                    if (C)return C;
                    if (b = B.to, c = B.toParams, f = B.options, A = h(b, f.relative), !D(A)) {
                        if (!f.relative)throw new Error("No such state '" + b + "'");
                        throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
                    }
                }
                if (A[x])throw new Error("Cannot transition to abstract state '" + b + "'");
                f.inherit && (c = i(p, c || {}, u.$current, A)), b = A;
                var E = b.path, F = 0, G = E[F], H = t.locals, I = [];
                if (!f.reload)for (; G && G === v[F] && j(c, o, G.ownParams);)H = I[F] = G.locals, F++, G = E[F];
                if (s(b, n, H, f))return b.self.reloadOnSearch !== !1 && q.update(), u.transition = null, e.when(u.current);
                if (c = k(g(b.params), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, n.self, o).defaultPrevented)return q.update(), z;
                for (var L = e.when(H), M = F; M < E.length; M++, G = E[M])H = I[M] = d(H), L = w(G, c, G === b, L, H);
                var N = u.transition = L.then(function () {
                    var d, e, g;
                    if (u.transition !== N)return y;
                    for (d = v.length - 1; d >= F; d--)g = v[d], g.self.onExit && l.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = F; d < E.length; d++)e = E[d], e.locals = I[d], e.self.onEnter && l.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return u.transition !== N ? y : (u.$current = b, u.current = b.self, u.params = c, K(u.params, p), u.transition = null, f.location && b.navigable && q.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {replace: "replace" === f.location}), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, n.self, o), q.update(!0), u.current)
                }, function (d) {
                    return u.transition !== N ? y : (u.transition = null, m = a.$broadcast("$stateChangeError", b.self, c, n.self, o, d), m.defaultPrevented || q.update(), e.reject(d))
                });
                return N
            }, u.is = function (a, d) {
                var e = h(a);
                return D(e) ? u.$current !== e ? !1 : D(d) && null !== d ? b.equals(p, d) : !0 : c
            }, u.includes = function (a, b) {
                if (F(a) && n(a)) {
                    if (!o(a))return !1;
                    a = u.$current.name
                }
                var d = h(a);
                return D(d) ? D(u.$current.includes[d.name]) ? j(b, p) : !1 : c
            }, u.href = function (a, b, c) {
                c = J({lossy: !0, inherit: !0, absolute: !1, relative: u.$current}, c || {});
                var d = h(a, c.relative);
                if (!D(d))return null;
                c.inherit && (b = i(p, b || {}, u.$current, d));
                var e = d && c.lossy ? d.navigable : d;
                return e && e.url ? q.href(e.url, k(g(d.params), b || {}), {absolute: c.absolute}) : null
            }, u.get = function (a, b) {
                if (0 === arguments.length)return g(v).map(function (a) {
                    return v[a].self
                });
                var c = h(a, b);
                return c && c.self ? c.self : null
            }, u
        }

        function s(a, b, c, d) {
            return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
        }

        var t, u, v = {}, w = {}, x = "abstract", y = {
            parent: function (a) {
                if (D(a.parent) && a.parent)return h(a.parent);
                var b = /^(.+)\.[^.]+$/.exec(a.name);
                return b ? h(b[1]) : t
            }, data: function (a) {
                return a.parent && a.parent.data && (a.data = a.self.data = J({}, a.parent.data, a.data)), a.data
            }, url: function (a) {
                var b = a.url, c = {params: a.params || {}};
                if (F(b))return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || t).url.concat(b, c);
                if (!b || e.isMatcher(b))return b;
                throw new Error("Invalid url '" + b + "' in state '" + a + "'")
            }, navigable: function (a) {
                return a.url ? a : a.parent ? a.parent.navigable : null
            }, params: function (a) {
                return a.params ? a.params : a.url ? a.url.params : a.parent.params
            }, views: function (a) {
                var b = {};
                return I(D(a.views) ? a.views : {"": a}, function (c, d) {
                    d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                }), b
            }, ownParams: function (a) {
                if (a.params = a.params || {}, !a.parent)return g(a.params);
                var b = {};
                I(a.params, function (a, c) {
                    b[c] = !0
                }), I(a.parent.params, function (c, d) {
                    if (!b[d])throw new Error("Missing required parameter '" + d + "' in state '" + a.name + "'");
                    b[d] = !1
                });
                var c = [];
                return I(b, function (a, b) {
                    a && c.push(b)
                }), c
            }, path: function (a) {
                return a.parent ? a.parent.path.concat(a) : []
            }, includes: function (a) {
                var b = a.parent ? J({}, a.parent.includes) : {};
                return b[a.name] = !0, b
            }, $delegates: {}
        };
        t = m({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), t.navigable = null, this.decorator = p, this.state = q, this.$get = r, r.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter"]
    }

    function s() {
        function a(a, b) {
            return {
                load: function (c, d) {
                    var e, f = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return d = J(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                }
            }
        }

        this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
    }

    function t() {
        var a = !1;
        this.useAnchorScroll = function () {
            a = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (b, c) {
            return a ? b : function (a) {
                c(function () {
                    a[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function u(a, c, d) {
        function e() {
            return c.has ? function (a) {
                return c.has(a) ? c.get(a) : null
            } : function (a) {
                try {
                    return c.get(a)
                } catch (b) {
                    return null
                }
            }
        }

        function f(a, b) {
            var c = function () {
                return {
                    enter: function (a, b, c) {
                        b.after(a), c()
                    }, leave: function (a, b) {
                        a.remove(), b()
                    }
                }
            };
            if (i)return {
                enter: function (a, b, c) {
                    i.enter(a, null, b, c)
                }, leave: function (a, b) {
                    i.leave(a, b)
                }
            };
            if (h) {
                var d = h && h(b, a);
                return {
                    enter: function (a, b, c) {
                        d.enter(a, null, b), c()
                    }, leave: function (a, b) {
                        d.leave(a), b()
                    }
                }
            }
            return c()
        }

        var g = e(), h = g("$animator"), i = g("$animate"), j = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function (c, e, g) {
                return function (c, e, h) {
                    function i() {
                        k && (k.remove(), k = null), m && (m.$destroy(), m = null), l && (q.leave(l, function () {
                            k = null
                        }), k = l, l = null)
                    }

                    function j(f) {
                        var j, k = w(h, e.inheritedData("$uiView")), r = k && a.$current && a.$current.locals[k];
                        if (f || r !== n) {
                            j = c.$new(), n = a.$current.locals[k];
                            var s = g(j, function (a) {
                                q.enter(a, e, function () {
                                    (b.isDefined(p) && !p || c.$eval(p)) && d(a)
                                }), i()
                            });
                            l = s, m = j, m.$emit("$viewContentLoaded"), m.$eval(o)
                        }
                    }

                    var k, l, m, n, o = h.onload || "", p = h.autoscroll, q = f(h, c);
                    c.$on("$stateChangeSuccess", function () {
                        j(!1)
                    }), c.$on("$viewContentLoading", function () {
                        j(!1)
                    }), j(!0)
                }
            }
        };
        return j
    }

    function v(a, b, c) {
        return {
            restrict: "ECA", priority: -400, compile: function (d) {
                var e = d.html();
                return function (d, f, g) {
                    var h = c.$current, i = w(g, f.inheritedData("$uiView")), j = h && h.locals[i];
                    if (j) {
                        f.data("$uiView", {name: i, state: j.$$state}), f.html(j.$template ? j.$template : e);
                        var k = a(f.contents());
                        if (j.$$controller) {
                            j.$scope = d;
                            var l = b(j.$$controller, j);
                            j.$$controllerAs && (d[j.$$controllerAs] = l), f.data("$ngControllerController", l), f.children().data("$ngControllerController", l)
                        }
                        k(d)
                    }
                }
            }
        }
    }

    function w(a, b) {
        var c = a.uiView || a.name || "";
        return c.indexOf("@") >= 0 ? c : c + "@" + (b ? b.state.name : "")
    }

    function x(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length)throw new Error("Invalid state ref '" + a + "'");
        return {state: c[1], paramExpr: c[3] || null}
    }

    function y(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0
    }

    function z(a, c) {
        var d = ["location", "inherit", "reload"];
        return {
            restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function (e, f, g, h) {
                var i = x(g.uiSref, a.current.name), j = null, k = y(f) || a.$current, l = "FORM" === f[0].nodeName, m = l ? "action" : "href", n = !0, o = {
                    relative: k,
                    inherit: !0
                }, p = e.$eval(g.uiSrefOpts) || {};
                b.forEach(d, function (a) {
                    a in p && (o[a] = p[a])
                });
                var q = function (b) {
                    if (b && (j = b), n) {
                        var c = a.href(i.state, j, o), d = h[1] || h[0];
                        return d && d.$$setStateInfo(i.state, j), null === c ? (n = !1, !1) : void(f[0][m] = c)
                    }
                };
                i.paramExpr && (e.$watch(i.paramExpr, function (a) {
                    a !== j && q(a)
                }, !0), j = e.$eval(i.paramExpr)), q(), l || f.bind("click", function (b) {
                    var d = b.which || b.button;
                    if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                        var e = c(function () {
                            a.go(i.state, j, o)
                        });
                        b.preventDefault(), b.preventDefault = function () {
                            c.cancel(e)
                        }
                    }
                })
            }
        }
    }

    function A(a, b, c) {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (d, e, f) {
                function g() {
                    h() ? e.addClass(m) : e.removeClass(m)
                }

                function h() {
                    return "undefined" != typeof f.uiSrefActiveEq ? a.$current.self === k && i() : a.includes(k.name) && i()
                }

                function i() {
                    return !l || j(l, b)
                }

                var k, l, m;
                m = c(f.uiSrefActiveEq || f.uiSrefActive || "", !1)(d), this.$$setStateInfo = function (b, c) {
                    k = a.get(b, y(e)), l = c, g()
                }, d.$on("$stateChangeSuccess", g)
            }]
        }
    }

    function B(a) {
        return function (b) {
            return a.is(b)
        }
    }

    function C(a) {
        return function (b) {
            return a.includes(b)
        }
    }

    var D = b.isDefined, E = b.isFunction, F = b.isString, G = b.isObject, H = b.isArray, I = b.forEach, J = b.extend, K = b.copy;
    b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), l.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", l), m.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", m), n.prototype.concat = function (a, b) {
        return new n(this.sourcePath + a + this.sourceSearch, b)
    }, n.prototype.toString = function () {
        return this.source
    }, n.prototype.exec = function (a, b) {
        var c = this.regexp.exec(a);
        if (!c)return null;
        b = b || {};
        var d, e, f, g = this.parameters(), h = g.length, i = this.segments.length - 1, j = {};
        if (i !== c.length - 1)throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (d = 0; i > d; d++)f = g[d], e = this.params[f], j[f] = e.$value(c[d + 1]);
        for (; h > d; d++)f = g[d], e = this.params[f], j[f] = e.$value(b[f]);
        return j
    }, n.prototype.parameters = function (a) {
        return D(a) ? this.params[a] || null : g(this.params)
    }, n.prototype.validates = function (a) {
        var b, c, d = !0, e = this;
        return I(a, function (a, f) {
            e.params[f] && (c = e.params[f], b = !a && D(c.value), d = d && (b || c.type.is(a)))
        }), d
    }, n.prototype.format = function (a) {
        var b = this.segments, c = this.parameters();
        if (!a)return b.join("").replace("//", "/");
        var d, e, f, g, h, i, j = b.length - 1, k = c.length, l = b[0];
        if (!this.validates(a))return null;
        for (d = 0; j > d; d++)g = c[d], f = a[g], h = this.params[g], (D(f) || "/" !== b[d] && "/" !== b[d + 1]) && (null != f && (l += encodeURIComponent(h.type.encode(f))), l += b[d + 1]);
        for (; k > d; d++)g = c[d], f = a[g], null != f && (i = H(f), i && (f = f.map(encodeURIComponent).join("&" + g + "=")), l += (e ? "&" : "?") + g + "=" + (i ? f : encodeURIComponent(f)), e = !0);
        return l
    }, n.prototype.$types = {}, o.prototype.is = function () {
        return !0
    }, o.prototype.encode = function (a) {
        return a
    }, o.prototype.decode = function (a) {
        return a
    }, o.prototype.equals = function (a, b) {
        return a == b
    }, o.prototype.$subPattern = function () {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2)
    }, o.prototype.pattern = /.*/, b.module("ui.router.util").provider("$urlMatcherFactory", p), q.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", q), r.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", r), s.$inject = [], b.module("ui.router.state").provider("$view", s), b.module("ui.router.state").provider("$uiViewScroll", t), u.$inject = ["$state", "$injector", "$uiViewScroll"], v.$inject = ["$compile", "$controller", "$state"], b.module("ui.router.state").directive("uiView", u), b.module("ui.router.state").directive("uiView", v), z.$inject = ["$state", "$timeout"], A.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", z).directive("uiSrefActive", A).directive("uiSrefActiveEq", A), B.$inject = ["$state"], C.$inject = ["$state"], b.module("ui.router.state").filter("isState", B).filter("includedByState", C)
}(window, window.angular);

/*! 
 * angular-loading-bar v0.7.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2015 Wes Cruver
 * License: MIT
 */
!function () {
    "use strict";
    angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]), angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]), angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).config(["$httpProvider", function (a) {
        var b = ["$q", "$cacheFactory", "$timeout", "$rootScope", "$log", "cfpLoadingBar", function (b, c, d, e, f, g) {
            function h() {
                d.cancel(j), g.complete(), l = 0, k = 0
            }

            function i(b) {
                var d, e = c.get("$http"), f = a.defaults;
                !b.cache && !f.cache || b.cache === !1 || "GET" !== b.method && "JSONP" !== b.method || (d = angular.isObject(b.cache) ? b.cache : angular.isObject(f.cache) ? f.cache : e);
                var g = void 0 !== d ? void 0 !== d.get(b.url) : !1;
                return void 0 !== b.cached && g !== b.cached ? b.cached : (b.cached = g, g)
            }

            var j, k = 0, l = 0, m = g.latencyThreshold;
            return {
                request: function (a) {
                    return a.ignoreLoadingBar || i(a) || (e.$broadcast("cfpLoadingBar:loading", {url: a.url}), 0 === k && (j = d(function () {
                        g.start()
                    }, m)), k++, g.set(l / k)), a
                }, response: function (a) {
                    return a.config.ignoreLoadingBar || i(a.config) || (l++, e.$broadcast("cfpLoadingBar:loaded", {
                        url: a.config.url,
                        result: a
                    }), l >= k ? h() : g.set(l / k)), a
                }, responseError: function (a) {
                    return a.config || f.error("Other interceptors are not returning config object \n https://github.com/chieffancypants/angular-loading-bar/pull/50"), a.config.ignoreLoadingBar || i(a.config) || (l++, e.$broadcast("cfpLoadingBar:loaded", {
                        url: a.config.url,
                        result: a
                    }), l >= k ? h() : g.set(l / k)), b.reject(a)
                }
            }
        }];
        a.interceptors.push(b)
    }]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function () {
        this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function (a, b, c, d) {
            function e() {
                k || (k = a.get("$animate"));
                var e = b.find(n).eq(0);
                c.cancel(m), r || (d.$broadcast("cfpLoadingBar:started"), r = !0, u && k.enter(o, e, angular.element(e[0].lastChild)), t && k.enter(q, e, angular.element(e[0].lastChild)), f(v))
            }

            function f(a) {
                if (r) {
                    var b = 100 * a + "%";
                    p.css("width", b), s = a, c.cancel(l), l = c(function () {
                        g()
                    }, 250)
                }
            }

            function g() {
                if (!(h() >= 1)) {
                    var a = 0, b = h();
                    a = b >= 0 && .25 > b ? (3 * Math.random() + 3) / 100 : b >= .25 && .65 > b ? 3 * Math.random() / 100 : b >= .65 && .9 > b ? 2 * Math.random() / 100 : b >= .9 && .99 > b ? .005 : 0;
                    var c = h() + a;
                    f(c)
                }
            }

            function h() {
                return s
            }

            function i() {
                s = 0, r = !1
            }

            function j() {
                k || (k = a.get("$animate")), d.$broadcast("cfpLoadingBar:completed"), f(1), c.cancel(m), m = c(function () {
                    var a = k.leave(o, i);
                    a && a.then && a.then(i), k.leave(q)
                }, 500)
            }

            var k, l, m, n = this.parentSelector, o = angular.element(this.loadingBarTemplate), p = o.find("div").eq(0), q = angular.element(this.spinnerTemplate), r = !1, s = 0, t = this.includeSpinner, u = this.includeBar, v = this.startSize;
            return {
                start: e,
                set: f,
                status: h,
                inc: g,
                complete: j,
                includeSpinner: this.includeSpinner,
                latencyThreshold: this.latencyThreshold,
                parentSelector: this.parentSelector,
                startSize: this.startSize
            }
        }]
    })
}();
//# sourceMappingURL=core_main.js.map