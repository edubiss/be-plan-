import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BePlanTestModule } from '../../../test.module';
import { TipsterComponent } from 'app/entities/tipster/tipster.component';
import { TipsterService } from 'app/entities/tipster/tipster.service';
import { Tipster } from 'app/shared/model/tipster.model';

describe('Component Tests', () => {
  describe('Tipster Management Component', () => {
    let comp: TipsterComponent;
    let fixture: ComponentFixture<TipsterComponent>;
    let service: TipsterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BePlanTestModule],
        declarations: [TipsterComponent],
      })
        .overrideTemplate(TipsterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipsterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipsterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tipster(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipsters && comp.tipsters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
