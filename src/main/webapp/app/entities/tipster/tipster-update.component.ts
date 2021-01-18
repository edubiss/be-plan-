import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITipster, Tipster } from 'app/shared/model/tipster.model';
import { TipsterService } from './tipster.service';

@Component({
  selector: 'jhi-tipster-update',
  templateUrl: './tipster-update.component.html',
})
export class TipsterUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
    desempenho: [],
    desempenhoMes: [],
    desempenhoAno: [],
    desempenhoTotal: [],
    esporte: [],
    horarios: [],
    nrTipsDia: [],
    data: [],
  });

  constructor(protected tipsterService: TipsterService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipster }) => {
      if (!tipster.id) {
        const today = moment().startOf('day');
        tipster.data = today;
      }

      this.updateForm(tipster);
    });
  }

  updateForm(tipster: ITipster): void {
    this.editForm.patchValue({
      id: tipster.id,
      nome: tipster.nome,
      desempenho: tipster.desempenho,
      desempenhoMes: tipster.desempenhoMes,
      desempenhoAno: tipster.desempenhoAno,
      desempenhoTotal: tipster.desempenhoTotal,
      esporte: tipster.esporte,
      horarios: tipster.horarios,
      nrTipsDia: tipster.nrTipsDia,
      data: tipster.data ? tipster.data.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipster = this.createFromForm();
    if (tipster.id !== undefined) {
      this.subscribeToSaveResponse(this.tipsterService.update(tipster));
    } else {
      this.subscribeToSaveResponse(this.tipsterService.create(tipster));
    }
  }

  private createFromForm(): ITipster {
    return {
      ...new Tipster(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      desempenho: this.editForm.get(['desempenho'])!.value,
      desempenhoMes: this.editForm.get(['desempenhoMes'])!.value,
      desempenhoAno: this.editForm.get(['desempenhoAno'])!.value,
      desempenhoTotal: this.editForm.get(['desempenhoTotal'])!.value,
      esporte: this.editForm.get(['esporte'])!.value,
      horarios: this.editForm.get(['horarios'])!.value,
      nrTipsDia: this.editForm.get(['nrTipsDia'])!.value,
      data: this.editForm.get(['data'])!.value ? moment(this.editForm.get(['data'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipster>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
