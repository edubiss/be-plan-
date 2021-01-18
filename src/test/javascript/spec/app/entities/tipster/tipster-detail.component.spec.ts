import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BePlanTestModule } from '../../../test.module';
import { TipsterDetailComponent } from 'app/entities/tipster/tipster-detail.component';
import { Tipster } from 'app/shared/model/tipster.model';

describe('Component Tests', () => {
  describe('Tipster Management Detail Component', () => {
    let comp: TipsterDetailComponent;
    let fixture: ComponentFixture<TipsterDetailComponent>;
    const route = ({ data: of({ tipster: new Tipster(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BePlanTestModule],
        declarations: [TipsterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipsterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipsterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipster on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipster).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
