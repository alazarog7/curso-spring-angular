
import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 title: string = 'App Angular'

 constructor(private auth:AuthService, private route:Router){}
 logout():void{
   this.auth.logout()
   this.route.navigate(['/login'])
 }
 
}
