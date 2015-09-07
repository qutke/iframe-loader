iframe-loader(iframe������)
==============================
### functions(����)
+ create an  iframe according config(�������ö�̬����iframe)
+ support the iframe communicates with its father page cross domain(֧��iframe�͸�ҳ�����ͨ��(ȫ�����߶�����Ӧ������������)
+ use html5 method postMessage

### usage(ʹ��)
+ parent.html(��ҳ��)
```
<script src="iframe-loader.js" config='{"type":"parent",src":"your url(iframe����ַ)","style":{"width":"800px","height":"600px"},"renderTo":"myDiv","id":"myIframe"}'></script>
```
+ iframe.html(��ҳ��)
```
<script src="iframe-loader.js" config='{"type":"iframe"}'></script>
```
+ load iframe-loader.js(����iframe-loader.js)
+ set the config attribute(������������)
+ config is a standard json code that will be parsed by JSON.parse,so it was wraped by single quotation marks(config��һ�α�׼json��ʽ�������õ����Ű���)

### arguments(���ò���)
+ config.type,the script is run on parent or iframe page,default is parent(�ű������ڸ�ҳ�滹����ҳ�棬Ĭ��Ϊ��ҳ��)
+ config.src,the iframe url(iframe����ַ)
+ config.style ,the iframe style,default is {width: "800px", height: "600px", border: 0, padding: 0, margin: 0}(style��json��ʽ)
+ config.renderTo ,where the iframe insert,default is th scrip's parent, if set it should be  a dom id (Ĭ����script�ĸ�Ԫ�أ������ñ�����ĳ��dom��id)
+ config.id,the iframe's id,default is QutkeIframe,if you want create two more iframes,id is needed(iframe ��id Ĭ���� QutkeIframe�����iframe,id������)
+ config.class,the iframe's classname,default is null(iframe ����ʽ������Ĭ���ǿ�)
+ config.whitelists,for security the whitelists set  hosts allowed in communication,default is parent and iframe'host(iframe��ȫ���ã�ֻ��ָ����Ŀ���ͨ�ţ�Ĭ��Ϊ��ҳ�����ҳ�����) example ["a.com","b.com"]
### demos(����)
+ �߶ȡ�ȫ������Ӧ()[]
+ �߶ȡ�ȫ������Ӧ()[]
