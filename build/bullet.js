'use strict';function d(){return function(){}}var g=this;function i(a,b){var c=a.split("."),e=g;!(c[0]in e)&&e.execScript&&e.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)!c.length&&void 0!==b?e[f]=b:e=e[f]?e[f]:e[f]={}};i("btGetVersion",function(){return 279});var j;j=function(a){return a};i("btScalar",j);function k(a){return Math.sqrt(a)}i("btSqrt",k);function l(a){return Math.abs(a)}i("btFabs",l);function n(a){return Math.cos(a)}i("btCos",n);function o(a){return Math.sin(a)}i("btSin",o);i("btTan",function(a){return Math.tan(a)});function p(a){a<j(-1)&&(a=j(-1));a>j(1)&&(a=j(1));return Math.acos(a)}i("btAcos",p);i("btAsin",function(a){a<j(-1)&&(a=j(-1));a>j(1)&&(a=j(1));return Math.asin(a)});i("btAtan",function(a){return Math.atan(a)});
i("btAtan2",function(a,b){return Math.atan2(a,b)});i("btExp",function(a){return Math.exp(a)});i("btLog",function(a){return Math.log(a)});i("btPow",function(a,b){return Math.pow(a,b)});i("btFmod",function(a,b){return a%b});i("btAtan2Fast",function(a,b){var c=l(a),c=0<=b?0.7853981633974483-0.7853981633974483*((b-c)/(b+c)):2.356194490192345-0.7853981633974483*((b+c)/(c-b));return 0>a?-c:c});i("btFuzzyZero",function(a){return 1.1920928955078125E-7>l(a)});i("btEqual",function(a,b){return a<=b&&a>=-b});
i("btGreaterEqual",function(a,b){return a>b});i("btIsNegative",function(a){return 0>a?1:0});i("btRadians",function(a){return 0.017453292519943295*a});i("btDegrees",function(a){return 57.29577951308232*a});i("btFsel",function(a,b,c){return 0<=a?b:c});i("btMachineIsLittleEndian",function(){var a=new Int32Array([1]);return 1==(new Int8Array(a.buffer))[0]?!0:!1});i("btSelect",d());i("btSelect_a",function(a,b,c){a=(a|-a)>>31;return b&a|c&~a});i("btSelect_b",function(a,b,c){return 0!==a?b:c});
i("btSwap",d());i("btSwapEndian",d());function q(a){return(a&4278190080)>>24|(a&16711680)>>8|(a&65280)<<8|(a&255)<<24}i("btSwapEndian_a",q);function r(a){return(a&65280)>>8|(a&255)<<8}i("btSwapEndian_b",r);i("btSwapEndian_c",function(a){return q(a)});i("btSwapEndian_d",function(a){return r(a)});i("btSwapEndianFloat",function(a){var b=new Float32Array(1);b[0]=a;var a=new Int32Array(1),b=new Uint8Array(b.buffer),c=new Uint8Array(a.buffer);c[0]=b[3];c[1]=b[2];c[2]=b[1];c[3]=b[0];return a[0]});
i("btUnswapEndianFloat",function(a){var b=new Int32Array(1);b[0]=a;var a=new Float32Array(1),b=new Uint8Array(b.buffer),c=new Uint8Array(a.buffer);c[0]=b[3];c[1]=b[2];c[2]=b[1];c[3]=b[0];return a[0]});i("btSwapEndianDouble",d());i("btUnswapEndianDouble",d());i("btNormalizeAngle",function(a){a%=6.283185307179586;return-3.141592653589793>a?a+6.283185307179586:3.141592653589793<a?a-6.283185307179586:a});function s(a){this.w=a}i("btTypedObject",s);s.prototype={};s.prototype=s.prototype;function t(a,b,c){this.a=new Float32Array(4);this.a[0]=a;this.a[1]=b;this.a[2]=c;this.a[3]=0}
t.prototype={g:d(),m:function(a){this.a[0]*=a;this.a[1]*=a;this.a[2]*=a;return this},l:function(){return this},d:function(a){return this.a[0]*a.a[0]+this.a[1]*a.a[1]+this.a[2]*a.a[2]},e:function(){return this.d(this)},length:function(){return k(this.e())},normalize:function(){return this.l(this.length())},f:function(a){var b=k(this.e()*a.e());return p(this.d(a)/b)},o:function(a){return new t(this.a[1]*a.a[2]-this.a[2]*a.a[1],this.a[2]*a.a[0]-this.a[0]*a.a[2],this.a[0]*a.a[1]-this.a[1]*a.a[0])},r:function(a){this.a[0]*=
a.a[0];this.a[1]*=a.a[1];this.a[2]*=a.a[2];return this},i:function(){return this.a[0]},j:function(){return this.a[1]},k:function(){return this.a[2]},x:function(){return this.a[0]},y:function(){return this.a[1]},b:function(){return this.a[2]},c:function(){return this.a[3]},h:function(a,b,c){this.a[0]=a;this.a[1]=b;this.a[2]=c;this.a[3]=0}};function u(a,b,c,e){this.a=new Float32Array(4);this.a[0]=a;this.a[1]=b;this.a[2]=c;this.a[3]=e}u.prototype={i:function(){return this.a[0]},j:function(){return this.a[1]},k:function(){return this.a[2]},x:function(){return this.a[0]},y:function(){return this.a[1]},b:function(){return this.a[2]},c:function(){return this.a[3]},h:d()};var v;v=function(){u.call(this)};function w(a,b,c,e){u.call(this,a,b,c,e)}
v.prototype=w.prototype=function(a,b){u.call(this);this.t(a,b)}.prototype=function(a,b,c){u.call(this);this.s(a,b,c)}.prototype={t:function(a,b){var c=a.length(),c=o(0.5*b)/c;this.h(a.x()*c,a.y()*c,a.b()*c,n(0.5*b))},s:function(a,b,c){var a=0.5*a,e=0.5*b,b=0.5*c,c=n(a),a=o(a),f=n(e),e=o(e),h=n(b),b=o(b);this.h(h*e*c+b*f*a,h*f*a-b*e*c,b*f*c-h*e*a,h*f*c+b*e*a)},m:function(a){this.a[0]*=a;this.a[1]*=a;this.a[2]*=a;this.a[3]*=a;return this},d:function(a){return this.a[0]*a.x()+this.a[1]*a.y()+this.a[2]*
a.b()+this.a[3]*a.a[3]},e:function(){return this.d(this)},length:function(){return k(this.e())},normalize:function(){return this.p(this.length())},g:function(a){return new w(this.x()*a,this.y()*a,this.b()*a,this.a[3]*a)},p:function(a){return this.g(1/a)},l:function(a){return this.m(1/a)},f:function(a){var b=k(this.e()*a.e());return p(this.d(a)/b)},inverse:function(){return new w(-this.a[0],-this.a[1],-this.a[2],this.a[3])},n:function(a,b){var c=this.f(a);if(0!==c){var e=1/o(c),f=o((1-b)*c),c=o(b*
c);return 0>this.d(a)?new v((this.a[0]*f+-a.x()*c)*e,(this.a[1]*f+-a.y()*c)*e):new v((this.a[0]*f+a.x()*c)*e,(this.a[1]*f+a.y()*c)*e)}return this}};v.v=function(){return new v};v.g=d();v.q=function(a,b){return new v(a.c()*b.x()+a.x()*b.c()+a.y()*b.b()-a.b()*b.y(),a.c()*b.y()+a.y()*b.c()+a.b()*b.x()-a.x()*b.b(),a.c()*b.b()+a.b()*b.c()+a.x()*b.y()-a.y()*b.x(),a.c()*b.c()-a.x()*b.x()-a.y()*b.y()-a.b()*b.b())};
v.r=function(a,b){return new v(a.c()*b.x()+a.y()*b.b()-a.b()*b.y(),a.c()*b.y()+a.b()*b.x()-a.x()*b.b(),a.c()*b.b()+a.x()*b.y()-a.y()*b.x(),-a.x()*b.x()-a.y()*b.y()-a.b()*b.b())};v.z=function(a,b){return v(a.x()*b.c()+a.y()*b.b()-a.b()*b.y(),a.y()*b.c()+a.b()*b.x()-a.x()*b.b(),a.b()*b.c()+a.x()*b.y()-a.y()*b.x(),-a.x()*b.x()-a.y()*b.y()-a.b()*b.b())};v.d=function(a,b){return a.d(b)};v.length=function(a){return a.length()};v.f=function(a,b){return a.f(b)};v.inverse=function(a){return a.inverse()};
v.n=function(a,b,c){return a.n(b,c)};v.A=function(a,b){var c=v.q(a,b);a.inverse();return new t(c.i(),c.j(),c.k())};v.u=function(a,b){a.o(b);if(-0.9999998807907104>a.d(b)){var c,e,f=a.a,h=(void 0).a,m=(void 0).a;0.7071067811865476<l(f[2])?(c=f[1]*f[1]+f[2]*f[2],e=1/k(c),h[0]=0,h[1]=-f[2]*e,h[2]=f[1]*e,m[0]=c*e,m[1]=-f[0]*h[2],m[2]=f[0]*h[1]):(c=f[0]*f[0]+f[1]*f[1],e=1/k(c),h[0]=-f[1]*e,h[1]=f[0]*e,h[2]=0,m[0]=-f[2]*h[1],m[1]=f[2]*h[0],m[2]=c*e);return new v((void 0).x(),(void 0).y())}return new v};
v.B=function(a,b){a.normalize();b.normalize();return v.u(a,b)};