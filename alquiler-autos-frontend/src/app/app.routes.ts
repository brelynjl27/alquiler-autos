import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesListComponent } from './pages/clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './pages/clientes/clientes-form/clientes-form.component';
import { AutosListComponent } from './pages/autos/autos-list/autos-list.component';
import { AutosFormComponent } from './pages/autos/autos-form/autos-form.component';
import { SolicitudesListComponent } from './pages/solicitudes/solicitudes-list/solicitudes-list.component';
import { SolicitudesFormComponent } from './pages/solicitudes/solicitudes-form/solicitudes-form.component';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },

 
  { path: 'login', component: LoginComponent },


  {
    path: '',
    canMatch: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },

     
      { path: 'clientes', component: ClientesListComponent },
      { path: 'clientes/nuevo', component: ClientesFormComponent },
      { path: 'clientes/editar/:id', component: ClientesFormComponent },

 
      { path: 'autos', component: AutosListComponent },
      { path: 'autos/nuevo', component: AutosFormComponent },
      { path: 'autos/editar/:id', component: AutosFormComponent },

   
      { path: 'solicitudes', component: SolicitudesListComponent },
      { path: 'solicitudes/nuevo', component: SolicitudesFormComponent },
      { path: 'solicitudes/editar/:id', component: SolicitudesFormComponent },
    ]
  },

 
  { path: '**', redirectTo: 'login' }
];
