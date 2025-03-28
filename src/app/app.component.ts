import { Component } from '@angular/core';
import { CalendarioService } from './services/calendario.service';
import { LoginService } from './services/login.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  isCollapsed = false;
  faseEliminazione: boolean = false;
  isAuthenticated: boolean = false;
  constructor(
    private calendarioService: CalendarioService,
    private authService: LoginService
  ) 
  {

  }
  async ngOnInit() {
    const storedValue = sessionStorage.getItem('isAuthenticated');
    this.isAuthenticated = storedValue ? JSON.parse(storedValue) : false;    
    let partite = await this.calendarioService.getPartite();
    this.faseEliminazione = partite.some((p) => p.faseEliminatoria == true);
  }
}
