import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipster } from 'app/shared/model/tipster.model';

@Component({
  selector: 'jhi-tipster-detail',
  templateUrl: './tipster-detail.component.html',
})
export class TipsterDetailComponent implements OnInit {
  tipster: ITipster | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipster }) => (this.tipster = tipster));
  }

  previousState(): void {
    window.history.back();
  }
}
