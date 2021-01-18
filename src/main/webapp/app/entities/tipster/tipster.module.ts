import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BePlanSharedModule } from 'app/shared/shared.module';
import { TipsterComponent } from './tipster.component';
import { TipsterDetailComponent } from './tipster-detail.component';
import { TipsterUpdateComponent } from './tipster-update.component';
import { TipsterDeleteDialogComponent } from './tipster-delete-dialog.component';
import { tipsterRoute } from './tipster.route';

@NgModule({
  imports: [BePlanSharedModule, RouterModule.forChild(tipsterRoute)],
  declarations: [TipsterComponent, TipsterDetailComponent, TipsterUpdateComponent, TipsterDeleteDialogComponent],
  entryComponents: [TipsterDeleteDialogComponent],
})
export class BePlanTipsterModule {}
