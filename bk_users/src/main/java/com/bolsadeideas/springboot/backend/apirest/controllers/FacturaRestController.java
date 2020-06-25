package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Factura;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Producto;
import com.bolsadeideas.springboot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class FacturaRestController {

	@Autowired
	private IClienteService clienteService;
	
	@GetMapping("/facturas/{id}")
	public ResponseEntity<?> show(@PathVariable("id") Long id) {
		return ResponseEntity.ok(clienteService.findFacturaById(id));
	}
	
	@GetMapping("/facturas/filtrarProductos/{term}")
	public ResponseEntity<List<Producto>> filtrarProductos(@PathVariable("term") String term){
		
		return ResponseEntity.ok()
							 .body(clienteService.findProductoByNombre(term));
	}
	
	@PostMapping("/facturas")
	public ResponseEntity<Factura> crear(@RequestBody Factura factura){
		return ResponseEntity.status(HttpStatus.CREATED)
							 .body(clienteService.saveFactura(factura));
	}
	
	@DeleteMapping("/facturas/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") Long id) {
		clienteService.deleteFacturaById(id);
		return ResponseEntity.noContent().build();
	}
	
}
