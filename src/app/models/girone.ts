import { ISquadra } from "./squadra";

export class Girone {
    id: number;
    squadre: Squadra[] = [];

    constructor(id: number) {
      this.id = id;
      this.squadre.push(new Squadra(1));
    }
  
    // Getter per calcolare dinamicamente il nome del girone
    get nome(): string {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettera = alphabet[this.id - 1] || '';  // Calcola la lettera corrispondente
        return `Girone ${lettera}`;  // Combina "Girone" con la lettera
    }
}



export class Squadra{
    id: number;    
    private _nome: string | null = null;  // Variabile privata per il nome personalizzato

    constructor(id:number){
        this.id = id;

    }

    get nome(): string {
        if (this._nome !== null) {
            return this._nome;  // Se è stato impostato un nome personalizzato, usalo
        }

        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lettera = alphabet[this.id - 1] || '';  // Calcola la lettera corrispondente
        return `Partecipante ${lettera}`;  // Combina "Girone" con la lettera
    }

    set nome(value: string) {
        this._nome = value;  // Permette di aggiornare il nome
    }
}