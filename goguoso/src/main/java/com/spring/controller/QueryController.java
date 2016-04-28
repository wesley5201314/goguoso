package com.spring.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;


@Controller
@RequestMapping("/query")
public class QueryController {	
	@ResponseBody
	@RequestMapping(value = "/query", produces = "text/plain;charset=UTF-8")
	public String db(String text,HttpServletRequest request) {// 2
		//if(!UserAuth.userAuthentication(usr)) return "wrong";
		System.out.println(text);
//    	Person person=new Person("gj","26");
//    	System.out.println("success:"+person.getName());
    	String ip=getRemoteAddrIp(request);
		System.out.println("访问者ip:"+ip);
		return "success访问成功！";
	}
	public static String getRemoteAddrIp(HttpServletRequest request) {
        String ipFromNginx = getHeader(request, "X-Real-IP");
        //System.out.println("ipFromNginx:" + ipFromNginx);
        //System.out.println("getRemoteAddr:" + request.getRemoteAddr());
        return (null==ipFromNginx) ? request.getRemoteAddr() : ipFromNginx;
    }
	private static String getHeader(HttpServletRequest request, String headName) {
        String value = request.getHeader(headName);
        return !StringUtils.isBlank(value) && !"unknown".equalsIgnoreCase(value) ? value : null;
    }
}
