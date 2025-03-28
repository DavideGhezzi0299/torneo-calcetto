import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISquadra } from 'src/app/models/squadra';
import { CalendarioService } from 'src/app/services/calendario.service';
import { SquadraService } from 'src/app/services/squadra.service';

@Component({
    selector: 'app-classifica',
    templateUrl: './classifica.component.html',
    styleUrls: ['./classifica.component.css'],
    standalone: false
})
export class ClassificaComponent implements OnInit {
    squadre: ISquadra[] = [];
    ciSonoPartite = false;
    loading = false;
    constructor(
      private squadraService: SquadraService,
      private calendarioService: CalendarioService,
      private router: Router
    ) 
    { 

    }

    async ngOnInit() {
        this.loading = true;
        this.ciSonoPartite = (await this.calendarioService.getPartite()).length > 0;
        this.squadre = await this.squadraService.getSquadre(true)
        this.loading = false;
    }
    async reset(){
        await this.squadraService.reset();
        window.location.reload();
    }

    async sorteggiaPartite(){
       await this.calendarioService.calcolaCalendario(this.squadre[0]);
       this.router.navigate(['/calendario']);
    }
}