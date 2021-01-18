import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipster } from 'app/shared/model/tipster.model';

type EntityResponseType = HttpResponse<ITipster>;
type EntityArrayResponseType = HttpResponse<ITipster[]>;

@Injectable({ providedIn: 'root' })
export class TipsterService {
  public resourceUrl = SERVER_API_URL + 'api/tipsters';

  constructor(protected http: HttpClient) {}

  create(tipster: ITipster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipster);
    return this.http
      .post<ITipster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tipster: ITipster): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tipster);
    return this.http
      .put<ITipster>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITipster>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITipster[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tipster: ITipster): ITipster {
    const copy: ITipster = Object.assign({}, tipster, {
      data: tipster.data && tipster.data.isValid() ? tipster.data.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tipster: ITipster) => {
        tipster.data = tipster.data ? moment(tipster.data) : undefined;
      });
    }
    return res;
  }
}
