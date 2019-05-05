;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
    //如果头部含有强制转换DPR的meta标签，使用原有项。如果没有采用适配方案。
    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        // console.log(match)
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));    
            }
        }
    }

    //对于不同设备做不同DPR设置和缩放
    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var isIPad = win.navigator.appVersion.match(/ipad/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            //IOS设备有dpr为1，2，3的方案
            if (devicePixelRatio >= 4.5 && (!dpr || dpr >= 4.5)) {
                dpr = 4.5;
            } else if (devicePixelRatio >= 4 && (!dpr || dpr >= 4)) {
                dpr = 4;
            } else if (devicePixelRatio >= 3.75 && (!dpr || dpr >= 3.75)) {
                dpr = 3.8;
            } else if (devicePixelRatio >= 3.5 && (!dpr || dpr >= 3.5)) {
                dpr = 3.5;
            } else if (devicePixelRatio >= 3.25 && (!dpr || dpr >= 3.25)){
                dpr = 3.3;
            } else if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2.9 && (!dpr || dpr >= 2.9)) {
                dpr = 2.9;
            } else if (devicePixelRatio >= 2.8 && (!dpr || dpr >= 2.8)) {
                dpr = 2.8;
            } else if (devicePixelRatio >= 2.7 && (!dpr || dpr >= 2.7)) {
                dpr = 2.7;
            } else if (devicePixelRatio >= 2.6 && (!dpr || dpr >= 2.6)) {
                dpr = 2.6;
            } else if (devicePixelRatio >= 2.5 && (!dpr || dpr >= 2.5)) {
                dpr = 2.5;
            } else if (devicePixelRatio >= 2.4 && (!dpr || dpr >= 2.4)) {
                dpr = 2.4;
            } else if (devicePixelRatio >= 2.3 && (!dpr || dpr >= 2.3)) {
                dpr = 2.3;
            } else if (devicePixelRatio >= 2.2 && (!dpr || dpr >= 2.2)) {
                dpr = 2.2;
            } else if (devicePixelRatio >= 2.1 && (!dpr || dpr >= 2.1)) {
                dpr = 2.1;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else if (devicePixelRatio >= 1.5 && (!dpr || dpr >= 1.5)){
                dpr = 1.5;
            } else {
                dpr = 1;
            }
        } else if (isAndroid) {
            //主流安卓设备直接匹配DPR
            dpr = devicePixelRatio;
        }else if (isIPad) {
            //IPAD设备有dpr为1，2，3的方案
            if (devicePixelRatio >= 4.5 && (!dpr || dpr >= 4.5)) {
                dpr = 4.5;
            } else if (devicePixelRatio >= 4 && (!dpr || dpr >= 4)) {
                dpr = 4;
            } else if (devicePixelRatio >= 3.75 && (!dpr || dpr >= 3.75)) {
                dpr = 3.8;
            } else if (devicePixelRatio >= 3.5 && (!dpr || dpr >= 3.5)) {
                dpr = 3.5;
            } else if (devicePixelRatio >= 3.25 && (!dpr || dpr >= 3.25)){
                dpr = 3.3;
            } else if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2.9 && (!dpr || dpr >= 2.9)) {
                dpr = 2.9;
            } else if (devicePixelRatio >= 2.8 && (!dpr || dpr >= 2.8)) {
                dpr = 2.8;
            } else if (devicePixelRatio >= 2.7 && (!dpr || dpr >= 2.7)) {
                dpr = 2.7;
            } else if (devicePixelRatio >= 2.6 && (!dpr || dpr >= 2.6)) {
                dpr = 2.6;
            } else if (devicePixelRatio >= 2.5 && (!dpr || dpr >= 2.5)) {
                dpr = 2.5;
            } else if (devicePixelRatio >= 2.4 && (!dpr || dpr >= 2.4)) {
                dpr = 2.4;
            } else if (devicePixelRatio >= 2.3 && (!dpr || dpr >= 2.3)) {
                dpr = 2.3;
            } else if (devicePixelRatio >= 2.2 && (!dpr || dpr >= 2.2)) {
                dpr = 2.2;
            } else if (devicePixelRatio >= 2.1 && (!dpr || dpr >= 2.1)) {
                dpr = 2.1;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else if (devicePixelRatio >= 1.5 && (!dpr || dpr >= 1.5)){
                dpr = 1.5;
            } else {
                dpr = 1;
            }
        }else{
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    //设置meta头
    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    //刷新rem rem采用设备宽度的1/10 整屏宽就是10rem
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr >6000) {
            width = 6000 * dpr;
        }
        var rem = width / 7.5;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    //改变屏幕尺寸的时候刷新rem
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    //浏览器能识别的最小字体像素为12px
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));