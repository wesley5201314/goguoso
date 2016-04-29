/*
 * spring版本的实现
 */
package com.goguoso.search.http;

import java.io.IOException;
import java.net.URI;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

public class SpringRestImp implements HttpRest{
	private RestTemplate restTemplate =null;

	
	public SpringRestImp() {
		super();
		// TODO Auto-generated constructor stub
		restTemplate = new RestTemplate(); 
		CloseableHttpClient httpclient=HttpClientBuilder.create()
				.setMaxConnTotal(800)
				.setMaxConnPerRoute(800)
				.build();
		restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory(httpclient) );
	}


	public String get(String url) {
		// TODO Auto-generated method stub
		String json=null;
		json=restTemplate.getForObject(url, String.class);//此处可能会有异常
		return json;
	}

}
