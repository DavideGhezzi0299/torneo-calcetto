import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ISquadra } from '../models/squadra';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SquadraService {
    private apiUrl = environment.server + "/squadre" // URL della tua API
    constructor(private http: HttpClient) { }

    async getSquadre(classifica: boolean = false){
        return await firstValueFrom(this.http.get<ISquadra[]>(this.apiUrl + "/" + classifica)); // Restituisce un Observable che emetterà la lista delle squadre
    }
    async reset(){
        return await firstValueFrom(this.http.get(this.apiUrl + "/reset"));
    }
}