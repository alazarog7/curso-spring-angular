import { Component, OnInit } from '@angular/core';
import {Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from '../_models/mensaje';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  private client:Client;
  estadoEscribiendo:string;
  estadoConecccion:boolean=false;
  mensaje:Mensaje = new Mensaje();
  mensajes:Mensaje[]=[]; 
  clientId:string;
  constructor() { 
    this.clientId = "id-"+ new Date().getUTCMilliseconds() +" - "+ Math.random().toString(36).substr(2);
  }

  ngOnInit() {
    this.client = new Client();
    this.client.webSocketFactory = () =>{
      return new SockJS("http://localhost:8095/chat-websocket");
    } 
    this.client.onConnect = (frame)=>{
      console.log("paso-1");
      console.log("Conectados" + this.client.connected + " : \n" + frame);
      this.estadoConecccion = true;
      this.client.subscribe('/chat/mensaje',e=>{
        console.log("paso-2");
        let mensaje:Mensaje = JSON.parse(e.body) as Mensaje;
        mensaje.fecha = new Date(mensaje.fecha);
        if(!this.mensaje.color&&this.mensaje.username==mensaje.username&&mensaje.tipo=="NUEVO_USUARIO"){
          this.mensaje.color = mensaje.color;
       }
        this.mensajes.push(mensaje);
      });
      this.client.subscribe('/chat/escribiendo',e=>{
        this.estadoEscribiendo = e.body; 
        setTimeout(()=>{
          this.estadoEscribiendo="";
        },3600)
      });
      this.client.subscribe('/chat/historial/'+this.clientId,e=>{
        const historial = JSON.parse(e.body) as Mensaje[];
        console.log(historial);
        this.mensajes = historial.map(data=>{
          data.fecha = new Date(data.fecha);
          return data;
        }).reverse();
      });
      console.log("paso-3");
      this.client.publish({destination:'/app/historial',body:this.clientId});
      this.mensaje.tipo="NUEVO_USUARIO";
      this.client.publish({destination:'/app/mensaje',body:JSON.stringify(this.mensaje)});
    }

    this.client.onDisconnect = (frame)=>{
      console.log("paso-5 ");
      console.log("Conectados" + this.client.connected + " : " + frame);
      this.estadoConecccion = false;
      this.mensaje = new Mensaje();
      this.mensajes = [];
    }
  }
  
  conectar():void{
    this.estadoConecccion= true;
    this.mensaje.tipo="NUEVO_USUARIO";
    this.client.activate();
  }
  desconectar():void{
    this.estadoConecccion= false;
    this.client.deactivate();
  }
  enviarMensaje():void{
    console.log("paso.4");
    console.log(this.mensajes);
    this.mensaje.tipo = 'MENSAJE';
    this.client.publish({destination:'/app/mensaje',body:JSON.stringify(this.mensaje)});
    this.mensaje.texto="";
  }
  eventEscribir():void{
    this.client.publish({destination:'/app/escribiendo',body:JSON.stringify(this.mensaje.username)});
  }


}
