package com.bolsadeideas.springboot.backend.apirest.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{
	@Value("${cliente-1}")
	public String cliente;
	/**
	 * Esta configuracion es por el lado de oatuh
	 */
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		http.authorizeRequests()
			.antMatchers(HttpMethod.GET, "/api/clientes","/api/uploads/img/**","/api/clientes/page/**","/image/**").permitAll()
			.antMatchers(HttpMethod.GET, "/api/clientes/{id}").hasAnyAuthority("USER", "ADMIN")
			.antMatchers(HttpMethod.POST,"/api/facturas").hasAnyAuthority("ADMIN")
			.antMatchers("/api/facturas/**").hasAnyAuthority("USER", "ADMIN")
			.antMatchers(HttpMethod.PUT, "/api/clientes/{id}").hasAnyAuthority("ADMIN")
			.antMatchers(HttpMethod.POST,"/api/clientes/upload").hasAuthority("USER")
			.antMatchers(HttpMethod.POST, "/api/clientes").hasAuthority("ADMIN")
			.antMatchers(HttpMethod.DELETE, "/api/clientes").hasAuthority("ADMIN")
			.anyRequest()
			.authenticated()
			.and()
			.cors().configurationSource(corsConfigurationSource());
		
		
	}
	
	@Bean 
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config =  new CorsConfiguration();
		config.setAllowedOrigins(Arrays.asList(cliente));
		config.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
		config.setAllowCredentials(true);
		config.setAllowedHeaders(Arrays.asList("Content-Type","Authorization"));
		
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
		
	}
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<CorsFilter>(new CorsFilter(corsConfigurationSource()));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
		
	}

	
}
