package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dao.ChatRepo;
import com.example.demo.models.documents.Mensaje;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired 
	private ChatRepo chatRepo;
	
	@Override
	public List<Mensaje> obtenerUltimos10Mensajes() {
		// TODO Auto-generated method stub
		return chatRepo.findFirst10ByOrderByFechaDesc();
	}

	@Override
	public Mensaje guardar(Mensaje mensaje) {
		// TODO Auto-generated method stub
		return chatRepo.save(mensaje);
	}

}
