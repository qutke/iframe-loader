iframe-loader��iframe��������
==============================
### functions�����ܣ�
+ create an  iframe according config���������ö�̬����iframe��
+ the iframe communicates with its father page,cross domain supported��֧��iframe�͸�ҳ�����ͨ�ţ�ȫ�����߶�����Ӧ�����������ȣ�
+ use html5 method postMessage

### how to use��ʹ�ã�
+ parent.html����ҳ�棩
```html
<script src="iframe-loader.js"
config='{"type":"parent",src":"your url��iframe����ַ��","style":{"width":"800px","height":"600px"},"renderTo":"myDiv","id":"myIframe"}'>
</script>
```
+ iframe.html����ҳ�棩
```html
<script src="iframe-loader.js" config='{"type":"iframe"}'></script>
```
+ load iframe-loader.js������iframe-loader.js��
+ set the config attribute�������������ԣ�
+ config is a standard json code that will be parsed by JSON.parse,so it was wraped by single quotation marks��config��һ�α�׼json��ʽ,�����õ����Ű�����

### config={}�����ò�����
+ `config.type`,the script is run on parent or iframe page,default is parent���ű������ڸ�ҳ�滹����ҳ��,Ĭ��Ϊ��ҳ�棩
+ `config.src`,the iframe url��iframe����ַ��
+ `config.style` ,the iframe style,default is {"width": "800px", "height": "600px", "border"": 0,"padding": 0, "margin"": 0}��style��json��ʽ��
+ `config.renderTo` ,where the iframe insert,default is th scrip's parent, if set it should be  a dom id ��Ĭ����script�ĸ�Ԫ��,�����ñ�����ĳ��dom��id��
+ `config.id`,the iframe's id,default is QutkeIframe,if you want create two more iframes,id is needed��iframe ��id Ĭ���� QutkeIframe,���iframe,id�����ã�
+ `config.class`,the iframe's classname,default is null��iframe ����ʽ����,Ĭ���ǿգ�
+ `config.whitelists`,for security,the whitelists set hosts allowed in communication,default is parent and iframe'host��iframe��ȫ����,ֻ��ָ����Ŀ���ͨ��,Ĭ��Ϊ��ҳ�����ҳ����� example ["a.com","b.com"]

### demos�����ӣ�
+ (demos/index.html)[full screen]
+ (demos/parent.html)[height]

