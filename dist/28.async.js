(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[28],{"vW+e":function(t,e,n){(function(t){t(n("VrN/"))})(function(t){"use strict";var e=function(t){return new RegExp("^(?:"+t.join("|")+")$","i")};t.defineMode("cypher",function(n){var i,r=function(t){var e=t.next();if('"'===e)return t.match(/.*?"/),"string";if("'"===e)return t.match(/.*?'/),"string";if(/[{}\(\),\.;\[\]]/.test(e))return i=e,"node";if("/"===e&&t.eat("/"))return t.skipToEnd(),"comment";if(u.test(e))return t.eatWhile(u),null;if(t.eatWhile(/[_\w\d]/),t.eat(":"))return t.eatWhile(/[\w\d_\-]/),"atom";var n=t.current();return s.test(n)?"builtin":l.test(n)?"def":d.test(n)?"keyword":"variable"},o=function(t,e,n){return t.context={prev:t.context,indent:t.indent,col:n,type:e}},a=function(t){return t.indent=t.context.indent,t.context=t.context.prev},c=n.indentUnit,s=e(["abs","acos","allShortestPaths","asin","atan","atan2","avg","ceil","coalesce","collect","cos","cot","count","degrees","e","endnode","exp","extract","filter","floor","haversin","head","id","keys","labels","last","left","length","log","log10","lower","ltrim","max","min","node","nodes","percentileCont","percentileDisc","pi","radians","rand","range","reduce","rel","relationship","relationships","replace","reverse","right","round","rtrim","shortestPath","sign","sin","size","split","sqrt","startnode","stdev","stdevp","str","substring","sum","tail","tan","timestamp","toFloat","toInt","toString","trim","type","upper"]),l=e(["all","and","any","contains","exists","has","in","none","not","or","single","xor"]),d=e(["as","asc","ascending","assert","by","case","commit","constraint","create","csv","cypher","delete","desc","descending","detach","distinct","drop","else","end","ends","explain","false","fieldterminator","foreach","from","headers","in","index","is","join","limit","load","match","merge","null","on","optional","order","periodic","profile","remove","return","scan","set","skip","start","starts","then","true","union","unique","unwind","using","when","where","with","call","yield"]),u=/[*+\-<>=&|~%^]/;return{startState:function(){return{tokenize:r,context:null,indent:0,col:0}},token:function(t,e){if(t.sol()&&(e.context&&null==e.context.align&&(e.context.align=!1),e.indent=t.indentation()),t.eatSpace())return null;var n=e.tokenize(t,e);if("comment"!==n&&e.context&&null==e.context.align&&"pattern"!==e.context.type&&(e.context.align=!0),"("===i)o(e,")",t.column());else if("["===i)o(e,"]",t.column());else if("{"===i)o(e,"}",t.column());else if(/[\]\}\)]/.test(i)){while(e.context&&"pattern"===e.context.type)a(e);e.context&&i===e.context.type&&a(e)}else"."===i&&e.context&&"pattern"===e.context.type?a(e):/atom|string|variable/.test(n)&&e.context&&(/[\}\]]/.test(e.context.type)?o(e,"pattern",t.column()):"pattern"!==e.context.type||e.context.align||(e.context.align=!0,e.context.col=t.column()));return n},indent:function(e,n){var i=n&&n.charAt(0),r=e.context;if(/[\]\}]/.test(i))while(r&&"pattern"===r.type)r=r.prev;var o=r&&i===r.type;return r?"keywords"===r.type?t.commands.newlineAndIndent:r.align?r.col+(o?0:1):r.indent+(o?0:c):0}}}),t.modeExtensions["cypher"]={autoFormatLineBreaks:function(t){for(var e=t.split("\n"),n=/\s+\b(return|where|order by|match|with|skip|limit|create|delete|set)\b\s/g,i=0;i<e.length;i++)e[i]=e[i].replace(n," \n$1 ").trim();return e.join("\n")}},t.defineMIME("application/x-cypher-query","cypher")})}}]);