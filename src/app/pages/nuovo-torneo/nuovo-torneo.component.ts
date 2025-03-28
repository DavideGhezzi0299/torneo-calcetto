import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-nuovo-torneo',
    templateUrl: 'nuovo-torneo.component.html',
    styleUrl: 'nuovo-torneo.component.css',
    standalone: false
})

export class NuovoTorneoComponent implements OnInit {
    tournamentForm!: FormGroup;

    constructor(
      private fb: FormBuilder,
      private modalRef: NzModalRef
    ) {}
  
    ngOnInit(): void {
      this.tournamentForm = this.fb.group({
        idPk: 0,
        nome: ['', [Validators.required, Validators.minLength(3)]],
        descrizione: '',
        dataCreazione: new Date(),
        numeroPartecipanti: [2, [Validators.required, Validators.min(2), Validators.max(100)]]
      });
    }
  
    onSubmit(): void {
      if (this.tournamentForm.valid) {
        console.log('Torneo creato:', this.tournamentForm.value);
        // Aggiungi la logica per salvare i dati
        // Dopo aver salvato chiudi il modal e vai alla pagina del form
      }
    }

    close(): void {
       this.modalRef.close();
    }
}