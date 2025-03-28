import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IPartita } from 'src/app/models/partita';
import { ISquadra } from 'src/app/models/squadra';
import { CalendarioService } from 'src/app/services/calendario.service';
import { SquadraService } from 'src/app/services/squadra.service';
import { PartitaFormComponent } from './partita-form/partita-form.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.css'],
    standalone: false
})
export class CalendarioComponent implements OnInit {
  squadre: ISquadra[] = [];
  attivoBottone = false;
  squadraCasa: string = '';
  squadraOspite: string = '';
  faseEliminazione = false;
  loading = false;
  partiteFaseEliminazione: IPartita[] = [];
  switchValue = false;
  giornate!: Record<number, IPartita[]>
  titolo: string = ""
  giornateArray!: {
    giornata: number; // Converti la chiave in un numero
    partite: IPartita[];
  }[];
  constructor(
    private squadraService: SquadraService,
    private calendarioService: CalendarioService,
    private modalService: NzModalService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    this.squadre = await this.squadraService.getSquadre();
    for (let squadra of this.squadre) {
      let avversari = await this.getAvversariPerSquadra(squadra);
      squadra.avversari = avversari;
    }
    let partite = await this.calendarioService.getPartite();
    let partiteGironi = partite.filter((p) => p.faseEliminatoria == false);
    let gironiFiniti = partite.filter(
      (p) => p.faseEliminatoria == false && p.vincitore != null
    );
    this.partiteFaseEliminazione = partite.filter(
      (p) => p.faseEliminatoria == true
    );
    this.attivoBottone =
      gironiFiniti.length == partiteGironi.length &&
      this.partiteFaseEliminazione.length == 0;
    
    this.giornate = partite.reduce((gruppi, partita) => {
      const giornata = partita.giornata;
      if (giornata != 0){
      if (!gruppi[giornata]) {
          gruppi[giornata] = []; // Inizializza un array per questa giornata
      }
      gruppi[giornata].push(partita);
      } // Aggiungi la partita al gruppo
      return gruppi;
    }, {} as Record<number, IPartita[]>);

    this.giornateArray = Object.entries(this.giornate).map(([giornata, partite]) => ({
      giornata: +giornata, // Converti la chiave in un numero
      partite
    }));
    this.titolo = this.switchValue ? 'Calendario per squadra' : 'Calendario per giornata';
    this.loading = false;
  }

  async getAvversariPerSquadra(squadra: ISquadra) {
    let avversari = await this.calendarioService.getAvversariPerSquadra(
      squadra.idPk
    );
    return avversari;
  }

  inserisciRisultato(
    squadra: string,
    avversario: string,
    isCasa: boolean,
    modifica: boolean = false
  ) {
    if (this.partiteFaseEliminazione.length == 0) {
      if (isCasa == true) {
        this.squadraCasa = avversario;
        this.squadraOspite = squadra;
      } else {
        this.squadraCasa = squadra;
        this.squadraOspite = avversario;
      }
      let data = {
        squadra: this.squadraCasa,
        avversario: this.squadraOspite,
        maxResult: 7,
        modifica: modifica,
      };
      this.modalService.create({
        nzTitle: 'Inserisci risultato',
        nzContent: PartitaFormComponent,
        nzData: data,
        nzFooter: null,
      });
    }
  }
  async terminaGironi() {
    await this.calendarioService.terminaFaseGironi();
    this.router.navigate(['/fase-eliminazione']);
    
  }

  async reset() {
    await this.calendarioService.reset();
    window.location.reload();
  }

  toggleSwitch() {
    this.titolo = this.switchValue ? 'Calendario per squadra' : 'Calendario per giornata';
  }
}
