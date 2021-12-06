import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Toto} from '../models';
import {TotoRepository} from '../repositories';

export class TotoController {
  constructor(
    @repository(TotoRepository)
    public totoRepository : TotoRepository,
  ) {}

  @post('/totos')
  @response(200, {
    description: 'Toto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Toto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Toto, {
            title: 'NewToto',
            exclude: ['id'],
          }),
        },
      },
    })
    toto: Omit<Toto, 'id'>,
  ): Promise<Toto> {
    return this.totoRepository.create(toto);
  }

  @get('/totos/count')
  @response(200, {
    description: 'Toto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Toto) where?: Where<Toto>,
  ): Promise<Count> {
    return this.totoRepository.count(where);
  }

  @get('/totos')
  @response(200, {
    description: 'Array of Toto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Toto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Toto) filter?: Filter<Toto>,
  ): Promise<Toto[]> {
    return this.totoRepository.find(filter);
  }

  @patch('/totos')
  @response(200, {
    description: 'Toto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Toto, {partial: true}),
        },
      },
    })
    toto: Toto,
    @param.where(Toto) where?: Where<Toto>,
  ): Promise<Count> {
    return this.totoRepository.updateAll(toto, where);
  }

  @get('/totos/{id}')
  @response(200, {
    description: 'Toto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Toto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Toto, {exclude: 'where'}) filter?: FilterExcludingWhere<Toto>
  ): Promise<Toto> {
    return this.totoRepository.findById(id, filter);
  }

  @patch('/totos/{id}')
  @response(204, {
    description: 'Toto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Toto, {partial: true}),
        },
      },
    })
    toto: Toto,
  ): Promise<void> {
    await this.totoRepository.updateById(id, toto);
  }

  @put('/totos/{id}')
  @response(204, {
    description: 'Toto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() toto: Toto,
  ): Promise<void> {
    await this.totoRepository.replaceById(id, toto);
  }

  @del('/totos/{id}')
  @response(204, {
    description: 'Toto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.totoRepository.deleteById(id);
  }
}
