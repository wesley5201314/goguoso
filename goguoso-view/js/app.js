//定义Map类，类似java的Map，主要存储网盘中文名到网盘英文缩写的映射
    function Map(){
    	this.container = new Object();
    	}
    	Map.prototype.put = function(key, value){
    	this.container[key] = value;
    	}
    	Map.prototype.get = function(key){
    	return this.container[key];
    	}
    	Map.prototype.keySet = function() {
    	var keyset = new Array();
    	var count = 0;
    	for (var key in this.container) {
    	// 跳过object的extend函数
    	if (key == 'extend') {
    	continue;
    	}
    	keyset[count] = key;
    	count++;
    	}
    	return keyset;
    	}
    	Map.prototype.size = function() {
    	var count = 0;
    	for (var key in this.container) {
    	// 跳过object的extend函数
    	if (key == 'extend'){
    	continue;
    	}
    	count++;
    	}
    	return count;
    	}
    	Map.prototype.remove = function(key) {
    	delete this.container[key];
    	}
    	Map.prototype.toString = function(){
    	var str = "";
    	for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
    	str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
    	}
    	return str;
    	}
    	
    var objmap=new Map();//存储搜索类型到搜索函数的映射
    objmap.put('搜谷锅','guguosearch');
    objmap.put('搜云盘','wangpansearch');
    objmap.put('搜电影','dianyingsearch');
    objmap.put('搜随书光盘','suishusearch');
    var wpmap = new Map();//存储网盘中文名到网盘英文缩写的映射
    wpmap.put('所有网盘','all');
    wpmap.put('国内网盘','gn');
    wpmap.put('国外网盘','gw');   

//搜索类型(google/网盘/电影)下拉框切换 参数：div的id,搜索类型
    function searchobjtype(id,args)
	{
    //下拉框文本切换成选中的
	if("search_obj"==id) 
		$("#"+id).html(args);
	else $("#"+id).html(args+"<span class=\"caret\"></span>");
	if("搜云盘"==args) $("#wp_div").show();
	else if("搜谷锅"==args) $("#wp_div").hide();
	else if("搜电影"==args) $("#wp_div").hide();
	else if("搜随书光盘"==args) $("#wp_div").hide();
	}
  //网盘下拉框切换(只对网盘搜索有效) 参数：div的id,搜索类型
    function searchwangpantype(id,args)
	{
	if("search_obj"==id) 
		$("#"+id).html(args);
	else $("#"+id).html(args+"<span class=\"caret\"></span>");
	wptype=wp_type;
	}
   
  //定义一个将指向XMLHttpRequest对象的变量
	var xmlHttp;	
	//定义一个函数用于创建XMLHttpRequest对象
	function createXMLHttpRequest() {
	    if (window.ActiveXObject) {
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } 
	    else if (window.XMLHttpRequest) {
	        xmlHttp = new XMLHttpRequest();
	    }
	}
	//点击种子文件时调用，获得种子链接并跳转。输入参数：电影id
    function downmovie(id){
		createXMLHttpRequest();
	    xmlHttp.open("POST", encodeURI("localhost:8080/guguosearch/welcome/guguo/downmovie?id="+id), true);
	    xmlHttp.onreadystatechange = processSearch;
	    //将JSON对象发送给服务端
	    xmlHttp.send(null);
       }
       //处理搜索事务返回操作
	function processSearch() {
	    if(xmlHttp.readyState == 4) { //响应完成
	        if(xmlHttp.status == 200) { //返回成功
				//将服务端返回的结果解析成JSON对象
				//alert("收到返回值"+xmlHttp.responseText);
				returnJson= xmlHttp.responseText;
				updateSearchGUI(returnJson);//打开下载窗口
	        }
	    }
	}
       //打开下载窗口，输入：电影种子url
	function updateSearchGUI(json)
	{
		window.location=json;
	}
       //搜索函数
		function dosearch() {
			 var searchword=$("#search_word").val();//检索词
			 var search_obj=objmap.get($.trim($("#search_obj").html()));//检索对象(google/网盘/电影)
			 var wp_text=$.trim($("#wp_type").text());//网盘类型名称
			 var wp_type=wpmap.get(wp_text);//网盘类型英文简写
		//google/网盘/电影搜索分别处理
           if(search_obj=='guguosearch') 		
				window.location.href="http://localhost:8080/guguosearch/welcome/guguo/guguosearch?querystr="+searchword;
           else if(search_obj=='dianyingsearch') 		
				window.location.href="http://localhost:8080/guguosearch/welcome/guguo/dianyingsearch?querystr="+searchword;
           else if(search_obj=='wangpansearch') 		
				window.location.href="http://localhost:8080/guguosearch/welcome/guguo/wangpansearch?querystr="+searchword+"&wp_type="+wp_type+"&wp_text="+wp_text;
		   else if(search_obj=='suishusearch')
		        updateSearchGUI("http://202.38.93.29:8080/x1/"+searchword+".iso");
		}
       //页面跳转函数
		function tiaozhuan(page) {
			currentpage=page;
			if(currentpage==0) return;//如果页面为0,则不操作
			var searchword=$("#search_word").val();
			 var search_obj=objmap.get($.trim($("#search_obj").html()));
			 var wp_text=$.trim($("#wp_type").text());
			 var wp_type=wpmap.get(wp_text);
			if(search_obj=='guguosearch')
			     window.location.href="/guguosearch/welcome/guguo/guguosearch?querystr="+searchword+"&page="+page;
			else if(search_obj=='dianyingsearch')
			     window.location.href="/guguosearch/welcome/guguo/dianyingsearch?querystr="+searchword+"&page="+page;
			else if(search_obj=='wangpansearch') 
				window.location.href="/guguosearch/welcome/guguo/wangpansearch?querystr="+searchword+"&page="+page+"&wp_type="+wp_type+"&wp_text="+wp_text;
		}
       //enter键触发搜索操作
		function entersearch(){	        
	        var event = window.event || arguments.callee.caller.arguments[0];
	        if (event.keyCode == 13)
	        {
	        	dosearch();
	        }
	    }
		//enter键响应
		$(document).ready(function(){
			$(".search_word").keypress(function (e) { 
				var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; 
				if (keyCode == 13){ 
				//alert("响应键盘的enter事件"); 
				dosearch();
				} 
				}); 
			$("a.nowamagic").toggle(function(){
		     	$(".stuff").hide('slow');
		   	},function(){
		     	$(".stuff").show('fast');
		   	});
		});
		 function suggest(args)
			{
			 $("#search_word").val(args);
			 dosearch();
			}
		function share(index)
			{
			     var query =$("#search_word").val();
			     var dom=$("#result_"+index);//.eq(1).text();
			     var title=dom.find("h4").text().trim();
			     var desc=dom.find("p").text().trim();
			     var url=dom.find("small").text().trim();
			     alert(index+title);
//                  localStorage.usrname=usrname;
//                  localStorage.psword=psword;
                 var json={query:query,url:url,title:title,desc:desc,mode:"share"};
                 $.ajax({
				 url:"/guguosearch/welcome/log" ,
				 data:"json="+JSON.stringify(json),  
				 success:function(data){
					//alert(data);
				  }
			     });
			}
		function click(args)
			{
			 $("#search_word").val(args);
			 dosearch();
			}	