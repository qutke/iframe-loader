iframe-loader（iframe加载器）

==============================

### functions（功能）

* create an  iframe according config（根据配置动态创建iframe）
* the iframe communicates with its father page,cross domain supported（支持iframe和父页面跨域通信（全屏、高度自适应、滚动监听等）
* use html5 method postMessage

### how to use（使用）

* parent.html（父页面）

```html
<script src="iframe-loader.js"
        config='{"type":"parent",src":"your url（iframe的网址）","style":{"width":"800px","height":"600px"},"renderTo":"myDiv","id":"myIframe"}'>
</script>
```

* iframe.html（子页面）

```html
<script src="iframe-loader.js" config='{"type":"iframe"}'></script>
```

* load iframe-loader.js（加载iframe-loader.js）
* set the config attribute（设置配置属性）
* config is a standard json code that will be parsed by JSON.parse,so it was wraped by single quotation marks（config是一段标准json格式,所以用单引号包裹）

### config={}（设置参数）

* `config.type`,the script is run on parent or iframe page,default is parent（脚本运行在父页面还是子页面,默认为父页面）
* `config.src`,the iframe url（iframe的网址）
* `config.style` ,the iframe style,default is {"width": "800px", "height": "600px", "border"": 0,"padding": 0, "margin"": 0}（style是json格式）
* `config.renderTo` ,where the iframe insert,default is the scrip's parent, if set it should be  a dom id （默认是script的父元素,若设置必须是某个dom的id）
* `config.id`,the iframe's id,default is QutkeIframe,if you want create two more iframes,id is needed（iframe 的id 默认是 QutkeIframe,多个iframe,id需设置）
* `config.class`,the iframe's classname,default is null（iframe 的样式表名,默认是空）
* `config.whitelists`,for security,the whitelists set hosts allowed in communication,default is parent and iframe'host（iframe安全设置,只有指定域的可以通信,默认为父页面和子页面的域） example ["a.com","b.com"]

### demos（例子）

* [full screen](http://21k.github.io/iframe-loader/demos/index.htm)
* [height](http://21k.github.io/iframe-loader/demos/parent.html)

