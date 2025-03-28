import { Component } from '@angular/core';
import { NuovoTorneoComponent } from '../nuovo-torneo/nuovo-torneo.component';
import { UtenteComponent } from '../utente/utente.component';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { ITorneo, tornei } from 'src/app/models/torneo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false
})
export class DashboardComponent {
  cards = [
    { title: 'Nuovo Torneo', description: 'Vai alla pagina 1', link: 'nuovo-torneo', icon: 'plus', component: NuovoTorneoComponent },
    { title: 'Gestione Tornei', description: 'Vai alla pagina 2', link: 'gestione-tornei', icon: 'trophy' },
    { title: 'Modifica Utente', description: 'Vai alla pagina 3', link: 'modifica-utente', icon: 'user', component: UtenteComponent},
  ];

  tornei: ITorneo[] = [];
  constructor
  (
    private router: Router,
    private modalService: ModalService
  )
  {

  }

  ngOnInit(){
    this.tornei = tornei
  }

  onCardClick(card: any){
    if(card.link == 'gestione-tornei'){
      this.router.navigateByUrl(card.link)
    }
    else{
      this.modalService.openModal(card.title,card.component, null)
    }
  }

  apriFormTorneo(idPk: number){
    this.router.navigate(['torneo', idPk]);
  }
}
