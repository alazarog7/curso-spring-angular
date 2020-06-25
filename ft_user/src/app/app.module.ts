import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';// Parte de Angular Material
import { MatDatepickerModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PerfilComponent } from './clientes/perfil/perfil.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token';
import { AuthInterceptor } from './usuarios/interceptors/auth';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';


const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ADMIN'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ADMIN'}},
  {path: 'clientes/ver/:id', component: PerfilComponent},
  {path: 'login', component: LoginComponent},
  {path: 'factura/:id', component: DetalleFacturaComponent,canActivate:[AuthGuard, RoleGuard], data:{role:'USER'} },
  {path: 'factura/form/:clienteId', component:FacturasComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ADMIN'}}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    PerfilComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,

    ReactiveFormsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

  ],
  providers: [
    ClienteService,
    {provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS,useClass: TokenInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
