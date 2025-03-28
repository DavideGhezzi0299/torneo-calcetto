import { Component } from '@angular/core';
import { BracketsManager } from 'brackets-manager';
import { getNearestPowerOfTwo } from 'brackets-manager/dist/helpers';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Dataset } from 'src/app/app.module';
import { InMemoryDatabase } from 'src/app/models/inMemoryDatabase';
import { IPartita, TipoPartita } from 'src/app/models/partita';
import { ISquadra } from 'src/app/models/squadra';
import { CalendarioService } from 'src/app/services/calendario.service';
import { SquadraService } from 'src/app/services/squadra.service';
import { PartitaFormComponent } from '../calendario/partita-form/partita-form.component';

export const dataset8: Dataset = {
  title: 'Fase a eliminazione diretta',
  type: 'single_elimination',
  roster: [],
};
declare global {
  interface Window {
    bracketsViewer?: any;
    BracketsManager: any; // Dichiara bracketsViewer come una proprietà opzionale di tipo any
  }
}
@Component({
    selector: 'app-fase-eliminazione',
    templateUrl: './faseEliminazione.component.html',
    styleUrls: ['./faseEliminazione.component.css'],
    standalone: false
})
export class FaseEliminazioneComponent {
  primeSeiClassificate: any;
  partite: IPartita[] = [];
  db = new InMemoryDatabase();
  manager = new BracketsManager(this.db);
  TOURNAMENT_ID = 1;
  loading: boolean = false;
  constructor(
    private squadraService: SquadraService,
    private calendarioService: CalendarioService,
    private modalService: NzModalService
  ) {}

  async ngOnInit() {
    //prende le prime 6 squadre classificate
    this.loading = true;
    this.primeSeiClassificate = (
      await this.squadraService.getSquadre(true)
    ).slice(0, 6);

    //prendo le partite della fase a eliminazione diretta
    this.partite = (await this.calendarioService.getPartite()).filter(
      (x) => x.faseEliminatoria == true
    );

    dataset8.roster = this.primeSeiClassificate.map((s: ISquadra) => ({
      id: s.idPk,
      name: s.nome,
    }));
    window.bracketsViewer.addLocale('en', {
      common: {
        'group-name-winner-bracket': '{{stage.name}}',
        'group-name-loser-bracket': '{{stage.name}} - Repechage',
      },
      'origin-hint': {
        'winner-bracket': 'WB {{round}}.{{position}}',
        'winner-bracket-semi-final': 'WB Semi {{position}}',
        'winner-bracket-final': 'WB Final',
        'consolation-final': 'Semi {{position}}',
      },
    });
    window.bracketsViewer.onMatchClicked = async (match: any) => {
      await this.aggiornaRisultatoClicked(match, this.partite);
    };
    let data = await this.process(dataset8, this.partite);
    if (data) {
      window.bracketsViewer.render(data);
      this.loading = false;
    }
  }

  async aggiornaRisultatoClicked(match: any, partite: IPartita[]) {
    if (match.opponent1 && match.opponent2) {
      let partita = partite.find(
        (x) =>
          (x.idSquadraCasa == match.opponent1.id &&
            x.idSquadraOspite == match.opponent2.id) ||
          (x.idSquadraCasa == match.opponent2.id &&
            x.idSquadraOspite == match.opponent1.id)
      );
      if (partita) {
        let tipoPartita = TipoPartita.QuartiFinale;
        // mi calcolo se è quarti, semifinale o finale
        if (match.round_id == 0) tipoPartita = TipoPartita.QuartiFinale;
        else if (match.round_id == 1) tipoPartita = TipoPartita.Semifinale;
        else if (match.round_id == 2) tipoPartita = TipoPartita.Finale;

        partita.tipoPartita = tipoPartita;

        let data = {
          squadra: partita.squadraCasa,
          avversario: partita.squadraOspite,
          maxResult: 10,
          faseEliminazione: true,
          partita: partita,
        };
        this.modalService.create({
          nzTitle: 'Inserisci risultato',
          nzContent: PartitaFormComponent,
          nzData: data,
          nzFooter: null,
        });
      }
    }
  }

  async process(dataset: Dataset, dbMatches: IPartita[]) {
    this.db.setData({
      participant: dataset.roster.map((player) => ({
        ...player,
        tournament_id: this.TOURNAMENT_ID,
      })),
      stage: [],
      group: [],
      round: [],
      match: [],
      match_game: [],
    });

    await this.manager.create({
      name: dataset.title,
      tournamentId: this.TOURNAMENT_ID,
      type: dataset.type,
      seeding: dataset.roster.map((player) => player.name),
      settings: {
        seedOrdering: ['inner_outer'],
        consolationFinal: true,
        size: getNearestPowerOfTwo(dataset.roster.length),
      },
    });

    // Prendo i match generati dalla libreria
    const matches = (await this.manager.get.stageData(0)).match;

    // Aggiungo i risultati delle partite
    for (const match of matches) {
      const dbMatch = dbMatches.find(
        (m) =>
          (m.idSquadraCasa == match.opponent1?.id &&
            m.idSquadraOspite == match.opponent2?.id) ||
          (m.idSquadraCasa == match.opponent2?.id &&
            m.idSquadraOspite == match.opponent1?.id)
      );
      if (dbMatch) {
        await this.manager.update.match({
          id: match.id,
          opponent1: {
            id:
              match.opponent1?.id == dbMatch.idSquadraCasa
                ? dbMatch.idSquadraCasa
                : dbMatch.idSquadraOspite,
            score:
              match.opponent1?.id == dbMatch.idSquadraCasa
                ? dbMatch.golCasa
                : dbMatch.golOspite,
            result:
              dbMatch.vincitore == dbMatch.squadraCasa ? 'win' : undefined,
          },
          opponent2: {
            id:
              match.opponent2?.id == dbMatch.idSquadraCasa
                ? dbMatch.idSquadraCasa
                : dbMatch.idSquadraOspite,
            score:
              match.opponent2?.id == dbMatch.idSquadraCasa
                ? dbMatch.golCasa
                : dbMatch.golOspite,
            result:
              dbMatch.vincitore == dbMatch.squadraOspite ? 'win' : undefined,
          },
        });
      }
    }

    // Recupero lo stato aggiornato
    const data = await this.manager.get.stageData(0);
    console.log(data.stage);
    let valueToReturn = {
      stages: data.stage,
      matches: data.match,
      matchGames: data.match_game,
      participants: data.participant,
    };

    return valueToReturn;
  }
}
