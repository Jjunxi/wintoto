import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Toto, TotoRelations} from '../models';

export class TotoRepository extends DefaultCrudRepository<
  Toto,
  typeof Toto.prototype.id,
  TotoRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: DbDataSource,
  ) {
    super(Toto, dataSource);
  }
}
