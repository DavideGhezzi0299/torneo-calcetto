import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ITorneo } from 'src/app/models/torneo';
import { NotificationService } from 'src/app/services/notification.service';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
    selector: 'app-gestione-tornei',
    templateUrl: 'gestione-tornei.component.html',
    styleUrl: 'gestione-tornei.component.css',
    standalone: false
})

export class GestioneTorneiComponent implements OnInit {
    tornei: ITorneo[] = [];
    constructor
    (
        private torneoService: TorneoService,
        private router: Router,
        private notificationService: NotificationService
    ) 
    { 

    }

   async ngOnInit() 
   { 
      this.tornei = await this.torneoService.getTornei(); 
   }

   async eliminaTorneo(idPk: number){
    const confirmed = await firstValueFrom(
        this.notificationService.confirm('Eliminazione torneo', 'Sei sicuro di voler eliminare il torneo?')
      );
    if(confirmed){
      if(await this.torneoService.eliminaTorneo(idPk)){
        this.notificationService.success("Eliminazione torneo", "eliminazione del torneo avvenuta correttamente");
      }
      else{
        this.notificationService.error("Eliminazione torneo", "eliminazione del torneo non avvenuta correttamente");
      }
    }
   }
    async modificaTorneo(idPk: number){
        this.router.navigate(['torneo', idPk]);
    }
} 