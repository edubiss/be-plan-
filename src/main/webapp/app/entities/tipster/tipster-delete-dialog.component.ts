import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipster } from 'app/shared/model/tipster.model';
import { TipsterService } from './tipster.service';

@Component({
  templateUrl: './tipster-delete-dialog.component.html',
})
export class TipsterDeleteDialogComponent {
  tipster?: ITipster;

  constructor(protected tipsterService: TipsterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipsterService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipsterListModification');
      this.activeModal.close();
    });
  }
}
