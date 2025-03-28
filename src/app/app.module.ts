// moduli
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { it_IT } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import it from '@angular/common/locales/it';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { StageType } from 'brackets-model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
//servizi
import { LoginService } from './services/login.service';
import { CalendarioService } from './services/calendario.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SquadraService } from './services/squadra.service';
import { NotificationService } from './services/notification.service';
import { ModalService } from './services/modal.service';

// componenti
import { AppComponent } from './app.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { PartitaFormComponent } from './pages/calendario/partita-form/partita-form.component';
import { FaseEliminazioneComponent } from './pages/fase_eliminazione/faseEliminazione.component';
import { LoginComponent } from './pages/login/login.component';
import { SorteggioComponent } from './pages/sorteggio/sorteggio.component';
import { ClassificaComponent } from './pages/welcome/classifica/classifica.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GestioneTorneiComponent } from './pages/gestione-tornei/gestione-tornei.component';
import { NuovoTorneoComponent } from './pages/nuovo-torneo/nuovo-torneo.component';
import { UtenteComponent } from './pages/utente/utente.component';
import { FormTorneoComponent } from './pages/form-torneo/form-torneo.component';
import { TorneoService } from './services/torneo.service';

registerLocaleData(it);

export interface Dataset {
  title: string;
  type: StageType;
  roster: { id: number; name: string }[];
}

@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    FaseEliminazioneComponent,
    SorteggioComponent,
    PartitaFormComponent,
    ClassificaComponent,
    LoginComponent,
    DashboardComponent,
    GestioneTorneiComponent,
    NuovoTorneoComponent,
    UtenteComponent,
    FormTorneoComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzGridModule,
    CommonModule,
    NzListModule,
    MatCardModule,
    MatButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzInputNumberModule,
    NzModalModule,
    NzNotificationModule,
    NzTagModule,
    NzTableModule,
    NzSpinModule,
    NzSwitchModule,
    NzDividerModule,
    NzAvatarModule,
    NzToolTipModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: it_IT },
    SquadraService,
    CalendarioService,
    NzModalService,
    NzNotificationService,
    NzModalService,
    LoginService,
    NotificationService,
    ModalService,
    TorneoService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
