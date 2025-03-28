export interface IPartita {
    idPk: number;
    squadraCasa: string;
    squadraOspite: string;
    golCasa: number;
    golOspite: number;
    data: Date;
    vincitore: string;
    faseEliminatoria: boolean;
    giornata: number;
    tipoPartita: TipoPartita;
    idSquadraCasa: number;
    idSquadraOspite: number;
    idVincitore: number;
    modifica: boolean;
}


export enum TipoPartita
{
    Girone,
    QuartiFinale,
    Semifinale,
    Finale,
    FinaleTerzoPosto
}