import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ISquadra, ISquadraCalendario } from '../models/squadra';
import { HttpClient } from '@angular/common/http';
import { IPartita } from '../models/partita';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CalendarioService {
    private apiUrl = environment.server + "/partite" // URL della tua API
    constructor(private http: HttpClient) { }

    async getPartite(){
        return await firstValueFrom(this.http.get<IPartita[]>(this.apiUrl)); // Restituisce un Observable che emetterà la lista delle squadre
    }

    async calcolaCalendario(squadra: ISquadra){
        return await firstValueFrom(this.http.post<IPartita[]>(this.apiUrl + "/calcolaCalendario", squadra)); // Restituisce un Observable che emetterà la lista delle squad
    }

    async getAvversariPerSquadra(id: number){
        return await firstValueFrom(this.http.get<ISquadraCalendario[]>(this.apiUrl + "/" + id));
    }

    async getPartitaFromNomiSquadra(squadra: string, avversario: string){
        return await firstValueFrom(this.http.get<IPartita>(this.apiUrl + "/" + squadra + "/" + avversario));
    }

    inserisciRisultato = async(partita: IPartita) =>{
        return await firstValueFrom(this.http.post<IPartita>(this.apiUrl + "/inserisciRisultato", partita));
    }

    async terminaFaseGironi(){
        return await firstValueFrom(this.http.get(this.apiUrl + "/terminaFaseGironi"));
    }

    async getPartitaFaseEliminatoria(idSquadraCasa: number, idSquadraOspite: number){
        return await firstValueFrom(this.http.get<IPartita>(this.apiUrl + "/faseEliminatoria/" + idSquadraCasa + "/" + idSquadraOspite));
    }
    async reset(){
        return await firstValueFrom(this.http.get(this.apiUrl + "/reset"));
    }
}