package com.bolsadeideas.springboot.backend.apirest.auth;

public class JwtConfig {
	public static final String LLAVE_SECRETA = "esta.es.la.clave.maestra";
	public static final String LLAVE_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\n" + 
			"MIIEowIBAAKCAQEAzWiLwB4Y99mx1eXCCVijQnJJy68NTk6bJbBR41VF41Wk7Jo4\n" + 
			"c2WksF/nyhQGi9dmCHIfZdWp2226YXZwaqFFA1UCVfzsiWGMVVxERFIVv1RGHRun\n" + 
			"6lrTT8HcHA7meJN72E+lmqg0lIhgtmJB3DoiAnK6ppQpbm+w32HzrTdiUg8QIsGB\n" + 
			"M5Rvx82sUnUiuVPcQv+tWlkpD8+oQ7Qdx2JIEbJhR+r7ShOgMg+C8Qe2ZZf/KtfF\n" + 
			"c37U2L+4PZHAxaipweaiEOJS/IMJdsusVo+saI+5YE3N7v6Hqql02rpNBhI9+tSZ\n" + 
			"r4AyI2T348BUGNYN5xmZ4sKxihcAKKY78Ho3pwIDAQABAoIBAQCXH5jaEwq5p0+g\n" + 
			"mHbG25DZ/S3wDm2StGCPPQcyY3WUyVkavmhT9m9RWG43jb43OpWWFyikiqt6hmN+\n" + 
			"+13ABcC5r9yVGQ2KEdvmnYiYX3AioUUoe0VyNbqMTou7lPbZtWCDiC3F+IUe1quY\n" + 
			"4/eiqJ6HAJP0pMNKvh/6aZ2XTk0nIx0aopr2LBhZOScEsFY7IMFQYmEIQz2IpfR0\n" + 
			"5wsgeNqhtCFa/ChhQCUqenAXC0hO0dGkOicJs19sLDdRkQRdB8DajrX2eHJpEySY\n" + 
			"nr2ptLNptYmwT4ss2hZjbuS0OEn8cO9Dzwd+Bc4BJh4T7EMhD93O/xYHKY+bKXk2\n" + 
			"VbcVWBpRAoGBAPtTv7S/+CAoRfylEfEE9ApeOjrVWqYQfBVf6dA9NuiY9WvltfRJ\n" + 
			"I/J14edCd9tPUWWb/qkszHTBP0soGNxL84U+QaYImN15yd6I9LUnkPxAFni/zJ/X\n" + 
			"eZNvKcnPRS6IngvhB2qlP/YBA8Y1V7rOTDg4gFwei1CYUaskmGjozDWZAoGBANE6\n" + 
			"PF41uCvv/YJ2wKj4joonOXhNoz12LxD3RzRpybUOGfpJ8NZymdXOfKES17SCRa8m\n" + 
			"mxSDwzSNacd59HDkGx/3waxhff18Mfj+/gvJZh5Z4JHlz7aM2U6yAbxDJwSLdzPN\n" + 
			"FzngSM3T8F/5HqO450un9Qoa+RSKEDERP4G/x58/AoGAaaLH3xcZGZsT358aLW3h\n" + 
			"jUIRw4zNryMapHlN82LnY1h3P0Sr9+OOImj97I/5hMqP8d9haIYV4bUf/1z5Jg8e\n" + 
			"ahDC0yCl7+EywkBaapIY1I2zZElpnn2Y8ik1LUfbUjXGCEQrM94FRkci6PqexzvS\n" + 
			"uYa2HQIRmGyNVxvom5/NxXECgYAuD8ASjYkKQz9wZWxsxqu6xn/keFMjyMz70zSd\n" + 
			"2VxKu9wEOhsHWxt68oaFf3x1hOiKctlZXtiuzSMogzTJVa6TDxxYMu5ly93Ej36m\n" + 
			"YaRVsju6YvmjmsaMiKvRIoeIfJu1j8U5PKNKjQoyVsnkCWUCRuuvWdjUKMD/zGhK\n" + 
			"zEnKSQKBgHk127BGn/Qq1edhdy5XjKBoslkNpdYl8QRJ50sj05gZN0WfCOVDJbzx\n" + 
			"mrPc8ouoCyryNIpmWGOolAy/QokHYhW/iOolDPvLlTyQjTpoQVLPORs1nIJcM4vy\n" + 
			"sxZegUQpGMu6tlbUljRlQouIMswVLeAzlQweki7zzzRO/kyNWQ/K\n" + 
			"-----END RSA PRIVATE KEY-----";
	public static final String LLAVE_PUBLICA = "-----BEGIN PUBLIC KEY-----\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWiLwB4Y99mx1eXCCVij\n" + 
			"QnJJy68NTk6bJbBR41VF41Wk7Jo4c2WksF/nyhQGi9dmCHIfZdWp2226YXZwaqFF\n" + 
			"A1UCVfzsiWGMVVxERFIVv1RGHRun6lrTT8HcHA7meJN72E+lmqg0lIhgtmJB3Doi\n" + 
			"AnK6ppQpbm+w32HzrTdiUg8QIsGBM5Rvx82sUnUiuVPcQv+tWlkpD8+oQ7Qdx2JI\n" + 
			"EbJhR+r7ShOgMg+C8Qe2ZZf/KtfFc37U2L+4PZHAxaipweaiEOJS/IMJdsusVo+s\n" + 
			"aI+5YE3N7v6Hqql02rpNBhI9+tSZr4AyI2T348BUGNYN5xmZ4sKxihcAKKY78Ho3\n" + 
			"pwIDAQAB\n" + 
			"-----END PUBLIC KEY-----";

}
