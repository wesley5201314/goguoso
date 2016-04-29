/*
 * 基于jsoup实现
 */
package com.goguoso.search.html.parser;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class JsoupHtmlParserImp implements HtmlParser{

	public String doParse(String context) {
		// TODO Auto-generated method stub
		Document doc = Jsoup.parse(context);
		return null;
	}

}
