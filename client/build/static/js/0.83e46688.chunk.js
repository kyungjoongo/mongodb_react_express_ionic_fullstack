(this["webpackJsonpphoto-gallery"]=this["webpackJsonpphoto-gallery"]||[]).push([[0],{2163:function(t,e,r){"use strict";r.r(e),r.d(e,"createSwipeBackGesture",(function(){return o}));var n=r(38),a=r(212),o=(r(120),function(t,e,r,o,i){var c=t.ownerDocument.defaultView;return Object(a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:r,onMove:function(t){var e=t.deltaX/c.innerWidth;o(e)},onEnd:function(t){var e=t.deltaX,r=c.innerWidth,a=e/r,o=t.velocityX,u=r/2,s=o>=0&&(o>.2||t.deltaX>u),h=(s?1-a:a)*r,l=0;if(h>5){var d=h/Math.abs(o);l=Math.min(d,540)}i(s,a<=0?.01:Object(n.j)(0,a,.9999),l)}})})}}]);
//# sourceMappingURL=0.83e46688.chunk.js.map