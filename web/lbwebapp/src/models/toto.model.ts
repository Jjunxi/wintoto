import {Entity, model, property} from '@loopback/repository';

@model()
export class Toto extends Entity {
  @property({
    type: 'number',
    default: 0,
  })
  number?: number;

  @property({
    type: 'string',
    default: 0,
    id: true
  })
  id?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'array',
    itemType: 'number',
    default: null,
  })
  lucks?: number[];

  @property({
    type: 'number',
  })
  additional?: number;


  constructor(data?: Partial<Toto>) {
    super(data);
  }
}

export interface TotoRelations {
  // describe navigational properties here
}

export type TotoWithRelations = Toto & TotoRelations;
