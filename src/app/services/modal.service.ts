import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modal: NzModalService, private message: NzMessageService) {}

  // Funzione per aprire un modale con parametri personalizzati
  openModal(title: string, component: any, nzData: any) {
    return this.modal.create({
      nzTitle: title,
      nzContent: component,
      nzData: nzData
    });
  }
}
