(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[37],{rSpl:function(e,t,n){(function(e){e(n("VrN/"))})(function(e){"use strict";e.defineMode("ecl",function(e){function t(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}function n(e,t){return!!t.startOfLine&&(e.skipToEnd(),"meta")}var r,i=e.indentUnit,a=t("abs acos allnodes ascii asin asstring atan atan2 ave case choose choosen choosesets clustersize combine correlation cos cosh count covariance cron dataset dedup define denormalize distribute distributed distribution ebcdic enth error evaluate event eventextra eventname exists exp failcode failmessage fetch fromunicode getisvalid global graph group hash hash32 hash64 hashcrc hashmd5 having if index intformat isvalid iterate join keyunicode length library limit ln local log loop map matched matchlength matchposition matchtext matchunicode max merge mergejoin min nolocal nonempty normalize parse pipe power preload process project pull random range rank ranked realformat recordof regexfind regexreplace regroup rejected rollup round roundup row rowdiff sample set sin sinh sizeof soapcall sort sorted sqrt stepped stored sum table tan tanh thisnode topn tounicode transfer trim truncate typeof ungroup unicodeorder variance which workunit xmldecode xmlencode xmltext xmlunicode"),o=t("apply assert build buildindex evaluate fail keydiff keypatch loadxml nothor notify output parallel sequential soapcall wait"),l=t("__compressed__ all and any as atmost before beginc++ best between case const counter csv descend encrypt end endc++ endmacro except exclusive expire export extend false few first flat from full function group header heading hole ifblock import in interface joined keep keyed last left limit load local locale lookup macro many maxcount maxlength min skew module named nocase noroot noscan nosort not of only opt or outer overwrite packed partition penalty physicallength pipe quote record relationship repeat return right scan self separator service shared skew skip sql store terminator thor threshold token transform trim true type unicodeorder unsorted validate virtual whole wild within xml xpath"),s=t("ascii big_endian boolean data decimal ebcdic integer pattern qstring real record rule set of string token udecimal unicode unsigned varstring varunicode"),c=t("checkpoint deprecated failcode failmessage failure global independent onwarning persist priority recovery stored success wait when"),u=t("catch class do else finally for if switch try while"),p=t("true false null"),d={"#":n},m=/[+\-*&%=<>!?|\/]/;function f(e,t){var n=e.next();if(d[n]){var i=d[n](e,t);if(!1!==i)return i}if('"'==n||"'"==n)return t.tokenize=h(n),t.tokenize(e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return r=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),"number";if("/"==n){if(e.eat("*"))return t.tokenize=y,y(e,t);if(e.eat("/"))return e.skipToEnd(),"comment"}if(m.test(n))return e.eatWhile(m),"operator";e.eatWhile(/[\w\$_]/);var f=e.current().toLowerCase();if(a.propertyIsEnumerable(f))return u.propertyIsEnumerable(f)&&(r="newstatement"),"keyword";if(o.propertyIsEnumerable(f))return u.propertyIsEnumerable(f)&&(r="newstatement"),"variable";if(l.propertyIsEnumerable(f))return u.propertyIsEnumerable(f)&&(r="newstatement"),"variable-2";if(s.propertyIsEnumerable(f))return u.propertyIsEnumerable(f)&&(r="newstatement"),"variable-3";if(c.propertyIsEnumerable(f))return u.propertyIsEnumerable(f)&&(r="newstatement"),"builtin";var b=f.length-1;while(b>=0&&(!isNaN(f[b])||"_"==f[b]))--b;if(b>0){var w=f.substr(0,b+1);if(s.propertyIsEnumerable(w))return u.propertyIsEnumerable(w)&&(r="newstatement"),"variable-3"}return p.propertyIsEnumerable(f)?"atom":null}function h(e){return function(t,n){var r,i=!1,a=!1;while(null!=(r=t.next())){if(r==e&&!i){a=!0;break}i=!i&&"\\"==r}return!a&&i||(n.tokenize=f),"string"}}function y(e,t){var n,r=!1;while(n=e.next()){if("/"==n&&r){t.tokenize=f;break}r="*"==n}return"comment"}function b(e,t,n,r,i){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=i}function w(e,t,n){return e.context=new b(e.indented,t,n,null,e.context)}function g(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}return{startState:function(e){return{tokenize:null,context:new b((e||0)-i,0,"top",!1),indented:0,startOfLine:!0}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0),e.eatSpace())return null;r=null;var i=(t.tokenize||f)(e,t);if("comment"==i||"meta"==i)return i;if(null==n.align&&(n.align=!0),";"!=r&&":"!=r||"statement"!=n.type)if("{"==r)w(t,e.column(),"}");else if("["==r)w(t,e.column(),"]");else if("("==r)w(t,e.column(),")");else if("}"==r){while("statement"==n.type)n=g(t);"}"==n.type&&(n=g(t));while("statement"==n.type)n=g(t)}else r==n.type?g(t):("}"==n.type||"top"==n.type||"statement"==n.type&&"newstatement"==r)&&w(t,e.column(),"statement");else g(t);return t.startOfLine=!1,i},indent:function(e,t){if(e.tokenize!=f&&null!=e.tokenize)return 0;var n=e.context,r=t&&t.charAt(0);"statement"==n.type&&"}"==r&&(n=n.prev);var a=r==n.type;return"statement"==n.type?n.indented+("{"==r?0:i):n.align?n.column+(a?0:1):n.indented+(a?0:i)},electricChars:"{}"}}),e.defineMIME("text/x-ecl","ecl")})}}]);