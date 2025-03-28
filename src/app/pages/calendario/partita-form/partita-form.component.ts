import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';  // Per 'NZ_MODAL_DATA
import { IPartita } from 'src/app/models/partita';
import { CalendarioService } from 'src/app/services/calendario.service';
@Component({
    selector: 'app-partita-form',
    templateUrl: './partita-form.component.html',
    standalone: false
})
export class PartitaFormComponent implements OnInit {
    partitaForm: FormGroup;
    partita!: IPartita;
    maxResult = 10;
    isPareggio = false;
    golCasa = 0;
    golOspite = 0;
    constructor(
        private fb: FormBuilder,
        private calendarioService: CalendarioService,
        @Optional() @Inject(NZ_MODAL_DATA) public data: any,
        private modalRef: NzModalRef
    ) {
        this.partitaForm = this.fb.group({
            idPk: [null],
            squadraCasa: [''],
            squadraOspite: [''],
            golCasa: [null],
            golOspite: [null],
            data: [null],
            vincitore: [''],
            faseEliminatoria: [false],
            tipoPartita: [null],
        });
        this.maxResult = data.maxResult;

        this.partitaForm.get('golCasa')?.valueChanges.subscribe((value) => {
            this.golCasa = value;
            if (this.golCasa === this.golOspite) {
                this.isPareggio = true;
            } else {
                this.isPareggio = false;
            }
        });
        this.partitaForm.get('golOspite')?.valueChanges.subscribe((value) => {
            this.golOspite = value;
            if (this.golCasa === this.golOspite) {
                this.isPareggio = true;
            } else {
                this.isPareggio = false;
            }
        });
    }

    async ngOnInit() {
       if(!this.data.faseEliminazione) 
            this.partita = await this.calendarioService.getPartitaFromNomiSquadra(this.data.squadra, this.data.avversario);
       else
            this.partita = this.data.partita
       this.partitaForm.patchValue(this.partita);
    }
    onSubmit = async () => {
        if (this.partitaForm.valid) {
            if (!this.data.faseEliminazione) {
                if (!this.data.modifica) {
                await this.calendarioService.inserisciRisultato(this.partitaForm.value);
                } else {
                    let partita = this.partitaForm.value;
                    partita.modifica = true;
                    await this.calendarioService.inserisciRisultato(partita);
                }
            } else {
                let partita = this.partitaForm.value;
                partita.faseEliminatoria = true;
                await this.calendarioService.inserisciRisultato(partita);
            }
            window.location.reload();
        }
    };
    onClose(){
        this.modalRef.close();
    }
}