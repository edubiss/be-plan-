import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipster, Tipster } from 'app/shared/model/tipster.model';
import { TipsterService } from './tipster.service';
import { TipsterComponent } from './tipster.component';
import { TipsterDetailComponent } from './tipster-detail.component';
import { TipsterUpdateComponent } from './tipster-update.component';

@Injectable({ providedIn: 'root' })
export class TipsterResolve implements Resolve<ITipster> {
  constructor(private service: TipsterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipster> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipster: HttpResponse<Tipster>) => {
          if (tipster.body) {
            return of(tipster.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tipster());
  }
}

export const tipsterRoute: Routes = [
  {
    path: '',
    component: TipsterComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tipsters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipsterDetailComponent,
    resolve: {
      tipster: TipsterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tipsters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipsterUpdateComponent,
    resolve: {
      tipster: TipsterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tipsters',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipsterUpdateComponent,
    resolve: {
      tipster: TipsterResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tipsters',
    },
    canActivate: [UserRouteAccessService],
  },
];
