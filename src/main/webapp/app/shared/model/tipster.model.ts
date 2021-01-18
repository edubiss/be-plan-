import { Moment } from 'moment';

export interface ITipster {
  id?: number;
  nome?: string;
  desempenho?: number;
  desempenhoMes?: number;
  desempenhoAno?: number;
  desempenhoTotal?: number;
  esporte?: string;
  horarios?: string;
  nrTipsDia?: number;
  data?: Moment;
}

export class Tipster implements ITipster {
  constructor(
    public id?: number,
    public nome?: string,
    public desempenho?: number,
    public desempenhoMes?: number,
    public desempenhoAno?: number,
    public desempenhoTotal?: number,
    public esporte?: string,
    public horarios?: string,
    public nrTipsDia?: number,
    public data?: Moment
  ) {}
}
