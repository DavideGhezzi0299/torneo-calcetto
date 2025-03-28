export interface ITorneo{
    idPk: number;
    nome: string;
    descrizione: string;
    dataCreazione: Date;
    fkIdUtenteNavigation: number;
    numeroPartecipanti: number;
    aperto: boolean;
}


export const tornei: ITorneo[] = [
    {
      idPk: 1,
      nome: "Torneo Primavera",
      descrizione: "Un torneo amichevole di primavera",
      dataCreazione: new Date('2024-03-01'),
      fkIdUtenteNavigation: 101,
      numeroPartecipanti: 16,
      aperto: true
    },
    {
      idPk: 2,
      nome: "Coppa Estate",
      descrizione: "Sfida tra i migliori giocatori dell'estate",
      dataCreazione: new Date('2024-06-15'),
      fkIdUtenteNavigation: 102,
      numeroPartecipanti: 32,
      aperto: true
    },
    {
      idPk: 3,
      nome: "Torneo Autunno",
      descrizione: "Competizione per l'autunno",
      dataCreazione: new Date('2024-09-10'),
      fkIdUtenteNavigation: 103,
      numeroPartecipanti: 24,
      aperto: true
    },
    {
      idPk: 4,
      nome: "Winter Championship",
      descrizione: "Il grande torneo invernale",
      dataCreazione: new Date('2024-12-01'),
      fkIdUtenteNavigation: 104,
      numeroPartecipanti: 20,
      aperto: true
    },
    {
      idPk: 5,
      nome: "Torneo di Pasqua",
      descrizione: "Sfida speciale per Pasqua",
      dataCreazione: new Date('2024-04-10'),
      fkIdUtenteNavigation: 105,
      numeroPartecipanti: 12,
      aperto: true
    },
    {
      idPk: 6,
      nome: "Challenge d'Autunno",
      descrizione: "Una sfida unica per la stagione",
      dataCreazione: new Date('2024-10-05'),
      fkIdUtenteNavigation: 106,
      numeroPartecipanti: 28,
      aperto: true
    },
    {
      idPk: 7,
      nome: "Grand Prix Invernale",
      descrizione: "Sfida tra i migliori dell'anno",
      dataCreazione: new Date('2024-12-20'),
      fkIdUtenteNavigation: 107,
      numeroPartecipanti: 18,
      aperto: true
    },
    {
      idPk: 8,
      nome: "Torneo di Ferragosto",
      descrizione: "Competizione estiva per Ferragosto",
      dataCreazione: new Date('2024-08-15'),
      fkIdUtenteNavigation: 108,
      numeroPartecipanti: 22,
      aperto: true
    },
    {
      idPk: 9,
      nome: "Spring Open",
      descrizione: "Apertura stagionale delle competizioni",
      dataCreazione: new Date('2024-03-20'),
      fkIdUtenteNavigation: 109,
      numeroPartecipanti: 30,
      aperto: true
    },
    {
      idPk: 10,
      nome: "Campionato Nazionale",
      descrizione: "Il più grande torneo nazionale",
      dataCreazione: new Date('2024-07-01'),
      fkIdUtenteNavigation: 110,
      numeroPartecipanti: 50,
      aperto: true
    }
  ];
  