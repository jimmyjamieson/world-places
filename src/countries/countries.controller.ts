import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { CountryEntity } from './country.entity';
import { CountriesService } from './countries.service';

@Crud({
  model: {
    type: CountryEntity
  },
  query: {
    join: {
      continent: {
        eager: true,
      },
    },
  },
})

@ApiTags('Countries')
@Controller('countries')
export class CountriesController implements CrudController<CountryEntity>{
  constructor(
    public readonly service: CountriesService
  ) {}
/*
  @Get('/test')
  async Test(): Promise<any> {
    return this.service.findOne({
      where: {
        code: 'MT'
      }
    })
  }*/
}
