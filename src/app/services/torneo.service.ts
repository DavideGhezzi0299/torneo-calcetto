import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ISquadra } from '../models/squadra';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITorneo, tornei } from '../models/torneo';
import { Girone, Squadra } from '../models/girone';

@Injectable({
    providedIn: 'root'
})
export class TorneoService {
    private apiUrl = environment.server + "/tornei" // URL della tua API
    constructor(private http: HttpClient) { }

    async getTornei(idUtente?: number){
        // return await firstValueFrom(this.http.get<ITorneo[]>(this.apiUrl + "/" + idUtente));
        return await firstValueFrom(of(tornei));
    }

    async creaTorneo(torneo: ITorneo){
        return await firstValueFrom(this.http.post<ITorneo>(this.apiUrl, torneo))
    }

    async getTorneoById(idPk: number){
        return await firstValueFrom(of(tornei.find(t => t.idPk == idPk)));  
    }

    async salvaTorneo(idTorneo: number, gironi: Girone[]){
        return await firstValueFrom(of("CHIAMATA DA IMPLEMENTARE"));
    }

    async eliminaTorneo(idTorneo: number){
        return await firstValueFrom(of("CHIAMATA DA IMPLEMENTARE"));
    }

    async sorteggiaGironi(idTorneo: number, gironi: Girone[], squadrePartecipanti: Squadra[]){
        return await firstValueFrom(of("CHIAMATA DA IMPLEMENTARE"));
    }
}
