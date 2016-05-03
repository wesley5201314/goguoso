# goguoso
此项目意在打造一款集网盘搜索、google搜索、磁力资源搜索、随书光盘搜索于一体的全能搜索引擎，主要是方便大家检阅资料，上线之后不会放广告，非盈利项目。
上线地址：http://www.goguoso.com/

此项目分为前台goguoso_view和后台goguoso两个模块，模块之间通过restful方式调用，传输数据格式为json。
goguoso_view包含两个页面：首页index.html和搜索页search.html(仿照主流搜索引擎的模式)
goguoso主要是提供restful调用服务，通过接受的参数，执行对应的搜索，并返回json结果给前台展示。