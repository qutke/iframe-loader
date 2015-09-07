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
            }
        },//iframe监听的事件
        renderTo: script.parentElement,//iframe父元素
        id: "QutkeIframe",//iframe的id
        type: "parent",
        whitelists:[]
    };
    var oldTypes = { 2: "setHeight", 3: "toFull", 4: "unFull"};
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

    //与父页面通信对象
    function parentMessage() {
        var timer;
        var handle = window.parent; // 事件句柄
        var height = function (height) { //iframe高度
            var obj = {code: 2, height: height};
            handle.postMessage(obj, '*');
        };

        var tofull = function () {//iframe全屏
            var obj = {code: 3};
            handle.postMessage(obj, '*');
        };

        var unfull = function () {//iframe取消全屏
            var obj = {code: 4};
            handle.postMessage(obj, '*');
        };
        this.full = function () {
            if (timer) clearInterval(timer);
            tofull();
        };
        this.auto = function (full) {
            if (timer) clearInterval(timer);
            var docheight = document.body.clientHeight;
            timer = setInterval(function () {
                if ((document.body.clientHeight != docheight || full) && handle) {
                    if (full)  unfull();
                    full = false;
                    docheight =document.body.clientHeight;
                    height(docheight + 40);
                }
            }, 100)
        };
    }
}());