import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { BePlanTestModule } from '../../../test.module';
import { TipsterUpdateComponent } from 'app/entities/tipster/tipster-update.component';
import { TipsterService } from 'app/entities/tipster/tipster.service';
import { Tipster } from 'app/shared/model/tipster.model';

describe('Component Tests', () => {
  describe('Tipster Management Update Component', () => {
    let comp: TipsterUpdateComponent;
    let fixture: ComponentFixture<TipsterUpdateComponent>;
    let service: TipsterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BePlanTestModule],
        declarations: [TipsterUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipsterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipsterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipsterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tipster(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tipster();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
