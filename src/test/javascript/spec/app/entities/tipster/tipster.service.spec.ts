import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TipsterService } from 'app/entities/tipster/tipster.service';
import { ITipster, Tipster } from 'app/shared/model/tipster.model';

describe('Service Tests', () => {
  describe('Tipster Service', () => {
    let injector: TestBed;
    let service: TipsterService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipster;
    let expectedResult: ITipster | ITipster[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TipsterService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tipster(0, 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA', 'AAAAAAA', 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tipster', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.create(new Tipster()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tipster', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            desempenho: 1,
            desempenhoMes: 1,
            desempenhoAno: 1,
            desempenhoTotal: 1,
            esporte: 'BBBBBB',
            horarios: 'BBBBBB',
            nrTipsDia: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tipster', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            desempenho: 1,
            desempenhoMes: 1,
            desempenhoAno: 1,
            desempenhoTotal: 1,
            esporte: 'BBBBBB',
            horarios: 'BBBBBB',
            nrTipsDia: 1,
            data: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tipster', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
