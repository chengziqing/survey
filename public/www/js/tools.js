Array.prototype.del = function(n) {　
  if (n < 0)　 {　
    return this;
  }　
  else {　　
    return this.slice(0, n).concat(this.slice(n + 1, this.length));
  }

}
Date.prototype.Format = function(fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var imgReady = (function() {
  var list = [],
    intervalId = null,

    // 用来执行队列
    tick = function() {
      var i = 0;
      for (; i < list.length; i++) {
        list[i].end ? list.splice(i--, 1) : list[i]();
      };
      !list.length && stop();
    },

    // 停止所有定时器队列
    stop = function() {
      clearInterval(intervalId);
      intervalId = null;
    };

  return function(url, ready, load, error) {
    var onready, width, height, newWidth, newHeight,
      img = new Image();

    img.src = url;

    // 如果图片被缓存，则直接返回缓存数据
    if (img.complete) {
      ready.call(img);
      load && load.call(img);
      return;
    };

    width = img.width;
    height = img.height;

    // 加载错误后的事件
    img.onerror = function() {
      error && error.call(img);
      onready.end = true;
      img = img.onload = img.onerror = null;
    };

    // 图片尺寸就绪
    onready = function() {
      newWidth = img.width;
      newHeight = img.height;
      if (newWidth !== width || newHeight !== height ||
        // 如果图片已经在其他地方加载可使用面积检测
        newWidth * newHeight > 1024
      ) {
        ready.call(img);
        onready.end = true;
      };
    };
    onready();

    // 完全加载完毕的事件
    img.onload = function() {
      // onload在定时器时间差范围内可能比onready快
      // 这里进行检查并保证onready优先执行
      !onready.end && onready();

      load && load.call(img);

      // IE gif动画会循环执行onload，置空onload即可
      img = img.onload = img.onerror = null;
    };

    // 加入队列中定期执行
    if (!onready.end) {
      list.push(onready);
      // 无论何时只允许出现一个定时器，减少浏览器性能损耗
      if (intervalId === null) intervalId = setInterval(tick, 40);
    };
  };
})();

 (function(window,localStorage,undefined){
  var LS = {
      set : function(key, value){
          //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
          //这时一般在setItem之前，先removeItem()就ok了
          if( this.get(key) !== null )
              this.remove(key);
          localStorage.setItem(key, value);
      },
     //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
     get : function(key){
         var v = localStorage.getItem(key);
         return v === undefined ? null : v;
     },
     remove : function(key){ localStorage.removeItem(key); },
     clear : function(){ localStorage.clear(); },
     each : function(fn){
         var n = localStorage.length, i = 0, fn = fn || function(){}, key;
         for(; i<n; i++){
             key = localStorage.key(i);
             if( fn.call(this, key, this.get(key)) === false )
                 break;
             //如果内容被删除，则总长度和索引都同步减少
             if( localStorage.length < n ){
                 n --;
                 i --;
             }
        }
    }
 },
 j = window.jQuery, c = window.Core;
 //扩展到相应的对象上
 window.LS = window.LS || LS;
 //扩展到其他主要对象上
 if(j) j.LS = j.LS || LS;
 if(c) c.LS = c.LS || LS;
 })(window,window.localStorage);

 /*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
 
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
 
/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
  };
 
  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };
  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();