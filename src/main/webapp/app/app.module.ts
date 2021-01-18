import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BePlanSharedModule } from 'app/shared/shared.module';
import { BePlanCoreModule } from 'app/core/core.module';
import { BePlanAppRoutingModule } from './app-routing.module';
import { BePlanHomeModule } from './home/home.module';
import { BePlanEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    BePlanSharedModule,
    BePlanCoreModule,
    BePlanHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    BePlanEntityModule,
    BePlanAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class BePlanAppModule {}
