/*
 * 基于google搜索引擎的搜索器都需要继承抽象类
 * 在初始化方法中指明siteUrl(网盘/google/磁力)
 */
package com.goguoso.search.searcher;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.goguoso.search.http.HttpRest;

public class GoogleEngineSearcher implements Searcher{
	String siteUrl;
	HttpRest httpRest;
	
	public HttpRest getHttpRest() {
		return httpRest;
	}
	public void setHttpRest(HttpRest httpRest) {
		this.httpRest = httpRest;
	}
	public String getSiteUrl() {
		return siteUrl;
	}
	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
		this.siteUrl="https://www.google.com.hk/search?sourceid=chrome&client=aff-cs-360chromium&ie=UTF-8&q=";
	}
	/*
	 * 将html解析成json
	 */
	public String doParseContentHtml(String context) {
		Document doc = Jsoup.parse(context);
		Element table=doc.getElementById("mn");
		table.select("tbody").first().remove();
		table.getElementById("leftnav").remove();
		return table.outerHtml();
	}
	public String doSearch(String stmt) {
		String htmlContext=httpRest.get(this.siteUrl+stmt);
		return doParseContentHtml(htmlContext);
	}

}
