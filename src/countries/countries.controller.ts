import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Country } from './country.entity';
import { CountriesService } from './countries.service';

@Crud({
  model: {
    type: Country
  },
  query: {
    join: {
      continent: {
        eager: true,
      },
      currency: {
        eager: true,
      },
      regions: {
        eager: true
      }
    },
  },
})

@ApiTags('Countries')
@Controller('countries')
export class CountriesController implements CrudController<Country>{
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
