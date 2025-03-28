import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CalendarioComponent } from "./pages/calendario/calendario.component";
import { FaseEliminazioneComponent } from "./pages/fase_eliminazione/faseEliminazione.component";
import { LoginComponent } from "./pages/login/login.component";
import { ClassificaComponent } from "./pages/welcome/classifica/classifica.component";
import { GestioneTorneiComponent } from "./pages/gestione-tornei/gestione-tornei.component";
import { NuovoTorneoComponent } from "./pages/nuovo-torneo/nuovo-torneo.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FormTorneoComponent } from "./pages/form-torneo/form-torneo.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'gestione-tornei', component: GestioneTorneiComponent},
  { path: 'torneo/:id', component: FormTorneoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
