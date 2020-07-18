import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';

@Crud({
  model: {
    type: Country
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    join: {
      currency: {
        eager: true,
      },
      language: {
        eager: true
      },
     /* regions: {
        eager: true
      },
      'regions.cities': {
        eager: true
      }*/
    },
  },
})

@ApiTags('Countries')
@Controller('countries')
export class CountriesController implements CrudController<Country>{
  constructor(
    public readonly service: CountriesService
  ) {}

  /*@Get('/export')
  async Test(): Promise<any> {
    return this.service.find()
  }*/
}
