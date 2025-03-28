import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Girone, Squadra } from 'src/app/models/girone';
import { ITorneo } from 'src/app/models/torneo';
import { TorneoService } from 'src/app/services/torneo.service';

@Component({
  selector: 'app-form-torneo',
  templateUrl: './form-torneo.component.html',
  styleUrl: './form-torneo.component.css',
  standalone: false
})
export class FormTorneoComponent {

  torneo: ITorneo | undefined;
  numeroGironi = 1;
  numeroGironiList: Girone[] = [];
  squadreTotali: Squadra[] = [];
  numeroUgualePartecipanti: boolean = false;
  constructor(
    private torneoService: TorneoService,
    private route: ActivatedRoute
  ) {

  }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.torneo = await this.torneoService.getTorneoById(Number(id));
    this.numeroGironiList.push(new Girone(1))
  }

  aggiungiGirone() {
    const nuovoId = this.numeroGironiList.length + 1; // ID successivo
    const nuovoGirone = new Girone(nuovoId);
    this.numeroGironiList.push(nuovoGirone);
    this.calcoloPartecipantiBottone()
  }

  eliminaGirone(index: number) {
    if (index >= 0 && this.numeroGironiList.length > 1) {
      // this.numeroGironiList.splice(index, 1);
      this.numeroGironiList.pop()
      this.calcoloPartecipantiBottone()
    }
  }

  aggiungiSquadraAlGirone(index: number) {
    let girone = this.numeroGironiList.find(x => x.id == index);
    if (girone) {
       girone.squadre.push(new Squadra(girone.squadre.length + 1))
       this.calcoloPartecipantiBottone()
    }
  }

  rimuoviSquadraDalGirone(index: number){
    let girone = this.numeroGironiList.find(x => x.id == index);
    if (girone && girone.squadre.length > 1) {
        girone.squadre.pop();
        this.calcoloPartecipantiBottone()
    } 
  }
  
  aggiungiPartecipante(){
    this.squadreTotali.push(new Squadra(this.squadreTotali.length + 1))
    this.calcoloPartecipantiBottone()
  }

  rimuoviPartecipante(){
      this.squadreTotali.pop();
      this.calcoloPartecipantiBottone()
  }

  async sorteggiaGironi(){
    if(this.torneo)
      await this.torneoService.sorteggiaGironi(this.torneo.idPk, this.numeroGironiList, this.squadreTotali);
  }

  async salvaModifiche(){
    if(this.torneo)
      await this.torneoService.salvaTorneo(this.torneo.idPk, this.numeroGironiList);
  }

  calcoloPartecipantiBottone(){
    let numeroSquadreGironi = 0;
    this.numeroGironiList.forEach((x: Girone) => {
      numeroSquadreGironi += x.squadre.length
    })
    let numeroSquadreTotali = this.squadreTotali.length;
    this.numeroUgualePartecipanti = numeroSquadreGironi == numeroSquadreTotali
  }

  editingIndex: number | null = null;

  startEditing(index: number): void {
    this.editingIndex = index;
  }

  stopEditing(): void {
    this.editingIndex = null;
  }
}
