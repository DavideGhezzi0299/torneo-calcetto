import { IPartita } from "./partita";

export interface ISquadra {
    idPk: number;
    nome: string;
    puntiFatti: number;
    golFatti: number;
    golSubiti: number;
    partiteGiocate: number;
    vittorie: number;
    sconfitte: number;
    pareggi: number;  
    differenzaReti: number;
    fascia: Fascia,
    avversari: ISquadraCalendario[];
}

export interface ISquadraCalendario{
    nome: string;
    haGiocato: boolean;
    risultato: string;
    isCasa: boolean;
    fascia: number
}

export enum Fascia
{
    Prima = 1,
    Seconda = 2,
    Terza = 3,
    Quarta = 4,
    Quinta = 5
}