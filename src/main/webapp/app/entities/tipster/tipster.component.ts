import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipster } from 'app/shared/model/tipster.model';
import { TipsterService } from './tipster.service';
import { TipsterDeleteDialogComponent } from './tipster-delete-dialog.component';

@Component({
  selector: 'jhi-tipster',
  templateUrl: './tipster.component.html',
})
export class TipsterComponent implements OnInit, OnDestroy {
  tipsters?: ITipster[];
  eventSubscriber?: Subscription;

  constructor(protected tipsterService: TipsterService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tipsterService.query().subscribe((res: HttpResponse<ITipster[]>) => (this.tipsters = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipsters();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipster): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipsters(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipsterListModification', () => this.loadAll());
  }

  delete(tipster: ITipster): void {
    const modalRef = this.modalService.open(TipsterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipster = tipster;
  }
}
