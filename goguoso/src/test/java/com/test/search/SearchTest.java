package com.test.search;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.goguoso.search.searcher.GoogleEngineSearcher;

public class SearchTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
		GoogleEngineSearcher googleSearcher=(GoogleEngineSearcher) context.getBean("googleEngineSearcher");
		System.out.println("ok:"+googleSearcher.getSiteUrl());
		System.out.println("done"+googleSearcher.doSearch("solr"));
	}

}
