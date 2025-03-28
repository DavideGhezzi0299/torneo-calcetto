import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService

  ) { }

  /**
   * Mostra una notifica di successo
   * @param title Titolo della notifica
   * @param message Messaggio della notifica
   */
  success(title: string, message: string): void {
    this.notification.success(title, message, {
      nzDuration: 3000, // Durata della notifica in millisecondi
    });
  }

  /**
   * Mostra una notifica di errore
   * @param title Titolo della notifica
   * @param message Messaggio della notifica
   */
  error(title: string, message: string): void {
    this.notification.error(title, message, {
      nzDuration: 5000, // Durata maggiore per enfatizzare l'errore
    });
  }

  /**
   * Mostra una notifica generica
   * @param title Titolo della notifica
   * @param message Messaggio della notifica
   */
  blank(title: string, message: string): void {
    this.notification.blank(title, message, {
      nzDuration: 4000, // Durata predefinita
    });
  }

  confirm(title: string, message: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.modal.confirm(
        {
          nzTitle: title,
          nzContent: message,
          nzOnOk: () => {
            observer.next(true);
            observer.complete();
          },
          nzOnCancel: () => {
            observer.next(false);
            observer.complete();
          }
        }
      )
    })
  }
}
