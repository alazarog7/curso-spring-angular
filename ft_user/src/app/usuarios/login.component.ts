import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo:string = "Login"
  usuario:Usuario;

  constructor(private auth:AuthService,private router:Router) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      swal('Login','bienvenido','success')
      this.router.navigate(['/clientes'])
    }
  }

  login():void {
    console.log(this.usuario);

    if(this.usuario.username == null ||this.usuario.password == null ){
      swal('Error Login', 'Error en la autenticacion','error');
      return;
    }

    this.auth.login(this.usuario).subscribe(response =>{
      
      this.auth.guardarToken(response.access_token)
      this.auth.guardarUsuario(response.access_token)
      this.router.navigate(['/clientes'])
      swal('Autenticacion valida',`Saludos ${'ale'}`,'success');
    },
    e =>{
      if(e.status == 400){
        swal('Error Login', 'Error en las credenciales','error');
      }
    }
    )

  }
  logout(){
    this.auth.logout()
  }

}
