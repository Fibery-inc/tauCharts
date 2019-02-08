/*!
 * /*
 * taucharts@2.6.5 (2019-02-08)
 * Copyright 2019 Targetprocess, Inc.
 * Licensed under Apache License 2.0
 * * /
 * 
 */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e(require("taucharts"));else if("function"==typeof define&&define.amd)define(["taucharts"],e);else{var o="object"==typeof exports?e(require("taucharts")):e(t.Taucharts);for(var i in o)("object"==typeof exports?exports:t)[i]=o[i]}}(window,function(t){return function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=31)}({0:function(e,o){e.exports=t},31:function(t,e,o){"use strict";o.r(e);var i=o(0),n=o.n(i),r=n.a.api.utils;function a(t){r.defaults(t||{},{});return{init:function(t){this._cursor=null,this._chart=t,this._tooltip=t.addBalloon({spacing:3,auto:!0,effectClass:"fade"}),this._tooltip.content(this.template),this._tooltip.getElement().addEventListener("click",function(t){for(var e=t.target;e!==t.currentTarget&&null!==e;)e.classList.contains("i-role-exclude")&&o._exclude(),e=e.parentNode;o._tooltip.hide()},!1);var e,o=this;this.showTooltip=function(t){clearTimeout(e),o._cursor=t.data;var i=o._tooltip.getElement().querySelectorAll(".i-role-content");i[0]&&(i[0].innerHTML=Object.keys(t.data).map(function(e){return o.itemTemplate({label:e,value:t.data[e]})}).join("")),o._tooltip.show(t.event.pageX,t.event.pageY).updateSize()},this.hideTooltip=function(t){e=setTimeout(function(){o._tooltip.hide()},1e3)},this._tooltip.getElement().addEventListener("mouseover",function(t){clearTimeout(e)},!1),this._tooltip.getElement().addEventListener("mouseleave",function(t){o._tooltip.hide()},!1)},_exclude:function(){this._chart.addFilter({tag:"exclude",predicate:function(t){return function(e){return JSON.stringify(e)!==JSON.stringify(t)}}(this._cursor)}),this._chart.refresh()},onRender:function(t){var e=this;t.select(function(t){return"PARALLEL/ELEMENT.LINE"===t.config.type}).forEach(function(t){t.on("mouseout",function(t,o){e.hideTooltip(o)}),t.on("mouseover",function(t,o){e.showTooltip(o)})})},template:['<div class="tau-chart__tooltip__buttons tau-chart__tooltip__clickable">','<div class="tau-chart__tooltip__button i-role-exclude">','<div class="tau-chart__tooltip__button__wrap">','<span class="tau-icon-close-gray"></span>',"Exclude","</div>","</div>","</div>",'<div class="i-role-content tau-chart__tooltip__content"></div>'].join(""),itemTemplate:r.template(['<div class="tau-chart__tooltip__list__item">','<div class="tau-chart__tooltip__list__elem"><%=label%></div>','<div class="tau-chart__tooltip__list__elem"><%=value%></div>',"</div>"].join(""))}}n.a.api.plugins.add("parallel-tooltip",a),e.default=a}})});