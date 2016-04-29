/*
 * Searcher接口，所以搜索器都继承此接口
 */
package com.goguoso.search.searcher;

public interface Searcher {
	/*
	 * 执行搜索请求
	 * stmt:查询参数
	 */
	public String doSearch(String stmt) ;

}
