import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ISquadra } from 'src/app/models/squadra';
import { CalendarioService } from 'src/app/services/calendario.service';
import { SquadraService } from 'src/app/services/squadra.service';

@Component({
    selector: 'app-sorteggio',
    templateUrl: './sorteggio.component.html',
    standalone: false
})
export class SorteggioComponent implements OnInit {
    squadre: ISquadra[] = [];
    bottoneDisattivato: boolean = false;
    constructor(
        private squadraService: SquadraService,
        private calendarioService: CalendarioService,
        private notificationService: NzNotificationService
    ) { }

    async ngOnInit() {
        this.squadre = await this.squadraService.getSquadre();
    }

    async sorteggiaAvversari(squadra: ISquadra) {
      let partite = await this.calendarioService.calcolaCalendario(squadra);
      if (partite.length > 0) {
        this.notificationService.success('Sorteggio avversari', 'Avversari sorteggiati correttamente');
      }
      else {
        this.notificationService.error('Sorteggio avversari', 'Errore durante il sorteggio degli avversari');
      }
    }
}