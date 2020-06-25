package com.example.demo.controller;

import java.util.Date;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.demo.models.documents.Mensaje;
import com.example.demo.service.ChatServiceImpl;

@Controller
public class ChatController {
	
	String[] colores = {"orange","purple","brown","red","blue"};
	public final Logger logs= LoggerFactory.getLogger(ChatController.class);
	
	@Autowired
	private ChatServiceImpl chatService;
	
	@Autowired
	private SimpMessagingTemplate webSocket;
	
	@MessageMapping("/mensaje") //esto vendria despues del app
	@SendTo("/chat/mensaje")
	public Mensaje recibeMensaje(Mensaje mensaje) {
		mensaje.setFecha(new Date().getTime());
		logs.info(mensaje.toString());
		if(mensaje.getTipo().equals("NUEVO_USUARIO")) {
			mensaje.setTexto("nuevo usuario");	
			mensaje.setColor(colores[new Random().nextInt(colores.length)]);
			logs.info(mensaje.getColor());
		}else {
			chatService.guardar(mensaje);
		}
		
		return mensaje;
	}
	
	@MessageMapping("/escribiendo") //esto vendria despues del app
	@SendTo("/chat/escribiendo")
	public String estaEscribiendo(String username) {
		return username.concat(" esta escribiendo ...");
	}
	
	@MessageMapping("/historial") //esto vendria despues del app
	public void historial(String clientId) {
		webSocket.convertAndSend("/chat/historial/"+clientId, chatService.obtenerUltimos10Mensajes());
		
	}

}
