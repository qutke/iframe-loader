(function () {
    var script = document.scripts[document.scripts.length - 1];
    var userConfig = {};
    var config = {
        src: "https://realtime.qutke.com/info/559cc1f3310a3c46405c6f1d",//iframe地址
        style: {width: "800px", height: "600px", border: 0, padding: 0, margin: 0},//iframe样式
        action: {
            toFull: function (iframe, data) {
                addStyle(iframe, {
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    "z-index": 100000,
                    "min-height": (document.documentElement.clientHeight - 5) + "px"
                });
            },
            unFull: function (iframe, data) {
                addStyle(iframe, {
                    width: "100%",
                    position: "relative",
                    top: "",
                    left: "",
                    "z-index": "",
                    "min-height": ""
                });
            },
            setHeight: function (iframe, data) {
                addStyle(iframe, {height: data.height + "px"});
            },
            hello: function (iframe, data) {
                console.log("connected!")
            }
        },//iframe监听的事件
        renderTo: script.parentElement,//iframe父元素
        id: "QutkeIframe",//iframe的id
        type: "parent"
    };
    var oldTypes = {1: "hello", 2: "setHeight", 3: "toFull", 4: "unFull"};
    if (script && script.attributes["config"]) {
        try {
            userConfig = JSON.parse(script.attributes["config"].value)
        }
        catch (e) {
            console.error("config iframe error.")
        }
    }

    //合并配置和默认配置
    Oextend(config, userConfig);

    //是父页面还是子页面
    if (config.type == "parent") {
        createIframe(config, function () {
            document.getElementById(config.id).contentWindow.postMessage('hello', '*');
            //iframe onload后创建事件监听
            actionListerer(function (e) {
                if (oldTypes.hasOwnProperty(e.data.code))
                    config.action[oldTypes[e.data.code]](document.getElementById(config.id), e.data);
                else  console.error("type iframe undefined");
            })
        });
    }
    else {
        var parentScreen=new parentMessage();
        parentScreen.auto();
    }

    function actionListerer(callback) {
        if (window.addEventListener) {
            window.addEventListener("message", callback, false);
        } else {
            window.attachEvent("onmessage", callback); //IE
        }
    }

    function addStyle(obj, style) {
        for (var s in style) {
            obj.style[s] = style[s];
        }
    }

    function createIframe(config, callback) {
        var du = document.createElement("iframe");
        du.src = config.src;
        du.id = config.id;
        if (config.class)
            du.class = config.class;
        addStyle(du, config.style);
        if (typeof(config.renderTo) == "string") {
            config.renderTo = document.getElementById(config.renderTo)
        }
        config.renderTo.appendChild(du);
        if (du.attachEvent) {
            du.attachEvent('onload', callback)
        } else {
            du.onload = callback;
        }
    }

    //只遍历两层
    function Oextend(o, n) {
        for (var p in n) {
            if (n[p].constructor.toString().indexOf("Object") > -1 && o[p].constructor.toString().indexOf("Object") > -1) {
                for (var p2 in n[p])
                    o[p][p2] = n[p][p2];
            }
            else o[p] = n[p];
        }
    }

    //解析url
    function parseURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port || '80',
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
    }

    //与父页面通信对象
    function parentMessage() {
        var timer;
        var handle = null; // 事件句柄

        //事件监听
        actionListerer(function (event) {
            handle = event;
            if (parseURL(event.origin).host.match(/(\.qutke\.com$)|(^qutke\.com$)/)) {
                if (event.data == 'hello') {
                    console.log("Client connect %s", event.origin);
                    event.source.postMessage({code: 1}, '*'); //握手协议
                }
            }
        });
        var height = function (height) { //iframe高度
            var obj = {code: 2, height: height};
            handle.source.postMessage(obj, '*');
        };

        var tofull = function () {//iframe全屏
            var obj = {code: 3};
            handle.source.postMessage(obj, '*');
        };

        var unfull = function () {//iframe取消全屏
            var obj = {code: 4};
            handle.source.postMessage(obj, '*');
        };
        this.full = function () {
            if (timer) clearInterval(timer);
            tofull();
        };
        this.auto = function (full) {
            if (timer) clearInterval(timer);
            var docheight = $("body")[0].clientHeight;
            timer = setInterval(function () {
                if (($("body")[0].clientHeight != docheight || full) && handle) {
                    if (full)  unfull();
                    full = false;
                    docheight = $("body")[0].clientHeight;
                    height(docheight + 20);
                }
            }, 100)
        };
    }
}());