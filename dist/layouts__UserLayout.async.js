(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{BOD2:function(t,a,e){t.exports={container:"antd-pro-layouts-user-layout-container",lang:"antd-pro-layouts-user-layout-lang",content:"antd-pro-layouts-user-layout-content",top:"antd-pro-layouts-user-layout-top",header:"antd-pro-layouts-user-layout-header",logo:"antd-pro-layouts-user-layout-logo",title:"antd-pro-layouts-user-layout-title",desc:"antd-pro-layouts-user-layout-desc"}},jH8a:function(t,a,e){"use strict";e.r(a);var n=e("2Taf"),o=e.n(n),r=e("vZ4D"),u=e.n(r),l=e("l4Ni"),c=e.n(l),s=e("ujKo"),p=e.n(s),i=e("MhPg"),y=e.n(i),d=(e("Pwec"),e("CtXQ")),m=e("q1tI"),h=e.n(m),g=(e("Y2fQ"),e("MuoO")),b=(e("ggcP"),e("ZFw/")),f=e.n(b),v=e("BOD2"),w=e.n(v),D=(e("mxmt"),e("tGQQ")),M=(h.a.createElement(m["Fragment"],null,"Copyright ",h.a.createElement(d["a"],{type:"copyright"})," 2018 \u8682\u8681\u91d1\u670d\u4f53\u9a8c\u6280\u672f\u90e8\u51fa\u54c1"),function(t){function a(){return o()(this,a),c()(this,p()(a).apply(this,arguments))}return y()(a,t),u()(a,[{key:"componentDidMount",value:function(){var t=this.props,a=t.dispatch,e=t.route,n=e.routes,o=e.authority;a({type:"menu/getMenuData",payload:{routes:n,authority:o}})}},{key:"render",value:function(){var t=this.props,a=t.children,e=t.location.pathname,n=t.breadcrumbNameMap;return h.a.createElement(f.a,{title:Object(D["a"])(e,n)},h.a.createElement("div",{className:w.a.container},h.a.createElement("div",{className:w.a.content},a)))}}]),a}(m["Component"]));a["default"]=Object(g["connect"])(function(t){var a=t.menu;return{menuData:a.menuData,breadcrumbNameMap:a.breadcrumbNameMap}})(M)}}]);